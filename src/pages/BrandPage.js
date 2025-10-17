
import { useEffect, useState, Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import logoMap from '../assets/logo-map';
import { ChevronDownIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { Transition } from '@headlessui/react';
import DealModal from '../components/DealModal';
import PopularityMeter from '../components/PopularityMeter';

const Breadcrumbs = ({ brandName }) => (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
        <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:underline">CazaDeals</Link></li>
            <li><span>/</span></li>
            <li><Link to="/tiendas" className="hover:underline">Tiendas</Link></li>
            <li><span>/</span></li>
            <li className="font-semibold text-gray-800">{brandName}</li>
        </ol>
    </nav>
);

const BrandHeader = ({ brand }) => (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 w-full">
        <div className="flex items-center gap-6">
            <div className="w-24 h-24 flex-shrink-0 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-2 shadow-sm">
                <img src={logoMap[brand.name] || brand.logoUrl} alt={`${brand.name} logo`} className="max-w-full max-h-full object-contain" />
            </div>
            <div>
                <h1 className="text-4xl font-bold text-gray-800">{brand.name}</h1>
                <h2 className="text-lg text-gray-600 mt-1">Códigos de descuento y ofertas verificadas</h2>
            </div>
        </div>
    </div>
);

const OfferCard = ({ deal, onClick }) => {
    const isCode = deal.type === 'código';
    
    return (
        <div 
            onClick={onClick}
            className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col md:flex-row justify-between items-center gap-6 transition-shadow hover:shadow-lg cursor-pointer"
        >
            <div className="flex items-center gap-4 w-full md:w-auto flex-grow">
                <div 
                    className={`flex-shrink-0 w-28 h-16 rounded-md flex flex-col items-center justify-center text-center ${isCode ? 'border-2 border-dashed border-pink-300 bg-pink-50' : 'bg-orange-100'}`}
                >
                    <span className={`font-bold text-xl ${isCode ? 'text-pink-500' : 'text-orange-500'}`}>{deal.value || (isCode ? 'CÓDIGO' : 'OFERTA')}</span>
                </div>
                <div className="flex-grow">
                    <p className="font-bold text-gray-800">{deal.description}</p>
                    <p className="text-sm text-gray-500 mt-1">
                        {deal.details && `${deal.details} | `}
                        Expira: {deal.expires}
                    </p>
                </div>
            </div>
            <button className={`w-full md:w-auto flex-shrink-0 font-bold py-3 px-6 rounded-lg text-white text-center transition-all duration-300 mt-4 md:mt-0 animated-gradient-button ${isCode ? 'gradient-pink' : 'gradient-orange'}`}>
                {isCode ? 'VER CÓDIGO' : 'VER OFERTA'}
            </button>
        </div>
    );
};

const AboutSection = ({ brand }) => (
    <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Acerca de {brand.name} y Consejos para Ahorrar</h2>
        <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto mb-6">
            {brand.description || `Encuentra las mejores ofertas y cupones para ${brand.name}. Aprovecha nuestros descuentos verificados para ahorrar en tu próxima compra.`}
        </p>
        <div className="flex justify-center gap-8">
            <div>
                <h3 className="font-bold text-lg mb-2">Consejos de experto:</h3>
                <ul className="space-y-2 text-sm text-left">
                    <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span className="text-gray-600">Usa nuestros códigos exclusivos en el checkout.</span>
                    </li>
                    <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span className="text-gray-600">Aprovecha las ofertas de temporada.</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
);

const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left p-3">
                <span className="font-semibold text-gray-800 text-sm">{question}</span>
                <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <Transition
                show={isOpen}
                as={Fragment}
                enter="transition-all duration-300 ease-out"
                enterFrom="opacity-0 -translate-y-2 max-h-0"
                enterTo="opacity-100 translate-y-0 max-h-screen"
                leave="transition-all duration-200 ease-in"
                leaveFrom="opacity-100 translate-y-0 max-h-screen"
                leaveTo="opacity-0 -translate-y-2 max-h-0"
            >
                <div className="overflow-hidden">
                    <p className="p-3 pt-0 text-gray-600 leading-relaxed text-sm">{answer}</p>
                </div>
            </Transition>
        </div>
    );
};

