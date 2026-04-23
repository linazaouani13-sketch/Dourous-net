import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';
import Logo from './Logo';
import { LogOut, Sun, Moon, Home } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useUI();
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
    <nav className="bg-white dark:bg-[#1f1f1f] border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Home Link */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 group">
              <Logo className="w-8 h-8 group-hover:scale-110 transition-transform" />
              <span className="text-xl font-bold text-gray-900 dark:text-[#e5e5e5] hidden sm:block">
                Dourous-Net
              </span>
            </Link>
            
            <Link 
              to="/" 
              className="flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Home size={18} />
              <span className="hidden md:inline">Accueil</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-1"></div>

            {user ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/dashboard"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg border border-transparent hover:border-red-100 dark:hover:border-red-900/30 transition-all"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Déconnexion</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  to="/login" 
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors px-2"
                >
                  Connexion
                </Link>
                <Link 
                  to="/signup" 
                  className="text-sm font-bold bg-primary-600 text-white px-5 py-2 rounded-full hover:bg-primary-700 transition-all active:scale-95 shadow-md shadow-primary-200 dark:shadow-none"
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
