import React from 'react';
import {
  StarIcon,
  ComputerDesktopIcon,
  ShoppingBagIcon,
  CakeIcon,
  PuzzlePieceIcon,
  BookOpenIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

const categoryIcons = {
  'Todos': StarIcon,
  'Tech': ComputerDesktopIcon,
  'Moda': ShoppingBagIcon,
  'Comida': CakeIcon,
  'Gaming': PuzzlePieceIcon,
  'Libros': BookOpenIcon,
  'Viajes': GlobeAltIcon,
};

const CategoryNav = ({ categories, selectedCategory, onCategoryClick }) => {
  return (
    <nav className="bg-slate-800 shadow-sm py-2">
      {/* Usamos 'container mx-auto' para un ancho adaptable y centrado */}
      {/* Aumentamos space-x para más separación entre categorías */}
      <div className="container mx-auto px-4 flex justify-center space-x-4 sm:space-x-6 md:space-x-8 overflow-x-auto scrollbar-hide">
        {categories.map((category) => {
          const IconComponent = categoryIcons[category];
          return (
            <button
              key={category}
              onClick={() => onCategoryClick(category)}
              className={`flex flex-col items-center p-3 sm:p-4 rounded-lg transition-colors duration-200 {/* Aumentado el padding */}
                ${selectedCategory === category
                  ? 'text-orange-400 bg-slate-700'
                  : 'text-gray-400 hover:bg-slate-700'
                }`}
            >
              {IconComponent && <IconComponent className="h-7 w-7 sm:h-8 sm:w-8 mb-1" />} {/* Iconos ligeramente más grandes */}
              <span className="text-sm sm:text-base font-medium whitespace-nowrap">{category}</span> {/* Texto ligeramente más grande */}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default CategoryNav;