const FaqSection = ({ brandName }) => (
    <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Preguntas Frecuentes</h2>
        <div className="space-y-3">
            <FaqItem
                question={`¿Cómo usar un código en ${brandName}?`}
                answer="Busca el campo 'Añadir código promocional' durante el proceso de pago y pega el código."
            />
            <FaqItem
                question="¿Qué hago si una oferta no funciona?"
                answer="Verifica los términos de la oferta. Si el problema persiste, contáctanos."
            />
        </div>
    </div>
);

function BrandPage() {
    const { brandId } = useParams();
    const [brand, setBrand] = useState(null);
    const [deals, setDeals] = useState([]);
    const [filter, setFilter] = useState('Todas');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDeal, setSelectedDeal] = useState(null);

    useEffect(() => {
        const fetchBrandData = async () => {
            setLoading(true);
            try {
                const brandRef = doc(db, 'brands', brandId);
                const brandSnap = await getDoc(brandRef);

                if (!brandSnap.exists()) {
                    setError('No se ha encontrado la marca especificada.');
                    setLoading(false);
                    return;
                }
                
                const brandData = { id: brandSnap.id, ...brandSnap.data() };
                setBrand(brandData);

                const dealsQuery = query(collection(db, 'deals'), where('brand', '==', brandData.name));
                const dealSnaps = await getDocs(dealsQuery);
                const dealsData = dealSnaps.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setDeals(dealsData);

            } catch (err) {
                setError('Error al cargar los datos.');
                console.error(err);
            }
            setLoading(false);
        };

        fetchBrandData();
    }, [brandId]);
    
    const codeDeals = deals.filter(d => d.type === 'código');
    const offerDeals = deals.filter(d => d.type === 'oferta');
    
    const filteredDeals = deals.filter(deal => {
        if (filter === 'Todas') return true;
        if (filter === 'Códigos') return deal.type === 'código';
        if (filter === 'Ofertas') return deal.type === 'oferta';
        return true;
    });

    if (loading) return <div className="text-center py-20">Cargando...</div>;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {brand && (
                    <>
                        <Breadcrumbs brandName={brand.name} />
                        <BrandHeader brand={brand} />
                    </>
                )}
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="flex justify-between items-center">
                            <h2 className="text-3xl font-bold text-gray-800">Preguntas Frecuentes</h2>
                        </div>
                        {brand && <FaqSection brandName={brand.name} />}
                        <div className="flex justify-center">
                            {brand && <PopularityMeter score={brand.popularityScore || 0} votes={brand.totalVotes || 0} />}
                        </div>
                    </aside>

                    <main className="lg:col-span-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold text-gray-800">Todas las ofertas</h2>
                            <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-1">
                                <button 
                                    onClick={() => setFilter('Todas')}
                                    className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${filter === 'Todas' ? 'bg-pink-500 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}
                                >
                                    Todas ({deals.length})
                                </button>
                                <button 
                                    onClick={() => setFilter('Códigos')}
                                    className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${filter === 'Códigos' ? 'bg-pink-500 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}
                                >
                                    Códigos ({codeDeals.length})
                                </button>
                                <button 
                                    onClick={() => setFilter('Ofertas')}
                                    className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${filter === 'Ofertas' ? 'bg-pink-500 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}
                                >
                                    Ofertas ({offerDeals.length})
                                </button>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            {filteredDeals.length > 0 ? (
                                filteredDeals.map(deal => (
                                    <OfferCard key={deal.id} deal={deal} onClick={() => setSelectedDeal(deal)} />
                                ))
                            ) : (
                                <p className="text-center py-12 text-gray-500">No hay ofertas de este tipo disponibles.</p>
                            )}
                        </div>
                    </main>
                </div>
                
                <div className="mt-16">
                    {brand && <AboutSection brand={brand} />}
                </div>
            </div>

            {selectedDeal && 
                <DealModal 
                    deal={selectedDeal} 
                    onClose={() => setSelectedDeal(null)} 
                />
            }
        </div>
    );
}

export default BrandPage;
