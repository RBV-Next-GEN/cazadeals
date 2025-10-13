const admin = require('firebase-admin');

// El usuario debe descargar este archivo desde la consola de Firebase
const serviceAccount = require('./serviceAccountKey.json');

// URL de la base de datos del usuario
const databaseURL = 'https://cazadeals.firebaseio.com';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL
});

const db = admin.firestore();

// Mapeo de nombres de tiendas a dominios para encontrar sus logos
const storeToDomain = {
  'Amazon': 'amazon.com',
  'Nike': 'nike.com',
  'Starbucks': 'starbucks.com',
  'Zara': 'zara.com',
  'GameStop': 'gamestop.com',
  'Glovo': 'glovoapp.com',
  'Booking.com': 'booking.com'
};

async function addLogosToDeals() {
  console.log('Iniciando la adición de logos a la base de datos...');
  const dealsRef = db.collection('deals');
  const snapshot = await dealsRef.get();

  if (snapshot.empty) {
    console.log('No se encontraron ofertas en la base de datos.');
    return;
  }

  const batch = db.batch();

  snapshot.forEach(doc => {
    const deal = doc.data();
    // CORRECCIÓN: Usamos 'store' en lugar de 'brand'
    const domain = storeToDomain[deal.store];

    if (domain) {
      const logoUrl = `https://logo.clearbit.com/${domain}`;
      const dealRef = dealsRef.doc(doc.id);
      batch.update(dealRef, { logoUrl: logoUrl });
      console.log(`✅ Logo preparado para: ${deal.store}`);
    } else {
      console.log(`⚠️ No se encontró dominio para: ${deal.store}`);
    }
  });

  await batch.commit();
  console.log('\n✨ ¡Base de datos actualizada con los logos con éxito!');
}

addLogosToDeals().catch(console.error);
