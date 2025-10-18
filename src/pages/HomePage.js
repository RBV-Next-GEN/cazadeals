import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
// CORRECCIÓN (FORZADA): La ruta correcta al archivo de configuración de Firebase
import { db } from '../firebase'; 
import { AnimatePresence } from 'framer-motion';

import CouponCard from '../components/CouponCard';
import CouponModal from '../components/CouponModal';
import BlackFridayBanner from '../components/BlackFridayBanner';
import CategoryNav from '../components/CategoryNav';
import FeaturedStores from '../components/FeaturedStores';
import Newsletter from '../components/Newsletter';

const HomePage = () => {
    const [deals, setDeals] = useState([]);
    const [selectedDeal, setSelectedDeal] = useState(null);
    const [activeCategory, setActiveCategory] = useState('Todos');

    useEffect(() => {
        const fetchDeals = async () => {
            const dealsCollection = await getDocs(collection(db, 'deals'));
            setDeals(dealsCollection.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };

        fetchDeals();
    }, []);

    const handleSelectCategory = (category) => {
        setActiveCategory(category);
    };

    const filteredDeals = activeCategory === 'Todos'
        ? deals
        : deals.filter(deal => deal.category === activeCategory);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <BlackFridayBanner />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <CategoryNav 
                    onSelect={handleSelectCategory}
                    activeCategory={activeCategory}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

                    <div className="lg:col-span-2">
                        <div className="space-y-6">
                            <AnimatePresence>
                                {filteredDeals.map(deal => (
                                    <CouponCard 
                                        key={deal.id} 
                                        deal={deal} 
                                        onOpenModal={setSelectedDeal} 
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    <aside className="space-y-8">
                        <FeaturedStores />
                        <Newsletter />
                    </aside>

                </div>
            </main>

            {selectedDeal && (
                <CouponModal 
                    deal={selectedDeal} 
                    onClose={() => setSelectedDeal(null)} 
                />
            )}
        </div>
    );
};

export default HomePage;
