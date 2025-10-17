
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const AdminRouteGuard = ({ children }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      // Si no hay usuario logueado, no es admin
      if (!currentUser) {
        navigate('/'); // Redirige a la página principal
        return;
      }

      // Si hay un usuario, verifica su rol en Firestore
      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists() && userDoc.data().isAdmin === true) {
          setIsAdmin(true);
        } else {
          // Si no tiene el flag de admin, redirige
          navigate('/');
        }
      } catch (error) {
        console.error("Error al verificar el estado de administrador:", error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, [currentUser, navigate]);

  // Muestra una pantalla de carga mientras se verifica el estado
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Verificando permisos...</p>
      </div>
    );
  }

  // Si es admin, muestra el contenido protegido (el dashboard)
  return isAdmin ? children : null;
};

export default AdminRouteGuard;
