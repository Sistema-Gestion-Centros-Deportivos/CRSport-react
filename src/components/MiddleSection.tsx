import React from 'react';
import SearchBar from './SearchBar'; // Importamos el componente SearchBar

interface MiddleSectionProps {
  onSearch: (term: string) => void;
}

const MiddleSection: React.FC<MiddleSectionProps> = ({ onSearch }) => {
  return (
    <div className="flex-grow h-[80px] flex items-center justify-center">
      {/* Componente de la barra de búsqueda en el centro */}
      <SearchBar onSearch={onSearch} />
    </div>
  );
};

export default MiddleSection;
