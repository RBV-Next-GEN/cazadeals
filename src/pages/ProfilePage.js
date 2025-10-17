
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, BellIcon, PaintBrushIcon, TagIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
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
  const { currentUser } = useAuth();
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
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors mb-6 font-semibold">
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Volver al inicio
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
             <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center border border-gray-200 dark:border-gray-700">
                <img src={currentUser.photoURL} alt="Avatar" className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-orange-500 mb-4"/>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{currentUser.displayName}</h1>
                <p className="text-gray-500 dark:text-gray-400">{currentUser.email}</p>
             </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 space-y-8">
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold flex items-center mb-4 text-gray-800 dark:text-white"><BellIcon className="w-6 h-6 mr-3 text-orange-500"/>Notificaciones</h2>
                <div className="space-y-4">
                    <SettingsToggle label="Emails con Promociones" description="Recibe las mejores ofertas de la semana en tu correo." enabled={settings.receiveEmails} onChange={() => setSettings(p => ({...p, receiveEmails: !p.receiveEmails}))}/>
                    <SettingsToggle label="Notificaciones Push" description="Recibe alertas instantáneas de ofertas urgentes (próximamente)." enabled={settings.receivePush} onChange={() => setSettings(p => ({...p, receivePush: !p.receivePush}))} />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold flex items-center mb-4 text-gray-800 dark:text-white"><PaintBrushIcon className="w-6 h-6 mr-3 text-orange-500"/>Apariencia</h2>
                <label htmlFor="theme" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tema Preferido</label>
                <select id="theme" value={settings.theme} onChange={(e) => setSettings(p => ({...p, theme: e.target.value}))} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md">
                    <option value="light">Claro</option>
                    <option value="dark">Oscuro</option>
                    <option value="system">Automático (del sistema)</option>
                </select>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold flex items-center mb-4 text-gray-800 dark:text-white"><TagIcon className="w-6 h-6 mr-3 text-orange-500"/>Mis Intereses</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Añade tus tiendas o marcas favoritas para recibir notificaciones personalizadas en el futuro.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {settings.favoriteBrands.map(brand => <BrandTag key={brand} brand={brand} onRemove={() => handleRemoveBrand(brand)}/>)}
                </div>
                <div className="flex gap-2">
                    <input type="text" value={newBrand} onChange={(e) => setNewBrand(e.target.value)} placeholder="Ej: Nike, Amazon..." className="flex-grow px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    <button onClick={handleAddBrand} className="flex items-center bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"><PlusIcon className="w-5 h-5"/></button>
                </div>
            </div>

            <div className="flex justify-end items-center">
                {saveSuccess && <span className="text-green-500 mr-4 font-semibold">¡Preferencias guardadas!</span>}
                <button onClick={handleSaveSettings} disabled={isSaving} className="bg-orange-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-400">
                    {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
