import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { AnimatePresence } from 'framer-motion';

import CouponCard from '../components/CouponCard';
import DealModal from '../components/DealModal';
import LaunchBanner from '../components/LaunchBanner';
import CategoryNav from '../components/CategoryNav';
import MarqueeDeals from '../components/MarqueeDeals';

function HomePage() {
    const [deals, setDeals] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedDeal, setSelectedDeal] = useState(null);
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [marqueeDeals, setMarqueeDeals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const dealsSnapshot = await getDocs(query(collection(db, 'deals'), orderBy('createdAt', 'desc')));
                const dealsData = dealsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setDeals(dealsData);

                const marqueeQuery = query(collection(db, 'deals'), orderBy('popularity', 'desc'), limit(10));
                const marqueeSnapshot = await getDocs(marqueeQuery);
                setMarqueeDeals(marqueeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

                const categoriesSnapshot = await getDocs(query(collection(db, 'categories'), orderBy('name')));
                const categoryList = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setCategories([{ name: 'Todos' }, ...categoryList]);

            } catch (error) {
                console.error("Error fetching data: ", error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleSelectCategory = (categoryName) => {
        setActiveCategory(categoryName);
    };

    const filteredDeals = activeCategory === 'Todos'
        ? deals
        : deals.filter(deal => deal.category === activeCategory);

    return (
        <div className="bg-gray-50 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800/50 shadow-sm">
                <CategoryNav categories={categories} onSelect={handleSelectCategory} activeCategory={activeCategory} />
            </div>
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <LaunchBanner />
                <div className="py-2">
                  <MarqueeDeals deals={marqueeDeals && marqueeDeals.length > 0 ? marqueeDeals : [
                    { id: 1, brand: 'Amazon', description: '¡20% en Amazon!' },
                    { id: 2, brand: 'Nike', description: '15% en zapatillas' },
                    { id: 3, brand: 'Starbucks', description: '10% en tu pedido' },
                    { id: 4, brand: 'Zara', description: '25% en nueva colección' },
                    { id: 5, brand: 'GameStop', description: '10% en juegos' },
                    { id: 6, brand: 'Fnac', description: '10% en libros' },
                    { id: 7, brand: 'MediaMarkt', description: '10% en electrónica' },
                    { id: 8, brand: 'Glovo', description: '5€ en tu primer pedido' },
                    { id: 9, brand: 'Booking.com', description: '10% en hoteles' },
                  ]} />
                </div>

                <div className="mt-8 space-y-12">
                    {/* Sección de Códigos de Descuento */}
                    <section>
                        <div className="flex items-center gap-2 mb-6">
                            <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
                                <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clipRule="evenodd" />
                            </svg>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Códigos de Descuento</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence>
                                {loading ? (
                                    Array.from({ length: 3 }).map((_, index) => (
                                        <div key={index} className="animate-pulse flex flex-col space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                            <div className="flex items-center space-x-4">
                                                <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                                                <div className="flex-1 space-y-2">
                                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                                                </div>
                                            </div>
                                            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
                                        </div>
                                    ))
                                ) : (
                                    filteredDeals.filter(deal => deal.code).map(deal => (
                                        <CouponCard key={deal.id} deal={deal} onOpenModal={setSelectedDeal} />
                                    ))
                                )}
                            </AnimatePresence>
                        </div>
                    </section>

                    {/* Sección de Promociones Destacadas */}
                    <section>
                        <div className="flex items-center gap-2 mb-6">
                            <svg className="w-6 h-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-3.152a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Promociones Destacadas</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                            <AnimatePresence>
                                {loading ? (
                                    Array.from({ length: 3 }).map((_, index) => (
                                        <div key={index} className="animate-pulse flex flex-col space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                            <div className="flex items-center space-x-4">
                                                <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                                                <div className="flex-1 space-y-2">
                                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                                                </div>
                                            </div>
                                            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
                                        </div>
                                    ))
                                ) : (
                                    filteredDeals.filter(deal => !deal.code).map(deal => (
                                        <CouponCard key={deal.id} deal={deal} onOpenModal={setSelectedDeal} />
                                    ))
                                )}
                            </AnimatePresence>
                        </div>
                    </section>
                </div>
            </main>

            {selectedDeal && <DealModal deal={selectedDeal} onClose={() => setSelectedDeal(null)} />}
        </div>
    );
}

export default HomePage;
