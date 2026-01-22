import React, { useState, useEffect } from 'react';
import { Music, ChevronDown, ChevronUp, Lightbulb, AlertCircle, BookOpen, DollarSign, CheckCircle2, TrendingUp, FileText, HelpCircle, Zap, BarChart3, Menu, X, Calculator, ArrowLeft, Lock } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import CarneLeaoDeepDive from '@/components/CarneLeaoDeepDive';
import DeducoesDeepDive from '@/components/DeducoesDeepDive';
import PFvsMEIvsEmpresaDeepDive from '@/components/PFvsMEIvsEmpresaDeepDive';
import RPADeepDive from '@/components/RPADeepDive';
import ConsultoriaRapida from '@/components/ConsultoriaRapida';

export default function Ferramentas() {
  const [isLocked, setIsLocked] = useState(true);
  const [accessCode, setAccessCode] = useState('');
  const [accessError, setAccessError] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('consultoria');

  const handleAccessCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode.toUpperCase() === 'MUSICOPRO2026FERRAMENTAS') {
      setIsLocked(false);
      setAccessError('');
    } else {
      setAccessError('Codigo de acesso invalido. Verifique seu email do Hotmart.');
    }
  };

  // Detectar seção ativa ao fazer scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['consultoria', 'carneLeao', 'deducoes', 'regimes', 'rpa'];
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
    { id: 'consultoria', title: 'Consultoria Rápida', icon: Zap },
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
              <p className="text-xs md:text-sm font-normal text-[#6ba587]">Ferramentas</p>
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
              <h2 className="text-2xl md:text-3xl font-bold">Ferramentas Premium</h2>
              <p className="text-sm md:text-base opacity-90">
                Digite seu codigo de acesso para acessar as ferramentas fiscais.
              </p>
            </div>

            <div className="bg-[#F9F7F4] rounded-lg p-6 md:p-8 space-y-6">
              <form onSubmit={handleAccessCode} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0c2461] mb-2">
                    Codigo de Acesso
                  </label>
                  <input
                    type="password"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="Cole seu codigo do Hotmart aqui"
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
                  <Zap size={18} /> Acessar Ferramentas
                </button>
              </form>
            </div>
          </div>
        ) : (
          <>
        {/* CONSULTORIA RÁPIDA */}
        <section id="consultoria" className="space-y-6 md:space-y-8 mb-12 md:mb-16 scroll-mt-24">
          <ConsultoriaRapida />
        </section>

        {/* APROFUNDAMENTO: CARNÊ-LEÃO */}
        <section id="carneLeao" className="space-y-6 md:space-y-8 mb-12 md:mb-16 scroll-mt-24">
          <CarneLeaoDeepDive />
        </section>

        {/* APROFUNDAMENTO: DEDUÇÕES */}
        <section id="deducoes" className="space-y-6 md:space-y-8 mb-12 md:mb-16 scroll-mt-24">
          <DeducoesDeepDive />
        </section>

        {/* APROFUNDAMENTO: PF vs MEI vs EMPRESA */}
        <section id="regimes" className="space-y-6 md:space-y-8 mb-12 md:mb-16 scroll-mt-24">
          <PFvsMEIvsEmpresaDeepDive />
        </section>

        {/* APROFUNDAMENTO: RETENÇÃO (RPA) */}
        <section id="rpa" className="space-y-6 md:space-y-8 mb-12 md:mb-16 scroll-mt-24">
          <RPADeepDive />
        </section>
          </>
        )}
      </main>
    </div>
  );
}
