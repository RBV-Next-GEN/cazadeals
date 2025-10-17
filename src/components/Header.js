
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { useAuth } from '../context/AuthContext';
import { MagnifyingGlassIcon, UserCircleIcon, ArrowLeftOnRectangleIcon, BackspaceIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Header = () => {
  const { currentUser, signInWithGoogle, logout } = useAuth();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [allBrands, setAllBrands] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const fetchBrands = async () => {
      const brandsCollection = collection(db, 'brands');
      const brandSnapshot = await getDocs(brandsCollection);
      const brandsList = brandSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name
      }));
      setAllBrands(brandsList);
    };
    fetchBrands();
  }, []);
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchContainerRef]);


  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length > 1) {
      const filteredBrands = allBrands.filter(brand =>
        brand && brand.name && brand.name.toLowerCase().includes(query.toLowerCase())
      );
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
    signInWithGoogle(navigate);
  };
  
  const handleBrandClick = () => {
      handleClearSearch();
      setIsSearchFocused(false);
  };

  return (
    <header className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        {/* Contenedor principal con posicionamiento relativo para alinear los elementos */}
        <div className="relative flex h-16 items-center justify-center">
          
          {/* Logo - Posicionado a la izquierda */}
          <div className="absolute left-0 flex-shrink-0">
            <Link to="/" className="text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">
              CazaDeals
            </Link>
          </div>

          {/* Buscador - Centrado por el contenedor flex principal */}
          <div ref={searchContainerRef} className="relative w-full max-w-xl">
            <MagnifyingGlassIcon className="absolute top-1/2 left-4 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
            <input
              type="text"
              placeholder="Buscar por tienda o marca..."
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              className="w-full bg-gray-100 dark:bg-gray-800 border-2 border-transparent rounded-full py-2.5 pl-12 pr-10 text-gray-800 dark:text-gray-200 transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />
            <AnimatePresence>
              {searchTerm && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={handleClearSearch}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-orange-500 dark:hover:text-orange-400 z-10"
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

          {/* Iconos de Usuario - Posicionado a la derecha */}
          <div className="absolute right-0 flex-shrink-0 flex items-center space-x-2">
            <div className="h-6 border-l border-gray-200 dark:border-gray-700"></div>
            {currentUser ? (
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                  <img src={currentUser.photoURL} alt="Perfil" className="w-8 h-8 rounded-full" />
                </Menu.Button>
                <Transition as={React.Fragment} enter="transition ease-out duration-100" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                  <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                     <Menu.Item>
                        {({ active }) => (<Link to="/profile" className={`${active && 'bg-gray-100 dark:bg-gray-700'} group flex items-center w-full px-2 py-2 text-sm text-gray-800 dark:text-gray-200`}> <UserCircleIcon className="w-5 h-5 mr-2" />Mi Perfil</Link>)}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (<button onClick={logout} className={`${active && 'bg-gray-100 dark:bg-gray-700'} group flex items-center w-full px-2 py-2 text-sm text-red-600 dark:text-red-400`}> <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />Cerrar sesión</button>)}
                      </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <button onClick={handleSignIn} className="flex items-center p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                <UserCircleIcon className="w-6 h-6" />
                <span className="ml-2 text-sm font-bold hidden lg:inline">Iniciar Sesión</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
