import React from 'react';
import SearchBar from './SearchBar'; // Importamos el componente SearchBar

const MiddleSection = () => {
  return (
    <div className="flex-grow h-[80px] flex items-center justify-center">
      {/* Componente de la barra de búsqueda en el centro */}
      <SearchBar />
    </div>
  );
};

export default MiddleSection;
