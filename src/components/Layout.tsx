// src/components/Layout.tsx

import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Header from './Header';
import FilterBar from './FilterBar';

interface LayoutProps {
  onSearch: (term: string) => void;
  onFilterSelect: (actividadId: number | null) => void;
  isLoggedIn: boolean;
  userName: string | null;
  onLogout: () => void;
  onLoginSuccess: (name: string, token: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ onSearch, onFilterSelect, isLoggedIn, userName, onLogout, onLoginSuccess }) => {
  const location = useLocation();
  const rol = localStorage.getItem('rol'); // Obtiene el rol desde el localStorage

  return (
    <div>
      <div className="flex flex-col min-h-screen px-10 bg-[#F8F7F3]">
        <Header onSearch={onSearch} isLoggedIn={isLoggedIn} userName={userName} onLogout={onLogout} onLoginSuccess={onLoginSuccess} />

        {/* Mostrar barra de filtros solo en la página principal */}
        {location.pathname === '/' && <FilterBar onFilterSelect={onFilterSelect} />}

        {/* Mostrar enlace de administración si el usuario es admin */}
        {rol === 'administrador' && (
          <div className="w-full py-4 bg-gray-100 text-center">
            <Link
              to="/admin"
              className="text-blue-500 font-bold hover:underline"
            >
              Administrar Instalaciones
            </Link>
          </div>
        )}

        <div className="flex-grow mb-10">
          <Outlet />
        </div>
      </div>

      <footer className="h-[300px] w-full bg-red-500">
        <div className="max-w-screen-xl mx-auto flex items-center justify-center h-full px-10">
          <p className="text-white">© 2024 Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
