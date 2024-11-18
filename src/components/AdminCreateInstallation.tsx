import React, { useState, useEffect } from 'react';
import { 
  subirImagen, 
  crearInstalacion, 
  obtenerActividades, 
  crearActividad, 
  asignarActividadAInstalacion 
} from '../services/adminApiService';

const AdminCreateInstallation = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    ubicacion: '',
    disponible_desde: '',
    disponible_hasta: '',
    tipo_instalacion: 'gratuita', // Por defecto
    valor: 0,
    imagen_url: '',
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [actividades, setActividades] = useState([]);
  const [newActivityName, setNewActivityName] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const [installationId, setInstallationId] = useState<number | null>(null);

  // Cargar actividades al montar el componente
  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const activities = await obtenerActividades();
        setActividades(activities);
      } catch (err) {
        setError('Error al cargar actividades.');
      }
    };

    fetchActividades();
  }, []);

  const handleImageUpload = async () => {
    if (!selectedImage) {
      setError('Debes seleccionar una imagen antes de subirla.');
      return;
    }

    setLoading(true);
    try {
      const response = await subirImagen(selectedImage);
      setFormData({ ...formData, imagen_url: response.imageUrl });
      setMessage('Imagen subida exitosamente.');
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al subir la imagen.');
      setMessage(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInstallation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await crearInstalacion(formData);
      setMessage('Instalación creada exitosamente.');
      setError(null);
      setInstallationId(response.id); // Guardamos el ID de la instalación creada
      setFormData({
        nombre: '',
        descripcion: '',
        ubicacion: '',
        disponible_desde: '',
        disponible_hasta: '',
        tipo_instalacion: 'gratuita',
        valor: 0,
        imagen_url: '',
      });
      setSelectedImage(null);
    } catch (err: any) {
      setError(err.message || 'Error al crear la instalación.');
      setMessage(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateActivity = async () => {
    if (!newActivityName.trim()) {
      setError('El nombre de la actividad no puede estar vacío.');
      return;
    }

    try {
      const response = await crearActividad(newActivityName);
      setActividades((prev) => [...prev, response]); // Agregar la nueva actividad a la lista
      setMessage('Actividad creada exitosamente.');
      setNewActivityName('');
    } catch (err: any) {
      setError(err.message || 'Error al crear la actividad.');
    }
  };

  const handleAssignActivity = async () => {
    if (!installationId || !selectedActivity) {
      setError('Debes seleccionar una instalación y una actividad.');
      return;
    }

    try {
      await asignarActividadAInstalacion(installationId, selectedActivity);
      setMessage('Actividad asignada a la instalación correctamente.');
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al asignar la actividad.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-5">Administrar Instalaciones</h1>

      {/* Formulario para crear una instalación */}
      <form onSubmit={handleCreateInstallation} className="bg-white shadow-md rounded p-5 w-1/2">
        <h2 className="text-xl font-bold mb-4">Crear Nueva Instalación</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Descripción</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Ubicación</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.ubicacion}
            onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Disponible Desde</label>
          <input
            type="datetime-local"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.disponible_desde}
            onChange={(e) => setFormData({ ...formData, disponible_desde: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Disponible Hasta</label>
          <input
            type="datetime-local"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.disponible_hasta}
            onChange={(e) => setFormData({ ...formData, disponible_hasta: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Tipo de Instalación</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.tipo_instalacion}
            onChange={(e) => setFormData({ ...formData, tipo_instalacion: e.target.value })}
          >
            <option value="gratuita">Gratuita</option>
            <option value="premium">Premium</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Valor</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.valor}
            onChange={(e) => setFormData({ ...formData, valor: Number(e.target.value) })}
          />
        </div>

        {/* Subir imagen */}
        <div className="mb-4">
          <label className="block text-gray-700">Imagen</label>
          <input
            type="file"
            className="w-full"
            onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
          />
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            onClick={handleImageUpload}
          >
            Subir Imagen
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          Crear Instalación
        </button>
      </form>

      {/* Asignar Actividad */}
      <div className="bg-white shadow-md rounded p-5 w-1/2 mt-10">
        <h2 className="text-xl font-bold mb-4">Asignar Actividad a Instalación</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Selecciona una Actividad</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={selectedActivity || ''}
            onChange={(e) => setSelectedActivity(Number(e.target.value))}
          >
            <option value="">Seleccionar...</option>
            {actividades.map((actividad: any) => (
              <option key={actividad.id} value={actividad.id}>
                {actividad.nombre}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded"
          onClick={handleAssignActivity}
          disabled={!installationId || !selectedActivity}
        >
          Asignar Actividad
        </button>
      </div>
      

      {message && <p className="text-green-500 mt-4">{message}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default AdminCreateInstallation;
