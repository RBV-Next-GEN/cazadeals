import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
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

// CAMBIO: Se añade la prop "stores"
const Header = ({ user, onLogin, searchTerm, onSearchChange, stores }) => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <header className="w-full border-b border-gray-200 dark:border-transparent">
      {/* Barra superior */}
      <div className="bg-secondary-light dark:bg-secondary-dark text-text-secondary-light dark:text-text-secondary-dark text-xs py-2 px-2 sm:px-4 flex flex-wrap justify-center sm:justify-end items-center space-x-2 sm:space-x-4 border-b border-gray-200 dark:border-tertiary-dark">
        <Link to="#" className="flex items-center hover:text-accent-orange-light dark:hover:text-accent-orange-dark transition-colors">
          <ArrowDownTrayIcon className="h-4 w-4 mr-1" /> Descarga la aplicación
        </Link>
        <Link to="#" className="flex items-center hover:text-accent-orange-light dark:hover:text-accent-orange-dark transition-colors">
          <HeartIcon className="h-4 w-4 mr-1" /> Mi Lista de Deseos
        </Link>
        <Link to="#" className="flex items-center hover:text-accent-orange-light dark:hover:text-accent-orange-dark transition-colors">
          <QuestionMarkCircleIcon className="h-4 w-4 mr-1" /> Ayuda
        </Link>
        {!user && (
          <Link to="#" className="flex items-center hover:text-accent-orange-light dark:hover:text-accent-orange-dark transition-colors">
            <PencilSquareIcon className="h-4 w-4 mr-1" /> Inscríbete
          </Link>
        )}
      </div>

      {/* Barra principal del Header */}
      <div className="bg-primary-light dark:bg-header-dark shadow-md py-3 px-4 flex flex-col sm:flex-row items-center sm:justify-center relative">
        <div className="flex flex-col sm:flex-row items-center w-full sm:flex-grow sm:justify-center">
          {/* Logo CazaDeals */}
          <Link to="/" className="flex-shrink-0 no-underline hover:opacity-80 transition-opacity mb-4 sm:mb-0 mr-0 sm:mr-6">
            <h1 className="text-4xl font-sans font-extrabold tracking-tight bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text animated-gradient-text">CazaDeals</h1>
          </Link>

          {/* Área de Búsqueda */}
          {/* CAMBIO: Se pasa la prop "stores" al SearchBar */}
          <div className="relative flex items-center w-full max-w-xs sm:flex-grow sm:min-w-0">
            <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} stores={stores} />
            <button className="bg-accent-green-light hover:bg-green-600 dark:bg-accent-green-dark dark:hover:bg-green-700 text-white p-4 rounded-r-lg -ml-1 transition-colors">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Iconos y Acceder/Perfil */}
        <div className="flex items-center justify-center sm:justify-end space-x-4 mt-4 sm:mt-0 w-full sm:w-auto flex-shrink-0 sm:absolute sm:right-4 sm:top-1/2 sm:-translate-y-1/2">
          <button className="text-text-secondary-light dark:text-text-dark hover:text-accent-orange-light dark:hover:text-accent-orange-dark transition-colors" title="Notificaciones">
            <BellIcon className="h-7 w-7" />
          </button>

          {user ? (
            <div className="relative group">
              <button
                onClick={goToProfile}
                className="flex items-center bg-secondary-light hover:bg-gray-200 dark:bg-tertiary-dark dark:hover:bg-slate-600 text-text-light dark:text-text-dark font-semibold py-2 px-4 rounded-lg shadow transition-colors"
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
              className="bg-accent-orange-light hover:bg-orange-600 dark:bg-accent-orange-dark dark:hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors"
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
