import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import FilterBar from './components/FilterBar';
import { fetchFilteredInstalaciones } from './services/apiService';  // Importamos la función del servicio

const App = () => {
  const [instalaciones, setInstalaciones] = useState([]);  // Todas las instalaciones
  const [filteredInstalaciones, setFilteredInstalaciones] = useState([]);  // Instalaciones filtradas
  const [searchTerm, setSearchTerm] = useState('');  // Estado para el término de búsqueda

  useEffect(() => {
    // Llamamos a la API para obtener todas las instalaciones al montar el componente
    const fetchInstalaciones = async () => {
      const data = await fetch('http://127.0.0.1:3000/instalaciones');  // Aquí tu endpoint real
      const result = await data.json();
      setInstalaciones(result);
      setFilteredInstalaciones(result);  // Inicialmente mostramos todas las instalaciones
    };
    
    fetchInstalaciones();
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term === '') {
      setFilteredInstalaciones(instalaciones);  // Si no hay búsqueda, mostramos todas
    } else {
      // Filtramos las instalaciones basándonos en el nombre o ubicación
      const filtered = instalaciones.filter((instalacion) =>
        instalacion.nombre.toLowerCase().includes(term.toLowerCase()) ||
        instalacion.ubicacion.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredInstalaciones(filtered);
    }
  };

  return (
    <div className="h-screen px-10 bg-[#F8F7F3]">
      {/* Componente Header */}
      <Header onSearch={handleSearch} />

      {/* Componente FilterBar */}
      <FilterBar onFilterSelect={() => {}} />  {/* Agrega lógica si necesitas filtros */}

      {/* Contenedor para el contenido principal */}
      <div className="flex-grow pb-10 bg-[#F8F7F3]">
        {/* Pasamos las instalaciones filtradas a Main */}
        <Main instalaciones={filteredInstalaciones} />
      </div>

      {/* Contenedor para el pie de página */}
      <footer className="h-[300px] w-full bg-red-500">
        {/* Contenido vacío del pie de página */}
      </footer>
    </div>
  );
};

export default App;
