import { useState, useEffect } from 'react';
import { Music, ChevronDown, ChevronUp, Lightbulb, AlertCircle, BookOpen, DollarSign, CheckCircle2, TrendingUp, FileText, HelpCircle, Zap, BarChart3, Menu, X, Calculator, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import CarneLeaoDeepDive from '@/components/CarneLeaoDeepDive';
import DeducoesDeepDive from '@/components/DeducoesDeepDive';
import PFvsMEIvsEmpresaDeepDive from '@/components/PFvsMEIvsEmpresaDeepDive';
import RPADeepDive from '@/components/RPADeepDive';
import ConsultoriaRapida from '@/components/ConsultoriaRapida';

export default function Ferramentas() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('consultoria');

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
            <Link href="/" className="flex items-center gap-2 text-[#1B4965] hover:text-[#2C5F7F] transition">
              <ArrowLeft size={20} />
              <span className="font-semibold hidden md:inline">Voltar ao Guia</span>
            </Link>
            <div className="h-6 w-px bg-[#E8E3DC] mx-2 hidden md:block"></div>
            <div className="flex items-center gap-2">
              <img src="/images/compasso-fiscal-logo.svg" alt="Compasso Fiscal" className="h-10" style={{ maxWidth: '120px' }} />
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
            <Link href="/" className="block w-full text-left px-4 py-2 rounded-lg text-[#2C3E50] hover:bg-[#F5F2ED] mb-2 font-medium">
              ← Voltar ao Guia
            </Link>
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left px-4 py-2 rounded-lg transition ${
                  activeSection === section.id
                    ? 'bg-[#E07856] text-white'
                    : 'hover:bg-[#F5F2ED] text-[#2C3E50]'
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
      </main>
    </div>
  );
}
