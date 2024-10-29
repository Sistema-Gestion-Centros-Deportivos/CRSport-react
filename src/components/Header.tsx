// src/components/Header.tsx

import React, { useState } from 'react';
import Logo from './Logo';
import MiddleSection from './MiddleSection';
import UserOptions from './UserOptions';
import LoginModal from './LoginModal'; // Modal de login

interface HeaderProps {
  onSearch: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // Controla la visibilidad del modal
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de autenticación
  const [userName, setUserName] = useState<string | null>(null); // Nombre del usuario logueado
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null); // Mensajes de confirmación

  // Función para abrir el modal de login/registro
  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  // Función para manejar el login o registro exitoso
  const handleLoginSuccess = (name: string, isRegister = false) => {
    setIsLoggedIn(true);
    setUserName(name);
    setIsLoginModalOpen(false);
    setConfirmationMessage(isRegister ? 'Usuario registrado exitosamente' : 'Inicio de sesión exitoso');
    
    // Eliminamos el mensaje de confirmación después de 3 segundos
    setTimeout(() => setConfirmationMessage(null), 3000);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setConfirmationMessage('Sesión cerrada exitosamente');
    setTimeout(() => setConfirmationMessage(null), 3000); // Eliminamos el mensaje después de 3 segundos
  };

  return (
    <header className="h-20 w-full bg-[#F8F7F3] flex items-center justify-between">
      <div className="w-[350px] h-[80px] bg-[#F8F7F3] flex items-center">
        <Logo />
      </div>

      <MiddleSection onSearch={onSearch} />

      <div className="w-[350px] h-[80px] flex justify-end items-center">
        <UserOptions
          onLoginClick={handleLoginClick}
          userName={userName}
          onLogout={handleLogout}
          isLoggedIn={isLoggedIn} // Pasamos el estado de logueo
        />
      </div>

      {/* Modal de Login/Registro */}
      {isLoginModalOpen && (
        <LoginModal
          onClose={handleCloseModal}
          onLoginSuccess={(name: string) => handleLoginSuccess(name, isLoginModalOpen)}
        />
      )}

      {/* Mensaje de confirmación */}
      {confirmationMessage && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg">
          {confirmationMessage}
        </div>
      )}
    </header>
  );
};

export default Header;
