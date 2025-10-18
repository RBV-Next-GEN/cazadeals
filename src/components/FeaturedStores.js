import React from 'react';
import { Link } from 'react-router-dom';
import logoMap from '../assets/logo-map';

const FeaturedStores = () => {
  const stores = Object.keys(logoMap).slice(0, 12); // Coger las 12 primeras tiendas

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-bold mb-4">Tiendas Populares</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
        {stores.map(storeName => (
          <Link 
            to={`/tiendas/${storeName.toLowerCase().replace(/ /g, '-')}`}
            key={storeName} 
            className="flex justify-center items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg hover:shadow-lg transition-shadow duration-300 h-20"
            title={storeName}
          >
            <img 
              src={logoMap[storeName]} 
              alt={`${storeName} logo`} 
              className="max-h-full max-w-full object-contain" 
            />
          </Link>
        ))}
      </div>
      <div className="text-center mt-6">
        <Link to="/tiendas" className="text-orange-500 hover:text-orange-600 font-semibold transition-colors">
          Ver todas las tiendas &rarr;
        </Link>
      </div>
    </div>
  );
};

export default FeaturedStores;
