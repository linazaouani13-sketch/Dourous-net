import React from 'react';
import { useNavigate } from 'react-router-dom';

const commonModulesData = [
  { name: 'Python', icon: '🐍', color: '#FFF9C4', count: 12 },
  { name: 'Java', icon: '☕', color: '#FFE0B2', count: 8 },
  { name: 'Web Dev', icon: '💻', color: '#E8F5E9', count: 15 },
  { name: 'Data Structures', icon: '🌳', color: '#E1F5FE', count: 6 },
  { name: 'AI & ML', icon: '🤖', color: '#F3E5F5', count: 4 },
  { name: 'Networking', icon: '🌐', color: '#E0F2F1', count: 5 },
];

const CommonModules = ({ title = "Top Categories", showTitle = true }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/teachers?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div style={{ marginBottom: '60px', width: '100%' }}>
      {showTitle && (
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ 
            fontSize: '32px', 
            fontWeight: 800, 
            color: '#1a1b3a', 
            marginBottom: '12px',
            letterSpacing: '-0.02em'
          }}>
            {title}
          </h2>
          <p style={{ 
            fontSize: '14px', 
            color: 'var(--color-outline)', 
            maxWidth: '600px', 
            margin: '0 auto' 
          }}>
            Explore our curated selection of high-quality computer science courses tailored for your success.
          </p>
        </div>
      )}

      <div 
        className="custom-scrollbar"
        style={{ 
          display: 'flex', 
          gap: '20px', 
          overflowX: 'auto', 
          paddingBottom: '32px',
          paddingTop: '8px',
          justifyContent: 'center',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <style>{`
          .custom-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>
        
        {commonModulesData.map((module) => (
          <div 
            key={module.name} 
            onClick={() => handleCategoryClick(module.name)}
            style={{
              minWidth: '180px',
              padding: '32px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#f4f7fa',
              borderRadius: '16px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              border: '1px solid transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f4f7fa';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {/* White Circle for Icon */}
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              marginBottom: '20px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
            }}>
              {module.icon}
            </div>
            
            <h4 style={{ 
              fontSize: '15px', 
              fontWeight: 700, 
              color: '#1a1b3a', 
              textAlign: 'center',
              marginBottom: '6px',
              lineHeight: 1.2,
            }}>
              {module.name}
            </h4>
            
            <span style={{ 
              fontSize: '12px', 
              color: 'var(--color-outline)', 
              fontWeight: 500 
            }}>
              {module.count} Courses
            </span>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '8px', 
        marginTop: '12px' 
      }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div 
            key={i} 
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: i === 6 ? '#1a1b3a' : '#d1d5db',
              transition: 'all 0.2s',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CommonModules;

