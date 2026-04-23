import React from 'react';

const TeacherCard = ({ teacher, onBook }) => {
  return (
    <div className="bg-white dark:bg-[#2d2d2d] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 flex flex-col justify-between hover:shadow-xl transition-all group">
      <div>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold text-2xl uppercase group-hover:scale-110 transition-transform">
            {teacher.nom.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-[#e5e5e5]">{teacher.nom}</h3>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border border-primary-100 dark:border-primary-800">
              {teacher.specialite}
            </span>
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
          Professeur expérimenté disponible pour des cours de soutien personnalisés et un accompagnement pédagogique complet.
        </p>
      </div>
      <div className="flex items-center justify-end pt-4 border-t border-gray-50 dark:border-gray-800">
        <button
          onClick={() => onBook(teacher)}
          className="w-full py-2.5 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-md shadow-primary-200 dark:shadow-none active:scale-95"
        >
          Réserver une séance
        </button>
      </div>
    </div>
  );
};

export default TeacherCard;
