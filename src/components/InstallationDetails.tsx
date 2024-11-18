import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchInstallationDetails, fetchInstallationActivities, fetchAvailableBlocks, crearReserva } from '../services/apiService'; // Importamos los nuevos servicios
import { getUserIdFromToken } from '../services/authService'; // Para obtener el userId del JWT

const InstallationDetails = () => {
  const { id } = useParams(); // Capturamos el ID de la instalación desde la URL
  interface Installation {
    imagen: string;
    nombre: string;
    ubicacion: string;
    descripcion: string;
    tipo_instalacion: string;
    valor: number;
  }

  const [installation, setInstallation] = useState<Installation | null>(null);
  const [activities, setActivities] = useState([]); // Actividades asociadas
  const [selectedDate, setSelectedDate] = useState(''); // Fecha seleccionada
  const [availableBlocks, setAvailableBlocks] = useState<Block[]>([]); // Bloques de tiempo disponibles
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null); // Bloque seleccionado
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null); // Mensaje de éxito o error

  interface Block {
    id: number;
    hora_inicio: string;
    hora_fin: string;
    disponible: boolean;
  }

  // Fetch para detalles y actividades
  useEffect(() => {
    const fetchDetailsAndActivities = async () => {
      try {
        const installationData = await fetchInstallationDetails(id);
        setInstallation(installationData);

        const activitiesData = await fetchInstallationActivities(parseInt(id!));
        setActivities(activitiesData);

        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Error desconocido.');
        }
        setLoading(false);
      }
    };

    fetchDetailsAndActivities();
  }, [id]);

  // Función para manejar el cambio de fecha
  const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);

    try {
      const blocks = await fetchAvailableBlocks(parseInt(id!), selectedDate);
      setAvailableBlocks(blocks);
    } catch {
      setError('Error al obtener los bloques de tiempo disponibles.');
    }
  };

  // Función para manejar la reserva
  const handleReservation = async () => {
    const userId = getUserIdFromToken(); // Obtener el userId desde el JWT
    if (!userId) {
      alert('Debes iniciar sesión para hacer una reserva');
      return;
    }

    if (!selectedBlock || !selectedDate) {
      alert('Debes seleccionar una fecha y un bloque de tiempo');
      return;
    }

    try {
      const response = await crearReserva(userId, parseInt(selectedBlock));

      if (response.isPremium) {
        // Redirigir al portal de pagos para reservas premium
        window.location.href = `${response.paymentUrl}?token_ws=${response.token}`;
      } else {
        // Mostrar mensaje de éxito para reservas gratuitas
        setMessage(response.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Error al realizar la reserva: ${error.message}`);
      } else {
        setMessage('Error desconocido al realizar la reserva.');
      }
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (loading) {
    return <p>Cargando instalación...</p>;
  }

  if (!installation) {
    return <p>No se encontraron datos de la instalación.</p>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col px-[80px]">
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

      {/* Filtros asociados */}
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

      {/* Detalles y formulario de reserva */}
      <div className="flex w-full mt-10">
        <div className="w-[50%] pr-5">
          <h2 className="text-3xl font-bold">{installation.nombre}</h2>
          <p className="text-lg text-gray-600 mt-2">Ubicación: {installation.ubicacion}</p>
          <p className="text-md text-gray-500 mt-4">{installation.descripcion}</p>
        </div>

        <div className="w-[50%] pl-5 bg-gray-100 rounded-lg p-5">
          <h3 className="text-xl font-semibold mb-4">Reserva esta instalación</h3>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Fecha de reserva</label>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Bloque de tiempo</label>
              <select
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
                value={selectedBlock || ''}
                onChange={(e) => setSelectedBlock(e.target.value)}
              >
                <option value="">Selecciona un bloque</option>
                {availableBlocks.map((block: any) => (
                  <option key={block.id} value={block.id} disabled={!block.disponible}>
                    {block.hora_inicio} - {block.hora_fin} {block.disponible ? '' : '(No disponible)'}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              className="w-full bg-red-500 text-white p-3 rounded-lg mt-4"
              onClick={handleReservation}
            >
              Realizar Reserva
            </button>

            {message && (
              <p className={`mt-4 ${message.includes('éxito') ? 'text-green-500' : 'text-red-500'}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default InstallationDetails;
