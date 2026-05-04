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
  Users, Calendar, Loader2, Search, Plus,
  LayoutDashboard, BookOpen, Settings, Heart,
  LogOut, HelpCircle, ChevronRight, Award
} from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, signOut, toggleFavorite } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [student, setStudent] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [role, setRole] = useState(user.user_metadata?.role || 'student');
  const [profile, setProfile] = useState(null);
  const [settingsName, setSettingsName] = useState('');
  const [settingsPrenom, setSettingsPrenom] = useState('');
  const [settingsNiveau, setSettingsNiveau] = useState('');
  const [settingsLanguage, setSettingsLanguage] = useState('en');
  const [settingsLoading, setSettingsLoading] = useState(false);
  const favorites = user?.user_metadata?.favorites || [];

  const fetchData = useCallback(async () => {
    try {
      const userRole = user.user_metadata?.role || 'student';
      setRole(userRole);

      if (userRole === 'teacher') {
        // Fetch Professor Profile
        const { data: profData, error: profError } = await supabase
          .from('professeurs')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profError && profError.code === 'PGRST116') {
          // Auto-create if missing
          const { data: newProf } = await supabase
            .from('professeurs')
            .insert({
              id: user.id,
              nom: user.user_metadata?.last_name || user.user_metadata?.full_name?.split(' ')[1] || user.email.split('@')[0],
              prenom: user.user_metadata?.first_name || user.user_metadata?.full_name?.split(' ')[0] || 'Teacher',
              matiere: 'General',
              email: user.email,
              tarif: 45
            })
            .select()
            .single();
          setProfile(newProf);
        } else {
          setProfile(profData);
        }

        // Fetch Professor's Sessions
        const { data: sessionData } = await supabase
          .from('seances')
          .select('*, eleves(*)')
          .eq('professeur_id', user.id)
          .order('date_seance', { ascending: true });
        setSessions(sessionData || []);

      } else {
        // Fetch Student Profile (Existing Logic)
        let { data: studentData, error: studentError } = await supabase
          .from('eleves')
          .select('*')
          .eq('id', user.id)
          .single();

        if (studentError && studentError.code === 'PGRST116') {
          const { data: newStudent } = await supabase
            .from('eleves')
            .insert({
              id: user.id,
              nom: user.user_metadata?.nom || user.user_metadata?.full_name || user.email.split('@')[0],
              prenom: user.user_metadata?.prenom || '',
              email: user.email
            })
            .select()
            .single();
          studentData = newStudent;
        }

        setProfile(studentData);
        setStudent(studentData); // Keep for compatibility if needed

        // Fetch Student's Sessions
        const { data: sessionData } = await supabase
          .from('seances')
          .select('*, professeurs(*)')
          .eq('eleve_id', user.id)
          .order('date_seance', { ascending: true });
        setSessions(sessionData || []);

        // Fetch Teachers for students
        const { data: teacherData } = await supabase
          .from('professeurs')
          .select('*');
        setTeachers(teacherData || []);
      }

      // Sync settings form
      if (profile) {
        setSettingsName(profile.nom || '');
        setSettingsPrenom(profile.prenom || '');
        setSettingsNiveau(profile.niveau || '');
      }
      setSettingsLanguage(user.user_metadata?.language || 'en');
      // Removed local favorites sync

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

  const handleToggleFavorite = async (teacherId) => {
    try {
      await toggleFavorite(teacherId);
    } catch (error) {
      toast.error('Failed to update favorites');
    }
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

      // Update relevant table
      const table = role === 'teacher' ? 'professeurs' : 'eleves';
      const updateData = role === 'teacher' 
        ? { nom: settingsName }
        : { nom: settingsName, prenom: settingsPrenom, niveau: settingsNiveau };

      const { error: dbError } = await supabase
        .from(table)
        .update(updateData)
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

  const sidebarLinks = role === 'teacher' ? [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, mobile: true },
    { name: 'My Students', icon: <Users size={20} />, mobile: true },
    { name: 'Schedule', icon: <Calendar size={20} />, mobile: true },
    { name: 'Settings', icon: <Settings size={20} />, mobile: true },
  ] : [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, mobile: true },
    { name: 'My Sessions', icon: <Calendar size={20} />, mobile: true },
    { name: 'Find Teachers', icon: <Users size={20} />, mobile: true },
    { name: 'Favorites', icon: <Heart size={20} />, mobile: false },
    { name: 'Settings', icon: <Settings size={20} />, mobile: true },
  ];



  const displayName = profile?.prenom || profile?.nom?.split(' ')[0] || user.email.split('@')[0];

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
            <Logo />
            <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-outline)', marginTop: '8px' }}>
              {role === 'teacher' ? 'PROFESSOR PORTAL' : 'LEARNING PORTAL'}
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
          {role === 'student' && (
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
          )}

          {/* Additional Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px', paddingTop: '8px', borderTop: '1px solid var(--color-outline-variant)' }}>
            <button
              onClick={() => navigate('/')}
              className="sidebar-link"
              style={{ color: 'var(--color-on-surface-variant)' }}
            >
              Back to Home
            </button>
            <button
              onClick={() => navigate('/pricing')}
              className="sidebar-link"
              style={{ color: 'var(--color-on-surface-variant)' }}
            >
              View Pricing
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

      {/* ═══ MOBILE BOTTOM NAV ═══ */}
      <nav className="bottom-nav">
        {sidebarLinks.filter(l => l.mobile).map((link) => (
          <button
            key={link.name}
            onClick={() => setActiveTab(link.name)}
            className={`bottom-nav-link ${activeTab === link.name ? 'bottom-nav-link--active' : ''}`}
          >
            {React.cloneElement(link.icon, { size: 24 })}
            <span style={{ marginTop: '2px' }}>{link.name.split(' ')[link.name.split(' ').length - 1]}</span>
          </button>
        ))}
      </nav>

      <main className="dashboard-main" style={{
        flex: 1,
        marginLeft: '240px',
        padding: '32px 40px',
        minHeight: '100vh',
      }}>
        {/* Mobile Header */}
        <div className="mobile-only">
          <div className="mobile-header">
            <Logo fontSize="16px" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', backgroundColor: 'var(--color-error-500)', borderRadius: '50%', border: '2px solid white' }} />
                <Search size={22} style={{ color: 'var(--color-on-surface)' }} />
              </div>
              <div 
                style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--color-outline-variant)' }}
                onClick={() => navigate('/profile')}
              >
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${displayName}`} alt="avatar" />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Top Bar */}
        <div className="desktop-only">
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
                {role === 'teacher' ? `Hello, Professor ${displayName}!` : `Welcome back, ${displayName}!`}
                <span 
                  className={role === 'teacher' ? 'tag tag-primary' : 'tag tag-secondary'} 
                  style={{ 
                    marginLeft: '12px', 
                    verticalAlign: 'middle',
                    fontSize: '11px',
                    padding: '4px 10px'
                  }}
                >
                  {role === 'teacher' ? 'PROFESSOR' : 'STUDENT'}
                </span>
              </h1>
              <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
                {role === 'teacher' 
                  ? `You have ${sessions.length} sessions booked with your students.`
                  : `You have ${sessions.length} sessions scheduled for this week.`}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
        </div>
        {/* ═══ OVERVIEW TAB ═══ */}
        {activeTab === 'Dashboard' && (
          <div className="grid-2-col" style={{
            display: 'grid',
            gridTemplateColumns: role === 'teacher' ? '1fr' : '1fr 340px',
            gap: '32px',
            alignItems: 'start',
          }}>
            {/* Left Column */}
            <div>
              {/* Mobile Welcome Message */}
              <div className="lg:hidden" style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                  Welcome back, {profile?.prenom || displayName}!
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
                  Ready to continue your learning journey today?
                </p>
              </div>

              {/* Mobile Stats Grid */}
              {role === 'student' && (
                <div className="mobile-only">
                  <div className="mobile-stat-grid">
                    <div className="mobile-stat-card" style={{ backgroundColor: 'var(--color-primary-600)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Calendar size={20} color="white" />
                        <span style={{ fontSize: '10px', opacity: 0.8 }}>THIS WEEK</span>
                      </div>
                      <div>
                        <p style={{ fontSize: '20px', fontWeight: 700 }}>12h</p>
                        <p style={{ fontSize: '11px', opacity: 0.9 }}>Study Time</p>
                      </div>
                    </div>
                    <div className="mobile-stat-card" style={{ backgroundColor: '#4edea3' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Award size={20} color="white" />
                        <span style={{ fontSize: '10px', opacity: 0.8 }}>POINTS</span>
                      </div>
                      <div>
                        <p style={{ fontSize: '20px', fontWeight: 700 }}>450</p>
                        <p style={{ fontSize: '11px', opacity: 0.9 }}>XP Points</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {role === 'teacher' ? (
                <>
                  <div style={{ marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
                      Recent Student Activity
                    </h2>
                    <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
                      Overview of your upcoming teaching sessions and student messages.
                    </p>
                  </div>
                  
                  <div className="card-static" style={{ padding: '0' }}>
                    {sessions.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {sessions.map((session, idx) => (
                          <div key={session.id} style={{ 
                            padding: '16px 24px', 
                            borderBottom: idx === sessions.length - 1 ? 'none' : '1px solid var(--color-outline-variant)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                              <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: 'var(--radius-full)',
                                backgroundColor: 'var(--color-primary-50)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--color-primary-600)',
                                fontWeight: 700
                              }}>
                                {session.eleves?.nom?.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p style={{ fontWeight: 600, color: 'var(--color-on-surface)' }}>{session.eleves?.nom}</p>
                                <p style={{ fontSize: '12px', color: 'var(--color-outline)' }}>
                                  {new Date(session.date_seance).toLocaleDateString()} at {new Date(session.date_seance).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                              {session.devoir_url && (
                                <a href={session.devoir_url} target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '12px' }}>
                                  View Homework
                                </a>
                              )}
                              <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '12px' }}>
                                Start Session
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ padding: '48px', textAlign: 'center' }}>
                        <Calendar size={48} style={{ color: 'var(--color-outline-variant)', marginBottom: '16px' }} />
                        <p style={{ color: 'var(--color-outline)' }}>No sessions booked by students yet.</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
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

                  {/* Desktop Grid */}
                  <div className="desktop-only">
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '20px',
                    }}>
                      {teachers.slice(0, 4).map(teacher => (
                        <TeacherCard
                          key={teacher.id}
                          teacher={teacher}
                          onBook={() => setSelectedTeacher(teacher)}
                          isFavorite={favorites.includes(teacher.id)}
                          onToggleFavorite={() => handleToggleFavorite(teacher.id)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Mobile Horizontal Scroll */}
                  <div className="mobile-only">
                    <div className="horizontal-scroll">
                      {teachers.slice(0, 4).map(teacher => (
                        <div key={teacher.id} style={{ minWidth: '240px', flex: '0 0 auto' }}>
                          <TeacherCard
                            teacher={teacher}
                            onBook={() => setSelectedTeacher(teacher)}
                            isFavorite={favorites.includes(teacher.id)}
                            onToggleFavorite={() => handleToggleFavorite(teacher.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>


            {/* Right: Upcoming Sessions + Progress (Students only) */}
            {role === 'student' && (
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
                <div className="card-static" style={{ padding: '20px', backgroundColor: '#ffffff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                      Monthly Goal
                    </h3>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-primary-600)' }}>
                      60%
                    </span>
                  </div>

                  <p style={{ fontSize: '12px', color: 'var(--color-outline)', marginBottom: '12px' }}>
                    12 of 20 hours completed
                  </p>

                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: 'var(--color-surface-container-low)',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden',
                    marginBottom: '16px',
                  }}>
                    <div style={{
                      height: '100%',
                      width: '60%',
                      backgroundColor: 'var(--color-primary-600)',
                      borderRadius: 'var(--radius-full)',
                    }} />
                  </div>

                  <button style={{
                    width: '100%',
                    padding: '8px',
                    fontSize: '12px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--color-primary-50)',
                    border: 'none',
                    color: 'var(--color-primary-700)',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}>
                    Edit Goal
                  </button>
                </div>
              </div>
            )}
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
            {favorites.length > 0 ? (
              <div className="grid-responsive" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '16px',
                marginBottom: '32px'
              }}>
                {teachers.filter(t => favorites.includes(t.id)).map(teacher => (
                  <TeacherCard
                    key={teacher.id}
                    teacher={teacher}
                    onBook={() => setSelectedTeacher(teacher)}
                    isFavorite={true}
                    onToggleFavorite={() => handleToggleFavorite(teacher.id)}
                  />
                ))}
              </div>
            ) : null}
            <div className="grid-responsive" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px',
            }}>
              {teachers.map(teacher => (
                <TeacherCard
                  key={teacher.id}
                  teacher={teacher}
                  onBook={() => setSelectedTeacher(teacher)}
                  isFavorite={favorites.includes(teacher.id)}
                  onToggleFavorite={() => handleToggleFavorite(teacher.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ═══ MY STUDENTS TAB (Teachers) ═══ */}
        {activeTab === 'My Students' && (
          <div className="animate-fade-in">
             <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
                My Students
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
                Management list of your students and their progress.
              </p>
            </div>
            
            <div className="card-static" style={{ padding: '0' }}>
              {sessions.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* Logic to group by unique students could go here */}
                  {[...new Set(sessions.map(s => s.eleves?.id))].map(studentId => {
                    const studentSession = sessions.find(s => s.eleves?.id === studentId);
                    return (
                      <div key={studentId} style={{ padding: '16px 24px', borderBottom: '1px solid var(--color-outline-variant)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-600)', fontWeight: 700 }}>
                            {studentSession.eleves?.nom?.charAt(0)}
                          </div>
                          <div>
                            <p style={{ fontWeight: 600 }}>{studentSession.eleves?.nom}</p>
                            <p style={{ fontSize: '12px', color: 'var(--color-outline)' }}>{studentSession.eleves?.email}</p>
                          </div>
                        </div>
                        <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '12px' }}>
                          View Student Profile
                        </button>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div style={{ padding: '48px', textAlign: 'center' }}>
                  <Users size={48} style={{ color: 'var(--color-outline-variant)', marginBottom: '16px' }} />
                  <p>You don't have any students yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══ SCHEDULE TAB (Teachers) ═══ */}
        {activeTab === 'Schedule' && (
          <div className="animate-fade-in">
             <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
                Your Teaching Schedule
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
                Manage your upcoming classes and availability.
              </p>
            </div>
            
            <div className="card-static" style={{ padding: '24px' }}>
               {/* Calendar component would go here */}
               <div style={{ textAlign: 'center', padding: '48px' }}>
                 <Calendar size={48} style={{ color: 'var(--color-outline-variant)', marginBottom: '16px' }} />
                 <p>Interactive Calendar View Coming Soon!</p>
               </div>
            </div>
          </div>
        )}

        {/* ═══ FAVORITES TAB ═══ */}
        {activeTab === 'Favorites' && (
          <div className="animate-fade-in">
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
                Your Favorites
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
                Your curated list of preferred tutors.
              </p>
            </div>
            {favorites.length > 0 ? (
              <div className="grid-responsive" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '16px',
              }}>
                {teachers.filter(t => favorites.includes(t.id)).map(teacher => (
                  <TeacherCard
                    key={teacher.id}
                    teacher={teacher}
                    onBook={() => setSelectedTeacher(teacher)}
                    isFavorite={true}
                    onToggleFavorite={() => handleToggleFavorite(teacher.id)}
                  />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 0', backgroundColor: 'var(--color-surface-container-low)', borderRadius: 'var(--radius-xl)' }}>
                <Heart size={48} style={{ color: 'var(--color-outline-variant)', marginBottom: '16px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
                  No favorites yet
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-outline)', marginBottom: '16px' }}>
                  Click the heart icon on any teacher to save them here.
                </p>
                <button
                  className="btn-primary"
                  onClick={() => setActiveTab('Find Teachers')}
                  style={{ padding: '10px 20px' }}
                >
                  Explore Tutors
                </button>
              </div>
            )}
          </div>
        )}

        {/* ═══ SETTINGS TAB ═══ */}
        {activeTab === 'Settings' && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '24px' }}>
              Account Settings
            </h2>
            <form onSubmit={handleSaveSettings} className="card-static" style={{ padding: '24px', maxWidth: '560px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label className="label-caps" style={{ display: 'block', marginBottom: '8px' }}>First Name</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={settingsPrenom} 
                    onChange={(e) => setSettingsPrenom(e.target.value)} 
                    required 
                  />
                </div>
                <div>
                  <label className="label-caps" style={{ display: 'block', marginBottom: '8px' }}>Last Name</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={settingsName} 
                    onChange={(e) => setSettingsName(e.target.value)} 
                    required 
                  />
                </div>
              </div>
              
              {role === 'student' && (
                <div style={{ marginBottom: '20px' }}>
                  <label className="label-caps" style={{ display: 'block', marginBottom: '8px' }}>Grade Level (Niveau)</label>
                  <select 
                    className="input-field" 
                    value={settingsNiveau} 
                    onChange={(e) => setSettingsNiveau(e.target.value)}
                    style={{ appearance: 'none', backgroundImage: 'none' }}
                  >
                    <option value="">Select your level</option>
                    <option value="6ème">6ème</option>
                    <option value="5ème">5ème</option>
                    <option value="4ème">4ème</option>
                    <option value="3ème">3ème</option>
                    <option value="2nde">2nde</option>
                    <option value="1ère">1ère</option>
                    <option value="Terminale">Terminale</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
              )}

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

        {/* Floating Action Button (FAB) - Mobile only */}
        <button
          onClick={() => setActiveTab('Find Teachers')}
          className="mobile-only"
          style={{
            position: 'fixed',
            right: '20px',
            bottom: '90px',
            width: '56px',
            height: '56px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-primary-600)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-lg)',
            border: 'none',
            zIndex: 999,
          }}
        >
          <Plus size={28} />
        </button>

        {/* Mobile Bottom Navigation */}
        <div className="mobile-only">
          <nav className="bottom-nav">
            {sidebarLinks.filter(l => l.mobile).map(link => (
              <button
                key={link.name}
                onClick={() => setActiveTab(link.name)}
                className={`bottom-nav-link ${activeTab === link.name ? 'bottom-nav-link--active' : ''}`}
              >
                {link.icon}
                <span>{link.name}</span>
              </button>
            ))}
          </nav>
        </div>

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
