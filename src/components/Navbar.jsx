import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Logo from './Logo';
import { LogOut, Sun, Moon, Home as HomeIcon } from 'lucide-react';
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
    <nav className="bg-white/80 dark:bg-[#1f1f1f]/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 group">
              <Logo className="w-12 h-12 group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-bold text-gray-900 dark:text-[#e5e5e5] hidden sm:block">
                Dourous-Net
              </span>
            </Link>
            
            <Link 
              to="/" 
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <HomeIcon size={18} />
              <span className="hidden md:inline">Accueil</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-gray-50 dark:bg-[#2d2d2d] text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all active:scale-90"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="h-6 w-px bg-gray-100 dark:bg-gray-800 mx-1"></div>

            {user ? (
              <div className="flex items-center gap-2 sm:gap-4">
                <Link 
                  to="/dashboard"
                  className="text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-xl border border-transparent hover:border-red-100 dark:hover:border-red-900/30 transition-all"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Déconnexion</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link 
                  to="/login" 
                  className="text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-2 transition-colors"
                >
                  Connexion
                </Link>
                <Link 
                  to="/signup" 
                  className="text-sm font-bold bg-primary-600 text-white px-5 py-2.5 rounded-full hover:bg-primary-700 transition-all active:scale-95 shadow-lg shadow-primary-200 dark:shadow-none"
                >
                  S'inscrire
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
