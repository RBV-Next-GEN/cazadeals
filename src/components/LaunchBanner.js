
import React from 'react';
import '../styles/custom.css'; 

const FloatingWords = () => (
    <div className="absolute inset-0 opacity-10 z-0">
        <span className="absolute top-1/4 left-1/4 text-5xl font-bold animate-float-1">Exclusiva</span>
        <span className="absolute top-1/2 right-1/4 text-6xl font-bold animate-float-2">Promo</span>
        <span className="absolute bottom-1/4 left-1/2 text-4xl font-bold animate-float-3">Descuento</span>
        <span className="absolute top-10 right-10 text-5xl font-bold animate-float-4">CazaDeals</span>
    </div>
);

const LaunchBanner = () => (
  <div className="relative launch-banner-bg rounded-xl text-white p-8 text-center my-8 overflow-hidden shadow-2xl">
    <FloatingWords />
    <div className="relative z-10">
        <h2 className="text-4xl font-extrabold mb-3">¡Bienvenido a CazaDeals!</h2>
        <p className="text-lg mb-5 max-w-2xl mx-auto">
            Tu destino para encontrar las mejores ofertas. Códigos verificados, descuentos reales.
        </p>
        <a 
            href="#deals-section" 
            className="inline-block bg-gradient-to-r from-accent-orange-light to-accent-orange text-white font-bold py-3 px-8 rounded-full text-lg hover:opacity-90 transition-all duration-300 shadow-lg"
        >
            Ver Ofertas de Hoy
        </a>
    </div>
  </div>
);

export default LaunchBanner;
