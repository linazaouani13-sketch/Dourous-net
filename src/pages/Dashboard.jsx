import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TeacherCard from '../components/TeacherCard';
import SessionCard from '../components/SessionCard';
import BookingModal from '../components/BookingModal';
import Footer from '../components/Footer';
import { 
  Users, Calendar, Loader2, Sparkles, Plus, Search, 
  LayoutDashboard, BookOpen, Settings, ChevronRight,
  Bell, CheckCircle2, Star, Clock, ArrowRight
} from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [student, setStudent] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      let { data: studentData, error: studentError } = await supabase
        .from('eleves')
        .select('*')
        .eq('id', user.id)
        .single();

      if (studentError && studentError.code === 'PGRST116') {
        const { data: newStudent, error: insertError } = await supabase
          .from('eleves')
          .insert({
            id: user.id,
            nom: user.user_metadata?.full_name || user.email.split('@')[0],
            email: user.email
          })
          .select()
          .single();

        if (!insertError) {
          studentData = newStudent;
        }
      }

      setStudent(studentData);

      const { data: teacherData } = await supabase
        .from('professeurs')
        .select('*');
      setTeachers(teacherData || []);

      const { data: sessionData } = await supabase
        .from('seances')
        .select('*, professeurs(nom, specialite)')
        .eq('eleve_id', user.id)
        .order('date_heure', { ascending: true });
      setSessions(sessionData || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950">
        <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-medium animate-pulse">Initializing Hub...</p>
      </div>
    );
  }

  const sidebarLinks = [
    { name: 'Overview', icon: <LayoutDashboard size={22} /> },
    { name: 'My Sessions', icon: <Calendar size={22} /> },
    { name: 'Browse Teachers', icon: <Users size={22} /> },
    { name: 'Resources', icon: <BookOpen size={22} /> },
    { name: 'Settings', icon: <Settings size={22} /> },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-gray-950 flex">
      
      {/* Premium Sidebar */}
      <aside className="w-80 hidden xl:flex flex-col border-r border-gray-100/50 dark:border-white/5 bg-white/50 dark:bg-black/20 backdrop-blur-3xl pt-32 pb-10 px-8 fixed h-full z-40 transition-all">
        <div className="flex-1">
          <div className="px-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Learning Hub</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Active Student</p>
            </div>
          </div>
          
          <nav className="space-y-2">
            {sidebarLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => link.path ? navigate(link.path) : setActiveTab(link.name)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] text-sm font-bold transition-all duration-300 group ${
                  activeTab === link.name
                    ? 'bg-primary-600 text-white shadow-2xl shadow-primary-600/30' 
                    : 'text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
              >
                <span className={`${activeTab === link.name ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>
                  {link.icon}
                </span>
                {link.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto px-2">

          <button 
            onClick={() => navigate('/teachers')}
            className="w-full py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-gray-900/10 dark:shadow-white/5"
          >
            <Plus size={20} />
            <span>New Booking</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 xl:ml-80 pt-40 pb-20 px-6 lg:px-12 xl:px-16">
        <div className="max-w-[1400px] mx-auto">
          
          {activeTab === 'Overview' && (
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              
              {/* Left & Middle: Activity & Marketplace (8 columns) */}
              <div className="lg:col-span-8 space-y-16">
                
                {/* Modern Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                  <div className="animate-in fade-in slide-in-from-left duration-700">
                    <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white tracking-tighter leading-[0.9]">
                      Hello, <br />
                      <span className="gradient-text">{student?.full_name?.split(' ')[0] || user.email.split('@')[0]}</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-6 text-xl font-medium max-w-sm leading-relaxed">
                      You have <span className="text-gray-900 dark:text-white font-bold">{sessions.length} sessions</span> lined up for this week.
                    </p>
                  </div>

                  <div className="flex items-center gap-4 animate-in fade-in slide-in-from-right duration-700">
                     <button 
                      onClick={() => toast('No new notifications', { icon: '🔔' })}
                      className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 text-gray-400 hover:text-primary-600 hover:border-primary-200 transition-all shadow-sm"
                     >
                       <Bell size={24} />
                     </button>
                     <div className="p-1 pr-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-full flex items-center gap-3 shadow-sm hover:shadow-md transition-all cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 font-bold">
                          {user.email[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest leading-none">Profile</p>
                          <p className="text-[10px] text-gray-400 font-medium">Verified</p>
                        </div>
                     </div>
                  </div>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                   {[
                     { label: 'Hours Studied', value: '124', icon: <Clock size={20} />, color: 'text-primary-600' },
                     { label: 'Courses', value: '12', icon: <BookOpen size={20} />, color: 'text-success-600' },
                     { label: 'Teachers', value: '4', icon: <Users size={20} />, color: 'text-orange-600' },
                     { label: 'Average Score', value: '98%', icon: <Star size={20} />, color: 'text-yellow-600' },
                   ].map((stat, i) => (
                      <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-50 dark:border-white/5 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all">
                         <div className={`${stat.color} mb-4`}>{stat.icon}</div>
                         <p className="text-2xl font-bold mb-1">{stat.value}</p>
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                      </div>
                   ))}
                </div>

                {/* Teachers Section */}
                <section className="space-y-8 pt-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold tracking-tight">Top Rated Teachers</h2>
                      <p className="text-sm text-gray-500 font-medium mt-1">Hand-picked educators just for your level.</p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('Browse Teachers')}
                      className="btn-secondary py-3 px-6 text-xs flex items-center gap-2 group"
                    >
                      Explore All <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-8">
                    {teachers.slice(0, 4).map(teacher => (
                      <TeacherCard 
                        key={teacher.id} 
                        teacher={teacher} 
                        onBook={() => setSelectedTeacher(teacher)} 
                      />
                    ))}
                  </div>
                </section>
              </div>

              {/* Right Sidebar: Upcoming (4 columns) */}
              <div className="lg:col-span-4 space-y-8">
                 <div className="sticky top-40 space-y-8">
                    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-[2.5rem] p-8 shadow-2xl shadow-blue-500/5">
                      <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold">Upcoming Sessions</h2>
                        <div className="w-8 h-8 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600">
                           <Calendar size={16} />
                        </div>
                      </div>

                      <div className="space-y-8">
                        {sessions.length > 0 ? (
                          <>
                            <div className="space-y-6">
                              {sessions.slice(0, 3).map(session => (
                                <SessionCard key={session.id} session={session} />
                              ))}
                            </div>
                            
                            <div className="pt-8 border-t border-gray-50 dark:border-white/5">
                              <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-3xl relative overflow-hidden group cursor-pointer">
                                <div className="relative z-10">
                                  <p className="text-[10px] font-bold text-primary-600 uppercase tracking-widest mb-1">Next Class</p>
                                  <p className="text-base font-bold text-gray-900 dark:text-white mb-4">
                                    {sessions[0]?.professeurs?.specialite || "Ready to Learn?"}
                                  </p>
                                  <button className="w-full py-3 bg-primary-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 group-hover:scale-105 transition-all">
                                     Join Meeting <ArrowRight size={14} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="py-12 text-center">
                            <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                              <Calendar size={32} />
                            </div>
                            <p className="text-gray-400 font-medium">No sessions scheduled.</p>
                            <button onClick={() => setActiveTab('Browse Teachers')} className="text-primary-600 text-xs font-bold mt-2 hover:underline">Book your first one</button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quick Help Card */}
                    <div className="bg-gray-900 dark:bg-white rounded-[2.5rem] p-8 text-white dark:text-gray-900 relative overflow-hidden">
                       <Users className="absolute -bottom-4 -right-4 text-white/10 dark:text-gray-900/10" size={120} />
                       <h3 className="text-xl font-bold mb-2">Need Help?</h3>
                       <p className="text-sm opacity-70 mb-6 font-medium">Our support team is available 24/7 to help you with your learning path.</p>
                       <button className="px-6 py-3 bg-white/10 dark:bg-gray-900/10 border border-white/20 dark:border-gray-900/20 rounded-xl text-xs font-bold hover:bg-white/20 transition-all">
                          Contact Support
                       </button>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'Browse Teachers' && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="mb-12">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">Browse Teachers</h1>
                <p className="text-gray-500 dark:text-gray-400 text-lg">Find the perfect educator to help you master your subjects.</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {teachers.map(teacher => (
                  <TeacherCard 
                    key={teacher.id} 
                    teacher={teacher} 
                    onBook={() => setSelectedTeacher(teacher)} 
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Resources' && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 text-center py-20">
              <BookOpen className="mx-auto text-gray-300 dark:text-gray-700 mb-6" size={80} />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Learning Resources</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">Access your downloaded materials, PDFs, and past session recordings here. Coming soon!</p>
            </div>
          )}

          {activeTab === 'Settings' && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="mb-12">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">Account Settings</h1>
                <p className="text-gray-500 dark:text-gray-400 text-lg">Manage your personal information and preferences.</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-white/5 p-8 max-w-2xl">
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
                    <input type="text" className="input-field" defaultValue={student?.full_name} disabled />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                    <input type="email" className="input-field" defaultValue={user.email} disabled />
                  </div>
                  <div>
                    <button className="btn-primary w-full py-4" onClick={() => toast.success('Settings updated!')}>Save Changes</button>
                  </div>
                </div>
              </div>
            </div>
          )}

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
