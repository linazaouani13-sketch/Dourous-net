import React from 'react';
import { FileText, Clock } from 'lucide-react';
import { format } from 'date-fns';

const SessionCard = ({ session }) => {
  const date = new Date(session.date_seance);
  const month = format(date, 'MMM').toUpperCase();
  const day = format(date, 'dd');
  const time = format(date, 'hh:mm a');

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--color-outline-variant)',
      backgroundColor: 'var(--color-surface-container-lowest)',
      transition: 'box-shadow 0.2s',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
    onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
    >
      {/* Date Badge */}
      <div style={{
        width: '48px',
        height: '56px',
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--color-primary-50)',
        border: '1px solid var(--color-primary-100)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <span style={{
          fontSize: '10px',
          fontWeight: 700,
          color: 'var(--color-primary-600)',
          letterSpacing: '0.05em',
        }}>
          {month}
        </span>
        <span style={{
          fontSize: '20px',
          fontWeight: 700,
          color: 'var(--color-on-surface)',
          lineHeight: 1,
        }}>
          {day}
        </span>
      </div>

      {/* Session Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4 style={{
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--color-on-surface)',
          marginBottom: '2px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {session.professeurs?.specialite || "General Support"}
        </h4>
        <p style={{
          fontSize: '12px',
          color: 'var(--color-on-surface-variant)',
          marginBottom: '2px',
        }}>
          {session.professeurs?.nom} • {time}
        </p>
      </div>

      {/* Homework indicator */}
      {session.devoir_url && (
        <a
          href={session.devoir_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-tertiary-50)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-tertiary-600)',
            flexShrink: 0,
          }}
          title="View homework"
        >
          <FileText size={16} />
        </a>
      )}
    </div>
  );
};

export default SessionCard;
