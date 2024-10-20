// services/apiService.ts

export const fetchAllInstalaciones = async () => {
  const response = await fetch('http://127.0.0.1:3000/instalaciones');
  if (!response.ok) {
    throw new Error('Error al obtener las instalaciones');
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
