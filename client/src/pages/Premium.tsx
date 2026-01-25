'use client';

import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Menu, X, Lock, Calculator, FileText, Zap, Download, ArrowRight, BarChart3, DollarSign, TrendingUp, AlertCircle, ChevronDown, ChevronUp, ArrowLeft, CheckCircle2 } from 'lucide-react';
import CarneLeaoDeepDive from '@/components/CarneLeaoDeepDive';
import DeducoesDeepDive from '@/components/DeducoesDeepDive';
import PFvsMEIvsEmpresaDeepDive from '@/components/PFvsMEIvsEmpresaDeepDive';
import RPADeepDive from '@/components/RPADeepDive';
import Footer from '@/components/Footer';

export default function Premium() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [accessCode, setAccessCode] = useState('');
  const [accessError, setAccessError] = useState('');
  const [activeSection, setActiveSection] = useState('carneLeao');

  // Calculadora Carnê-Leão
  const [carneInput, setCarneInput] = useState('');
  const [carneResult, setCarneResult] = useState<number | null>(null);

  // Calculadora RPA
  const [rpaInput, setRpaInput] = useState('');
  const [rpaResult, setRpaResult] = useState<number | null>(null);

  const handleAccessCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode.toUpperCase() === 'MUSICOPRO2026PREMIUM') {
      setIsLocked(false);
      setAccessError('');
    } else {
      setAccessError('Código de acesso inválido. Verifique seu email do Hotmart.');
    }
  };

  const calculateCarne = () => {
    const value = parseFloat(carneInput);
    if (isNaN(value) || value <= 0) {
      setCarneResult(null);
      return;
    }
    let tax = 0;
    if (value <= 1903.98) tax = 0;
    else if (value <= 2826.65) tax = (value - 1903.98) * 0.075;
    else if (value <= 3751.05) tax = 922.67 * 0.075 + (value - 2826.65) * 0.15;
    else if (value <= 4664.68) tax = 922.67 * 0.075 + 924.4 * 0.15 + (value - 3751.05) * 0.225;
    else tax = 922.67 * 0.075 + 924.4 * 0.15 + 913.63 * 0.225 + (value - 4664.68) * 0.275;
    setCarneResult(Math.round(tax * 100) / 100);
  };

  const calculateRPA = () => {
    const value = parseFloat(rpaInput);
    if (isNaN(value) || value <= 0) {
      setRpaResult(null);
      return;
    }
    const rpa = value * 0.15;
    setRpaResult(Math.round(rpa * 100) / 100);
  };

  // Detectar seção ativa ao fazer scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['carneLeao', 'deducoes', 'regimes', 'rpa'];
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom > 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'carneLeao', title: 'Carnê-Leão', icon: BarChart3 },
    { id: 'deducoes', title: 'Deduções Fiscais', icon: DollarSign },
    { id: 'regimes', title: 'PF vs MEI vs Empresa', icon: TrendingUp },
    { id: 'rpa', title: 'Retenção (RPA)', icon: AlertCircle },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white scroll-smooth">
      {/* Header Sticky */}
      <header className="sticky top-0 bg-white border-b border-[#E8E3DC] py-4 px-4 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-[#0c2461] hover:text-[#1a3a5c] transition">
              <ArrowLeft size={20} />
              <span className="font-semibold hidden md:inline">Voltar ao Guia</span>
            </Link>
            <div className="h-6 w-px bg-[#E8E3DC] mx-2 hidden md:block"></div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                Músico Pro
              </h1>
              <p className="text-xs md:text-sm font-normal text-[#6ba587]">Premium</p>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-[#F5F2ED] rounded-lg transition"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="mt-4 space-y-2 md:hidden border-t border-[#E8E3DC] pt-4">
            <Link href="/" className="block w-full text-left px-4 py-2 rounded-lg text-[#0c2461] hover:bg-[#F5F2ED] mb-2 font-medium">
              ← Voltar ao Guia
            </Link>
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left px-4 py-2 rounded-lg transition ${
                  activeSection === section.id
                    ? 'bg-[#0c2461] text-white'
                    : 'hover:bg-[#F5F2ED] text-[#0c2461]'
                }`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* Desktop Sidebar Navigation */}
      <div className="hidden md:fixed md:left-0 md:top-24 md:w-64 md:h-[calc(100vh-96px)] md:bg-[#F9F7F4] md:border-r md:border-[#E8E3DC] md:overflow-y-auto md:p-6 md:z-40">
        <nav className="space-y-2">
          <Link href="/" className="block w-full text-left px-4 py-3 rounded-lg text-[#2C3E50] hover:bg-[#E8E3DC] mb-4 font-medium flex items-center gap-2">
            <ArrowLeft size={18} />
            Voltar ao Guia
          </Link>
          <div className="h-px bg-[#E8E3DC] my-2"></div>
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition font-medium flex items-center gap-2 ${
                activeSection === section.id
                  ? 'bg-[#E07856] text-white'
                  : 'text-[#2C3E50] hover:bg-[#E8E3DC]'
              }`}
              style={{ fontFamily: activeSection === section.id ? 'Lexend, sans-serif' : 'Poppins, sans-serif' }}
            >
              <section.icon size={18} />
              {section.title}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="md:ml-64 px-4 md:px-6 py-6 md:py-8 max-w-5xl mx-auto">
        {isLocked ? (
          <div className="space-y-8 py-12">
            <div className="bg-gradient-to-br from-[#0c2461] to-[#1a3a5c] rounded-lg p-6 md:p-8 text-white space-y-4 text-center">
              <Lock size={48} className="mx-auto text-[#d4af37]" />
              <h2 className="text-2xl md:text-3xl font-bold">Licença PRO — Kit Músico Pro</h2>
              <p className="text-base md:text-lg opacity-95 font-medium">
                Organize sua vida fiscal, saiba exatamente quando agir e tenha segurança para declarar.
              </p>
              <p className="text-sm opacity-85">
                Funciona direto no navegador — no celular, tablet ou computador.
              </p>
            </div>

            <div className="bg-[#F9F7F4] rounded-lg p-6 md:p-8 space-y-8">
              {/* Bloco: Como Funciona */}
              <div className="bg-white rounded-lg p-6 border border-[#E8E3DC] space-y-6">
                <h3 className="text-xl font-bold text-[#0c2461] flex items-center gap-2" style={{ fontFamily: 'Lexend, sans-serif' }}>
                  <Zap size={24} className="text-[#d4af37]" />
                  Como funciona o acesso ao Premium
                </h3>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#0c2461] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0c2461] mb-1">Compre a Licença PRO</h4>
                      <p className="text-sm text-[#6ba587]">A compra é feita pela Hotmart.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#0c2461] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0c2461] mb-1">Receba seu código de acesso</h4>
                      <p className="text-sm text-[#6ba587]">Após a confirmação do pagamento, o código é enviado automaticamente para o seu e-mail.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#0c2461] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0c2461] mb-1">Desbloqueie o conteúdo Premium</h4>
                      <p className="text-sm text-[#6ba587]">Digite o código abaixo e tenha acesso imediato às ferramentas e materiais exclusivos.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bloco: O que você recebe */}
              <div className="bg-white rounded-lg p-6 border border-[#E8E3DC] space-y-4">
                <h3 className="text-lg font-bold text-[#0c2461] flex items-center gap-2" style={{ fontFamily: 'Lexend, sans-serif' }}>
                  <CheckCircle2 size={22} className="text-[#d4af37]" />
                  Ao adquirir a Licença PRO, você recebe:
                </h3>
                <ul className="space-y-3 ml-2">
                  <li className="flex items-start gap-3 text-[#0c2461]">
                    <span className="text-[#d4af37] font-bold mt-0.5">✔</span>
                    <span className="text-sm">Acesso completo ao App Músico Pro</span>
                  </li>
                  <li className="flex items-start gap-3 text-[#0c2461]">
                    <span className="text-[#d4af37] font-bold mt-0.5">✔</span>
                    <span className="text-sm">Cálculo mensal do imposto (Carnê-Leão)</span>
                  </li>
                  <li className="flex items-start gap-3 text-[#0c2461]">
                    <span className="text-[#d4af37] font-bold mt-0.5">✔</span>
                    <span className="text-sm">Relatórios e documentos para declarar</span>
                  </li>
                  <li className="flex items-start gap-3 text-[#0c2461]">
                    <span className="text-[#d4af37] font-bold mt-0.5">✔</span>
                    <span className="text-sm">Guia educacional completo e atualizado</span>
                  </li>
                  <li className="flex items-start gap-3 text-[#0c2461]">
                    <span className="text-[#d4af37] font-bold mt-0.5">✔</span>
                    <span className="text-sm">Uso anual, sem mensalidade</span>
                  </li>
                </ul>
              </div>

              {/* Formulário de Acesso */}
              <form onSubmit={handleAccessCode} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0c2461] mb-2">
                    Código de Acesso
                  </label>
                  <input
                    type="password"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="Cole seu código do Hotmart aqui"
                    className="w-full px-4 py-3 border border-[#d4af37] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c2461] text-[#0c2461]"
                  />
                  {accessError && (
                    <p className="text-sm text-[#C85A54] mt-2">{accessError}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#d4af37] hover:bg-[#c9a02e] text-[#0c2461] font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
                >
                  Comprar Licença PRO
                </button>
                <p className="text-xs text-[#6ba587] text-center mt-2">
                  Acesso imediato após a confirmação da compra.
                </p>
                <p className="text-xs text-[#6ba587] text-center">
                  Você pode testar o app grátis antes de decidir.
                </p>
              </form>

              {/* Bloco: O que você libera */}
              <div className="bg-[#E8F5E9] rounded-lg p-6 border border-[#6ba587]/20 space-y-4">
                <h3 className="font-bold text-[#0c2461] flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-[#6ba587]" />
                  O que você libera no Premium
                </h3>
                <p className="text-sm text-[#0c2461] mb-4">Ao liberar o Premium, você terá acesso a:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#6ba587] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#0c2461]">Checklists mensais do Carnê-Leão</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#6ba587] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#0c2461]">Exemplos práticos preenchidos (PIX, cachê, aulas)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#6ba587] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#0c2461]">Calculadoras de imposto</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#6ba587] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#0c2461]">Organização de receitas e despesas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#6ba587] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#0c2461]">Conteúdos aprofundados e atualizados</span>
                  </li>
                </ul>
              </div>

              {/* Bloco: Garantia */}
              <div className="bg-white rounded-lg p-6 border border-[#E8E3DC] space-y-4">
                <h3 className="text-lg font-bold text-[#0c2461] flex items-center gap-2">
                  <Lock size={22} className="text-[#d4af37]" />
                  Garantia de 7 dias
                </h3>
                <p className="text-sm text-[#0c2461]">
                  Se não ficar satisfeito, você pode solicitar o reembolso conforme a política da plataforma de pagamento.
                </p>
              </div>

              {/* Links auxiliares */}
              <div className="border-t border-[#d4af37] pt-6 space-y-3">
                <p className="text-sm text-[#0c2461] text-center">
                  Ainda não tem acesso? <a href="/pro" className="text-[#d4af37] font-bold hover:underline">Comprar Licença PRO</a>
                </p>
                <p className="text-sm text-[#0c2461] text-center">
                  Não recebi meu código? <a href="mailto:suporte@musicopro.app.br" className="text-[#d4af37] font-bold hover:underline">Falar com o suporte</a>
                </p>
              </div>

              {/* Aviso discreto */}
              <div className="bg-[#FFF9E6] rounded-lg p-4 border border-[#d4af37]/30">
                <p className="text-xs text-[#6ba587] text-center">
                  🔐 O código é pessoal e intransferível. Em caso de troca de dispositivo, o acesso pode ser recuperado pelo suporte.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-[#0c2461] to-[#6ba587] rounded-lg p-6 md:p-8 text-white space-y-2 mb-12">
              <div className="flex items-center gap-2">
                <Zap size={24} className="text-[#d4af37]" />
                <h2 className="text-2xl md:text-3xl font-bold">Bem-vindo à Área Premium!</h2>
              </div>
              <p className="text-sm md:text-base opacity-90">
                Acesso exclusivo a ferramentas interativas, explicações detalhadas e conteúdo avançado.
              </p>
            </div>

            {/* CARNÊ-LEÃO */}
            <section id="carneLeao" className="space-y-6 md:space-y-8 mb-12 md:mb-16 scroll-mt-24">
              <CarneLeaoDeepDive />
            </section>

            {/* DEDUÇÕES */}
            <section id="deducoes" className="space-y-6 md:space-y-8 mb-12 md:mb-16 scroll-mt-24">
              <DeducoesDeepDive />
            </section>

            {/* PF vs MEI vs EMPRESA */}
            <section id="regimes" className="space-y-6 md:space-y-8 mb-12 md:mb-16 scroll-mt-24">
              <PFvsMEIvsEmpresaDeepDive />
            </section>

            {/* RETENÇÃO (RPA) */}
            <section id="rpa" className="space-y-6 md:space-y-8 mb-12 md:mb-16 scroll-mt-24">
              <RPADeepDive />
            </section>


          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
