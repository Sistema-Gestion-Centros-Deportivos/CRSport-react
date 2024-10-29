// src/components/LoginModal.tsx

import React, { useState } from 'react';
import { login, register, recuperarContraseña } from '../services/authService';

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: (name: string, isRegister: boolean) => void; // Indicamos si es registro o login
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre login y registro
  const [correo, setCorreo] = useState(''); // Estado para el correo
  const [contraseña, setContraseña] = useState(''); // Estado para la contraseña
  const [nombre, setNombre] = useState(''); // Para capturar el nombre en el registro
  const [isLoading, setIsLoading] = useState(false); // Estado para el loading
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para errores

  const toggleForm = () => {
    setIsLogin(!isLogin); // Alterna entre login y registro
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      let data;

      if (isLogin) {
        data = await login(correo, contraseña); // Llamamos al servicio de login
      } else {
        // Registro de usuario
        await register(nombre, correo, contraseña); // Llamamos al servicio de registro

        // Después de registrar, iniciamos sesión automáticamente
        data = await login(correo, contraseña); // Llamamos al servicio de login con las mismas credenciales
      }

      // Guardar el token en localStorage
      localStorage.setItem('token', data.token);

      // Llamar a la función de éxito con el nombre del usuario
      onLoginSuccess(data.nombre, !isLogin);
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecuperarContraseña = async () => {
    if (!correo) {
      setErrorMessage('Por favor, ingrese un correo para recuperar la contraseña.');
      return;
    }

    try {
      await recuperarContraseña(correo);
      alert('Correo de recuperación enviado.');
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[590px] h-auto rounded-lg p-8 shadow-lg flex flex-col justify-between relative z-50">
        <h2 className="text-2xl font-bold text-center mb-6">{isLogin ? 'Login' : 'Register'}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="w-[542px] h-[56px] mx-auto mb-4">
              <input
                type="text"
                placeholder="Nombre completo"
                className="w-full h-full p-3 border border-gray-300 rounded-lg"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
          )}

          <div className="w-[542px] h-[56px] mx-auto mb-4">
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full h-full p-3 border border-gray-300 rounded-lg"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <div className="w-[542px] h-[56px] mx-auto mb-4">
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full h-full p-3 border border-gray-300 rounded-lg"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
          </div>

          {/* Enlace de Recuperar contraseña solo en el login */}
          {isLogin && (
            <p className="text-center text-gray-500 mt-4">
              <button
                type="button"
                className="text-blue-500 underline"
                onClick={handleRecuperarContraseña}
              >
                Recuperar contraseña
              </button>
            </p>
          )}

          {errorMessage && (
            <p className="text-red-500 text-center mt-2">{errorMessage}</p>
          )}

          <div className="w-[542px] h-[56px] mx-auto">
            <button
              className="w-full h-full bg-blue-500 text-white font-semibold p-3 rounded-lg"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Cargando...' : 'Continuar'}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-gray-500">
          {isLogin ? (
            <>
              ¿No tienes una cuenta?{' '}
              <button className="text-blue-500 underline" onClick={toggleForm}>
                Regístrate
              </button>
            </>
          ) : (
            <>
              ¿Ya tienes una cuenta?{' '}
              <button className="text-blue-500 underline" onClick={toggleForm}>
                Inicia sesión
              </button>
            </>
          )}
        </p>

        <button className="absolute top-4 right-4 text-red-500 text-sm" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
