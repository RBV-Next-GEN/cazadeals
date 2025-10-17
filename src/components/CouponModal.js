import { useEffect, useState } from 'react';

function CouponModal({ coupon, onClose }) {
    const [isCopied, setIsCopied] = useState(false);

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

    const handleCopy = () => {
        navigator.clipboard.writeText(coupon.code).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
        });
    };

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
                    <img src={coupon.logoUrl || mockBrand.logoUrl} alt={`${coupon.brandId} logo`} className="max-h-20 mx-auto mb-4" />
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
                        className="bg-blue-600 text-white font-bold text-lg px-8 rounded-r-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300 whitespace-nowrap">
                        {isCopied ? '¡COPIADO!' : 'COPIAR'}
                    </button>
                </div>

                {/* Link to Store */}
                <div className="text-center mb-8">
                    <a href={`/tiendas/${coupon.brandId}`} /* Replace with actual store URL if available */
                       className="text-blue-600 hover:underline font-semibold">
                        Ve a la tienda {coupon.brandId} →
                    </a>
                    <p className="text-xs text-gray-500 mt-2">{coupon.details}</p>
                </div>

                {/* Ad Placeholder */}
                <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400">Espacio para publicidad</p>
                </div>
            </div>
        </div>
    );
}

// Mock data for cases where logoUrl is not directly on the coupon object
const mockBrand = {
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Shein-logo.svg/2560px-Shein-logo.svg.png',
};

export default CouponModal;
