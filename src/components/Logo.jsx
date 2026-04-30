import React from 'react';

const Logo = ({ className = "h-10", showText = true }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src="/logo.png" 
        alt="Dourous-Net Icon" 
        className="h-full w-auto object-contain"
      />
      {showText && (
        <span className="font-bold text-gray-900 dark:text-white tracking-tight text-xl">
          Dourous-Net
        </span>
      )}
    </div>
  );
};

export default Logo;
