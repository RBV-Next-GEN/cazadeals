
const admin = require('firebase-admin');

// --- PASO 1: Configuración ---
// Reemplaza esta línea con la ruta a tu archivo de clave de cuenta de servicio
const serviceAccount = require('../cazadeals-56767918-79225-firebase-adminsdk-fbsvc-23e37aeb59.json'); 

// Reemplaza con el ID de tu proyecto de Firebase
const projectId = 'cazadeals-56767918'; 

// Inicializa la app de Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: projectId,
});

const db = admin.firestore();

// --- Función para actualizar nombres de marcas ---
async function updateBrandNames() {
  console.log("Iniciando la actualización de nombres de marca de 'GameStop' a 'Game' (con permisos de admin)...");

  const batch = db.batch();
  const oldBrandName = 'GameStop';
  const newBrandName = 'Game';

  try {
    // 1. Actualizar la colección 'deals'
    const dealsQuery = db.collection('deals').where('brand', '==', oldBrandName);
    const dealsSnapshot = await dealsQuery.get();
    
    if (dealsSnapshot.empty) {
      console.log("No se encontraron ofertas de 'GameStop' para actualizar.");
    } else {
      dealsSnapshot.forEach(doc => {
        console.log(`- Marcando oferta para actualizar: ${doc.id}`);
        batch.update(doc.ref, { brand: newBrandName });
      });
      console.log(`${dealsSnapshot.size} ofertas marcadas para actualizar.`);
    }

    // 2. Actualizar la colección 'brands'
    const brandsQuery = db.collection('brands').where('name', '==', oldBrandName);
    const brandsSnapshot = await brandsQuery.get();

    if (brandsSnapshot.empty) {
      console.log("No se encontró la marca 'GameStop' para actualizar.");
    } else {
      brandsSnapshot.forEach(doc => {
        console.log(`- Marcando marca para actualizar: ${doc.id}`);
        batch.update(doc.ref, { name: newBrandName });
      });
      console.log(`${brandsSnapshot.size} marcas marcadas para actualizar.`);
    }
    
    // Ejecutar todas las actualizaciones en un solo lote
    await batch.commit();
    console.log("¡Actualización completada exitosamente en la base de datos!");

  } catch (error) {
    console.error("Error durante el proceso de actualización con admin:", error);
  }
}

updateBrandNames();
