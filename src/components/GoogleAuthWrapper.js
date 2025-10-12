// filepath: c:\Users\Ricardo Bleda\Documents\Lanzadera\cazadeals\src\components\GoogleAuthWrapper.js
import React, { useState, useEffect, createContext, useContext } from 'react';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';

// Creamos un contexto para compartir el estado del usuario y las funciones de login/logout
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const GoogleAuthWrapper = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para el usuario logueado (datos completos de Google)
  const [profile, setProfile] = useState(null); // Alias para 'user' para mayor claridad en el contexto

  // Hook para iniciar sesión con Google
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => { // Cambiado de codeResponse a tokenResponse para mayor claridad
      console.log('Respuesta de Google:', tokenResponse);
      // Si recibimos un access_token, lo usamos para obtener el perfil del usuario
      if (tokenResponse.access_token) {
        axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`)
          .then((res) => {
            setUser(res.data); // Guarda los datos completos del perfil de Google
            setProfile(res.data); // También actualiza el alias 'profile'
            localStorage.setItem('user', JSON.stringify(res.data)); // Guarda en localStorage
            console.log('Datos de perfil de Google:', res.data);
          })
          .catch((err) => console.log('Error al obtener perfil de Google:', err));
      }
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  // Función para cerrar sesión
  const handleLogout = () => {
    googleLogout(); // Cierra la sesión de Google
    setUser(null); // Limpia el estado del usuario
    setProfile(null); // Limpia el estado del perfil
    localStorage.removeItem('user'); // Elimina el usuario de localStorage
    console.log('Sesión cerrada');
  };

  // Cargar usuario desde localStorage al inicio
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setProfile(parsedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user: profile, login, handleLogout }}> {/* Pasa 'profile' como 'user' */}
      {children}
    </AuthContext.Provider>
  );
};

export default GoogleAuthWrapper;
