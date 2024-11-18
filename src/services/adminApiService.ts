const API_BASE_URL = 'http://127.0.0.1:3000'; // Asegúrate de que esta sea tu URL base

// Obtener todas las actividades
export const obtenerActividades = async () => {
  const response = await fetch(`${API_BASE_URL}/actividades`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (!response.ok) {
    throw new Error('Error al obtener actividades');
  }
  return await response.json();
};

// Crear una nueva actividad
export const crearActividad = async (nombre: string) => {
  const response = await fetch(`${API_BASE_URL}/actividades`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre }),
  });
  if (!response.ok) {
    throw new Error('Error al crear actividad');
  }
  return await response.json();
};

// Asignar una actividad a una instalación
export const asignarActividadAInstalacion = async (instalacion_id: number, actividad_id: number) => {
  const response = await fetch(`${API_BASE_URL}/actividades/asignar`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ instalacion_id, actividad_id }),
  });
  if (!response.ok) {
    throw new Error('Error al asignar actividad a la instalación');
  }
  return await response.json();
};

// Subir imagen
export const subirImagen = async (imagen: File) => {
  const formData = new FormData();
  formData.append('imagen', imagen);

  const response = await fetch(`${API_BASE_URL}/instalaciones/subir-imagen`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Error al subir la imagen');
  }
  return await response.json();
};

// Crear una nueva instalación
export const crearInstalacion = async (formData: Record<string, any>) => {
  const response = await fetch(`${API_BASE_URL}/instalaciones`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error('Error al crear la instalación');
  }
  return await response.json();
};

// Generar bloques de tiempo por rango
export const generarBloquesPorRango = async (instalacionId: number, fechaInicio: string, fechaFin: string) => {
  const response = await fetch(`${API_BASE_URL}/bloques/generar-rango`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ instalacionId, fechaInicio, fechaFin }),
  });
  if (!response.ok) {
    throw new Error('Error al generar bloques por rango');
  }
  return await response.json();
};

// Eliminar instalación
export const eliminarInstalacion = async (instalacionId: number) => {
  const response = await fetch(`${API_BASE_URL}/instalaciones/${instalacionId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Instalación no encontrada');
    }
    throw new Error('Error al eliminar la instalación');
  }
  return await response.json();
};
