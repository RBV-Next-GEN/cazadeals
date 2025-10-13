
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

const StoresPage = ({ deals }) => {
    const [filter, setFilter] = useState('Todos');

    // 1. Crear una lista única de tiendas con su logo y recuento de promociones
    const stores = useMemo(() => {
        if (!deals || deals.length === 0) {
            return [];
        }

        const storeMap = new Map();
        deals.forEach(deal => {
            if (!storeMap.has(deal.store)) {
                storeMap.set(deal.store, {
                    name: deal.store,
                    logoUrl: deal.logoUrl, // Asegurarse de que logoUrl esté disponible
                    dealCount: 0,
                });
            }
            storeMap.get(deal.store).dealCount += 1;
        });

        // Convertir el mapa a un array y ordenarlo alfabéticamente
        return Array.from(storeMap.values()).sort((a, b) => a.name.localeCompare(b.name));
    }, [deals]);

    // 2. Filtrar las tiendas según la letra seleccionada
    const filteredStores = useMemo(() => {
        if (filter === 'Todos') {
            return stores;
        }
        if (filter === '0-9') {
            return stores.filter(store => /^[0-9]/.test(store.name));
        }
        return stores.filter(store => store.name.toUpperCase().startsWith(filter));
    }, [stores, filter]);

    const alphabet = ['Todos', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''), '0-9'];

    const StoreCard = ({ store }) => (
        <Link 
            to={`/tiendas/${encodeURIComponent(store.name)}`}
            className="block bg-white dark:bg-secondary-dark rounded-lg shadow-md p-4 transition-all duration-300 ease-in-out border border-gray-200 dark:border-tertiary-dark hover:shadow-xl hover:-translate-y-1"
        >
            <div className="h-24 flex items-center justify-center mb-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                {store.logoUrl ? (
                    <img src={store.logoUrl} alt={`${store.name} logo`} className="max-h-16 max-w-[80%] object-contain" />
                ) : (
                    <span className="text-xl font-bold text-gray-500">{store.name}</span>
                )}
            </div>
            <div className="text-center">
                <h3 className="font-bold text-lg text-text-light dark:text-text-dark">{store.name}</h3>
                <p className="text-sm text-green-600 dark:text-green-400 font-semibold">{store.dealCount} promociones</p>
            </div>
        </Link>
    );

    return (
        <div className="bg-gray-50 dark:bg-primary-dark py-12">
            <div className="container mx-auto px-4">
                {/* Breadcrumbs */}
                <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-8">
                    <Link to="/" className="hover:underline">CazaDeals</Link>
                    <ChevronRightIcon className="h-3 w-3 mx-2" />
                    <span className="font-semibold text-gray-700 dark:text-white">Tiendas</span>
                </nav>

                <h1 className="text-4xl font-extrabold text-text-light dark:text-text-dark mb-4">Lista de las Marcas con cupones y promociones</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">Encuentra cupones y ofertas de tus tiendas favoritas.</p>

                {/* Filtro Alfabético */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {alphabet.map(letter => (
                        <button
                            key={letter}
                            onClick={() => setFilter(letter)}
                            className={`w-10 h-10 rounded-md font-semibold text-sm transition-all duration-200 ${
                                filter === letter
                                    ? 'bg-accent-orange-light text-white shadow-lg transform scale-110'
                                    : 'bg-white dark:bg-secondary-dark text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-tertiary-dark'
                            }`}
                        >
                            {letter}
                        </button>
                    ))}
                </div>

                {/* Grid de Tiendas */}
                {filteredStores.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {filteredStores.map(store => (
                            <StoreCard key={store.name} store={store} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-xl text-gray-500 dark:text-gray-400">No se encontraron tiendas que comiencen con la letra "{filter}".</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StoresPage;
