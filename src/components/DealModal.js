import React, { useState } from 'react'; // <-- Importa useState
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

const DealModal = ({ deal, onClose }) => {
  const [copied, setCopied] = useState(false); // <-- Nuevo estado para controlar el mensaje de copiado

  if (!deal) return null;

  const copyCode = () => {
    navigator.clipboard.writeText(deal.code);
    setCopied(true); // Establece el estado a true para mostrar el mensaje
    setTimeout(() => {
      setCopied(false); // Después de 2 segundos, oculta el mensaje
    }, 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            title="Cerrar"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{deal.store}</h3>
          
          <p className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4">{deal.discount}</p>
          
          <p className="text-gray-700 dark:text-gray-300 mb-2 flex items-center"> {/* Añade flex y items-center */}
            Código: {' '}
            <span
              onClick={copyCode}
              className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md font-mono text-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors inline-block ml-2" // Añade ml-2 para espacio
              title="Haz clic para copiar el código"
            >
              {deal.code}
            </span>
            {copied && ( // <-- Muestra el mensaje "Copiado!" si el estado 'copied' es true
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="ml-3 text-sm text-green-500 dark:text-green-300 font-semibold"
              >
                ¡Copiado!
              </motion.span>
            )}
          </p>
          
          <p className="text-gray-600 dark:text-gray-400 mb-1">Categoría: {deal.category}</p>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">Expira: {deal.expires}</p>

          {deal.description && (
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              {deal.description}
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DealModal;