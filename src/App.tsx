import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
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
  const [rol, setRol] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('localStorage:', localStorage);
    if (token) {
      const decodedToken: { userId: number; rol: string; nombre: string } = jwtDecode(token);
      setIsLoggedIn(true);
      setUserName(decodedToken.nombre);
      setRol(decodedToken.rol);
      localStorage.setItem('userName', decodedToken.nombre);
      localStorage.setItem('rol', decodedToken.rol || '');
    }
    applyFilters('', null);
  }, []);

  const handleLoginSuccess = (nombre: string) => {
    setIsLoggedIn(true);
    setUserName(nombre);
    setRol(rol);
    localStorage.setItem('userName', nombre);
    localStorage.setItem('rol', rol || '');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName(null);
    setRol(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('rol');
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
              onLoginSuccess={handleLoginSuccess}
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