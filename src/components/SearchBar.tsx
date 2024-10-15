import React from 'react';

const SearchBar = () => {
  return (
    <div className="w-[520px] h-[48px] bg-gray-200 rounded-full flex items-center shadow-md px-4">
      {/* Input de búsqueda */}
      <input
        type="text"
        placeholder="Encuentra tu lugar favorito..." // Placeholder del input
        className="flex-grow bg-transparent outline-none px-4 text-gray-700"
      />

      {/* Botón de búsqueda con icono mejorado */}
      <button className="bg-[#D64550] text-white p-3 rounded-full flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4" // Tamaño del icono
          viewBox="0 0 24 24" // Tamaño del viewBox
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;