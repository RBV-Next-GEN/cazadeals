// filepath: c:\Users\Ricardo Bleda\Documents\Lanzadera\cazadeals\src\components\DealList.js
import React from 'react';
import { motion } from 'framer-motion';

const DealList = ({ deals, onCopyCode, onDealClick, copiedDealId }) => {
  return (
    <div className="mt-8">
      {/* CAMBIO: Colores de título actualizados */}
      <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">Todas las Ofertas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <motion.div
            key={deal.id}
            // CAMBIO: Colores de tarjeta actualizados para modo claro y oscuro
            className="relative bg-primary-light dark:bg-secondary-dark rounded-lg shadow-md p-4 flex flex-col justify-between border border-secondary-light dark:border-tertiary-dark cursor-pointer
                       hover:shadow-xl hover:border-accent-orange-light dark:hover:border-accent-orange-dark transition-all duration-300 ease-in-out"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onDealClick(deal)}
          >
            {deal.isNew && ( 
              // CAMBIO: Color de la etiqueta "Nuevo" actualizado
              <div className="absolute top-0 right-0 bg-accent-green-light text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg shadow-md">
                Nuevo
              </div>
            )}
            <div>
              {/* CAMBIO: Colores de texto de la tarjeta actualizados */}
              <h3 className="font-bold text-lg text-text-light dark:text-text-dark">{deal.store}</h3>
              <p className="text-accent-green-light dark:text-green-400 font-semibold">{deal.discount}</p>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-3">Expira: {deal.expires}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCopyCode(deal.code, deal.id);
              }}
              // CAMBIO: Ring de foco actualizado
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-2 rounded-lg
                         hover:from-red-600 hover:to-orange-600 transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-accent-orange-light focus:ring-offset-2 dark:focus:ring-offset-secondary-dark"
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