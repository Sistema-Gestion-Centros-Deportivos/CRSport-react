import React, { useState } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import FilterBar from './components/FilterBar';
import { fetchFilteredInstalaciones } from './services/apiService';  // Importamos la función del servicio

const App = () => {
  const [instalaciones, setInstalaciones] = useState([]);
  const [selectedActividad, setSelectedActividad] = useState<number | null>(null);

  const handleFilterSelect = async (actividadId: number) => {
    setSelectedActividad(actividadId);
    try {
      const data = await fetchFilteredInstalaciones(actividadId);  // Llamamos a la función desde el servicio
      setInstalaciones(data);
    } catch (error) {
      console.error('Error al filtrar las instalaciones:', error);
    }
  };

  return (
    <div className="h-screen px-10 bg-[#F8F7F3]">
      {/* Componente Header */}
      <Header />

      {/* Componente FilterBar */}
      <FilterBar onFilterSelect={handleFilterSelect} />

      {/* Contenedor para el contenido principal */}
      <div className="flex-grow pb-10 bg-[#F8F7F3]">
        {/* Aquí irá el contenido principal */}
        <Main instalaciones={instalaciones} />
      </div>

      {/* Contenedor para el pie de página */}
      <footer className="h-[300px] w-full bg-red-500">
        {/* Contenido vacío del pie de página */}
      </footer>
    </div>
  );
};

export default App;