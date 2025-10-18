import React from 'react';

const Newsletter = () => {
    return (
        <div className="bg-gradient-to-br from-orange-500 to-pink-500 p-6 rounded-2xl shadow-lg text-white text-center">
            <h3 className="font-bold text-xl mb-2">¡No te pierdas ni una oferta!</h3>
            <p className="text-sm mb-4 opacity-90">Recibe los mejores chollos directamente en tu correo.</p>
            <form onSubmit={(e) => e.preventDefault()}>
                <input 
                    type="email" 
                    placeholder="tu@email.com"
                    className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white mb-3"
                />
                <button 
                    type="submit"
                    className="w-full bg-white text-orange-600 font-bold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                    Suscribirme
                </button>
            </form>
        </div>
    );
};

export default Newsletter;
