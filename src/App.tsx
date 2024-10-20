import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import FilterBar from './components/FilterBar';
import { fetchFilteredInstalaciones, fetchAllInstalaciones } from './services/apiService';  // Agregamos fetchAllInstalaciones

const App = () => {
  const [filteredInstalaciones, setFilteredInstalaciones] = useState([]);  // Instalaciones filtradas
  const [searchTerm, setSearchTerm] = useState('');  // Estado para el término de búsqueda
  const [selectedActividad, setSelectedActividad] = useState<number | null>(null);  // Estado para el filtro seleccionado

  // Al montar el componente, cargamos todas las instalaciones
  useEffect(() => {
    applyFilters('', null);  // Inicialmente, mostramos todas las instalaciones
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(term, selectedActividad);
  };

  const handleFilterSelect = (actividadId: number | null) => {
    setSelectedActividad(actividadId);
    applyFilters(searchTerm, actividadId);  // Filtramos de acuerdo al término de búsqueda y filtro de actividad
  };

  const applyFilters = async (term: string, actividadId: number | null) => {
    let installationsToFilter = [];

    // Si actividadId es null, significa que seleccionamos el filtro "Todos"
    if (actividadId === null) {
      try {
        // Obtenemos todas las instalaciones
        installationsToFilter = await fetchAllInstalaciones();
      } catch (error) {
        console.error('Error al obtener todas las instalaciones:', error);
        installationsToFilter = [];
      }
    } else {
      // Obtenemos las instalaciones filtradas por actividad
      try {
        installationsToFilter = await fetchFilteredInstalaciones(actividadId);
      } catch (error) {
        console.error('Error al obtener instalaciones filtradas por actividad:', error);
        installationsToFilter = [];
      }
    }

    // Aplicamos el término de búsqueda sobre las instalaciones obtenidas
    let filtered = installationsToFilter;

    if (term) {
      filtered = installationsToFilter.filter((instalacion) =>
        instalacion.nombre.toLowerCase().includes(term.toLowerCase()) ||
        instalacion.ubicacion.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredInstalaciones(filtered);
  };

  return (
    <div className="h-screen px-10 bg-[#F8F7F3]">
      {/* Componente Header */}
      <Header onSearch={handleSearch} />

      {/* Componente FilterBar */}
      <FilterBar onFilterSelect={handleFilterSelect} />

      {/* Contenido principal */}
      <div className="flex-grow pb-10 bg-[#F8F7F3]">
        <Main instalaciones={filteredInstalaciones} />
      </div>

      {/* Pie de página */}
      <footer className="h-[300px] w-full bg-red-500">
        {/* Contenido del pie de página */}
      </footer>
    </div>
  );
};

export default App;
