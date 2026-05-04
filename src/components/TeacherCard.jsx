import React from 'react';
import { Heart, Star } from 'lucide-react';

const subjectColors = {
  'Mathematics': { bg: '#e8f0ff', color: '#0058be' },
  'Physics': { bg: '#e8f0ff', color: '#0058be' },
  'Spanish Literature': { bg: '#fff8f4', color: '#924700' },
  'Computer Science': { bg: '#e6fff4', color: '#006c49' },
  'Chemistry': { bg: '#e6fff4', color: '#006c49' },
  'Biology': { bg: '#e6fff4', color: '#006c49' },
  'English': { bg: '#fff8f4', color: '#924700' },
  'History': { bg: '#fff8f4', color: '#924700' },
};

const getSubjectStyle = (specialite) => {
  return subjectColors[specialite] || { bg: '#e8f0ff', color: '#0058be' };
};

const TeacherCard = ({ teacher, onBook, isFavorite, onToggleFavorite }) => {
  const subjectStyle = getSubjectStyle(teacher.specialite);

  return (
    <div className="card" style={{ padding: '20px' }}>
      {/* Header row: avatar + info + price */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        marginBottom: '12px',
      }}>
        {/* Avatar */}
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          flexShrink: 0,
          backgroundColor: 'var(--color-surface-container)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid var(--color-outline-variant)',
        }}>
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${teacher.nom}&backgroundColor=f2f3fd&textColor=424754`}
            alt={teacher.nom}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Name + Subject */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--color-on-surface)',
            lineHeight: 1.3,
            marginBottom: '4px',
          }}>
            {teacher.nom}
          </h4>
          <span className="tag" style={{
            backgroundColor: subjectStyle.bg,
            color: subjectStyle.color,
            fontSize: '9px',
            padding: '3px 10px',
          }}>
            {teacher.specialite}
          </span>
        </div>

        {/* Price */}
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <span style={{
            fontSize: '20px',
            fontWeight: 700,
            color: 'var(--color-on-surface)',
          }}>
            ${teacher.tarif_horaire || 45}
          </span>
          <p style={{
            fontSize: '10px',
            color: 'var(--color-outline)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            PER HOUR
          </p>
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontSize: '13px',
        lineHeight: 1.5,
        color: 'var(--color-on-surface-variant)',
        marginBottom: '16px',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {teacher.bio || `Specializing in ${teacher.specialite} with years of experience in personalized teaching...`}
      </p>

      {/* Action Row */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <button
          onClick={onBook}
          className="btn-primary"
          style={{
            flex: 1,
            padding: '10px 20px',
            fontSize: '13px',
          }}
        >
          Book Session
        </button>
        <button 
          onClick={onToggleFavorite}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-full)',
            border: isFavorite ? '1px solid var(--color-primary-200)' : '1px solid var(--color-outline-variant)',
            backgroundColor: isFavorite ? 'var(--color-primary-50)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: isFavorite ? 'var(--color-primary-600)' : 'var(--color-outline)',
            transition: 'all 0.2s',
            flexShrink: 0,
          }}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>
  );
};

export default TeacherCard;
