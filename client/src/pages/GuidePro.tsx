'use client';

import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import {
  Menu,
  X,
  Lock,
  Zap,
  BarChart3,
  DollarSign,
  TrendingUp,
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  BookOpen,
  Smartphone,
  PlayCircle,
  Loader2,
  ArrowRight
} from 'lucide-react';

// Importação dos componentes de conteúdo (Mantenha se você tiver esses arquivos, 
// senão substitua pelo conteúdo HTML direto ou placeholders)
import CarneLeaoDeepDive from '@/components/CarneLeaoDeepDive';
import DeducoesDeepDive from '@/components/DeducoesDeepDive';
import PFvsMEIvsEmpresaDeepDive from '@/components/PFvsMEIvsEmpresaDeepDive';
import RPADeepDive from '@/components/RPADeepDive';
import Footer from '@/components/Footer';

/* =====================================================
   CONFIG — IGUAL AO PWA
===================================================== */
const PRO_API = 'https://www.musicopro.app.br/api/license/check';

const getProEmail = () => localStorage.getItem('musicopro_email') || '';
const setProEmail = (email: string) => localStorage.setItem('musicopro_email', email);
const setProActive = (active: boolean) => localStorage.setItem('musicopro_pro', active ? 'true' : 'false');

async function verificarLicencaPorEmail(email: string): Promise<boolean> {
  const res = await fetch(`${PRO_API}?email=${encodeURIComponent(email)}`);
  const data = await res.json();
  return data?.active === true;
}

type Status = 'idle' | 'checking' | 'success' | 'inactive' | 'error';

