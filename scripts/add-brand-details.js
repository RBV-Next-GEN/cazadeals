
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// URL de tu base de datos
const databaseURL = 'https://cazadeals.firebaseio.com';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL
});

const db = admin.firestore();

// Datos de ejemplo para las marcas. ¡Puedes cambiarlos como quieras!
const brandData = {
  'Amazon': {
    rating: 4.8,
    reviewCount: 255,
    description: 'Encuentra casi cualquier cosa que imagines. Desde tecnología hasta moda, con ofertas que cambian a diario.',
  },
  'Nike': {
    rating: 4.9,
    reviewCount: 189,
    description: 'Líder en ropa y calzado deportivo. Sus códigos de descuento son perfectos para renovar tu equipo de entrenamiento.'
  },
  'Starbucks': {
    rating: 4.6,
    reviewCount: 98,
    description: 'El mejor lugar para tu café diario. Usa nuestras promos para disfrutar de tu bebida favorita por menos.'
  },
  'Zara': {
    rating: 4.5,
    reviewCount: 150,
    description: 'Las últimas tendencias de moda a precios asequibles. Ofertas constantes en todas sus colecciones.'
  },
  'GameStop': {
    rating: 4.3,
    reviewCount: 112,
    description: 'Tu paraíso de videojuegos. Encuentra promociones en consolas, juegos nuevos y seminuevos.'
  },
  'Glovo': {
    rating: 4.7,
    reviewCount: 210,
    description: '¿Hambre? ¿Necesitas algo del súper? Glovo te lo lleva a casa en minutos. Ahorra en tus envíos con nuestros códigos.'
  },
  'Booking.com': {
    rating: 4.8,
    reviewCount: 320,
    description: 'Reserva tus próximas vacaciones al mejor precio. Encuentra ofertas en hoteles, apartamentos y vuelos.'
  }
};

async function addBrandDetails() {
  console.log('Iniciando la adición de detalles de marcas a la base de datos...');
  const batch = db.batch();

  for (const [brandName, details] of Object.entries(brandData)) {
    // Usamos el nombre de la marca como ID del documento para que sea fácil de encontrar
    const brandRef = db.collection('brands').doc(brandName);
    batch.set(brandRef, {
      name: brandName,
      ...details
    });
    console.log(`✅ Datos preparados para: ${brandName}`);
  }

  await batch.commit();
  console.log('\n✨ ¡Base de datos actualizada con los detalles de las marcas!');
}

addBrandDetails().catch(console.error);
