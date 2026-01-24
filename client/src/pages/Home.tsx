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

  const copyAccessCode = () => {
    navigator.clipboard.writeText('MUSICOPRO2026PREMIUM');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E8E3DC]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="w-8 h-8 text-[#d4af37]" />
            <div>
              <h1 className="font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>Músico Pro</h1>
              <p className="text-xs text-[#6ba587]">Guia + App para organizar sua vida fiscal como músico autônomo</p>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#0c2461]"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* HERO SECTION */}
        <section id="home" className="mb-12 md:mb-16 scroll-mt-24">
          <div className="bg-gradient-to-br from-[#0c2461] to-[#1a3a7a] rounded-lg p-6 md:p-10 text-white space-y-6">
            <div className="inline-block bg-[#d4af37]/20 text-[#d4af37] px-3 py-1 rounded-full text-sm font-semibold">
              📖 Guia Músico Pro
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">Imposto sem medo, do jeito certo.</h2>
            <p className="text-base md:text-lg opacity-90">
              Músico Pro é um guia prático + app para músicos que querem organizar sua vida fiscal com clareza, segurança e sem burocracia.
            </p>
            <p className="text-base md:text-lg opacity-90">
              Aqui você aprende, de forma simples e direta, como lidar com Imposto de Renda, Carnê-Leão, MEI, pessoa física, pessoa jurídica e deduções, sempre considerando a realidade de quem vive de música.
            </p>
            <p className="text-sm md:text-base opacity-75 italic border-l-4 border-[#d4af37] pl-4">
              Conteúdo claro, objetivo e atualizado para quem recebe cachês, PIX e tem múltiplas fontes de renda.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <div className="text-sm opacity-75">
                📖 Leitura estimada: 45–60 minutos
              </div>
              <div className="text-sm opacity-75">
                ⚡ Conteúdo atualizado – 2026
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <Link href="/pro">
                <button
                  onClick={() => trackBuyClick()}
                  className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-6 py-3 rounded-lg transition w-full sm:w-auto"
                >
                  Comprar Licença PRO
                </button>
              </Link>
              <button
                onClick={() => trackDownloadAppClick()}
                className="bg-white/20 hover:bg-white/30 text-white font-bold px-6 py-3 rounded-lg transition border border-white w-full sm:w-auto"
              >
                Baixar App Grátis
              </button>
            </div>
          </div>
        </section>

        {/* GUIA RÁPIDO */}
        <section className="mb-12 md:mb-16 space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold text-[#0c2461] flex items-center gap-3" style={{ fontFamily: 'Lexend, sans-serif' }}>
            <Zap className="w-6 h-6 text-[#d4af37]" />
            Guia Rápido
          </h3>

          <div className="bg-[#F9F7F4] rounded-lg p-6 md:p-8 space-y-4">
            <h4 className="text-lg md:text-xl font-bold text-[#0c2461]">Para quem é este guia</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-[#d4af37] font-bold mt-1">✔</span>
                <span className="text-[#0c2461]">Músicos autônomos que recebem cachês e querem se organizar fiscalmente.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#d4af37] font-bold mt-1">✔</span>
                <span className="text-[#0c2461]">Professores de música com alunos regulares.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#d4af37] font-bold mt-1">✔</span>
                <span className="text-[#0c2461]">Artistas com múltiplas fontes de renda (shows, direitos, aulas).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#d4af37] font-bold mt-1">✔</span>
                <span className="text-[#0c2461]">Músicos que querem evitar problemas com a Receita Federal.</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#fff3cd] border-l-4 border-[#ffc107] rounded p-4">
            <p className="text-sm md:text-base text-[#856404]">
              <strong>⚠️ Aviso Importante:</strong> Este guia é educativo e informativo. A legislação tributária brasileira é dinâmica. Sempre consulte a legislação vigente e procure um contador especializado em atividades artísticas.
            </p>
          </div>
        </section>

        {/* POR QUE O APP É ESSENCIAL */}
        <section className="mb-12 md:mb-16 space-y-6 bg-gradient-to-br from-[#0c2461] to-[#1a3a7a] rounded-lg p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3" style={{ fontFamily: 'Lexend, sans-serif' }}>
            <Music className="w-6 h-6 text-[#d4af37]" />
            Por que o App Músico Pro é essencial para músicos?
          </h3>

          <p className="text-lg font-semibold text-white">Porque músico não tem salário fixo — e a Receita não aceita bagunça.</p>

          <div className="space-y-4 text-white">
            <p className="opacity-90">
              Músicos autônomos recebem de várias formas: PIX, cachê, aulas, eventos, bandas diferentes.
            </p>
            <p className="opacity-90">
              Sem controle mensal, isso vira problema com o Imposto de Renda.
            </p>
            <p className="font-semibold opacity-95">
              O App Músico Pro foi criado para resolver exatamente isso: organizar receitas e despesas do jeito que a Receita Federal exige, sem planilhas complicadas.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 space-y-4 border border-white/20">
            <h4 className="text-lg font-bold text-white">Benefícios do App:</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <span className="text-white">Registre todas as receitas (PIX, cachê, aulas, eventos).</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <span className="text-white">Lance despesas dedutíveis (instrumentos, transporte, estudo).</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <span className="text-white">Veja quanto imposto pagar no Carnê-Leão.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <span className="text-white">Gere o valor correto do DARF mensal.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <span className="text-white">Evite multas, juros e dor de cabeça no futuro.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <span className="text-white">Tenha tudo organizado se cair na malha fina.</span>
              </li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#ffe5e5] border-l-4 border-[#dc3545] rounded-lg p-6">
              <h4 className="font-bold text-[#721c24] mb-3">❌ Sem o app:</h4>
              <ul className="space-y-2 text-sm text-[#721c24]">
                <li>• Anotações soltas</li>
                <li>• Esquecimento de rendimentos</li>
                <li>• Medo do imposto</li>
                <li>• Multa e atraso no DARF</li>
              </ul>
            </div>
            <div className="bg-[#e5f5e5] border-l-4 border-[#28a745] rounded-lg p-6">
              <h4 className="font-bold text-[#155724] mb-3">✅ Com o App Músico Pro:</h4>
              <ul className="space-y-2 text-sm text-[#155724]">
                <li>• Tudo organizado mês a mês</li>
                <li>• Imposto calculado automaticamente</li>
                <li>• Segurança para declarar</li>
                <li>• Tranquilidade com a Receita</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#0c2461] to-[#6ba587] rounded-lg p-6 md:p-8 text-white text-center space-y-4">
            <p className="text-lg font-semibold">O imposto não espera.</p>
            <p className="text-base opacity-90">Organize sua vida fiscal como músico, mês a mês.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Link href="/pro">
                <button
                  onClick={() => trackBuyClick()}
                  className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-6 py-3 rounded-lg transition w-full sm:w-auto"
                >
                  Comprar Licença PRO
                </button>
              </Link>
              <button
                onClick={() => trackDownloadAppClick()}
                className="bg-white/20 hover:bg-white/30 text-white font-bold px-6 py-3 rounded-lg transition border border-white w-full sm:w-auto"
              >
                Baixar App Grátis
              </button>
            </div>
          </div>

          <div className="bg-[#0c2461] text-white rounded-lg p-6 md:p-8 text-center space-y-3">
            <p className="font-bold text-lg">O Músico Pro não é só um guia.</p>
            <p className="text-base opacity-90">É um sistema de organização fiscal para quem vive de música.</p>
          </div>
        </section>

        {/* CONTEÚDO COMPLETO */}
        <section className="mb-12 md:mb-16 space-y-6">
          <div className="bg-[#F9F7F4] rounded-lg p-6 md:p-8 space-y-4">
            <h3 className="text-xl md:text-2xl font-bold text-[#0c2461]">Conteúdo Completo na Área Premium</h3>
            <p className="text-[#0c2461]">
              Este guia apresenta os conceitos essenciais para você entender sua situação fiscal.
            </p>
            <p className="text-[#0c2461]">
              Na área premium do Músico Pro, você encontra o conteúdo completo, exemplos práticos, checklists e ferramentas para aplicar tudo com segurança no dia a dia.
            </p>
            <Link href="/premium">
              <button
                onClick={() => trackPremiumClick()}
                className="bg-[#6ba587] hover:bg-[#5a9476] text-white font-bold px-6 py-3 rounded-lg transition"
              >
                Entrar no Premium (tenho código)
              </button>
            </Link>
          </div>
        </section>

        {/* SUMÁRIO */}
        <section className="mb-12 md:mb-16 space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
            📚 Sumário Completo
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#F9F7F4] rounded-lg p-6 space-y-3">
              <h4 className="font-bold text-[#0c2461] text-lg">Parte 1: Fundamentos</h4>
              <ul className="space-y-2 text-sm text-[#0c2461]">
                <li>1. O Conceito de Renda para o Músico</li>
                <li>2. Obrigatoriedade da Declaração</li>
                <li>3. Meios de Recebimento</li>
                <li>4. PF vs PJ: Qual Escolher?</li>
              </ul>
            </div>
            <div className="bg-[#F9F7F4] rounded-lg p-6 space-y-3">
              <h4 className="font-bold text-[#0c2461] text-lg">Parte 2: Gestão Fiscal</h4>
              <ul className="space-y-2 text-sm text-[#0c2461]">
                <li>5. Carnê-Leão</li>
                <li>6. Retenção de IR (RPA)</li>
                <li>7. Despesas Dedutíveis</li>
                <li>8. Tabela Progressiva</li>
              </ul>
            </div>
            <div className="bg-[#F9F7F4] rounded-lg p-6 space-y-3 md:col-span-2">
              <h4 className="font-bold text-[#0c2461] text-lg">Parte 3: Implementação (GRATUITA)</h4>
              <ul className="space-y-2 text-sm text-[#0c2461]">
                <li>9. Checklist Prático</li>
                <li>10. Ferramentas Recomendadas</li>
                <li>11. Contatos Úteis</li>
                <li>12. Conclusão e Próximos Passos</li>
              </ul>
            </div>
          </div>
        </section>

        {/* PARTE 1 */}
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
                  Para a Receita Federal, renda é todo valor que você recebe como músico. Pode ser:
                </p>
                <ul className="space-y-2 pl-4 list-disc">
                  <li>Cachês de apresentações.</li>
                  <li>Aulas de música.</li>
                  <li>Direitos autorais.</li>
                  <li>Participação em bandas.</li>
                  <li>Vendas de instrumentos ou produtos musicais.</li>
                  <li>Qualquer outra forma de recebimento por atividade musical.</li>
                </ul>
                <p className="mt-4">
                  <strong>Importante:</strong> Toda renda deve ser declarada, independentemente da forma de recebimento (dinheiro, PIX, transferência, cheque, etc.).
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
                  Você é obrigado a fazer a Declaração de Imposto de Renda (DIRPF) se:
                </p>
                <ul className="space-y-2 pl-4 list-disc">
                  <li>Sua renda bruta anual foi superior a R$ 30.639,90 (valor 2024).</li>
                  <li>Você tem patrimônio superior a R$ 300.000.</li>
                  <li>Você é autônomo ou profissional liberal.</li>
                  <li>Você teve ganho de capital ou operações em bolsa.</li>
                </ul>
                <p className="mt-4">
                  <strong>Dica:</strong> Mesmo que sua renda seja menor, é recomendado declarar para manter regularidade com a Receita Federal.
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
                  Músicos recebem de várias formas. Todas precisam ser registradas:
                </p>
                <ul className="space-y-2 pl-4 list-disc">
                  <li><strong>PIX:</strong> Transferência instantânea (mais comum hoje).</li>
                  <li><strong>Transferência Bancária:</strong> Depósito em conta.</li>
                  <li><strong>Dinheiro em Espécie:</strong> Deve ser registrado mesmo assim.</li>
                  <li><strong>Cheque:</strong> Menos comum, mas ainda existe.</li>
                  <li><strong>Cartão de Débito/Crédito:</strong> Se receber por plataformas.</li>
                </ul>
                <p className="mt-4">
                  <strong>Importante:</strong> Registre TODAS as formas de recebimento para evitar problemas com a Receita Federal.
                </p>
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
              <div className="p-4 md:p-5 space-y-3 text-sm md:text-base text-[#0c2461] border-t border-[#E8E3DC]">
                <p>
                  Você pode trabalhar como Pessoa Física (PF) ou Pessoa Jurídica (PJ):
                </p>
                <div className="mt-4 space-y-3">
                  <div className="bg-[#ffe5e5] border-l-4 border-[#dc3545] p-3 rounded">
                    <p className="font-bold text-[#721c24]">Pessoa Física (PF):</p>
                    <ul className="space-y-1 pl-4 list-disc text-sm text-[#721c24] mt-2">
                      <li>Sem registro formal.</li>
                      <li>Declara como autônomo.</li>
                      <li>Paga Carnê-Leão mensalmente.</li>
                      <li>Simples, mas sem deduções.</li>
                    </ul>
                  </div>
                  <div className="bg-[#e5f5e5] border-l-4 border-[#28a745] p-3 rounded">
                    <p className="font-bold text-[#155724]">Pessoa Jurídica (PJ):</p>
                    <ul className="space-y-1 pl-4 list-disc text-sm text-[#155724] mt-2">
                      <li>MEI, Simples ou Lucro Presumido.</li>
                      <li>Pode deduzir despesas.</li>
                      <li>Mais burocracia.</li>
                      <li>Pode economizar impostos.</li>
                    </ul>
                  </div>
                </div>
                <p className="mt-4">
                  <strong>Dica:</strong> Consulte um contador para definir a melhor opção para sua situação.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* PARTE 2 */}
        <section id="parte2" className="space-y-6 md:space-y-8 mb-12 md:mb-16 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
            Parte 2: Gestão Fiscal
          </h2>

          {/* Seção 5 - GRATUITA */}
          <div className="border-2 border-[#d4af37] rounded-lg overflow-hidden bg-[#fffbf0]">
            <div className="bg-[#d4af37] text-[#0c2461] px-4 py-2 font-bold text-center">
              🎁 GRATUITO
            </div>
            <button
              onClick={() => toggleSection('sec5')}
              className="w-full bg-[#fffbf0] hover:bg-[#fff8e7] p-4 md:p-5 flex items-center justify-between transition font-semibold text-[#0c2461]"
            >
              <span className="text-base md:text-lg">5. Carnê-Leão: O que é e Como Pagar</span>
              {expandedSections['sec5'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {expandedSections['sec5'] && (
              <div className="p-4 md:p-5 space-y-4 text-sm md:text-base text-[#0c2461] border-t-2 border-[#d4af37]">
                <div>
                  <p className="font-bold mb-2">O que é Carnê-Leão?</p>
                  <p>
                    Carnê-Leão é uma forma de antecipar o Imposto de Renda. Se você é autônomo (PF), deve pagar mensalmente com base em sua renda.
                  </p>
                </div>

                <div>
                  <p className="font-bold mb-2">Como funciona?</p>
                  <ol className="space-y-2 pl-4 list-decimal">
                    <li>Você recebe um cachê ou renda.</li>
                    <li>Calcula o imposto sobre aquele valor.</li>
                    <li>Paga ao governo até o 20º dia do mês seguinte.</li>
                    <li>Registra o pagamento para a declaração anual.</li>
                  </ol>
                </div>

                <div>
                  <p className="font-bold mb-2">Exemplos Práticos:</p>
                  <div className="bg-[#F9F7F4] p-3 rounded space-y-3 text-sm">
                    <div>
                      <p className="font-semibold">Exemplo 1: Cachê por PIX</p>
                      <p>Você recebe R$ 1.000 por um show. Calcula 7,5% de imposto = R$ 75. Paga Carnê-Leão de R$ 75.</p>
                    </div>
                    <div>
                      <p className="font-semibold">Exemplo 2: Múltiplos Cachês</p>
                      <p>Você recebe R$ 500 + R$ 800 + R$ 300 = R$ 1.600. Imposto total: ~R$ 120. Paga um único Carnê-Leão.</p>
                    </div>
                    <div>
                      <p className="font-semibold">Exemplo 3: Aulas Regulares</p>
                      <p>Você dá 4 aulas de R$ 200 = R$ 800/mês. Imposto mensal: ~R$ 60. Paga todo mês.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#fff3cd] border-l-4 border-[#ffc107] p-3 rounded">
                  <p className="text-sm">
                    <strong>💡 Dica Importante:</strong> Use o App Músico Pro para calcular automaticamente quanto você deve pagar de Carnê-Leão cada mês. Assim você não esquece e fica em dia com o governo.
                  </p>
                </div>

                <div className="bg-[#e5f5e5] border-l-4 border-[#28a745] p-3 rounded">
                  <p className="text-sm">
                    <strong>✅ Benefício:</strong> Ao pagar Carnê-Leão mensalmente, você evita surpresas na declaração anual e fica regular com a Receita Federal.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Seção 6 */}
          <LockedTeaser
            title="6. Retenção de IR (RPA)"
            preview="RPA significa 'Recibo de Pagamento Autônomo'. Quando uma pessoa ou empresa te contrata, ela pode reter 15% do seu cachê como antecipação de imposto. No Premium, você aprende como essa retenção funciona, como receber restituição e como calcular corretamente."
            icon="💵"
          />

          {/* Seção 7 */}
          <LockedTeaser
            title="7. Despesas Dedutíveis"
            preview="Se você é PJ (MEI ou Simples), pode deduzir despesas da sua renda, como instrumentos, equipamentos, transporte e cursos. No Premium, você tem uma lista completa de despesas dedutíveis, exemplos reais de como registrá-las e dicas para não cometer erros com a Receita Federal."
            icon="🎸"
          />

          {/* Seção 8 */}
          <LockedTeaser
            title="8. Tabela Progressiva de IR"
            preview="Se você é PF, a alíquota de IR aumenta conforme sua renda. Entender essa tabela é essencial para calcular quanto você vai pagar. No Premium, você tem a tabela atualizada para 2026, exemplos de cálculo e uma ferramenta interativa para simular seu imposto."
            icon="📊"
          />
        </section>

        {/* PARTE 3 - IMPLEMENTAÇÃO (GRATUITA) */}
        <section id="parte3" className="space-y-6 md:space-y-8 mb-12 md:mb-16 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
            Parte 3: Implementação (GRATUITA)
          </h2>

          {/* Seção 9 - Checklist Prático */}
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
                  <li>☐ Abrir contas bancárias separadas para organização da renda de música.</li>
                  <li>☐ Guardar todos os recibos e notas fiscais.</li>
                  <li>☐ Registrar a renda mensalmente (planilha ou app).</li>
                  <li>☐ Pagar Carnê-Leão mensalmente.</li>
                  <li>☐ Consultar um contador especializado.</li>
                  <li>☐ Fazer a declaração anual de IR.</li>
                </ul>
                <p className="mt-4 p-3 bg-[#d4af37]/10 border-l-4 border-[#d4af37] text-sm">
                  <strong>💡 Dica:</strong> Use o App Músico Pro para automatizar esse checklist e não esquecer nenhum passo importante.
                </p>
              </div>
            )}
          </div>

          {/* Seção 10 - Ferramentas Recomendadas */}
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
                  <li><strong>📊 Planilhas:</strong> Google Sheets ou Excel para registrar renda.</li>
                  <li><strong>💰 Apps:</strong> Aplicativos bancários para separar contas de renda.</li>
                  <li><strong>📱 Gerador de RPA:</strong> Ferramentas online para gerar Recibos de Pagamento Autônomo.</li>
                  <li><strong>🧮 Calculadoras:</strong> Simule seu IR antes de declarar.</li>
                </ul>
                <p className="mt-4 p-3 bg-[#d4af37]/10 border-l-4 border-[#d4af37] text-sm">
                  <strong>💡 Recomendação:</strong> O App Músico Pro integra todas essas funções em um único lugar, facilitando sua organização fiscal.
                </p>
              </div>
            )}
          </div>

          {/* Seção 11 - Contatos Úteis */}
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
                  <li><strong>🎵 Sindicato dos Músicos:</strong> Consulte o sindicato de sua região.</li>
                  <li><strong>💼 Contador Especializado:</strong> Busque profissionais com experiência em atividades artísticas.</li>
                </ul>
                <p className="mt-4 p-3 bg-[#d4af37]/10 border-l-4 border-[#d4af37] text-sm">
                  <strong>💡 Dica:</strong> Com o App Músico Pro, você terá toda a documentação organizada para apresentar ao seu contador, facilitando o trabalho dele.
                </p>
              </div>
            )}
          </div>

          {/* Seção 12 - Conclusão */}
          <div className="border border-[#E8E3DC] rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('sec12')}
              className="w-full bg-[#F9F7F4] hover:bg-[#E8E3DC] p-4 md:p-5 flex items-center justify-between transition font-semibold text-[#0c2461]"
            >
              <span className="text-base md:text-lg">12. Conclusão e Próximos Passos</span>
              {expandedSections['sec12'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {expandedSections['sec12'] && (
              <div className="p-4 md:p-5 space-y-3 text-sm md:text-base text-[#0c2461] border-t border-[#E8E3DC]">
                <p>
                  Organizar sua vida fiscal não precisa ser complicado. Com as informações certas e um pouco de disciplina, você consegue:
                </p>
                <ul className="space-y-2 pl-4 list-disc">
                  <li>✓ Evitar problemas com a Receita Federal.</li>
                  <li>✓ Aproveitar deduções e economizar impostos.</li>
                  <li>✓ Ter clareza sobre sua renda.</li>
                  <li>✓ Focar no que realmente importa: sua música.</li>
                </ul>
                <p className="mt-4 font-semibold text-[#0c2461]">
                  O Músico Pro está aqui para ajudar você nessa jornada. 🎵
                </p>
                <p className="mt-4 p-3 bg-[#d4af37]/10 border-l-4 border-[#d4af37] text-sm">
                  <strong>🚀 Próximo Passo:</strong> Implemente tudo com o App Músico Pro e tenha sua vida fiscal organizada mês a mês, sem complicações.
                </p>
              </div>
            )}
          </div>
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
                <button
                  onClick={() => trackBuyClick()}
                  className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-6 py-3 rounded-lg transition w-full sm:w-auto"
                >
                  Comprar Licença PRO
                </button>
              </Link>
              <Link href="/premium">
                <button
                  onClick={() => trackPremiumClick()}
                  className="bg-white/20 hover:bg-white/30 text-white font-bold px-6 py-3 rounded-lg transition border border-white w-full sm:w-auto"
                >
                  Entrar no Premium (tenho código)
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Mini Bio - Autoridade */}
        <section className="mb-12 md:mb-16 space-y-6">
          <div className="bg-[#F9F7F4] rounded-lg p-6 md:p-8 space-y-4">
            <h3 className="text-xl md:text-2xl font-bold text-[#0c2461] flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-[#d4af37]" />
              Quem está por trás do Músico Pro
            </h3>
            <p className="text-[#0c2461]">
              Sou profissional de tecnologia com experiência em sistemas e organização financeira.
            </p>
            <p className="text-[#0c2461]">
              Criei o Músico Pro para ajudar músicos autônomos a entender e organizar seus impostos de forma prática, sem juridiquês e sem depender de terceiros para o básico.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Email Modal - Removido por enquanto */}
    </div>
  );
}
