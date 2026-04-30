import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, Calendar, FileText, 
  Users, Globe, Star, ShieldCheck, Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      title: "Verified Teachers",
      desc: "Every educator goes through a rigorous vetting process. We verify academic credentials and teaching experience so you don't have to.",
      icon: <ShieldCheck className="text-primary-600" />,
      bg: "bg-blue-50"
    },
    {
      title: "Flexible Booking",
      desc: "Schedule lessons that fit your life. Whether it's a one-time intensive session or weekly support, we adapt to your calendar.",
      icon: <Calendar className="text-primary-600" />,
      bg: "bg-blue-50"
    },
    {
      title: "PDF Homework Support",
      desc: "Upload your assignments directly. Our teachers can review your work, provide annotations, and guide you through complex problems.",
      icon: <FileText className="text-primary-600" />,
      bg: "bg-blue-50"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-wider">
              <Zap size={14} fill="currentColor" />
              LIGHTNING REVOLUTION
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
              Master Any Subject with <br />
              <span className="text-primary-600">Expert Teachers</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
              Unlock your potential with personalized 1-on-1 sessions. Book instantly, upload your homework for feedback, and excel in your academic journey with our global network of verified educators.
            </p>
            
            <div className="flex flex-wrap gap-4">
              {!user && (
                <Link to="/signup" className="btn-primary text-lg px-8 py-4">
                  Get Started
                </Link>
              )}
              <Link to="/teachers" className="btn-secondary text-lg px-8 py-4">
                Browse Teachers
              </Link>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 bg-gray-200 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/initials/svg?seed=Tutor+${i}&backgroundColor=f1f5f9&textColor=64748b`} alt="Tutor" className="bg-white object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                <span className="text-gray-900 dark:text-white font-bold">3,000+</span> Expert Tutors Online
              </p>
            </div>
          </div>

          <div className="relative animate-in fade-in slide-in-from-right duration-1000">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800">
              <img 
                src="/assets/hero.png" 
                className="w-full h-auto object-cover aspect-[4/3]" 
                alt="Education Team"
              />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 md:-left-12 glass-card p-4 md:p-6 flex items-center gap-4 animate-float max-w-[280px]">
              <div className="w-12 h-12 rounded-xl bg-success-500 flex items-center justify-center text-white">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Next Session</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Mathematics @ 11:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything You Need to Succeed</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-16">
            We've built the most comprehensive platform for modern education, combining human expertise with powerful digital tools.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="card-premium p-8 text-left group animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats/Image Section */}
      <section className="py-20 lg:py-32 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-stretch">
          <div className="relative rounded-3xl overflow-hidden min-h-[400px]">
            <img 
              src="/assets/stats.png" 
              className="absolute inset-0 w-full h-full object-cover" 
              alt="Empowering Students"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10">
              <h3 className="text-3xl font-bold text-white mb-2">Empowering Students Worldwide</h3>
              <p className="text-white/80">Join over 50,000 learners achieving their dreams.</p>
            </div>
          </div>

          <div className="grid gap-8">
            <div className="bg-primary-600 rounded-3xl p-8 text-white flex flex-col justify-between">
              <Star className="text-white/50 mb-8" size={32} />
              <div>
                <p className="text-4xl font-bold mb-1">4.9/5</p>
                <p className="text-white/70 text-sm">Average Tutor Rating</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
               <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl p-8 flex flex-col justify-between">
                  <Globe className="text-gray-400 mb-8" size={32} />
                  <div>
                    <p className="text-4xl font-bold mb-1">15+</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Countries Represented</p>
                  </div>
               </div>
               <div className="bg-success-700 rounded-3xl p-8 text-white flex flex-col justify-between">
                  <Zap className="text-white/50 mb-8" size={32} />
                  <div>
                    <p className="text-lg font-bold mb-2">Instant Connection</p>
                    <p className="text-white/70 text-sm leading-tight">Get matched with a teacher in under 5 minutes for urgent tasks.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
