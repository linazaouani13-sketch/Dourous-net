import React from 'react';
import { Calendar, FileText, ExternalLink, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const SessionCard = ({ session }) => {
  const statusColors = {
    reservee: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    terminee: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    annulee: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className="bg-white dark:bg-[#2d2d2d] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-gray-900 dark:text-[#e5e5e5]">
            Prof. {session.professeurs?.nom}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {session.professeurs?.specialite}
          </p>
        </div>
        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full ${statusColors[session.statut] || 'bg-gray-100 text-gray-600'}`}>
          {session.statut}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Calendar size={16} className="text-primary-600" />
          {format(new Date(session.date_heure), "d MMMM yyyy", { locale: fr })}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Clock size={16} className="text-primary-600" />
          {format(new Date(session.date_heure), "HH:mm")}
        </div>
      </div>

      {session.commentaire && (
        <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-4 line-clamp-2">
          "{session.commentaire}"
        </p>
      )}

      <div className="pt-4 border-t border-gray-50 dark:border-gray-800">
        <a
          href={session.devoir_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors"
        >
          <FileText size={18} />
          Voir mon devoir
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};

export default SessionCard;
