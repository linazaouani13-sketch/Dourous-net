import React from 'react';
import { BookOpen, Star, DollarSign } from 'lucide-react';

const TeacherCard = ({ teacher, onBook }) => {
  return (
    <div className="bg-white dark:bg-[#2d2d2d] rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition-all group">
      <div>
        <div className="flex items-center gap-5 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center font-black text-3xl uppercase group-hover:rotate-6 transition-transform">
            {teacher.nom.charAt(0)}
          </div>
          <div>
            <h3 className="font-black text-xl text-gray-900 dark:text-[#e5e5e5] tracking-tight">{teacher.nom}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border border-primary-100 dark:border-primary-800">
                {teacher.specialite}
              </span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star size={12} fill="currentColor" />
                <span className="text-[10px] font-black">4.9</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium">
            Expert certifié avec plus de 10 ans d'expérience. Accompagnement pédagogique sur mesure pour tous les niveaux.
          </p>
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-bold">
            <DollarSign size={18} className="text-green-600" />
            <span className="text-lg">25.00€ / heure</span>
          </div>
        </div>
      </div>

      <button
        onClick={onBook}
        className="w-full py-4 bg-primary-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 dark:shadow-none active:scale-95 flex items-center justify-center gap-2"
      >
        <BookOpen size={18} />
        Réserver une séance
      </button>
    </div>
  );
};

export default TeacherCard;
