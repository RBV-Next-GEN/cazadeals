import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/theme';
import { MoonIcon } from '@heroicons/react/24/solid';

const Footer = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <footer className="bg-secondary-light dark:bg-header-dark text-text-secondary-light dark:text-text-secondary-dark">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          
          {/* Columna CazaDeals */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-accent-orange-light dark:text-accent-orange-dark">CazaDeals</h3>
            <p>
              Tu destino número uno para encontrar las mejores ofertas y códigos de descuento. ¡Ahorra en grande con CazaDeals!
            </p>
          </div>

          {/* Columna Enlaces Rápidos */}
          <div className="space-y-3">
            <h4 className="font-bold text-text-light dark:text-text-dark">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-accent-orange-light dark:hover:text-accent-orange-dark hover:underline">Inicio</Link></li>
              <li><Link to="/tiendas" className="hover:text-accent-orange-light dark:hover:text-accent-orange-dark hover:underline">Tiendas</Link></li>
              <li><Link to="/categorias" className="hover:text-accent-orange-light dark:hover:text-accent-orange-dark hover:underline">Categorías</Link></li>
              <li><Link to="/blog" className="hover:text-accent-orange-light dark:hover:text-accent-orange-dark hover:underline">Blog</Link></li>
            </ul>
          </div>

          {/* Columna Soporte */}
          <div className="space-y-3">
            <h4 className="font-bold text-text-light dark:text-text-dark">Soporte</h4>
            <ul className="space-y-2">
              <li><Link to="/faq" className="hover:text-accent-orange-light dark:hover:text-accent-orange-dark hover:underline">Preguntas Frecuentes</Link></li>
              <li><Link to="/contacto" className="hover:text-accent-orange-light dark:hover:text-accent-orange-dark hover:underline">Contacto</Link></li>
              <li><Link to="/politica-privacidad" className="hover:text-accent-orange-light dark:hover:text-accent-orange-dark hover:underline">Política de Privacidad</Link></li>
              <li><Link to="/terminos-servicio" className="hover:text-accent-orange-light dark:hover:text-accent-orange-dark hover:underline">Términos de Servicio</Link></li>
            </ul>
          </div>

          {/* Columna Configuración y Síguenos */}
          <div className="space-y-3">
            <h4 className="font-bold text-text-light dark:text-text-dark">Configuración</h4>
            <div onClick={toggleTheme} className="flex items-center space-x-2 cursor-pointer hover:text-accent-orange-light dark:hover:text-accent-orange-dark">
              <span>Modo Oscuro</span>
              <MoonIcon className="h-5 w-5" />
            </div>

            <h4 className="font-bold text-text-light dark:text-text-dark pt-4">Síguenos</h4>
            {/* Aquí irían los iconos de redes sociales */}
          </div>
        </div>

        <hr className="border-gray-300 dark:border-tertiary-dark my-8" />

        <div className="text-center text-xs text-gray-500 dark:text-slate-500">
          &copy; {new Date().getFullYear()} CazaDeals. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
