
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import {
    ChevronRightIcon,
    StarIcon as StarSolid,
    CheckCircleIcon,
    ClockIcon
} from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';

// El componente DealCard ahora puede ser reutilizado si se mueve fuera, pero por ahora está bien aquí.
const DealCard = ({ deal, onCopyCode, isCopied }) => {
    const isCode = deal.type === 'código';

    return (
        <div className="bg-white dark:bg-secondary-dark p-5 rounded-lg border border-gray-200 dark:border-tertiary-dark flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="flex-grow">
                <p className={`font-bold text-sm ${
                    isCode
                        ? 'text-accent-orange-light dark:text-accent-orange-dark' 
                        : 'text-accent-pink dark:text-accent-pink-dark'
                }`}>
                    {isCode ? 'CÓDIGO' : 'PROMOCIÓN'}
                </p>
                <h3 className="font-bold text-xl text-text-light dark:text-text-dark mt-1">{deal.discount}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{deal.description}</p> {/* Mostramos la descripción de la oferta */}
            </div>
            <div className="w-full sm:w-auto flex flex-col items-stretch ml-0 sm:ml-4">
                <button
                    onClick={() => {
                        if (isCode) {
                            onCopyCode(deal.code, deal.id);
                        } else {
                            window.open(deal.link, '_blank');
                        }
                    }}
                    className={`w-full sm:w-auto px-6 py-3 rounded-lg text-white font-bold transition-all duration-300 text-base transform hover:scale-105 ${
                        isCode
                            ? 'bg-accent-orange-light hover:bg-orange-600'
                            : 'bg-accent-pink hover:bg-accent-pink-hover'
                    }`}
                >
                    {isCode ? (isCopied ? '¡Copiado!' : `Copiar: ${deal.code}`) : 'Activa la Oferta'}
                </button>
                <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mr-1" />
                        {/* DATO DINÁMICO: Muestra las activaciones desde la DB */}
                        <span>{deal.activations || 0} Activados</span>
                    </div>
                    <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {/* DATO DINÁMICO: Muestra la expiración desde la DB */}
                        <span>Expira: {deal.expires}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BrandPage = ({ deals, onCopyCode, copiedDealId, user }) => {
    const { brandName } = useParams();
    const decodedBrandName = decodeURIComponent(brandName);
    const [brandInfo, setBrandInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    // --- ¡Magia de Firebase para los detalles de la marca! ---
    useEffect(() => {
        if (!decodedBrandName) return;
        
        // Creamos una referencia al documento de la marca en la colección 'brands'
        const brandDocRef = doc(db, 'brands', decodedBrandName);

        const unsubscribe = onSnapshot(brandDocRef, (doc) => {
            if (doc.exists()) {
                setBrandInfo(doc.data());
            } else {
                console.log(`No se encontró información para la marca: ${decodedBrandName}`);
                setBrandInfo(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [decodedBrandName]);

    // Filtra ofertas, cuenta y extrae el logo dinámicamente
    const { sortedBrandDeals, dealCount, brandLogo } = useMemo(() => {
        const filtered = deals.filter(deal => deal.store.toLowerCase() === decodedBrandName.toLowerCase());
        const codes = filtered.filter(deal => deal.type === 'código');
        const promos = filtered.filter(deal => deal.type !== 'código');
        const logo = filtered.length > 0 ? filtered[0].logoUrl : null;

        return {
            sortedBrandDeals: [...codes, ...promos],
            dealCount: filtered.length,
            brandLogo: logo,
        };
    }, [deals, decodedBrandName]);

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(i <= rating ? <StarSolid key={i} className="w-5 h-5 text-yellow-400" /> : <StarOutline key={i} className="w-5 h-5 text-gray-300" />);
        }
        return stars;
    };

    if (loading) {
        return <div className="text-center py-20">Cargando...</div>; // O un spinner más elegante
    }

    return (
        <div className="bg-gray-50 dark:bg-primary-dark">
            <div className="container mx-auto px-4 py-8">
                <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-8">
                    <Link to="/" className="hover:underline">CazaDeals</Link>
                    <ChevronRightIcon className="h-3 w-3 mx-2" />
                    <Link to="/tiendas" className="hover:underline">Tiendas</Link>
                    <ChevronRightIcon className="h-3 w-3 mx-2" />
                    <span className="font-semibold text-gray-700 dark:text-white">{decodedBrandName}</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-8">
                    <aside className="w-full lg:w-1/3 xl:w-1/4 bg-white dark:bg-secondary-dark p-6 rounded-lg border border-gray-200 dark:border-tertiary-dark self-start shadow-md">
                        <div className="flex items-center justify-center h-28 mb-4">
                        {brandLogo ? (
                            <img src={brandLogo} alt={`${decodedBrandName} logo`} className="max-h-20 max-w-full object-contain" />
                        ) : (
                            <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gray-200 text-4xl font-bold text-gray-500">{decodedBrandName.charAt(0)}</div>
                        )}
                        </div>
                        <h2 className="text-2xl font-bold text-center text-text-light dark:text-text-dark mb-1">{decodedBrandName}</h2>
                        
                        {/* --- DATOS DINÁMICOS DE OPINIONES -- */}
                        {brandInfo && (
                            <>
                                <p className="text-center font-semibold text-text-light dark:text-text-dark">Opiniones</p>
                                <div className="flex items-center justify-center my-2">
                                    {renderStars(brandInfo.rating)}
                                </div>
                                <p className="text-center text-sm text-gray-500 dark:text-gray-400">Nota media de {brandInfo.rating} sobre {brandInfo.reviewCount} reseñas</p>
                            </>
                        )}
                        <hr className="border-gray-200 dark:border-tertiary-dark my-6" />
                        <h4 className="font-bold text-lg text-text-light dark:text-text-dark mb-2">Ahorra en {decodedBrandName}</h4>
                        
                        {/* DATO DINÁMICO: Muestra la descripción de la marca */}
                        <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">{brandInfo ? brandInfo.description : 'Cargando descripción...'}</p>

                        {/* Lógica para dejar reseña (requiere que el usuario esté logueado) */}
                        {user ? (
                             <button className="text-sm text-accent-pink hover:underline mt-4 inline-block w-full text-center">› Dejar una opinión ‹</button>
                        ) : (
                            <p className="text-xs text-center text-gray-500 mt-4">Debes <Link to="/profile" className="underline">iniciar sesión</Link> para dejar una opinión.</p>
                        )}
                    </aside>

                    <main className="w-full lg:w-2/3 xl:w-3/4">
                        <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-2">Códigos Promocionales {decodedBrandName} activos en octubre de 2025</h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">Códigos Descuento {decodedBrandName}: {dealCount} ofertas válidas y actualizadas hoy</p>
                        <div className="space-y-4">
                            {sortedBrandDeals.map(deal => <DealCard key={deal.id} deal={deal} onCopyCode={onCopyCode} isCopied={copiedDealId === deal.id} />)}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default BrandPage;
