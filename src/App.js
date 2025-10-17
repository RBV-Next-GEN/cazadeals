
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { BrandProvider } from './context/BrandContext';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';

// Componentes
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import StoresPage from './pages/StoresPage';
import BrandPage from './pages/BrandPage';
import ProfilePage from './pages/ProfilePage';
import DealModal from './components/DealModal';

// Admin
import AdminLayout from './components/admin/AdminLayout';
import AdminRouteGuard from './components/admin/AdminRouteGuard';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminDealsPage from './pages/admin/AdminDealsPage';
import AdminBrandsPage from './pages/admin/AdminBrandsPage';
import AdminScraperPage from './pages/admin/AdminScraperPage';

const AdminMarqueePage = () => <div className="p-8"><h1>Gestionar Marquesina (Próximamente)</h1></div>;
const AdminUsersPage = () => <div className="p-8"><h1>Gestionar Usuarios (Próximamente)</h1></div>;

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <BrandProvider>
        <AppContent />
      </BrandProvider>
    </Router>
  );
}

const AppContent = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    const [deals, setDeals] = useState([]);
    const [categories, setCategories] = useState([]);
    const [marqueeDeals, setMarqueeDeals] = useState([]);
    const [selectedDeal, setSelectedDeal] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Todos');

    useEffect(() => {
        if (isAdminRoute) return;
        
        const fetchData = async () => {
            try {
                const dealsSnapshot = await getDocs(collection(db, 'deals'));
                const dealList = dealsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setDeals(dealList);
                setMarqueeDeals(dealList.slice(0, 10));

                const categoriesSnapshot = await getDocs(query(collection(db, 'categories'), orderBy('name')));
                const categoryList = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setCategories(categoryList);
            } catch (error) { console.error("Error fetching data: ", error); }
        };
        fetchData();
    }, [isAdminRoute]);
    
    const handleDealClick = (deal) => {
        setSelectedDeal(deal);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDeal(null);
    };
    
    const handleSelectCategory = (categoryName) => {
        setSelectedCategory(categoryName);
    };

    const filteredDeals = selectedCategory === 'Todos' ? deals : deals.filter(deal => deal.category === selectedCategory);

    return (
         <div className={`flex flex-col min-h-screen ${!isAdminRoute ? 'bg-gray-50 dark:bg-gray-900' : ''}`}>
            {!isAdminRoute && <Header />}
            <main className="flex-grow">
                <Routes>
                    {/* --- RUTA CORREGIDA --- */}
                    <Route path="/" element={
                        <HomePage 
                            deals={filteredDeals} 
                            categories={categories} 
                            marqueeDeals={marqueeDeals} 
                            onDealClick={handleDealClick} 
                            activeCategory={selectedCategory} 
                            onCategorySelect={handleSelectCategory}
                        />} 
                    />
                    <Route path="/tiendas" element={<StoresPage />} />
                    <Route path="/tiendas/:brandId" element={<BrandPage />} />
                    <Route path="/profile" element={<ProfilePage />} />

                    {/* Rutas de Administración */}
                    <Route path="/admin" element={<AdminRouteGuard><AdminLayout /></AdminRouteGuard>}>
                        <Route index element={<AdminDashboardPage />} />
                        <Route path="deals" element={<AdminDealsPage />} />
                        <Route path="brands" element={<AdminBrandsPage />} />
                        <Route path="marquee" element={<AdminMarqueePage />} />
                        <Route path="scraper" element={<AdminScraperPage />} />
                        <Route path="users" element={<AdminUsersPage />} />
                    </Route>
                </Routes>
            </main>
            {!isAdminRoute && <Footer />}
            {isModalOpen && <DealModal deal={selectedDeal} onClose={handleCloseModal} />}
        </div>
    );
}

export default App;
