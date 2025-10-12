import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useGoogleLogin, googleLogout } from '@react-oauth/google'; // Importa useGoogleLogin
import { jwtDecode } from 'jwt-decode'; // Importa jwtDecode correctamente
import { UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'; // Importa los iconos

import UserProfile from './components/UserProfile'; // Importa el nuevo componente de perfil

// Componente Admin (lo crearías en un archivo separado como AdminPanel.js)
const AdminPanel = () => {
  // Lógica y UI para el panel de administración
  return (
    <div className="p-8 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Panel de Administración</h1>
      <p className="mb-4">Bienvenido al panel de administración. Aquí podrás gestionar tus ofertas y categorías.</p>
      <nav className="mt-4 flex gap-4">
        <Link to="/admin/deals" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Gestionar Ofertas</Link>
        <Link to="/admin/categories" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">Gestionar Categorías</Link>
        <Link to="/" className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors">Volver a la Web</Link>
      </nav>
      <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <Routes>
          <Route path="deals" element={<h3 className="text-xl font-semibold">Interfaz de gestión de ofertas (próximamente)</h3>} />
          <Route path="categories" element={<h3 className="text-xl font-semibold">Interfaz de gestión de categorías (próximamente)</h3>} />
          <Route path="/" element={<p>Selecciona una opción del menú de administración.</p>} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [deals, setDeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [copiedDealId, setCopiedDealId] = useState(null);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [user, setUser] = useState(null); // Estado para el usuario logueado

  // Efecto para cargar el usuario desde localStorage al iniciar la app
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await new Promise(resolve => setTimeout(() => {
          resolve([
            { id: 1, code: 'SAVE20', store: 'Amazon', discount: '20% off', expires: '2025-10-20', category: 'Tech', description: 'Ahorra en una amplia selección de productos electrónicos y más.' },
            { id: 2, code: 'NIKE15', store: 'Nike', discount: '15% off shoes', expires: '2025-10-15', category: 'Moda', description: 'Descuento exclusivo en calzado deportivo y casual.' },
            { id: 3, code: 'STARBUCKS10', store: 'Starbucks', discount: '10% off', expires: '2025-10-18', category: 'Comida', description: 'Disfruta de tu bebida favorita con un descuento especial.' },
            { id: 4, code: 'ZARA25', store: 'Zara', discount: '25% off', expires: '2025-11-01', category: 'Moda', description: 'Renueva tu armario con las últimas tendencias de moda.' },
            { id: 5, code: 'GAMINGPRO', store: 'GameStop', discount: '10% off games', expires: '2025-10-25', category: 'Gaming', description: 'Grandes descuentos en tus videojuegos favoritos y accesorios.' },
            { id: 6, code: 'BOOKWORM', store: 'Fnac', discount: '10% off books', expires: '2025-11-10', category: 'Libros', description: 'Encuentra tu próxima lectura al mejor precio.' },
            { id: 7, code: 'ELECTRONICS10', store: 'MediaMarkt', discount: '10% off electronics', expires: '2025-11-20', category: 'Tech', description: 'Ofertas en televisores, ordenadores, móviles y más.' },
            { id: 8, code: 'FOODIE5', store: 'Glovo', discount: '5€ off delivery', expires: '2025-10-30', category: 'Comida', description: 'Descuento en tu próximo pedido a domicilio.' },
            { id: 9, code: 'TRAVELNOW', store: 'Booking.com', discount: '10% off hotels', expires: '2025-12-31', category: 'Viajes', description: 'Planifica tu próxima escapada con ofertas en alojamientos.' },
            { id: 10, code: 'FITNESS20', store: 'Decathlon', discount: '20% off sportswear', expires: '2025-11-15', category: 'Deporte', description: 'Equípate para tus entrenamientos con descuentos en ropa deportiva.' },
          ]);
        }, 500));

        setDeals(response);
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    };

    fetchDeals();
  }, []);

  const uniqueCategories = useMemo(() => {
    const categories = new Set(deals.map(deal => deal.category));
    return ['Todos', ...Array.from(categories)];
  }, [deals]);

  const filteredDeals = useMemo(() => {
    return deals.filter(deal => {
      const matchesSearchTerm = deal.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                deal.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'Todos' ||
                                  deal.category === selectedCategory;

      return matchesSearchTerm && matchesCategory;
    });
  }, [deals, searchTerm, selectedCategory]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchTerm('');
  };

  const copyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedDealId(id);
    setTimeout(() => setCopiedDealId(null), 1500);
  };

  const openDealDetails = (deal) => {
    setSelectedDeal(deal);
  };

  const closeDealDetails = () => {
    setSelectedDeal(null);
  };

  // Función para manejar el éxito del login de Google
  const handleGoogleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Usuario de Google logueado:", decoded);
    setUser(decoded); // Guarda la información del usuario en el estado
    localStorage.setItem('user', JSON.stringify(decoded)); // Persiste el usuario en localStorage

    // *** IMPORTANTE: Aquí es donde enviarías `credentialResponse.credential` (el ID token) a tu backend.
    // Tu backend lo verificaría con Google y crearía/encontraría un usuario en tu base de datos,
    // luego te devolvería un token de sesión propio de tu aplicación.
    // fetch('/api/auth/google', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ token: credentialResponse.credential })
    // }).then(response => response.json())
    //   .then(data => {
    //     // Guardar el token de tu backend y actualizar el estado de usuario
    //     console.log("Respuesta de tu backend:", data);
    //   }).catch(error => console.error("Error al enviar token a backend:", error));
  };

  // Hook de Google para iniciar sesión con un botón personalizado
  const login = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
    onError: (errorResponse) => { // ¡Este log es crucial!
      console.error('Login de Google fallido:', errorResponse);
    },
    flow: 'auth-code', // Asegúrate de que esta línea esté presente
  });

  // Función para cerrar sesión
  const handleLogout = () => {
    googleLogout(); // Cierra la sesión de Google
    setUser(null); // Limpia el estado del usuario
    localStorage.removeItem('user'); // Elimina el usuario de localStorage
    console.log('Sesión cerrada');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <Routes>
          <Route path="/" element={
            <>
              <motion.header
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-6 text-center relative"
              >
                <h1 className="text-4xl font-bold mb-2">CazaDeals</h1>
                <p className="text-lg">¡Caza ahorros PIM PAM! Busca, copia, gana.</p>

                {/* Botón de Login/Logout de Google - Personalizado */}
                <div className="absolute top-4 right-4">
                  {user ? (
                    <div className="flex items-center space-x-2">
                      {user.picture && (
                        <Link to="/profile" className="flex items-center">
                          <img src={user.picture} alt="Avatar" className="w-8 h-8 rounded-full border-2 border-white" />
                        </Link>
                      )}
                      <Link to="/profile" className="text-sm hidden md:inline hover:underline">
                        Hola, {user.given_name || user.name}!
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-1 bg-white text-red-500 px-3 py-1 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors"
                      >
                        <ArrowRightOnRectangleIcon className="w-4 h-4" />
                        <span>Salir</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => login()} // Llama al hook de Google Login
                      className="flex items-center space-x-2 bg-white text-red-500 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                    >
                      <UserCircleIcon className="w-5 h-5" />
                      <span>Iniciar Sesión</span>
                    </button>
                  )}
                </div>
              </motion.header>

              <div className="p-4 max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Busca 'Nike' o 'Tech'..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full p-3 rounded-lg shadow-lg border-0 focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="flex flex-wrap justify-center gap-2 p-4 max-w-6xl mx-auto">
                {uniqueCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                      ${selectedCategory === category
                        ? 'bg-red-500 text-white shadow-md'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Nueva Sección: Promoción Destacada */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="max-w-6xl mx-auto p-4 mt-6"
              >
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-lg p-6 text-center">
                  <h2 className="text-2xl font-bold mb-2">¡Oferta Exclusiva de Lanzamiento!</h2>
                  <p className="text-lg mb-4">Consigue un 30% de descuento en tu primera compra con el código: <span className="font-mono bg-white bg-opacity-20 px-2 py-1 rounded">CAZADEALS30</span></p>
                  <button className="bg-white text-purple-700 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition-colors duration-200">
                    ¡Aprovechar ahora!
                  </button>
                </div>
              </motion.div>

              {/* Cards de Deals —Responsive Grid */}
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 max-w-6xl mx-auto mt-6"
              >
                {filteredDeals.length > 0 ? (
                  filteredDeals.map((deal) => (
                    <motion.div
                      key={deal.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer"
                      onClick={() => openDealDetails(deal)}
                    >
                      <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{deal.store}</h3>
                        <p className="text-green-600 font-bold">{deal.discount}</p>
                        <p className="text-sm text-gray-500">Expira: {deal.expires}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyCode(deal.code, deal.id);
                          }}
                          className="mt-3 w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-200"
                        >
                          Copiar Código: {deal.code}
                        </button>
                      </div>
                      <AnimatePresence>
                        {copiedDealId === deal.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 flex items-center justify-center bg-gray-900/30 backdrop-blur-sm rounded-lg"
                          >
                            <motion.div
                              initial={{ scale: 0.7, opacity: 0, y: 10 }}
                              animate={{ scale: 1, opacity: 1, y: 0 }}
                              exit={{ scale: 0.7, opacity: 0, y: -10 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30, delay: 0.1 }}
                              className="flex flex-col items-center text-white text-xl font-semibold"
                            >
                              <motion.svg
                                className="w-10 h-10 mb-2 text-green-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <motion.path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
                                />
                              </motion.svg>
                              <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.3 }}
                              >
                                Copiado
                              </motion.span>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-600 dark:text-gray-400 text-lg mt-8">
                    No se encontraron ofertas.
                  </p>
                )}
              </motion.div>

              {/* Nueva Sección: Gana por Referidos */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="max-w-6xl mx-auto p-4 mt-8"
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center border border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">¡Gana por Referidos!</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Invita a tus amigos a CazaDeals y ambos recibiréis recompensas exclusivas. ¡Pronto más detalles!</p>
                  <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-600 transition-colors duration-200">
                    Invitar Amigos
                  </button>
                </div>
              </motion.div>

              {/* Footer —para monetización futura, como premium tease */}
              <footer className="mt-8 p-4 text-center text-gray-500">
                <p>¡Únete a Premium para alertas exclusivas! Más adelante...</p>
              </footer>
            </>
          } />
          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="/profile" element={<UserProfile user={user} onLogout={handleLogout} />} /> {/* Nueva ruta de perfil */}
        </Routes>

        {/* Modal de Detalles del Deal (global, fuera de Routes) */}
        <AnimatePresence>
          {selectedDeal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={closeDealDetails}
            >
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeDealDetails}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{selectedDeal.store}</h2>
                <p className="text-green-600 font-bold text-lg mb-2">{selectedDeal.discount}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-1">Código: <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{selectedDeal.code}</span></p>
                <p className="text-gray-600 dark:text-gray-300 mb-1">Categoría: {selectedDeal.category}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Expira: {selectedDeal.expires}</p>
                <p className="text-gray-700 dark:text-gray-200 mb-6">
                  {selectedDeal.description || '¡Aprovecha esta increíble oferta! Consulta los términos y condiciones en la web de la tienda.'}
                </p>
                <button
                  onClick={() => {
                    copyCode(selectedDeal.code, selectedDeal.id);
                  }}
                  className="mt-3 w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-200"
                >
                  Copiar Código: {selectedDeal.code}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;