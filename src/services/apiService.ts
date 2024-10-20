// apiService.ts
export const fetchFilteredInstalaciones = async (actividadId: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/instalaciones/actividad/${actividadId}`);
      if (!response.ok) {
        throw new Error('Error al obtener las instalaciones');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en la llamada a la API:', error);
      throw error; // Lanzamos el error para manejarlo en otro lugar si es necesario
    }
  };
  