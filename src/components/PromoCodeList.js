// filepath: c:\Users\Ricardo Bleda\Documents\Lanzadera\cazadeals\src\components\PromoCodeList.js
import React from 'react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

// Datos de ejemplo para los códigos de descuento (ajusta según tus necesidades)
const mockPromoCodes = [
  { id: 1, store: 'Nike', description: '20% de descuento en zapatillas seleccionadas', code: 'RUN20', link: '#', expires: '2025-11-15', isNew: true }, // <-- Añadido
  { id: 2, store: 'PcComponentes', description: '10€ de descuento en compras superiores a 200€', code: 'PCC10', link: '#', expires: '2025-12-01' },
  { id: 3, store: 'Domino\'s Pizza', description: 'Pizza mediana por 7,99€ a domicilio', code: 'MED799', link: '#', expires: '2025-10-31', isNew: true }, // <-- Añadido
];

const PromoCodeList = ({ onCopyCode, copiedDealId }) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Códigos de Descuento Populares
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPromoCodes.map((promo) => (
          <motion.div
            key={promo.id}
            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between border border-gray-200 dark:border-gray-700
                       hover:shadow-xl hover:border-orange-400 dark:hover:border-orange-400 transition-all duration-300 ease-in-out"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {promo.isNew && ( // <-- Renderiza la etiqueta "Nuevo" si isNew es true
              <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg shadow-md">
                Nuevo
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{promo.store}</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2 flex-grow">{promo.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Expira: {promo.expires}</p>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 text-center font-mono text-orange-500 font-bold flex-grow">
                {promo.code}
              </div>
              <button
                onClick={() => onCopyCode(promo.code, promo.id)}
                className="flex items-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-md
                           hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors
                           focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                title="Copiar código"
              >
                <ClipboardDocumentIcon className="h-5 w-5 mr-2" />
                {copiedDealId === promo.id ? '¡Copiado!' : 'Copiar'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PromoCodeList;