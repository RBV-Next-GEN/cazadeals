import React from 'react';
import { Link } from 'react-router-dom'; // <-- Importar Link
import {
  StarIcon,
  ComputerDesktopIcon,
  ShoppingBagIcon,
  CakeIcon,
  PuzzlePieceIcon,
  BookOpenIcon,
  GlobeAltIcon,
  BuildingStorefrontIcon,
} from '@heroicons/react/24/outline';

const categoryIcons = {
  'Todos': StarIcon,
  'Tech': ComputerDesktopIcon,
  'Moda': ShoppingBagIcon,
  'Comida': CakeIcon,
  'Gaming': PuzzlePieceIcon,
  'Libros': BookOpenIcon,
  'Viajes': GlobeAltIcon,
  'Tiendas': BuildingStorefrontIcon,
};

const CategoryNav = ({ categories, selectedCategory, onCategoryClick }) => {
  const getButtonClasses = (category) => {
    const isSelected = selectedCategory === category;

    if (category === 'Tiendas') {
      // Si la ruta actual es /tiendas, le damos un estilo "seleccionado"
      if (window.location.pathname.startsWith('/tiendas')) {
        return 'text-white bg-gradient-to-r from-purple-600 to-pink-600 ring-2 ring-white';
      }
      return 'text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600';
    }

    if (isSelected && category === 'Todos') {
      return 'bg-accent-orange-light text-white';
    }
    
    if (isSelected) {
      return 'text-accent-orange-light dark:text-accent-orange-dark bg-secondary-light dark:bg-tertiary-dark';
    }

    return 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-secondary-light dark:hover:bg-tertiary-dark';
  };

  return (
    <nav className="bg-primary-light dark:bg-header-dark shadow-sm py-2">
      <div className="container mx-auto px-4 flex justify-center space-x-2 sm:space-x-4 md:space-x-6 overflow-x-auto scrollbar-hide">
        {categories.map((category) => {
          const IconComponent = categoryIcons[category];
          const classNames = `flex flex-col items-center p-3 rounded-lg transition-colors duration-200 ${getButtonClasses(category)}`;

          // CAMBIO: Si la categoría es "Tiendas", se renderiza como un Link
          if (category === 'Tiendas') {
            return (
              <Link to="/tiendas" key={category} className={classNames}>
                {IconComponent && <IconComponent className="h-6 w-6 mb-1" />}
                <span className="text-xs font-medium whitespace-nowrap">{category}</span>
              </Link>
            );
          }

          // El resto de categorías siguen siendo botones
          return (
            <button
              key={category}
              onClick={() => onCategoryClick(category)}
              className={classNames}
            >
              {IconComponent && <IconComponent className="h-6 w-6 mb-1" />}
              <span className="text-xs font-medium whitespace-nowrap">{category}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default CategoryNav;
