
import React from 'react';

const CategoryNav = ({ categories, onSelect, activeCategory }) => {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    // Contenedor principal con la máscara de degradado para el efecto fade-out
    <div className="relative py-4">
      <div 
        className="flex items-center space-x-4 overflow-x-auto pb-4 no-scrollbar"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
        }}
      >
        {/* Botón "Todos" con estilo especial */}
        <button
          onClick={() => onSelect('Todos')}
          className={`px-5 py-2 text-sm font-bold rounded-full transition-all duration-300 flex-shrink-0
            ${activeCategory === 'Todos' 
              ? 'bg-orange-500 text-white shadow-lg' 
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700'
            }`
          }
        >
          Todos
        </button>

        {/* Mapeo del resto de categorías */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category.name)}
            className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 flex-shrink-0 border-b-2
              ${activeCategory === category.name
                ? 'bg-orange-500 text-white shadow-orange-500/50 shadow-lg border-transparent'
                : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-transparent hover:text-orange-500 hover:border-orange-500 hover:shadow-lg'
              }`
            }
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

// Estilo para ocultar la barra de scroll
const styles = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// Inyecta los estilos en el head del documento
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default CategoryNav;
