// filepath: c:\Users\Ricardo Bleda\Documents\Lanzadera\cazadeals\src/components/LaunchOfferBanner.js
import React from 'react';

const LaunchOfferBanner = () => {
  return (
    <div className="my-8 p-8 rounded-lg text-white text-center shadow-lg launch-banner-bg"> {/* Añade la clase custom */}
      <div className="relative z-10"> {/* Asegura que el contenido esté por encima del fondo animado */}
        <h2 className="text-3xl font-bold mb-2">¡Oferta Exclusiva de Lanzamiento!</h2>
        <p className="mb-4">Consigue un 30% de descuento en tu primera compra con el código: 
          <span className="font-mono bg-white bg-opacity-20 px-2 py-1 rounded-md ml-2">CAZADEALS30</span>
        </p>
        <button className="bg-white text-indigo-600 font-bold py-2 px-6 rounded-full hover:bg-gray-200 transition-transform transform hover:scale-105">
          ¡Aprovechar ahora!
        </button>
      </div>
    </div>
  );
};

export default LaunchOfferBanner;