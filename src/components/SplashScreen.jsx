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
        {/* Icon */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: 'var(--radius-xl)',
          backgroundColor: 'var(--color-primary-600)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          boxShadow: '0 8px 32px rgba(0, 88, 190, 0.25)',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" fill="white"/>
          </svg>
        </div>

        <h1 style={{
          fontSize: '32px',
          fontWeight: 700,
          color: 'var(--color-on-surface)',
          letterSpacing: '-0.02em',
          marginBottom: '8px',
        }}>
          Dourous-Net
        </h1>

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
