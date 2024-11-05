// Header.tsx

import React, { useState } from 'react';
import Logo from './Logo';
import MiddleSection from './MiddleSection';
import UserOptions from './UserOptions';
import LoginModal from './LoginModal';

interface HeaderProps {
  onSearch: (term: string) => void;
  isLoggedIn: boolean;
  userName: string | null;
  onLogout: () => void;
  onLoginSuccess: (name: string, token: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, isLoggedIn, userName, onLogout, onLoginSuccess }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLoginSuccess = (name: string, token: string) => {
    setConfirmationMessage('Inicio de sesión exitoso');
    setTimeout(() => setConfirmationMessage(null), 3000);
    onLoginSuccess(name); // Llama la función de éxito con el nombre y token
    setIsLoginModalOpen(false);
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
          onLogout={onLogout}
          isLoggedIn={isLoggedIn}
        />
      </div>

      {isLoginModalOpen && (
        <LoginModal
          onClose={handleCloseModal}
          onLoginSuccess={handleLoginSuccess} 
        />
      )}

      {confirmationMessage && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg">
          {confirmationMessage}
        </div>
      )}
    </header>
  );
};

export default Header;
