import React from 'react';
import { Calendar, FileText, ExternalLink, Clock, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const SessionCard = ({ session }) => {
  const date = new Date(session.date_heure);
  const month = format(date, 'MMM').toUpperCase();
  const day = format(date, 'dd');

  const statusColors = {
    reservee: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    terminee: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
    annulee: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  const statusLabel = {
    reservee: 'CONTINUING',
    terminee: 'COMPLETED',
    annulee: 'CANCELLED',
  };

  return (
    <div className="flex items-center gap-4 group">
      {/* Date Badge */}
      <div className="flex flex-col items-center justify-center w-12 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800 shadow-sm group-hover:scale-105 transition-transform">
        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">{month}</span>
        <span className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{day}</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-sm font-bold truncate group-hover:text-primary-600 transition-colors">
            {session.professeurs?.specialite || "General Support"}
          </h4>
          <span className={`text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${statusColors[session.statut] || 'bg-gray-100 text-gray-600'}`}>
            {statusLabel[session.statut] || 'WAITING'}
          </span>
        </div>
        <p className="text-xs text-gray-500 truncate mb-1">Dr. {session.professeurs?.nom}</p>
        
        {session.commentaire && (
          <p className="text-xs text-gray-600 dark:text-gray-300 italic mb-2 truncate">"{session.commentaire}"</p>
        )}

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
            <Clock size={12} />
            <span>{format(date, 'HH:mm')} GMT + 1</span>
          </div>
          
          {session.devoir_url && (
            <a 
              href={session.devoir_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] font-bold text-primary-600 hover:text-primary-700 transition-colors"
            >
              <FileText size={12} /> Homework
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
