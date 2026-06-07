'use client';

import { useState, useEffect, useRef } from 'react';
import { Link, useRoute, useLocation } from 'wouter';
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
  Smartphone,
  BookOpen,
  Loader2,
  ArrowRight,
  PlayCircle,
  CheckCircle2
} from 'lucide-react';

// Se não tiver os componentes criados, o código usará placeholders para não quebrar
// Caso tenha, descomente as importações reais
import CarneLeaoDeepDive from '@/components/CarneLeaoDeepDive';
import DeducoesDeepDive from '@/components/DeducoesDeepDive';
import PFvsMEIvsEmpresaDeepDive from '@/components/PFvsMEIvsEmpresaDeepDive';
import RPADeepDive from '@/components/RPADeepDive';
import Footer from '@/components/Footer';
import GuiaCompleto from '@/components/GuiaCompleto';

/* =====================================================
   CONFIG
===================================================== */
const PRO_API = 'https://www.musicopro.app.br/api/license/check';

const getProEmail = () => localStorage.getItem('musicopro_email') || '';
const setProEmail = (email: string) => localStorage.setItem('musicopro_email', email);
const getProTx = () => localStorage.getItem('musicopro_tx') || '';
const setProTx = (tx: string) => localStorage.setItem('musicopro_tx', tx);
const setProActive = (active: boolean) => localStorage.setItem('musicopro_pro', active ? 'true' : 'false');

async function verificarLicencaPorEmail(email: string, transaction: string): Promise<boolean> {
  const res = await fetch(PRO_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, transaction })
  });
  const data = await res.json();
  return data?.active === true;
}

type Status = 'idle' | 'checking' | 'success' | 'inactive' | 'error';

