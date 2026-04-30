import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Loader2, Eye, EyeOff, User, GraduationCap, ArrowRight } from 'lucide-react';
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
        // Create profile based on role
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#fcfcfd] dark:bg-gray-950">
      
      {/* Left Side: Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-24 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800">
        <div className="mb-12">
          <Logo className="h-10" />
        </div>
        
        <div className="max-w-xl">
          <h1 className="text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-8">
            Master new skills with <span className="gradient-text">expert guidance.</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-12 leading-relaxed">
            Join over 50,000 students and teachers in a modern ecosystem designed for high-impact educational growth and collaborative learning.
          </p>

          <div className="relative mb-12 group">
            <div className="absolute -inset-4 bg-primary-500/5 rounded-3xl blur-2xl group-hover:bg-primary-500/10 transition-all" />
            <img 
              src="/signup_hero_image_1777483607765.png" 
              alt="Students learning" 
              className="relative w-full rounded-2xl shadow-2xl"
            />
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">1.2k+</p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Verified Teachers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">450+</p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Daily Sessions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">98%</p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Form Section */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-12 xl:p-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 dark:bg-blue-900/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-50/50 dark:bg-purple-900/10 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2" />

        <div className="w-full max-w-[480px] relative z-10">
          <div className="lg:hidden mb-12 flex justify-center">
            <Logo className="h-10" />
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl shadow-blue-500/5 p-8 md:p-12 border border-gray-50 dark:border-gray-800">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create Account</h2>
              <Link to="/login" className="text-sm font-bold text-primary-600 hover:underline">Log In</Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="input-field pl-12"
                    placeholder="John Doe"
                  />
                </div>
              </div>

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
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">I am a...</label>
                <div className="relative">
                  <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="input-field pl-12 appearance-none bg-no-repeat bg-[right_1rem_center]"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
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
                <p className="text-[10px] text-gray-400 font-medium ml-1">Must be at least 8 characters with a number and symbol.</p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input type="checkbox" required className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                <p className="text-xs text-gray-500">
                  I agree to the <a href="#" className="text-primary-600 font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-primary-600 font-bold hover:underline">Privacy Policy</a>.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-4 group"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : (
                  <>
                    <span>Create My Account</span>
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
                <span className="relative px-4 bg-white dark:bg-gray-900 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Or sign up with</span>
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

export default Signup;
