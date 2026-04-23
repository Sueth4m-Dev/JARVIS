import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Card } from './components/Card';

function App() {
  // Estado que guarda qual tela está aberta
  const [activeTab, setActiveTab] = useState('home');
  // Estado para o Protocolo de Emergência Anti-Stress
  const [isEmergency, setIsEmergency] = useState(false);
  // Estado para o filtro de transações (Finanças)
  const [filtroTransacoes, setFiltroTransacoes] = useState('todas');
  // Estado para os objetivos do Cofre Mágico
  const [cofreObjetivos, setCofreObjetivos] = useState([
    { id: 1, nome: 'PC Gamer Novo', icon: '💻', atual: 1200, meta: 5000 }
  ]);
  // Estado para os Eventos do Radar (Escola)
  const [radarEventos, setRadarEventos] = useState([
    { id: 1, tipo: 'prova', titulo: 'Matemática - Prova Bimestral', detalhes: 'Geometria Espacial e Matrizes', prazo: 'Faltam 3 dias' },
    { id: 2, tipo: 'trabalho', titulo: 'História - Trabalho em Grupo', detalhes: 'Com: João, Maria e Pedro', prazo: 'Dia 25/11' }
  ]);

  // Estado para a Rotina Semanal
  const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  const [diaRotina, setDiaRotina] = useState('Segunda');
  const [rotinaEventos, setRotinaEventos] = useState([
    { id: 1, dia: 'Segunda', horario: '06:00 - 07:00', titulo: 'Devocional & Leitura Bíblica', destaque: true },
    { id: 2, dia: 'Segunda', horario: '07:30 - 12:30', titulo: 'Escola (Aulas Regulares)', destaque: false },
    { id: 3, dia: 'Segunda', horario: '16:00 - 17:30', titulo: 'Academia (Treino)', destaque: false }
  ]);
  // Estado para a Bucket List
  const [bucketList, setBucketList] = useState([
    { id: 1, titulo: 'Assistir Filme Interstellar' }, { id: 2, titulo: 'Jogar RDR2' }, { id: 3, titulo: 'Aprender React Native' }
  ]);

  // Lógicas do Cofre Mágico
  const adicionarObjetivo = () => {
    const nome = prompt('Qual o nome do novo objetivo? (ex: Viagem, Carro)');
    if (!nome) return;
    const metaStr = prompt('Qual o valor da meta em R$? (ex: 2000)');
    if (!metaStr) return;
    const meta = parseFloat(metaStr.replace(',', '.'));
    if (isNaN(meta)) return alert('Valor inválido!');
    const icon = prompt('Digite um emoji para o objetivo:') || '🎯';

    setCofreObjetivos([...cofreObjetivos, { id: Date.now(), nome, icon, atual: 0, meta }]);
  };

  const removerObjetivo = (id) => {
    if (window.confirm('Tem certeza que deseja apagar este objetivo do cofre?')) {
      setCofreObjetivos(cofreObjetivos.filter(obj => obj.id !== id));
    }
  };

  // Lógicas do Radar de Eventos (Escola)
  const adicionarEventoRadar = () => {
    const tipoStr = prompt('Qual o tipo do evento?\nDigite 1 para Prova\nDigite 2 para Trabalho');
    if (!tipoStr) return;
    const tipo = tipoStr === '1' ? 'prova' : 'trabalho';
    const titulo = prompt('Qual a matéria e o título? (ex: Física - Prova Final)');
    if (!titulo) return;
    const detalhes = prompt('Quais os detalhes? (ex: Capítulos 1 a 3, ou Nome do grupo)');
    const prazo = prompt('Qual o prazo final? (ex: Faltam 2 dias, ou Dia 30/11)');
    if (!prazo) return;

    setRadarEventos([...radarEventos, { id: Date.now(), tipo, titulo, detalhes, prazo }]);
  };

  const removerEventoRadar = (id) => {
    if (window.confirm('Tem certeza que deseja remover este evento do radar?')) {
      setRadarEventos(radarEventos.filter(ev => ev.id !== id));
    }
  };

  // Lógicas da Vida (Rotina e Bucket List)
  const adicionarEventoRotina = () => {
    const horario = prompt(`Qual o horário na ${diaRotina}? (ex: 18:00 - 19:00)`);
    if (!horario) return;
    const titulo = prompt('O que você vai fazer?');
    if (!titulo) return;
    const destaque = window.confirm('Deseja dar destaque a este evento? (OK para Sim, Cancelar para Não)');
    
    const novoEvento = { id: Date.now(), dia: diaRotina, horario, titulo, destaque };
    
    // Adiciona e ordena automaticamente pelo horário
    const novaRotina = [...rotinaEventos, novoEvento].sort((a, b) => a.horario.localeCompare(b.horario));
    
    setRotinaEventos(novaRotina);
  };

  const removerEventoRotina = (id) => {
    if (window.confirm('Deseja remover este evento da sua rotina?')) {
      setRotinaEventos(rotinaEventos.filter(ev => ev.id !== id));
    }
  };

  const adicionarBucketList = () => {
    const titulo = prompt('O que você quer fazer no seu tempo livre?');
    if (titulo) setBucketList([...bucketList, { id: Date.now(), titulo }]);
  };

  const executarBucketList = (id) => {
    setBucketList(bucketList.filter(item => item.id !== id));
  };

  // --- PÁGINA: VISÃO GERAL ---
  const HomeView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2 flex flex-col gap-4 md:gap-6">
        <Card title="Resumo do Dia" glow>
          <h2 className="text-3xl md:text-4xl font-extralight text-white mb-2 tracking-tight">Bom dia, Senhor.</h2>
          <p className="text-neutral-500 text-sm mb-8">Sistemas operacionais. Aqui está o seu status atualizado.</p>
          
          {/* Cards de Status Transformados em Botões de Navegação */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div onClick={() => setActiveTab('academia')} className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all cursor-pointer group">
              <p className="text-[10px] text-neutral-500 tracking-widest uppercase mb-1 flex justify-between">Treino <span className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity">➜</span></p>
              <p className="text-base md:text-lg text-white font-light">Peito & Tríceps</p>
              <p className="text-xs text-cyan-500 mt-2">Hoje, 16:00 h</p>
            </div>
            <div onClick={() => setActiveTab('escola')} className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:border-yellow-500/30 hover:bg-yellow-500/5 transition-all cursor-pointer group">
              <p className="text-[10px] text-neutral-500 tracking-widest uppercase mb-1 flex justify-between">Escola <span className="text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity">➜</span></p>
              <p className="text-base md:text-lg text-white font-light">Física - Prova</p>
              <p className="text-xs text-yellow-500 mt-2">Amanhã</p>
            </div>
            <div onClick={() => setActiveTab('vida')} className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:border-green-500/30 hover:bg-green-500/5 transition-all cursor-pointer group">
              <p className="text-[10px] text-neutral-500 tracking-widest uppercase mb-1 flex justify-between">Hábitos <span className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">➜</span></p>
              <p className="text-base md:text-lg text-white font-light">3 / 5</p>
              <p className="text-xs text-green-500 mt-2">Na ofensiva</p>
            </div>
            <div onClick={() => setActiveTab('financas')} className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:border-red-500/30 hover:bg-red-500/5 transition-all cursor-pointer group">
              <p className="text-[10px] text-neutral-500 tracking-widest uppercase mb-1 flex justify-between">Finanças <span className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">➜</span></p>
              <p className="text-base md:text-lg text-white font-light">R$ 450,00</p>
              <p className="text-xs text-red-500 mt-2">Disponível</p>
            </div>
          </div>
        </Card>

        {/* Nova Seção de Acesso Direto para Facilitar a Navegação */}
        <Card title="Acesso Direto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <button onClick={() => setActiveTab('financas')} className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all flex flex-col items-center justify-center gap-3 group">
              <span className="text-3xl group-hover:scale-110 transition-transform">💰</span>
              <span className="text-[10px] text-neutral-300 uppercase tracking-widest font-bold mt-1">Finanças</span>
            </button>
            <button onClick={() => setActiveTab('escola')} className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all flex flex-col items-center justify-center gap-3 group">
              <span className="text-3xl group-hover:scale-110 transition-transform">📚</span>
              <span className="text-[10px] text-neutral-300 uppercase tracking-widest font-bold mt-1">Notas</span>
            </button>
            <button onClick={() => setActiveTab('academia')} className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all flex flex-col items-center justify-center gap-3 group">
              <span className="text-3xl group-hover:scale-110 transition-transform">⚡</span>
              <span className="text-[10px] text-neutral-300 uppercase tracking-widest font-bold mt-1">Treino</span>
            </button>
            <button onClick={() => setActiveTab('vida')} className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all flex flex-col items-center justify-center gap-3 group">
              <span className="text-3xl group-hover:scale-110 transition-transform">📅</span>
              <span className="text-[10px] text-neutral-300 uppercase tracking-widest font-bold mt-1">Rotina</span>
            </button>
          </div>
        </Card>

        <Card title="Log de Hábitos Rápido">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { nome: 'Ler a Bíblia', feito: true },
              { nome: 'Arrumar a cama', feito: true },
              { nome: 'Estudar', feito: false },
              { nome: '3L Água', feito: false },
            ].map((habito, index) => (
              <div key={index} className="flex flex-col items-center justify-center p-4 bg-white/[0.02] rounded-xl border border-white/[0.05] hover:border-cyan-500/30 hover:bg-cyan-500/5 cursor-pointer transition-all duration-300">
                <div className={`w-8 h-8 rounded-full border-2 mb-3 flex items-center justify-center transition-all duration-500 ${habito.feito ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'border-neutral-800'}`}>
                    {habito.feito && <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>}
                </div>
                <span className={`text-[10px] md:text-[11px] text-center uppercase tracking-wider ${habito.feito ? 'text-white font-medium' : 'text-neutral-500'}`}>
                  {habito.nome}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="flex flex-col gap-4 md:gap-6">
        <Card title="Lembretes">
          <ul className="space-y-4">
            <li className="flex gap-3 items-start">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_5px_rgba(6,182,212,0.8)]"></div>
              <div>
                <p className="text-sm text-white">Comprar Whey Protein</p>
                <p className="text-[10px] text-neutral-500 mt-1 uppercase tracking-wider">Acaba em 2 dias</p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_5px_rgba(6,182,212,0.8)]"></div>
              <div>
                <p className="text-sm text-white">Entregar formulário</p>
                <p className="text-[10px] text-neutral-500 mt-1 uppercase tracking-wider">Diretoria da escola</p>
              </div>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );

  // --- PÁGINA: ACADEMIA ---
  const AcademiaView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      <Card title="Live Workout" glow className="lg:col-span-2">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center bg-cyan-950/10 p-6 md:p-8 rounded-2xl border border-cyan-500/20 gap-6 md:gap-0">
          <div>
            <p className="text-cyan-500 tracking-[0.2em] text-xs font-bold mb-2 uppercase animate-pulse">Em andamento</p>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-2">Peito & Tríceps</h2>
            <p className="text-neutral-400">Exercício Atual: <span className="text-white font-medium">Supino Reto</span></p>
          </div>
          <div className="md:text-right border-t md:border-t-0 border-cyan-500/10 pt-4 md:pt-0">
            <p className="text-[10px] text-neutral-500 tracking-widest uppercase mb-1">Descanso</p>
            <p className="text-4xl md:text-5xl font-extralight text-cyan-400 font-mono tracking-tighter">01:15</p>
          </div>
        </div>
      </Card>
      
      <Card title="Mapa de Consistência">
        <div className="flex flex-wrap gap-1 md:gap-1.5 mt-2 md:mt-4">
            {Array.from({ length: 90 }).map((_, i) => (
              <div key={i} className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-[2px] ${Math.random() > 0.3 ? 'bg-cyan-500/80 shadow-[0_0_4px_rgba(6,182,212,0.5)]' : 'bg-white/[0.05]'}`}></div>
            ))}
        </div>
        <p className="text-[10px] text-neutral-500 mt-4 text-right uppercase tracking-wider">Últimos 90 dias</p>
      </Card>

      <Card title="Recordes Pessoais (PRs)">
        <ul className="space-y-3">
          <li className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl flex justify-between items-center">
            <span className="text-sm text-neutral-300">Supino Reto</span>
            <span className="text-sm text-cyan-400 font-bold">40 kg</span>
          </li>
          <li className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl flex justify-between items-center">
            <span className="text-sm text-neutral-300">Leg Press</span>
            <span className="text-sm text-cyan-400 font-bold">200 kg</span>
          </li>
        </ul>
      </Card>

      <Card title="Evolução do Peso Corporal">
        <div className="flex items-end h-28 gap-2 md:gap-4 mt-2">
          {/* Barras do Gráfico (Mock) */}
          {[73.5, 74.0, 74.2, 74.8, 75.5, 76.2].map((peso, i) => (
            <div key={i} className="flex-1 bg-cyan-500/20 rounded-t-md relative group flex justify-center hover:bg-cyan-500/40 transition-colors" style={{ height: `${(peso - 70) * 12}%` }}>
               <span className="absolute -top-6 text-[10px] text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity font-bold">{peso}kg</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-neutral-500 mt-2 border-t border-white/5 pt-2 tracking-widest">
           <span>Jul</span>
           <span>Ago</span>
           <span>Set</span>
           <span>Out</span>
           <span>Nov</span>
        </div>
      </Card>
    </div>
  );

  // --- PÁGINA: ESCOLA ---
  const EscolaView = () => (
    <div className="flex flex-col gap-4 md:gap-6">
      
      {/* Linha Superior: Resumo e Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        
        {/* Status Acadêmico (Holográfico) */}
        <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-blue-500/50 via-white/5 to-transparent group overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
          <div className="bg-[#0a0a0a] rounded-2xl p-6 h-full flex flex-col justify-between relative z-10 backdrop-blur-xl">
             <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] text-blue-500 tracking-widest uppercase mb-1">Média Global</p>
                  <p className="text-4xl md:text-5xl font-light text-white">82<span className="text-xl text-neutral-500">%</span></p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xl">
                  🎓
                </div>
             </div>
             <div className="mt-6">
                <div className="flex justify-between text-[10px] uppercase tracking-widest mb-2 text-neutral-400">
                  <span>Aproveitamento</span>
                  <span className="text-blue-400 font-bold tracking-widest">Excelente</span>
                </div>
                <div className="w-full bg-white/[0.05] rounded-full h-1.5 mb-2">
                  <div className="bg-blue-500 h-1.5 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]" style={{ width: '82%' }}></div>
                </div>
                <p className="text-[9px] text-neutral-500 tracking-widest uppercase mt-3">Situação: Aprovado na maioria das disciplinas</p>
             </div>
          </div>
        </div>

        {/* Radar de Eventos */}
        <Card title="Radar de Eventos" className="lg:col-span-2">
          <div className="space-y-3">
            {radarEventos.map(evento => {
              const isProva = evento.tipo === 'prova';
              return (
                <div key={evento.id} className={`relative flex flex-col md:flex-row md:items-center justify-between p-3 md:p-4 rounded-xl gap-3 md:gap-0 group transition-colors ${isProva ? 'bg-yellow-500/5 border border-yellow-500/20 hover:bg-yellow-500/10' : 'bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/30'}`}>
                  <button 
                     onClick={() => removerEventoRadar(evento.id)}
                     className="absolute -right-2 -top-2 w-6 h-6 bg-red-500/10 text-red-500 rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-red-500/30 hover:bg-red-500 hover:text-white z-10"
                     title="Remover evento"
                  >
                     ✕
                  </button>
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isProva ? 'bg-yellow-500/20 text-yellow-500' : 'bg-white/5 text-neutral-400'}`}>
                      {isProva ? '📝' : '👥'}
                    </div>
                    <div>
                      <h4 className={`text-sm font-medium mb-0.5 ${isProva ? 'text-yellow-500' : 'text-neutral-200'}`}>{evento.titulo}</h4>
                      <p className="text-[10px] text-neutral-400 uppercase tracking-wider">{evento.detalhes}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                     <span className={`text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-lg border tracking-wider uppercase w-fit ${isProva ? 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20 animate-pulse' : 'text-neutral-400 bg-white/5 border-white/10 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-colors'}`}>
                       {evento.prazo}
                     </span>
                  </div>
                </div>
              );
            })}
            {radarEventos.length === 0 && (
              <p className="text-xs text-neutral-500 text-center py-4">Radar limpo. Nenhum evento próximo.</p>
            )}
          </div>
          <button 
            onClick={adicionarEventoRadar}
            className="w-full mt-4 py-3 bg-white/[0.02] border border-white/[0.05] rounded-xl text-[10px] font-bold text-neutral-400 uppercase tracking-widest hover:border-cyan-500/30 hover:text-cyan-400 transition-all"
          >
            + Adicionar ao Radar
          </button>
        </Card>
      </div>

      {/* Linha Inferior: Boletim e Ferramentas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        
        {/* Boletim / Notas */}
        <Card title="Boletim Analítico" className="lg:col-span-2">
           <div className="space-y-4">
              {[
                { materia: 'Física', nota: 24, total: 30, max: 100, status: 'Na média', color: 'bg-green-500' },
                { materia: 'Química', nota: 12, total: 30, max: 100, status: 'Atenção', color: 'bg-yellow-500' },
                { materia: 'Literatura', nota: 28, total: 30, max: 100, status: 'Excelente', color: 'bg-blue-500' }
              ].map((disc, i) => (
                <div key={i} className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:border-white/10 transition-colors group">
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <h4 className="text-sm md:text-base font-medium text-neutral-200">{disc.materia}</h4>
                      <p className="text-[10px] text-neutral-500 tracking-widest uppercase mt-1">Status: <span className={disc.color.replace('bg-', 'text-')}>{disc.status}</span></p>
                    </div>
                    <div className="text-right">
                       <span className="text-xl md:text-2xl font-light text-white">{disc.nota} <span className="text-xs text-neutral-500 font-sans">/ {disc.total} pts</span></span>
                    </div>
                  </div>
                  
                  <div className="relative w-full bg-white/[0.05] rounded-full h-1.5 mb-2 overflow-hidden">
                     <div className={`${disc.color} h-1.5 rounded-full absolute top-0 left-0 shadow-[0_0_8px_currentColor] opacity-80`} style={{ width: `${(disc.nota / disc.max) * 100}%` }}></div>
                     <div className="bg-white/10 h-1.5 rounded-full absolute top-0 left-0 -z-10" style={{ width: `${(disc.total / disc.max) * 100}%` }}></div>
                  </div>
                  
                  <div className="flex justify-between text-[9px] text-neutral-500 uppercase tracking-widest mt-3">
                     <span>Total distribuído no ano: {disc.total} / {disc.max}</span>
                     <span className="font-bold">{60 - disc.nota > 0 ? `Faltam ${60 - disc.nota} pts para passar` : 'Aprovado! 🎉'}</span>
                  </div>
                </div>
              ))}
           </div>
           <button className="w-full mt-5 py-3 bg-white/[0.02] border border-white/[0.05] rounded-xl text-[10px] font-bold text-neutral-400 uppercase tracking-widest hover:border-cyan-500/30 hover:text-cyan-400 transition-all">
             + Lançar Nova Nota
           </button>
        </Card>

        <div className="flex flex-col gap-4 md:gap-6">
          {/* Launchpad */}
          <Card title="Launchpad">
            <div className="grid grid-cols-2 gap-3">
              {[
                { nome: 'Classroom', icon: '🏫' },
                { nome: 'Portal', icon: '🌐' },
                { nome: 'Gemini', icon: '✨' },
                { nome: 'Drive', icon: '📁' }
              ].map((site, i) => (
                 <button key={i} className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all flex flex-col items-center gap-3 group">
                    <span className="text-2xl group-hover:scale-110 transition-transform">{site.icon}</span>
                    <span className="text-[9px] md:text-[10px] text-neutral-300 uppercase tracking-widest font-bold">{site.nome}</span>
                 </button>
              ))}
            </div>
          </Card>

          {/* Dúvidas */}
          <Card title="Depósito de Dúvidas">
              <textarea 
                placeholder="Esqueci como calcula matriz inversa... perguntar ao professor amanhã." 
                className="w-full h-28 bg-black/20 border border-white/[0.1] rounded-xl p-4 text-xs text-neutral-300 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none placeholder:text-neutral-600"
              ></textarea>
              <button className="w-full mt-3 py-3 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-xl text-[10px] font-bold tracking-widest uppercase hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all">
                Guardar Dúvida
              </button>
          </Card>
        </div>
      </div>
    </div>
  );

  // --- PÁGINA: FINANÇAS ---
  const FinancasView = () => (
    <div className="flex flex-col gap-4 md:gap-6">
      
      {/* Linha Superior: Cartão Digital e Ações Rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        
        {/* Cartão JARVIS (Holográfico) */}
        <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-cyan-500/50 via-white/5 to-transparent group overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
          <div className="bg-[#0a0a0a] rounded-2xl p-6 h-full flex flex-col justify-between relative z-10 backdrop-blur-xl">
             <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] text-cyan-500 tracking-widest uppercase mb-1">Saldo Disponível</p>
                  <p className="text-3xl md:text-4xl font-light text-white">R$ 450,00</p>
                </div>
                {/* Chip do Cartão */}
                <div className="w-8 h-6 rounded bg-white/10 border border-white/20 flex items-center justify-center">
                   <div className="w-4 h-3 border border-white/10 rounded-sm"></div>
                </div>
             </div>
             <div className="mt-8 flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest mb-1">Titular</p>
                  <p className="text-xs md:text-sm text-neutral-200 tracking-[0.2em] uppercase">MATHEUS</p>
                </div>
                {/* Símbolo de Bandeira Mock (Bolas sobrepostas) */}
                <div className="flex">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/50 mix-blend-screen"></div>
                  <div className="w-6 h-6 rounded-full bg-blue-500/50 mix-blend-screen -ml-3"></div>
                </div>
             </div>
          </div>
        </div>

        {/* Resumo de Fluxo (Entradas e Saídas) */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4 md:gap-6">
          <Card className="flex flex-col justify-between">
            <div>
               <p className="text-[10px] text-green-500 tracking-widest uppercase mb-1">Entradas (Mês)</p>
               <p className="text-2xl md:text-3xl font-light text-white mb-2">R$ 600,00</p>
            </div>
            <button className="w-full py-3 mt-4 bg-green-500/10 text-green-500 border border-green-500/20 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-green-500 hover:text-black hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all">
              + Receita
            </button>
          </Card>
          <Card className="flex flex-col justify-between">
            <div>
               <p className="text-[10px] text-red-500 tracking-widest uppercase mb-1">Saídas (Mês)</p>
               <p className="text-2xl md:text-3xl font-light text-white mb-2">R$ 150,00</p>
            </div>
            <button className="w-full py-3 mt-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all">
              - Despesa
            </button>
          </Card>
        </div>
      </div>

      {/* Linha Inferior: Histórico e Metas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        
        {/* Histórico de Transações */}
        <Card title="Histórico de Transações" className="lg:col-span-2">
          {/* Filtros de Histórico */}
          <div className="flex gap-2 mb-5 border-b border-white/5 pb-5 overflow-x-auto snap-x hidden-scrollbar">
            <button 
              onClick={() => setFiltroTransacoes('todas')}
              className={`snap-center px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-all ${
                filtroTransacoes === 'todas' 
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                  : 'bg-transparent text-neutral-500 hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              Todas
            </button>
            <button 
              onClick={() => setFiltroTransacoes('entrada')}
              className={`snap-center px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-all ${
                filtroTransacoes === 'entrada' 
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                  : 'bg-transparent text-neutral-500 hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              Entradas
            </button>
            <button 
              onClick={() => setFiltroTransacoes('saida')}
              className={`snap-center px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-all ${
                filtroTransacoes === 'saida' 
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                  : 'bg-transparent text-neutral-500 hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              Saídas
            </button>
          </div>

          <div className="space-y-3">
            {[
              { desc: 'Mensalidade Spotify', cat: 'Assinaturas', valor: '- R$ 21,90', tipo: 'saida', data: 'Hoje, 09:41' },
              { desc: 'Mesada / Projeto Freelance', cat: 'Renda', valor: '+ R$ 250,00', tipo: 'entrada', data: 'Ontem, 14:20' },
              { desc: 'Lanche na Escola', cat: 'Alimentação', valor: '- R$ 15,00', tipo: 'saida', data: '12 de Nov' },
              { desc: 'Ingresso Cinema', cat: 'Lazer', valor: '- R$ 35,00', tipo: 'saida', data: '10 de Nov' },
            ].filter(t => filtroTransacoes === 'todas' || t.tipo === filtroTransacoes).map((t, i) => (
              <div key={i} className="flex justify-between items-center p-3 md:p-4 bg-white/[0.02] rounded-xl border border-white/[0.05] hover:border-cyan-500/20 transition-colors group cursor-default">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm shrink-0 transition-transform group-hover:scale-110 ${t.tipo === 'entrada' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {t.tipo === 'entrada' ? '↑' : '↓'}
                  </div>
                  <div>
                    <span className="text-xs md:text-sm text-neutral-200 block mb-0.5">{t.desc}</span>
                    <div className="flex items-center gap-2">
                       <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-neutral-400 uppercase tracking-widest">{t.cat}</span>
                       <span className="text-[9px] text-neutral-600 uppercase tracking-widest">{t.data}</span>
                    </div>
                  </div>
                </div>
                <span className={`text-xs md:text-sm font-mono font-medium whitespace-nowrap ${t.tipo === 'entrada' ? 'text-green-400' : 'text-neutral-400'}`}>
                  {t.valor}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-[10px] font-bold text-neutral-500 uppercase tracking-widest hover:text-cyan-400 transition-colors">
            Ver Relatório Completo ➜
          </button>
        </Card>

        {/* Metas e Limites */}
        <div className="flex flex-col gap-4 md:gap-6">
           
          {/* Cofre / Objetivos de Economia */}
          <Card title="Cofre Mágico" glow>
             <div className="space-y-6">
               {cofreObjetivos.map(obj => (
                 <div key={obj.id} className="group relative">
                   {/* Botão de Remover (Aparece ao passar o mouse) */}
                   <button 
                     onClick={() => removerObjetivo(obj.id)}
                     className="absolute -right-2 -top-2 w-6 h-6 bg-red-500/10 text-red-500 rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-red-500/30 hover:bg-red-500 hover:text-white z-10"
                     title="Remover objetivo"
                   >
                     ✕
                   </button>
                   
                   <div className="flex justify-between items-start mb-3">
                     <div>
                       <h4 className="text-white text-sm md:text-base font-light">{obj.nome}</h4>
                       <p className="text-[10px] text-cyan-500 uppercase tracking-widest mt-1">
                         R$ {obj.atual.toLocaleString('pt-BR')} / R$ {obj.meta.toLocaleString('pt-BR')}
                       </p>
                     </div>
                     <div className="text-2xl bg-cyan-500/10 p-2 rounded-xl border border-cyan-500/20">{obj.icon}</div>
                   </div>
                   <div className="w-full bg-white/[0.05] rounded-full h-2 mb-3">
                      <div className="bg-cyan-500 h-2 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.6)] transition-all duration-500" style={{ width: `${Math.min((obj.atual / obj.meta) * 100, 100)}%` }}></div>
                   </div>
                   <button 
                     onClick={() => {
                       const valorStr = prompt(`Quanto deseja guardar para ${obj.nome}?`);
                       if (!valorStr) return;
                       const valor = parseFloat(valorStr.replace(',', '.'));
                       if (!isNaN(valor)) setCofreObjetivos(cofreObjetivos.map(o => o.id === obj.id ? { ...o, atual: o.atual + valor } : o));
                     }}
                     className="w-full py-2 bg-white/[0.02] border border-white/[0.05] rounded-xl text-[10px] font-bold text-neutral-400 uppercase tracking-widest hover:border-cyan-500/30 hover:text-cyan-400 transition-all"
                   >
                     + Guardar Dinheiro
                   </button>
                 </div>
               ))}
               
               {cofreObjetivos.length === 0 && (
                 <p className="text-xs text-neutral-500 text-center py-2">Nenhum objetivo definido.</p>
               )}

               <button 
                 onClick={adicionarObjetivo}
                 className="w-full py-3 mt-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-[10px] font-bold text-cyan-400 uppercase tracking-widest hover:bg-cyan-500 hover:text-black transition-all"
               >
                 + Novo Objetivo
               </button>
             </div>
          </Card>

          {/* Orçamento (Budget) */}
          <Card title="Orçamento do Mês">
             <div className="space-y-5">
               <div>
                 <div className="flex justify-between text-[10px] uppercase tracking-widest mb-2">
                   <span className="text-neutral-400">Lazer & Alimentação</span>
                   <span className="text-orange-500 font-mono">R$ 50 / 150</span>
                 </div>
                 <div className="w-full bg-white/[0.05] rounded-full h-1.5">
                   <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '33%' }}></div>
                 </div>
               </div>
               <div>
                 <div className="flex justify-between text-[10px] uppercase tracking-widest mb-2">
                   <span className="text-neutral-400">Assinaturas</span>
                   <span className="text-purple-500 font-mono">R$ 21,90 / 30</span>
                 </div>
                 <div className="w-full bg-white/[0.05] rounded-full h-1.5">
                   <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '73%' }}></div>
                 </div>
               </div>
             </div>
          </Card>

        </div>
      </div>
    </div>
  );

  // --- PÁGINA: VIDA ---
  const VidaView = () => (
    <div className="flex flex-col gap-4 md:gap-6">
      
      {/* Linha Superior */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        
        {/* Status Vital (Holográfico) */}
        <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-green-500/50 via-white/5 to-transparent group overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
          <div className="bg-[#0a0a0a] rounded-2xl p-6 h-full flex flex-col justify-between relative z-10 backdrop-blur-xl">
             <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] text-green-500 tracking-widest uppercase mb-1">Status Vital</p>
                  <p className="text-4xl md:text-5xl font-light text-white">Equilibrado</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-xl">
                  🧬
                </div>
             </div>
             <div className="mt-8 space-y-3">
                <div>
                  <div className="flex justify-between text-[10px] uppercase tracking-widest mb-1.5 text-neutral-400"><span>Saúde Física</span><span className="text-green-400">100%</span></div>
                  <div className="w-full bg-white/[0.05] rounded-full h-1"><div className="bg-green-500 h-1 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)]" style={{ width: '100%' }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] uppercase tracking-widest mb-1.5 text-neutral-400"><span>Saúde Mental</span><span className="text-green-400">80%</span></div>
                  <div className="w-full bg-white/[0.05] rounded-full h-1"><div className="bg-green-500 h-1 rounded-full" style={{ width: '80%' }}></div></div>
                </div>
             </div>
          </div>
        </div>

        {/* Bucket List */}
        <Card title="Bucket List (Tempo Livre)" className="lg:col-span-2" glow>
          <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 snap-x hidden-scrollbar">
            {bucketList.map((item) => (
              <div key={item.id} className="snap-center min-w-[200px] md:min-w-[220px] p-5 bg-white/[0.02] border border-white/[0.05] rounded-2xl hover:border-cyan-500/30 transition-all cursor-pointer group flex flex-col justify-between h-32">
                  <p className="text-sm md:text-base text-neutral-300 group-hover:text-white line-clamp-2">{item.titulo}</p>
                  <div className="text-right mt-2">
                    <button onClick={() => executarBucketList(item.id)} className="text-[10px] text-neutral-500 uppercase tracking-widest group-hover:text-cyan-400 transition-colors font-bold flex items-center justify-end w-full gap-2">
                      Executar <span className="text-lg leading-none">➜</span>
                    </button>
                  </div>
              </div>
            ))}
            {/* Card para Adicionar Novo */}
            <div onClick={adicionarBucketList} className="snap-center min-w-[150px] p-5 bg-white/[0.01] border border-dashed border-white/[0.1] rounded-2xl hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all cursor-pointer flex flex-col items-center justify-center h-32 group">
                <span className="text-2xl text-neutral-600 group-hover:text-cyan-500 group-hover:scale-110 transition-all">+</span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest mt-2 group-hover:text-cyan-400">Novo Item</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Linha Inferior */}
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        <Card title="Planejamento Semanal">
          {/* Filtro de Dias da Semana */}
          <div className="flex gap-2 mb-6 border-b border-white/5 pb-4 overflow-x-auto snap-x hidden-scrollbar">
            {diasSemana.map(dia => (
              <button 
                key={dia}
                onClick={() => setDiaRotina(dia)}
                className={`snap-center px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-all ${
                  diaRotina === dia 
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                    : 'bg-transparent text-neutral-500 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                {dia}
              </button>
            ))}
          </div>

          <div className="relative border-l border-white/10 ml-3 space-y-6 pb-2 mt-2">
              {rotinaEventos.filter(ev => ev.dia === diaRotina).map(evento => (
                <div key={evento.id} className="relative pl-6 group">
                  {/* Botão Remover (Escondido, aparece no hover) */}
                  <button onClick={() => removerEventoRotina(evento.id)} className="absolute -left-10 top-0.5 w-6 h-6 bg-red-500/10 text-red-500 rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-red-500/30 hover:bg-red-500 hover:text-white" title="Remover evento">✕</button>
                  
                  {/* Bolinha da Timeline */}
                  <div className={`absolute w-2.5 h-2.5 rounded-full -left-[5px] top-1 transition-colors duration-500 ${evento.destaque ? 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'border-2 border-neutral-600 bg-[#0d0d0d] group-hover:border-cyan-500/50'}`}></div>
                  
                  <p className={`text-[10px] font-bold mb-0.5 tracking-widest uppercase transition-colors ${evento.destaque ? 'text-cyan-400' : 'text-neutral-500 group-hover:text-cyan-500/70'}`}>{evento.horario}</p>
                  <p className={`text-sm transition-colors ${evento.destaque ? 'text-white font-medium' : 'text-neutral-400 group-hover:text-neutral-200'}`}>{evento.titulo}</p>
                </div>
              ))}
              {rotinaEventos.filter(ev => ev.dia === diaRotina).length === 0 && (
                <p className="pl-6 text-xs text-neutral-500 py-2">Nenhum compromisso agendado para {diaRotina}.</p>
              )}
          </div>
          <button onClick={adicionarEventoRotina} className="w-full mt-6 py-3 bg-white/[0.02] border border-white/[0.05] rounded-xl text-[10px] font-bold text-neutral-400 uppercase tracking-widest hover:border-cyan-500/30 hover:text-cyan-400 transition-all">
            + Adicionar Evento na {diaRotina}
          </button>
        </Card>
      </div>
    </div>
  );

  // --- PÁGINA: ADMIN (SISTEMA / SAAS) ---
  const AdminView = () => (
    <div className="grid grid-cols-1 gap-4 md:gap-6">
      <Card title="Monitor Master (SaaS de Academia)" glow>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl flex flex-col items-center justify-center text-center">
            <p className="text-[10px] text-cyan-500 tracking-widest uppercase mb-2">Academias Ativas</p>
            <p className="text-5xl font-light text-white">05</p>
          </div>
          <div className="p-6 bg-green-500/5 border border-green-500/20 rounded-2xl flex flex-col items-center justify-center text-center">
            <p className="text-[10px] text-green-500 tracking-widest uppercase mb-2">MRR (Receita Recorrente)</p>
            <p className="text-4xl font-light text-white">R$ 1.250</p>
          </div>
          <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute top-0 w-full h-1 bg-red-500 animate-pulse"></div>
            <p className="text-[10px] text-red-500 tracking-widest uppercase mb-2">Tickets de Suporte</p>
            <p className="text-4xl font-light text-white mb-3">01</p>
            <span className="text-[10px] bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1.5 rounded-full uppercase tracking-widest">Inadimplência</span>
          </div>
        </div>
      </Card>
    </div>
  );

  // Função Roteador (Renderiza a tela certa com base no Menu)
  const renderContent = () => {
    switch(activeTab) {
      case 'home': return <HomeView />;
      case 'academia': return <AcademiaView />;
      case 'escola': return <EscolaView />;
      case 'financas': return <FinancasView />;
      case 'vida': return <VidaView />;
      case 'admin': return <AdminView />;
      default: return <div className="text-neutral-500 text-center py-20">Módulo em construção...</div>;
    }
  };

  // --- INTERRUPÇÃO: PROTOCOLO 00 ---
  if (isEmergency) {
    return (
      <div className="h-[100dvh] w-full bg-[#030303] flex flex-col items-center justify-center text-center p-6 z-50 fixed inset-0 selection:bg-red-500/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/40 via-black to-black pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
          <h1 className="text-red-500/70 text-sm md:text-lg tracking-[0.5em] mb-12 font-bold uppercase animate-pulse">[ Protocolo 00 Ativo ]</h1>
          
          <p className="text-white text-3xl md:text-5xl lg:text-6xl font-extralight leading-tight mb-8">
            "Venham a mim, todos os que estão cansados e sobrecarregados, e eu lhes darei descanso."
          </p>
          <p className="text-neutral-500 tracking-[0.3em] text-xs md:text-sm uppercase mb-16">Mateus 11:28</p>
          
          <div className="bg-white/[0.02] border border-white/[0.05] p-6 md:p-8 rounded-2xl max-w-lg w-full mb-12 shadow-2xl backdrop-blur-md">
            <p className="text-cyan-400 text-sm md:text-base font-light tracking-wide leading-relaxed">
              <strong className="text-white block mb-2 text-xs tracking-widest uppercase">Instrução Primária:</strong>
              Saia da tela agora. Beba um copo d'água e ore por 5 minutos em silêncio.
            </p>
          </div>
          
          <button 
            onClick={() => setIsEmergency(false)} 
            className="px-8 py-4 text-xs font-bold tracking-[0.2em] text-neutral-500 border border-neutral-800 rounded-xl hover:bg-white/5 hover:text-white transition-all duration-300 uppercase"
          >
            Retomar Controle
          </button>
        </div>
      </div>
    );
  }

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} onEmergency={() => setIsEmergency(true)}>
      <div className="transition-opacity duration-500">
        <header className="mb-6 md:mb-8">
           <h2 className="text-2xl md:text-3xl font-light text-white capitalize tracking-wide">{activeTab === 'home' ? 'Visão Geral' : activeTab}</h2>
           <div className="w-10 h-1 bg-cyan-500 mt-3 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
        </header>
        
        {renderContent()}
      </div>
    </Layout>
  );
}

export default App;