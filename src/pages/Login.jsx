import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Loader2, Eye, EyeOff, ArrowRight } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#fcfcfd] dark:bg-gray-950">
      
      {/* Left Side: Brand Section */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-24 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
           <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-success-500 rounded-full blur-3xl" />
        </div>

        <div className="mb-12 relative z-10">
          <Logo className="h-10" />
        </div>
        
        <div className="max-w-xl relative z-10">
          <h1 className="text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-8">
            Access your <span className="gradient-text">learning world.</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-12 leading-relaxed">
            Welcome back to the community. Continue your journey with thousands of experts and fellow students dedicated to academic excellence.
          </p>

          <div className="grid grid-cols-2 gap-8">
            <div className="glass-card p-6 border-blue-100/50 dark:border-blue-800/30">
              <p className="text-3xl font-bold text-primary-600 mb-1">24/7</p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Expert Support</p>
            </div>
            <div className="glass-card p-6 border-success-100/50 dark:border-success-800/30">
              <p className="text-3xl font-bold text-success-600 mb-1">50k+</p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Active Learners</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Form Section */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-12 xl:p-24 relative overflow-hidden">
        <div className="w-full max-w-[480px] relative z-10">
          <div className="lg:hidden mb-12 flex justify-center">
            <Logo className="h-10" />
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl shadow-blue-500/5 p-8 md:p-12 border border-gray-50 dark:border-gray-800">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Sign In</h2>
              <Link to="/signup" className="text-sm font-bold text-primary-600 hover:underline">Sign Up</Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field pl-12"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Password</label>
                  <button type="button" className="text-[10px] font-bold text-primary-600 hover:underline uppercase tracking-wider">Forgot Password?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pl-12 pr-12"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                <p className="text-xs text-gray-500 font-medium">Remember me for 30 days</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-4 group"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : (
                  <>
                    <span>Sign In to Account</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10">
              <div className="relative flex items-center justify-center mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100 dark:border-gray-800"></div>
                </div>
                <span className="relative px-4 bg-white dark:bg-gray-900 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Or login with</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={() => signInWithProvider('google')}
                  className="btn-secondary py-3 text-xs flex items-center justify-center gap-2"
                >
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" />
                  Google
                </button>
                <button 
                  type="button"
                  onClick={() => signInWithProvider('apple')}
                  className="btn-secondary py-3 text-xs flex items-center justify-center gap-2"
                >
                  <img src="https://www.svgrepo.com/show/303108/apple-black-logo.svg" className="w-4 h-4 dark:invert" alt="Apple" />
                  Apple
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
