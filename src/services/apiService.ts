export const fetchFilteredInstalaciones = async (actividadId: number | null) => {
    try {
      const url = actividadId ? `http://127.0.0.1:3000/instalaciones/actividad/${actividadId}` : 'http://127.0.0.1:3000/instalaciones';
      const response = await fetch(url);
      
      if (response.status === 404) {
        return []; // Si es un 404, devolvemos un array vacío
      }
      
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
  