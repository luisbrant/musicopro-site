import { useState, useEffect } from 'react';
import { Music, ChevronDown, ChevronUp, Lightbulb, AlertCircle, BookOpen, DollarSign, CheckCircle2, TrendingUp, FileText, HelpCircle, Zap, BarChart3, Menu, X, Star, Download, Copy } from 'lucide-react';
import { Link } from 'wouter';
import { EmailCaptureModal } from '@/components/EmailCaptureModal';
import LockedTeaser from '@/components/LockedTeaser';
import Footer from '@/components/Footer';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function Home() {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [copiedCode, setCopiedCode] = useState(false);
  const { trackBuyClick, trackDownloadAppClick, trackPremiumClick, trackPageView } = useAnalytics();

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
              <span className="block text-xs md:text-sm font-normal text-[#6ba587]">Guia + App para organizar sua vida fiscal como músico autônomo</span>
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
                Imposto sem medo, do jeito certo.
              </h1>
            </div>

            {/* Texto Introdutório */}
            <p className="text-base md:text-lg leading-relaxed opacity-95">
              Músico Pro é um guia prático + app para músicos que querem organizar sua vida fiscal com clareza, segurança e sem burocracia.
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
                Comprar Licença PRO
              </Link>
              <button 
                onClick={() => setIsDownloadModalOpen(true)}
                className="flex-1 md:flex-none bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-lg transition backdrop-blur-sm"
              >
                Baixar App Grátis
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
                  <span>Músicos autônomos que recebem cachês e querem se organizar fiscalmente.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#d4af37] font-bold mt-0.5">✔</span>
                  <span>Professores de música com alunos regulares.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#d4af37] font-bold mt-0.5">✔</span>
                  <span>Artistas com múltiplas fontes de renda (shows, direitos, aulas).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#d4af37] font-bold mt-0.5">✔</span>
                  <span>Músicos que querem evitar problemas com a Receita Federal.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Seção: Por que o App é Essencial */}
          <div className="bg-gradient-to-br from-[#0c2461]/5 to-[#d4af37]/5 border border-[#d4af37]/30 rounded-lg p-5 md:p-8 space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-2xl md:text-3xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                🎵 Por que o App Músico Pro é essencial para músicos?
              </h3>
              <p className="text-base md:text-lg text-[#0c2461] font-semibold">
                Porque músico não tem salário fixo — e a Receita não aceita bagunça.
              </p>
            </div>

            <div className="space-y-4 text-sm md:text-base text-[#0c2461] leading-relaxed">
              <p>
                Músicos autônomos recebem de várias formas: PIX, cachê, aulas, eventos, bandas diferentes.
              </p>
              <p>
                Sem controle mensal, isso vira problema com o Imposto de Renda.
              </p>
              <p>
                <strong>O App Músico Pro foi criado para resolver exatamente isso:</strong> organizar receitas e despesas do jeito que a Receita Federal exige, sem planilhas complicadas.
              </p>
            </div>

            {/* Benefícios */}
            <div className="bg-white rounded-lg p-5 md:p-6 space-y-3">
              <h4 className="font-bold text-[#0c2461] text-base md:text-lg mb-4">Benefícios do App:</h4>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-3">
                  <span className="text-[#d4af37] font-bold mt-0.5">✔</span>
                  <span>Registre todas as receitas (PIX, cachê, aulas, eventos).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#d4af37] font-bold mt-0.5">✔</span>
                  <span>Lance despesas dedutíveis (instrumentos, transporte, estudo).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#d4af37] font-bold mt-0.5">✔</span>
                  <span>Veja quanto imposto pagar no Carnê-Leão.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#d4af37] font-bold mt-0.5">✔</span>
                  <span>Gere o valor correto do DARF mensal.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#d4af37] font-bold mt-0.5">✔</span>
                  <span>Evite multas, juros e dor de cabeça no futuro.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#d4af37] font-bold mt-0.5">✔</span>
                  <span>Tenha tudo organizado se cair na malha fina.</span>
                </li>
              </ul>
            </div>

            {/* Comparação */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 md:p-5 space-y-2">
                <h5 className="font-bold text-[#0c2461] text-base">❌ Sem o app:</h5>
                <ul className="space-y-1.5 text-sm text-[#0c2461]">
                  <li>• Anotações soltas</li>
                  <li>• Esquecimento de rendimentos</li>
                  <li>• Medo do imposto</li>
                  <li>• Multa e atraso no DARF</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 md:p-5 space-y-2">
                <h5 className="font-bold text-[#0c2461] text-base">✅ Com o App Músico Pro:</h5>
                <ul className="space-y-1.5 text-sm text-[#0c2461]">
                  <li>• Tudo organizado mês a mês</li>
                  <li>• Imposto calculado automaticamente</li>
                  <li>• Segurança para declarar</li>
                  <li>• Tranquilidade com a Receita</li>
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-white rounded-lg p-5 md:p-6 space-y-4 text-center">
              <p className="text-base md:text-lg font-bold text-[#0c2461]">
                O imposto não espera.
              </p>
              <p className="text-sm md:text-base text-[#0c2461]">
                Organize sua vida fiscal como músico, mês a mês.
              </p>
              <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center">
                <Link
                  href="/pro"
                  onClick={() => trackBuyClick()}
                  className="bg-[#d4af37] hover:bg-[#e5c158] text-[#0c2461] font-bold py-3 px-6 rounded-lg transition"
                >
                  Comprar Licença PRO
                </Link>
                <button
                  onClick={() => {
                    trackDownloadAppClick();
                    setIsDownloadModalOpen(true);
                  }}
                  className="bg-[#6ba587] hover:bg-[#5a9476] text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  Baixar App Grátis
                </button>
              </div>
            </div>

            {/* Frase-chave de reforço */}
            <div className="bg-[#0c2461] text-white rounded-lg p-5 md:p-6 text-center space-y-2">
              <p className="text-base md:text-lg font-bold">
                O Músico Pro não é só um guia.
              </p>
              <p className="text-sm md:text-base opacity-90">
                É um sistema de organização fiscal para quem vive de música.
              </p>
            </div>
          </div>

          {/* Conteúdo das Seções */}
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
              Entrar no Premium (tenho código)
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
                  <li><strong>Cachês</strong> por apresentações.</li>
                  <li><strong>Aulas</strong> de música.</li>
                  <li><strong>Direitos autorais</strong> e royalties.</li>
                  <li><strong>Venda de produtos</strong> (CDs, partituras, etc.).</li>
                  <li><strong>Patrocínios</strong> e parcerias.</li>
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
                  <li>Recebeu renda bruta acima de R$ 30.639,90 em 2025.</li>
                  <li>Recebeu renda de trabalho não assalariado acima de R$ 876,00.</li>
                  <li>Possui bens ou direitos acima de R$ 300.000,00.</li>
                  <li>Realizou operações na bolsa de valores.</li>
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
                      <li>✓ Mais simples.</li>
                      <li>✓ Menos burocracia.</li>
                      <li>✗ Tributação progressiva.</li>
                      <li>✗ Sem deduções de despesas.</li>
                    </ul>
                  </div>
                  <div className="bg-[#E8F5E9] p-4 rounded">
                    <h5 className="font-bold text-[#0c2461] mb-2">🏢 Pessoa Jurídica (PJ)</h5>
                    <ul className="space-y-1 text-xs md:text-sm">
                      <li>✓ Dedução de despesas.</li>
                      <li>✓ Alíquota fixa (MEI/Simples).</li>
                      <li>✗ Mais burocracia.</li>
                      <li>✗ Custos de manutenção.</li>
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
          <div className="border-2 border-[#d4af37] rounded-lg overflow-hidden bg-gradient-to-br from-[#FFF9E6] to-[#F9F7F4]">
            <button
              onClick={() => toggleSection('sec5')}
              className="w-full bg-[#d4af37] hover:bg-[#c99a2e] p-4 md:p-5 flex items-center justify-between transition font-bold text-[#0c2461]"
            >
              <span className="text-base md:text-lg flex items-center gap-2">
                <span>🎁</span>
                5. Carnê-Leão: O que é e Como Pagar (GRATUITO)
              </span>
              {expandedSections['sec5'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {expandedSections['sec5'] && (
              <div className="p-4 md:p-5 space-y-4 text-sm md:text-base text-[#0c2461] border-t border-[#d4af37]">
                <p>
                  O Carnê-Leão é um imposto que você paga mensalmente sobre a renda que recebe como autônomo. É uma das obrigações mais importantes para músicos que trabalham como PF (Pessoa Física).
                </p>

                <div className="bg-[#E3F2FD] p-4 rounded border border-[#64B5F6]">
                  <p><strong>Como funciona:</strong></p>
                  <ul className="space-y-1 mt-2 pl-4 list-disc">
                    <li>Você calcula 15% sobre a renda bruta recebida.</li>
                    <li>Paga mensalmente até o 15º dia do mês seguinte.</li>
                    <li>Guarda o comprovante para a declaração anual.</li>
                    <li>O valor pago é creditado no Imposto de Renda anual.</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <p><strong>Exemplos Práticos:</strong></p>
                  
                  <div className="bg-[#E8F5E9] p-4 rounded border border-[#81C784]">
                    <p className="font-bold text-[#2E7D32] mb-2">Exemplo 1: Recebimento por PIX</p>
                    <ul className="space-y-1 pl-4 list-disc text-sm">
                      <li>Você recebe R$ 500 de um cachê por PIX em janeiro.</li>
                      <li>Carnê-Leao devido: R$ 500 × 15% = R$ 75.</li>
                      <li>Prazo para pagar: até 15 de fevereiro.</li>
                      <li>Comprovante: guarde o recibo do Carnê-Leão.</li>
                    </ul>
                  </div>

                  <div className="bg-[#FCE4EC] p-4 rounded border border-[#F48FB1]">
                    <p className="font-bold text-[#C2185B] mb-2">Exemplo 2: Múltiplos Cachês no Mês</p>
                    <ul className="space-y-1 pl-4 list-disc text-sm">
                      <li>Janeiro: R$ 300 (show) + R$ 200 (aulas) + R$ 150 (gravacao) = R$ 650.</li>
                      <li>Carnê-Leao devido: R$ 650 × 15% = R$ 97,50.</li>
                      <li>Você paga uma única guia com o total acumulado.</li>
                    </ul>
                  </div>

                  <div className="bg-[#FFF3E0] p-4 rounded border border-[#FFB74D]">
                    <p className="font-bold text-[#E65100] mb-2">Exemplo 3: Aulas Regulares (Pessoa Física)</p>
                    <ul className="space-y-1 pl-4 list-disc text-sm">
                      <li>Você dá 5 aulas por mês a R$ 100 cada = R$ 500.</li>
                      <li>Carnê-Leao: R$ 500 × 15% = R$ 75 mensais.</li>
                      <li>Anual: R$ 75 × 12 = R$ 900 de Carnê-Leão.</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-[#E8F5E9] p-3 rounded border border-[#81C784]">
                  <p><strong>Dica:</strong> Organize seus recibos mensalmente. Isso facilita a declaração de IR e evita multas.</p>
                </div>

                <div className="bg-[#FFF3E0] p-3 rounded border border-[#FFB74D]">
                  <p><strong>Importante:</strong> Se você é MEI ou PJ, as regras são diferentes. Consulte a seção "PF vs PJ" para entender melhor.</p>
                </div>

                <div className="bg-gradient-to-r from-[#0c2461] to-[#1a3a5c] rounded-lg p-6 text-white space-y-3 mt-6">
                  <p className="font-bold text-lg flex items-center gap-2">
                    <Zap size={20} className="text-[#d4af37]" />
                    Quer exemplos completos, checklists e calculadoras prontas?
                  </p>
                  <p className="text-sm opacity-90">
                    Acesse o Premium do Músico Pro e tenha acesso a:
                  </p>
                  <ul className="space-y-1 pl-4 list-disc text-sm">
                    <li>Calculadora de Carnê-Leão automatizada.</li>
                    <li>Checklist mensal de obrigações.</li>
                    <li>Planilha de controle de cachês.</li>
                    <li>Exemplos com diferentes cenários.</li>
                  </ul>
                  <Link href="/pro">
                    <button className="w-full bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold py-3 rounded-lg transition mt-4">
                      Comprar Licença PRO
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Seção 6 - TEASER COM CADEADO */}
          <LockedTeaser
            title="6. Retenção de IR (RPA)"
            preview="RPA significa 'Recibo de Pagamento Autônomo'. Quando uma pessoa ou empresa te contrata, ela pode reter 15% do seu cachê como antecipação de imposto. No Premium, você aprende como essa retenção funciona, como receber restituição e como calcular corretamente."
            icon="💵"
          />

          {/* Seção 7 - TEASER COM CADEADO */}
          <LockedTeaser
            title="7. Despesas Dedutíveis"
            preview="Se você é PJ (MEI ou Simples), pode deduzir despesas da sua renda, como instrumentos, equipamentos, transporte e cursos. No Premium, você tem uma lista completa de despesas dedutíveis, exemplos reais de como registrá-las e dicas para não cometer erros com a Receita Federal."
            icon="🎸"
          />

          {/* Seção 8 - TEASER COM CADEADO */}
          <LockedTeaser
            title="8. Tabela Progressiva de IR"
            preview="Se você é PF, a alíquota de IR aumenta conforme sua renda. Entender essa tabela é essencial para calcular quanto você vai pagar. No Premium, você tem a tabela atualizada para 2026, exemplos de cálculo e uma ferramenta interativa para simular seu imposto."
            icon="📊"
          />
        </section>

        {/* PARTE 3 - IMPLEMENTAÇÃO */}
        <section id="parte3" className="space-y-6 md:space-y-8 mb-12 md:mb-16 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
            ✅ Parte 3: Implementação
          </h2>

          {/* Seção 9 - TEASER COM CADEADO */}
          <LockedTeaser
            title="9. Checklist Prático"
            preview="Um passo a passo completo para organizar sua vida fiscal: abrir contas bancárias separadas para organização, guardar recibos, registrar renda, pagar Carnê-Leão e fazer a declaração anual. Use o App Músico Pro para automatizar esse processo. No Premium, você tem checklists mensais prontos para imprimir e usar."
            icon="✅"
          />

          {/* Seção 10 - TEASER COM CADEADO */}
          <LockedTeaser
            title="10. Ferramentas Recomendadas"
            preview="Descubra as melhores ferramentas para organizar sua vida fiscal: planilhas, apps de banco, geradores de RPA e calculadoras de imposto. O App Músico Pro integra todas essas funções em um único lugar. No Premium, você tem links diretos, tutoriais de uso e recomendações personalizadas."
            icon="🛠️"
          />

          {/* Seção 11 - TEASER COM CADEADO */}
          <LockedTeaser
            title="11. Contatos Úteis"
            preview="Contatos da Receita Federal, sindicatos de músicos e recomendações de contadores especializados em atividades artísticas. Com o App Músico Pro, você terá documentação organizada para apresentar ao seu contador. No Premium, você tem uma lista completa com links e dicas de como escolher o profissional certo."
            icon="📞"
          />

          {/* Seção 12 - TEASER COM CADEADO */}
          <LockedTeaser
            title="12. Conclusão e Próximos Passos"
            preview="Um resumo de tudo que você aprendeu e um plano de ação para os próximos 30 dias. Implemente tudo com o App Músico Pro e tenha sua vida fiscal organizada. No Premium, você tem um guia passo a passo para implementar tudo na sua rotina e evitar problemas com a Receita Federal."
            icon="🌟"
          />
        </section>

        {/* PARTE 4 - CTA FINAL */}
        <section className="space-y-6 md:space-y-8 mb-12 md:mb-16">
          <div className="bg-gradient-to-r from-[#0c2461] to-[#6ba587] rounded-lg p-6 md:p-8 text-white space-y-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold">Pronto para organizar sua vida fiscal?</h2>
            <p className="text-sm md:text-base opacity-90">
              Acesse a área premium com ferramentas, calculadoras e conteúdo completo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Link href="/pro">
                <button className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-6 py-3 rounded-lg transition">
                  Comprar Licença PRO
                </button>
              </Link>
              <Link href="/premium">
                <button className="bg-white/20 hover:bg-white/30 text-white font-bold px-6 py-3 rounded-lg transition border border-white">
                  Entrar no Premium (tenho código)
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Mini Bio - Autoridade */}
        <section className="bg-[#F9F7F4] rounded-lg p-6 md:p-8 space-y-4 mb-12 border-l-4 border-[#d4af37]">
          <div className="flex items-start gap-4">
            <div className="text-3xl">📊</div>
            <div className="text-left">
              <h3 className="text-lg md:text-xl font-bold text-[#0c2461] mb-3" style={{ fontFamily: 'Lexend, sans-serif' }}>
                Quem está por trás do Músico Pro
              </h3>
              <p className="text-sm md:text-base text-[#0c2461] leading-relaxed mb-3">
                Sou profissional de tecnologia com experiência em sistemas e organização financeira.
              </p>
              <p className="text-sm md:text-base text-[#0c2461] leading-relaxed">
                Criei o Músico Pro para ajudar músicos autônomos a entender e organizar seus impostos de forma prática, sem juridiquês e sem depender de terceiros para o básico.
              </p>
            </div>
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
              href="/pro" 
              className="bg-[#d4af37] hover:bg-[#e5c158] text-[#0c2461] font-bold py-3 px-8 rounded-lg transition"
            >
              Comprar Licença PRO
            </Link>
            <Link 
              href="/premium" 
              className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-lg transition backdrop-blur-sm"
            >
              Entrar no Premium (tenho código)
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
