import React, { useState, useEffect } from 'react';
import InstallationCard from './InstallationCard';  // Asegúrate de que la ruta es correcta

const Main = () => {
  const [instalaciones, setInstalaciones] = useState([]);  // Estado para almacenar las instalaciones
  const [loading, setLoading] = useState(true);  // Estado para el loading
  const [error, setError] = useState(null);  // Estado para manejar errores

  // Llamada a la API usando useEffect
  useEffect(() => {
    const fetchInstalaciones = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/instalaciones');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        setInstalaciones(data);  // Guardamos los datos en el estado
        setLoading(false);  // Dejamos de mostrar el loading
      } catch (error) {
        setError(error.message);  // Si hay un error, lo mostramos
        setLoading(false);
      }
    };

    fetchInstalaciones();  // Llamamos a la función para obtener los datos
  }, []);  // El array vacío asegura que la llamada se haga solo al montar el componente

  // Si hay un error, lo mostramos
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Mientras los datos se cargan
  if (loading) {
    return <p>Cargando instalaciones...</p>;
  }

  return (
    <main className="h-full bg-[#F8F7F3] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {instalaciones.map((instalacion) => (
        <InstallationCard
          key={instalacion.id}
          nombre={instalacion.nombre}
          descripcion={instalacion.descripcion}
          ubicacion={instalacion.ubicacion}
          disponible_desde={new Date(instalacion.disponible_desde).toLocaleString()}  // Formato de fecha legible
          disponible_hasta={new Date(instalacion.disponible_hasta).toLocaleString()}  // Formato de fecha legible
          imagen={instalacion.imagen}
        />
      ))}
    </main>
  );
};

export default Main;
