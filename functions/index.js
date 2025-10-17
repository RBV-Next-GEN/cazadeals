
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const puppeteer = require("puppeteer");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors')({ origin: true });

admin.initializeApp();
const db = admin.firestore();

const GEMINI_API_KEY = "TU_API_KEY_DE_GEMINI";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

exports.scrapeOffers = functions.runWith({
    timeoutSeconds: 300,
    memory: '1GB'
}).https.onRequest((req, res) => {
    cors(req, res, async () => {
        if (req.method !== 'POST') {
            return res.status(405).send('Method Not Allowed');
        }

        const token = req.headers.authorization?.split('Bearer ')[1];
        if (!token) {
            return res.status(401).send({ error: { message: 'Unauthorized' } });
        }

        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            const uid = decodedToken.uid;
            const userDoc = await db.collection('users').doc(uid).get();

            if (userDoc.data().isAdmin !== true) {
                return res.status(403).send({ error: { message: 'Permission Denied' } });
            }

            const { url, brandName } = req.body.data;
            if (!url || !brandName) {
                return res.status(400).send({ error: { message: 'Invalid argument: url and brandName are required.' } });
            }

            functions.logger.info(`[Scraping] User ${uid} initiated scraping for ${brandName} at ${url}`);
            
            const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
            const page = await browser.newPage();
            await page.goto(url, { waitUntil: 'networkidle2' });
            const pageText = await page.evaluate(() => document.body.innerText);
            await browser.close();
            
            functions.logger.info(`[Scraping] Text extracted, sending to Gemini...`);

            const prompt = `Analyze the following text from a webpage and extract any special offers, discounts, or promo codes. Return the data ONLY as a JSON array of objects. Each object must have "description" (string), "code" (string or null), and "expires" (string in YYYY-MM-DD format or null). TEXT: --- ${pageText.substring(0, 30000)} ---`;
            
            const result = await model.generateContent(prompt);
            const response = result.response;
            const jsonResponse = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
            const foundDeals = JSON.parse(jsonResponse);

            functions.logger.info(`[Scraping] Gemini found ${foundDeals.length} potential deals.`);

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

            const finalResponse = {
                status: 'success',
                foundDeals: foundDeals.length,
                created: createdCount,
                updated: 0, // Update logic not implemented yet
                details: foundDeals.map(d => ({...d, status: 'PROCESSED'}))
            };
            
            return res.status(200).send({ data: finalResponse });

        } catch (error) {
            functions.logger.error("Error in scrapeOffers function:", error);
            return res.status(500).send({ error: { message: error.message || 'An internal error occurred.' } });
        }
    });
});
