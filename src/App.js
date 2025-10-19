import React, { useState, useEffect, useRef } from 'react';  // FIX LOOP: Agregado useRef para flag anti-loop
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // FIX DEALS: Import useAuth para check logged
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

// FIX DEALS: Mock deals para fallback si Firebase falla – real-like para prototipo
const mockDeals = [
  { id: 'mock1', name: 'iPhone 15 Pro', price: 999, category: 'Tech' },
  { id: 'mock2', name: 'AirPods Max', price: 549, category: 'Tech' },
  { id: 'mock3', name: 'Libro BestSeller', price: 15, category: 'Libros' },
  { id: 'mock4', name: 'Sneakers Nike', price: 120, category: 'Moda' },
  { id: 'mock5', name: 'Cafetera Nespresso', price: 89, category: 'Comida' },
  { id: 'mock6', name: 'PS5 Slim', price: 499, category: 'Gaming' },
  { id: 'mock7', name: 'Kindle Paperwhite', price: 149, category: 'Libros' },
  { id: 'mock8', name: 'Reloj Apple Watch', price: 429, category: 'Tech' },
  { id: 'mock9', name: 'Bolso Louis Vuitton', price: 1500, category: 'Moda' },
  { id: 'mock10', name: 'Viaje a Bali', price: 800, category: 'Viajes' },
];

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {/* AÑADIDO EL AUTH PROVIDER QUE FALTABA */}
      <AuthProvider>
        <BrandProvider>
          <AppContent />
        </BrandProvider>
      </AuthProvider>
    </Router>
  );
}

const AppContent = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');
    const { user } = useAuth();  // FIX DEALS: Check auth para guards

    const [, setMarqueeDeals] = useState([]);
    const [selectedDeal, setSelectedDeal] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dataLoaded = useRef(false);  // FIX LOOP: Flag ref para trackear load sin re-render
    const loggedWarningShown = useRef(false);  // FIX LOOP: Once-only warn si no logged
    const [, setIsDataFetched] = useState(false); // Nuevo estado para controlar el fetch de datos

    // FIX LOOP: useEffect 1 – Solo fetch data, depende de estables (no marqueeDeals)
    useEffect(() => {
        if (isAdminRoute) return;
        
        let retryTimer;  // Para retry backoff
        
        const fetchData = async (retryCount = 0) => {
            try {
                // FIX DEALS: Guard auth – warn solo una vez
                if (!user) {
                    if (!loggedWarningShown.current) {
                        console.warn('[Firebase Guard] User no logged – usando mock deals para prototipo.');
                        loggedWarningShown.current = true;
                    }
                    setMarqueeDeals(mockDeals.slice(0, 10));
                    setIsDataFetched(true);  // Marca loaded para IA effect
                    return;
                }

                const dealsSnapshot = await getDocs(collection(db, 'deals'));
                const dealList = dealsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                if (dealList.length === 0) throw new Error('Colección deals vacía – agrega datos en Firebase Console.');
                
                setMarqueeDeals(dealList.slice(0, 10));

                const categoriesSnapshot = await getDocs(query(collection(db, 'categories'), orderBy('name')));
                categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // setCategories(categoryList);

                setIsDataFetched(true);  // Marca loaded – trigger IA sin loop

            } catch (error) { 
                console.error("[Firebase Error Details]", { code: error.code, message: error.message, retryCount });  // FIX DEALS: Logging detallado
                
                if (retryCount < 2) {  // FIX: Retry solo 2 veces para menos spam
                    const backoff = Math.pow(2, retryCount) * 1000;  // 1s, 2s
                    console.log(`Retry ${retryCount + 1}/2 en ${backoff}ms...`);
                    retryTimer = setTimeout(() => fetchData(retryCount + 1), backoff);
                    return;
                }
                
                // Fallback final: Mock deals
                console.warn('[Fallback] Usando mock deals – checa Firebase rules/conexión.');
                setMarqueeDeals(mockDeals.slice(0, 10));
                dataLoaded.current = true;  // FIX LOOP: Marca loaded incluso en fallback
            }
        };
        fetchData();
        
        return () => clearTimeout(retryTimer);  // Cleanup retry
    }, [isAdminRoute, user]);  // FIX LOOP: Solo deps estables – no marqueeDeals, cero loop

    // const handleDealClick = (deal) => {
    //     setSelectedDeal(deal);
    //     setIsModalOpen(true);
    // };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDeal(null);
    };
    
    // const handleSelectCategory = (categoryName) => {
    //     setSelectedCategory(categoryName);
    // };

    // const filteredDeals = selectedCategory === 'Todos' ? deals : deals.filter(deal => deal.category === selectedCategory);

    return (
         <div className={`flex flex-col min-h-screen ${!isAdminRoute ? 'bg-gray-50 dark:bg-gray-900' : ''}`}>
            {!isAdminRoute && <Header />}
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/tiendas" element={<StoresPage />} />
                    <Route path="/tiendas/:brandName" element={<BrandPage />} />
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