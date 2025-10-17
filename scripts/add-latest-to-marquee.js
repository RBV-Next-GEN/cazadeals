const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Inicializar Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

// ===============================================================================================
// SCRIPT PARA AÑADIR LAS 10 ÚLTIMAS OFERTAS A LA MARQUESINA
// ===============================================================================================

async function addLatestDealsToMarquee() {
    console.log('Buscando las 10 ofertas más recientes para añadir a la marquesina...');

    const dealsRef = db.collection('deals');
    const marqueeRef = db.collection('marquee').doc('latest');

    try {
        // 1. Obtener las 10 ofertas más recientes
        const snapshot = await dealsRef.orderBy('createdAt', 'desc').limit(10).get();

        if (snapshot.empty) {
            console.log('No se encontraron ofertas en la base de datos.');
            return;
        }

        // 2. Mapear las ofertas al formato deseado, con fallbacks
        const marqueeDeals = snapshot.docs.map(doc => {
            const deal = doc.data();
            return {
                brand: deal.brand,
                // Si no hay descripción, usar el descuento. Si no, texto vacío.
                text: deal.description || deal.discount || '',
                id: doc.id
            };
        });

        // 3. Actualizar la colección de la marquesina
        await marqueeRef.set({ deals: marqueeDeals });

        console.log('\\x1b[32m%s\\x1b[0m', `¡Éxito! Se han añadido ${marqueeDeals.length} ofertas a la marquesina.`);

    } catch (error) {
        console.error('\\x1b[31m%s\\x1b[0m', 'Error al añadir ofertas a la marquesina:', error);
    }
}

addLatestDealsToMarquee();
