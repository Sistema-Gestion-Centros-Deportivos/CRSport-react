// services/adminApiService.ts

export const subirImagen = async (imagen: File) => {
    const formData = new FormData();
    formData.append('imagen', imagen);
  
    const response = await fetch('http://127.0.0.1:3000/instalaciones/subir-imagen', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Token para autenticación
      },
      body: formData,
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al subir la imagen');
    }
  
    const data = await response.json();
    return data; // Retorna { message: 'Imagen subida exitosamente', imageUrl: '...' }
  };
  
  export const crearInstalacion = async (instalacionData: any) => {
    const response = await fetch('http://127.0.0.1:3000/instalaciones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Token para autenticación
      },
      body: JSON.stringify(instalacionData),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al crear la instalación');
    }
  
    const data = await response.json();
    return data; // Retorna la instalación creada
  };
  