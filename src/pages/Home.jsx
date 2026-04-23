import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, BookOpen, ShieldCheck, Users, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden bg-white dark:bg-[#1f1f1f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center lg:text-left grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-bold border border-primary-100 dark:border-primary-800">
                <Star size={16} fill="currentColor" />
                <span>La plateforme N°1 de soutien scolaire</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-gray-900 dark:text-[#e5e5e5]">
                L'excellence académique à <span className="text-primary-600">portée de clic.</span>
              </h1>
              <p className="text-xl text-gray-500 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Réservez des séances avec des professeurs experts, téléchargez vos devoirs et suivez votre progression en temps réel.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                {user ? (
                  <Link to="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold text-lg hover:bg-primary-700 transition-all shadow-xl shadow-primary-200 dark:shadow-none flex items-center justify-center gap-2 group">
                    Mon Dashboard
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <>
                    <Link to="/signup" className="w-full sm:w-auto px-8 py-4 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-xl shadow-gray-200 dark:shadow-none flex items-center justify-center gap-2 group">
                      Commencer maintenant
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-[#2d2d2d] border-2 border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-2xl font-bold text-lg hover:border-primary-100 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-all text-center font-bold">
                      Se connecter
                    </Link>
                  </>
                )}
              </div>
            </div>
            
            <div className="relative hidden lg:block animate-in zoom-in duration-1000 delay-200">
              <div className="absolute -inset-4 bg-primary-400/20 blur-3xl rounded-full"></div>
              <div className="relative bg-white dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-800 rounded-[2.5rem] p-4 shadow-2xl overflow-hidden">
                <div className="bg-gray-50 dark:bg-[#1f1f1f] rounded-[2rem] p-8 aspect-[4/3] flex flex-col justify-center gap-6">
                  <div className="flex items-center gap-4 bg-white dark:bg-[#2d2d2d] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-[#e5e5e5]">Sécurité RLS</div>
                      <div className="text-xs text-gray-500">Données privées garanties</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white dark:bg-[#2d2d2d] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 translate-x-8">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-[#e5e5e5]">Expertise Ciblée</div>
                      <div className="text-xs text-gray-500">Professeurs certifiés</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white dark:bg-[#2d2d2d] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                      <Clock size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-[#e5e5e5]">Flexibilité Totale</div>
                      <div className="text-xs text-gray-500">Réservez selon vos horaires</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-24 bg-gray-50 dark:bg-[#2d2d2d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-primary-600 font-bold text-sm uppercase tracking-widest">Nos Atouts</h2>
            <h3 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-[#e5e5e5]">Pourquoi choisir Dourous-Net ?</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Professeurs Qualifiés", 
                desc: "Une sélection rigoureuse des meilleurs enseignants dans chaque discipline.",
                icon: <Users className="text-blue-600" size={24} />,
                color: "bg-blue-100"
              },
              { 
                title: "Upload PDF Sécurisé", 
                desc: "Partagez vos devoirs en toute sécurité via notre bucket privé Supabase Storage.",
                icon: <ShieldCheck className="text-green-600" size={24} />,
                color: "bg-green-100"
              },
              { 
                title: "Réservation Simple", 
                desc: "Une interface intuitive pour réserver vos séances en quelques secondes.",
                icon: <CheckCircle className="text-purple-600" size={24} />,
                color: "bg-purple-100"
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white dark:bg-[#1f1f1f] p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all">
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-[#e5e5e5]">{feature.title}</h4>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#1f1f1f] border-t border-gray-100 dark:border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-500 dark:text-gray-400">
          <span className="text-xl font-bold text-gray-900 dark:text-[#e5e5e5]">Dourous-Net</span>
          <p className="text-sm">© 2026 Dourous-Net. Tous droits réservés.</p>
          <div className="flex gap-6 text-sm font-bold">
            <a href="#" className="hover:text-primary-600 transition-colors">Contact</a>
            <a href="#" className="hover:text-primary-600 transition-colors">CGU</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
