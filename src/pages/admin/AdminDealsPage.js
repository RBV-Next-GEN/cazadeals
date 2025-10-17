
import React, { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { PencilIcon, TrashIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { AnimatePresence, motion } from 'framer-motion';

// --- Formulario Modal para Crear/Editar Ofertas ---
const DealFormModal = ({ isOpen, onClose, onSave, deal, brands }) => {
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Si pasamos una 'deal', estamos editando. Si no, creando.
        setFormData(deal || {
            title: '',
            description: '',
            brand: '',
            code: '',
            link: '',
            category: '',
            type: 'oferta', // Valor por defecto
            value: '',
            expires: new Date().toISOString().split('T')[0] // Fecha de hoy por defecto
        });
    }, [deal, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await onSave(formData);
        setIsLoading(false);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                        <h2 className="text-xl font-bold">{deal ? 'Editar Oferta' : 'Crear Nueva Oferta'}</h2>
                        <button onClick={onClose}><XMarkIcon className="w-6 h-6" /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                        {/* Campos del formulario */}
                        <input name="title" value={formData.title || ''} onChange={handleChange} placeholder="Título de la oferta" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />
                        <textarea name="description" value={formData.description || ''} onChange={handleChange} placeholder="Descripción detallada" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />
                        <select name="brand" value={formData.brand || ''} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required>
                            <option value="">Selecciona una marca</option>
                            {brands.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                        </select>
                        <input name="link" value={formData.link || ''} onChange={handleChange} placeholder="Enlace de la oferta" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="code" value={formData.code || ''} onChange={handleChange} placeholder="Código de descuento (si aplica)" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                            <input name="value" value={formData.value || ''} onChange={handleChange} placeholder="Valor (ej: 20%, 10€)" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                            <select name="type" value={formData.type || 'oferta'} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                                <option value="oferta">Oferta</option>
                                <option value="código">Código</option>
                            </select>
                            <input type="date" name="expires" value={formData.expires || ''} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                        </div>
                        <div className="flex justify-end pt-4">
                            <button type="submit" disabled={isLoading} className="bg-orange-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-400">
                                {isLoading ? 'Guardando...' : (deal ? 'Actualizar Oferta' : 'Crear Oferta')}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};


// --- Página Principal para Gestionar Ofertas ---
const AdminDealsPage = () => {
    const [deals, setDeals] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDeal, setSelectedDeal] = useState(null);

    const fetchDealsAndBrands = useCallback(async () => {
        setLoading(true);
        try {
            const dealsSnapshot = await getDocs(collection(db, 'deals'));
            setDeals(dealsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

            const brandsSnapshot = await getDocs(collection(db, 'brands'));
            setBrands(brandsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
            console.error("Error al cargar datos:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDealsAndBrands();
    }, [fetchDealsAndBrands]);

    const handleSaveDeal = async (dealData) => {
        try {
            if (dealData.id) {
                // Estamos editando una oferta existente
                const dealRef = doc(db, 'deals', dealData.id);
                await updateDoc(dealRef, { ...dealData, updatedAt: serverTimestamp() });
            } else {
                // Estamos creando una nueva oferta
                await addDoc(collection(db, 'deals'), { ...dealData, createdAt: serverTimestamp() });
            }
            onCloseModal();
            fetchDealsAndBrands(); // Recarga los datos
        } catch (error) {
            console.error("Error al guardar la oferta:", error);
        }
    };

    const handleDeleteDeal = async (dealId) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar esta oferta?")) {
            try {
                await deleteDoc(doc(db, 'deals', dealId));
                fetchDealsAndBrands(); // Recarga los datos
            } catch (error) {
                console.error("Error al eliminar la oferta:", error);
            }
        }
    };
    
    const onOpenModal = (deal = null) => {
        setSelectedDeal(deal);
        setIsModalOpen(true);
    };

    const onCloseModal = () => {
        setSelectedDeal(null);
        setIsModalOpen(false);
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Gestionar Ofertas</h1>
                <button onClick={() => onOpenModal()} className="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg flex items-center hover:bg-orange-600 transition-colors">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Crear Oferta
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Título</th>
                            <th scope="col" className="px-6 py-3">Marca</th>
                            <th scope="col" className="px-6 py-3">Tipo</th>
                            <th scope="col" className="px-6 py-3">Expira</th>
                            <th scope="col" className="px-6 py-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="5" className="text-center p-8">Cargando ofertas...</td></tr>
                        ) : (
                            deals.map(deal => (
                                <tr key={deal.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{deal.title}</td>
                                    <td className="px-6 py-4">{deal.brand}</td>
                                    <td className="px-6 py-4">{deal.type}</td>
                                    <td className="px-6 py-4">{deal.expires}</td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button onClick={() => onOpenModal(deal)} className="p-2 text-blue-500 hover:text-blue-700"><PencilIcon className="w-5 h-5"/></button>
                                        <button onClick={() => handleDeleteDeal(deal.id)} className="p-2 text-red-500 hover:text-red-700"><TrashIcon className="w-5 h-5"/></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <DealFormModal isOpen={isModalOpen} onClose={onCloseModal} onSave={handleSaveDeal} deal={selectedDeal} brands={brands} />
        </div>
    );
};

export default AdminDealsPage;
