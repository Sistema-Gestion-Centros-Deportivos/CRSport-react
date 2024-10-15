import React from 'react';
import InstallationCard from './InstallationCard';
import colocolo from '../assets/Estadio_Monumental_2009.jpg';
import unionespanola from '../assets/estadiosantalaura.jpg';

const Main = () => {
  // Lista de instalaciones ficticias
  const instalaciones = [
    {
      nombre: "Estadio Monumental David Arellano",
      descripcion: "Estadio de Colo-Colo",
      ubicacion: "Macul, Chile",
      disponible_desde: "10:00 AM",
      disponible_hasta: "08:00 PM",
      imagen: colocolo,
    },
    {
      nombre: "Estadio Santa Laura",
      descripcion: "Estadio de Unión Española",
      ubicacion: "Parque Central, Ciudad",
      disponible_desde: "09:00 AM",
      disponible_hasta: "07:00 PM",
      imagen: unionespanola,
    },
    {
      nombre: "Piscina Olímpica",
      descripcion: "Piscina con carriles para entrenamiento.",
      ubicacion: "Complejo Acuático, Ciudad",
      disponible_desde: "06:00 AM",
      disponible_hasta: "06:00 PM",
      imagen: "https://via.placeholder.com/300x285",  // Imagen ficticia
    },
  ];

  return (
    <main className="h-full bg-[#F8F7F3] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 p-4">
      {instalaciones.map((instalacion, index) => (
        <InstallationCard
          key={index}
          nombre={instalacion.nombre}
          descripcion={instalacion.descripcion}
          ubicacion={instalacion.ubicacion}
          disponible_desde={instalacion.disponible_desde}
          disponible_hasta={instalacion.disponible_hasta}
          imagen={instalacion.imagen}
        />
      ))}
    </main>
  );
};

export default Main;
