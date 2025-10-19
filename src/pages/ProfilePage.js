
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, BookmarkIcon, UserGroupIcon, BellIcon, ClockIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';

// --- Sub-componentes para una UI más limpia ---

const SettingsToggle = ({ label, description, enabled, onChange }) => (
  <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
    <div>
      <h4 className="font-semibold text-gray-800 dark:text-white">{label}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
    <button
      onClick={onChange}
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
        enabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
      }`}
    >
      <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);

const BrandTag = ({ brand, onRemove }) => (
    <div className="flex items-center bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-300 text-sm font-medium px-3 py-1 rounded-full">
        <span>{brand}</span>
        <button onClick={onRemove} className="ml-2 text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-200">
            <XMarkIcon className="w-4 h-4" />
        </button>
    </div>
);


// --- Componente Principal de la Página de Perfil ---

function ProfilePage() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    receiveEmails: true,
    receivePush: false,
    theme: 'system',
    favoriteBrands: [],
  });
  const [newBrand, setNewBrand] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fetchUserSettings = useCallback(async () => {
    if (!currentUser) return;
    setLoading(true);
    const userRef = doc(db, 'users', currentUser.uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      setSettings(prev => ({ ...prev, ...userData.settings }));
    }
    setLoading(false);
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) {
      const timer = setTimeout(() => {
        if (!currentUser) navigate('/');
      }, 1500);
      return () => clearTimeout(timer);
    }
    fetchUserSettings();
  }, [currentUser, navigate, fetchUserSettings]);


  const handleSaveSettings = async () => {
    if (!currentUser) return;
    setIsSaving(true);
    setSaveSuccess(false);
    const userRef = doc(db, 'users', currentUser.uid);
    try {
      await setDoc(userRef, { settings }, { merge: true });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (error) {
      console.error("Error al guardar las preferencias:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddBrand = () => {
      if (newBrand && !settings.favoriteBrands.includes(newBrand)) {
          setSettings(prev => ({...prev, favoriteBrands: [...prev.favoriteBrands, newBrand]}));
          setNewBrand('');
      }
  };

  const handleRemoveBrand = (brandToRemove) => {
      setSettings(prev => ({
          ...prev,
          favoriteBrands: prev.favoriteBrands.filter(brand => brand !== brandToRemove)
      }));
  };
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando perfil...</div>;
  }
  
  if (!currentUser) return null;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors mb-6 font-semibold">
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Volver al inicio
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 sm:p-8 mb-8 relative">
          {/* Botón cerrar sesión */}
          <button onClick={logout} className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white font-bold px-5 py-2 rounded-lg flex items-center gap-2 shadow transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
            Cerrar Sesión
          </button>
          {/* Avatar y datos */}
          <div className="flex flex-col items-center gap-2">
            {currentUser.photoURL ? (
              <img src={currentUser.photoURL} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-4 border-orange-500 mb-2"/>
            ) : (
              <div className="w-24 h-24 rounded-full border-4 border-orange-500 mb-2 flex items-center justify-center bg-white dark:bg-gray-700 select-none">
                <span className="text-4xl font-extrabold text-orange-500">
                  {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : '?'}
                </span>
              </div>
            )}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{currentUser.displayName}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">{currentUser.email}</p>
          </div>
        </div>

        {/* Tarjetas de opciones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {/* Ofertas Guardadas */}
          <div className="bg-red-50 border border-red-100 rounded-xl p-5 flex flex-col gap-2 shadow-sm">
            <div className="flex items-center gap-2">
              <BookmarkIcon className="w-6 h-6 text-red-500" />
              <span className="font-bold text-lg text-red-600">Ofertas Guardadas</span>
            </div>
            <p className="text-gray-600 text-sm">Aquí verás todas las ofertas que has marcado como favoritas para no perderte nada.</p>
            <a className="text-blue-600 font-semibold text-sm hover:underline cursor-pointer">Ver mis ofertas guardadas (próximamente)</a>
          </div>
          {/* Mis Referidos */}
          <div className="bg-green-50 border border-green-100 rounded-xl p-5 flex flex-col gap-2 shadow-sm">
            <div className="flex items-center gap-2">
              <UserGroupIcon className="w-6 h-6 text-green-500" />
              <span className="font-bold text-lg text-green-600">Mis Referidos</span>
            </div>
            <p className="text-gray-600 text-sm">Invita a tus amigos y gana recompensas. ¡Consulta el estado de tus invitaciones!</p>
            <a className="text-blue-600 font-semibold text-sm hover:underline cursor-pointer">Gestionar referidos (próximamente)</a>
          </div>
          {/* Notificaciones */}
          <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-5 flex flex-col gap-2 shadow-sm">
            <div className="flex items-center gap-2">
              <BellIcon className="w-6 h-6 text-yellow-500" />
              <span className="font-bold text-lg text-yellow-600">Notificaciones</span>
            </div>
            <p className="text-gray-600 text-sm">Personaliza las alertas para tus tiendas y categorías favoritas.</p>
            <a className="text-blue-600 font-semibold text-sm hover:underline cursor-pointer">Ajustar preferencias (próximamente)</a>
          </div>
          {/* Historial de Copias */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex flex-col gap-2 shadow-sm">
            <div className="flex items-center gap-2">
              <ClockIcon className="w-6 h-6 text-blue-500" />
              <span className="font-bold text-lg text-blue-600">Historial de Copias</span>
            </div>
            <p className="text-gray-600 text-sm">Revisa los códigos que has copiado recientemente.</p>
            <a className="text-blue-600 font-semibold text-sm hover:underline cursor-pointer">Ver historial (próximamente)</a>
          </div>
        </div>

        {/* Bloque premium */}
        <div className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 p-7 text-center shadow-lg mb-8">
          <h3 className="text-2xl font-extrabold text-white mb-2">¡Desbloquea más con Premium!</h3>
          <p className="text-white text-lg mb-4">Acceso anticipado a ofertas, alertas personalizadas y mucho más.</p>
          <button className="bg-white text-purple-700 font-bold px-6 py-2 rounded-full shadow hover:bg-gray-100 transition-colors" disabled>
            Más información (próximamente)
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
