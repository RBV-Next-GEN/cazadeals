
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// URL de tu base de datos
const databaseURL = 'https://cazadeals.firebaseio.com';

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: databaseURL
  });
} catch (error) {
  if (error.code !== 'app/duplicate-app') {
    throw error;
  }
}

const db = admin.firestore();

async function resetDeals() {
  console.log('Iniciando el reseteo de las ofertas...');

  const dealsRef = db.collection('deals');
  const snapshot = await dealsRef.get();

  if (snapshot.empty) {
    console.log('No se encontraron ofertas para resetear.');
    return;
  }

  const batch = db.batch();
  snapshot.forEach(doc => {
    // Actualiza cada oferta para tener copiedCount: 0
    // Si el campo no existe, lo crea. Si ya existe, lo sobrescribe.
    batch.update(doc.ref, { copiedCount: 0 });
  });

  await batch.commit();
  console.log(`\n✨ ¡${snapshot.size} ofertas han sido reseteadas con copiedCount: 0!`);
}

resetDeals().catch(console.error);
