import React from 'react';

const LaunchBanner = () => {
    return (
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 px-4 sm:px-6 lg:px-8">
            <div className="text-center font-extrabold">
                <p className="text-lg md:text-2xl animate-pulse">
                    <span className="text-yellow-300">¡NUEVA VERSIÓN 2.0!</span>  Descubre un diseño renovado y más ofertas que nunca.
                </p>
            </div>
        </div>
    );
};

export default LaunchBanner;
