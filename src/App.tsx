import React from 'react';
import Header from './components/Header';
import Main from './components/Main';

const App = () => {
  return (
    <div className="h-screen px-10 bg-[#F8F7F3]">
      {/* Componente Header */}
      <Header />

      {/* Contenedor para los filtros */}
      <div className="h-[78px] w-full bg-[#F8F7F3]">
        {/* Contenido vacío para los filtros */}
      </div>

      {/* Contenido principal vacío */}
      <div className="h-[500px] bg-[#F8F7F3]">
        {/* Aquí irá el contenido principal */}
      <Main />
      </div>

      {/* Contenedor para el pie de página */}
      <footer className="h-[300px] w-full bg-red-500">
        {/* Contenido vacío del pie de página */}
      </footer>
    </div>
  );
};

export default App;
  