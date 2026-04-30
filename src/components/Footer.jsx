import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div className="max-w-xs">
            <Logo className="h-8 mb-4" />
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Empowering education through digital innovation and community-driven learning.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-8 lg:gap-12 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
            <a href="#" className="hover:text-primary-600 transition-colors">Support</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Contact</a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-50 dark:border-gray-800 gap-4">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            © 2026 Dourous-Net. All rights reserved.
          </p>
          <div className="flex gap-4">
             {/* Social placeholders could go here */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
