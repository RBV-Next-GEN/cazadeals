
import React, { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { PencilIcon, TrashIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { AnimatePresence, motion } from 'framer-motion';

// --- Formulario Modal (sin cambios) ---
const BrandFormModal = ({ isOpen, onClose, onSave, brand }) => {
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setFormData(brand || { name: '', logoUrl: '', referralParam: '', scraperUrl: '' });
    }, [brand, isOpen]);

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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4" onClick={onClose}>
                <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }} className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                        <h2 className="text-xl font-bold">{brand ? 'Editar Marca' : 'Crear Nueva Marca'}</h2>
                        <button onClick={onClose}><XMarkIcon className="w-6 h-6" /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <input name="name" value={formData.name || ''} onChange={handleChange} placeholder="Nombre de la marca" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />
                        <input name="logoUrl" value={formData.logoUrl || ''} onChange={handleChange} placeholder="URL del logo" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                        <input name="referralParam" value={formData.referralParam || ''} onChange={handleChange} placeholder="Parámetro de referido (ej: tag=micodigo-21)" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                        <input name="scraperUrl" value={formData.scraperUrl || ''} onChange={handleChange} placeholder="URL de la página de ofertas" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                        <div className="flex justify-end pt-4">
                            <button type="submit" disabled={isLoading} className="bg-orange-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-400">
                                {isLoading ? 'Guardando...' : (brand ? 'Actualizar Marca' : 'Crear Marca')}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};


// --- Página Principal para Gestionar Marcas ---
const AdminBrandsPage = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);

    const fetchBrands = useCallback(async () => {
        setLoading(true);
        const brandsSnapshot = await getDocs(collection(db, 'brands'));
        setBrands(brandsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchBrands();
    }, [fetchBrands]);

    const handleSaveBrand = async (brandData) => {
        try {
            if (brandData.id) {
                const brandRef = doc(db, 'brands', brandData.id);
                const { id, ...dataToSave } = brandData;
                
                console.log("Intentando actualizar marca:", brandData.id, "con datos:", dataToSave);
                
                await setDoc(brandRef, dataToSave, { merge: true });

            } else {
                const { id, ...dataToSave } = brandData;
                 console.log("Intentando crear marca con datos:", dataToSave);
                await addDoc(collection(db, 'brands'), dataToSave);
            }
            onCloseModal();
            fetchBrands();
        } catch (error) { 
            console.error("Error al guardar la marca:", error); 
        }
    };

    const handleDeleteBrand = async (brandId) => {
        if (window.confirm("¿Estás seguro?")) {
            try {
                await deleteDoc(doc(db, 'brands', brandId));
                fetchBrands();
            } catch (error) { console.error("Error al eliminar la marca:", error); }
        }
    };
    
    const onOpenModal = (brand = null) => {
        setSelectedBrand(brand);
        setIsModalOpen(true);
    };

    const onCloseModal = () => {
        setSelectedBrand(null);
        setIsModalOpen(false);
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Gestionar Marcas</h1>
                <button onClick={() => onOpenModal()} className="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg flex items-center hover:bg-orange-600">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Crear Marca
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-x-auto">
                <table className="w-full text-sm text-left">
                     <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3">Nombre</th>
                            <th scope="col" className="px-6 py-3">URL de Scraping</th>
                            <th scope="col" className="px-6 py-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="3" className="text-center p-8">Cargando...</td></tr>
                        ) : (
                            brands.map(brand => (
                                <tr key={brand.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center">
                                        <img src={brand.logoUrl} alt={brand.name} className="h-8 w-8 object-contain mr-4 rounded-full bg-white p-1"/>
                                        {brand.name}
                                    </td>
                                    <td className="px-6 py-4 text-xs font-mono text-gray-500">{brand.scraperUrl || 'No configurada'}</td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button onClick={() => onOpenModal(brand)} className="p-2 text-blue-500 hover:text-blue-700"><PencilIcon className="w-5 h-5"/></button>
                                        <button onClick={() => handleDeleteBrand(brand.id)} className="p-2 text-red-500 hover:text-red-700"><TrashIcon className="w-5 h-5"/></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <BrandFormModal isOpen={isModalOpen} onClose={onCloseModal} onSave={handleSaveBrand} brand={selectedBrand} />
        </div>
    );
};

export default AdminBrandsPage;
