// filepath: c:\Users\Ricardo Bleda\Documents\Lanzadera\cazadeals\src\components\DealList.js
import React from 'react';
import { motion } from 'framer-motion';

const DealList = ({ deals, onCopyCode, onDealClick, copiedDealId }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Todas las Ofertas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <motion.div
            key={deal.id}
            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col justify-between border border-gray-200 dark:border-gray-700 cursor-pointer
                       hover:shadow-xl hover:border-orange-400 dark:hover:border-orange-400 transition-all duration-300 ease-in-out"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onDealClick(deal)}
          >
            {deal.isNew && ( // <-- Renderiza la etiqueta "Nuevo" si isNew es true
              <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg shadow-md">
                Nuevo
              </div>
            )}
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">{deal.store}</h3>
              <p className="text-green-600 dark:text-green-400 font-semibold">{deal.discount}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Expira: {deal.expires}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCopyCode(deal.code, deal.id);
              }}
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-2 rounded-lg
                         hover:from-red-600 hover:to-orange-600 transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              {copiedDealId === deal.id ? '¡Copiado!' : `Copiar Código: ${deal.code}`}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DealList;