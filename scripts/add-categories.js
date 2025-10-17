
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize with the correct project ID
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'cazadeals-56767918-79225'
});

const db = admin.firestore();

// Datos de las categorías a añadir
const categoriesData = [
  { name: 'Tech', icon: 'ComputerDesktopIcon' },
  { name: 'Moda', icon: 'ShoppingBagIcon' },
  { name: 'Comida', icon: 'CakeIcon' },
  { name: 'Gaming', icon: 'PuzzlePieceIcon' },
  { name: 'Libros', icon: 'BookOpenIcon' },
  { name: 'Viajes', icon: 'GlobeAltIcon' }
];

async function addCategories() {
  console.log('Iniciando la adición de categorías...');
  const batch = db.batch();

  const categoriesCollectionRef = db.collection('categories');

  categoriesData.forEach(category => {
    // Usamos el nombre de la categoría como ID del documento para evitar duplicados
    const docRef = categoriesCollectionRef.doc(category.name);
    batch.set(docRef, category);
    console.log(`✅ Categoría preparada para añadir: ${category.name}`);
  });

  await batch.commit();
  console.log('\n✨ ¡Categorías añadidas a la base de datos!');
}

addCategories().catch(console.error);
