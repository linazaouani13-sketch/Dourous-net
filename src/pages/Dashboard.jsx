import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import TeacherCard from '../components/TeacherCard';
import SessionCard from '../components/SessionCard';
import BookingModal from '../components/BookingModal';
import { Users, Calendar, Loader2, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [student, setStudent] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      // Fetch student info
      const { data: studentData } = await supabase
        .from('eleves')
        .select('*')
        .eq('id', user.id)
        .single();
      setStudent(studentData);

      // Fetch teachers
      const { data: teacherData } = await supabase
        .from('professeurs')
        .select('*');
      setTeachers(teacherData || []);

      // Fetch sessions (joined with teachers)
      const { data: sessionData } = await supabase
        .from('seances')
        .select('*, professeurs(nom, specialite)')
        .eq('eleve_id', user.id)
        .order('date_heure', { ascending: false });
      setSessions(sessionData || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Erreur lors du chargement des données.');
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleBookingSuccess = () => {
    setSelectedTeacher(null);
    fetchData();
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-white dark:bg-[#1f1f1f]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
          <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Welcome Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary-600 font-bold text-sm uppercase tracking-widest">
            <Sparkles size={18} />
            <span>Votre Espace Personnel</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-[#e5e5e5] tracking-tight">
            Bienvenue, {student?.full_name || user.email.split('@')[0]}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            Prêt pour votre prochaine leçon ? Explorez nos professeurs et suivez vos progrès.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Available Teachers Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-800 pb-4">
            <Users className="text-primary-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-[#e5e5e5]">Professeurs Disponibles</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {teachers.map(teacher => (
              <TeacherCard 
                key={teacher.id} 
                teacher={teacher} 
                onBook={() => setSelectedTeacher(teacher)} 
              />
            ))}
            {teachers.length === 0 && (
              <div className="col-span-full py-20 text-center bg-gray-50 dark:bg-[#2d2d2d] rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
                <p className="text-gray-400 font-bold italic">Aucun professeur disponible pour le moment.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sessions Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-800 pb-4">
            <Calendar className="text-primary-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-[#e5e5e5]">Mes Séances</h2>
          </div>

          <div className="space-y-5">
            {sessions.map(session => (
              <SessionCard key={session.id} session={session} />
            ))}
            {sessions.length === 0 && (
              <div className="p-8 text-center bg-white dark:bg-[#1f1f1f] rounded-3xl border border-gray-100 dark:border-gray-800">
                <p className="text-gray-400 text-sm italic font-medium">Vous n'avez pas encore de séances réservées.</p>
              </div>
            )}
          </div>
        </div>
      </div>

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
