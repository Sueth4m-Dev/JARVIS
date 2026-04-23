import React from 'react';

export function Layout({ children, activeTab, setActiveTab, onEmergency }) {
  const menuItems = [
    { id: 'home', label: 'Visão Geral', icon: '⌘' },
    { id: 'academia', label: 'Academia', icon: '⚡' },
    { id: 'escola', label: 'Escola', icon: '📚' },
    { id: 'financas', label: 'Finanças', icon: '💳' },
    { id: 'vida', label: 'Vida', icon: '🧬' },
    { id: 'admin', label: 'Sistema', icon: '⚙️' },
  ];

  return (
    <div className="flex flex-col md:flex-row h-[100dvh] bg-[#050505] text-gray-200 font-sans selection:bg-cyan-500/30 overflow-hidden relative">
      
      {/* Header Mobile (Visível apenas em telas pequenas) */}
      <header className="md:hidden flex items-center justify-between p-4 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 z-40 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
          <h1 className="text-lg font-bold tracking-[0.2em] text-white select-none">J.A.R.V.I.S.</h1>
        </div>
        <button 
          onClick={onEmergency}
          className="px-3 py-1.5 text-[10px] font-bold tracking-widest text-red-500 bg-red-500/10 border border-red-500/20 rounded hover:bg-red-500/20 transition-all cursor-pointer"
        >
          [ 00 ]
        </button>
      </header>
      
      {/* Navegação (Bottom Bar no Mobile / Sidebar no Desktop) */}
      <nav className="fixed bottom-0 w-full md:relative md:w-20 lg:w-64 bg-[#0a0a0a]/90 backdrop-blur-xl md:bg-[#0a0a0a] border-t md:border-t-0 md:border-r border-white/5 flex flex-row md:flex-col justify-around md:justify-between transition-all duration-300 z-40 pb-safe md:pb-0">
        <div className="flex flex-row md:flex-col w-full md:w-auto justify-around md:justify-start">
          {/* Logo Desktop */}
          <div className="hidden md:flex h-20 items-center justify-center lg:justify-start lg:px-8 border-b border-white/5">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)] lg:mr-3"></div>
            <h1 className="hidden lg:block text-xl font-bold tracking-[0.2em] text-white select-none">J.A.R.V.I.S.</h1>
          </div>
          
          {/* Links de Navegação */}
          <ul className="flex flex-row md:flex-col gap-1 md:gap-2 p-2 md:p-4 w-full md:w-auto justify-around">
            {menuItems.map(item => (
              <li key={item.id} className="flex-1 md:flex-none">
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex flex-col md:flex-row items-center justify-center lg:justify-start p-2 md:p-3 rounded-xl transition-all duration-300 group ${
                    activeTab === item.id 
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 md:shadow-[inset_0_0_15px_rgba(6,182,212,0.1)]' 
                      : 'text-neutral-500 hover:bg-neutral-900 hover:text-neutral-300 border border-transparent'
                  }`}
                >
                  <span className="text-xl md:text-xl lg:mr-3 mb-1 md:mb-0 group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span className="text-[10px] md:text-xs lg:text-sm font-medium tracking-wide lg:block md:hidden hidden">{item.label}</span>
                  {/* A label no mobile fica minúscula embaixo do ícone, no desktop (lg) fica do lado */}
                  <span className="text-[9px] md:hidden font-medium tracking-wider mt-0.5">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Botão de Emergência (Visível apenas no Desktop, no Mobile já está no topo) */}
        <div className="hidden md:block p-4 border-t border-white/5">
          <button 
            onClick={onEmergency}
            className="w-full flex items-center justify-center lg:justify-start p-3 text-xs font-bold tracking-widest text-red-500 bg-red-500/5 border border-red-500/20 rounded-xl hover:bg-red-500/10 hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all cursor-pointer"
          >
            <span className="text-lg lg:mr-2">⚠</span>
            <span className="hidden lg:block">[PROTOCOLO 00]</span>
          </button>
        </div>
      </nav>

      {/* Área Principal de Conteúdo */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        {/* Fundo Gradiente Sutil */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[500px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full"></div>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-10 scroll-smooth">
          <div className="max-w-6xl mx-auto pb-28 md:pb-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}