// src/services/authService.ts

export const login = async (correo: string, contraseña: string) => {
    const response = await fetch('http://127.0.0.1:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*',
      },
      body: JSON.stringify({
        correo,
        contraseña,
      }),
    });
  
    if (!response.ok) {
      throw new Error('Error al iniciar sesión');
    }
  
    const data = await response.json();
    return data; // Este será el token o datos del usuario
  };
  
  export const register = async (nombre: string, correo: string, contraseña: string) => {
    const response = await fetch('http://127.0.0.1:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*',
      },
      body: JSON.stringify({
        nombre,
        correo,
        contraseña,
      }),
    });
  
    if (!response.ok) {
      throw new Error('Error al registrarse');
    }
  
    const data = await response.json();
    return data; // Este será el token o datos del usuario
  };
  
  export const recuperarContraseña = async (correo: string) => {
    const response = await fetch('http://127.0.0.1:3000/auth/recuperar-contra', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        correo,
      }),
    });
  
    if (!response.ok) {
      throw new Error('Error al recuperar contraseña');
    }
  
    const data = await response.json();
    return data; // Este será el mensaje de recuperación
  };
  