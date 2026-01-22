'use client';

import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Menu, X, Lock, Calculator, FileText, Zap, Download, ArrowRight, BarChart3, DollarSign, TrendingUp, AlertCircle, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import CarneLeaoDeepDive from '@/components/CarneLeaoDeepDive';
import DeducoesDeepDive from '@/components/DeducoesDeepDive';
import PFvsMEIvsEmpresaDeepDive from '@/components/PFvsMEIvsEmpresaDeepDive';
import RPADeepDive from '@/components/RPADeepDive';

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
              <h2 className="text-2xl md:text-3xl font-bold">Área Premium</h2>
              <p className="text-sm md:text-base opacity-90">
                Digite seu código de acesso para acessar ferramentas, explicações e conteúdo exclusivo.
              </p>
            </div>

            <div className="bg-[#F9F7F4] rounded-lg p-6 md:p-8 space-y-6">
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
                  className="w-full bg-[#0c2461] hover:bg-[#1a3a5c] text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <Zap size={18} /> Acessar Área Premium
                </button>
              </form>

              <div className="border-t border-[#d4af37] pt-6">
                <p className="text-xs md:text-sm text-[#0c2461] text-center">
                  Ainda não tem acesso? <a href="#" className="text-[#d4af37] font-bold hover:underline">Compre sua licença PRO</a>
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

            {/* Downloads */}
            <div className="bg-[#F9F7F4] rounded-lg p-6 md:p-8 space-y-4 border-l-4 border-[#d4af37] mb-12">
              <div className="flex items-center gap-2">
                <Download size={20} className="text-[#d4af37]" />
                <h3 className="text-lg md:text-xl font-bold text-[#0c2461]">📥 Downloads Exclusivos</h3>
              </div>
              <p className="text-sm text-[#0c2461] opacity-80">
                Acesse guias, vídeos, modelos e documentos para facilitar sua organização fiscal.
              </p>
              <div className="space-y-4 mt-4">
                {/* PDFs */}
                <div>
                  <h4 className="font-semibold text-[#0c2461] mb-3 text-sm">📄 Guias em PDF:</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <a href="/downloads/#📘OGuiaDefinitivodoINSSparaMúsicosAutônomoseCLTs.pdf" download className="bg-white hover:bg-[#E8E3DC] text-[#0c2461] px-4 py-3 rounded-lg font-medium transition border border-[#E8E3DC] flex items-center gap-2 text-sm">
                      <FileText size={18} /> Guia INSS para Músicos
                    </a>
                    <a href="/downloads/DeduçõeseDespesasDedutíveisparaMúsicosAutônomos.pdf" download className="bg-white hover:bg-[#E8E3DC] text-[#0c2461] px-4 py-3 rounded-lg font-medium transition border border-[#E8E3DC] flex items-center gap-2 text-sm">
                      <FileText size={18} /> Deduções e Despesas
                    </a>
                  </div>
                </div>

                {/* Vídeos */}
                <div>
                  <h4 className="font-semibold text-[#0c2461] mb-3 text-sm">🎥 Vídeos Educativos:</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <a href="/downloads/Deduções_de_IR_para_Músicos.mp4" download className="bg-white hover:bg-[#E8E3DC] text-[#0c2461] px-4 py-3 rounded-lg font-medium transition border border-[#E8E3DC] flex items-center gap-2 text-sm">
                      <Download size={18} /> Deduções de IR
                    </a>
                    <a href="/downloads/As_Consequências_de_Não_Declarar_Renda_no_Brasil.mp4" download className="bg-white hover:bg-[#E8E3DC] text-[#0c2461] px-4 py-3 rounded-lg font-medium transition border border-[#E8E3DC] flex items-center gap-2 text-sm">
                      <Download size={18} /> Consequências Fiscais
                    </a>
                    <a href="/downloads/Finanças_do_Artista_no_Brasil.mp4" download className="bg-white hover:bg-[#E8E3DC] text-[#0c2461] px-4 py-3 rounded-lg font-medium transition border border-[#E8E3DC] flex items-center gap-2 text-sm">
                      <Download size={18} /> Finanças do Artista
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
