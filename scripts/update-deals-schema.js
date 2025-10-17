
const admin = require('firebase-admin');

// ===============================================================================================
// PASO 1: CONFIGURACIÓN
// ===============================================================================================
// Descarga tu clave de cuenta de servicio desde la Consola de Firebase y colócala en el proyecto.
// Ve a: Consola de Firebase > Proyecto 'cazadeals' > Engranaje (Configuración) > Cuentas de servicio
// Haz clic en "Generar nueva clave privada" y guarda el archivo JSON DENTRO DE LA CARPETA 'scripts'.
// ¡¡IMPORTANTE!! No subas este archivo a un repositorio público como GitHub.
const serviceAccount = require('./serviceAccountKey.json'); // <-- CAMBIO: Ahora busca el archivo en la misma carpeta.

// Inicializa la app de Firebase Admin.
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// ===============================================================================================
// PASO 2: DATOS DE LAS MARCAS
// ===============================================================================================
const brandDataMap = {
  'Amazon': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    discount: '15%'
  },
  'Nike': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
    discount: '20%'
  },
  'PcComponentes': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/PcComponentes_logo_2021.svg/1024px-PcComponentes_logo_2021.svg.png',
    discount: '10€'
  },
  'Domino\'s Pizza': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Dominos_pizza_logo.svg',
    discount: '2x1'
  },
  'Starbucks': {
    logo: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg',
    discount: 'Bebida Gratis'
  },
  'Zara': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg',
    discount: '30%'
  },
};


// ===============================================================================================
// PASO 3: FUNCIÓN DE ACTUALIZACIÓN
// ===============================================================================================
async function updateDealsSchema() {
  const dealsRef = db.collection('deals');
  const snapshot = await dealsRef.get();

  if (snapshot.empty) {
    console.log('No se encontraron ofertas en la colección "deals".');
    return;
  }

  const batch = db.batch();

  snapshot.forEach(doc => {
    const deal = doc.data();
    const docRef = dealsRef.doc(doc.id);

    const brandName = deal.brand || deal.store;

    if (!brandName) {
      console.warn(`La oferta con ID ${doc.id} no tiene campo "brand" o "store". Se omitirá.`);
      return;
    }

    const brandData = brandDataMap[brandName];
    if (!brandData) {
      console.warn(`No se encontraron datos para la marca "${brandName}" en brandDataMap. Se omitirá el logo/descuento.`);
    }

    const updateData = {
      activatedCount: deal.activatedCount || 0,
      discount: deal.discount || (brandData ? brandData.discount : 'Ahorro'),
      brandLogo: deal.brandLogo || (brandData ? brandData.logo : ''),
      isExclusive: deal.isExclusive === undefined ? false : deal.isExclusive,
      brand: brandName,
    };
    
    batch.update(docRef, updateData);

    if (deal.store) {
      batch.update(docRef, { store: admin.firestore.FieldValue.delete() });
    }
  });

  await batch.commit();

  console.log(`¡Proceso completado! Se han actualizado ${snapshot.size} ofertas.`);
}

updateDealsSchema().catch(error => {
  console.error('Ocurrió un error al ejecutar el script:', error);
});
