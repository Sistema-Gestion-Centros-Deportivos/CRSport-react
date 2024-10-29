import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link de react-router-dom

const Logo = () => {
  return (
    <Link to="/"> {/* Envolvemos el logo en el enlace hacia "/" */}
      <div className="w-[118px] h-[64px] flex items-center justify-center bg-[#F8F7F3] cursor-pointer">
        {/* Aquí irá el logo */}
        <span className="text-[25px] font-bold">CRSport</span>
      </div>
    </Link>
  );
};

export default Logo;
