
import React from 'react';
import { Link } from 'react-router-dom';

const MarqueeDeals = ({ deals }) => {
  if (!deals || deals.length === 0) {
    return null;
  }

  const duplicatedDeals = [...deals, ...deals, ...deals];

  const slugify = (text) => {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  return (
    <div className="relative w-full overflow-hidden py-4">
      <div className="flex animate-marquee whitespace-nowrap min-w-max">
        {duplicatedDeals.map((deal, index) => (
          <Link
            key={index}
            to={`/tiendas/${slugify(deal.brand)}`}
            className="bg-white dark:bg-tertiary-dark rounded-full px-5 py-2 mx-2 shadow-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-accent-cream dark:hover:bg-gray-700 block"
          >
            <span className="text-sm text-gray-800 dark:text-gray-200">
              <span className="font-bold">{deal.brand}:</span> {deal.description}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MarqueeDeals;
