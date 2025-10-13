import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { collection, onSnapshot } from 'firebase/firestore'; // Importa las funciones de Firestore
import { db } from './firebase'; // Importa la configuración de la base de datos
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from './context/theme';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleAuthWrapper, { useAuth } from './components/GoogleAuthWrapper';
import UserProfile from './components/UserProfile';
import DealModal from './components/DealModal';
import CategoryNav from './components/CategoryNav';
import StoresPage from './components/StoresPage';
import BrandPage from './components/BrandPage';
import HomePage from './pages/HomePage';

// La variable ALL_DEALS_DATA ha sido eliminada. ¡Ahora los datos vendrán de Firebase!

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <ThemeProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
  const [deals, setDeals] = useState([]); // El estado inicial ahora es un array vacío
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [copiedDealId, setCopiedDealId] = useState(null);
  const [selectedDeal, setSelectedDeal] = useState(null);

  // --- ¡Magia de Firebase aquí! ---
  useEffect(() => {
    // Crea una referencia a la colección 'deals' en tu base de datos Firestore
    const dealsCollectionRef = collection(db, 'deals');

    // Escucha los cambios en la colección en tiempo real
    const unsubscribe = onSnapshot(dealsCollectionRef, (snapshot) => {
      const dealsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDeals(dealsData); // Actualiza el estado con los datos de Firebase
    });

    // Limpia el listener cuando el componente se desmonta para evitar fugas de memoria
    return () => unsubscribe();
  }, []); // Se ejecuta solo una vez, cuando el componente se monta

  // Las categorías, tiendas y ofertas de la marquesina ahora se derivan dinámicamente
  // del estado 'deals', que es alimentado por Firebase.
  const uniqueCategories = ['Todos', ...new Set(deals.map(deal => deal.category)), 'Tiendas'];
  const storeList = [...new Set(deals.map(d => d.store))];
  const marqueeDeals = deals.map(d => d.marquee).filter(Boolean);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchTerm('');
  };

  const filteredDeals = deals.filter(deal => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch = searchTerm.trim() === '' ||
                          deal.store.toLowerCase().includes(searchTermLower) ||
                          deal.discount.toLowerCase().includes(searchTermLower) ||
                          (deal.code && deal.code.toLowerCase().includes(searchTermLower)) ||
                          deal.category.toLowerCase().includes(searchTermLower);
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
    <div className="min-h-screen bg-background-light dark:bg-primary-dark text-text-light dark:text-text-dark transition-colors duration-300">
      <Header user={user} onLogin={login} onLogout={handleLogout} searchTerm={searchTerm} onSearchChange={handleSearch} stores={storeList} />
      
      <CategoryNav 
        categories={uniqueCategories}
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
      />

      <Routes>
        <Route path="/" element={
          <HomePage
            deals={filteredDeals}
            marqueeDeals={marqueeDeals}
            onCopyCode={copyCode}
            onDealClick={openDealDetails}
            copiedDealId={copiedDealId}
          />
        } />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/tiendas" element={<StoresPage deals={deals} />} />
        <Route path="/tiendas/:brandName" element={<BrandPage deals={deals} onCopyCode={copyCode} copiedDealId={copiedDealId} />} />
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
