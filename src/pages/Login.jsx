import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Loader2 } from 'lucide-react';
import Logo from '../components/Logo';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await signIn({ email, password });
      if (error) throw error;
      
      toast.success('Connexion réussie !');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-white dark:bg-[#1f1f1f]">
      <div className="max-w-md w-full bg-white dark:bg-[#2d2d2d] rounded-[2.5rem] shadow-2xl p-10 border border-gray-100 dark:border-gray-800 animate-in fade-in slide-in-from-bottom-8 duration-500">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <Logo className="w-16 h-16" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-[#e5e5e5] tracking-tight">Bon retour !</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Connectez-vous pour accéder à votre espace.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-600 transition-colors" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-[#1f1f1f] border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-[#e5e5e5] focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all font-medium"
                placeholder="nom@exemple.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between ml-1">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">Mot de passe</label>
              <a href="#" className="text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors">Oublié ?</a>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-600 transition-colors" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-[#1f1f1f] border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-[#e5e5e5] focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all font-medium"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 disabled:bg-primary-300 transition-all shadow-xl shadow-primary-200 dark:shadow-none flex items-center justify-center gap-2 active:scale-95"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Se connecter'}
          </button>
        </form>

        <p className="text-center mt-10 text-gray-500 dark:text-gray-400 text-sm font-medium">
          Pas encore de compte ?{' '}
          <Link to="/signup" className="font-bold text-primary-600 hover:text-primary-700 transition-colors underline decoration-2 underline-offset-4">
            S'inscrire gratuitement
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
