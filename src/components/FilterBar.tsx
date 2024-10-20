import React, { useState } from 'react';

interface FilterBarProps {
  onFilterSelect: (actividadId: number | null) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterSelect }) => {
  // Definimos las actividades asociadas
  const actividades = [
    { id: null, nombre: 'Todos' },  // Filtro para mostrar todas las instalaciones
    { id: 1, nombre: 'Fútbol' },
    { id: 2, nombre: 'Tenis' },
    { id: 3, nombre: 'Básquetbol' },
    { id: 4, nombre: 'Voleibol' },
    { id: 5, nombre: 'Natación' }
  ];

  const [selectedFilter, setSelectedFilter] = useState<number | null>(null);

  const handleFilterClick = (actividadId: number | null) => {
    setSelectedFilter(actividadId);
    onFilterSelect(actividadId);  // Llamamos a la función pasada por props para actualizar el filtro
  };

  return (
    <div className="flex space-x-4 p-4 bg-gray-100 rounded-lg">
      {actividades.map((actividad) => (
        <button
          key={actividad.id !== null ? actividad.id : 'todos'} // Key especial para "Todos"
          className={`px-4 py-2 rounded ${selectedFilter === actividad.id ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
          onClick={() => handleFilterClick(actividad.id)}
        >
          {actividad.nombre}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
