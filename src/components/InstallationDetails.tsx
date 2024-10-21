import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchInstallationDetails, fetchInstallationActivities } from '../services/apiService';

const InstallationDetails = () => {
  const { id } = useParams(); // Capturamos el ID de la instalación desde la URL
  interface Installation {
    imagen: string;
    nombre: string;
    ubicacion: string;
    descripcion: string;
  }

  const [installation, setInstallation] = useState<Installation | null>(null); // Estado para almacenar los datos de la instalación
  const [activities, setActivities] = useState([]); // Estado para las actividades asociadas
  const [loading, setLoading] = useState(true); // Estado para manejar el loading
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  useEffect(() => {
    // Función para obtener los datos de la instalación
    const fetchDetailsAndActivities = async () => {
      try {
        const installationData = await fetchInstallationDetails(id); // Obtener detalles de la instalación
        setInstallation(installationData);

        const activitiesData = await fetchInstallationActivities(parseInt(id!)); // Obtener actividades asociadas
        setActivities(activitiesData);

        setLoading(false); // Dejamos de mostrar el loading
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message); // Si hay un error, lo mostramos
        } else {
          setError('An unknown error occurred'); // Manejo de errores desconocidos
        }
        setLoading(false);
      }
    };

    fetchDetailsAndActivities(); // Llamamos a la función para obtener los datos
  }, [id]);

  // Si hay un error, lo mostramos
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Mientras los datos se cargan
  if (loading) {
    return <p>Cargando instalación...</p>;
  }

  // Si no hay datos de instalación, mostramos un mensaje
  if (!installation) {
    return <p>No se encontraron datos de la instalación.</p>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col px-[80px]">
      {/* Contenedor para espacio */}
      <div className="h-[70px] flex items-center justify-center"></div>

      {/* Contenedor de imágenes */}
      <div className="flex flex-row h-[343px] items-center justify-center">
        <div className="flex w-full h-full gap-3 rounded-[24px] overflow-hidden">
          <div className="w-[50%] h-full bg-white">
            <img
              src={installation.imagen}
              alt={installation.nombre}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-[50%] h-full flex flex-wrap">
            <div className="w-[50%] h-[50%]">
              <img
                src={installation.imagen}
                alt={installation.nombre}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-[50%] h-[50%] pl-3">
              <img
                src={installation.imagen}
                alt={installation.nombre}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-[50%] h-[50%] pt-3">
              <img
                src={installation.imagen}
                alt={installation.nombre}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-[50%] h-[50%] pt-3 pl-3">
              <img
                src={installation.imagen}
                alt={installation.nombre}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contenedor de los filtros asociados a la instalación */}
      <div className="w-full h-auto p-4 mt-4 rounded-lg">
        <div className="flex flex-wrap gap-2">
          {activities.length > 0 ? (
            activities.map((actividad: { id: number; nombre: string }) => (
              <span
                key={actividad.id}
                className="bg-gray-800 px-3 py-1 rounded-full text-white"
              >
                {actividad.nombre}
              </span>
            ))
          ) : (
            <p>No hay actividades asociadas.</p>
          )}
        </div>
      </div>

      {/* Contenedor dividido a la mitad para los detalles y reserva */}
      <div className="flex w-full mt-10">
        {/* Columna izquierda: Nombre, ubicación y descripción */}
        <div className="w-[50%] pr-5">
          <h2 className="text-3xl font-bold">{installation.nombre}</h2>
          <p className="text-lg text-gray-600 mt-2">Ubicación: {installation.ubicacion}</p>
          <p className="text-md text-gray-500 mt-4">{installation.descripcion}</p>
        </div>

        {/* Columna derecha: Cuadro para reservar */}
        <div className="w-[50%] pl-5 bg-gray-100 rounded-lg p-5">
          <h3 className="text-xl font-semibold mb-4">Reserva esta instalación</h3>
          <form>
            {/* Selector de fecha */}
            <div className="mb-4">
              <label className="block text-gray-700">Fecha de reserva</label>
              <input
                type="date"
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Selector de bloque de tiempo */}
            <div className="mb-4">
              <label className="block text-gray-700">Bloque de tiempo</label>
              <select className="w-full mt-2 p-2 border border-gray-300 rounded-lg">
                <option value="morning">Mañana (08:00 - 12:00)</option>
                <option value="afternoon">Tarde (12:00 - 16:00)</option>
                <option value="evening">Noche (16:00 - 20:00)</option>
              </select>
            </div>

            {/* Botón de reserva */}
            <button
              type="button"
              className="w-full bg-red-500 text-white p-3 rounded-lg mt-4"
            >
              Realizar Reserva
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InstallationDetails;
