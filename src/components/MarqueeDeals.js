import React from 'react';
import { Link } from 'react-router-dom';

const MarqueeDeals = ({ deals }) => {
  if (!deals || deals.length === 0) {
    return null;
  }

  // Duplicar las ofertas para un bucle infinito y suave
  const duplicatedDeals = [...deals, ...deals];

  // Función para convertir el nombre de la marca en una URL amigable (slug)
  const slugify = (text) => {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')       // Reemplazar espacios con -
      .replace(/[^\w\-]+/g, '')   // Eliminar caracteres no válidos
      .replace(/\-\-+/g, '-')     // Reemplazar guiones múltiples con uno solo
      .replace(/^-+/, '')          // Eliminar guiones al principio
      .replace(/-+$/, '');         // Eliminar guiones al final
  };

  return (
    // Contenedor principal de la marquesina
    <div className="relative w-full overflow-hidden bg-gray-100 dark:bg-secondary-dark py-4 my-8">
      {/* Contenedor que se anima */}
      <div className="flex animate-marquee-slow whitespace-nowrap">
        {/* Mapeo de las ofertas para crear las "píldoras" enlazadas */}
        {duplicatedDeals.map((deal, index) => (
          <Link
            key={index}
            to={`/tiendas/${slugify(deal.brand)}`}
            // Estilo de cada "píldora"
            className="bg-white dark:bg-tertiary-dark rounded-full px-5 py-2 mx-2 shadow-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-accent-cream dark:hover:bg-gray-700 block"
          >
            <span className="text-sm text-gray-800 dark:text-gray-200">
              {/* Nombre de la marca en negrita */}
              <span className="font-bold">{deal.brand}:</span> {deal.text}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MarqueeDeals;
