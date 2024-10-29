import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"; // Importación por defecto para jwt-decode
import Main from './components/Main';
import InstallationDetails from './components/InstallationDetails';
import Layout from './components/Layout';  
import { fetchFilteredInstalaciones, fetchAllInstalaciones } from './services/apiService';

const App = () => {
  const [filteredInstalaciones, setFilteredInstalaciones] = useState([]);  
  const [searchTerm, setSearchTerm] = useState('');  
  const [selectedActividad, setSelectedActividad] = useState<number | null>(null);  
  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  const [userName, setUserName] = useState<string | null>(null);

  // Decodificar el token JWT para obtener el nombre de usuario
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Decodifica el token para extraer el nombre de usuario
      const decodedToken: { userId: number; rol: string; nombre: string } = jwtDecode(token);
      setIsLoggedIn(true);
      setUserName(decodedToken.nombre); // Establece el nombre del usuario
      localStorage.setItem('userName', decodedToken.nombre); // Guarda el nombre en localStorage
    }
    applyFilters('', null); 
  }, []);


  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userName');  
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
