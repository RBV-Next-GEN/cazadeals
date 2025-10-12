import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import DealList from './components/DealList';
import PromoCodeList from './components/PromoCodeList';
import Footer from './components/Footer';
import LaunchOfferBanner from './components/LaunchOfferBanner';
import { ThemeProvider } from './context/theme';

import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleAuthWrapper, { useAuth } from './components/GoogleAuthWrapper';
import UserProfile from './components/UserProfile';
import DealModal from './components/DealModal';
import MarqueeDeals from './components/MarqueeDeals';
import CategoryNav from './components/CategoryNav';

const ALL_DEALS_DATA = [
  { id: 1, store: 'Amazon', discount: '20% off', expires: '2025-10-20', code: 'SAVE20', category: 'Tech', isNew: true, description: 'Ahorra en una amplia selección de productos electrónicos y más.' },
  { id: 2, store: 'Nike', discount: '15% off shoes', expires: '2025-10-15', code: 'NIKE15', category: 'Moda', description: 'Descuento en calzado deportivo y ropa de moda.' },
  { id: 3, store: 'Starbucks', discount: '10% off', expires: '2025-10-18', code: 'STARBUCKS10', category: 'Comida', isNew: true, description: 'Disfruta de tu café favorito con un 10% de descuento.' },
  { id: 4, store: 'Zara', discount: '25% off', expires: '2025-11-01', code: 'ZARA25', category: 'Moda', description: 'Renueva tu armario con las últimas tendencias.' },
  { id: 5, store: 'GameStop', discount: '10% off games', expires: '2025-10-25', code: 'GAMINGPRO', category: 'Gaming', description: 'Ofertas en videojuegos y accesorios para tu consola.' },
  { id: 6, store: 'Fnac', discount: '10% off books', expires: '2025-11-10', code: 'BOOKWORM', category: 'Libros', description: 'Descuentos en una gran variedad de libros y ebooks.' },
  { id: 7, store: 'MediaMarkt', discount: '10% off electronics', expires: '2025-11-20', code: 'ELECTRONICS10', category: 'Tech', description: 'Grandes ofertas en televisores, móviles y electrodomésticos.' },
  { id: 8, store: 'Glovo', discount: '5€ off delivery', expires: '2025-10-30', code: 'FOODIES', category: 'Comida', description: 'Pide tu comida a domicilio con un descuento especial.' },
  { id: 9, store: 'Booking.com', discount: '10% off hotels', expires: '2025-12-31', code: 'TRAVELNOW', category: 'Viajes', description: 'Encuentra los mejores precios en hoteles y alojamientos.' },
];

const MARQUEE_PROMOTIONS_DATA = [
  { id: 'm1', text: '¡20% en Amazon!', referralLink: 'https://www.amazon.es/ofertas' },
  { id: 'm2', text: 'Nike: 15% en zapatillas', referralLink: 'https://www.nike.com/es/ofertas' },
  { id: 'm3', text: 'Starbucks: 10% en tu pedido', referralLink: 'https://www.starbucks.es/promociones' },
  { id: 'm4', text: 'Zara: 25% en nueva colección', referralLink: 'https://www.zara.com/es/ofertas' },
  { id: 'm5', text: 'GameStop: 10% en juegos', referralLink: 'https://www.gamestop.es/ofertas' },
  { id: 'm6', text: 'Fnac: 10% en libros', referralLink: 'https://www.fnac.es/ofertas' },
  { id: 'm7', text: 'MediaMarkt: 10% en electrónica', referralLink: 'https://www.mediamarkt.es/ofertas' },
  { id: 'm8', text: 'Glovo: 5€ en tu primer pedido', referralLink: 'https://www.glovoapp.com/es/promociones' },
  { id: 'm9', text: 'Booking.com: 10% en hoteles', referralLink: 'https://www.booking.com/deals' },
];


function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <ThemeProvider>
        <Router>
          <GoogleAuthWrapper>
            <AppContent />
          </GoogleAuthWrapper>
        </Router>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

const AppContent = () => {
  const { user, login, handleLogout } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [deals, setDeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [copiedDealId, setCopiedDealId] = useState(null);
  const [selectedDeal, setSelectedDeal] = useState(null);

  useEffect(() => {
    setDeals(ALL_DEALS_DATA);
  }, []);

  const uniqueCategories = ['Todos', ...new Set(ALL_DEALS_DATA.map(deal => deal.category))];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          deal.discount.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          deal.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          deal.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || deal.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedDealId(id);
    setTimeout(() => setCopiedDealId(null), 2000);
  };

  const openDealDetails = (deal) => {
    setSelectedDeal(deal);
  };

  const closeDealDetails = () => {
    setSelectedDeal(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header user={user} onLogin={login} onLogout={handleLogout} searchTerm={searchTerm} onSearchChange={handleSearch} />
      
      <CategoryNav 
        categories={uniqueCategories}
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
      />

      <Routes>
        <Route path="/" element={
          <>
            {/* CAMBIO: Añadimos 'container mx-auto' al main para centrar el contenido */}
            <main className="container mx-auto px-4 py-8">
              <LaunchOfferBanner />
              <MarqueeDeals deals={MARQUEE_PROMOTIONS_DATA} /> 
              <DealList 
                deals={filteredDeals} 
                onCopyCode={copyCode} 
                onDealClick={openDealDetails}
                copiedDealId={copiedDealId}
              />
              <PromoCodeList onCopyCode={copyCode} copiedDealId={copiedDealId} />
            </main>
          </>
        } />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
      
      <Footer />

      <AnimatePresence>
        {selectedDeal && (
          <DealModal deal={selectedDeal} onClose={closeDealDetails} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;