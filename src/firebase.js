// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFb9iuTHzQCdtZaeEKzK3NPNlRWMNfcf0",
  authDomain: "cazadeals.firebaseapp.com",
  projectId: "cazadeals",
  storageBucket: "cazadeals.firebasestorage.app",
  messagingSenderId: "161064154877",
  appId: "1:161064154877:web:995003b7e214a1f8517094",
  measurementId: "G-GHNWNSJDBS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Obtener una instancia de Firestore
// Esta es la base de datos que usaremos para almacenar y leer las ofertas
const db = getFirestore(app);

export { db };