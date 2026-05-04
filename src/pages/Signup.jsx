import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Loader2, Eye, EyeOff, User, BookOpen } from 'lucide-react';
import Logo from '../components/Logo';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

const Signup = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp, signInWithProvider } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: authData, error: authError } = await signUp({
        email,
        password,
        options: {
          data: {
            nom: nom,
            prenom: prenom,
            role: role
          }
        }
      });
      if (authError) throw authError;

      if (authData?.user) {
        const table = role === 'teacher' ? 'professeurs' : 'eleves';
        const profileData = role === 'teacher' 
          ? { id: authData.user.id, nom: `${prenom} ${nom}`, email: email }
          : { id: authData.user.id, nom: nom, prenom: prenom, email: email };

        const { error: profileError } = await supabase
          .from(table)
          .insert(profileData);

        if (profileError) {
          console.error('Profile creation warning:', profileError.message);
        }

        toast.success('Account created successfully!');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--color-surface)',
      fontFamily: 'var(--font-body)',
    }}>
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '24px',
        gap: '48px',
      }}>
        
        {/* Left Side: Hero Content */}
        <div className="hidden lg:flex" style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '40px',
        }}>
          <div style={{ marginBottom: '48px' }}>
            <Logo />
          </div>

          <h1 style={{
            fontSize: '48px',
            fontWeight: 800,
            lineHeight: 1.1,
            color: 'var(--color-on-surface)',
            marginBottom: '24px',
            letterSpacing: '-0.03em',
          }}>
            Unlock your potential with <br />
            <span style={{ color: 'var(--color-primary-600)' }}>expert-led learning.</span>
          </h1>

          <p style={{
            fontSize: '18px',
            lineHeight: 1.6,
            color: 'var(--color-on-surface-variant)',
            marginBottom: '48px',
            maxWidth: '520px',
          }}>
            Join a community of thousands of students and educators. 
            Experience a distraction-free environment designed for 
            academic excellence and career growth.
          </p>

          {/* Hero Image with Glass Card */}
          <div style={{
            position: 'relative',
            borderRadius: 'var(--radius-2xl)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-xl)',
          }}>
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
              alt="Students learning" 
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            {/* Glass Card Overlay */}
            <div style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              right: '24px',
              padding: '24px',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(12px)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            }}>
              <p style={{
                fontSize: '15px',
                fontStyle: 'italic',
                color: 'var(--color-on-surface)',
                marginBottom: '12px',
                lineHeight: 1.5,
              }}>
                "Dourous-Net transformed my study routine. The interface is clean, and the tutors are world-class."
              </p>
              <p style={{
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--color-on-surface-variant)',
              }}>
                — Sarah Jenkins, Computer Science Student
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Signup Form Card */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div className="card-static animate-scale-in" style={{
            width: '100%',
            maxWidth: '520px',
            padding: '48px',
            backgroundColor: 'var(--color-surface-container-lowest)',
            borderRadius: 'var(--radius-2xl)',
            boxShadow: '0 20px 40px rgba(0, 88, 190, 0.08)',
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: 800,
              color: 'var(--color-on-surface)',
              marginBottom: '8px',
              letterSpacing: '-0.02em',
            }}>
              Create Account
            </h2>
            <p style={{
              fontSize: '14px',
              color: 'var(--color-outline)',
              marginBottom: '32px',
            }}>
              Start your learning journey with Dourous-Net today.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Role Selector */}
              <div style={{ marginBottom: '24px' }}>
                <label className="label-caps" style={{ display: 'block', marginBottom: '12px', fontSize: '11px' }}>
                  I WANT TO JOIN AS A
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    style={{
                      padding: '20px 12px',
                      borderRadius: 'var(--radius-lg)',
                      border: role === 'student' 
                        ? '2px solid var(--color-primary-600)' 
                        : '1px solid var(--color-outline-variant)',
                      backgroundColor: role === 'student' 
                        ? 'var(--color-primary-50)' 
                        : 'var(--color-surface-container-lowest)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s',
                    }}
                  >
                    <User size={20} color={role === 'student' ? 'var(--color-primary-600)' : 'var(--color-outline)'} />
                    <span style={{ 
                      fontSize: '14px', 
                      fontWeight: 600, 
                      color: role === 'student' ? 'var(--color-primary-600)' : 'var(--color-on-surface)' 
                    }}>
                      Student
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('teacher')}
                    style={{
                      padding: '20px 12px',
                      borderRadius: 'var(--radius-lg)',
                      border: role === 'teacher' 
                        ? '2px solid var(--color-primary-600)' 
                        : '1px solid var(--color-outline-variant)',
                      backgroundColor: role === 'teacher' 
                        ? 'var(--color-primary-50)' 
                        : 'var(--color-surface-container-lowest)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s',
                    }}
                  >
                    <BookOpen size={20} color={role === 'teacher' ? 'var(--color-primary-600)' : 'var(--color-outline)'} />
                    <span style={{ 
                      fontSize: '14px', 
                      fontWeight: 600, 
                      color: role === 'teacher' ? 'var(--color-primary-600)' : 'var(--color-on-surface)' 
                    }}>
                      Tutor
                    </span>
                  </button>
                </div>
              </div>

              {/* Name Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label className="label-caps" style={{ display: 'block', marginBottom: '8px', fontSize: '11px' }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    className="input-field"
                    placeholder="John"
                    style={{ padding: '14px 16px' }}
                  />
                </div>
                <div>
                  <label className="label-caps" style={{ display: 'block', marginBottom: '8px', fontSize: '11px' }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="input-field"
                    placeholder="Doe"
                    style={{ padding: '14px 16px' }}
                  />
                </div>
              </div>

              {/* Email */}
              <div style={{ marginBottom: '20px' }}>
                <label className="label-caps" style={{ display: 'block', marginBottom: '8px', fontSize: '11px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="name@example.com"
                  style={{ padding: '14px 16px' }}
                />
              </div>

              {/* Password */}
              <div style={{ marginBottom: '12px' }}>
                <label className="label-caps" style={{ display: 'block', marginBottom: '8px', fontSize: '11px' }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    placeholder="••••••••"
                    style={{ padding: '14px 48px 14px 16px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--color-outline)',
                      padding: '8px',
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--color-outline)', marginTop: '6px' }}>
                  Must be at least 8 characters long.
                </p>
              </div>

              {/* Terms */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <input type="checkbox" required style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>
                  I agree to the <a href="#" style={{ color: 'var(--color-primary-600)', fontWeight: 600, textDecoration: 'none' }}>Terms of Service</a> and <a href="#" style={{ color: 'var(--color-primary-600)', fontWeight: 600, textDecoration: 'none' }}>Privacy Policy</a>.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '16px',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: '0 10px 20px rgba(0, 88, 190, 0.2)',
                }}
              >
                {loading ? <Loader2 size={20} style={{ animation: 'spin 0.8s linear infinite' }} /> : 'Create Account'}
              </button>
            </form>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '32px 0' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-outline-variant)' }} />
              <span style={{ color: 'var(--color-outline)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.05em' }}>OR JOIN WITH</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-outline-variant)' }} />
            </div>

            {/* Social Logins */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <button
                type="button"
                onClick={() => signInWithProvider('google')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '12px',
                  backgroundColor: 'white',
                  border: '1px solid var(--color-outline-variant)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--color-on-surface)',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-surface-container-low)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" style={{ width: '18px', height: '18px' }} alt="Google" />
                Google
              </button>
              <button
                type="button"
                onClick={() => signInWithProvider('azure')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '12px',
                  backgroundColor: 'white',
                  border: '1px solid var(--color-outline-variant)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--color-on-surface)',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-surface-container-low)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                <img src="https://www.svgrepo.com/show/303213/microsoft-icon-logo.svg" style={{ width: '18px', height: '18px' }} alt="Microsoft" />
                Microsoft
              </button>
            </div>

            <p style={{
              textAlign: 'center',
              marginTop: '32px',
              fontSize: '14px',
              color: 'var(--color-on-surface-variant)',
            }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'var(--color-primary-600)', fontWeight: 700, textDecoration: 'none' }}>Log In</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--color-outline-variant)',
        padding: '32px 0',
        backgroundColor: 'white',
      }}>
        <div className="container-max" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Logo />
            <span style={{ fontSize: '12px', color: 'var(--color-outline)' }}>
              © 2024 Dourous-Net. All rights reserved.
            </span>
          </div>
          <div style={{ display: 'flex', gap: '32px' }}>
            {['Privacy Policy', 'Terms of Service', 'Contact Support'].map(link => (
              <a
                key={link}
                href="#"
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--color-on-surface-variant)',
                  textDecoration: 'none',
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Signup;
