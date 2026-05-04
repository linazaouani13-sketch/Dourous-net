const Logo = ({ 
  className = "", 
  hideText = false, 
  fontSize = "18px", 
  color = "var(--color-on-surface)", 
  imgHeight = "40px",
  center = false,
  ...props 
}) => {
  return (
    <div 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: center ? 'center' : 'flex-start',
        gap: '12px', 
        ...props.style 
      }} 
      className={className} 
      {...props}
    >
      <img 
        src="/logo.png" 
        alt="Dourous-Net Logo" 
        style={{ height: imgHeight, width: 'auto', objectFit: 'contain' }} 
      />
      {!hideText && (
        <span style={{ 
          fontSize: fontSize, 
          fontWeight: 700, 
          color: color,
          letterSpacing: '-0.02em',
          lineHeight: 1
        }}>
          Dourous-Net
        </span>
      )}
    </div>
  );
};

export default Logo;
