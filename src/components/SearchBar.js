import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const SearchBar = ({ searchTerm, onSearchChange, stores = [] }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchBarRef = useRef(null);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Filtramos solo tiendas que no sean categorías generales
    const storeNames = stores.filter(s => s && s.toLowerCase() !== 'todos' && s.toLowerCase() !== 'tiendas');

    const filteredSuggestions = storeNames.filter(store =>
      store.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
    setShowSuggestions(filteredSuggestions.length > 0);

  }, [searchTerm, stores]);

  // Efecto para cerrar las sugerencias al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = () => {
      setShowSuggestions(false);
  };

  return (
    <div className="relative flex-grow" ref={searchBarRef}>
      <div className="flex items-center bg-white dark:bg-slate-700 border border-secondary-light dark:border-slate-600 rounded-l-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent-orange-light dark:focus-within:ring-accent-orange-dark transition-all duration-200">
        <input
          type="text"
          placeholder="Buscar ofertas, tiendas..."
          value={searchTerm}
          onChange={onSearchChange}
          onFocus={() => setShowSuggestions(suggestions.length > 0 && searchTerm.length > 0)}
          className="flex-grow p-4 bg-transparent text-text-light dark:text-gray-100 outline-none border-none placeholder-gray-400 pl-4"
        />
      </div>

      {/* Menú de sugerencias */}
      {showSuggestions && (
        <ul className="absolute z-20 w-full mt-1 bg-white dark:bg-slate-700 border border-secondary-light dark:border-slate-600 rounded-lg shadow-lg overflow-hidden">
          <li className="px-4 py-2 text-xs text-gray-500 border-b border-secondary-light dark:border-slate-600">Tiendas sugeridas</li>
          {suggestions.map(store => (
            <li key={store}>
              <Link
                to={`/tiendas/${encodeURIComponent(store)}`}
                onClick={handleSuggestionClick}
                className="block px-4 py-3 text-text-light dark:text-gray-200 hover:bg-secondary-light dark:hover:bg-slate-600 transition-colors"
              >
                Ir a la tienda <span className="font-bold text-accent-orange-light dark:text-accent-orange-dark">{store}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
