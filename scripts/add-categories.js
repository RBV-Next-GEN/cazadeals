// scripts/add-categories.js
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// IMPORTANTE: Reemplaza con la ruta a tu clave de servicio de Firebase
const serviceAccount = require('../firebase-service-account.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const categoriesData = [
  { name: 'Comida', icon: '...url_o_svg_comida...' }, // Reemplazar con SVGs reales
  { name: 'Gaming', icon: '...url_o_svg_gaming...' },
  { name: 'Libros', icon: '...url_o_svg_libros...' },
  { name: 'Moda', icon: '...url_o_svg_moda...' },
  { name: 'Tech', icon: '...url_o_svg_tech...' },
  { name: 'Viajes', icon: '...url_o_svg_viajes...' },
  { name: 'Tiendas', icon: '...url_o_svg_tiendas...', special: true } // Añadimos un flag para el estilo especial
];

async function addCategories() {
  const categoriesCollectionRef = db.collection('categories');
  const batch = db.batch();

  console.log('🔥 Empezando a añadir categorías...');

  // Limpiar categorías existentes (opcional, pero recomendado para consistencia)
  const snapshot = await categoriesCollectionRef.get();
  if (!snapshot.empty) {
    console.log('🗑️  Limpiando categorías antiguas...');
    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
  }

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
