import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;  // Prop para manejar la búsqueda
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');  // Estado para el valor del input

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);  // Actualizamos el valor del input
  };

  const handleSearch = () => {
    onSearch(searchTerm);  // Llamamos a la función de búsqueda con el término ingresado
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {  // Si la tecla presionada es "Enter"
      handleSearch();  // Ejecutamos la búsqueda
    }
  };

  return (
    <div className="w-[520px] h-[48px] bg-gray-200 rounded-full flex items-center shadow-md px-4">
      {/* Input de búsqueda */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Encuentra tu lugar favorito..."
        className="flex-grow bg-transparent outline-none px-4 text-gray-700"
      />

      {/* Botón de búsqueda */}
      <button
        className="bg-[#D64550] text-white p-3 rounded-full flex items-center justify-center"
        onClick={handleSearch}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 24 24"
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
