
// Importa las configuraciones de Firebase y las funciones necesarias
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, writeBatch, query, where } = require('firebase/firestore');

// Copia aquí tu configuración de Firebase desde `src/firebase.js`
const firebaseConfig = {
  apiKey: "AIzaSyALPgh6mj6SWZ83s4CTdeBeIn58oTv-ioM",
  authDomain: "cazadeals-56767918-79225.firebaseapp.com",
  projectId: "cazadeals-56767918", // He extraído esto de tus archivos de configuración
  storageBucket: "cazadeals-56767918-79225.firebasestorage.app",
  messagingSenderId: "470034906223",
  appId: "1:470034906223:web:e4ae39d7a835890ed1e19a"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- Función para actualizar nombres de marcas ---
async function updateBrandNames() {
  console.log("Iniciando la actualización de nombres de marca de 'GameStop' a 'Game'...");

  const batch = writeBatch(db);
  const oldBrandName = 'GameStop';
  const newBrandName = 'Game';

  try {
    // 1. Actualizar la colección 'deals'
    const dealsQuery = query(collection(db, 'deals'), where('brand', '==', oldBrandName));
    const dealsSnapshot = await getDocs(dealsQuery);
    
    if (dealsSnapshot.empty) {
      console.log("No se encontraron ofertas de 'GameStop' para actualizar.");
    } else {
      dealsSnapshot.forEach(doc => {
        console.log(`- Actualizando oferta: ${doc.id}`);
        batch.update(doc.ref, { brand: newBrandName });
      });
      console.log(`${dealsSnapshot.size} ofertas marcadas para actualizar.`);
    }

    // 2. Actualizar la colección 'brands'
    const brandsQuery = query(collection(db, 'brands'), where('name', '==', oldBrandName));
    const brandsSnapshot = await getDocs(brandsQuery);

    if (brandsSnapshot.empty) {
      console.log("No se encontró la marca 'GameStop' para actualizar.");
    } else {
      brandsSnapshot.forEach(doc => {
        console.log(`- Actualizando marca: ${doc.id}`);
        batch.update(doc.ref, { name: newBrandName });
      });
      console.log(`${brandsSnapshot.size} marcas marcadas para actualizar.`);
    }
    
    // Ejecutar todas las actualizaciones en un solo lote
    await batch.commit();
    console.log("¡Actualización completada exitosamente!");

  } catch (error) {
    console.error("Error durante el proceso de actualización:", error);
  } finally {
      // Cierra la conexión. En un script simple de Node.js, esto se maneja saliendo del proceso.
      process.exit(0);
  }
}

updateBrandNames();
