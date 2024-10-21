import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import FilterBar from './FilterBar';

interface LayoutProps {
  onSearch: (term: string) => void;
  onFilterSelect: (actividadId: number | null) => void;
}

const Layout: React.FC<LayoutProps> = ({ onSearch, onFilterSelect }) => {
  const location = useLocation();

  return (
    <div>
        <div className="flex flex-col min-h-screen px-10 bg-[#F8F7F3]">
        <Header onSearch={onSearch} />

        {/* Mostrar la barra de filtros solo en la página principal */}
        {location.pathname === '/' && <FilterBar onFilterSelect={onFilterSelect} />}

        {/* El contenido principal con un margen inferior para evitar que se pegue al footer */}
        <div className="flex-grow mb-10">
            <Outlet />
        </div>

        {/* Footer sin padding pero con contenido centrado */}
        </div>
        <div>
            <footer className="h-[300px] w-full bg-red-500">  {/* Sin padding */}
            <div className="max-w-screen-xl mx-auto flex items-center justify-center h-full px-10">
            {/* Contenido del footer con padding a los lados */}
            <p className="text-white">© 2024 Todos los derechos reservados</p>
            </div>
            </footer>
        </div>
    </div>
    
    
  );
};

export default Layout;
