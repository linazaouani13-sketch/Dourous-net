import React from 'react';

const Logo = ({ className = "w-10 h-10" }) => {
  return (
    <img 
      src="/logo.png" 
      alt="Dourous-Net Logo" 
      className={`${className} object-contain`}
    />
  );
};

export default Logo;
