import React from 'react';

const Logo = ({ className = "" }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }} className={className}>
      <img 
        src="/logo.png" 
        alt="Dourous-Net Logo" 
        style={{ height: '40px', width: 'auto', objectFit: 'contain' }} 
      />
    </div>
  );
};

export default Logo;
