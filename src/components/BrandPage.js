
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, onSnapshot, runTransaction } from 'firebase/firestore';
import { db } from '../firebase';
import {
    ChevronRightIcon,
    StarIcon as StarSolid,
    CheckCircleIcon,
    ClockIcon
} from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';

const DealCard = ({ deal, onCopyCode, isCopied }) => {
    const isCode = deal.type === 'código';
    
    // CORRECCIÓN: Usar el contador unificado 'activatedCount' que creamos con el script.
    const activationText = 'Activados';
    const activationCount = deal.activatedCount || 0;

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
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{deal.description}</p>
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
                        <span>{activationCount} {activationText}</span>
                    </div>
                    <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
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
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!decodedBrandName) return;
        const brandDocRef = doc(db, 'brands', decodedBrandName);
        const unsubscribe = onSnapshot(brandDocRef, (doc) => {
            if (doc.exists()) {
                setBrandInfo(doc.data());
            } else {
                console.log(`No se encontró info para: ${decodedBrandName}`);
                setBrandInfo(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [decodedBrandName]);

    const handleRating = async (newRating) => {
        if (isSubmitting || !user) return;
        setIsSubmitting(true);

        const brandDocRef = doc(db, 'brands', decodedBrandName);

        try {
            await runTransaction(db, async (transaction) => {
                const brandDoc = await transaction.get(brandDocRef);
                if (!brandDoc.exists()) {
                    throw "¡El documento no existe!";
                }

                const currentData = brandDoc.data();
                const currentReviewCount = currentData.reviewCount || 0;
                const currentTotalRating = (currentData.rating || 0) * currentReviewCount;

                const newReviewCount = currentReviewCount + 1;
                const newTotalRating = currentTotalRating + newRating;
                const newAverageRating = newTotalRating / newReviewCount;

                transaction.update(brandDocRef, {
                    rating: parseFloat(newAverageRating.toFixed(2)),
                    reviewCount: newReviewCount,
                });
            });
            console.log('¡Valoración actualizada con éxito!');
        } catch (e) {
            console.error("Error al actualizar la valoración: ", e);
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- CORRECCIÓN APLICADA AQUÍ ---
    const { sortedBrandDeals, dealCount, brandLogo } = useMemo(() => {
        // Filtramos usando 'brand' y nos aseguramos de que exista
        const filtered = deals.filter(deal => deal.brand && deal.brand.toLowerCase() === decodedBrandName.toLowerCase());
        
        const codes = filtered.filter(deal => deal.type === 'código');
        const promos = filtered.filter(deal => deal.type !== 'código');
        
        // Obtenemos el logo de 'brandLogo', el campo correcto
        const logo = filtered.length > 0 ? filtered[0].brandLogo : null;

        return {
            sortedBrandDeals: [...codes, ...promos],
            dealCount: filtered.length,
            brandLogo: logo,
        };
    }, [deals, decodedBrandName]);

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <button key={i} onClick={() => handleRating(i)} disabled={isSubmitting || !user} className="disabled:opacity-50 disabled:cursor-not-allowed">
                    {i <= rating ? <StarSolid className="w-6 h-6 text-yellow-400" /> : <StarOutline className="w-6 h-6 text-gray-300" />}
                </button>
            );
        }
        return stars;
    };

    if (loading) {
        return <div className="text-center py-20">Cargando...</div>;
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
                            {brandLogo ? <img src={brandLogo} alt={`${decodedBrandName} logo`} className="max-h-20 max-w-full object-contain" /> : <div>...</div>}
                        </div>
                        <h2 className="text-2xl font-bold text-center text-text-light dark:text-text-dark mb-1">{decodedBrandName}</h2>
                        
                        {brandInfo && (
                            <>
                                <p className="text-center font-semibold text-text-light dark:text-text-dark">Valora esta tienda</p>
                                <div className="flex items-center justify-center my-2">
                                    {renderStars(brandInfo.rating)}
                                </div>
                                <p className="text-center text-sm text-gray-500 dark:text-gray-400">Nota media de {brandInfo.rating} sobre {brandInfo.reviewCount} reseñas</p>
                            </>
                        )}
                         {!user && <p className="text-xs text-center text-gray-500 mt-4">Debes <Link to="/profile" className="underline">iniciar sesión</Link> para valorar.</p>}
                        <hr className="border-gray-200 dark:border-tertiary-dark my-6" />
                        <h4 className="font-bold text-lg text-text-light dark:text-text-dark mb-2">Ahorra en {decodedBrandName}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">{brandInfo ? brandInfo.description : 'Cargando descripción...'}</p>
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
