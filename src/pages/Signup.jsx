import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Loader2, Eye, EyeOff, User, GraduationCap } from 'lucide-react';
import Logo from '../components/Logo';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

const Signup = () => {
  const [fullName, setFullName] = useState('');
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
            full_name: fullName,
            role: role
          }
        }
      });
      if (authError) throw authError;

      if (authData?.user) {
        const table = role === 'teacher' ? 'professeurs' : 'eleves';
        const { error: profileError } = await supabase
          .from(table)
          .insert({
            id: authData.user.id,
            nom: fullName,
            email: email
          });

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
    }}>
      {/* Background accents */}
      <div style={{
        position: 'fixed', top: 0, right: 0, width: '50%', height: '300px',
        background: 'linear-gradient(135deg, rgba(0,88,190,0.04), transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', bottom: 0, left: 0, width: '40%', height: '300px',
        background: 'linear-gradient(135deg, transparent, rgba(0,108,73,0.04))',
        pointerEvents: 'none',
      }} />

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px 40px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Logo Icon */}
        <div style={{
          width: '56px', height: '56px', borderRadius: 'var(--radius-xl)',
          backgroundColor: 'var(--color-primary-600)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '24px',
          boxShadow: '0 8px 32px rgba(0, 88, 190, 0.2)',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" fill="white"/>
          </svg>
        </div>

        <h1 style={{
          fontSize: '28px', fontWeight: 700, color: 'var(--color-on-surface)',
          letterSpacing: '-0.02em', marginBottom: '4px',
        }}>
          Join Dourous-Net
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--color-outline)', marginBottom: '40px' }}>
          Create your free account
        </p>

        {/* Signup Card */}
        <div className="card-static animate-scale-in" style={{ width: '100%', maxWidth: '440px', padding: '32px' }}>
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-outline)' }} />
                <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)}
                  className="input-field input-field-icon" placeholder="John Doe" />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-outline)' }} />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="input-field input-field-icon" placeholder="name@example.com" />
              </div>
            </div>

            {/* Role */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
                I am a...
              </label>
              <div style={{ position: 'relative' }}>
                <GraduationCap size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-outline)' }} />
                <select value={role} onChange={(e) => setRole(e.target.value)}
                  className="input-field input-field-icon"
                  style={{ appearance: 'none', cursor: 'pointer' }}>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-outline)' }} />
                <input type={showPassword ? "text" : "password"} required value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field input-field-icon" placeholder="••••••••"
                  style={{ paddingRight: '44px' }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-outline)', padding: '4px' }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--color-outline)', marginTop: '6px' }}>
                Must be at least 8 characters.
              </p>
            </div>

            {/* Terms */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '24px' }}>
              <input type="checkbox" required style={{ marginTop: '3px', accentColor: 'var(--color-primary-600)' }} />
              <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>
                I agree to the{' '}
                <a href="#" style={{ color: 'var(--color-primary-600)', fontWeight: 600 }}>Terms of Service</a> and{' '}
                <a href="#" style={{ color: 'var(--color-primary-600)', fontWeight: 600 }}>Privacy Policy</a>.
              </p>
            </div>

            <button type="submit" disabled={loading} className="btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '15px', borderRadius: 'var(--radius-xl)' }}>
              {loading ? <Loader2 size={20} style={{ animation: 'spin 0.8s linear infinite' }} /> : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '24px 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-outline-variant)' }} />
            <span className="label-caps" style={{ color: 'var(--color-outline)', fontSize: '11px' }}>OR SIGN UP WITH</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-outline-variant)' }} />
          </div>

          {/* Social */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <button type="button" onClick={() => signInWithProvider('google')}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '12px', backgroundColor: 'var(--color-surface-container-lowest)',
                border: '1px solid var(--color-outline-variant)', borderRadius: 'var(--radius-xl)',
                fontSize: '14px', fontWeight: 500, color: 'var(--color-on-surface)', cursor: 'pointer',
              }}>
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" style={{ width: '18px', height: '18px' }} alt="Google" />
              Google
            </button>
            <button type="button" onClick={() => signInWithProvider('facebook')}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '12px', backgroundColor: 'var(--color-surface-container-lowest)',
                border: '1px solid var(--color-outline-variant)', borderRadius: 'var(--radius-xl)',
                fontSize: '14px', fontWeight: 500, color: 'var(--color-on-surface)', cursor: 'pointer',
              }}>
              <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" style={{ width: '18px', height: '18px' }} alt="Facebook" />
              Facebook
            </button>
          </div>
        </div>

        <p style={{ marginTop: '24px', fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--color-primary-600)', fontWeight: 600 }}>Log In</Link>
        </p>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid var(--color-outline-variant)', padding: '20px 0' }}>
        <div className="container-max" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Logo />
            <span style={{ fontSize: '12px', color: 'var(--color-outline)' }}>© 2024 Dourous-Net. All rights reserved.</span>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy Policy', 'Terms of Service', 'Contact Support'].map(link => (
              <a key={link} href="#" style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-on-surface-variant)' }}>{link}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
