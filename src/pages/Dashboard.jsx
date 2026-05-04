import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TeacherCard from '../components/TeacherCard';
import SessionCard from '../components/SessionCard';
import BookingModal from '../components/BookingModal';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import {
  Users, Calendar, Loader2, Search,
  LayoutDashboard, BookOpen, Settings, Heart,
  LogOut, HelpCircle, ChevronRight, Award
} from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [student, setStudent] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [settingsName, setSettingsName] = useState('');
  const [settingsLanguage, setSettingsLanguage] = useState('en');
  const [settingsLoading, setSettingsLoading] = useState(false);

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

        if (insertError) {
          console.error("Failed to auto-create student profile:", insertError);
          toast.error("Database Error: Could not create your student profile.");
        } else {
          studentData = newStudent;
        }
      }

      setStudent(studentData);
      if (studentData) {
        setSettingsName(studentData.full_name || studentData.nom || user.user_metadata?.full_name || '');
        setSettingsLanguage(user.user_metadata?.language || 'en');
      }

      const { data: teacherData } = await supabase
        .from('professeurs')
        .select('*');
      setTeachers(teacherData || []);

      const { data: sessionData, error: sessionError } = await supabase
        .from('seances')
        .select('*, professeurs(*)')
        .eq('eleve_id', user.id)
        .order('date_seance', { ascending: true });
        
      if (sessionError) {
        console.error("Error fetching sessions:", sessionError);
      }
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

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSettingsLoading(true);
    try {
      // Update Auth user metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: { full_name: settingsName, language: settingsLanguage }
      });
      if (authError) throw authError;

      // Update eleves table
      const { error: dbError } = await supabase
        .from('eleves')
        .update({ nom: settingsName })
        .eq('id', user.id);
      
      if (dbError) throw dbError;

      toast.success('Settings updated successfully!');
      fetchData(); // Refresh to ensure everything is synced
    } catch (error) {
      toast.error(`Failed to update settings: ${error.message}`);
    } finally {
      setSettingsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-surface)',
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid var(--color-outline-variant)',
          borderTopColor: 'var(--color-primary-600)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          marginBottom: '16px',
        }} />
        <p style={{ color: 'var(--color-outline)', fontSize: '14px', fontWeight: 500 }}>
          Loading your dashboard...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const sidebarLinks = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'My Sessions', icon: <Calendar size={20} /> },
    { name: 'Find Teachers', icon: <Users size={20} /> },
    { name: 'Homework', icon: <BookOpen size={20} /> },
    { name: 'Settings', icon: <Settings size={20} /> },
  ];

  const displayName = student?.full_name?.split(' ')[0] || student?.nom?.split(' ')[0] || user.email.split('@')[0];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: 'var(--color-surface)' }}>

      {/* ═══ SIDEBAR ═══ */}
      <aside className="sidebar" style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <div>
          {/* Brand */}
          <div style={{ padding: '8px 16px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-primary-600)' }}>
                Dourous-Net
              </span>
            </div>
            <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-outline)' }}>
              LEARNING PORTAL
            </p>
          </div>

          {/* Nav Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {sidebarLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => setActiveTab(link.name)}
                className={`sidebar-link ${activeTab === link.name ? 'sidebar-link--active' : ''}`}
              >
                {link.icon}
                {link.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* CTA Card */}
          <div style={{
            backgroundColor: 'var(--color-primary-600)',
            borderRadius: 'var(--radius-xl)',
            padding: '20px 16px',
            marginBottom: '8px',
          }}>
            <p style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>
              Ready to learn?
            </p>
            <button
              onClick={() => setActiveTab('Find Teachers')}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#ffffff',
                color: 'var(--color-primary-600)',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              Book a Session
            </button>
          </div>

          <button
            onClick={() => toast('Help Center coming soon!', { icon: '❓' })}
            className="sidebar-link"
          >
            <HelpCircle size={20} />
            Help Center
          </button>
          <button onClick={handleLogout} className="sidebar-link" style={{ color: 'var(--color-on-surface-variant)' }}>
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* ═══ MAIN CONTENT ═══ */}
      <main style={{
        flex: 1,
        marginLeft: '240px',
        padding: '32px 40px',
        minHeight: '100vh',
      }}>
        {/* Top Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
        }}>
          <div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 700,
              color: 'var(--color-on-surface)',
              letterSpacing: '-0.02em',
            }}>
              Welcome back, {displayName}!
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
              You have {sessions.length} sessions scheduled for this week.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-outline)',
              }} />
              <input
                type="text"
                placeholder="Search for courses..."
                className="input-field"
                style={{
                  width: '240px',
                  padding: '10px 40px 10px 16px',
                  fontSize: '13px',
                  borderRadius: 'var(--radius-full)',
                }}
              />
            </div>

            {/* Avatar */}
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden',
              border: '2px solid var(--color-outline-variant)',
              cursor: 'pointer',
            }}
              onClick={() => navigate('/profile')}
            >
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${displayName}&backgroundColor=f2f3fd&textColor=424754`}
                alt="Profile"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>

        {/* ═══ OVERVIEW TAB ═══ */}
        {activeTab === 'Dashboard' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 340px',
            gap: '32px',
            alignItems: 'start',
          }}>
            {/* Left: Teachers */}
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
              }}>
                <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                  Available Teachers
                </h2>
                <button
                  onClick={() => setActiveTab('Find Teachers')}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--color-primary-600)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  View all <ChevronRight size={16} />
                </button>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
              }}>
                {teachers.slice(0, 4).map(teacher => (
                  <TeacherCard
                    key={teacher.id}
                    teacher={teacher}
                    onBook={() => setSelectedTeacher(teacher)}
                  />
                ))}
              </div>
            </div>

            {/* Right: Upcoming Sessions + Progress */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Upcoming Sessions */}
              <div className="card-static" style={{ padding: '20px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: 'var(--color-on-surface)',
                  marginBottom: '16px',
                }}>
                  Upcoming Sessions
                </h3>

                {sessions.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {sessions.slice(0, 3).map(session => (
                      <SessionCard key={session.id} session={session} />
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '32px 0' }}>
                    <Calendar size={40} style={{ color: 'var(--color-outline-variant)', marginBottom: '12px' }} />
                    <p style={{ fontSize: '14px', color: 'var(--color-outline)' }}>No sessions scheduled.</p>
                    <button
                      onClick={() => setActiveTab('Find Teachers')}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: 'var(--color-primary-600)',
                        cursor: 'pointer',
                        marginTop: '8px',
                      }}
                    >
                      Book your first one
                    </button>
                  </div>
                )}
              </div>

              {/* Overall Progress Card */}
              <div style={{
                backgroundColor: 'var(--color-primary-600)',
                borderRadius: 'var(--radius-xl)',
                padding: '20px',
                color: '#ffffff',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px',
                }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>
                    Overall Progress
                  </h3>
                  <span style={{
                    padding: '4px 12px',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '11px',
                    fontWeight: 600,
                  }}>
                    Level 4
                  </span>
                </div>

                <p style={{ fontSize: '13px', opacity: 0.8, marginBottom: '12px' }}>
                  {sessions.length} of 5 lessons completed this month
                </p>

                {/* Progress bar */}
                <div style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden',
                  marginBottom: '16px',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${Math.min((sessions.length / 5) * 100, 100)}%`,
                    background: 'linear-gradient(90deg, #4edea3, #6cf8bb)',
                    borderRadius: 'var(--radius-full)',
                    transition: 'width 0.6s ease',
                  }} />
                </div>

                <button style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: 'var(--radius-full)',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}>
                  My Certificates
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ═══ MY SESSIONS TAB ═══ */}
        {activeTab === 'My Sessions' && (
          <div className="animate-fade-in">
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
                My Sessions
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
                View all your past and upcoming learning sessions.
              </p>
            </div>
            
            {sessions.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '16px',
              }}>
                {sessions.map(session => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 0', backgroundColor: 'var(--color-surface-container-low)', borderRadius: 'var(--radius-xl)' }}>
                <Calendar size={48} style={{ color: 'var(--color-outline-variant)', marginBottom: '16px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
                  No sessions yet
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-outline)', marginBottom: '16px' }}>
                  You don't have any booked sessions at the moment.
                </p>
                <button
                  className="btn-primary"
                  onClick={() => setActiveTab('Find Teachers')}
                  style={{ padding: '10px 20px' }}
                >
                  Book Your First Session
                </button>
              </div>
            )}
          </div>
        )}


        {/* ═══ FIND TEACHERS TAB ═══ */}
        {activeTab === 'Find Teachers' && (
          <div className="animate-fade-in">
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
                Browse Teachers
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
                Find the perfect educator to help you master your subjects.
              </p>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
            }}>
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

        {/* ═══ HOMEWORK TAB ═══ */}
        {activeTab === 'Homework' && (
          <div className="animate-fade-in" style={{ textAlign: 'center', padding: '80px 0' }}>
            <BookOpen size={64} style={{ color: 'var(--color-outline-variant)', marginBottom: '16px' }} />
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
              Homework & Resources
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', maxWidth: '400px', margin: '0 auto' }}>
              Access your uploaded materials, PDFs, and past session recordings here. Coming soon!
            </p>
          </div>
        )}

        {/* ═══ SETTINGS TAB ═══ */}
        {activeTab === 'Settings' && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '24px' }}>
              Account Settings
            </h2>
            <form onSubmit={handleSaveSettings} className="card-static" style={{ padding: '24px', maxWidth: '560px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label className="label-caps" style={{ display: 'block', marginBottom: '8px' }}>Full Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={settingsName} 
                  onChange={(e) => setSettingsName(e.target.value)} 
                  required 
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label className="label-caps" style={{ display: 'block', marginBottom: '8px' }}>Email Address</label>
                <input 
                  type="email" 
                  className="input-field" 
                  defaultValue={user.email} 
                  disabled 
                  style={{ backgroundColor: 'var(--color-surface-container-highest)', opacity: 0.7 }}
                />
                <p style={{ fontSize: '12px', color: 'var(--color-outline)', marginTop: '4px' }}>Email cannot be changed.</p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label className="label-caps" style={{ display: 'block', marginBottom: '12px' }}>Preferred Language</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  {[
                    { code: 'en', label: 'English', flag: '🇬🇧' },
                    { code: 'fr', label: 'Français', flag: '🇫🇷' },
                    { code: 'ar', label: 'العربية', flag: '🇸🇦' }
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setSettingsLanguage(lang.code)}
                      style={{
                        padding: '16px',
                        borderRadius: 'var(--radius-lg)',
                        border: settingsLanguage === lang.code ? '2px solid var(--color-primary-600)' : '1px solid var(--color-outline-variant)',
                        backgroundColor: settingsLanguage === lang.code ? 'var(--color-primary-50)' : 'var(--color-surface-container-lowest)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        outline: 'none',
                      }}
                    >
                      <span style={{ fontSize: '28px', lineHeight: 1 }}>{lang.flag}</span>
                      <span style={{ 
                        fontSize: '13px', 
                        fontWeight: settingsLanguage === lang.code ? 700 : 500,
                        color: settingsLanguage === lang.code ? 'var(--color-primary-700)' : 'var(--color-on-surface)'
                      }}>
                        {lang.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                disabled={settingsLoading}
                className="btn-primary"
                style={{ width: '100%', padding: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                {settingsLoading ? <Loader2 size={20} className="animate-spin" /> : 'Save Changes'}
              </button>
            </form>
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: '60px' }}>
          <Footer />
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
