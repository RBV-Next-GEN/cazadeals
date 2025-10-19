
// Importa las configuraciones de Firebase y las funciones necesarias
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, writeBatch } = require('firebase/firestore');

// Copia aquí tu configuración de Firebase desde `src/firebase.js`
const firebaseConfig = {
  apiKey: "AIzaSyALPgh6mj6SWZ83s4CTdeBeIn58oTv-ioM",
  authDomain: "cazadeals-56767918-79225.firebaseapp.com",
  projectId: "cazadeals-56767918",
  storageBucket: "cazadeals-56767918-79225.firebasestorage.app",
  messagingSenderId: "470034906223",
  appId: "1:470034906223:web:e4ae39d7a835890ed1e19a"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- Función para añadir el campo nameLowerCase a las marcas ---
async function addNameLowerCaseToBrands() {
  console.log("Iniciando la adición del campo 'nameLowerCase' a todas las marcas...");

  const batch = writeBatch(db);
  const brandsRef = collection(db, 'brands');

  try {
    const brandsSnapshot = await getDocs(brandsRef);
    
    if (brandsSnapshot.empty) {
      console.log("No se encontraron marcas para actualizar.");
    } else {
      brandsSnapshot.forEach(doc => {
        const brandData = doc.data();
        if (brandData.name) {
          console.log(`- Añadiendo 'nameLowerCase' a la marca: ${brandData.name}`);
          batch.update(doc.ref, { nameLowerCase: brandData.name.toLowerCase() });
        }
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

addNameLowerCaseToBrands();
