import { ChevronDown, AlertCircle, Lightbulb, CheckCircle2, Music, DollarSign, FileText, TrendingUp } from 'lucide-react';
import { useState } from 'react';

/**
 * E-book Mobile: Guia Essencial do Imposto de Renda para Músicos Autônomos
 * Design: Warm & Accessible
 * - Paleta: Azul-petróleo, Coral, Verde, Âmbar
 * - Tipografia: Lexend (títulos), Poppins (corpo)
 * - Mobile-first com muito espaçamento vertical
 */

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

function Accordion({ items }: { items: AccordionItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="border border-[#E8E3DC] rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
        >
          <button
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-[#F5F1ED] transition-colors"
          >
            <span className="font-medium text-[#2C3E50] text-left">{item.title}</span>
            <ChevronDown
              size={20}
              className={`text-[#1B4965] transition-transform ${
                openId === item.id ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openId === item.id && (
            <div className="px-4 py-3 bg-[#FFFBF7] border-t border-[#E8E3DC] text-[#2C3E50] text-sm leading-relaxed">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFBF7]">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-[#E8E3DC] py-4 px-4 z-50">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Music size={28} className="text-[#1B4965]" />
          <div>
            <h1 className="text-lg font-bold text-[#1B4965]" style={{ fontFamily: 'Lexend, sans-serif' }}>Guia IR para Músicos</h1>
            <p className="text-xs text-[#7F8C8D]">Edição 2025 • Mobile Edition</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        {/* Hero Section */}
        <section className="animate-fade-in-up">
          <div className="bg-gradient-to-br from-[#1B4965] to-[#2C5F7F] rounded-xl p-6 text-white space-y-4">
            <h2 className="text-2xl font-bold" style={{ fontFamily: 'Lexend, sans-serif' }}>Transforme sua Arte em Carreira Profissional</h2>
            <p className="text-sm leading-relaxed opacity-90">
              Tudo o que você precisa saber sobre Imposto de Renda, Carnê-Leão, MEI e gestão fiscal para músicos autônomos.
            </p>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-2">
                <FileText size={16} />
                <span>45-60 min</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>Atualizado 2025</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Guide */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-[#1B4965]" style={{ fontFamily: 'Lexend, sans-serif' }}>⚡ Guia Rápido</h3>
          <div className="space-y-3">
            <div className="badge-tip">
              <Lightbulb size={16} />
              <span>Para Quem é Este Guia</span>
            </div>
            <div className="text-sm text-[#2C3E50] leading-relaxed space-y-2">
              <p>✓ Músicos autônomos que recebem cachês</p>
              <p>✓ Professores de música particulares</p>
              <p>✓ Artistas com receitas de shows e direitos autorais</p>
              <p>✓ Profissionais que querem profissionalizar a gestão fiscal</p>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* Important Warning */}
        <section className="highlight-danger space-y-3">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-[#C85A54] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-[#C85A54] mb-2">Aviso Importante</h4>
              <p className="text-sm text-[#2C3E50] leading-relaxed">
                Este guia é educativo e informativo. A legislação tributária brasileira é dinâmica. Sempre consulte a legislação vigente e, em casos complexos, procure um contador especializado em atividades artísticas.
              </p>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* Part 1: Fundamentals */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-[#1B4965]" style={{ fontFamily: 'Lexend, sans-serif' }}>📚 Parte 1: Fundamentos</h3>

          {/* Section 1.1 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#1B4965] flex items-center gap-2" style={{ fontFamily: 'Lexend, sans-serif' }}>
              <span className="text-[#E07856]">1.</span> O Conceito de Renda para o Músico
            </h4>
            <p className="text-sm text-[#2C3E50] leading-relaxed">
              Para a Receita Federal do Brasil (RFB), <strong>renda</strong> é todo valor recebido que aumenta o seu patrimônio e não possui caráter de devolução.
            </p>

            <div className="highlight-tip space-y-3">
              <h5 className="font-semibold text-[#6BA587] text-sm">💰 O que é considerado renda tributável na música:</h5>
              <ul className="text-sm text-[#2C3E50] space-y-1.5">
                <li className="flex gap-2">
                  <span className="text-[#6BA587]">•</span>
                  <span><strong>Cachês</strong> de shows e apresentações (ao vivo ou online)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#6BA587]">•</span>
                  <span><strong>Direitos Autorais</strong> e direitos conexos</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#6BA587]">•</span>
                  <span><strong>Rendimentos</strong> de aulas particulares ou online</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#6BA587]">•</span>
                  <span><strong>Vendas</strong> de merchandising ou produtos digitais</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#6BA587]">•</span>
                  <span><strong>Receitas</strong> de plataformas digitais (YouTube, Spotify)</span>
                </li>
              </ul>
            </div>

            <div className="highlight-alert space-y-2">
              <h5 className="font-semibold text-[#D4A574] text-sm">🎯 Regra de Ouro</h5>
              <p className="text-sm text-[#2C3E50]">
                <strong>Cachês, shows e participações são SEMPRE renda tributável</strong>, independentemente de frequência, meio de pagamento ou valor individual.
              </p>
            </div>
          </div>

          <div className="section-divider" />

          {/* Section 1.2 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#1B4965] flex items-center gap-2" style={{ fontFamily: 'Lexend, sans-serif' }}>
              <span className="text-[#E07856]">2.</span> Obrigatoriedade da Declaração de IR
            </h4>
            <p className="text-sm text-[#2C3E50] leading-relaxed">
              O músico autônomo deve declarar o IRPF se, no ano-calendário, se enquadrar em qualquer uma das regras de obrigatoriedade estabelecidas pela RFB.
            </p>

            <Accordion
              items={[
                {
                  id: 'declare-1',
                  title: '✅ Você DEVE declarar se:',
                  content: (
                    <div className="space-y-3 text-sm">
                      <div>
                        <strong className="text-[#1B4965]">1. Recebeu rendimentos tributáveis acima do limite</strong>
                        <p className="text-[#7F8C8D] mt-1">Limite 2024: R$ 30.639,90</p>
                      </div>
                      <div>
                        <strong className="text-[#1B4965]">2. Recebeu rendimentos isentos acima do limite</strong>
                        <p className="text-[#7F8C8D] mt-1">Exemplo: Lucros de MEI acima de R$ 200.000,00</p>
                      </div>
                      <div>
                        <strong className="text-[#1B4965]">3. Possui bens acima do limite patrimonial</strong>
                        <p className="text-[#7F8C8D] mt-1">Limite 2024: R$ 800.000,00 (imóveis, veículos, instrumentos)</p>
                      </div>
                      <div>
                        <strong className="text-[#1B4965]">4. Teve imposto retido na fonte (RPA)</strong>
                        <p className="text-[#7F8C8D] mt-1">Mesmo que o valor seja pequeno</p>
                      </div>
                      <div>
                        <strong className="text-[#1B4965]">5. Obteve ganho de capital</strong>
                        <p className="text-[#7F8C8D] mt-1">Exemplo: Vendeu instrumento por valor maior que de compra</p>
                      </div>
                    </div>
                  ),
                },
                {
                  id: 'declare-2',
                  title: '📌 Na Prática',
                  content: (
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>A maioria dos músicos autônomos que buscam profissionalização precisa declarar.</strong>
                      </p>
                      <p className="text-[#7F8C8D] mt-3">
                        ⚠️ <strong>Importante:</strong> A declaração não significa necessariamente pagamento de imposto. Você pode declarar e não ter imposto a pagar (ou até receber restituição). A declaração é uma <strong>obrigação de informar</strong> sua situação fiscal.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </div>

          <div className="section-divider" />

          {/* Section 1.3 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#1B4965] flex items-center gap-2" style={{ fontFamily: 'Lexend, sans-serif' }}>
              <span className="text-[#E07856]">3.</span> Meios de Recebimento: Pix, Dinheiro e Transferência
            </h4>

            <div className="highlight-danger space-y-3">
              <h5 className="font-semibold text-[#C85A54] text-sm">❌ O MITO DO PIX</h5>
              <p className="text-sm text-[#2C3E50]">
                Existe um mito perigoso de que o <strong>Pix</strong> ou recebimento em <strong>dinheiro vivo</strong> não geram obrigação fiscal. <strong>Essa premissa está completamente incorreta.</strong>
              </p>
            </div>

            <div className="highlight-tip space-y-3">
              <h5 className="font-semibold text-[#6BA587] text-sm">✅ A VERDADE</h5>
              <p className="text-sm text-[#2C3E50] mb-2">
                <strong>Não existe "imposto sobre o Pix".</strong> O Pix é apenas um meio de pagamento, como TED, boleto ou dinheiro.
              </p>
              <p className="text-sm text-[#2C3E50]">
                <strong>O imposto incide sobre a ORIGEM e a NATUREZA do dinheiro:</strong>
              </p>
              <ul className="text-sm text-[#2C3E50] space-y-1.5">
                <li className="flex gap-2">
                  <span className="text-[#6BA587]">•</span>
                  <span>Se via Pix é cachê de show → <strong>renda tributável</strong></span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#6BA587]">•</span>
                  <span>Se em dinheiro é pagamento de aula → <strong>renda tributável</strong></span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#6BA587]">•</span>
                  <span>Se transferência de produtora → <strong>renda tributável</strong></span>
                </li>
              </ul>
            </div>

            <div className="highlight-alert space-y-2">
              <p className="text-sm text-[#2C3E50]">
                💡 <strong>DICA PRO:</strong> O problema nunca é o Pix ou o dinheiro. O problema é a <strong>omissão de renda</strong>.
              </p>
            </div>
          </div>

          <div className="section-divider" />

          {/* Section 1.4 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#1B4965] flex items-center gap-2" style={{ fontFamily: 'Lexend, sans-serif' }}>
              <span className="text-[#E07856]">4.</span> Pessoa Física (PF) vs. Pessoa Jurídica (PJ)
            </h4>
            <p className="text-sm text-[#2C3E50] leading-relaxed">
              A escolha entre atuar como <strong>Pessoa Física (PF)</strong> ou abrir uma <strong>Pessoa Jurídica (PJ)</strong> é um dos pontos mais críticos na gestão fiscal do músico.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-[#1B4965] text-white">
                    <th className="border border-[#E8E3DC] p-2 text-left font-semibold">Modelo</th>
                    <th className="border border-[#E8E3DC] p-2 text-left font-semibold">Tributação</th>
                    <th className="border border-[#E8E3DC] p-2 text-left font-semibold">Indicado Para</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-[#E8E3DC] p-2 font-semibold text-[#1B4965]">PF (Carnê-Leão)</td>
                    <td className="border border-[#E8E3DC] p-2 text-[#2C3E50]">Mensal + ajuste anual</td>
                    <td className="border border-[#E8E3DC] p-2 text-[#2C3E50]">Até R$ 5.000/mês</td>
                  </tr>
                  <tr className="bg-[#F5F1ED]">
                    <td className="border border-[#E8E3DC] p-2 font-semibold text-[#1B4965]">MEI</td>
                    <td className="border border-[#E8E3DC] p-2 text-[#2C3E50]">DAS ~R$ 75/mês</td>
                    <td className="border border-[#E8E3DC] p-2 text-[#2C3E50]">R$ 3.000 a R$ 7.000/mês</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-[#E8E3DC] p-2 font-semibold text-[#1B4965]">PJ (Empresa)</td>
                    <td className="border border-[#E8E3DC] p-2 text-[#2C3E50]">Na empresa + lucros</td>
                    <td className="border border-[#E8E3DC] p-2 text-[#2C3E50]">Acima de R$ 7.000/mês</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="highlight-tip space-y-3">
              <h5 className="font-semibold text-[#6BA587] text-sm">💡 EXEMPLO PRÁTICO DE ECONOMIA</h5>
              <p className="text-sm text-[#2C3E50] font-semibold">Cenário: Renda mensal de R$ 5.000</p>
              <div className="space-y-2 text-sm text-[#2C3E50]">
                <div className="flex justify-between">
                  <span><strong>Como PF (Carnê-Leão):</strong></span>
                  <span className="text-[#C85A54]">~R$ 450/mês</span>
                </div>
                <div className="flex justify-between">
                  <span><strong>Como MEI:</strong></span>
                  <span className="text-[#6BA587]">R$ 75/mês</span>
                </div>
                <div className="flex justify-between border-t border-[#D4A574] pt-2 mt-2">
                  <span><strong>Economia anual:</strong></span>
                  <span className="text-[#6BA587] font-semibold">R$ 4.500</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* Part 2: Practical Management */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-[#1B4965]" style={{ fontFamily: 'Lexend, sans-serif' }}>🎯 Parte 2: Gestão Fiscal na Prática</h3>

          {/* Section 2.1 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#1B4965] flex items-center gap-2" style={{ fontFamily: 'Lexend, sans-serif' }}>
              <span className="text-[#E07856]">5.</span> Carnê-Leão: Obrigatoriedade e Aplicação
            </h4>
            <p className="text-sm text-[#2C3E50] leading-relaxed">
              O <strong>Carnê-Leão</strong> é o recolhimento mensal obrigatório do Imposto de Renda devido por Pessoa Física que recebe rendimentos sem retenção na fonte.
            </p>

            <Accordion
              items={[
                {
                  id: 'carneLeao-1',
                  title: '✅ Quando Usar o Carnê-Leão',
                  content: (
                    <div className="space-y-2 text-sm text-[#2C3E50]">
                      <p>Você <strong>DEVE</strong> usar o Carnê-Leão quando:</p>
                      <ul className="space-y-1.5 mt-2">
                        <li className="flex gap-2">
                          <span className="text-[#6BA587]">1.</span>
                          <span>Receber rendimentos como <strong>Pessoa Física</strong></span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#6BA587]">2.</span>
                          <span>Pagamento de <strong>Pessoa Física</strong> (contratante particular)</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#6BA587]">3.</span>
                          <span>Pagamento de <strong>Pessoa Jurídica</strong> que <strong>não reteve IR</strong></span>
                        </li>
                      </ul>
                      <p className="mt-3 text-[#D4A574] font-semibold">
                        🎯 Regra de Ouro: Recebeu como PF + NÃO houve retenção = Carnê-Leão OBRIGATÓRIO
                      </p>
                    </div>
                  ),
                },
                {
                  id: 'carneLeao-2',
                  title: '📅 Como Funciona (Passo a Passo)',
                  content: (
                    <div className="space-y-2 text-sm text-[#2C3E50]">
                      <ol className="space-y-2">
                        <li className="flex gap-2">
                          <span className="text-[#1B4965] font-semibold">1.</span>
                          <span>Receba o cachê/pagamento durante o mês</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1B4965] font-semibold">2.</span>
                          <span>Registre no sistema até o último dia do mês</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1B4965] font-semibold">3.</span>
                          <span>Informe despesas dedutíveis com comprovantes</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1B4965] font-semibold">4.</span>
                          <span>Sistema calcula o imposto automaticamente</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1B4965] font-semibold">5.</span>
                          <span>Gere o DARF (boleto de pagamento)</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1B4965] font-semibold">6.</span>
                          <span>Pague até o último dia útil do mês seguinte</span>
                        </li>
                      </ol>
                      <p className="mt-3 text-[#7F8C8D]">
                        💻 Acesse: https://www.gov.br/receitafederal (Carnê-Leão Web no e-CAC)
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </div>

          <div className="section-divider" />

          {/* Section 2.2 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#1B4965] flex items-center gap-2" style={{ fontFamily: 'Lexend, sans-serif' }}>
              <span className="text-[#E07856]">6.</span> Despesas Dedutíveis
            </h4>
            <p className="text-sm text-[#2C3E50] leading-relaxed">
              A grande vantagem de declarar como autônomo (PF) via Carnê-Leão é a possibilidade de <strong>deduzir despesas</strong>.
            </p>

            <div className="highlight-tip space-y-3">
              <h5 className="font-semibold text-[#6BA587] text-sm">🎯 Como Funcionam as Deduções</h5>
              <p className="text-sm text-[#2C3E50]">
                <strong>Deduzir despesas = Reduzir a base de cálculo do imposto</strong>
              </p>
              <div className="bg-white rounded p-2 border border-[#6BA587]/20 text-xs font-mono text-[#2C3E50]">
                Base = Renda Bruta - Despesas - INSS<br/>
                Imposto = Base × Alíquota - Parcela Deduzir
              </div>
            </div>

            <Accordion
              items={[
                {
                  id: 'expenses-1',
                  title: '✅ O Que PODE Ser Deduzido',
                  content: (
                    <div className="space-y-3 text-sm text-[#2C3E50]">
                      <div>
                        <strong className="text-[#1B4965]">🚗 Transporte e Logística</strong>
                        <ul className="text-xs mt-1 space-y-0.5 text-[#7F8C8D]">
                          <li>• Combustível, pedágios, estacionamentos</li>
                          <li>• Uber/táxi para eventos profissionais</li>
                          <li>• Passagens aéreas/ônibus para shows</li>
                        </ul>
                      </div>
                      <div>
                        <strong className="text-[#1B4965]">🎸 Equipamentos e Instrumentos</strong>
                        <ul className="text-xs mt-1 space-y-0.5 text-[#7F8C8D]">
                          <li>• Manutenção e conserto de instrumentos</li>
                          <li>• Cordas, palhetas, baquetas, cabos</li>
                          <li>• Aluguel de equipamentos/som/iluminação</li>
                        </ul>
                      </div>
                      <div>
                        <strong className="text-[#1B4965]">📢 Divulgação e Marketing</strong>
                        <ul className="text-xs mt-1 space-y-0.5 text-[#7F8C8D]">
                          <li>• Impulsionamento de posts (Ads)</li>
                          <li>• Criação de site/landing page</li>
                          <li>• Fotos profissionais (press kit)</li>
                          <li>• Designer gráfico (artes, logos)</li>
                        </ul>
                      </div>
                      <div>
                        <strong className="text-[#1B4965]">📚 Capacitação</strong>
                        <ul className="text-xs mt-1 space-y-0.5 text-[#7F8C8D]">
                          <li>• Cursos e workshops de música</li>
                          <li>• Material didático e partituras</li>
                          <li>• Plataformas educativas</li>
                        </ul>
                      </div>
                    </div>
                  ),
                },
                {
                  id: 'expenses-2',
                  title: '❌ O Que NÃO Pode Ser Deduzido',
                  content: (
                    <div className="space-y-2 text-sm text-[#2C3E50]">
                      <div>
                        <strong className="text-[#C85A54]">Gastos Pessoais</strong>
                        <p className="text-xs text-[#7F8C8D] mt-1">Alimentação comum, roupas do dia a dia, lazer pessoal</p>
                      </div>
                      <div>
                        <strong className="text-[#C85A54]">Itens de Uso Misto</strong>
                        <p className="text-xs text-[#7F8C8D] mt-1">Celular novo, computador, notebook (são bens, não despesas)</p>
                      </div>
                      <div>
                        <strong className="text-[#C85A54]">Sem Comprovação</strong>
                        <p className="text-xs text-[#7F8C8D] mt-1">Recibos sem identificação, notas em nome de terceiros</p>
                      </div>
                      <div>
                        <strong className="text-[#C85A54]">Instrumentos Novos</strong>
                        <p className="text-xs text-[#7F8C8D] mt-1">Compra é um bem (declarar em "Bens e Direitos"). Apenas manutenção é dedutível.</p>
                      </div>
                    </div>
                  ),
                },
                {
                  id: 'expenses-3',
                  title: '💡 DICA DE OURO: Separe Contas Bancárias',
                  content: (
                    <div className="space-y-2 text-sm text-[#2C3E50]">
                      <p>
                        Quanto melhor você separa a <strong>conta pessoal</strong> da <strong>conta profissional</strong>, mais fácil fica comprovar deduções.
                      </p>
                      <div className="bg-[#6BA587]/5 border border-[#6BA587]/20 rounded p-2 mt-2 text-xs">
                        <strong>Estratégia:</strong><br/>
                        • Conta 1: Uso pessoal<br/>
                        • Conta 2: Recebe cachês e paga despesas<br/>
                        • No fim do ano, o extrato é seu "espelho fiscal"
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </section>

        <div className="section-divider" />

        {/* Call to Action */}
        <section className="bg-gradient-to-br from-[#E07856] to-[#D4A574] rounded-xl p-6 text-white space-y-3 mb-8">
          <h3 className="text-lg font-bold" style={{ fontFamily: 'Lexend, sans-serif' }}>Próximas Seções</h3>
          <p className="text-sm leading-relaxed">
            Este é o início do guia. Nas próximas seções você aprenderá sobre Tabela Progressiva do IR, Consequências da Não Declaração, Checklist Mensal e muito mais.
          </p>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <TrendingUp size={18} />
            <span>Continue lendo para dominar sua gestão fiscal</span>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#E8E3DC] pt-6 pb-8 text-center text-xs text-[#7F8C8D]">
          <p>Guia Essencial do Imposto de Renda para Músicos Autônomos</p>
          <p className="mt-1">Edição Atualizada 2025 | Base Legal: Ano-Calendário 2024</p>
          <p className="mt-2">⚠️ Conteúdo educativo. Consulte um contador para casos complexos.</p>
        </footer>
      </main>
    </div>
  );
}
