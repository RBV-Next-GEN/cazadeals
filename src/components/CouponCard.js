import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logoMap from '../assets/logo-map'; // Importar el mapa de logos

// CORRECCIÓN: Se usa 'brand' en lugar de 'brandName' para que coincida con los datos de Firebase.
// Y se añade un logo de fallback por si la marca no existe o no se encuentra.
const CouponCard = ({ deal, onOpenModal }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [copyError, setCopyError] = useState(false);
    const [imageError, setImageError] = useState(false); // Nuevo estado para error de imagen

    if (!deal) return null;

    // Se desestructura 'brand' que es el nombre correcto del campo.
    const { brand, title, code } = deal;
    
    // Lógica para obtener el logo: primero de logoMap, luego Clearbit, finalmente fallback genérico
    const getLogoUrl = () => {
        if (logoMap[brand]) {
            return logoMap[brand];
        }
        // Si no está en logoMap, intentar con Clearbit
        return `https://logo.clearbit.com/${brand.toLowerCase().replace(/ /g, '')}.com`;
    };

    const getInitials = (name) => {
        if (!name) return '';
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const logoUrl = getLogoUrl();
    const displayInitials = imageError || logoUrl.includes('via.placeholder.com') || logoUrl.includes('clearbit.com/undefined');

    const handleCopy = async (e) => {
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(code);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Error al copiar al portapapeles: ", err);
            setCopyError(true);
            setTimeout(() => setCopyError(false), 3000);
        }
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
                {displayInitials ? (
                    <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200 font-bold text-xl cursor-pointer">
                        {getInitials(brand)}
                    </div>
                ) : (
                    <img 
                        src={logoUrl} 
                        alt={`${brand || 'Marca'} logo`} 
                        className="w-16 h-16 rounded-lg object-contain cursor-pointer"
                        onError={() => setImageError(true)} // Manejar error de carga de imagen
                    />
                )}
            </div>
            <div className="flex-grow min-w-0" onClick={() => onOpenModal(deal)}>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate cursor-pointer">{title}</h3>
                {/* Se usa 'brand' para mostrar el nombre */}
                <p className="text-sm text-gray-500 dark:text-gray-400">{brand}</p>
            </div>
            <div className="flex-shrink-0">
                <button 
                    onClick={handleCopy}
                    className={`w-32 text-center py-3 px-3 font-bold rounded-lg transition-all duration-300 ${isCopied ? 'bg-green-500 text-white' : copyError ? 'bg-red-500 text-white' : 'bg-orange-100 text-orange-600 dark:bg-gray-700 dark:text-orange-400 hover:bg-orange-500 hover:text-white'}`}>
                    {isCopied ? '¡Copiado!' : copyError ? 'Error' : (code || 'Ver Oferta')}
                </button>
            </div>
        </motion.div>
    );
};

export default CouponCard;
