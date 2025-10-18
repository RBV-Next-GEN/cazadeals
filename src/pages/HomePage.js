import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { AnimatePresence } from 'framer-motion'; // <-- IMPORTACIÓN AÑADIDA

import CouponCard from '../components/CouponCard';
import DealModal from '../components/DealModal'; // Usar DealModal en lugar de CouponModal
import LaunchBanner from '../components/LaunchBanner'; // <-- CAMBIADO DE BlackFridayBanner a LaunchBanner
import CategoryNav from '../components/CategoryNav';
import FeaturedStores from '../components/FeaturedStores';
import Newsletter from '../components/Newsletter';

function HomePage() {
    const [deals, setDeals] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedDeal, setSelectedDeal] = useState(null);
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [featuredDeals, setFeaturedDeals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const dealsCollection = await getDocs(collection(db, 'deals'));
                const dealsData = dealsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                const featuredQuery = query(collection(db, 'deals'), orderBy('createdAt', 'desc'), limit(5));
                const featuredSnapshot = await getDocs(featuredQuery);
                setFeaturedDeals(featuredSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

                const categoriesSnapshot = await getDocs(query(collection(db, 'categories'), orderBy('name')));
                const categoryList = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setCategories(categoryList);
                setDeals(dealsData);

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
        <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <LaunchBanner />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <CategoryNav categories={categories} onSelect={handleSelectCategory} activeCategory={activeCategory} />

                <section className="mt-10 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                    <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-200 mb-6">🔥 Ofertas Destacadas</h2>
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={20}
                        slidesPerView={1.2}
                        breakpoints={{
                            640: { slidesPerView: 2.2 },
                            768: { slidesPerView: 3.2 },
                            1024: { slidesPerView: 4.2 },
                        }}
                        navigation
                        pagination={{ clickable: true }}
                        className="mySwiper"
                    >
                        {loading ? (
                           Array.from({ length: 5 }).map((_, index) => (
                                <SwiperSlide key={index}>
                                    <div className="bg-gray-100 dark:bg-gray-700 rounded-xl shadow-md p-5 h-64 flex flex-col items-center justify-center animate-pulse">
                                        <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600 mb-4"></div>
                                        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                                    </div>
                                </SwiperSlide>
                            ))
                        ) : (
                            featuredDeals.map((deal) => (
                                <SwiperSlide key={deal.id}>
                                    <CouponCard deal={deal} onOpenModal={setSelectedDeal} />
                                </SwiperSlide>
                            ))
                        )}
                    </Swiper>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
                  <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                      <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-200 mb-6">✨ Últimas Ofertas</h2>
                      <div className="space-y-6">
                          <AnimatePresence>
                              {filteredDeals.map(deal => (
                                  <CouponCard key={deal.id} deal={deal} onOpenModal={setSelectedDeal} />
                              ))}
                          </AnimatePresence>
                      </div>
                  </div>

                  <aside className="space-y-8 lg:col-span-1">
                      <FeaturedStores />
                      <Newsletter />
                  </aside>
                </div>
            </main>

            {selectedDeal && <DealModal deal={selectedDeal} onClose={() => setSelectedDeal(null)} />}
        </div>
    );
}

export default HomePage;
