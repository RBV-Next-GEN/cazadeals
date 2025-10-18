import React, { useState } from 'react';
import { motion } from 'framer-motion';

// CORRECCIÓN: Se usa 'brand' en lugar de 'brandName' para que coincida con los datos de Firebase.
// Y se añade un logo de fallback por si la marca no existe o no se encuentra.
const CouponCard = ({ deal, onOpenModal }) => {
    const [isCopied, setIsCopied] = useState(false);

    if (!deal) return null;

    // Se desestructura 'brand' que es el nombre correcto del campo.
    const { brand, title, code } = deal;
    
    // Se añade un fallback por si la marca es nula o indefinida, para evitar que la app se rompa.
    const logoUrl = brand 
        ? `https://logo.clearbit.com/${brand.toLowerCase().replace(/ /g, '')}.com`
        : 'https://via.placeholder.com/64'; // Un logo genérico

    const handleCopy = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <motion.div 
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.8 }} 
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex items-center p-4 space-x-4"
        >
            <div className="flex-shrink-0" onClick={() => onOpenModal(deal)}>
                {/* Se usa 'brand' para el alt text */}
                <img src={logoUrl} alt={`${brand || 'Marca'} logo`} className="w-16 h-16 rounded-lg object-contain cursor-pointer"/>
            </div>
            <div className="flex-grow min-w-0" onClick={() => onOpenModal(deal)}>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate cursor-pointer">{title}</h3>
                {/* Se usa 'brand' para mostrar el nombre */}
                <p className="text-sm text-gray-500 dark:text-gray-400">{brand}</p>
            </div>
            <div className="flex-shrink-0">
                <button 
                    onClick={handleCopy}
                    className={`w-32 text-center py-3 px-3 font-bold rounded-lg transition-all duration-300 ${isCopied ? 'bg-green-500 text-white' : 'bg-orange-100 text-orange-600 dark:bg-gray-700 dark:text-orange-400 hover:bg-orange-500 hover:text-white'}`}>
                    {isCopied ? '¡Copiado!' : code}
                </button>
            </div>
        </motion.div>
    );
};

export default CouponCard;
