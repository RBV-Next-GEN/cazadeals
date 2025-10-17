
import React, { useState, useEffect } from 'react';
import { SparklesIcon, ArrowPathIcon, PlayIcon, BeakerIcon } from '@heroicons/react/24/solid';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, app } from '../../firebase';

const AdminScraperPage = () => {
  const [targets, setTargets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState({});

  useEffect(() => {
    const fetchScrapingTargets = async () => {
      setIsLoading(true);
      const brandsQuery = query(collection(db, 'brands'), where('scraperUrl', '!=', null));
      const snapshot = await getDocs(brandsQuery);
      const brandTargets = snapshot.docs
        .map(doc => ({ id: doc.id, name: doc.data().name, url: doc.data().scraperUrl }))
        .filter(brand => brand.url && brand.url.startsWith('http'));
      setTargets(brandTargets);
      setIsLoading(false);
    };
    fetchScrapingTargets();
  }, []);

  const handleTestSingleTarget = async (target) => {
    setIsProcessing(true);
    setResults(prev => ({ ...prev, [target.name]: { status: 'processing' } }));

    const functions = getFunctions(app);
    const scrapeOffersFn = httpsCallable(functions, 'scrapeOffers');

    try {
      console.log(`Ejecutando prueba para: ${target.name}`);
      const response = await scrapeOffersFn({ url: target.url, brandName: target.name });
      setResults(prev => ({ ...prev, [target.name]: { status: 'success', data: response.data } }));
    } catch (error) {
      console.error(`Error al procesar ${target.name}:`, error);
      setResults(prev => ({ ...prev, [target.name]: { status: 'error', message: error.message } }));
    }

    setIsProcessing(false);
  };

  const handleStartBatchScraping = async () => {
    setIsProcessing(true);
    setResults({});

    const functions = getFunctions(app);
    const scrapeOffersFn = httpsCallable(functions, 'scrapeOffers');

    for (const target of targets) {
      try {
        setResults(prev => ({ ...prev, [target.name]: { status: 'processing' } }));
        const response = await scrapeOffersFn({ url: target.url, brandName: target.name });
        setResults(prev => ({ ...prev, [target.name]: { status: 'success', data: response.data } }));
      } catch (error) {
        console.error(`Error al procesar ${target.name}:`, error);
        setResults(prev => ({ ...prev, [target.name]: { status: 'error', message: error.message } }));
      }
    }

    setIsProcessing(false);
  };
  
  const getStatusColor = (status) => {
    if (status === 'processing') return 'text-blue-500 animate-pulse';
    if (status === 'success') return 'text-green-500';
    if (status === 'error') return 'text-red-500';
    return 'text-gray-400';
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold flex items-center mb-2">
        <SparklesIcon className="w-8 h-8 mr-3 text-orange-500" />
        Scraper Inteligente
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Prueba una URL individualmente o ejecuta el proceso en grupo para todas las marcas configuradas.
      </p>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700">
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Objetivos de Scraping</h2>
            <button
                onClick={handleStartBatchScraping}
                disabled={isProcessing || isLoading || targets.length === 0}
                className="flex items-center bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {isProcessing ? <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" /> : <PlayIcon className="w-5 h-5 mr-2" />}
                {isProcessing ? 'Procesando...' : `Iniciar Grupo (${targets.length})`}
            </button>
        </div>
      </div>
      
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3">Marca</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3">Resultado</th>
              <th className="px-6 py-3 text-right">Probar</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
                <tr><td colSpan="4" className="text-center p-8">Cargando objetivos...</td></tr>
            ) : targets.length === 0 ? (
                 <tr><td colSpan="4" className="text-center p-8">No hay marcas con URL de scraping configurada.</td></tr>
            ) : (
                targets.map(target => {
                    const result = results[target.name];
                    return (
                        <tr key={target.id} className="border-b dark:border-gray-700">
                            <td className="px-6 py-4 font-bold">{target.name}</td>
                            <td className={`px-6 py-4 font-semibold ${getStatusColor(result?.status)}`}>
                                {result?.status === 'processing' && 'Procesando...'}
                                {result?.status === 'success' && 'Completado'}
                                {result?.status === 'error' && 'Error'}
                                {!result && 'Pendiente'}
                            </td>
                            <td className="px-6 py-4 text-xs">
                                {result?.status === 'success' && `Creadas: ${result.data.created}, Encontradas: ${result.data.foundDeals}`}
                                {result?.status === 'error' && result.message}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button
                                    onClick={() => handleTestSingleTarget(target)}
                                    disabled={isProcessing}
                                    className="flex items-center ml-auto bg-blue-500 text-white font-semibold py-1 px-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                                >
                                    <BeakerIcon className="w-4 h-4 mr-1" />
                                    Probar
                                </button>
                            </td>
                        </tr>
                    )
                })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminScraperPage;
