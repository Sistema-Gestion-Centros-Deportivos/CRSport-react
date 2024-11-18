// services/apiService.ts

export const fetchAllInstalaciones = async () => {
  const response = await fetch('http://127.0.0.1:3000/instalaciones');
  if (!response.ok) {
    throw new Error('Error al obtener todas las instalaciones');
  }
  const data = await response.json();
  return data;
};

export const fetchFilteredInstalaciones = async (actividadId: number) => {
  const response = await fetch(`http://127.0.0.1:3000/instalaciones/actividad/${actividadId}`);
  if (!response.ok) {
    throw new Error('Error al filtrar instalaciones por actividad');
  }
  const data = await response.json();
  return data;
};

export const fetchAvailableBlocks = async (instalacionId: number, fecha: string) => {
  const response = await fetch(`http://127.0.0.1:3000/bloques/instalacion/${instalacionId}/disponibilidad/${fecha}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Usamos el token almacenado
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener los bloques disponibles');
  }

  const data = await response.json();
  return data; // Devolvemos los bloques disponibles
};

// Nueva función para obtener las actividades asociadas a una instalación específica
export const fetchInstallationActivities = async (installationId: number) => {
  const response = await fetch(`http://127.0.0.1:3000/instalaciones/${installationId}/actividades`);
  if (!response.ok) {
    throw new Error('Error al obtener actividades asociadas a la instalación');
  }
  const data = await response.json();
  return data;  // Esto debe devolver un array con las actividades de la instalación
};

// Nueva función para obtener los detalles de una instalación específica
export const fetchInstallationDetails = async (id: string | undefined) => {
  const response = await fetch(`http://127.0.0.1:3000/instalaciones/${id}`);
  if (!response.ok) {
    throw new Error('Error al obtener los detalles de la instalación');
  }
  const data = await response.json();
  return data;
};

export const crearReserva = async (usuario_id: number, instalacion_bloque_periodico_id: number) => {
  try {
    const response = await fetch('http://127.0.0.1:3000/reservas', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usuario_id, instalacion_bloque_periodico_id }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al crear la reserva');
    }

    const data = await response.json();

    if (data.url && data.token) {
      // Si es premium, devolvemos la URL y token
      return { isPremium: true, paymentUrl: data.url, token: data.token };
    }

    // Si es gratuita, devolvemos el mensaje de éxito
    return { isPremium: false, reservaId: data.reservaId, message: data.message };
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    throw error;
  }
};


