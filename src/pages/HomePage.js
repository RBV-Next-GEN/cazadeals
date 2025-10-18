
import React from 'react';
import DealList from '../components/DealList';
import LaunchBanner from '../components/LaunchBanner';
import MarqueeDeals from '../components/MarqueeDeals';
import CategoryNav from '../components/CategoryNav';

const HomePage = ({ deals, categories, marqueeDeals, onDealClick, onCategorySelect, activeCategory }) => {
    return (
        <div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* 1. Menú de Categorías */}
                <CategoryNav categories={categories} onSelect={onCategorySelect} activeCategory={activeCategory} />
                
                {/* 2. Banner de Bienvenida */}
                <LaunchBanner />
                
                {/* 3. Marquesina */}
                <MarqueeDeals deals={marqueeDeals} />
            </div>

            {/* 4. Lista de Ofertas */}
            <div id="deals" className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <DealList deals={deals} onDealClick={onDealClick} />
            </div>
        </div>
    );
};

export default HomePage;
