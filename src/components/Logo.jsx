import React from 'react';

const Logo = ({ className = "w-24 h-24" }) => {
  return (
    <img 
      src="/logo.png" 
      alt="Dourous-Net Logo" 
      className={`${className} object-contain`}
    />
  );
};

export default Logo;