export default function GuidePro() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [msg, setMsg] = useState('');
  
  // Estado para controlar qual módulo está visível na versão Desktop
  const [activeModule, setActiveModule] = useState<'carneLeao' | 'deducoes' | 'regimes' | 'rpa'>('carneLeao');
  const emailRef = useRef<HTMLInputElement | null>(null);

  /* =====================================================
     LÊ EMAIL DA URL E AUTO-CHECK
  ===================================================== */
  useEffect(() => {
    // 1. URL Check
    try {
      const url = new URL(window.location.href);
      const qpEmail = (url.searchParams.get('email') || '').trim().toLowerCase();
      if (qpEmail) {
        setEmail(qpEmail);
        localStorage.setItem('musicopro_email', qpEmail);
      }
    } catch {}

    // 2. Auto Login se já tiver salvo
    const savedEmail = getProEmail();
    if (savedEmail) {
      setEmail(savedEmail);
      (async () => {
        try {
          const ok = await verificarLicencaPorEmail(savedEmail);
          if (ok) {
            setProActive(true);
            setIsLocked(false);
          }
        } catch (e) { console.error(e); }
      })();
    }
  }, []);

  /* =====================================================
     VALIDAÇÃO MANUAL
  ===================================================== */
  const validate = async () => {
    const normalized = email.trim().toLowerCase();
    setEmail(normalized);
    if (!normalized) { setStatus('error'); setMsg('Digite o e-mail da compra.'); return; }

    try {
      setStatus('checking'); setMsg('Validando...');
      const ok = await verificarLicencaPorEmail(normalized);

      if (ok) {
        setProEmail(normalized);
        setProActive(true);
        setStatus('success');
        setMsg('✅ Acesso Liberado!');
        setTimeout(() => setIsLocked(false), 1000); // Pequeno delay para mostrar sucesso
      } else {
        setStatus('inactive');
        setMsg('Licença não encontrada.');
      }
    } catch (err) {
      setStatus('error');
      setMsg('Erro de conexão.');
    }
  };

  /* =====================================================
     MENU DE MÓDULOS (SIDEBAR)
  ===================================================== */
  const modules = [
    { id: 'carneLeao', title: 'Carnê-Leão na Prática', icon: BarChart3 },
    { id: 'deducoes', title: 'Deduções Avançadas', icon: DollarSign },
    { id: 'regimes', title: 'PF x MEI x Empresa', icon: TrendingUp },
    { id: 'rpa', title: 'Retenção (RPA)', icon: AlertCircle },
  ] as const;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-[#0c2461]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E8E3DC] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-[#0c2461] hover:text-[#d4af37] transition">
              <ArrowLeft size={20} />
            </Link>
            <div className="h-6 w-px bg-gray-200 hidden md:block"></div>
            <div>
              <h1 className="font-bold text-xl leading-none" style={{ fontFamily: 'Lexend, sans-serif' }}>Músico Pro</h1>
              <p className="text-[10px] uppercase tracking-wider text-[#d4af37] font-bold">Academy</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/"><button className="hover:text-[#d4af37] transition font-medium">Home</button></Link>
            <Link href="/app"><button className="hover:text-[#d4af37] transition font-medium font-bold flex items-center gap-1"><Smartphone size={16}/> Ir para o App</button></Link>
            <div className="h-4 w-px bg-gray-300"></div>
            <span className="text-xs font-bold bg-[#0c2461] text-white px-3 py-1 rounded-full">ÁREA VIP</span>
          </nav>
          
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-[#0c2461] text-white p-4 space-y-2">
          <Link href="/"><button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">Home</button></Link>
          <Link href="/app"><button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">Ir para o App</button></Link>
          {!isLocked && modules.map(m => (
             <button key={m.id} onClick={() => { setActiveModule(m.id); setMobileMenuOpen(false); }} className={`w-full text-left px-4 py-2 rounded transition ${activeModule === m.id ? 'bg-[#d4af37] text-[#0c2461] font-bold' : 'hover:bg-white/10'}`}>
               {m.title}
             </button>
          ))}
        </nav>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {isLocked ? (
          /* =============================
             ESTADO BLOQUEADO (SALES PAGE)
          ============================== */
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-[#E8E3DC]">
            <div className="bg-[#0c2461] p-8 text-white text-center">
              <Lock className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Módulo Avançado</h2>
              <p className="opacity-80">Você entendeu o básico no Guia Grátis. Aqui aprofundamos a estratégia.</p>
            </div>
            
            <div className="p-8 md:p-12 space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#0c2461]">Conteúdo exclusivo desta área:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                   {modules.map(m => (
                     <div key={m.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <m.icon className="w-5 h-5 text-[#d4af37] mt-1 shrink-0"/>
                        <span className="text-sm font-medium">{m.title}</span>
                     </div>
                   ))}
                </div>
              </div>

              {/* Login Box */}
              <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl">
                 <p className="text-sm font-bold text-[#0c2461] mb-3 text-center flex items-center justify-center gap-2">
                   <Zap size={16} className="text-[#d4af37]"/> Já é aluno? Libere seu acesso:
                 </p>
                 
                 <div className="space-y-3">
                    <input 
                      ref={emailRef} 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="E-mail usado na compra" 
                      className="w-full px-4 py-3 rounded-lg border border-[#E8E3DC] focus:outline-none focus:ring-2 focus:ring-[#d4af37] bg-white"
                      type="email"
                    />
                    
                    {status !== 'idle' && (
                      <div className={`rounded p-2 text-sm text-center font-medium ${
                        status === 'success' ? 'bg-green-100 text-green-800' : 
                        status === 'error' || status === 'inactive' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {status === 'checking' ? <span className="flex items-center justify-center gap-2"><Loader2 className="animate-spin w-4 h-4"/> Validando...</span> : msg}
                      </div>
                    )}

                    <button 
                      onClick={validate} 
                      disabled={status === 'checking' || status === 'success'} 
                      className="w-full bg-[#0c2461] hover:bg-[#1a3a7a] disabled:opacity-50 text-white font-bold px-6 py-3 rounded-lg transition"
                    >
                      Desbloquear Agora
                    </button>
                 </div>
              </div>

              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-gray-500 mb-4 text-sm">Ainda não tem o Pacote Músico Pro?</p>
                <Link href="/vendas">
                  <button className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-8 py-3 rounded-xl transition shadow-lg w-full md:w-auto">
                    Comprar Acesso Vitalício
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* =============================
             ESTADO DESBLOQUEADO (PLATAFORMA)
          ============================== */
          <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">
            
            {/* SIDEBAR DE MÓDULOS (Desktop) */}
            <div className="hidden lg:block bg-white p-4 rounded-xl border border-[#E8E3DC] sticky top-24 shadow-sm">
               <h3 className="font-bold text-[#0c2461] mb-4 flex items-center gap-2 px-2"><BookOpen size={20}/> Seus Módulos</h3>
               <ul className="space-y-1">
                 {modules.map(m => (
                   <li 
                    key={m.id}
                    onClick={() => setActiveModule(m.id)}
                    className={`text-sm px-4 py-3 rounded-lg cursor-pointer transition flex items-center gap-3 ${
                      activeModule === m.id 
                      ? 'bg-[#0c2461] text-white font-bold shadow-md' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-[#0c2461]'
                    }`}
                   >
                     <m.icon size={18} className={activeModule === m.id ? 'text-[#d4af37]' : 'text-gray-400'}/>
                     {m.title}
                   </li>
                 ))}
               </ul>
               
               <div className="mt-8 pt-6 border-t border-gray-100 px-2">
                  <h4 className="font-bold text-[10px] uppercase text-gray-400 mb-3 tracking-wider">Ferramenta</h4>
                  <Link href="/app">
                    <button className="w-full bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] text-sm font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition shadow-sm">
                       <Smartphone size={16}/> Abrir App
                    </button>
                  </Link>
               </div>
            </div>

            {/* CONTEÚDO PRINCIPAL */}
            <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm border border-[#E8E3DC] min-h-[600px]">
               {/* Cabeçalho do Módulo */}
               <div className="mb-8 border-b border-gray-100 pb-6">
                 <span className="bg-blue-50 text-[#0c2461] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    Módulo Avançado
                 </span>
                 <h2 className="text-3xl font-bold text-[#0c2461] mt-3 flex items-center gap-3">
                   {modules.find(m => m.id === activeModule)?.icon({ size: 32, className: "text-[#d4af37]" })}
                   {modules.find(m => m.id === activeModule)?.title}
                 </h2>
               </div>

               {/* Renderização Condicional dos DeepDives */}
               <div className="pro-content">
                  {activeModule === 'carneLeao' && <CarneLeaoDeepDive />}
                  {activeModule === 'deducoes' && <DeducoesDeepDive />}
                  {activeModule === 'regimes' && <PFvsMEIvsEmpresaDeepDive />}
                  {activeModule === 'rpa' && <RPADeepDive />}
               </div>
               
               {/* Call to Action Final do Módulo */}
               <div className="mt-12 bg-[#f8fafc] border border-[#d4af37] rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Teoria finalizada.</p>
                    <p className="font-bold text-[#0c2461]">Agora aplique isso no seu financeiro:</p>
                  </div>
                  <Link href="/app">
                     <button className="bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold px-6 py-3 rounded-lg transition flex items-center gap-2 shadow-lg">
                        Ir para o App <ArrowRight size={18}/>
                     </button>
                  </Link>
               </div>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}