export default function GuidePro() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();
  const [match, params] = useRoute('/guia/:module?');
  
  // O módulo ativo é lido do parâmetro da rota; se vazio ou inválido, padrão é 'completo'
  const activeModule = (params?.module as 'completo' | 'carne-leao' | 'deducoes' | 'regimes' | 'rpa') || 'completo';

  // Inicialização síncrona evita piscar a tela de bloqueio se já tiver acesso
  const [isLocked, setIsLocked] = useState(false);
  const [email, setEmail] = useState('');
  const [transaction, setTransaction] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [msg, setMsg] = useState('');
  const emailRef = useRef<HTMLInputElement | null>(null);

  /* =====================================================
     SEO METADATA BY MODULE
  ===================================================== */
  useEffect(() => {
    let title = "Guia do Músico Autônomo | MúsicoPro Academy";
    let description = "Acesse gratuitamente o Guia Avançado do Músico Autônomo. Módulos completos sobre Carnê-Leão, deduções dedutíveis, RPA e MEI vs PF.";
    let canonicalUrl = "https://musicopro.app.br/guia";

    if (activeModule === 'carne-leao') {
      title = "Carnê-Leão para Músicos: Como Declarar Passo a Passo | MúsicoPro";
      description = "Aprenda a declarar seus cachês de shows e aulas no Carnê-Leão Web da Receita Federal. Evite a malha fina com nosso tutorial completo.";
      canonicalUrl = "https://musicopro.app.br/guia/carne-leao";
    } else if (activeModule === 'deducoes') {
      title = "Deduções Legais de Livro-Caixa para Músicos | MúsicoPro";
      description = "Descubra quais despesas você pode deduzir legalmente no Livro-Caixa para pagar menos imposto: transporte, instrumentos, estúdio e mais.";
      canonicalUrl = "https://musicopro.app.br/guia/deducoes";
    } else if (activeModule === 'regimes') {
      title = "Músico Autônomo: CPF ou abrir MEI/CNPJ? | MúsicoPro";
      description = "Compare a tributação de músico autônomo (Pessoa Física) vs MEI vs Simples Nacional. Saiba qual modelo economiza mais impostos na sua carreira.";
      canonicalUrl = "https://musicopro.app.br/guia/regimes";
    } else if (activeModule === 'rpa') {
      title = "RPA para Músicos: Imposto de Renda e Retenção na Fonte | MúsicoPro";
      description = "Entenda como funciona o Recibo de Pagamento a Autônomo (RPA) para músicos, quais são os descontos de INSS, ISS/IBS e IRPF na fonte.";
      canonicalUrl = "https://musicopro.app.br/guia/rpa";
    }

    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", canonicalUrl);
    }
  }, [activeModule]);

  /* =====================================================
     AUTO-CHECK
  ===================================================== */
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const qpEmail = (url.searchParams.get('email') || '').trim().toLowerCase();
      if (qpEmail) {
        setEmail(qpEmail);
        localStorage.setItem('musicopro_email', qpEmail);
      }
    } catch { }

    const savedEmail = getProEmail();
    const savedTx = getProTx();
    if (savedEmail && savedTx) {
      setEmail(savedEmail);
      setTransaction(savedTx);
      (async () => {
        try {
          const ok = await verificarLicencaPorEmail(savedEmail, savedTx);
          if (ok) {
            setProActive(true);
            setIsLocked(false);
          }
        } catch (e) { console.error(e); }
      })();
    }
  }, []);

  const validate = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedTx = transaction.trim().toUpperCase();
    setEmail(normalizedEmail);
    setTransaction(normalizedTx);

    if (!normalizedEmail || !normalizedTx.startsWith('HP')) {
      setStatus('error');
      setMsg('Digite o e-mail e o código da transação da Hotmart (ex: HP...).');
      return;
    }

    try {
      setStatus('checking'); setMsg('Validando...');
      const ok = await verificarLicencaPorEmail(normalizedEmail, normalizedTx);

      if (ok) {
        setProEmail(normalizedEmail);
        setProTx(normalizedTx);
        setProActive(true);
        setStatus('success');
        setMsg('✅ Acesso Liberado!');
        setTimeout(() => setIsLocked(false), 1000);
      } else {
        setStatus('inactive');
        setMsg('Licença ou código não encontrados.');
      }
    } catch (err) {
      setStatus('error');
      setMsg('Erro de conexão.');
    }
  };

  const modules = [
    { id: 'completo', title: 'Guia Base 2025', icon: BookOpen },
    { id: 'carne-leao', title: 'Carnê-Leão na Prática', icon: BarChart3 },
    { id: 'deducoes', title: 'Deduções Avançadas', icon: DollarSign },
    { id: 'regimes', title: 'PF x MEI x Empresa', icon: TrendingUp },
    { id: 'rpa', title: 'Retenção (RPA)', icon: AlertCircle },
  ] as const;

  // Lógica corrigida para renderização do ícone
  const activeModuleData = modules.find(m => m.id === activeModule);
  const ActiveIcon = activeModuleData?.icon;

  // JSON-LD dinâmico estruturado para o Google (SEO E-E-A-T)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": activeModule === 'completo' ? "Guia Essencial do Imposto de Renda para Músicos Autônomos" :
                activeModule === 'carne-leao' ? "Carnê-Leão para Músicos: Como Declarar Passo a Passo" :
                activeModule === 'deducoes' ? "Deduções Legais de Livro-Caixa para Músicos" :
                activeModule === 'regimes' ? "Músico Autônomo: CPF ou abrir MEI/CNPJ?" :
                "RPA para Músicos: Imposto de Renda e Retenção na Fonte",
    "description": activeModule === 'completo' ? "Acesse gratuitamente o Guia Avançado do Músico Autônomo. Módulos completos sobre Carnê-Leão, deduções dedutíveis, RPA e MEI vs PF." :
                   activeModule === 'carne-leao' ? "Aprenda a declarar seus cachês de shows e aulas no Carnê-Leão Web da Receita Federal. Evite a malha fina com nosso tutorial completo." :
                   activeModule === 'deducoes' ? "Descubra quais despesas você pode deduzir legalmente no Livro-Caixa para pagar menos imposto: transporte, instrumentos, estúdio e mais." :
                   activeModule === 'regimes' ? "Compare a tributação de músico autônomo (Pessoa Física) vs MEI vs Simples Nacional. Saiba qual modelo economiza mais impostos na sua carreira." :
                   "Entenda como funciona o Recibo de Pagamento a Autônomo (RPA) para músicos, quais são os descontos de INSS, ISS/IBS e IRPF na fonte.",
    "publisher": {
      "@type": "Organization",
      "name": "MúsicoPro",
      "logo": {
        "@type": "ImageObject",
        "url": "https://musicopro.app.br/favicon.png"
      }
    },
    "author": {
      "@type": "Organization",
      "name": "MúsicoPro"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": activeModule === 'completo' ? "https://musicopro.app.br/guia" : `https://musicopro.app.br/guia/${activeModule}`
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-[#0c2461]">
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E8E3DC] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-[#0c2461] hover:text-[#d4af37] transition">
              <ArrowLeft size={20} />
            </Link>
            <div className="h-6 w-px bg-gray-200 hidden md:block"></div>
            <div>
              <span className="font-bold text-xl leading-none block" style={{ fontFamily: 'Lexend, sans-serif' }}>Músico Pro</span>
              <p className="text-[10px] uppercase tracking-wider text-[#d4af37] font-bold">Academy</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/"><button className="hover:text-[#d4af37] transition font-medium">Home</button></Link>
            <Link href="/app"><button className="hover:text-[#d4af37] transition font-medium font-bold flex items-center gap-1"><Smartphone size={16} /> Ir para o App</button></Link>
            <div className="h-4 w-px bg-gray-300"></div>
            <span className="text-xs font-bold bg-[#6ba587] text-white px-3 py-1 rounded-full">GUIA GRATUITO</span>
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
            <button
              key={m.id}
              onClick={() => {
                if (m.id === 'completo') {
                  setLocation('/guia');
                } else {
                  setLocation(`/guia/${m.id}`);
                }
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2 rounded transition ${activeModule === m.id ? 'bg-[#d4af37] text-[#0c2461] font-bold' : 'hover:bg-white/10'}`}
            >
              {m.title}
            </button>
          ))}
        </nav>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {isLocked ? (
          /* =============================
             ESTADO BLOQUEADO
          ============================== */
          <div className="min-h-[70vh] flex items-center justify-center -mt-4 md:-mt-8">
            <div className="max-w-4xl w-full grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E8E3DC]">
              {/* Lado Esquerdo - Apresentação */}
              <div className="bg-[#0c2461] p-10 md:p-12 text-white flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37] opacity-10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 opacity-20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

                <h2 className="text-sm font-bold tracking-widest text-[#d4af37] uppercase mb-3">Área de Membros</h2>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Músico Pro Academy</h3>
                <p className="text-lg opacity-90 mb-8 leading-relaxed">
                  Acesse o material Premium. Aprenda a reduzir seus impostos e profissionalizar de vez a sua carreira musical.
                </p>

                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="text-[#d4af37] w-6 h-6 shrink-0" />
                    <span className="opacity-90 font-medium">Estratégias Avançadas de Dedução</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="text-[#d4af37] w-6 h-6 shrink-0" />
                    <span className="opacity-90 font-medium">Tutoriais Práticos do Carnê-Leão</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="text-[#d4af37] w-6 h-6 shrink-0" />
                    <span className="opacity-90 font-medium">Comparativo Completo: PF x MEI x PJ</span>
                  </li>
                </ul>
              </div>

              {/* Lado Direito - Formulário de Acesso */}
              <div className="p-8 md:p-12 flex flex-col justify-center bg-gray-50/50">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-50 bg-opacity-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
                    <Lock className="w-8 h-8 text-[#0c2461]" />
                  </div>
                  <h4 className="text-2xl font-bold text-[#0c2461]">Acessar Conta</h4>
                  <p className="text-sm text-gray-500 mt-2">Valide a sua compra da Hotmart</p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">E-mail de Comprador</label>
                    <input
                      ref={emailRef}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0c2461] bg-white text-[15px] transition-shadow shadow-sm"
                      type="email"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Código da Transação</label>
                    <input
                      value={transaction}
                      onChange={(e) => setTransaction(e.target.value)}
                      placeholder="Ex: HP12345678"
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0c2461] bg-white text-[15px] transition-shadow shadow-sm"
                      type="text"
                    />
                  </div>

                  {status !== 'idle' && (
                    <div className={`rounded-xl p-3 text-sm text-center font-medium ${status === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
                      status === 'error' || status === 'inactive' ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}>
                      {status === 'checking' ? <span className="flex items-center justify-center gap-2"><Loader2 className="animate-spin w-4 h-4" /> Autenticando...</span> : msg}
                    </div>
                  )}

                  <button
                    onClick={validate}
                    disabled={status === 'checking' || status === 'success'}
                    className="w-full bg-[#d4af37] hover:bg-[#c99a2e] disabled:opacity-50 text-[#0c2461] font-bold px-6 py-4 rounded-xl transition shadow-lg mt-2 text-lg"
                  >
                    Entrar na Plataforma
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* =============================
             ESTADO DESBLOQUEADO
          ============================== */
          <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">

            {/* SIDEBAR */}
            <div className="hidden lg:block bg-white p-4 rounded-xl border border-[#E8E3DC] sticky top-24 shadow-sm">
              <h3 className="font-bold text-[#0c2461] mb-4 flex items-center gap-2 px-2"><BookOpen size={20} /> Seus Módulos</h3>
              <ul className="space-y-1">
                {modules.map(m => (
                  <li
                    key={m.id}
                    onClick={() => {
                      if (m.id === 'completo') {
                        setLocation('/guia');
                      } else {
                        setLocation(`/guia/${m.id}`);
                      }
                    }}
                    className={`text-sm px-4 py-3 rounded-lg cursor-pointer transition flex items-center gap-3 ${activeModule === m.id
                      ? 'bg-[#0c2461] text-white font-bold shadow-md'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-[#0c2461]'
                      }`}
                  >
                    <m.icon size={18} className={activeModule === m.id ? 'text-[#d4af37]' : 'text-gray-400'} />
                    {m.title}
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-gray-100 px-2">
                <h4 className="font-bold text-[10px] uppercase text-gray-400 mb-3 tracking-wider">Ferramenta</h4>
                <Link href="/app">
                  <button className="w-full bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] text-sm font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition shadow-sm">
                    <Smartphone size={16} /> Abrir App
                  </button>
                </Link>
              </div>
            </div>

            {/* CONTEÚDO PRINCIPAL */}
            <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm border border-[#E8E3DC] min-h-[600px]">
              {/* Cabeçalho do Módulo - CORREÇÃO DE RENDERIZAÇÃO DE ÍCONE */}
              <div className="mb-8 border-b border-gray-100 pb-6">
                <span className="bg-blue-50 text-[#0c2461] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  Módulo Avançado
                </span>
                <h2 className="text-3xl font-bold text-[#0c2461] mt-3 flex items-center gap-3">
                  {ActiveIcon && <ActiveIcon size={32} className="text-[#d4af37]" />}
                  {activeModuleData?.title}
                </h2>
              </div>

              {/* CONTEÚDO */}
              <div className="pro-content">
                {activeModule === 'completo' && <GuiaCompleto />}
                {activeModule === 'carne-leao' && <CarneLeaoDeepDive />}
                {activeModule === 'deducoes' && <DeducoesDeepDive />}
                {activeModule === 'regimes' && <PFvsMEIvsEmpresaDeepDive />}
                {activeModule === 'rpa' && <RPADeepDive />}
              </div>

              {/* Call to Action Final */}
              <div className="mt-12 bg-[#f8fafc] border border-[#d4af37] rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Teoria finalizada.</p>
                  <p className="font-bold text-[#0c2461]">Agora aplique isso no seu financeiro:</p>
                </div>
                <Link href="/app">
                  <button className="bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold px-6 py-3 rounded-lg transition flex items-center gap-2 shadow-lg">
                    Ir para o App <ArrowRight size={18} />
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