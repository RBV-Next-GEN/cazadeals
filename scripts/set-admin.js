
const admin = require('firebase-admin');

// --- CONFIGURACIÓN ---
// Asegúrate de que la ruta a tu clave de servicio sea correcta.
const serviceAccount = require('../cazadeals-56767918-79225-firebase-adminsdk-fbsvc-23e37aeb59.json');
const projectId = 'cazadeals-56767918'; 

// El email del usuario que quieres hacer administrador.
const ADMIN_EMAIL = 'ricardobledaoficial@gmail.com';

// --- INICIALIZACIÓN DE FIREBASE ---
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: projectId,
});

const db = admin.firestore();

// --- FUNCIÓN PRINCIPAL ---
async function setAdminUser() {
  try {
    console.log(`Buscando usuario con el email: ${ADMIN_EMAIL}...`);
    
    // Busca en la colección 'users' el documento que coincida con el email.
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', ADMIN_EMAIL).get();

    if (snapshot.empty) {
      console.error('----------------------------------------------------------------');
      console.error(`¡ERROR! No se encontró ningún usuario con el email ${ADMIN_EMAIL}.`);
      console.error('Por favor, asegúrate de que este usuario ha iniciado sesión en la web al menos una vez.');
      console.error('----------------------------------------------------------------');
      return;
    }
    
    if (snapshot.size > 1) {
        console.warn(`ADVERTENCIA: Se encontraron ${snapshot.size} usuarios con el mismo email. Se actualizará el primero.`);
    }

    const userDoc = snapshot.docs[0];
    console.log(`Usuario encontrado: ${userDoc.id} (${userDoc.data().displayName})`);

    // Actualiza el documento del usuario para añadir el campo isAdmin.
    await userDoc.ref.update({ isAdmin: true });

    console.log('----------------------------------------------------------------');
    console.log(`¡ÉXITO! El usuario ${ADMIN_EMAIL} ahora es administrador.`);
    console.log('Ya puedes acceder a la ruta /admin en la aplicación.');
    console.log('----------------------------------------------------------------');

  } catch (error) {
    console.error('Error al ejecutar el script:', error);
  }
}

setAdminUser();
