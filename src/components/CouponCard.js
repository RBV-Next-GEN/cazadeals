import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Toast from './Toast';

const CouponCard = ({ deal, onOpenModal }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [copyError, setCopyError] = useState(false);
    const [revealed, setRevealed] = useState(false);

    if (!deal) return null;

    const { brand, title, code, isNew, discount, expires } = deal;

    const handleCopy = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        // If not revealed yet, reveal first (mobile-friendly)
        if (!revealed) {
            setRevealed(true);
            return;
        }

        try {
            await navigator.clipboard.writeText(code);
            setIsCopied(true);
            setRevealed(false);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            setCopyError(true);
            setTimeout(() => setCopyError(false), 3000);
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
    };

    return (
        <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.03 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-transform duration-300 overflow-hidden relative p-6 border-2 border-transparent hover:border-amber-400"
        >
            {isNew && (
                <span className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-medium px-2 py-1 rounded">
                    Nuevo
                </span>
            )}
            
            <div className="space-y-4">
                {/* Porcentaje y tipo de descuento */}
                <div className="flex flex-col items-start">
                    <div className="text-[40px] leading-none font-bold text-[#246BFD]">{discount?.replace(/[^0-9]/g, '')}%</div>
                    <div className="text-sm text-gray-500">de descuento</div>
                </div>

                {/* Detalles del descuento */}
                <div className="space-y-1">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Válido todo el año</span>
                    </div>
                    <div className="text-sm text-gray-500">{brand}</div>
                    <div className="text-sm text-gray-500">Expira: {new Date(expires).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })}</div>
                </div>

                {/* Botones de acción */}
                <div className="space-y-2">
                    {code && (
                        <button
                            onClick={handleCopy}
                            className={`w-full flex items-stretch bg-[#246BFD] hover:bg-[#1a5ad6] text-white font-bold rounded transition-colors duration-200 relative overflow-hidden group shadow-sm border-2 border-[#246BFD]`}
                            aria-label={`Consigue el código ${code}`}
                            aria-expanded={revealed}
                        >
                            {/* Izquierda: icono y texto */}
                            <span className="flex items-center gap-2 px-4 py-3 select-none">
                                <svg className="w-5 h-5 text-white opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 12v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h7" />
                                </svg>
                                <span className="uppercase tracking-wide">Consigue el código</span>
                            </span>
                            {/* Derecha: caja del código con peel SVG */}
                            <span className="relative flex items-center px-0 py-0">
                                {/* Caja punteada */}
                                <span className="relative z-10 flex items-center h-full border-2 border-dashed border-white bg-white/10 rounded-r-md px-6 py-3 font-mono text-base text-[#246BFD] transition-colors duration-200" style={{minWidth:'90px'}}>
                                    <span
                                        className={`block transition-all duration-300 ease-in-out ${revealed ? 'opacity-100 translate-x-0 text-[#1a237e] bg-white shadow-lg rounded px-2 py-1 text-lg' : 'opacity-0 -translate-x-4'}`}
                                        aria-hidden={!revealed}
                                        aria-live="polite"
                                    >{isCopied ? '✓' : code}</span>
                                    <span className={`absolute left-0 top-0 w-full h-full text-white text-opacity-80 text-base flex items-center justify-center select-none pointer-events-none transition-all duration-300 ${revealed ? 'opacity-0' : 'opacity-100'}`}>••••••••</span>
                                </span>
                                {/* SVG peel animado */}
                                <span className="absolute -right-2 -top-2 z-20 pointer-events-none">
                                    <svg width="36" height="36" viewBox="0 0 36 36" className={`transition-transform duration-300 ${revealed ? 'translate-x-6 -rotate-12 scale-90 opacity-0' : 'opacity-100'}`}> 
                                        <defs>
                                            <linearGradient id="peelGrad" x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor="#fff" stopOpacity="0.85"/>
                                                <stop offset="100%" stopColor="#246BFD" stopOpacity="0.25"/>
                                            </linearGradient>
                                            <filter id="peelShadow" x="-20%" y="-20%" width="140%" height="140%">
                                                <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.18"/>
                                            </filter>
                                        </defs>
                                        <polygon points="0,0 36,0 36,36" fill="url(#peelGrad)" filter="url(#peelShadow)" />
                                    </svg>
                                </span>
                            </span>
                        </button>
                    )}
                    <button 
                        onClick={() => onOpenModal(deal)}
                        className="w-full bg-[#FF5FA9] hover:bg-[#ff4696] text-white font-bold py-3 px-4 rounded transition-colors duration-200"
                    >
                        Ver Promoción
                    </button>
                </div>
            </div>
            
            {/* Toast de confirmación */}
            <Toast message="¡Código copiado!" visible={isCopied} />
        </motion.div>
    );
};

export default CouponCard;