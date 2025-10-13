// filepath: c:\Users\Ricardo Bleda\Documents\Lanzadera\cazadeals\src\components\PromoCodeList.js
import React from 'react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const mockPromoCodes = [
  { id: 1, store: 'Nike', description: '20% de descuento en zapatillas seleccionadas', code: 'RUN20', link: '#', expires: '2025-11-15', isNew: true },
  { id: 2, store: 'PcComponentes', description: '10€ de descuento en compras superiores a 200€', code: 'PCC10', link: '#', expires: '2025-12-01' },
  { id: 3, store: 'Domino\'s Pizza', description: 'Pizza mediana por 7,99€ a domicilio', code: 'MED799', link: '#', expires: '2025-10-31', isNew: true },
];

const PromoCodeList = ({ onCopyCode, copiedDealId }) => {
  return (
    <div className="mt-12">
      {/* CAMBIO: Colores de título actualizados */}
      <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">
        Códigos de Descuento Populares
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPromoCodes.map((promo) => (
          <motion.div
            key={promo.id}
            // CAMBIO: Colores de tarjeta actualizados
            className="relative bg-primary-light dark:bg-secondary-dark rounded-lg shadow-md p-6 flex flex-col justify-between border border-secondary-light dark:border-tertiary-dark
                       hover:shadow-xl hover:border-accent-orange-light dark:hover:border-accent-orange-dark transition-all duration-300 ease-in-out"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {promo.isNew && (
              // CAMBIO: Color de etiqueta "Nuevo" actualizado
              <div className="absolute top-0 right-0 bg-accent-green-light text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg shadow-md">
                Nuevo
              </div>
            )}
            <div>
              {/* CAMBIO: Colores de texto de tarjeta actualizados */}
              <h3 className="text-xl font-semibold text-text-light dark:text-text-dark">{promo.store}</h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2 flex-grow">{promo.description}</p>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-3">Expira: {promo.expires}</p>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2">
              {/* CAMBIO: Colores del código de descuento y su borde actualizados */}
              <div className="border-2 border-dashed border-gray-300 dark:border-tertiary-dark rounded-md px-4 py-2 text-center font-mono text-accent-orange-light dark:text-accent-orange-dark font-bold flex-grow">
                {promo.code}
              </div>
              <button
                onClick={() => onCopyCode(promo.code, promo.id)}
                // CAMBIO: Colores del botón de copiar actualizados
                className="flex items-center bg-secondary-light dark:bg-tertiary-dark text-text-light dark:text-text-dark px-4 py-2 rounded-md
                           hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors
                           focus:outline-none focus:ring-2 focus:ring-accent-orange-light focus:ring-offset-2 dark:focus:ring-offset-secondary-dark"
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