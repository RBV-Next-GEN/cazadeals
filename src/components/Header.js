// filepath: c:\Users\Ricardo Bleda\Documents\Lanzadera\cazadeals\src\components\Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  BellIcon,
  ChevronDownIcon,
  ArrowDownTrayIcon,
  HeartIcon,
  QuestionMarkCircleIcon,
  PencilSquareIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../components/GoogleAuthWrapper';
import SearchBar from './SearchBar';

const Header = ({ user, onLogin, onLogout, searchTerm, onSearchChange }) => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <header className="w-full">
      {/* Barra superior */}
      <div className="bg-slate-800 text-gray-400 text-xs py-2 px-2 sm:px-4 flex flex-wrap justify-center sm:justify-end items-center space-x-2 sm:space-x-4 border-b border-slate-700">
        <Link to="#" className="flex items-center hover:text-orange-400 transition-colors">
          <ArrowDownTrayIcon className="h-4 w-4 mr-1" /> Descarga la aplicación
        </Link>
        <Link to="#" className="flex items-center hover:text-orange-400 transition-colors">
          <HeartIcon className="h-4 w-4 mr-1" /> Mi Lista de Deseos
        </Link>
        <Link to="#" className="flex items-center hover:text-orange-400 transition-colors">
          <QuestionMarkCircleIcon className="h-4 w-4 mr-1" /> Ayuda
        </Link>
        {!user && (
          <Link to="#" className="flex items-center hover:text-orange-400 transition-colors">
            <PencilSquareIcon className="h-4 w-4 mr-1" /> Inscríbete
          </Link>
        )}
      </div>

      {/* Barra principal del Header */}
      {/* CAMBIO: Volvemos a sm:justify-center para centrar el bloque principal */}
      <div className="bg-slate-900 shadow-md py-3 px-4 flex flex-col sm:flex-row items-center sm:justify-center relative"> {/* sm:justify-start -> sm:justify-center */}
        {/* Contenedor para Logo y Búsqueda - CAMBIO: sm:flex-grow para ocupar espacio, sm:justify-center para centrar su contenido */}
        <div className="flex flex-col sm:flex-row items-center w-full sm:flex-grow sm:justify-center"> {/* Añadido sm:justify-center */}
          {/* Logo CazaDeals */}
          <Link to="/" className="flex-shrink-0 text-white no-underline hover:opacity-80 transition-opacity mb-4 sm:mb-0 mr-0 sm:mr-6">
            <h1 className="text-4xl font-sans font-extrabold tracking-tight bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text animated-gradient-text">CazaDeals</h1>
          </Link>

          {/* Área de Búsqueda - CAMBIO: sm:flex-grow para que ocupe el espacio restante, y min-w-0 para permitir que se encoja si es necesario */}
          <div className="flex items-center w-full max-w-xs sm:flex-grow sm:min-w-0"> {/* sm:w-full -> sm:flex-grow, añadido sm:min-w-0 */}
            <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
            <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-r-lg -ml-1 transition-colors">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Iconos y Acceder/Perfil - Se mantienen 'absolute' para no afectar el flujo */}
        <div className="flex items-center justify-center sm:justify-end space-x-4 mt-4 sm:mt-0 w-full sm:w-auto flex-shrink-0 sm:absolute sm:right-4 sm:top-1/2 sm:-translate-y-1/2">
          <button className="text-gray-300 hover:text-orange-400 transition-colors" title="Notificaciones">
            <BellIcon className="h-7 w-7" />
          </button>

          {user ? (
            <div className="relative group">
              <button
                onClick={goToProfile}
                className="flex items-center bg-slate-700 text-gray-100 font-semibold py-2 px-4 rounded-lg shadow hover:bg-slate-600 transition-colors"
              >
                {user.picture && (
                  <img
                    src={user.picture}
                    alt="Avatar"
                    className="h-7 w-7 rounded-full mr-2 flex-shrink-0"
                  />
                )}
                <span className="whitespace-nowrap">Hola, {user.name || 'Usuario'}</span>
                <ChevronDownIcon className="h-5 w-5 ml-2" />
              </button>
            </div>
          ) : (
            <button
              onClick={onLogin}
              className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-orange-600 transition-colors"
            >
              Acceder
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;