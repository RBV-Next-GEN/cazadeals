
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as HIcons from '@heroicons/react/24/outline';

const CategoryNav = ({ categories, selectedCategory, onCategoryClick }) => {
  const location = useLocation();

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <nav className="bg-primary-light dark:bg-primary-dark shadow-sm py-2 border-b border-t border-gray-200 dark:border-secondary-dark">
      <div className="container mx-auto px-4 flex justify-center space-x-2 sm:space-x-3 md:space-x-4 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {categories.map((category) => {
          const IconComponent = HIcons[category.icon] || HIcons.TagIcon;
          const categoryName = category.name;

          if (categoryName === 'Tiendas') {
            const isSelected = location.pathname.startsWith('/tiendas');
            const classNames = `p-3 rounded-lg transition-all duration-300 text-xs font-medium whitespace-nowrap flex flex-col items-center w-20 text-white ${isSelected ? 'bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg ring-2 ring-white/50' : 'bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow'}`;

            return (
              <Link to="/tiendas" key={categoryName} className={classNames}>
                <IconComponent className="h-6 w-6 mb-1" />
                <span>{categoryName}</span>
              </Link>
            );
          }

          const isSelected = selectedCategory === categoryName;
          const classNames = `p-3 rounded-lg transition-colors duration-200 text-xs font-medium whitespace-nowrap flex flex-col items-center w-20 ${isSelected ? 'bg-accent-orange text-white shadow-md' : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark'}`;

          return (
            <button
              key={categoryName}
              onClick={() => onCategoryClick(categoryName)}
              className={classNames}
            >
              <IconComponent className="h-6 w-6 mb-1" />
              <span>{categoryName}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default CategoryNav;
