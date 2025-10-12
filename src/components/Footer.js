// filepath: c:\Users\Ricardo Bleda\Documents\Lanzadera\cazadeals\src\components\Footer.js
import React from 'react';
import { useTheme } from '../context/theme'; // <-- Importa useTheme
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'; // <-- Importa los iconos de tema

const Footer = () => {
  const { theme, setTheme } = useTheme(); // <-- Obtiene el tema y la función para cambiarlo

  const handleThemeChange = (newTheme) => { // <-- Función para cambiar el tema
    setTheme(newTheme);
  };

  return (
    <footer className="bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6 text-center mt-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p>&copy; {new Date().getFullYear()} CazaDeals. Todos los derechos reservados.</p>
        
        {/* Selector de Tema - MOVIDO AQUÍ */}
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <div className="flex bg-white bg-opacity-20 dark:bg-gray-700 dark:bg-opacity-50 rounded-full p-1">
            <button
              onClick={() => handleThemeChange('light')}
              className={`p-2 rounded-full ${theme === 'light' ? 'bg-white text-orange-500 dark:text-orange-500' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
              title="Modo Claro"
            >
              <SunIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleThemeChange('dark')}
              className={`p-2 rounded-full ${theme === 'dark' ? 'bg-white text-orange-500 dark:text-orange-500' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
              title="Modo Oscuro"
            >
              <MoonIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleThemeChange('system')}
              className={`p-2 rounded-full ${theme === 'system' ? 'bg-white text-orange-500 dark:text-orange-500' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
              title="Modo Sistema"
            >
              <ComputerDesktopIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;