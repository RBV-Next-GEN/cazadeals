
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'cazadeals-56767918-79225'
});

const db = admin.firestore();

const dealsData = [
  {
    brand: 'Amazon',
    category: 'Tech',
    type: 'código',
    discount: '15% de descuento',
    description: 'Ahorra en tu próxima compra de productos electrónicos reacondicionados en Amazon Warehouse.',
    code: 'AMAZON15',
    expires: '2024-12-31',
    marquee: true,
    isNew: true,
    createdAt: new Date(),
  },
  {
    brand: 'Nike',
    category: 'Moda',
    type: 'promoción',
    discount: 'Envío Gratis',
    description: 'Envío gratuito en todos los pedidos superiores a 50€. ¡No necesitas código!',
    expires: '2024-10-31',
    marquee: false,
    isNew: true,
    createdAt: new Date(),
  },
  {
    brand: 'Zara',
    category: 'Moda',
    type: 'promoción',
    discount: 'Hasta 50% en rebajas',
    description: 'Las rebajas de mitad de temporada han llegado a Zara. ¡Encuentra tus favoritos a mitad de precio!',
    expires: '2024-09-30',
    marquee: true,
    isNew: true,
    createdAt: new Date(),
  },
  {
    brand: 'GameStop',
    category: 'Gaming',
    type: 'código',
    discount: '10€ de descuento',
    description: 'Compra 2 juegos seminuevos y llévate 10€ de descuento en tu compra total.',
    code: 'GAME10',
    expires: '2024-11-15',
    marquee: false,
    isNew: true,
    createdAt: new Date(),
  },
  {
    brand: 'Glovo',
    category: 'Comida',
    type: 'código',
    discount: '5€ para tu primer pedido',
    description: '¿Nuevo en Glovo? Usa este código y obtén 5€ de descuento en tu primer pedido de restaurante.',
    code: 'HOLA5',
    expires: '2024-12-31',
    marquee: false,
    isNew: true,
    createdAt: new Date(),
  },
  {
    brand: 'Booking.com',
    category: 'Viajes',
    type: 'promoción',
    discount: '15% en escapadas de otoño',
    description: 'Reserva tu hotel para una escapada de otoño y consigue un 15% de descuento inmediato en miles de estancias.',
    expires: '2024-11-30',
    marquee: true,
    isNew: false,
    createdAt: new Date(2023, 10, 15), // old date
  },
    {
    brand: 'Starbucks',
    category: 'Comida',
    type: 'promoción',
    discount: '2x1 en Frappuccinos',
    description: 'Los jueves, disfruta de tu Frappuccino favorito y te invitamos al segundo. Solo en tienda.',
    expires: '2024-10-25',
    marquee: false,
    isNew: false,
    createdAt: new Date(2023, 1, 1), // old date
  },
];

async function addDeals() {
  console.log('Iniciando la adición de ofertas de ejemplo...');
  const batch = db.batch();
  const dealsCollectionRef = db.collection('deals');

dealsData.forEach(deal => {
    const docRef = dealsCollectionRef.doc(); // Firestore generará un ID automático
    batch.set(docRef, deal);
    console.log(`✅ Oferta preparada para ${deal.brand}: ${deal.discount}`);
  });

  await batch.commit();
  console.log('\n✨ ¡Nuevas ofertas añadidas a la base de datos!');
}

addDeals().catch(console.error);
