const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const addIsNewField = async () => {
  console.log('Buscando ofertas para añadir el campo `isNew`...');
  try {
    // Primero, quitamos la marca `isNew` de todas las ofertas
    const allDealsSnapshot = await db.collection('deals').where('isNew', '==', true).get();
    if (!allDealsSnapshot.empty) {
      console.log(`Eliminando la marca 'isNew' de ${allDealsSnapshot.size} ofertas antiguas...`);
      const resetBatch = db.batch();
      allDealsSnapshot.docs.forEach(doc => {
        resetBatch.update(doc.ref, { isNew: false });
      });
      await resetBatch.commit();
    }

    // Ahora, añadimos la marca `isNew` a las 5 más recientes
    const dealsSnapshot = await db.collection('deals').orderBy('createdAt', 'desc').limit(5).get();
    
    if (dealsSnapshot.empty) {
      console.log('No se encontraron ofertas para marcar como nuevas.');
      return;
    }

    console.log(`Marcando ${dealsSnapshot.size} ofertas como nuevas...`);

    const batch = db.batch();
    dealsSnapshot.docs.forEach(doc => {
      batch.update(doc.ref, { isNew: true });
    });

    await batch.commit();
    console.log('\x1b[32m¡Éxito! Se ha añadido el campo `isNew` a las 5 ofertas más recientes.\x1b[0m');

  } catch (error) {
    console.error('\x1b[31mError al actualizar las ofertas:\x1b[0m', error);
  }
};

addIsNewField();
