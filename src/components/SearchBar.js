// filepath: c:\Users\Ricardo Bleda\Documents\Lanzadera\cazadeals\src\components\SearchBar.js
import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="flex-grow flex items-center border border-slate-600 rounded-l-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500 transition-all duration-200">
      <input
        type="text"
        placeholder="Buscar ofertas, tiendas, categorías..."
        value={searchTerm}
        onChange={onSearchChange}
        className="flex-grow p-4 bg-slate-700 text-gray-100 outline-none border-none placeholder-gray-400 pl-4"
      />
    </div>
  );
};

export default SearchBar;