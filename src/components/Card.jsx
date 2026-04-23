import React from 'react';

export function Card({ title, children, className = '', glow = false }) {
  return (
    <div 
      className={`relative bg-[#0d0d0d]/80 backdrop-blur-xl border border-white/[0.05] rounded-2xl p-5 md:p-6 flex flex-col transition-all duration-500 hover:border-cyan-500/30 group shadow-2xl overflow-hidden ${className}`}
    >
      {/* Linha superior de brilho para dar efeito 3D */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      {/* Efeito de brilho (glow) opcional para os cards principais */}
      {glow && (
         <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500/20 to-transparent rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      )}

      {title && (
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/[0.02] z-10">
          <h3 className="text-cyan-400 font-medium tracking-[0.2em] text-[10px] md:text-xs uppercase flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
            {title}
          </h3>
        </div>
      )}
      <div className="text-neutral-300 flex-1 z-10">
        {children}
      </div>
    </div>
  );
}