import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import TeacherCard from '../components/TeacherCard';
import BookingModal from '../components/BookingModal';
import Logo from '../components/Logo';
import { LogOut, Calendar, Users, FileText, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [student, setStudent] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: studentData } = await supabase
        .from('eleves')
        .select('*')
        .eq('id', user.id)
        .single();
      setStudent(studentData);

      const { data: teacherData } = await supabase
        .from('professeurs')
        .select('*');
      setTeachers(teacherData || []);

      const { data: sessionData } = await supabase
        .from('seances')
        .select(`
          *,
          professeurs (nom, specialite)
        `)
        .eq('eleve_id', user.id)
        .order('date_heure', { ascending: false });
      setSessions(sessionData || []);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user.id]);

  const handleBookingSuccess = () => {
    setSelectedTeacher(null);
    fetchData();
    toast.success('Séance réservée avec succès !');
  };

  if (loading && teachers.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Tableau de bord</h1>
          <p className="text-slate-500 dark:text-slate-400">Bienvenue dans votre espace d'apprentissage, {student?.full_name}.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Teachers List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Users size={20} className="text-primary-600" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Professeurs disponibles</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {teachers.map(teacher => (
                <TeacherCard 
                  key={teacher.id} 
                  teacher={teacher} 
                  onBook={setSelectedTeacher} 
                />
              ))}
              {teachers.length === 0 && (
                <div className="col-span-full py-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                  <p className="text-slate-400">Aucun professeur disponible pour le moment.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: Upcoming Sessions */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={20} className="text-primary-600" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Mes prochaines séances</h2>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {sessions.length > 0 ? sessions.map(session => (
                  <div key={session.id} className="p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-bold text-slate-900 dark:text-white">{session.professeurs?.nom}</div>
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                        session.statut === 'reservee' ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' : 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                      }`}>
                        {session.statut}
                      </span>
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                      <Calendar size={14} />
                      {format(new Date(session.date_heure), "d MMMM yyyy 'à' HH:mm", { locale: fr })}
                    </div>
                    <div className="flex items-center justify-between">
                      <a 
                        href={session.devoir_url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-primary-600 dark:text-primary-400 text-xs font-bold flex items-center gap-1 hover:underline"
                      >
                        <FileText size={14} />
                        Voir mon devoir
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                )) : (
                  <div className="p-8 text-center text-slate-400 italic text-sm">
                    Pas encore de séances réservées.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      {selectedTeacher && (
        <BookingModal 
          teacher={selectedTeacher} 
          onClose={() => setSelectedTeacher(null)} 
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
};

export default Dashboard;
