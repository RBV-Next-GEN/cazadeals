
import React, { useState } from 'react';
import MarqueeDeals from '../components/MarqueeDeals';
import LaunchBanner from '../components/LaunchBanner';
import CategorySelector from '../components/CategorySelector';
import { FireIcon, TagIcon } from '@heroicons/react/24/solid';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';

export const CodeCard = ({ deal, onClick }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        if (deal.code && !isCopied) {
            navigator.clipboard.writeText(deal.code);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2500);
        }
    };

    return (
        <div 
            onClick={onClick}
            className="bg-white rounded-xl border border-border-color p-4 flex flex-col h-full transition-shadow hover:shadow-lg cursor-pointer"
        >
            <div className="flex-grow">
                <h3 className="font-bold text-lg text-text-primary mb-2">{deal.brand}</h3>
                <p className="text-sm text-text-secondary mb-3">{deal.description}</p>
            </div>
            <div className="mt-auto">
                <p className="text-xs text-text-secondary mb-4">Expira: {deal.expires}</p>
                <div className="flex items-center gap-2">
                    <div className="flex-grow border-2 border-dashed border-gray-300 rounded-lg px-4 py-2 text-center font-mono tracking-wider text-brand-pink">
                        {deal.code}
                    </div>
                    <button 
                        onClick={handleCopy}
                        className="bg-gray-100 text-text-secondary font-semibold px-3 py-2 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2 transition-colors"
                    >
                        <ClipboardDocumentIcon className="w-5 h-5" />
                        <span>{isCopied ? '¡Copiado!' : 'Copiar'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export const PromoCard = ({ deal, onClick }) => (
    <div 
        onClick={onClick}
        className="bg-white rounded-xl border border-border-color p-4 flex flex-col h-full transition-shadow hover:shadow-lg cursor-pointer"
    >
        <div className="flex-grow">
            <h3 className="font-bold text-lg text-text-primary mb-2">{deal.brand}</h3>
            <p className="text-sm text-text-secondary mb-3">{deal.description}</p>
        </div>
        <div className="mt-auto">
            <p className="text-xs text-text-secondary mb-4">Expira: {deal.expires}</p>
            <button className="w-full bg-brand-pink text-white font-bold px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors">
                Ver Promoción
            </button>
        </div>
    </div>
);


const HomePage = ({ deals = [], categories = [], marqueeDeals = [], onDealClick, activeCategory, onCategorySelect }) => {
    
    const filteredDeals = activeCategory === 'Todos' 
        ? deals 
        : deals.filter(deal => deal.category === activeCategory);

    const codeDeals = filteredDeals.filter(deal => deal.type === 'código');
    const promoDeals = filteredDeals.filter(deal => deal.type === 'promoción');

    return (
        <>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <CategorySelector 
                    categories={categories} 
                    onCategorySelect={onCategorySelect}
                    activeCategory={activeCategory}
                />
                <LaunchBanner />
                <MarqueeDeals deals={marqueeDeals} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center gap-3 mb-6 mt-8">
                    <FireIcon className="w-8 h-8 text-accent-orange" />
                    <h2 className="text-3xl font-bold text-text-primary">Códigos de Descuento</h2>
                </div>
                {codeDeals.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {codeDeals.map(deal => (
                            <CodeCard key={deal.id} deal={deal} onDealClick={onDealClick} />
                        ))}
                    </div>
                ) : (
                    <p className="text-text-secondary">No hay códigos de descuento para esta categoría.</p>
                )}

                <div className="flex items-center gap-3 mb-6 mt-16">
                    <TagIcon className="w-8 h-8 text-accent-pink" />
                    <h2 className="text-3xl font-bold text-text-primary">Promociones Destacadas</h2>
                </div>
                {promoDeals.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {promoDeals.map(deal => (
                            <PromoCard key={deal.id} deal={deal} onDealClick={onDealClick} />
                        ))}
                    </div>
                ) : (
                    <p className="text-text-secondary">No hay promociones para esta categoría.</p>
                )}
            </div>
        </>
    );
};

export default HomePage;
