import React, { useEffect } from 'react'; // Importa useEffect para el log
import { motion } from 'framer-motion';
import { UserCircleIcon, BookmarkIcon, ShareIcon, BellIcon, ClockIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const UserProfile = ({ user, onLogout }) => {
  // Añade este useEffect para depurar el objeto 'user'
  useEffect(() => {
    console.log("UserProfile recibió la prop 'user':", user);
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Acceso Denegado</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Por favor, inicia sesión para ver tu perfil.</p>
          <a href="/" className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition-colors">Ir a Inicio</a>
        </div>
      </div>
    );
  }

  // Prioriza given_name si existe, sino name, sino 'Usuario'
  const displayName = user.given_name || user.name || 'Usuario';
  const displayEmail = user.email || 'Email no disponible'; // Fallback para el email

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-8"
    >
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-8 border-b pb-4 border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            {user.picture ? ( // Si user.picture existe, usa la imagen de Google
              <img src={user.picture} alt="Avatar" className="w-16 h-16 rounded-full border-2 border-red-500" />
            ) : ( // Si no, usa el icono genérico
              <UserCircleIcon className="w-16 h-16 text-gray-400 dark:text-gray-500" />
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{displayName}</h1>
              <p className="text-gray-600 dark:text-gray-400">{displayEmail}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 transition-colors"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>

        {/* Secciones de Contenido de Valor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ofertas Guardadas */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600"
          >
            <div className="flex items-center text-red-500 mb-3">
              <BookmarkIcon className="w-6 h-6 mr-2" />
              <h3 className="text-xl font-semibold dark:text-white">Ofertas Guardadas</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Aquí verás todas las ofertas que has marcado como favoritas para no perderte nada.
            </p>
            <button className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Ver mis ofertas guardadas (próximamente)</button>
          </motion.div>

          {/* Mis Referidos */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600"
          >
            <div className="flex items-center text-green-500 mb-3">
              <ShareIcon className="w-6 h-6 mr-2" />
              <h3 className="text-xl font-semibold dark:text-white">Mis Referidos</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Invita a tus amigos y gana recompensas. ¡Consulta el estado de tus invitaciones!
            </p>
            <button className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Gestionar referidos (próximamente)</button>
          </motion.div>

          {/* Configuración de Notificaciones */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600"
          >
            <div className="flex items-center text-yellow-500 mb-3">
              <BellIcon className="w-6 h-6 mr-2" />
              <h3 className="text-xl font-semibold dark:text-white">Notificaciones</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Personaliza las alertas para tus tiendas y categorías favoritas.
            </p>
            <button className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Ajustar preferencias (próximamente)</button>
          </motion.div>

          {/* Historial de Códigos Copiados */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600"
          >
            <div className="flex items-center text-blue-500 mb-3">
              <ClockIcon className="w-6 h-6 mr-2" />
              <h3 className="text-xl font-semibold dark:text-white">Historial de Copias</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Revisa los códigos que has copiado recientemente.
            </p>
            <button className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Ver historial (próximamente)</button>
          </motion.div>
        </div>

        {/* Sección Premium Tease */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg shadow-md text-center"
        >
          <h3 className="text-2xl font-bold mb-2">¡Desbloquea más con Premium!</h3>
          <p className="text-lg mb-4">Acceso anticipado a ofertas, alertas personalizadas y mucho más.</p>
          <button className="bg-white text-purple-700 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition-colors">
            Más información (próximamente)
          </button>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default UserProfile;