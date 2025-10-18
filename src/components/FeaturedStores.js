import React from 'react';

const stores = [
    'Amazon',
    'El Corte Inglés',
    'PcComponentes',
    'Nike',
    'Adidas',
    'Zara',
    'MediaMarkt',
    'Fnac',
    'Booking',
];

const FeaturedStores = () => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <h3 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">Tiendas Populares</h3>
            <div className="grid grid-cols-3 gap-4">
                {stores.map(store => (
                    <div key={store} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                        <img 
                            src={`https://logo.clearbit.com/${store.toLowerCase().replace(/ /g, '')}.com`}
                            alt={`${store} logo`}
                            className="h-10 w-full object-contain" 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedStores;
