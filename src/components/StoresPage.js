
      import { collection, getDocs, query, where } from 'firebase/firestore';
      import { db } from '../firebase';
      import { useEffect, useState } from 'react';
      import { Link } from 'react-router-dom';
      
      const Breadcrumbs = () => (
          <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                  <li><Link to="/" className="hover:underline">CazaDeals</Link></li>
                  <li><span className="text-gray-400">/</span></li>
                  <li><span className="font-semibold text-text-primary-light dark:text-text-primary-dark">Tiendas</span></li>
              </ol>
          </nav>
      );
      
      const AlphabetFilter = ({ onFilter, activeLetter }) => {
          const alphabet = ['Todas', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];
          return (
              <div className="flex justify-center flex-wrap gap-2 mb-12">
                  {alphabet.map(letter => (
                      <button 
                          key={letter}
                          onClick={() => onFilter(letter)}
                          className={`w-10 h-10 rounded-full font-semibold transition-all duration-200 ${activeLetter === letter ? 'bg-accent-orange text-white scale-110 shadow-lg' : 'bg-secondary-light dark:bg-secondary-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-300 dark:hover:bg-gray-600'}`}>
                          {letter === 'Todas' ? '#' : letter}
                      </button>
                  ))}
              </div>
          );
      };
      
      const StoreCard = ({ brand }) => (
          <div className="bg-primary-light dark:bg-primary-dark rounded-xl shadow-md p-4 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:scale-105 border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
              <div className="w-24 h-20 flex items-center justify-center mb-3">
                  <img src={brand.logoUrl} alt={`${brand.name} logo`} className="max-w-full max-h-full object-contain" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-text-primary-light dark:text-text-primary-dark truncate w-full">{brand.name}</h3>
              <Link to={`/tiendas/${brand.id}`} className="w-full mt-auto bg-blue-500 text-white font-semibold py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 text-sm">
                  Ver {brand.dealCount} {brand.dealCount === 1 ? 'oferta' : 'ofertas'}
              </Link>
          </div>
      );
      
      function StoresPage({ deals }) {
          const [allBrands, setAllBrands] = useState([]);
          const [filteredBrands, setFilteredBrands] = useState([]);
          const [activeLetter, setActiveLetter] = useState('Todas');
          const [loading, setLoading] = useState(true);
      
          useEffect(() => {
              const processBrands = async () => {
                  setLoading(true);
      
              // Contar ofertas por marca
              const dealCounts = new Map();
              if (deals && deals.length > 0) {
                  deals.forEach(deal => {
                      if (deal.brand) {
                          dealCounts.set(deal.brand, (dealCounts.get(deal.brand) || 0) + 1);
                      }
                  });
              }
              
              // Mapa de logos para enriquecer los datos de la marca
              const logoMap = {
                  'El Corte Inglés': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/El_Corte_Ingl%C3%A9s_logo.svg/1200px-El_Corte_Ingl%C3%A9s_logo.svg.png',
                  'Amazon': 'https://brandemia.org/contenido/subidas/2022/11/logo-amazon-2000-actualidad-1024x576.png',
                  'Zalando': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Zalando_logo.svg/2560px-Zalando_logo.svg.png',
                  'PcComponentes': 'https://www.pccomponentes.com/img/pccom-logo.svg',
                  'Casa del Libro': 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Casa_del_Libro_logo.svg',
                  'Game': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/GAME_Logo.svg/2560px-GAME_Logo.svg.png',
                  'Glovo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Glovo_logo.svg/2560px-Glovo_logo.svg.png',
                  'Booking.com': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Booking.com_logo.svg/2560px-Booking.com_logo.svg.png'
              };
      
                  // Cargar todas las marcas desde Firestore
                  const brandsCollection = await getDocs(collection(db, 'brands'));
                  let brandsData = brandsCollection.docs.map(doc => {
                      const data = doc.data();
                      return {
                          id: doc.id,
                          ...data,
                          logoUrl: logoMap[data.name] || data.logoUrl, // Usar el logo del mapa, o el de la DB como fallback
                          dealCount: dealCounts.get(data.name) || 0
                      };
                  }).filter(brand => brand.dealCount > 0);
      
                  // Ordenar alfabéticamente
                  brandsData.sort((a, b) => a.name.localeCompare(b.name));
      
                  setAllBrands(brandsData);
                  setFilteredBrands(brandsData);
                  setLoading(false);
              };
      
              processBrands();
          }, [deals]);
      
          const handleFilter = (letter) => {
              setActiveLetter(letter);
              if (letter === 'Todas') {
                  setFilteredBrands(allBrands);
              } else {
                  setFilteredBrands(allBrands.filter(brand => brand.name.toUpperCase().startsWith(letter)));
              }
          };
      
          return (
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                  <Breadcrumbs />
                  <h1 className="text-4xl font-bold text-center mb-6 text-text-primary-light dark:text-text-primary-dark">Todas las Tiendas</h1>
                  <p className="text-center text-lg text-text-secondary-light dark:text-text-secondary-dark mb-12">Encuentra ofertas y códigos de descuento de tus tiendas favoritas.</p>
                  
                  <AlphabetFilter onFilter={handleFilter} activeLetter={activeLetter} />
                  
                  {loading ? (
                      <p className="text-center py-12">Cargando tiendas...</p>
                  ) : filteredBrands.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                          {filteredBrands.map((brand) => (
                              <StoreCard key={brand.id} brand={brand} />
                          ))}
                      </div>
                  ) : (
                      <p className="text-center py-12 text-text-secondary-light dark:text-text-secondary-dark">No hay tiendas que empiecen por la letra "{activeLetter}".</p>
                  )}
              </div>
          );
      }
      
      export default StoresPage;
      