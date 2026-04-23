import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Star, BookOpen, ShieldCheck, Users, Clock, 
  CheckCircle, Layout, Search, ShoppingCart, Globe, Menu,
  Play, Book, Award, Users2, BrainCircuit
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import TeacherCard from '../components/TeacherCard';

const Home = () => {
  const { user } = useAuth();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const { data } = await supabase.from('professeurs').select('*').limit(4);
        setTeachers(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-60 bg-navy-900 text-white wavy-bottom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <h1 className="text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
                Learn New Skills Online With Top <span className="text-accent-green">Educators</span>
              </h1>
              <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
                Build skills with courses, certificates, and degrees online from world-class universities and companies.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Link to="/signup" className="w-full sm:w-auto px-8 py-4 bg-primary-600 text-white rounded-xl font-bold text-lg hover:bg-primary-700 transition-all flex items-center justify-center gap-2 group">
                  Join For Free
                </Link>
                <Link to="/dashboard" className="w-full sm:w-auto px-8 py-4 border-2 border-primary-600/50 text-white rounded-xl font-bold text-lg hover:bg-primary-600/10 transition-all flex items-center justify-center gap-2">
                  Find Courses
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-8 pt-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Award size={20} className="text-accent-green" />
                  <span>Over 12 million students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Book size={20} className="text-accent-green" />
                  <span>More than 60,000 courses</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={20} className="text-accent-green" />
                  <span>Learn anything online</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visuals (Abstract representation of the image) */}
            <div className="relative hidden lg:block">
              <div className="relative w-full h-[500px]">
                {/* Floating Elements mimicking the image layout */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-navy-800 rounded-3xl border border-white/10 overflow-hidden animate-float">
                  <div className="p-4 flex flex-col h-full justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-accent-green/20" />
                      <div className="w-24 h-2 bg-white/20 rounded" />
                    </div>
                    <div className="w-full h-32 bg-white/5 rounded-2xl" />
                  </div>
                </div>

                <div className="absolute bottom-10 left-0 w-56 h-40 bg-white dark:bg-navy-800 rounded-3xl border border-white/10 shadow-2xl animate-float-delayed">
                   <div className="p-6 space-y-4">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
                         <Star size={16} />
                       </div>
                       <div>
                         <div className="text-xs font-bold text-gray-900 dark:text-white">Congrats!</div>
                         <div className="text-[10px] text-gray-500">Your admission completed</div>
                       </div>
                     </div>
                   </div>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-primary-600/20 to-navy-900 rounded-[3rem] border border-white/5 backdrop-blur-sm" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-20 bg-white dark:bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 font-bold text-sm mb-12 uppercase tracking-widest">Trusted by the world's best</p>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-2xl font-black italic">amazon</span>
            <span className="text-2xl font-black italic">AMD</span>
            <span className="text-2xl font-black italic">CISCO</span>
            <span className="text-2xl font-black italic">dropcam</span>
            <span className="text-2xl font-black italic">logitech</span>
            <span className="text-2xl font-black italic">Spotify</span>
          </div>
        </div>
      </section>

      {/* Top Categories Section */}
      <section className="py-24 bg-white dark:bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Top Categories</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Graphic Design", icon: <Layout className="text-primary-600" />, courses: 5 },
              { name: "Sales Marketing", icon: <Users2 className="text-primary-600" />, courses: 12 },
              { name: "IT and Software", icon: <BrainCircuit className="text-primary-600" />, courses: 8 },
              { name: "Art & Humanities", icon: <Award className="text-primary-600" />, courses: 4 },
              { name: "Personal Development", icon: <Star className="text-primary-600" />, courses: 15 },
              { name: "Health & Fitness", icon: <ShoppingCart className="text-primary-600" />, courses: 9 },
            ].map((cat, i) => (
              <div key={i} className="bg-gray-50 dark:bg-navy-800 p-8 rounded-3xl text-center hover:bg-white hover:shadow-2xl transition-all border border-transparent hover:border-gray-100 group">
                <div className="w-16 h-16 bg-white dark:bg-navy-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  {cat.icon}
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">{cat.name}</h4>
                <p className="text-xs text-gray-500">{cat.courses} Courses</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12 gap-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-primary-600 w-4' : 'bg-gray-200'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-24 bg-gray-50 dark:bg-navy-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Our Most Popular Courses</h2>
            <p className="text-gray-500">20,000+ unique online course list designs</p>
          </div>

          <div className="flex justify-center gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
            {['All Courses', 'IT & Software', 'Graphic Design', 'Marketing', 'Web Development'].map((tab, i) => (
              <button key={i} className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${i === 0 ? 'bg-primary-600 text-white shadow-lg' : 'bg-white dark:bg-navy-800 text-gray-600 hover:bg-gray-100'}`}>
                {tab}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teachers.map(teacher => (
              <TeacherCard key={teacher.id} teacher={teacher} onBook={() => window.location.href = '/dashboard'} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 text-white py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center font-black">D</div>
            <span className="text-2xl font-bold">Dourous-Net</span>
          </div>
          <div className="flex gap-12 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#" className="hover:text-white transition-colors">Courses</a>
            <a href="#" className="hover:text-white transition-colors">Teachers</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-sm text-gray-500 italic">© 2026 Dourous-Net. L'éducation réinventée.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
