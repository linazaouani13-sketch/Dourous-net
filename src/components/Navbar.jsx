import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Logo from './Logo';
import { 
  LogOut, Sun, Moon, Menu, X, 
  LayoutDashboard, Users, CreditCard, Home as HomeIcon 
} from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
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

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Teachers', path: '/teachers' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Pricing', path: '/pricing' },
  ];

  return (
    <>
      <nav className={`fixed w-full z-[100] transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl py-4 shadow-sm border-b border-gray-100/50 dark:border-white/5' 
          : 'bg-transparent py-8'
      }`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center">
            
            <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
              <Logo className="h-9" />
            </Link>

            {/* Desktop Navigation */}
            <div className={`hidden ${!isScrolled ? 'md:flex' : ''} items-center gap-8`}>
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.path 
                      ? 'text-primary-600' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {user ? (
                <div className="hidden md:flex items-center gap-4">
                  <Link 
                    to="/profile"
                    className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                      <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.nom || 'User'}&backgroundColor=f1f5f9&textColor=64748b`} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-full text-gray-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-3">
                  <Link 
                    to="/login" 
                    className="hidden sm:block text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/signup" 
                    className="btn-primary py-2 px-5 text-sm"
                  >
                    Get Started
                  </Link>
                </div>
              )}
              
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[150] md:hidden transition-all duration-300 ${mobileMenuOpen ? 'visible' : 'invisible'}`}>
        <div 
          className={`absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileMenuOpen(false)}
        />
        <div className={`absolute right-0 top-0 h-full w-64 bg-white dark:bg-gray-900 shadow-2xl transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-10">
              <Logo className="h-6" />
              <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            <nav className="space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path}
                  className={`block text-lg font-bold ${
                    location.pathname === link.path ? 'text-primary-600' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-8 border-t border-gray-100 dark:border-gray-800 space-y-4">
                {!user ? (
                  <>
                    <Link to="/login" className="block text-lg font-bold text-gray-600 dark:text-gray-300">Sign In</Link>
                    <Link to="/signup" className="block btn-primary w-full py-3">Get Started</Link>
                  </>
                ) : (
                  <>
                    <Link to="/dashboard" className="block text-lg font-bold text-primary-600">Dashboard</Link>
                    <Link to="/profile" className="block text-lg font-bold text-gray-600 dark:text-gray-300">Profile</Link>
                    <button onClick={handleLogout} className="block text-lg font-bold text-red-600">Sign Out</button>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
