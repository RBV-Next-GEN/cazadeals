
import React, { useState } from 'react';
import { ClipboardDocumentCheckIcon, XMarkIcon, ClipboardDocumentIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import { useBrands } from '../context/BrandContext';
import logoMap from '../assets/logo-map';

const DealModal = ({ deal, onClose }) => {
    const [isCopied, setIsCopied] = useState(false);
    const { buildAffiliateUrl } = useBrands();

    if (!deal) return null;

    const finalUrl = buildAffiliateUrl(deal.link, deal.brand);

    const handleCopy = () => {
        if (deal.code && !isCopied) {
            // navigator.clipboard.writeText(deal.code); // <-- LÍNEA COMENTADA
            console.warn("La copia al portapapeles está desactivada temporalmente.");
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2500);
        }
    };

    const isCodeDeal = deal.type === 'código';
    const logo = logoMap[deal.brand] || deal.logoUrl;
    const formattedExpires = new Date(deal.expires).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div 
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md md:max-w-lg transform transition-all duration-300" 
                onClick={e => e.stopPropagation()}
            >
                <div className="relative p-8 text-center">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-transform hover:rotate-90 duration-300">
                        <XMarkIcon className="w-8 h-8" />
                    </button>

                    {logo && (
                        <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center p-2 shadow-sm">
                            <img src={logo} alt={`${deal.brand} logo`} className="max-w-full max-h-full object-contain" />
                        </div>
                    )}

                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{deal.brand}</h2>
                    <p className="text-base text-gray-600 mb-6 px-4 max-w-prose mx-auto">{deal.description}</p>

                    {isCodeDeal && (
                        <div className="mb-6">
                            <p className="text-sm text-gray-500 mb-3">Haz clic para copiar el código</p>
                            <button
                                onClick={handleCopy}
                                className={`w-full border-2 border-dashed rounded-lg p-4 flex items-center justify-center gap-3 transition-all duration-300 ${isCopied ? 'border-green-500 bg-green-50' : 'border-pink-300 bg-pink-100 hover:bg-pink-200'}`}
                            >
                                <span className={`font-mono text-2xl md:text-3xl font-extrabold tracking-widest ${isCopied ? 'text-green-600' : 'text-pink-500'}`}>
                                    {isCopied ? '¡COPIADO!' : deal.code}
                                </span>
                                {isCopied ? <ClipboardDocumentCheckIcon className="w-7 h-7 text-green-600" /> : <ClipboardDocumentIcon className="w-7 h-7 text-pink-500" />}
                            </button>
                        </div>
                    )}

                    <a
                        href={finalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setTimeout(onClose, 300)}
                        className="group w-full text-white font-semibold py-3 px-4 rounded-lg text-base flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
                    >
                        <span>Ir a la Tienda</span>
                        <ArrowTopRightOnSquareIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                     <p className="text-xs text-gray-400 mt-6">Válido hasta: {formattedExpires}</p>
                </div>
            </div>
        </div>
    );
};

export default DealModal;
