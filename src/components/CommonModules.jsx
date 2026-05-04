import React from 'react';

const commonModulesData = [
  { name: 'Mathematics', icon: '📐', color: '#E3F2FD' },
  { name: 'Physics', icon: '⚛️', color: '#F3E5F5' },
  { name: 'Arabic', icon: '🕌', color: '#E8F5E9' },
  { name: 'French', icon: '🇫🇷', color: '#FFF3E0' },
  { name: 'English', icon: '🇬🇧', color: '#E1F5FE' },
  { name: 'Science', icon: '🧪', color: '#FCE4EC' },
];

const CommonModules = ({ title = "Common Modules", showTitle = true }) => {
  return (
    <div style={{ marginBottom: '32px', width: '100%' }}>
      {showTitle && (
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '16px' }}>
          {title}
        </h3>
      )}
      <div 
        className="custom-scrollbar"
        style={{ 
          display: 'flex', 
          gap: '12px', 
          overflowX: 'auto', 
          paddingBottom: '12px',
          paddingLeft: '4px', // Prevent clipping of shadows
          paddingTop: '4px',
        }}
      >
        <style>{`
          .custom-scrollbar::-webkit-scrollbar { height: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--color-outline-variant); border-radius: 10px; }
        `}</style>
        {commonModulesData.map((module) => (
          <div 
            key={module.name} 
            className="card-static"
            style={{
              minWidth: '140px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              backgroundColor: 'var(--color-surface-container-lowest)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = 'var(--color-primary-600)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--color-outline-variant)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: module.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              {module.icon}
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-on-surface)', textAlign: 'center' }}>
              {module.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommonModules;
