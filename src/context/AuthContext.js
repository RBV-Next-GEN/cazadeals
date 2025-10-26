import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const loginWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        // Envolvemos signInWithPopup en un .catch para manejar errores de forma controlada.
        signInWithPopup(auth, provider)
            .catch(error => {
                // Si el error es porque el usuario cerró el popup, lo ignoramos silenciosamente.
                // Esto previene el error "Uncaught" en la consola sin afectar al usuario.
                if (error.code === 'auth/popup-closed-by-user') {
                    return; // Simplemente no hacemos nada, que es lo esperado.
                }
                // Para cualquier otro error, sí lo mostramos en la consola para depuración.
                console.error("Error de autenticación con Google:", error);
            });
    };

    const logout = () => {
        return signOut(auth);
    };

    const value = {
        currentUser,
        loginWithGoogle,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
