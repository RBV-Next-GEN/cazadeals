import React from 'react';
import { Link } from 'react-router-dom';

const MarqueeDeals = ({ deals }) => {
  if (!deals || deals.length === 0) {
    return null;
  }

  // Duplicamos los deals para crear un efecto infinito
  const duplicatedDeals = [...deals, ...deals];

  const slugify = (text) => {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  return (
    <div className="relative w-full overflow-hidden bg-transparent">
      <div className="flex animate-marquee">
        {duplicatedDeals.map((deal, index) => {
          const linkContent = (
            <span className="text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap">
              <span className="font-bold text-orange-600 dark:text-orange-400">{deal.brand}:</span>{' '}
              <span className="text-gray-600 dark:text-gray-300">{deal.description}</span>
            </span>
          );

          const commonClasses = "flex-shrink-0 bg-white dark:bg-gray-800 rounded-full px-6 py-2 mx-3 my-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 border border-transparent hover:border-orange-200 dark:hover:border-orange-800";

          if (deal.brandUrl) { // Si existe una URL de marca, usa un enlace externo
            return (
              <a
                key={`${deal.id}-${index}`}
                href={deal.brandUrl}
                target="_blank" // Abre en una nueva pestaña
                rel="noopener noreferrer" // Mejora la seguridad al abrir enlaces externos
                className={commonClasses}
              >
                {linkContent}
              </a>
            );
          } else { // Si no, usa el enlace interno existente
            return (
              <Link
                key={`${deal.id}-${index}`}
                to={`/tiendas/${slugify(deal.brand)}`}
                className={commonClasses}
              >
                {linkContent}
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
};

export default MarqueeDeals;
