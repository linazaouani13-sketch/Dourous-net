import React from 'react';
import { ChevronRight, Star } from 'lucide-react';

const TeacherCard = ({ teacher, onBook }) => {
  return (
    <div className="card-premium p-4 group">
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-5">
        <img 
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${teacher.nom}&backgroundColor=f1f5f9&textColor=64748b`} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 bg-white" 
          alt={teacher.nom}
        />
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xl border border-white/20 dark:border-white/5">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-[11px] font-bold">4.9</span>
        </div>
      </div>
      
      <div className="text-center space-y-1 mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{teacher.nom}</h3>
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">{teacher.specialite}</p>
      </div>

      <button 
        onClick={onBook}
        className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-primary-500/20 active:scale-[0.98] text-sm"
      >
        Book Session
      </button>
    </div>
  );
};

export default TeacherCard;
