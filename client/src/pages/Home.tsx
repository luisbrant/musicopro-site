import { useState, useEffect } from 'react';
import { Music, ChevronDown, ChevronUp, Lightbulb, AlertCircle, BookOpen, DollarSign, CheckCircle2, TrendingUp, FileText, HelpCircle, Zap, BarChart3, Menu, X, Star, Download, Copy } from 'lucide-react';
import { Link } from 'wouter';
import { EmailCaptureModal } from '@/components/EmailCaptureModal';

export default function Home() {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [copiedCode, setCopiedCode] = useState(false);

  // Detectar seção ativa ao fazer scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'parte1', 'parte2', 'parte3'];
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

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const sections = [
    { id: 'home', title: 'Início', icon: Music },
    { id: 'parte1', title: 'Parte 1: Fundamentos', icon: BookOpen },
    { id: 'parte2', title: 'Parte 2: Gestão Fiscal', icon: DollarSign },
    { id: 'parte3', title: 'Parte 3: Implementação', icon: CheckCircle2 },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white scroll-smooth">
      {/* Header Sticky */}
      <header className="sticky top-0 bg-white border-b border-[#E8E3DC] py-4 px-4 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-lg md:text-xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
              Músico Pro
              <span className="block text-xs md:text-sm font-normal text-[#6ba587]">Organização Fiscal para Músicos</span>
            </h1>
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
            <div className="border-t border-[#E8E3DC] my-2 pt-2">
              <Link href="/premium" className="w-full text-left px-4 py-2 rounded-lg transition text-[#0c2461] hover:bg-[#F5F2ED] block">
                Premium
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* Desktop Sidebar Navigation */}
      <div className="hidden md:fixed md:left-0 md:top-24 md:w-64 md:h-[calc(100vh-96px)] md:bg-[#F9F7F4] md:border-r md:border-[#E8E3DC] md:overflow-y-auto md:p-6 md:z-40">
        <nav className="space-y-2">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition font-medium ${
                  activeSection === section.id
                    ? 'bg-[#0c2461] text-white'
                    : 'text-[#0c2461] hover:bg-[#E8E3DC]'
              }`}
              style={{ fontFamily: activeSection === section.id ? 'Lexend, sans-serif' : 'Poppins, sans-serif' }}
            >
              {section.title}
            </button>
          ))}
          <div className="border-t border-[#E8E3DC] my-4 pt-4">
            <Link href="/premium" className="w-full text-left px-4 py-3 rounded-lg transition font-medium text-[#0c2461] hover:bg-[#E8E3DC] block">
              Premium
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <main className="md:ml-64 px-4 md:px-6 py-6 md:py-8 max-w-5xl mx-auto">
        {/* HOME SECTION */}
        <section id="home" className="space-y-6 md:space-y-8 mb-12 md:mb-16 scroll-mt-24">
          {/* Badge Superior */}
          <div className="flex justify-center">
            <span className="inline-block bg-[#d4af37]/10 text-[#0c2461] px-4 py-2 rounded-full text-xs md:text-sm font-semibold border border-[#d4af37]/30">
              📖 Guia Músico Pro
            </span>
          </div>

          {/* Hero Principal */}
          <div className="bg-gradient-to-br from-[#0c2461] to-[#1a3a5c] rounded-lg md:rounded-xl p-6 md:p-8 text-white space-y-4 md:space-y-6 animate-fade-in-up shadow-lg relative overflow-hidden">
            {/* Título Principal */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight" style={{ fontFamily: 'Lexend, sans-serif' }}>
                Imposto sem medo, do jeito certo
              </h1>
            </div>

            {/* Texto Introdutório */}
            <p className="text-base md:text-lg leading-relaxed opacity-95">
              O Músico Pro é um guia prático para músicos que querem organizar sua vida fiscal com clareza, segurança e sem burocracia.
            </p>

            <p className="text-sm md:text-base leading-relaxed opacity-90">
              Aqui você aprende, de forma simples e direta, como lidar com Imposto de Renda, Carnê-Leão, MEI, pessoa física, pessoa jurídica e deduções, sempre considerando a realidade de quem vive de música.
            </p>

            {/* Linha de Reforço */}
            <p className="text-xs md:text-sm italic opacity-85 border-l-2 border-[#d4af37] pl-4">
              Conteúdo claro, objetivo e atualizado para quem recebe cachês, PIX e tem múltiplas fontes de renda.
            </p>

            {/* Metadados */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-xs md:text-sm border-t border-white/20 pt-4">
              <div className="flex items-center gap-2">
                <BookOpen size={18} className="text-[#d4af37]" />
                <span>Leitura estimada: 45–60 minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-[#d4af37]" />
                <span>Conteúdo atualizado – 2026</span>
              </div>
            </div>

            {/* CTA Principal */}
            <div className="flex flex-col md:flex-row gap-3 pt-4">
              <Link 
                href="/pro" 
                className="flex-1 md:flex-none bg-[#d4af37] hover:bg-[#e5c158] text-[#0c2461] font-bold py-3 px-6 rounded-lg text-center transition transform hover:scale-105 shadow-lg"
              >
                Ver Kit Músico Pro
              </Link>
              <button 
                onClick={() => setIsDownloadModalOpen(true)}
                className="flex-1 md:flex-none bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-lg transition backdrop-blur-sm"
              >
                Acessar conteúdo completo
              </button>
            </div>
          </div>

          {/* Seção: Guia Rápido */}
          <div className="space-y-4 md:space-y-5">
            <h3 className="text-xl md:text-2xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
              ⚡ Guia Rápido
            </h3>

            {/* Para Quem é Este Guia */}
            <div className="bg-[#F9F7F4] rounded-lg p-5 md:p-6 space-y-3">
              <h4 className="font-bold text-[#0c2461] text-base md:text-lg flex items-center gap-2">
                <Lightbulb size={20} className="text-[#d4af37]" />
                Para quem é este guia
              </h4>
              <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-[#0c2461]">
                <li className="flex items-start gap-3">
                  <span className="text-[#d4af37] font-bold mt-0.5">✔</span>
                  <span>Músicos autônomos que recebem cachês e querem se organizar fiscalmente</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#d4af37] font-bold mt-0.5">✔</span>
                  <span>Professores de música com alunos regulares</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#d4af37] font-bold mt-0.5">✔</span>
                  <span>Artistas com múltiplas fontes de renda (shows, direitos, aulas)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#d4af37] font-bold mt-0.5">✔</span>
                  <span>Músicos que querem evitar problemas com a Receita Federal</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-[#FFF3E0] border-l-4 border-[#FF9800] rounded-lg p-5 md:p-6 space-y-3">
            <div className="flex items-start gap-3">
              <AlertCircle size={22} className="text-[#FF9800] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-[#0c2461] text-base md:text-lg">Aviso Importante</h4>
                <p className="text-sm md:text-base text-[#0c2461] mt-2 opacity-90">
                  Este guia é educativo e informativo. A legislação tributária brasileira é dinâmica. Sempre consulte a legislação vigente e procure um contador especializado em atividades artísticas.
                </p>
              </div>
            </div>
          </div>

          {/* Frase de Posicionamento */}
          <div className="bg-gradient-to-r from-[#0c2461]/5 to-[#6ba587]/5 border border-[#6ba587]/20 rounded-lg p-5 md:p-6 text-center">
            <p className="text-sm md:text-base text-[#0c2461] italic">
              <strong>O Músico Pro foi criado por um profissional com experiência em sistema bancário, tecnologia e legislação fiscal, com foco exclusivo na realidade do músico.</strong>
            </p>
          </div>

          {/* Transição para Premium */}
          <div className="bg-[#6ba587]/10 border border-[#6ba587]/30 rounded-lg p-5 md:p-6 space-y-4">
            <h4 className="font-bold text-[#0c2461] text-base md:text-lg">Conteúdo Completo na Área Premium</h4>
            <p className="text-sm md:text-base text-[#0c2461] leading-relaxed">
              Este guia apresenta os conceitos essenciais para você entender sua situação fiscal.
            </p>
            <p className="text-sm md:text-base text-[#0c2461] leading-relaxed">
              Na área premium do Músico Pro, você encontra o conteúdo completo, exemplos práticos, checklists e ferramentas para aplicar tudo com segurança no dia a dia.
            </p>
            <Link 
              href="/premium" 
              className="inline-block bg-[#6ba587] hover:bg-[#5a9476] text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Acessar conteúdo completo
            </Link>
          </div>

          {/* Table of Contents */}
          <div className="bg-[#F9F7F4] rounded-lg p-5 md:p-6 space-y-4">
            <h3 className="text-lg md:text-xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
              📚 Sumário Completo
            </h3>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 text-sm md:text-base">
              <div>
                <h4 className="font-bold text-[#0c2461] mb-3 text-base">Parte 1: Fundamentos</h4>
                <ul className="space-y-1.5 text-[#0c2461]">
                  <li>1. O Conceito de Renda para o Músico</li>
                  <li>2. Obrigatoriedade da Declaração</li>
                  <li>3. Meios de Recebimento</li>
                  <li>4. PF vs PJ</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-[#0c2461] mb-3 text-base">Parte 2: Gestão Fiscal</h4>
                <ul className="space-y-1.5 text-[#0c2461]">
                  <li>5. Carnê-Leão</li>
                  <li>6. Retenção de IR (RPA)</li>
                  <li>7. Despesas Dedutíveis</li>
                  <li>8. Tabela Progressiva</li>
                </ul>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 text-sm md:text-base">
              <div>
                <h4 className="font-bold text-[#0c2461] mb-3 text-base">Parte 3: Implementação</h4>
                <ul className="space-y-1.5 text-[#0c2461]">
                  <li>9. Checklist Prático</li>
                  <li>10. Ferramentas Recomendadas</li>
                  <li>11. Contatos Úteis</li>
                  <li>12. Conclusão</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PARTE 1 - FUNDAMENTOS */}
        <section id="parte1" className="space-y-6 md:space-y-8 mb-12 md:mb-16 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
            📖 Parte 1: Fundamentos
          </h2>

          {/* Seção 1 */}
          <div className="border border-[#E8E3DC] rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('sec1')}
              className="w-full bg-[#F9F7F4] hover:bg-[#E8E3DC] p-4 md:p-5 flex items-center justify-between transition font-semibold text-[#0c2461]"
            >
              <span className="text-base md:text-lg">1. O Conceito de Renda para o Músico</span>
              {expandedSections['sec1'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {expandedSections['sec1'] && (
              <div className="p-4 md:p-5 space-y-3 text-sm md:text-base text-[#0c2461] border-t border-[#E8E3DC]">
                <p>
                  Para a Receita Federal, renda é qualquer valor que você recebe em troca de um serviço prestado. Para o músico, isso inclui:
                </p>
                <ul className="space-y-2 pl-4 list-disc">
                  <li><strong>Cachês</strong> por apresentações</li>
                  <li><strong>Aulas</strong> de música</li>
                  <li><strong>Direitos autorais</strong> e royalties</li>
                  <li><strong>Venda de produtos</strong> (CDs, partituras, etc.)</li>
                  <li><strong>Patrocínios</strong> e parcerias</li>
                </ul>
                <p className="mt-3">
                  <strong>Importante:</strong> A Receita Federal considera renda tanto o dinheiro quanto valores recebidos por PIX, transferência bancária ou qualquer outro meio.
                </p>
              </div>
            )}
          </div>

          {/* Seção 2 */}
          <div className="border border-[#E8E3DC] rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('sec2')}
              className="w-full bg-[#F9F7F4] hover:bg-[#E8E3DC] p-4 md:p-5 flex items-center justify-between transition font-semibold text-[#0c2461]"
            >
              <span className="text-base md:text-lg">2. Obrigatoriedade da Declaração</span>
              {expandedSections['sec2'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {expandedSections['sec2'] && (
              <div className="p-4 md:p-5 space-y-3 text-sm md:text-base text-[#0c2461] border-t border-[#E8E3DC]">
                <p>
                  Você é obrigado a declarar Imposto de Renda se:
                </p>
                <ul className="space-y-2 pl-4 list-disc">
                  <li>Recebeu renda bruta acima de R$ 30.639,90 em 2025</li>
                  <li>Recebeu renda de trabalho não assalariado acima de R$ 876,00</li>
                  <li>Possui bens ou direitos acima de R$ 300.000,00</li>
                  <li>Realizou operações na bolsa de valores</li>
                </ul>
                <p className="mt-3 bg-[#FFF3E0] p-3 rounded border border-[#FFB74D]">
                  <strong>Dica:</strong> Mesmo que não seja obrigado, é recomendável declarar para evitar problemas futuros com a Receita Federal.
                </p>
              </div>
            )}
          </div>

          {/* Seção 3 */}
          <div className="border border-[#E8E3DC] rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('sec3')}
              className="w-full bg-[#F9F7F4] hover:bg-[#E8E3DC] p-4 md:p-5 flex items-center justify-between transition font-semibold text-[#0c2461]"
            >
              <span className="text-base md:text-lg">3. Meios de Recebimento</span>
              {expandedSections['sec3'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {expandedSections['sec3'] && (
              <div className="p-4 md:p-5 space-y-3 text-sm md:text-base text-[#0c2461] border-t border-[#E8E3DC]">
                <p>
                  A forma como você recebe o dinheiro afeta sua tributação:
                </p>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-bold text-[#0c2461]">💰 Dinheiro em espécie</h5>
                    <p>Sem comprovação automática. Você precisa guardar recibos.</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-[#0c2461]">📱 PIX</h5>
                    <p>Deixa rastro. A Receita Federal consegue rastrear.</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-[#0c2461]">🏦 Transferência bancária</h5>
                    <p>Comprovação automática. Recomendado para valores maiores.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Seção 4 */}
          <div className="border border-[#E8E3DC] rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('sec4')}
              className="w-full bg-[#F9F7F4] hover:bg-[#E8E3DC] p-4 md:p-5 flex items-center justify-between transition font-semibold text-[#0c2461]"
            >
              <span className="text-base md:text-lg">4. PF vs PJ: Qual Escolher?</span>
              {expandedSections['sec4'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {expandedSections['sec4'] && (
              <div className="p-4 md:p-5 space-y-4 text-sm md:text-base text-[#0c2461] border-t border-[#E8E3DC]">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[#F9F7F4] p-4 rounded">
                    <h5 className="font-bold text-[#0c2461] mb-2">👤 Pessoa Física (PF)</h5>
                    <ul className="space-y-1 text-xs md:text-sm">
                      <li>✓ Mais simples</li>
                      <li>✓ Menos burocracia</li>
                      <li>✗ Tributação progressiva</li>
                      <li>✗ Sem deduções de despesas</li>
                    </ul>
                  </div>
                  <div className="bg-[#E8F5E9] p-4 rounded">
                    <h5 className="font-bold text-[#0c2461] mb-2">🏢 Pessoa Jurídica (PJ)</h5>
                    <ul className="space-y-1 text-xs md:text-sm">
                      <li>✓ Dedução de despesas</li>
                      <li>✓ Alíquota fixa (MEI/Simples)</li>
                      <li>✗ Mais burocracia</li>
                      <li>✗ Custos de manutenção</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* PARTE 2 - GESTÃO FISCAL */}
        <section id="parte2" className="space-y-6 md:space-y-8 mb-12 md:mb-16 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
            💰 Parte 2: Gestão Fiscal
          </h2>

          {/* Seção 5 */}
          <div className="border border-[#E8E3DC] rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('sec5')}
              className="w-full bg-[#F9F7F4] hover:bg-[#E8E3DC] p-4 md:p-5 flex items-center justify-between transition font-semibold text-[#0c2461]"
            >
              <span className="text-base md:text-lg">5. Carnê-Leão: O que é e Como Pagar</span>
              {expandedSections['sec5'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {expandedSections['sec5'] && (
              <div className="p-4 md:p-5 space-y-3 text-sm md:text-base text-[#0c2461] border-t border-[#E8E3DC]">
                <p>
                  O Carnê-Leão é um imposto que você paga mensalmente sobre a renda que recebe como autônomo.
                </p>
                <div className="bg-[#E3F2FD] p-4 rounded border border-[#64B5F6]">
                  <p><strong>Como funciona:</strong></p>
                  <ul className="space-y-1 mt-2 pl-4 list-disc">
                    <li>Você calcula 15% sobre a renda recebida</li>
                    <li>Paga mensalmente até o 15º dia do mês seguinte</li>
                    <li>Guarda o comprovante para a declaração anual</li>
                  </ul>
                </div>
                <p className="mt-3">
                  <strong>Exemplo:</strong> Se você recebeu R$ 1.000 em janeiro, paga R$ 150 de Carnê-Leão até 15 de fevereiro.
                </p>
              </div>
            )}
          </div>

          {/* Seção 6 */}
          <div className="border border-[#E8E3DC] rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('sec6')}
              className="w-full bg-[#F9F7F4] hover:bg-[#E8E3DC] p-4 md:p-5 flex items-center justify-between transition font-semibold text-[#0c2461]"
            >
              <span className="text-base md:text-lg">6. Retenção de IR (RPA)</span>
              {expandedSections['sec6'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {expandedSections['sec6'] && (
              <div className="p-4 md:p-5 space-y-3 text-sm md:text-base text-[#0c2461] border-t border-[#E8E3DC]">
                <p>
                  RPA significa "Recibo de Pagamento Autônomo". Quando uma pessoa ou empresa te contrata, ela pode reter 15% do seu cachê como antecipação de imposto.
                </p>
                <div className="bg-[#FFF3E0] p-4 rounded border border-[#FFB74D]">
                  <p><strong>Importante:</strong> Essa retenção é creditada na sua declaração anual. Se você pagou mais do que deve, recebe restituição.</p>
                </div>
              </div>
            )}
          </div>

          {/* Seção 7 */}
          <div className="border border-[#E8E3DC] rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('sec7')}
              className="w-full bg-[#F9F7F4] hover:bg-[#E8E3DC] p-4 md:p-5 flex items-center justify-between transition font-semibold text-[#0c2461]"
            >
              <span className="text-base md:text-lg">7. Despesas Dedutíveis</span>
              {expandedSections['sec7'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {expandedSections['sec7'] && (
              <div className="p-4 md:p-5 space-y-3 text-sm md:text-base text-[#0c2461] border-t border-[#E8E3DC]">
                <p>
                  Se você é PJ (MEI ou Simples), pode deduzir despesas da sua renda:
                </p>
                <ul className="space-y-2 pl-4 list-disc">
                  <li>🎸 Instrumentos musicais</li>
                  <li>🎤 Equipamentos de áudio</li>
                  <li>🚗 Transporte para shows</li>
                  <li>📚 Cursos e treinamentos</li>
                  <li>🏢 Aluguel de estúdio</li>
                  <li>💻 Software e tecnologia</li>
                </ul>
                <p className="mt-3 bg-[#E8F5E9] p-3 rounded border border-[#81C784]">
                  <strong>Dica:</strong> Guarde todas as notas fiscais e recibos. A Receita Federal pode pedir comprovação.
                </p>
              </div>
            )}
          </div>

          {/* Seção 8 */}
          <div className="border border-[#E8E3DC] rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('sec8')}
              className="w-full bg-[#F9F7F4] hover:bg-[#E8E3DC] p-4 md:p-5 flex items-center justify-between transition font-semibold text-[#0c2461]"
            >
              <span className="text-base md:text-lg">8. Tabela Progressiva de IR</span>
              {expandedSections['sec8'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {expandedSections['sec8'] && (
              <div className="p-4 md:p-5 space-y-3 text-sm md:text-base text-[#0c2461] border-t border-[#E8E3DC]">
                <p>
                  Se você é PF, a alíquota de IR aumenta conforme sua renda:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs md:text-sm">
                    <thead>
                      <tr className="bg-[#F9F7F4]">
                        <th className="text-left p-2 border border-[#E8E3DC]">Renda Mensal</th>
                        <th className="text-left p-2 border border-[#E8E3DC]">Alíquota</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 border border-[#E8E3DC]">Até R$ 2.112</td>
                        <td className="p-2 border border-[#E8E3DC]">Isento</td>
                      </tr>
                      <tr className="bg-[#F9F7F4]">
                        <td className="p-2 border border-[#E8E3DC]">R$ 2.112 a R$ 2.826</td>
                        <td className="p-2 border border-[#E8E3DC]">7,5%</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-[#E8E3DC]">R$ 2.826 a R$ 3.751</td>
                        <td className="p-2 border border-[#E8E3DC]">15%</td>
                      </tr>
                      <tr className="bg-[#F9F7F4]">
                        <td className="p-2 border border-[#E8E3DC]">R$ 3.751 a R$ 4.664</td>
                        <td className="p-2 border border-[#E8E3DC]">22,5%</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-[#E8E3DC]">Acima de R$ 4.664</td>
                        <td className="p-2 border border-[#E8E3DC]">27,5%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* PARTE 3 - IMPLEMENTAÇÃO */}
        <section id="parte3" className="space-y-6 md:space-y-8 mb-12 md:mb-16 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
            ✅ Parte 3: Implementação
          </h2>

          {/* Seção 9 */}
          <div className="border border-[#E8E3DC] rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('sec9')}
              className="w-full bg-[#F9F7F4] hover:bg-[#E8E3DC] p-4 md:p-5 flex items-center justify-between transition font-semibold text-[#0c2461]"
            >
              <span className="text-base md:text-lg">9. Checklist Prático</span>
              {expandedSections['sec9'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {expandedSections['sec9'] && (
              <div className="p-4 md:p-5 space-y-3 text-sm md:text-base text-[#0c2461] border-t border-[#E8E3DC]">
                <p className="font-semibold">Passos para organizar sua vida fiscal:</p>
                <ul className="space-y-2 pl-4 list-disc">
                  <li>☐ Abrir conta bancária separada para renda de música</li>
                  <li>☐ Guardar todos os recibos e notas fiscais</li>
                  <li>☐ Registrar a renda mensalmente (planilha ou app)</li>
                  <li>☐ Pagar Carnê-Leão mensalmente</li>
                  <li>☐ Consultar um contador especializado</li>
                  <li>☐ Fazer a declaração anual de IR</li>
                </ul>
              </div>
            )}
          </div>

          {/* Seção 10 */}
          <div className="border border-[#E8E3DC] rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('sec10')}
              className="w-full bg-[#F9F7F4] hover:bg-[#E8E3DC] p-4 md:p-5 flex items-center justify-between transition font-semibold text-[#0c2461]"
            >
              <span className="text-base md:text-lg">10. Ferramentas Recomendadas</span>
              {expandedSections['sec10'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {expandedSections['sec10'] && (
              <div className="p-4 md:p-5 space-y-3 text-sm md:text-base text-[#0c2461] border-t border-[#E8E3DC]">
                <ul className="space-y-2">
                  <li><strong>📊 Planilhas:</strong> Google Sheets ou Excel para registrar renda</li>
                  <li><strong>💰 Apps:</strong> Nubank, Banco Inter (para separar renda)</li>
                  <li><strong>📱 Nota Fiscal:</strong> Gerador de RPA online</li>
                  <li><strong>🧮 Calculadoras:</strong> Simule seu IR antes de declarar</li>
                </ul>
              </div>
            )}
          </div>

          {/* Seção 11 */}
          <div className="border border-[#E8E3DC] rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('sec11')}
              className="w-full bg-[#F9F7F4] hover:bg-[#E8E3DC] p-4 md:p-5 flex items-center justify-between transition font-semibold text-[#0c2461]"
            >
              <span className="text-base md:text-lg">11. Contatos Úteis</span>
              {expandedSections['sec11'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {expandedSections['sec11'] && (
              <div className="p-4 md:p-5 space-y-3 text-sm md:text-base text-[#0c2461] border-t border-[#E8E3DC]">
                <ul className="space-y-2">
                  <li><strong>🏛️ Receita Federal:</strong> www.gov.br/receitafederal</li>
                  <li><strong>💼 Sindicato dos Músicos:</strong> Consulte sua região</li>
                  <li><strong>📞 Contador Especializado:</strong> Busque profissionais com experiência em atividades artísticas</li>
                </ul>
              </div>
            )}
          </div>

          {/* Seção 12 */}
          <div className="border border-[#E8E3DC] rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('sec12')}
              className="w-full bg-[#F9F7F4] hover:bg-[#E8E3DC] p-4 md:p-5 flex items-center justify-between transition font-semibold text-[#0c2461]"
            >
              <span className="text-base md:text-lg">12. Conclusão</span>
              {expandedSections['sec12'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {expandedSections['sec12'] && (
              <div className="p-4 md:p-5 space-y-3 text-sm md:text-base text-[#0c2461] border-t border-[#E8E3DC]">
                <p>
                  Organizar sua vida fiscal não precisa ser complicado. Com as informações certas e um pouco de disciplina, você consegue:
                </p>
                <ul className="space-y-2 pl-4 list-disc">
                  <li>✓ Evitar problemas com a Receita Federal</li>
                  <li>✓ Aproveitar deduções e economizar impostos</li>
                  <li>✓ Ter clareza sobre sua renda</li>
                  <li>✓ Focar no que realmente importa: sua música</li>
                </ul>
                <p className="mt-3 font-semibold text-[#0c2461]">
                  O Músico Pro está aqui para ajudar você nessa jornada. 🎵
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-r from-[#0c2461] to-[#1a3a5c] rounded-lg p-6 md:p-8 text-white space-y-4 text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Lexend, sans-serif' }}>
            Pronto para organizar sua vida fiscal?
          </h3>
          <p className="text-base md:text-lg opacity-90">
            Acesse a área premium com ferramentas, calculadoras e conteúdo completo.
          </p>
          <div className="flex flex-col md:flex-row gap-3 justify-center">
            <Link 
              href="/premium" 
              className="bg-[#d4af37] hover:bg-[#e5c158] text-[#0c2461] font-bold py-3 px-8 rounded-lg transition"
            >
              Acessar Premium
            </Link>
            <Link 
              href="/pro" 
              className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-lg transition backdrop-blur-sm"
            >
              Ver Planos
            </Link>
          </div>
        </section>
      </main>

      {/* Email Capture Modal */}
      <EmailCaptureModal 
        isOpen={isDownloadModalOpen} 
        onClose={() => setIsDownloadModalOpen(false)}
        downloadUrl="/Guia-IR-Musicos-2026.pdf"
        fileName="Guia-IR-Musicos-2026.pdf"
      />
    </div>
  );
}
