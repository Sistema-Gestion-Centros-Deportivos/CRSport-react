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
  const response = await fetch(`http://127.0.0.1:3000/bloques/disponibilidad/${instalacionId}/${fecha}`, {
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

export const crearReserva = async ({
  usuario_id,
  instalacion_bloque_semanal_id,
  fecha_reserva,
  estado_id,
}: {
  usuario_id: number;
  instalacion_bloque_semanal_id: number;
  fecha_reserva: string;
  estado_id: number;
}) => {
  const response = await fetch('http://127.0.0.1:3000/reservas', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      usuario_id,
      instalacion_bloque_semanal_id,
      fecha_reserva,
      estado_id,
    }),
  });

  if (!response.ok) {
    throw new Error('Error al crear la reserva');
  }

  return await response.json();
};

