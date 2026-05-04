import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import Logo from '../components/Logo';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signInWithProvider } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn({ email, password });
      if (error) throw error;

      toast.success('Welcome back!');
      navigate('/dashboard');
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
      {/* Background gradient accents */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '50%',
        height: '300px',
        background: 'linear-gradient(135deg, rgba(0,88,190,0.04), transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '40%',
        height: '300px',
        background: 'linear-gradient(135deg, transparent, rgba(0,108,73,0.04))',
        pointerEvents: 'none',
      }} />

      {/* Main Content */}
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
        <Logo 
          fontSize="32px" 
          color="var(--color-on-surface)" 
          style={{ marginBottom: '8px' }} 
        />

        <p style={{
          fontSize: '14px',
          color: 'var(--color-outline)',
          marginBottom: '40px',
        }}>
          Welcome back
        </p>

        {/* Login Card */}
        <div className="card-static animate-scale-in" style={{
          width: '100%',
          maxWidth: '420px',
          padding: '32px',
        }}>
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--color-on-surface)',
                marginBottom: '8px',
              }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--color-outline)',
                  }}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field input-field-icon"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--color-on-surface)',
                }}>
                  Password
                </label>
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--color-primary-600)',
                    cursor: 'pointer',
                  }}
                >
                  Forgot?
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--color-outline)',
                  }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field input-field-icon"
                  placeholder="••••••••"
                  style={{ paddingRight: '44px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--color-outline)',
                    padding: '4px',
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '15px',
                fontWeight: 600,
                borderRadius: 'var(--radius-xl)',
              }}
            >
              {loading ? <Loader2 size={20} style={{ animation: 'spin 0.8s linear infinite' }} /> : 'Login'}
            </button>
          </form>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            margin: '28px 0',
          }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-outline-variant)' }} />
            <span className="label-caps" style={{ color: 'var(--color-outline)', fontSize: '11px' }}>
              OR CONTINUE WITH
            </span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-outline-variant)' }} />
          </div>

          {/* Social Login */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <button
              type="button"
              onClick={() => signInWithProvider('google')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px',
                backgroundColor: 'var(--color-surface-container-lowest)',
                border: '1px solid var(--color-outline-variant)',
                borderRadius: 'var(--radius-xl)',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--color-on-surface)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" style={{ width: '18px', height: '18px' }} alt="Google" />
              Google
            </button>
            <button
              type="button"
              onClick={() => signInWithProvider('facebook')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px',
                backgroundColor: 'var(--color-surface-container-lowest)',
                border: '1px solid var(--color-outline-variant)',
                borderRadius: 'var(--radius-xl)',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--color-on-surface)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" style={{ width: '18px', height: '18px' }} alt="Facebook" />
              Facebook
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <p style={{
          marginTop: '24px',
          fontSize: '14px',
          color: 'var(--color-on-surface-variant)',
        }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: 'var(--color-primary-600)', fontWeight: 600 }}>
            Sign Up for free
          </Link>
        </p>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid var(--color-outline-variant)',
        padding: '20px 0',
      }}>
        <div className="container-max" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Logo />
            <span style={{ fontSize: '12px', color: 'var(--color-outline)' }}>
              © 2024 Dourous-Net. All rights reserved.
            </span>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy Policy', 'Terms of Service', 'Contact Support'].map(link => (
              <a key={link} href="#" style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-on-surface-variant)' }}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
