import { useState, useEffect } from 'react';
import { Music, ChevronDown, ChevronUp, Lightbulb, AlertCircle, BookOpen, DollarSign, CheckCircle2, TrendingUp, FileText, HelpCircle, Zap, BarChart3, Menu, X } from 'lucide-react';
import { Link } from 'wouter';

export default function Home() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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

  return (
    <div className="min-h-screen bg-white scroll-smooth">
      {/* Header Sticky */}
      <header className="sticky top-0 bg-white border-b border-[#E8E3DC] py-4 px-4 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Music size={28} className="text-[#1B4965]" />
            <div>
              <h1 className="text-lg font-bold text-[#1B4965]" style={{ fontFamily: 'Lexend, sans-serif' }}>Guia IR para Músicos</h1>
              <p className="text-xs text-[#7F8C8D]">Edição 2025</p>
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
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left px-4 py-2 rounded-lg transition ${
                  activeSection === section.id
                    ? 'bg-[#1B4965] text-white'
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
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition font-medium ${
                activeSection === section.id
                  ? 'bg-[#1B4965] text-white'
                  : 'text-[#2C3E50] hover:bg-[#E8E3DC]'
              }`}
              style={{ fontFamily: activeSection === section.id ? 'Lexend, sans-serif' : 'Poppins, sans-serif' }}
            >
              {section.title}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="md:ml-64 px-4 md:px-6 py-6 md:py-8 max-w-5xl mx-auto">
        {/* HOME SECTION */}
        <section id="home" className="space-y-6 md:space-y-8 mb-12 md:mb-16 scroll-mt-24">
          {/* Hero */}
          <div className="bg-gradient-to-br from-[#1B4965] to-[#2C5F7F] rounded-lg md:rounded-xl p-4 md:p-6 text-white space-y-3 md:space-y-4 animate-fade-in-up shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold" style={{ fontFamily: 'Lexend, sans-serif' }}>Transforme sua Arte em Carreira Profissional</h2>
            <p className="text-xs md:text-sm leading-relaxed opacity-90">
              Tudo o que você precisa saber sobre Imposto de Renda, Carnê-Leão, MEI e gestão fiscal para músicos autônomos.
            </p>
            <div className="flex gap-3 md:gap-4 text-xs md:text-sm">
              <div className="flex items-center gap-1">
                <BookOpen size={16} />
                <span>45-60 min</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap size={16} />
                <span>Atualizado 2025</span>
              </div>
            </div>
          </div>

          {/* Quick Guide */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-lg md:text-xl font-semibold text-[#1B4965]" style={{ fontFamily: 'Lexend, sans-serif' }}>⚡ Guia Rápido</h3>
            <div className="space-y-3">
              <div className="badge-tip">
                <Lightbulb size={16} />
                <span>Para Quem é Este Guia</span>
              </div>
              <ul className="text-xs md:text-sm text-[#2C3E50] space-y-1 md:space-y-2 pl-4">
                <li>✅ Músicos autônomos que recebem cachês</li>
                <li>✅ Professores de música particulares</li>
                <li>✅ Artistas com receitas de shows e direitos autorais</li>
                <li>✅ Profissionais que querem profissionalizar a gestão fiscal</li>
              </ul>
            </div>
          </div>

          {/* Important Notice */}
          <div className="highlight-box highlight-danger space-y-2 md:space-y-3">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-[#C85A54] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-[#C85A54] text-sm md:text-base">Aviso Importante</h4>
                <p className="text-xs md:text-sm text-[#2C3E50] mt-2">
                  Este guia é educativo e informativo. A legislação tributária brasileira é dinâmica. Sempre consulte a legislação vigente e procure um contador especializado em atividades artísticas.
                </p>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="bg-[#F9F7F4] rounded-lg p-4 md:p-6 space-y-3 md:space-y-4">
            <h3 className="text-base md:text-lg font-bold text-[#1B4965]" style={{ fontFamily: 'Lexend, sans-serif' }}>📚 Sumário Completo</h3>
            <div className="grid md:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
              <div>
                <h4 className="font-semibold text-[#1B4965] mb-2 text-xs md:text-sm">Parte 1: Fundamentos</h4>
                <ul className="space-y-0.5 md:space-y-1 text-[#2C3E50]">
                  <li>1. O Conceito de Renda para o Músico</li>
                  <li>2. Obrigatoriedade da Declaração</li>
                  <li>3. Meios de Recebimento</li>
                  <li>4. PF vs PJ</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#1B4965] mb-2">Parte 2: Gestão Fiscal</h4>
                <ul className="space-y-1 text-[#2C3E50]">
                  <li>5. Carnê-Leão</li>
                  <li>6. Retenção de IR (RPA)</li>
                  <li>7. Despesas Dedutíveis</li>
                  <li>8. Tabela Progressiva</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#1B4965] mb-2">Parte 3: Implementação</h4>
                <ul className="space-y-1 text-[#2C3E50]">
                  <li>9. Consequências da Não Declaração</li>
                  <li>10. Checklist Mensal</li>
                  <li>11. Casos Práticos</li>
                  <li>12. Ferramentas</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#1B4965] mb-2">Referência</h4>
                <ul className="space-y-1 text-[#2C3E50]">
                  <li>13. FAQ</li>
                  <li>14. Glossário</li>
                  <li>15. Conclusão</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PARTE 1: FUNDAMENTOS */}
        <section id="parte1" className="space-y-6 md:space-y-8 mb-12 md:mb-16 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1B4965] border-b-4 border-[#E07856] pb-3 md:pb-4" style={{ fontFamily: 'Lexend, sans-serif' }}>
            📚 Parte 1: Fundamentos
          </h2>

          {/* Section 1 */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection('sec1')}
              className="w-full flex items-center justify-between p-4 bg-[#F9F7F4] hover:bg-[#E8E3DC] rounded-lg transition"
            >
              <h3 className="text-lg font-semibold text-[#1B4965]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                1. O Conceito de Renda para o Músico
              </h3>
              {expandedSections['sec1'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {expandedSections['sec1'] && (
              <div className="px-4 py-4 space-y-4 bg-white border-l-4 border-[#1B4965]">
                <p className="text-sm text-[#2C3E50] leading-relaxed">
                  Para a Receita Federal do Brasil (RFB), <strong>renda</strong> é todo valor recebido que aumenta o seu patrimônio e não possui caráter de devolução.
                </p>
                <div className="bg-[#6BA587]/5 border-l-4 border-[#6BA587] p-4 rounded space-y-2">
                  <h4 className="font-semibold text-[#6BA587]">💰 O que é considerado renda tributável:</h4>
                  <ul className="text-sm text-[#2C3E50] space-y-1">
                    <li>✓ Cachês de shows e apresentações</li>
                    <li>✓ Direitos Autorais e direitos conexos</li>
                    <li>✓ Rendimentos de aulas particulares</li>
                    <li>✓ Vendas de merchandising</li>
                    <li>✓ Receitas de plataformas digitais</li>
                  </ul>
                </div>
                <div className="bg-[#D4A574]/5 border-l-4 border-[#D4A574] p-4 rounded">
                  <p className="text-sm text-[#2C3E50]">
                    <strong>🎯 Regra de Ouro:</strong> Cachês, shows e participações são SEMPRE renda tributável, independentemente de frequência, meio de pagamento ou valor.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection('sec2')}
              className="w-full flex items-center justify-between p-4 bg-[#F9F7F4] hover:bg-[#E8E3DC] rounded-lg transition"
            >
              <h3 className="text-lg font-semibold text-[#1B4965]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                2. Obrigatoriedade da Declaração de IR
              </h3>
              {expandedSections['sec2'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {expandedSections['sec2'] && (
              <div className="px-4 py-4 space-y-4 bg-white border-l-4 border-[#1B4965]">
                <p className="text-sm text-[#2C3E50] leading-relaxed">
                  O músico autônomo deve declarar o Imposto de Renda Pessoa Física (IRPF) se se enquadrar em qualquer uma das regras de obrigatoriedade estabelecidas pela RFB.
                </p>
                <div className="bg-[#6BA587]/5 border-l-4 border-[#6BA587] p-4 rounded space-y-3">
                  <h4 className="font-semibold text-[#6BA587]">✅ Você DEVE declarar se:</h4>
                  <ul className="text-sm text-[#2C3E50] space-y-2">
                    <li><strong>1. Recebeu rendimentos tributáveis</strong> acima do limite anual (R$ 30.639,90 em 2024)</li>
                    <li><strong>2. Recebeu rendimentos isentos</strong> acima do limite patrimonial (R$ 800.000,00)</li>
                    <li><strong>3. Possui bens ou direitos</strong> acima do limite patrimonial</li>
                    <li><strong>4. Teve imposto retido</strong> na fonte (RPA)</li>
                    <li><strong>5. Obteve ganho de capital</strong> na venda de bens</li>
                  </ul>
                </div>
                <div className="bg-[#C85A54]/5 border-l-4 border-[#C85A54] p-4 rounded">
                  <p className="text-sm text-[#2C3E50]">
                    <strong>⚠️ ATENÇÃO:</strong> A declaração não significa necessariamente pagamento de imposto. Você pode declarar e não ter imposto a pagar ou até receber restituição.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Section 3 */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection('sec3')}
              className="w-full flex items-center justify-between p-4 bg-[#F9F7F4] hover:bg-[#E8E3DC] rounded-lg transition"
            >
              <h3 className="text-lg font-semibold text-[#1B4965]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                3. Meios de Recebimento: Pix, Dinheiro e Transferência
              </h3>
              {expandedSections['sec3'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {expandedSections['sec3'] && (
              <div className="px-4 py-4 space-y-4 bg-white border-l-4 border-[#1B4965]">
                <div className="bg-[#C85A54]/5 border-l-4 border-[#C85A54] p-4 rounded space-y-2">
                  <h4 className="font-semibold text-[#C85A54]">❌ O MITO DO PIX</h4>
                  <p className="text-sm text-[#2C3E50]">
                    Existe um mito de que Pix ou dinheiro vivo não geram obrigação fiscal. <strong>Essa premissa está completamente incorreta.</strong>
                  </p>
                </div>
                <div className="bg-[#6BA587]/5 border-l-4 border-[#6BA587] p-4 rounded space-y-2">
                  <h4 className="font-semibold text-[#6BA587]">✅ A VERDADE</h4>
                  <p className="text-sm text-[#2C3E50] mb-2">
                    Não existe "imposto sobre o Pix". O Pix é apenas um meio de pagamento. <strong>O imposto incide sobre a ORIGEM e NATUREZA do dinheiro.</strong>
                  </p>
                  <ul className="text-sm text-[#2C3E50] space-y-1">
                    <li>• Valor via Pix = cachê → renda tributável</li>
                    <li>• Valor em dinheiro = aula → renda tributável</li>
                    <li>• Transferência = produtora → renda tributável</li>
                  </ul>
                </div>
                <div className="bg-[#D4A574]/5 border-l-4 border-[#D4A574] p-4 rounded">
                  <p className="text-sm text-[#2C3E50]">
                    <strong>💡 DICA PRO:</strong> O problema nunca é o Pix ou dinheiro. O problema é a omissão de renda.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Section 4 */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection('sec4')}
              className="w-full flex items-center justify-between p-4 bg-[#F9F7F4] hover:bg-[#E8E3DC] rounded-lg transition"
            >
              <h3 className="text-lg font-semibold text-[#1B4965]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                4. Pessoa Física (PF) vs. Pessoa Jurídica (PJ)
              </h3>
              {expandedSections['sec4'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {expandedSections['sec4'] && (
              <div className="px-4 py-4 space-y-4 bg-white border-l-4 border-[#1B4965]">
                <p className="text-sm text-[#2C3E50] leading-relaxed">
                  A escolha entre atuar como Pessoa Física (PF) ou abrir uma Pessoa Jurídica (PJ) é um dos pontos mais críticos na gestão fiscal do músico.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#1B4965] text-white">
                        <th className="border border-[#E8E3DC] p-2 text-left">Modelo</th>
                        <th className="border border-[#E8E3DC] p-2 text-left">Tributação</th>
                        <th className="border border-[#E8E3DC] p-2 text-left">Indicado Para</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-[#F9F7F4]">
                        <td className="border border-[#E8E3DC] p-2"><strong>PF (Autônomo)</strong></td>
                        <td className="border border-[#E8E3DC] p-2">Carnê-Leão mensal</td>
                        <td className="border border-[#E8E3DC] p-2">Cachês esporádicos, até R$ 5.000/mês</td>
                      </tr>
                      <tr className="hover:bg-[#F9F7F4]">
                        <td className="border border-[#E8E3DC] p-2"><strong>MEI</strong></td>
                        <td className="border border-[#E8E3DC] p-2">DAS ~R$ 75/mês</td>
                        <td className="border border-[#E8E3DC] p-2">Renda recorrente R$ 3.000-7.000/mês</td>
                      </tr>
                      <tr className="hover:bg-[#F9F7F4]">
                        <td className="border border-[#E8E3DC] p-2"><strong>Empresa</strong></td>
                        <td className="border border-[#E8E3DC] p-2">Simples Nacional</td>
                        <td className="border border-[#E8E3DC] p-2">Renda acima de R$ 7.000/mês</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-[#6BA587]/5 border-l-4 border-[#6BA587] p-4 rounded">
                  <h4 className="font-semibold text-[#6BA587] mb-2">💡 EXEMPLO PRÁTICO DE ECONOMIA</h4>
                  <p className="text-sm text-[#2C3E50] mb-2"><strong>Cenário:</strong> Músico com renda mensal de R$ 5.000</p>
                  <ul className="text-sm text-[#2C3E50] space-y-1">
                    <li><strong>Como PF:</strong> ~R$ 450/mês = R$ 5.400/ano</li>
                    <li><strong>Como MEI:</strong> R$ 75/mês = R$ 900/ano</li>
                    <li><strong>Economia: R$ 4.500/ano</strong></li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* PARTE 2: GESTÃO FISCAL */}
        <section id="parte2" className="space-y-6 md:space-y-8 mb-12 md:mb-16 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1B4965] border-b-4 border-[#E07856] pb-3 md:pb-4" style={{ fontFamily: 'Lexend, sans-serif' }}>
            🎯 Parte 2: Gestão Fiscal na Prática
          </h2>

          {/* Section 5 */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection('sec5')}
              className="w-full flex items-center justify-between p-4 bg-[#F9F7F4] hover:bg-[#E8E3DC] rounded-lg transition"
            >
              <h3 className="text-lg font-semibold text-[#1B4965]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                5. Carnê-Leão: Obrigatoriedade e Aplicação
              </h3>
              {expandedSections['sec5'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {expandedSections['sec5'] && (
              <div className="px-4 py-4 space-y-4 bg-white border-l-4 border-[#1B4965]">
                <p className="text-sm text-[#2C3E50] leading-relaxed">
                  O <strong>Carnê-Leão</strong> é o recolhimento mensal obrigatório do Imposto de Renda devido por Pessoa Física que recebe rendimentos de outra Pessoa Física ou de Pessoa Jurídica que não faz a retenção na fonte.
                </p>
                
                <div className="bg-[#6BA587]/5 border-l-4 border-[#6BA587] p-4 rounded">
                  <h4 className="font-semibold text-[#6BA587] mb-2">✅ Quando Usar o Carnê-Leão</h4>
                  <ul className="text-sm text-[#2C3E50] space-y-1">
                    <li>✓ Receber rendimentos como Pessoa Física</li>
                    <li>✓ Pagamento feito por outra Pessoa Física</li>
                    <li>✓ Pagamento por PJ que NÃO reteve IR na fonte</li>
                  </ul>
                </div>

                <div className="bg-[#D4A574]/5 border-l-4 border-[#D4A574] p-4 rounded">
                  <h4 className="font-semibold text-[#D4A574] mb-2">📅 Passo a Passo Mensal</h4>
                  <ol className="text-sm text-[#2C3E50] space-y-1">
                    <li>1. Receba o cachê/pagamento (durante o mês)</li>
                    <li>2. Registre no sistema do Carnê-Leão até o último dia</li>
                    <li>3. Informe despesas dedutíveis com comprovantes</li>
                    <li>4. Sistema calcula o imposto automaticamente</li>
                    <li>5. Gere o DARF (boleto de pagamento)</li>
                    <li>6. Pague até o último dia útil do mês seguinte</li>
                  </ol>
                </div>

                <div className="bg-[#C85A54]/5 border-l-4 border-[#C85A54] p-4 rounded">
                  <p className="text-sm text-[#2C3E50]">
                    <strong>🚨 ERRO COMUM:</strong> Mesmo quando o cálculo resulta em R$ 0,00 de imposto, você deve registrar a movimentação para cumprir a obrigação acessória.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Section 6 */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection('sec6')}
              className="w-full flex items-center justify-between p-4 bg-[#F9F7F4] hover:bg-[#E8E3DC] rounded-lg transition"
            >
              <h3 className="text-lg font-semibold text-[#1B4965]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                6. Retenção de IR em Pagamentos (RPA)
              </h3>
              {expandedSections['sec6'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {expandedSections['sec6'] && (
              <div className="px-4 py-4 space-y-4 bg-white border-l-4 border-[#1B4965]">
                <p className="text-sm text-[#2C3E50] leading-relaxed">
                  Quando uma banda, produtora ou casa de shows possui CNPJ, ela pode contratar o músico PF e realizar o pagamento via <strong>Recibo de Pagamento a Autônomo (RPA).</strong>
                </p>

                <div className="bg-[#6BA587]/5 border-l-4 border-[#6BA587] p-4 rounded space-y-2">
                  <h4 className="font-semibold text-[#6BA587]">📋 Responsabilidades da Empresa (PJ)</h4>
                  <ul className="text-sm text-[#2C3E50] space-y-1">
                    <li>✓ Reter o INSS (11% sobre o valor)</li>
                    <li>✓ Reter o Imposto de Renda</li>
                    <li>✓ Recolher esses impostos aos cofres públicos</li>
                    <li>✓ Pagar o valor líquido ao músico</li>
                    <li>✓ Fornecer Informe de Rendimentos</li>
                  </ul>
                </div>

                <div className="bg-[#D4A574]/5 border-l-4 border-[#D4A574] p-4 rounded">
                  <h4 className="font-semibold text-[#D4A574] mb-2">📝 EXEMPLO PRÁTICO</h4>
                  <p className="text-sm text-[#2C3E50] mb-2"><strong>Cachê combinado:</strong> R$ 3.000,00</p>
                  <ul className="text-sm text-[#2C3E50] space-y-1">
                    <li>INSS (11%): R$ 330,00</li>
                    <li>IR: R$ 54,00</li>
                    <li><strong>Você recebe líquido:</strong> R$ 2.616,00</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Section 7 */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection('sec7')}
              className="w-full flex items-center justify-between p-4 bg-[#F9F7F4] hover:bg-[#E8E3DC] rounded-lg transition"
            >
              <h3 className="text-lg font-semibold text-[#1B4965]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                7. Despesas Dedutíveis: Reduzindo a Base de Cálculo
              </h3>
              {expandedSections['sec7'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {expandedSections['sec7'] && (
              <div className="px-4 py-4 space-y-4 bg-white border-l-4 border-[#1B4965]">
                <p className="text-sm text-[#2C3E50] leading-relaxed">
                  A grande vantagem de declarar como autônomo (PF) via Carnê-Leão é a possibilidade de <strong>deduzir despesas</strong>, reduzindo ou zerando o valor a pagar.
                </p>

                <div className="bg-[#6BA587]/5 border-l-4 border-[#6BA587] p-4 rounded space-y-3">
                  <h4 className="font-semibold text-[#6BA587]">✅ O Que PODE Ser Deduzido</h4>
                  <div className="text-sm text-[#2C3E50] space-y-2">
                    <p><strong>🚗 Transporte:</strong> Combustível, pedágios, Uber, passagens aéreas</p>
                    <p><strong>🎸 Equipamentos:</strong> Manutenção de instrumentos, cordas, cabos, aluguel</p>
                    <p><strong>🏢 Espaços:</strong> Aluguel de estúdio, sala de ensaio, internet profissional</p>
                    <p><strong>📢 Divulgação:</strong> Ads, website, fotos profissionais, designer</p>
                    <p><strong>👔 Serviços:</strong> Contador, advogado, produtor musical</p>
                    <p><strong>📚 Capacitação:</strong> Cursos, workshops, material didático</p>
                  </div>
                </div>

                <div className="bg-[#C85A54]/5 border-l-4 border-[#C85A54] p-4 rounded space-y-3">
                  <h4 className="font-semibold text-[#C85A54]">❌ O Que NÃO Pode Ser Deduzido</h4>
                  <div className="text-sm text-[#2C3E50] space-y-1">
                    <p>✗ Alimentação comum (supermercado, restaurantes)</p>
                    <p>✗ Roupas do dia a dia</p>
                    <p>✗ Lazer e entretenimento pessoal</p>
                    <p>✗ Instrumentos novos (são bens, não despesas)</p>
                    <p>✗ Despesas sem comprovação</p>
                  </div>
                </div>

                <div className="bg-[#D4A574]/5 border-l-4 border-[#D4A574] p-4 rounded">
                  <h4 className="font-semibold text-[#D4A574] mb-2">💡 DICA DE OURO</h4>
                  <p className="text-sm text-[#2C3E50]">
                    Separe contas bancárias: uma para uso pessoal e outra para receber cachês e pagar despesas profissionais. No fim do ano, o extrato da conta profissional é seu "espelho fiscal".
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Section 8 */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection('sec8')}
              className="w-full flex items-center justify-between p-4 bg-[#F9F7F4] hover:bg-[#E8E3DC] rounded-lg transition"
            >
              <h3 className="text-lg font-semibold text-[#1B4965]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                8. Tabela Progressiva do IR
              </h3>
              {expandedSections['sec8'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {expandedSections['sec8'] && (
              <div className="px-4 py-4 space-y-4 bg-white border-l-4 border-[#1B4965]">
                <p className="text-sm text-[#2C3E50] leading-relaxed">
                  O cálculo do Carnê-Leão segue a <strong>tabela progressiva mensal</strong>. A alíquota aumenta conforme a base de cálculo sobe.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#1B4965] text-white">
                        <th className="border border-[#E8E3DC] p-2 text-left">Base Mensal (R$)</th>
                        <th className="border border-[#E8E3DC] p-2 text-left">Alíquota</th>
                        <th className="border border-[#E8E3DC] p-2 text-left">Parcela a Deduzir</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-[#F9F7F4]">
                        <td className="border border-[#E8E3DC] p-2">Até 2.259,20</td>
                        <td className="border border-[#E8E3DC] p-2"><strong>Isento (0%)</strong></td>
                        <td className="border border-[#E8E3DC] p-2">0,00</td>
                      </tr>
                      <tr className="hover:bg-[#F9F7F4]">
                        <td className="border border-[#E8E3DC] p-2">2.259,21 a 2.826,65</td>
                        <td className="border border-[#E8E3DC] p-2">7,5%</td>
                        <td className="border border-[#E8E3DC] p-2">169,44</td>
                      </tr>
                      <tr className="hover:bg-[#F9F7F4]">
                        <td className="border border-[#E8E3DC] p-2">2.826,66 a 3.751,05</td>
                        <td className="border border-[#E8E3DC] p-2">15%</td>
                        <td className="border border-[#E8E3DC] p-2">381,44</td>
                      </tr>
                      <tr className="hover:bg-[#F9F7F4]">
                        <td className="border border-[#E8E3DC] p-2">3.751,06 a 4.664,68</td>
                        <td className="border border-[#E8E3DC] p-2">22,5%</td>
                        <td className="border border-[#E8E3DC] p-2">662,77</td>
                      </tr>
                      <tr className="hover:bg-[#F9F7F4]">
                        <td className="border border-[#E8E3DC] p-2">Acima de 4.664,68</td>
                        <td className="border border-[#E8E3DC] p-2">27,5%</td>
                        <td className="border border-[#E8E3DC] p-2">896,00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-[#D4A574]/5 border-l-4 border-[#D4A574] p-4 rounded">
                  <h4 className="font-semibold text-[#D4A574] mb-2">🧮 EXEMPLO DE CÁLCULO</h4>
                  <p className="text-sm text-[#2C3E50] mb-2"><strong>Renda bruta:</strong> R$ 5.000 | <strong>Despesas:</strong> R$ 1.500</p>
                  <ul className="text-sm text-[#2C3E50] space-y-1">
                    <li>Base de Cálculo: R$ 5.000 - R$ 1.500 = R$ 3.500</li>
                    <li>Alíquota: 15%</li>
                    <li>Imposto: (R$ 3.500 × 15%) - R$ 381,44 = <strong>R$ 143,56</strong></li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* PARTE 3: IMPLEMENTAÇÃO */}
        <section id="parte3" className="space-y-6 md:space-y-8 mb-12 md:mb-16 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1B4965] border-b-4 border-[#E07856] pb-3 md:pb-4" style={{ fontFamily: 'Lexend, sans-serif' }}>
            ✅ Parte 3: Implementação e Casos Práticos
          </h2>

          {/* Section 9 */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection('sec9')}
              className="w-full flex items-center justify-between p-4 bg-[#F9F7F4] hover:bg-[#E8E3DC] rounded-lg transition"
            >
              <h3 className="text-lg font-semibold text-[#1B4965]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                9. Consequências da Não Declaração
              </h3>
              {expandedSections['sec9'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {expandedSections['sec9'] && (
              <div className="px-4 py-4 space-y-4 bg-white border-l-4 border-[#1B4965]">
                <div className="bg-[#C85A54]/5 border-l-4 border-[#C85A54] p-4 rounded space-y-3">
                  <h4 className="font-semibold text-[#C85A54]">⚠️ Consequências Graves</h4>
                  <ul className="text-sm text-[#2C3E50] space-y-2">
                    <li><strong>Multa:</strong> 75% a 150% do imposto devido</li>
                    <li><strong>Juros:</strong> Calculados desde a data de vencimento</li>
                    <li><strong>Presunção de renda:</strong> RFB pode presumir valores maiores</li>
                    <li><strong>Bloqueio de contas:</strong> Congelamento de valores em bancos</li>
                    <li><strong>Restrições:</strong> Impossibilidade de obter crédito, passaporte</li>
                    <li><strong>Processo criminal:</strong> Em casos de fraude grave</li>
                  </ul>
                </div>

                <div className="bg-[#6BA587]/5 border-l-4 border-[#6BA587] p-4 rounded">
                  <h4 className="font-semibold text-[#6BA587] mb-2">💡 Como a RFB Detecta</h4>
                  <p className="text-sm text-[#2C3E50]">
                    A RFB cruza dados bancários, transações Pix, notas fiscais e informações de terceiros. Omissões de renda são facilmente detectadas.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Section 10 */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection('sec10')}
              className="w-full flex items-center justify-between p-4 bg-[#F9F7F4] hover:bg-[#E8E3DC] rounded-lg transition"
            >
              <h3 className="text-lg font-semibold text-[#1B4965]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                10. Checklist Mensal e Roteiro Anual
              </h3>
              {expandedSections['sec10'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {expandedSections['sec10'] && (
              <div className="px-4 py-4 space-y-4 bg-white border-l-4 border-[#1B4965]">
                <div className="bg-[#6BA587]/5 border-l-4 border-[#6BA587] p-4 rounded space-y-3">
                  <h4 className="font-semibold text-[#6BA587]">📋 CHECKLIST MENSAL</h4>
                  <div className="text-sm text-[#2C3E50] space-y-2">
                    <p><strong>Até o 5º dia útil:</strong></p>
                    <ul className="space-y-1 pl-4">
                      <li>☐ Registre todos os cachês/rendimentos</li>
                      <li>☐ Organize notas fiscais e comprovantes</li>
                      <li>☐ Calcule despesas dedutíveis</li>
                      <li>☐ Acesse Carnê-Leão Web</li>
                      <li>☐ Gere DARF e pague até o último dia útil</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-[#D4A574]/5 border-l-4 border-[#D4A574] p-4 rounded space-y-3">
                  <h4 className="font-semibold text-[#D4A574]">📅 ROTEIRO ANUAL</h4>
                  <div className="text-sm text-[#2C3E50] space-y-2">
                    <p><strong>Janeiro:</strong> Organize documentos, receba Informes</p>
                    <p><strong>Fevereiro-Março:</strong> Finalize cálculos, preencha IRPF</p>
                    <p><strong>Abril em diante:</strong> Mantenha controle mensal</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 11 */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection('sec11')}
              className="w-full flex items-center justify-between p-4 bg-[#F9F7F4] hover:bg-[#E8E3DC] rounded-lg transition"
            >
              <h3 className="text-lg font-semibold text-[#1B4965]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                11. Estudos de Caso e Exemplos Práticos
              </h3>
              {expandedSections['sec11'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {expandedSections['sec11'] && (
              <div className="px-4 py-4 space-y-4 bg-white border-l-4 border-[#1B4965]">
                <div className="bg-[#6BA587]/5 border-l-4 border-[#6BA587] p-4 rounded space-y-2">
                  <h4 className="font-semibold text-[#6BA587]">📖 CASO 1: Músico com Cachês Esporádicos</h4>
                  <ul className="text-sm text-[#2C3E50] space-y-1">
                    <li><strong>Perfil:</strong> Toca em bares ocasionalmente, 2 shows/mês</li>
                    <li><strong>Renda anual:</strong> R$ 12.000 a R$ 48.000</li>
                    <li><strong>Ideal:</strong> Pessoa Física com Carnê-Leão</li>
                    <li><strong>Imposto estimado:</strong> R$ 0 a R$ 3.000/ano</li>
                  </ul>
                </div>

                <div className="bg-[#D4A574]/5 border-l-4 border-[#D4A574] p-4 rounded space-y-2">
                  <h4 className="font-semibold text-[#D4A574]">📖 CASO 2: Professor de Música com Renda Recorrente</h4>
                  <ul className="text-sm text-[#2C3E50] space-y-1">
                    <li><strong>Perfil:</strong> 15 alunos regulares, R$ 200/mês cada</li>
                    <li><strong>Renda mensal:</strong> R$ 3.000</li>
                    <li><strong>Ideal:</strong> MEI</li>
                    <li><strong>Imposto:</strong> R$ 75/mês = R$ 900/ano</li>
                    <li><strong>Economia vs PF:</strong> ~R$ 2.500/ano</li>
                  </ul>
                </div>

                <div className="bg-[#6BA587]/5 border-l-4 border-[#6BA587] p-4 rounded space-y-2">
                  <h4 className="font-semibold text-[#6BA587]">📖 CASO 3: Banda com Múltiplas Fontes</h4>
                  <ul className="text-sm text-[#2C3E50] space-y-1">
                    <li><strong>Perfil:</strong> 4 integrantes, shows + aulas + produção</li>
                    <li><strong>Renda mensal:</strong> R$ 12.000</li>
                    <li><strong>Ideal:</strong> Empresa (Simples Nacional)</li>
                    <li><strong>Imposto:</strong> ~8-16% da receita bruta</li>
                    <li><strong>Lucros:</strong> Isentos para distribuição</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Section 12 */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection('sec12')}
              className="w-full flex items-center justify-between p-4 bg-[#F9F7F4] hover:bg-[#E8E3DC] rounded-lg transition"
            >
              <h3 className="text-lg font-semibold text-[#1B4965]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                12. Ferramentas e Recursos Recomendados
              </h3>
              {expandedSections['sec12'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {expandedSections['sec12'] && (
              <div className="px-4 py-4 space-y-4 bg-white border-l-4 border-[#1B4965]">
                <div className="bg-[#6BA587]/5 border-l-4 border-[#6BA587] p-4 rounded space-y-3">
                  <h4 className="font-semibold text-[#6BA587]">🔗 Recursos Oficiais</h4>
                  <ul className="text-sm text-[#2C3E50] space-y-1">
                    <li><strong>Receita Federal:</strong> https://www.gov.br/receitafederal</li>
                    <li><strong>e-CAC:</strong> https://cac.receita.fazenda.gov.br</li>
                    <li><strong>Telefone:</strong> 146 (seg-sex, 8h-20h)</li>
                  </ul>
                </div>

                <div className="bg-[#D4A574]/5 border-l-4 border-[#D4A574] p-4 rounded space-y-3">
                  <h4 className="font-semibold text-[#D4A574]">🛠️ Ferramentas Práticas</h4>
                  <ul className="text-sm text-[#2C3E50] space-y-1">
                    <li>✓ Planilha Excel/Google Sheets para controle</li>
                    <li>✓ Apps de nota fiscal eletrônica</li>
                    <li>✓ Software de contabilidade simplificada</li>
                    <li>✓ Contador especializado em atividades artísticas</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Section 13 */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection('sec13')}
              className="w-full flex items-center justify-between p-4 bg-[#F9F7F4] hover:bg-[#E8E3DC] rounded-lg transition"
            >
              <h3 className="text-lg font-semibold text-[#1B4965]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                13. Perguntas Frequentes (FAQ)
              </h3>
              {expandedSections['sec13'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {expandedSections['sec13'] && (
              <div className="px-4 py-4 space-y-4 bg-white border-l-4 border-[#1B4965]">
                <div className="space-y-3">
                  <div className="bg-[#F9F7F4] p-3 rounded">
                    <p className="text-sm font-semibold text-[#1B4965]">P: Se receber via Pix, preciso declarar?</p>
                    <p className="text-sm text-[#2C3E50] mt-1"><strong>R:</strong> SIM. Pix é apenas meio de pagamento. Se a origem é cachê, aula ou direito autoral, é renda tributável.</p>
                  </div>

                  <div className="bg-[#F9F7F4] p-3 rounded">
                    <p className="text-sm font-semibold text-[#1B4965]">P: Qual é o limite para declarar IR?</p>
                    <p className="text-sm text-[#2C3E50] mt-1"><strong>R:</strong> Em 2024, acima de R$ 30.639,90 em rendimentos tributáveis é obrigatório declarar.</p>
                  </div>

                  <div className="bg-[#F9F7F4] p-3 rounded">
                    <p className="text-sm font-semibold text-[#1B4965]">P: Posso deduzir alimentação em shows?</p>
                    <p className="text-sm text-[#2C3E50] mt-1"><strong>R:</strong> Não. Alimentação pessoal não é dedutível. Apenas despesas diretamente ligadas à produção.</p>
                  </div>

                  <div className="bg-[#F9F7F4] p-3 rounded">
                    <p className="text-sm font-semibold text-[#1B4965]">P: Vale a pena abrir MEI?</p>
                    <p className="text-sm text-[#2C3E50] mt-1"><strong>R:</strong> Depende da renda. Se acima de R$ 3.000/mês, geralmente vale. Faça as contas com contador.</p>
                  </div>

                  <div className="bg-[#F9F7F4] p-3 rounded">
                    <p className="text-sm font-semibold text-[#1B4965]">P: O que acontece se não declarar?</p>
                    <p className="text-sm text-[#2C3E50] mt-1"><strong>R:</strong> Multa de 75-150% do imposto devido + juros. RFB cruza dados bancários e detecta omissões.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 14 */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection('sec14')}
              className="w-full flex items-center justify-between p-4 bg-[#F9F7F4] hover:bg-[#E8E3DC] rounded-lg transition"
            >
              <h3 className="text-lg font-semibold text-[#1B4965]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                14. Glossário de Termos Fiscais
              </h3>
              {expandedSections['sec14'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {expandedSections['sec14'] && (
              <div className="px-4 py-4 space-y-4 bg-white border-l-4 border-[#1B4965]">
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="bg-[#F9F7F4] p-3 rounded">
                    <p className="font-semibold text-[#1B4965]">Carnê-Leão</p>
                    <p className="text-[#2C3E50]">Recolhimento mensal de IR para PF autônoma.</p>
                  </div>
                  <div className="bg-[#F9F7F4] p-3 rounded">
                    <p className="font-semibold text-[#1B4965]">CNPJ</p>
                    <p className="text-[#2C3E50]">Cadastro Nacional da Pessoa Jurídica.</p>
                  </div>
                  <div className="bg-[#F9F7F4] p-3 rounded">
                    <p className="font-semibold text-[#1B4965]">CPF</p>
                    <p className="text-[#2C3E50]">Cadastro de Pessoa Física.</p>
                  </div>
                  <div className="bg-[#F9F7F4] p-3 rounded">
                    <p className="font-semibold text-[#1B4965]">DAS</p>
                    <p className="text-[#2C3E50]">Documento de Arrecadação do Simples Nacional.</p>
                  </div>
                  <div className="bg-[#F9F7F4] p-3 rounded">
                    <p className="font-semibold text-[#1B4965]">DARF</p>
                    <p className="text-[#2C3E50]">Documento de Arrecadação de Receitas Federais.</p>
                  </div>
                  <div className="bg-[#F9F7F4] p-3 rounded">
                    <p className="font-semibold text-[#1B4965]">IRPF</p>
                    <p className="text-[#2C3E50]">Imposto de Renda Pessoa Física (declaração anual).</p>
                  </div>
                  <div className="bg-[#F9F7F4] p-3 rounded">
                    <p className="font-semibold text-[#1B4965]">MEI</p>
                    <p className="text-[#2C3E50]">Microempreendedor Individual.</p>
                  </div>
                  <div className="bg-[#F9F7F4] p-3 rounded">
                    <p className="font-semibold text-[#1B4965]">RPA</p>
                    <p className="text-[#2C3E50]">Recibo de Pagamento a Autônomo.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 15 */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection('sec15')}
              className="w-full flex items-center justify-between p-4 bg-[#F9F7F4] hover:bg-[#E8E3DC] rounded-lg transition"
            >
              <h3 className="text-lg font-semibold text-[#1B4965]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                15. Conclusão e Próximos Passos
              </h3>
              {expandedSections['sec15'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {expandedSections['sec15'] && (
              <div className="px-4 py-4 space-y-4 bg-white border-l-4 border-[#1B4965]">
                <div className="bg-[#6BA587]/5 border-l-4 border-[#6BA587] p-4 rounded space-y-3">
                  <h4 className="font-semibold text-[#6BA587]">🎯 Resumo do Guia</h4>
                  <ul className="text-sm text-[#2C3E50] space-y-1">
                    <li>✓ Renda é renda - independentemente do meio de pagamento</li>
                    <li>✓ Declaração é obrigatória - para a maioria dos músicos profissionais</li>
                    <li>✓ Existem opções - PF, MEI ou Empresa, cada com vantagens</li>
                    <li>✓ Deduções reduzem imposto - organize despesas e maximize economia</li>
                    <li>✓ Organização é essencial - mantenha documentos em dia</li>
                  </ul>
                </div>

                <div className="bg-[#D4A574]/5 border-l-4 border-[#D4A574] p-4 rounded space-y-3">
                  <h4 className="font-semibold text-[#D4A574]">🚀 Próximos Passos</h4>
                  <div className="text-sm text-[#2C3E50] space-y-2">
                    <p><strong>Imediato (Esta semana):</strong></p>
                    <ul className="space-y-1 pl-4">
                      <li>1. Verifique se se enquadra em obrigatoriedade</li>
                      <li>2. Organize documentos fiscais do ano passado</li>
                      <li>3. Abra conta bancária separada para rendimentos</li>
                    </ul>
                    <p className="mt-2"><strong>Curto prazo (Este mês):</strong></p>
                    <ul className="space-y-1 pl-4">
                      <li>1. Consulte contador especializado</li>
                      <li>2. Decida entre PF, MEI ou Empresa</li>
                      <li>3. Comece a registrar renda e despesas</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#E07856] to-[#D4A574] rounded-xl p-6 text-white space-y-3">
                  <h3 className="text-lg font-bold" style={{ fontFamily: 'Lexend, sans-serif' }}>🎵 Transforme sua Arte em Carreira Profissional</h3>
                  <p className="text-sm opacity-90">
                    Com gestão fiscal responsável, você protege sua carreira e maximiza seus ganhos. Este guia é seu primeiro passo para profissionalização.
                  </p>
                  <p className="text-xs opacity-75">
                    Edição Atualizada 2025 | Base Legal: Ano-Calendário 2024
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CALL TO ACTION: FERRAMENTAS */}
        <section className="bg-[#F9F7F4] rounded-lg p-8 text-center space-y-6 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1B4965]" style={{ fontFamily: 'Lexend, sans-serif' }}>
            🧮 Precisa fazer cálculos?
          </h2>
          <p className="text-[#2C3E50] max-w-2xl mx-auto">
            Acesse nossa área de ferramentas exclusivas com calculadoras de Carnê-Leão, simulador de retenção RPA e consultoria automática para escolher o melhor regime fiscal.
          </p>
          <Link href="/ferramentas">
            <a className="inline-flex items-center gap-2 bg-[#E07856] hover:bg-[#D66A49] text-white font-bold py-3 px-8 rounded-lg transition text-lg">
              <BarChart3 size={24} />
              Acessar Ferramentas Fiscais
            </a>
          </Link>
        </section>
      </main>
    </div>
  );
}
