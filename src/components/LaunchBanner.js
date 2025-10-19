import React from 'react';

const LaunchBanner = () => {
    return (
            <div className="px-8 rounded-2xl text-white text-center shadow-lg relative overflow-hidden" style={{background: 'linear-gradient(90deg, #8f5cf6 0%, #f15bb5 100%)'}}>
                {/* Fondo SVG marcas de agua animado */}
                        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                            <div className="w-full h-full animate-banner-watermark-move" style={{willChange:'transform'}}>
                                            <svg
                                                className="w-full h-full"
                                                style={{opacity: 0.15}} // Opacidad reducida
                                                width="100%"
                                                height="100%"
                                                viewBox="0 0 2400 400"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <defs>
                                                    <pattern id="watermark" patternUnits="userSpaceOnUse" width="800" height="200"> {/* Ajustar tamaño del patrón */}
                                                        <text x="0" y="90" fontFamily="Inter, Arial, sans-serif" fontSize="96" fill="#fff" fillOpacity="0.8" fontWeight="bold" style={{textShadow:'0 2px 10px #8f5cf6'}}>Oferta</text>
                                                        <text x="250" y="170" fontFamily="Inter, Arial, sans-serif" fontSize="96" fill="#fff" fillOpacity="0.6" fontWeight="bold" style={{textShadow:'0 2px 10px #f15bb5'}}>Promo</text>
                                                        <text x="400" y="120" fontFamily="Inter, Arial, sans-serif" fontSize="96" fill="#fff" fillOpacity="0.6" fontWeight="bold" style={{textShadow:'0 2px 10px #f15bb5'}}>Descuento</text>
                                                    </pattern>
                                                </defs>
                                                <rect width="2400" height="400" fill="url(#watermark)" />
                                            </svg>
                            </div>
                        </div>
            {/* Contenido principal */}
            <div className="relative z-10 flex flex-col items-center justify-center pb-4"> {/* Añadido pb-4 aquí */}
                <h2 className="text-3xl md:text-4xl font-extrabold mb-2">¡Bienvenido a CazaDeals!</h2>
                <p className="mb-2 text-lg md:text-xl font-medium">
                    Descubre las mejores ofertas y promociones exclusivas.
                </p>
                <button className="bg-white text-purple-700 font-bold py-1 px-8 rounded-full shadow hover:bg-gray-100 transition-transform transform hover:scale-105 text-lg"> {/* Cambiado py-2 a py-1 */}
                    ¡Explorar ofertas!
                </button>
            </div>
        </div>
    );
};

export default LaunchBanner;
