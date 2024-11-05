// src/components/AdminPanel.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminPanelProps {
  userName: string | null;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ userName, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Llama a la función de logout proporcionada por App
    navigate('/'); // Redirige a la página de inicio tras cerrar sesión
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Panel de Administrador</h1>
      {userName && (
        <p className="text-lg text-gray-700 mb-6">Bienvenido, {userName}</p>
      )}
      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default AdminPanel;
