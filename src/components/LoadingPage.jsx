import React from 'react';
import Logo from './Logo';

const LoadingPage = ({ isExiting, readyToProceed, onProceed }) => {
  return (
    <div 
      onClick={onProceed}
      className={`fixed inset-0 bg-[#16213E] flex flex-col items-center justify-center z-[1000] transition-all duration-1000 ${
        isExiting ? 'opacity-0 blur-3xl pointer-events-none' : 'opacity-100 blur-0'
      } ${readyToProceed ? 'cursor-pointer' : 'cursor-wait'}`}
    >
      {/* Black overlay with low opacity */}
      <div className="absolute inset-0 bg-black/40 z-0" />
      
      <div className="relative z-10 flex flex-col items-center space-y-12 animate-in fade-in zoom-in duration-1000">
        {/* Logo with subtle glow */}
        <div className="relative">
          <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full animate-pulse scale-150" />
          <Logo className="w-48 h-48 relative z-10 animate-bounce" />
        </div>

        {/* Content */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-white tracking-tighter">Dourous-Net</h2>
            <div className="flex items-center justify-center gap-2">
              {!readyToProceed && [0, 1, 2].map((i) => (
                <div 
                  key={i} 
                  className="w-2 h-2 bg-white/40 rounded-full animate-bounce" 
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>

          {/* Prompt text */}
          <div className={`transition-all duration-1000 ${readyToProceed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-white/60 text-sm font-bold uppercase tracking-[0.3em] animate-pulse">
              Click anywhere to continue
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative background elements - very subtle */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-white/[0.01] blur-[120px] rounded-full z-0" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-white/[0.01] blur-[120px] rounded-full z-0" />
    </div>
  );
};

export default LoadingPage;
