import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import InstallationDetails from './components/InstallationDetails';
import Layout from './components/Layout';  
import { fetchFilteredInstalaciones, fetchAllInstalaciones } from './services/apiService';

const App = () => {
  const [filteredInstalaciones, setFilteredInstalaciones] = useState([]);  
  const [searchTerm, setSearchTerm] = useState('');  
  const [selectedActividad, setSelectedActividad] = useState<number | null>(null);  
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Estado de autenticación
  const [userName, setUserName] = useState<string | null>(null);  // Estado del nombre de usuario

  // Al montar la app, chequeamos si existe un token en localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Aquí podrías hacer una llamada a la API para obtener los datos del usuario
      setIsLoggedIn(true);
      setUserName(localStorage.getItem('userName'));  // Supongamos que guardamos el nombre del usuario
    }
    applyFilters('', null);  // Cargamos las instalaciones inicialmente
  }, []);

  const handleLoginSuccess = (name: string) => {
    setIsLoggedIn(true);
    setUserName(name);
    localStorage.setItem('userName', name);  // Guardamos el nombre en localStorage
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userName');  // Limpiamos el localStorage
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(term, selectedActividad);
  };

  const handleFilterSelect = (actividadId: number | null) => {
    setSelectedActividad(actividadId);
    applyFilters(searchTerm, actividadId);  
  };

  const applyFilters = async (term: string, actividadId: number | null) => {
    let installationsToFilter = [];

    if (actividadId === null) {
      try {
        installationsToFilter = await fetchAllInstalaciones();
      } catch (error) {
        console.error('Error al obtener todas las instalaciones:', error);
        installationsToFilter = [];
      }
    } else {
      try {
        installationsToFilter = await fetchFilteredInstalaciones(actividadId);
      } catch (error) {
        console.error('Error al obtener instalaciones filtradas por actividad:', error);
        installationsToFilter = [];
      }
    }

    let filtered = installationsToFilter;

    if (term) {
      filtered = installationsToFilter.filter((instalacion: { nombre: string; ubicacion: string }) =>
        instalacion.nombre.toLowerCase().includes(term.toLowerCase()) ||
        instalacion.ubicacion.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredInstalaciones(filtered);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <Layout 
              onSearch={handleSearch} 
              onFilterSelect={handleFilterSelect}
              isLoggedIn={isLoggedIn}
              userName={userName}
              onLogout={handleLogout}
            />
          } 
        >
          <Route index element={<Main instalaciones={filteredInstalaciones} />} />
          <Route path="instalacion/:id" element={<InstallationDetails />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
