import React from 'react';
import Logo from './Logo';
import UserOptions from './UserOptions';
import MiddleSection from './MiddleSection'; // MiddleSection contiene SearchBar

interface HeaderProps {
  onSearch: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header className="h-20 w-full bg-[#F8F7F3] flex items-center">
      <div className="w-[350px] h-[80px] bg-[#F8F7F3] flex items-center">
        <Logo />
      </div>
      <MiddleSection onSearch={onSearch} />  {/* Pasamos la prop a MiddleSection */}
      <div className="w-[350px] h-[80px] bg-[#F8F7F3]">
        <UserOptions />
      </div>
    </header>
  );
};

export default Header;
