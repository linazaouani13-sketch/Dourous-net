import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Logo from './Logo';
import { 
  LogOut, Sun, Moon, Home as HomeIcon, 
  Search, ShoppingCart, Layout, Menu, ChevronDown 
} from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Déconnexion réussie');
      navigate('/');
    } catch (error) {
      toast.error('Erreur lors de la déconnexion');
    }
  };

  return (
    <nav className="fixed w-full z-[100] transition-all duration-300 bg-navy-900/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Left: Logo & Explore */}
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-3 group">
              <Logo className="w-10 h-10 group-hover:rotate-12 transition-transform" />
              <span className="text-2xl font-black text-white tracking-tighter">
                Educrat
              </span>
            </Link>

            <button className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-white text-sm font-bold transition-all border border-white/10">
              <Layout size={18} className="text-accent-green" />
              Explore
            </button>
          </div>

          {/* Center: Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {['Home', 'Courses', 'Blog', 'Shop', 'Pages', 'Contact'].map((item) => (
              <Link 
                key={item}
                to={item === 'Home' ? '/' : '#'}
                className="flex items-center gap-1 text-[13px] font-bold text-gray-300 hover:text-white transition-colors"
              >
                {item}
                {item !== 'Contact' && <ChevronDown size={14} className="opacity-50" />}
              </Link>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-4 text-white opacity-70 hover:opacity-100 transition-opacity">
              <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <Search size={20} />
              </button>
              <div className="relative p-2 hover:bg-white/5 rounded-full transition-colors cursor-pointer">
                <ShoppingCart size={20} />
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary-600 rounded-full text-[10px] flex items-center justify-center font-bold">0</span>
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 transition-all active:scale-90 border border-white/10"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="h-6 w-px bg-white/10 mx-1"></div>

            {user ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/dashboard"
                  className="text-sm font-bold text-white hover:text-accent-green transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  to="/login" 
                  className="text-sm font-bold text-white hover:text-accent-green transition-colors"
                >
                  Log In
                </Link>
                <Link 
                  to="/signup" 
                  className="text-sm font-bold bg-white text-navy-900 px-6 py-2.5 rounded-xl hover:bg-accent-green hover:text-navy-900 transition-all active:scale-95 shadow-xl shadow-black/20"
                >
                  Sign Up
                </Link>
              </div>
            )}
            
            <button className="lg:hidden p-2 text-white">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
