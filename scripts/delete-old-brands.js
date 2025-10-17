
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize with the correct project ID
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'cazadeals-56767918-79225'
});

const db = admin.firestore();

// Marcas antiguas a eliminar
const oldBrands = [
  'El Corte Inglés',
  'MediaMarkt',
  'PCComponentes',
];

async function deleteOldBrands() {
  console.log('Iniciando la eliminación de marcas antiguas...');
  const batch = db.batch();
  const brandsCollectionRef = db.collection('brands');

  oldBrands.forEach(brandName => {
    const docRef = brandsCollectionRef.doc(brandName);
    batch.delete(docRef);
    console.log(`🗑️ Marca preparada para eliminar: ${brandName}`);
  });

  await batch.commit();
  console.log('\n✨ ¡Marcas antigas eliminadas de la base de datos!');
}

deleteOldBrands().catch(console.error);
