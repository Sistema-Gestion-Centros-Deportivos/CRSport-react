import React from 'react';
import { useNavigate } from 'react-router-dom';

// Definimos los tipos de las props
interface InstallationCardProps {
  id: number;  // Necesitamos el ID de la instalación para redirigir
  nombre: string;
  descripcion: string;
  ubicacion: string;
  disponible_desde: string;
  disponible_hasta: string;
  imagen: string;
}

const InstallationCard: React.FC<InstallationCardProps> = ({ 
  id,
  nombre, 
  descripcion, 
  ubicacion, 
  disponible_desde, 
  disponible_hasta, 
  imagen 
}) => {
  const navigate = useNavigate();  // Hook para redirigir

  const handleClick = () => {
    navigate(`/instalacion/${id}`);  // Navegamos a la página de detalles de la instalación
  };

  return (
    <div onClick={handleClick} className="w-[300px] h-[385px] bg-[#F8F7F3] overflow-hidden cursor-pointer">
      {/* Contenedor de la imagen con corner radius */}
      <div className="w-[300px] h-[285px]">
        <img 
          src={imagen} 
          alt={nombre} 
          className="w-full h-full object-cover rounded-[24px]"
        />
      </div>

      {/* Información de la instalación */}
      <div className="p-2">
        <div className="font-semibold text-[7] text-[#2F2F2F]">{nombre}</div>
        <p className="text-[#8A8A8A] font-normal text-[7]">{descripcion}</p>
        <p className="text-[#8A8A8A] font-normal text-[7]">{ubicacion}</p>

        {/* Disponibilidad */}
        <div className="text-black text-sm font-semibold mt-1">
          {disponible_desde} - {disponible_hasta}
        </div>
      </div>
    </div>
  );
};

export default InstallationCard;
