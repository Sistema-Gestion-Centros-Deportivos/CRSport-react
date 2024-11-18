import React, { useState } from 'react';
import { subirImagen, crearInstalacion } from '../services/adminApiService';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setMessage(null); // Limpia mensajes anteriores
      setError(null); // Limpia errores anteriores
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      setError('Debes seleccionar una imagen antes de subirla.');
      return;
    }

    setLoading(true);
    try {
      const response = await subirImagen(selectedImage); // Llamada a la API
      setFormData({ ...formData, imagen_url: response.imageUrl });
      setMessage('Imagen subida exitosamente.');
      setError(null);
    } catch (error: any) {
      setError(error.message || 'Error al subir la imagen.');
      setMessage(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica si la imagen se ha subido antes de crear la instalación
    if (!formData.imagen_url) {
      setError('Debes subir una imagen antes de crear la instalación.');
      return;
    }

    setLoading(true);

    try {
      await crearInstalacion(formData); // Llamada a la API
      setMessage('Instalación creada exitosamente.');
      setError(null);
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
    } catch (error: any) {
      setError(error.message || 'Error al crear la instalación.');
      setMessage(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Crear Nueva Instalación</h2>

        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Ubicación</label>
            <input
              type="text"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Disponible Desde</label>
            <input
              type="datetime-local"
              name="disponible_desde"
              value={formData.disponible_desde}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Disponible Hasta</label>
            <input
              type="datetime-local"
              name="disponible_hasta"
              value={formData.disponible_hasta}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Tipo de Instalación</label>
            <select
              name="tipo_instalacion"
              value={formData.tipo_instalacion}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
            >
              <option value="gratuita">Gratuita</option>
              <option value="premium">Premium</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Valor</label>
            <input
              type="number"
              name="valor"
              value={formData.valor}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
              required
              min="0"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Imagen</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
            <button
              type="button"
              onClick={handleImageUpload}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Subiendo Imagen...' : 'Subir Imagen'}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-lg mt-4 hover:bg-green-600"
            disabled={loading}
          >
            {loading ? 'Creando Instalación...' : 'Crear Instalación'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateInstallation;
