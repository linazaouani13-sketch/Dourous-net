import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';
import { LogOut, Menu, X } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDashboard = location.pathname === '/dashboard';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  if (isDashboard) return null;

  const navLinks = [
    { name: 'Courses', path: '/teachers' },
    { name: 'Teachers', path: '/teachers' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/#about' },
  ];

  return (
    <>
      <nav
        className={`glass-nav ${isScrolled ? 'glass-nav--scrolled' : ''}`}
        style={{
          backgroundColor: isScrolled ? 'rgba(249, 249, 255, 0.92)' : 'rgba(249, 249, 255, 0.75)',
        }}
      >
        <div className="container-max">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '64px',
          }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
              <Logo />
            </Link>

            {/* Desktop Nav Links */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
            }} className="hidden md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: location.pathname === link.path
                      ? 'var(--color-primary-600)'
                      : 'var(--color-on-surface-variant)',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--color-primary-600)'}
                  onMouseLeave={(e) => {
                    if (location.pathname !== link.path) {
                      e.target.style.color = 'var(--color-on-surface-variant)';
                    }
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {user ? (
                <div className="hidden md:flex" style={{ alignItems: 'center', gap: '12px' }}>
                  <Link
                    to="/dashboard"
                    className="btn-primary"
                    style={{ padding: '10px 24px', fontSize: '13px' }}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-full)',
                      overflow: 'hidden',
                      border: '2px solid var(--color-outline-variant)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'var(--color-primary-50)',
                      color: 'var(--color-primary-600)',
                      fontWeight: 700,
                      fontSize: '14px',
                    }}
                  >
                    {user.email?.[0]?.toUpperCase() || 'U'}
                  </Link>
                </div>
              ) : (
                <div className="hidden md:flex" style={{ alignItems: 'center', gap: '12px' }}>
                  <Link
                    to="/login"
                    style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--color-on-surface-variant)',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--color-primary-600)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--color-on-surface-variant)'}
                  >
                    Log In
                  </Link>
                  <Link to="/signup" className="btn-primary" style={{ padding: '10px 24px', fontSize: '13px' }}>
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden"
                style={{
                  padding: '8px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-on-surface)',
                }}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 150,
        }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(25, 27, 35, 0.4)',
              backdropFilter: 'blur(8px)',
            }}
            onClick={() => setMobileMenuOpen(false)}
          />
          <div style={{
            position: 'absolute',
            right: 0,
            top: 0,
            height: '100%',
            width: '280px',
            backgroundColor: 'var(--color-surface-container-lowest)',
            boxShadow: 'var(--shadow-xl)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              <Logo />
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-outline)', padding: '8px' }}
              >
                <X size={24} />
              </button>
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: location.pathname === link.path ? 'var(--color-primary-600)' : 'var(--color-on-surface)',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-lg)',
                    transition: 'background 0.2s',
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {!user ? (
                <>
                  <Link to="/login" style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-on-surface-variant)', padding: '12px 16px' }}>
                    Log In
                  </Link>
                  <Link to="/signup" className="btn-primary" style={{ width: '100%', padding: '14px', justifyContent: 'center' }}>
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="btn-primary" style={{ width: '100%', padding: '14px', justifyContent: 'center' }}>
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 16px',
                      fontSize: '16px',
                      fontWeight: 600,
                      color: 'var(--color-error-500)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <LogOut size={18} /> Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
