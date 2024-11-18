import React from 'react';
import InstallationCard from './InstallationCard';

interface Instalacion {
  id: number;
  nombre: string;
  descripcion: string;
  ubicacion: string;
  disponible_desde: string;
  disponible_hasta: string;
  tipo_instalacion: string;
  imagen: string;
}

interface MainProps {
  instalaciones: Instalacion[];  // Recibimos las instalaciones desde App.tsx
}

const Main: React.FC<MainProps> = ({ instalaciones }) => {
  if (!instalaciones.length) {
    return <p>No hay instalaciones disponibles para esta actividad.</p>;
  }

  return (
    <main className="h-full bg-[#F8F7F3]">
      {instalaciones.map((instalacion) => (
        <InstallationCard
          id={instalacion.id}
          key={instalacion.id}
          nombre={instalacion.nombre}
          descripcion={instalacion.descripcion}
          ubicacion={instalacion.ubicacion}
          disponible_desde={new Date(instalacion.disponible_desde).toLocaleString()}
          disponible_hasta={new Date(instalacion.disponible_hasta).toLocaleString()}
          tipo_instalacion={instalacion.tipo_instalacion}
          imagen={instalacion.imagen}
        />
      ))}
    </main>
  );
};

export default Main;