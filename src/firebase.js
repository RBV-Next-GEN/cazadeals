
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyALPgh6mj6SWZ83s4CTdeBeIn58oTv-ioM",
  authDomain: "cazadeals-56767918-79225.firebaseapp.com",
  projectId: "cazadeals-56767918-79225",
  storageBucket: "cazadeals-56767918-79225.appspot.com", // Corregido el dominio del bucket
  messagingSenderId: "470034906223",
  appId: "1:470034906223:web:e4ae39d7a835890ed1e19a"
};

// Inicializa Firebase
export const app = initializeApp(firebaseConfig);

// Exporta los servicios que necesitas en el resto de la app
export const db = getFirestore(app);
export const auth = getAuth(app);
