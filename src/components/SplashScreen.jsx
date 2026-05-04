import React, { useState, useEffect } from 'react';
import Logo from './Logo';

const SplashScreen = ({ onDismiss }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleClick = () => {
    setIsExiting(true);
    setTimeout(() => onDismiss(), 600);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onDismiss, 600);
    }, 2200);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-surface)',
        cursor: 'pointer',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'scale(1.05)' : 'scale(1)',
      }}
    >
      {/* Background accents */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(0,88,190,0.06) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '-10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(0,108,73,0.06) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />

      <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <Logo 
          fontSize="48px" 
          imgHeight="80px"
          color="var(--color-on-surface)" 
          className="animate-bounce" 
          center={true}
          style={{ marginBottom: '24px' }} 
        />

        <p style={{
          fontSize: '14px',
          color: 'var(--color-outline)',
          fontWeight: 500,
        }}>
          Learning Portal
        </p>

        {/* Spinner */}
        <div style={{
          width: '32px',
          height: '32px',
          border: '3px solid var(--color-outline-variant)',
          borderTopColor: 'var(--color-primary-600)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          marginTop: '40px',
        }} />
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
