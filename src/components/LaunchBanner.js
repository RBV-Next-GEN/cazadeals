import React from 'react';

const LaunchBanner = () => {
  return (
    <div className="launch-banner-bg relative overflow-hidden rounded-lg shadow-lg my-8 p-8 flex flex-col items-center justify-center text-center">
      <div className="z-10">
        <h2 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl md:text-6xl">
          Bienvenido a CazaDeals
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-white/80">
          Tu destino número uno para encontrar las mejores ofertas y descuentos de la web.
        </p>
        <div className="mt-8">
          <a href="#deals-section" 
             className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-primary-dark bg-accent-orange-light hover:bg-accent-orange transition-colors duration-300 sm:w-auto">
            Ver Ofertas
          </a>
        </div>
      </div>
    </div>
  );
};

export default LaunchBanner;
