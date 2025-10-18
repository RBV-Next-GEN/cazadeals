import { useEffect, useState } from 'react';
import logoMap from '../assets/logo-map'; // Importar el mapa de logos

function CouponModal({ coupon, onClose }) {
    const [isCopied, setIsCopied] = useState(false);
    const [copyError, setCopyError] = useState(false);
    const [imageError, setImageError] = useState(false); // Nuevo estado para error de imagen

    // Close modal on 'Escape' key press
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(coupon.code);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
        } catch (err) {
            console.error("Error al copiar al portapapeles: ", err);
            setCopyError(true);
            setTimeout(() => setCopyError(false), 3000);
        }
    };

    // Lógica para obtener el logo: primero de logoMap, luego Clearbit, finalmente fallback genérico
    const getLogoUrl = () => {
        if (logoMap[coupon.brand]) {
            return logoMap[coupon.brand];
        }
        // Si no está en logoMap, intentar con Clearbit
        return `https://logo.clearbit.com/${coupon.brand.toLowerCase().replace(/ /g, '')}.com`;
    };

    const logoToDisplay = imageError ? 'https://via.placeholder.com/64' : getLogoUrl(); // Usar fallback si hay error de imagen

    // Prevent background scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fade-in-fast" onClick={onClose}>
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto p-8 transform transition-all animate-slide-in-up" onClick={e => e.stopPropagation()}>
                
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                {/* Header */}
                <div className="text-center mb-6">
                    <img 
                        src={logoToDisplay} 
                        alt={`${coupon.brand || 'Marca'} logo`} 
                        className="max-h-20 mx-auto mb-4"
                        onError={() => setImageError(true)} // Manejar error de carga de imagen
                    />
                    <h2 className="text-2xl font-bold text-gray-800">{coupon.title}</h2>
                    <p className="text-sm text-gray-500 mt-2">
                        <span>{coupon.activations} Activados</span> | <span>Válido hasta el {coupon.expiry}</span>
                    </p>
                </div>

                {/* Code Display & Copy Button */}
                <div className="flex items-stretch justify-center my-8">
                    <div className="border-2 border-dashed border-gray-300 rounded-l-lg p-4 bg-gray-50 flex items-center">
                        <span className="text-2xl font-mono text-gray-700 tracking-widest">{coupon.code}</span>
                    </div>
                    <button 
                        onClick={handleCopy}
                        className={`bg-blue-600 text-white font-bold text-lg px-8 rounded-r-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300 whitespace-nowrap ${copyError ? 'bg-red-600' : ''}`}>
                        {isCopied ? '¡COPIADO!' : copyError ? 'ERROR' : 'COPIAR'}
                    </button>
                </div>

                {/* Link to Store */}
                <div className="text-center mb-8">
                    <a href={`/tiendas/${coupon.brandId}`} /* Replace with actual store URL if available */
                       className="group w-full text-white font-semibold py-3 px-4 rounded-lg text-base flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 transition-colors duration-300">
                        <span>Ir a la Tienda</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"><path fill-rule="evenodd" d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z" clip-rule="evenodd"></path></svg>
                    </a>
                    <p className="text-xs text-gray-400 mt-6">Válido hasta: 31 de diciembre de 2024</p>
                </div>

                {/* Ad Placeholder */}
                <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400">Espacio para publicidad</p>
                </div>
            </div>
        </div>
    );
}

export default CouponModal;
