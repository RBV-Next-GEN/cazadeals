import { useState } from 'react';
import CouponModal from './CouponModal'; // We will create this component next

function CouponCard({ coupon }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = () => {
        if (coupon.type === 'código') {
            setIsModalOpen(true);
        } else {
            // For offers, you might want to redirect directly or show a different modal.
            // For now, let's just log it or redirect.
            console.log('Redirecting to offer...');
            // window.open(coupon.targetUrl, '_blank'); // Example of direct redirection
        }
    };

    const buttonText = coupon.type === 'código' ? 'CONSIGUE EL CÓDIGO' : 'ACTIVA LA OFERTA';
    const buttonColor = coupon.type === 'código' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700';

    return (
        <>
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex items-center justify-between transition-shadow hover:shadow-lg">
                {/* Left Side: Discount & Title */}
                <div className="flex items-center">
                    <div className="text-center w-28 mr-6">
                        <span className="text-3xl font-bold text-blue-600">{coupon.discount}</span>
                        <span className="text-sm text-gray-500 block">de descuento</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-800">{coupon.title}</h3>
                        <div className="flex items-center space-x-1 text-sm text-gray-500 mt-2 cursor-pointer group">
                            <span>Detalles</span>
                            <svg className="w-4 h-4 transform transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>

                {/* Right Side: Button & Meta Info */}
                <div className="text-right">
                    <button 
                        onClick={handleCardClick} 
                        className={`relative text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 ${buttonColor}`}>
                        
                        {coupon.type === 'código' ? (
                            // This is the container for the "tape" effect
                            <div className="coupon-tape-container">
                                <span className="z-10 relative">{buttonText}</span>
                                <div className="coupon-tape-right">{coupon.code.slice(-3)}</div>
                            </div>
                        ) : (
                            <span>{buttonText}</span>
                        )}
                    </button>
                    <div className="mt-2 text-xs text-gray-400">
                        <span>{coupon.activations} Activados</span> | <span>{coupon.expiry}</span>
                    </div>
                </div>
            </div>

            {/* Modal - will only be rendered when isModalOpen is true */}
            {isModalOpen && (
                <CouponModal 
                    coupon={coupon} 
                    onClose={() => setIsModalOpen(false)} 
                />
            )}
        </>
    );
}

export default CouponCard;
