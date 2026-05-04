import React from 'react';
import { BookOpen, ChevronRight, Video, FileText } from 'lucide-react';
import { format, isToday, isTomorrow } from 'date-fns';

const SessionCard = ({ session }) => {
  const date = new Date(session.date_seance);
  
  let dateLabel = format(date, 'MMM dd');
  if (isToday(date)) dateLabel = 'Today';
  else if (isTomorrow(date)) dateLabel = 'Tomorrow';

  const timeRange = format(date, 'HH:mm') + ' - ' + format(new Date(date.getTime() + 60 * 60 * 1000), 'HH:mm');
  const subject = session.professeurs?.specialite || "Lesson";
  const isVideo = true; // Defaulting for visual variety

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '12px 16px',
      borderRadius: 'var(--radius-xl)',
      backgroundColor: 'var(--color-surface-container-lowest)',
      border: '1px solid var(--color-outline-variant)',
      cursor: 'pointer',
      transition: 'all 0.2s',
    }}
    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-primary-300)'}
    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-outline-variant)'}
    >
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '12px',
        backgroundColor: isVideo ? '#e0f2fe' : '#ecfdf5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: isVideo ? '#0284c7' : '#059669',
      }}>
        {isVideo ? <Video size={20} /> : <BookOpen size={20} />}
      </div>

      <div style={{ flex: 1 }}>
        <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-on-surface)' }}>
          {subject}
        </h4>
        <p style={{ fontSize: '12px', color: 'var(--color-outline)' }}>
          {dateLabel} • {timeRange}
        </p>
      </div>

      <ChevronRight size={18} style={{ color: 'var(--color-outline)' }} />
    </div>
  );
};

export default SessionCard;
