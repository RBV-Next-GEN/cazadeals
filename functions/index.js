
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const admin = require("firebase-admin");
const puppeteer = require("puppeteer");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const logger = require("firebase-functions/logger");

admin.initializeApp();
const db = admin.firestore();

setGlobalOptions({ region: "us-central1" });

const GEMINI_API_KEY = "TU_API_KEY_DE_GEMINI";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

exports.scrapeOffers = onCall({
    timeoutSeconds: 540,
    memory: '1GiB'
}, async (request) => {
    logger.info("Verificando permisos de administrador...");
    if (!request.auth || !request.auth.uid) {
        throw new HttpsError('unauthenticated', 'El usuario no está autenticado.');
    }
    const uid = request.auth.uid;
    const userDoc = await db.collection('users').doc(uid).get();
    if (userDoc.data().isAdmin !== true) {
        throw new HttpsError('permission-denied', 'Solo los administradores pueden ejecutar esta acción.');
    }
    logger.info("Permisos verificados.");

    const { url, brandName } = request.data;
    if (!url || !brandName) {
        throw new HttpsError('invalid-argument', 'Se requiere la URL y el nombre de la marca.');
    }

    try {
        logger.info(`[Paso 1/4] Iniciando Puppeteer para ${url}`);
        const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        const pageText = await page.evaluate(() => document.body.innerText);
        await browser.close();
        logger.info(`[Paso 2/4] Texto extraído (${pageText.length} caracteres). Enviando a Gemini...`);

        const prompt = `Analyze the following text from a webpage and extract any special offers, discounts, or promo codes. Return the data ONLY as a JSON array of objects. Each object must have "description" (string), "code" (string or null), and "expires" (string in YYYY-MM-DD format or null). TEXT: --- ${pageText.substring(0, 30000)} ---`;
        const result = await model.generateContent(prompt);
        const response = result.response;
        const jsonResponse = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
        const foundDeals = JSON.parse(jsonResponse);
        logger.info(`[Paso 3/4] Gemini ha encontrado ${foundDeals.length} ofertas potenciales.`);

        let createdCount = 0;
        const dealsRef = db.collection('deals');
        const existingDealsSnapshot = await dealsRef.where('brand', '==', brandName).get();
        const existingDeals = existingDealsSnapshot.docs.map(doc => doc.data().description);

        for (const deal of foundDeals) {
            if (!existingDeals.includes(deal.description)) {
                await dealsRef.add({
                    brand: brandName,
                    title: deal.description.substring(0, 50),
                    description: deal.description,
                    code: deal.code || null,
                    expires: deal.expires || null,
                    link: url,
                    type: deal.code ? 'código' : 'oferta',
                    createdAt: admin.firestore.FieldValue.serverTimestamp(),
                });
                createdCount++;
            }
        }
        logger.info(`[Paso 4/4] Proceso completado: ${createdCount} creadas.`);

        return {
            status: 'success',
            foundDeals: foundDeals.length,
            created: createdCount,
            updated: 0,
            details: foundDeals.map(d => ({...d, status: 'PROCESSED'}))
        };

    } catch (error) {
        logger.error("Error en la Cloud Function 'scrapeOffers':", error);
        throw new HttpsError('internal', error.message, error);
    }
});
