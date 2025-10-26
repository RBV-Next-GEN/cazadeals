add amazon deals
// Este script se utiliza para añadir un lote de ofertas específicas de Amazon a la base de datos de Firestore.
// Lee una lista de ofertas predefinidas, las formatea según el esquema de la base de datos y las inserta.

// --- Importaciones de Firebase ---
// Necesitamos acceder a la configuración de la base de datos y a las funciones de Firestore.
const { db } = require('../src/firebase'); // Ajusta la ruta si es necesario
const { collection, addDoc, Timestamp } = require('firebase/firestore');

// --- Datos de las Ofertas ---
// Estos son los datos de las ofertas de Amazon que se van a añadir.
// He transformado los datos que me proporcionaste al formato correcto y he asignado una categoría a cada uno.
const dealsData = [
  {
    brand: 'Amazon',
    category: 'Hogar',
    title: 'VACTechPro V15 Aspiradora sin Cable, 35kPa',
    description: 'Aspiradora 6 en 1 inalámbrica con 35 minutos de autonomía y batería extraíble, ideal para pelo de mascota, alfombra y suelo duro.',
    type: 'promoción',
    discount: '-27%',
    code: null,
    expires: '2025-10-29T22:59:59.000Z',
    url: 'https://www.amazon.es/deal/22a33c88',
    imageUrl: 'https://m.media-amazon.com/images/I/61mMhLs15XL.jpg',
    price: '94.05',
    listPrice: '129.0',
    isNew: true,
    marquee: false,
  },
  {
    brand: 'Amazon',
    category: 'Hogar',
    title: 'Utopia Bedding Protector Colchón 150x200x40 cm',
    description: 'Protector de colchón impermeable y transpirable con certificación Oeko-Tex. Elástico en todo el contorno para un ajuste perfecto.',
    type: 'promoción',
    discount: '-15%',
    code: null,
    expires: '2025-10-26T22:59:59.000Z',
    url: 'https://www.amazon.es/deal/10ccb8b4',
    imageUrl: 'https://m.media-amazon.com/images/I/71e7b+OmvbL.jpg',
    price: '13.53',
    listPrice: '15.99',
    isNew: true,
    marquee: false,
  },
  {
    brand: 'Amazon',
    category: 'Tech',
    title: 'Braun Series 9 Pro+ Afeitadora Eléctrica',
    description: 'Máquina de afeitar para hombre con cabezal ProComfort. Incluye centro de limpieza SmartCare 6 en 1.',
    type: 'promoción',
    discount: '-43%',
    code: null,
    expires: '2025-11-05T22:59:59.000Z',
    url: 'https://www.amazon.es/deal/8c7c4931',
    imageUrl: 'https://m.media-amazon.com/images/I/61IefkQKvRL.jpg',
    price: '284.99',
    listPrice: '499.99',
    isNew: true,
    marquee: false,
  },
  {
    brand: 'Amazon',
    category: 'Hogar',
    title: 'Candy Placa Inducción 3 Zonas',
    description: 'Placa de 60cm con 9 niveles de potencia, booster, mandos centrales y bloqueo de seguridad.',
    type: 'promoción',
    discount: '-37%',
    code: null,
    expires: '2025-10-26T22:59:59.000Z',
    url: 'https://www.amazon.es/deal/9afd1784',
    imageUrl: 'https://m.media-amazon.com/images/I/61vuAk9DsRL.jpg',
    price: '143.65',
    listPrice: '229.0',
    isNew: true,
    marquee: false,
  },
  {
    brand: 'Amazon',
    category: 'Tech',
    title: 'LEFANT M3 MAX Robot Aspirador y Fregasuelos',
    description: 'Robot todo-en-uno con 20,000 Pa de succión, auto-vaciado, auto-lavado y secado de mopa, y evasión de obstáculos.',
    type: 'promoción',
    discount: '-71%',
    code: null,
    expires: '2025-10-28T22:59:59.000Z',
    url: 'https://www.amazon.es/deal/0a69f686',
    imageUrl: 'https://m.media-amazon.com/images/I/71tLYNFeJqL.jpg',
    price: '379.99',
    listPrice: '1299.99',
    isNew: true,
    marquee: false,
  },
  {
    brand: 'Amazon',
    category: 'Tech',
    title: 'AI Auriculares Traductores de Idiomas',
    description: 'Auriculares de traducción en tiempo real para 164 idiomas, con 7 modos, Bluetooth 5.4 y 58 horas de batería.',
    type: 'promoción',
    discount: '-71%',
    code: null,
    expires: '2025-10-28T22:59:59.000Z',
    url: 'https://www.amazon.es/deal/4d085334',
    imageUrl: 'https://m.media-amazon.com/images/I/71qWm8cnsJL.jpg',
    price: '37.99',
    listPrice: '129.99',
    isNew: true,
    marquee: false,
  },
  {
    brand: 'Amazon',
    category: 'Tech',
    title: 'ULTIMEA 7.1ch Barra de Sonido con Dolby Atmos',
    description: 'Sistema de sonido envolvente 3D de 460W con subwoofer inalámbrico, 4 altavoces y control por app.',
    type: 'promoción',
    discount: '-10%',
    code: null,
    expires: '2025-11-04T22:59:59.000Z',
    url: 'https://www.amazon.es/deal/d5808458',
    imageUrl: 'https://m.media-amazon.com/images/I/71yN3g5CdmL.jpg',
    price: '269.99',
    listPrice: '299.99',
    isNew: true,
    marquee: false,
  },
    {
    brand: 'Amazon',
    category: 'Gaming',
    title: 'Silla Gaming Ergonómica Reclinable',
    description: 'Silla con cojín lumbar y cervical, respaldo alto acolchado y altura ajustable. Ideal para oficina o videojuegos.',
    type: 'promoción',
    discount: '-20%',
    code: null,
    expires: '2025-11-02T22:45:00.000Z',
    url: 'https://www.amazon.es/deal/0966f75a',
    imageUrl: 'https://m.media-amazon.com/images/I/51fUnqEsUJL.jpg',
    price: '71.99',
    listPrice: '89.99',
    isNew: true,
    marquee: false,
  },
  {
    brand: 'Amazon',
    category: 'Moda',
    title: 'Vans Ward, Zapatillas Unisex Niños',
    description: 'Clásicas zapatillas de la marca Vans, modelo Ward, para niños.',
    type: 'promoción',
    discount: '-50%',
    code: null,
    expires: '2025-10-31T22:59:59.000Z',
    url: 'https://www.amazon.es/deal/4e63e01b',
    imageUrl: 'https://m.media-amazon.com/images/I/71DP7iycalL.jpg',
    price: '25.0',
    listPrice: '50.0',
    isNew: true,
    marquee: false,
  },
  {
    brand: 'Amazon',
    category: 'Gaming',
    title: 'Logitech G G502 X LIGHTSPEED Ratón Inalámbrico',
    description: 'Ratón gaming óptico con interruptores híbridos LIGHTFORCE y sensor HERO 25K. Compatible con PC y macOS.',
    type: 'promoción',
    discount: '-21%',
    code: null,
    expires: '2025-10-29T22:59:59.000Z',
    url: 'https://www.amazon.es/deal/862aafe0',
    imageUrl: 'https://m.media-amazon.com/images/I/31V-W6XXvgL.jpg',
    price: '78.5',
    listPrice: '99.99',
    isNew: true,
    marquee: false,
  }
];

// --- Función para Añadir los Deals a Firestore ---
const addDealsToFirestore = async () => {
  console.log('Iniciando la carga de ofertas de Amazon a Firestore...');
  const dealsCollection = collection(db, 'deals');

  for (const deal of dealsData) {
    try {
      // Convierte la fecha de expiración a un objeto Timestamp de Firestore
      const dealWithTimestamp = {
        ...deal,
        expires: Timestamp.fromDate(new Date(deal.expires)),
        createdAt: Timestamp.now(), // Usa el tiempo actual del servidor para la creación
      };
      const docRef = await addDoc(dealsCollection, dealWithTimestamp);
      console.log(`✅ Oferta añadida con ID: ${docRef.id} -> ${deal.title}`);
    } catch (error) {
      console.error(`❌ Error al añadir la oferta "${deal.title}":`, error);
    }
  }

  console.log('\n--- Carga completada. --- ');
  console.log('El script ha finalizado. Puede que necesites detenerlo manualmente (Ctrl+C).');
};

// --- Ejecución del Script ---
addDealsToFirestore();

