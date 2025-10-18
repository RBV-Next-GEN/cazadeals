
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logoMap from '../assets/logo-map'; // Aseguramos que se usa el mapa central

const Breadcrumbs = () => (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:underline">CazaDeals</Link></li>
            <li><span>/</span></li>
            <li className="font-semibold text-gray-800 dark:text-white">Tiendas</li>
        </ol>
    </nav>
);

const AlphabetFilter = ({ onFilter, activeLetter }) => {
    const alphabet = ['Todas', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];
    return (
        <div className="flex justify-center flex-wrap gap-2 mb-10">
            {alphabet.map(letter => (
                <button 
                    key={letter}
                    onClick={() => onFilter(letter)}
                    className={`w-10 h-10 rounded-full font-semibold transition-all duration-200 ${activeLetter === letter ? 'bg-orange-500 text-white scale-110 shadow-lg' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>
                    {letter === 'Todas' ? '#' : letter}
                </button>
            ))}
        </div>
    );
};

const StoreCard = ({ brand }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-200 dark:border-gray-700">
        <div className="w-24 h-20 flex items-center justify-center mb-3">
            <img src={brand.logoUrl} alt={`${brand.name} logo`} className="max-w-full max-h-full object-contain" />
        </div>
        <h3 className="font-bold text-lg mb-3 text-gray-800 dark:text-white truncate w-full">{brand.name}</h3>
        <Link 
            to={`/tiendas/${brand.id}`} 
            className="w-full mt-auto bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold py-2 px-3 rounded-lg hover:opacity-90 transition-all duration-300 text-sm">
            Ver {brand.dealCount} {brand.dealCount === 1 ? 'oferta' : 'ofertas'}
        </Link>
    </div>
);

function StoresPage() {
    const [allBrands, setAllBrands] = useState([]);
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [activeLetter, setActiveLetter] = useState('Todas');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBrandsAndDeals = async () => {
            setLoading(true);
            try {
                const dealsCollection = await getDocs(collection(db, 'deals'));
                const dealCounts = {};
                dealsCollection.docs.forEach(doc => {
                    const brandName = doc.data().brand;
                    if(brandName) dealCounts[brandName] = (dealCounts[brandName] || 0) + 1;
                });

                const brandsCollection = await getDocs(collection(db, 'brands'));
                const brandsData = brandsCollection.docs.map(doc => {
                    const data = doc.data();
                    const name = data.name || 'Sin Nombre';
                    return {
                        id: doc.id,
                        name: name,
                        logoUrl: logoMap[name] || data.logoUrl, // Usa el mapa central
                        dealCount: dealCounts[name] || 0
                    }
                });

                brandsData.sort((a, b) => a.name.localeCompare(b.name));

                setAllBrands(brandsData);
                setFilteredBrands(brandsData);
            } catch (error) {
                console.error("Error fetching stores:", error);
            }
            setLoading(false);
        };

        fetchBrandsAndDeals();
    }, []);

    const handleFilter = (letter) => {
        setActiveLetter(letter);
        if (letter === 'Todas') {
            setFilteredBrands(allBrands);
        } else {
            setFilteredBrands(allBrands.filter(brand => brand.name && brand.name.toUpperCase().startsWith(letter)));
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
            <Breadcrumbs />
            <h1 className="text-4xl font-bold text-center mb-4 text-gray-800 dark:text-white">Todas las Tiendas</h1>
            <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-10">Encuentra ofertas y códigos de descuento de tus tiendas favoritas.</p>
            
            <AlphabetFilter onFilter={handleFilter} activeLetter={activeLetter} />
            
            {loading ? (
                <div className="text-center py-12">Cargando tiendas...</div>
            ) : filteredBrands.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {filteredBrands.map((brand) => (
                        <StoreCard key={brand.id} brand={brand} />
                    ))}
                </div>
            ) : (
                 <p className="text-center py-12 text-gray-500">
                    No hay tiendas configuradas. Añádelas desde el panel de administración.
                </p>
            )}
        </div>
    );
}

export default StoresPage;
