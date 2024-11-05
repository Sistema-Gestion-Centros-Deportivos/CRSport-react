// src/components/UserOptions.tsx

import React, { useState, useEffect, useRef } from 'react';

interface UserOptionsProps {
  onLoginClick: () => void;
  userName?: string | null;
  onLogout: () => void;
  isLoggedIn: boolean;
}

const UserOptions: React.FC<UserOptionsProps> = ({ onLoginClick, userName, onLogout, isLoggedIn }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Alternar el menú desplegable
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Cerrar el menú al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center space-x-4 w-[350px] h-[80px] justify-end">
        <div className="text-base font-semibold text-gray-800">
          {isLoggedIn && userName ? `Hola, ${userName}` : 'Descubre, reserva y organiza!'}
        </div>
        <div className="flex items-center space-x-4">
          <div
            className="flex items-center border border-gray-300 rounded-full p-1 hover:shadow-md cursor-pointer"
            onClick={toggleDropdown}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
          {isLoggedIn ? (
            <button
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => {
                onLogout();
                setIsDropdownOpen(false); // Cerrar el menú después de cerrar sesión
              }}
            >
              Cerrar sesión
            </button>
          ) : (
            <>
              <button
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => {
                  onLoginClick();
                  setIsDropdownOpen(false); // Cerrar el menú después de abrir el modal de login
                }}
              >
                Iniciar sesión
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => {
                  onLoginClick();
                  setIsDropdownOpen(false); // Cerrar el menú después de abrir el modal de registro
                }}
              >
                Registrarse
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserOptions;
