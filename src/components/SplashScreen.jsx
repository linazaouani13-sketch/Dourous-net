import React, { useState, useEffect } from 'react';
import Logo from './Logo';

const SplashScreen = ({ onDismiss }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleClick = () => {
    setIsExiting(true);
    // Wait for fade-out animation before calling onDismiss
    setTimeout(() => {
      onDismiss();
    }, 800);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onDismiss, 800);
    }, 2500); // Auto-dismiss after 2.5 seconds

    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-1000 
        ${isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}
        bg-[#f8faff] dark:bg-gray-900`}
    >
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 dark:bg-blue-900/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/50 dark:bg-purple-900/20 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-1000">
        <Logo className="h-32 mb-8" />
        
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-primary-100 dark:border-gray-800 border-t-primary-600 rounded-full animate-spin mb-12" />

        <button 
          onClick={handleClick}
          className="px-8 py-3 bg-white dark:bg-gray-800 shadow-xl rounded-full text-sm font-bold text-gray-900 dark:text-white hover:scale-105 active:scale-95 transition-all border border-gray-100 dark:border-gray-700"
        >
          Begin Learning Journey
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;
