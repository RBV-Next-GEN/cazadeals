import React from 'react';

const MarqueeDeals = ({ deals }) => {
  if (!deals || deals.length === 0) {
    return null; // No renderiza nada si no hay ofertas para la marquesina
  }

  // Duplicamos las ofertas una vez para crear un efecto de bucle continuo con la animación CSS
  const duplicatedDeals = [...deals, ...deals];

  const handleDealClick = (link) => {
    // Abre el enlace de referido en una nueva pestaña
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="marquee-container bg-gray-100 dark:bg-gray-800 py-3 shadow-inner mt-8 rounded-lg">
      <div className="marquee-content">
        {duplicatedDeals.map((deal, index) => (
          <div
            key={`${deal.id}-${index}`} // Usar index para keys únicas con duplicados
            className="marquee-item bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full px-4 py-2 mx-2 flex-shrink-0 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
            onClick={() => handleDealClick(deal.referralLink)}
          >
            {deal.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeDeals;