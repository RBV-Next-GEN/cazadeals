
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { useAuth } from '../context/AuthContext';
import { MagnifyingGlassIcon, UserCircleIcon, BackspaceIcon } from '@heroicons/react/24/solid';
import LogoCazaDeals from '../assets/LogoCazaDeals';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Header = () => {
  const { currentUser, loginWithGoogle } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [allBrands, setAllBrands] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const fetchBrands = async () => {
      const brandsCollection = collection(db, 'brands');
      const brandSnapshot = await getDocs(brandsCollection);
      const brandsList = brandSnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
      setAllBrands(brandsList);
    };
    fetchBrands();
  }, []);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query.length > 1) {
      const filteredBrands = allBrands.filter(brand => brand?.name?.toLowerCase().includes(query.toLowerCase()));
      setSearchResults(filteredBrands);
    } else {
      setSearchResults([]);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
  };
  
  const handleSignIn = () => {
    loginWithGoogle();
  };
  
  const handleBrandClick = () => {
      handleClearSearch();
      setIsSearchFocused(false);
  };

  return (
    <header className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="relative flex h-16 items-center justify-center">
          <div className="absolute left-0 flex-shrink-0">
            <Link to="/" className="flex items-center group focus:outline-none">
              <LogoCazaDeals size={34} fontSize={22} className="transition-transform group-hover:scale-105" />
            </Link>
          </div>

          <div ref={searchContainerRef} className="relative w-full max-w-xl">
            {/* --- ¡CORREGIDO! Se envuelve la lupa en un div para centrarla con Flexbox --- */}
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por tienda o marca..."
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              className="w-full bg-gray-100 dark:bg-gray-800 border-2 border-transparent rounded-full py-2.5 pl-12 pr-12 text-gray-800 dark:text-gray-200 transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />
            <AnimatePresence>
              {searchTerm && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={handleClearSearch}
                  className="absolute inset-y-0 right-0 flex items-center justify-center w-12 text-gray-500 hover:text-orange-500 dark:hover:text-orange-400 z-10"
                  aria-label="Borrar búsqueda"
                >
                  <BackspaceIcon className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>
            
            <AnimatePresence>
              {isSearchFocused && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 overflow-hidden"
                >
                  <ul>
                    {searchResults.map(brand => (
                      <li key={brand.id}>
                        <Link
                          to={`/tiendas/${brand.id}`}
                          onClick={handleBrandClick}
                          className="block px-4 py-3 hover:bg-orange-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors"
                        >
                          {brand.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute right-0 flex-shrink-0 flex items-center space-x-2">
            <div className="h-6 border-l border-gray-200 dark:border-gray-700"></div>
            {currentUser ? (
              <Menu as="div" className="relative">
                <Link to="/profile" className="flex items-center p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt="Perfil" className="w-8 h-8 rounded-full" />
                  ) : (
                    <UserCircleIcon className="w-8 h-8 text-gray-500" />
                  )}
                </Link>
              </Menu>
            ) : (
              <button onClick={handleSignIn} className="flex items-center p-2 rounded-lg text-sm font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                <UserCircleIcon className="w-6 h-6" />
                <span className="ml-2 hidden lg:inline">Iniciar Sesión</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
