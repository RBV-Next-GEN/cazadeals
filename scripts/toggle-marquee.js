
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const { FieldValue } = require('firebase-admin/firestore');

// Inicializar Firebase Admin SDK si no se ha hecho ya
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

// Obtener la instancia de la base de datos de Admin
const db = admin.firestore();

// ===============================================================================================
// SCRIPT PARA AÑADIR O QUITAR OFERTAS DE LA MARQUESINA
// ===============================================================================================
//
// USO:
// node scripts/toggle-marquee.js <ID_DEL_DOCUMENTO> ["Texto para la marquesina"]
node scripts/toggle-marquee.js 9nJ4evMMPq1jGiRBbZqO "¡Café con 10% de descuento!"


//
// ===============================================================================================

async function toggleMarquee(docId, text) {
    if (!docId) {
        console.error('\x1b[31m%s\x1b[0m', 'Error: ¡Se requiere el ID del documento de la oferta!');
        console.log('Uso: node scripts/toggle-marquee.js <ID_DEL_DOCUMENTO> ["Texto para la marquesina"]');
        return;
    }

    // --- CORRECCIÓN: Usar la sintaxis del Admin SDK para la referencia al documento ---
    const dealRef = db.collection('deals').doc(docId);

    try {
        const docSnap = await dealRef.get();
        if (!docSnap.exists) {
            console.error('\x1b[31m%s\x1b[0m', `Error: No se encontró ninguna oferta con el ID "${docId}".`);
            return;
        }

        const dealData = docSnap.data();

        // Si se proporciona texto, se AÑADE/ACTUALIZA la propiedad 'marquee'
        if (text) {
             // --- CORRECCIÓN: Usar la sintaxis del Admin SDK para actualizar ---
            await dealRef.update({
                marquee: {
                    brand: dealData.brand, 
                    text: text,
                    // Añadimos el tipo para que el componente sepa cómo renderizarlo si es necesario
                    type: dealData.type || 'promoción' 
                }
            });
            console.log('\x1b[32m%s\x1b[0m', `¡Éxito! La oferta "${docId}" se ha añadido a la marquesina con el texto: "${text}"`);
        }
        // Si NO se proporciona texto, se ELIMINA la propiedad 'marquee'
        else {
            // --- CORRECCIÓN: Usar la sintaxis del Admin SDK para eliminar un campo ---
            await dealRef.update({
                marquee: FieldValue.delete()
            });
            console.log('\x1b[33m%s\x1b[0m', `¡Éxito! La oferta "${docId}" se ha eliminado de la marquesina.`);
        }

    } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', 'Error al actualizar el documento:', error);
    }
}

// Obtener los argumentos de la línea de comandos
const docId = process.argv[2];
const text = process.argv[3];

toggleMarquee(docId, text);
