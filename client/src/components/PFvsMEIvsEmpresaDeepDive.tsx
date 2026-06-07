import { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle2, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import PromoCardApp from './PromoCardApp';

export default function PFvsMEIvsEmpresaDeepDive() {
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [rendaMensal, setRendaMensal] = useState(5000);

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topic]: !prev[topic]
    }));
  };

  const handleScrollAndExpand = (topic: string) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topic]: true
    }));
    setTimeout(() => {
      const element = document.getElementById(topic);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Cálculos para cada regime
  const calcularPF = () => {
    const renda = rendaMensal;
    const inss = renda * 0.11; // 11% de contribuição
    const base = renda - inss;
    let ir = 0;
    if (base > 2259.20) {
      if (base <= 2826.65) ir = (base * 0.075) - 169.44;
      else if (base <= 3751.05) ir = (base * 0.15) - 381.44;
      else if (base <= 4664.68) ir = (base * 0.225) - 662.77;
      else ir = (base * 0.275) - 896.00;
    }
    const total = inss + Math.max(0, ir);
    return { inss, ir: Math.max(0, ir), total, liquido: renda - total };
  };

  const calcularMEI = () => {
    const renda = rendaMensal;
    const das = 65.21; // Valor aproximado 2025 (pode variar)
    const inss = renda * 0.05; // 5% de contribuição (menor que PF)
    const base = renda - inss;
    let ir = 0;
    if (base > 2259.20) {
      if (base <= 2826.65) ir = (base * 0.075) - 169.44;
      else if (base <= 3751.05) ir = (base * 0.15) - 381.44;
      else if (base <= 4664.68) ir = (base * 0.225) - 662.77;
      else ir = (base * 0.275) - 896.00;
    }
    const total = das + inss + Math.max(0, ir);
    return { das, inss, ir: Math.max(0, ir), total, liquido: renda - total };
  };

  const calcularEmpresa = () => {
    const renda = rendaMensal;
    const lucro = renda * 0.25; // Estimativa de lucro (25% da receita)
    const irpj = lucro * 0.15; // 15% de IRPJ
    const csll = lucro * 0.09; // 9% de CSLL
    const inss = renda * 0.075; // 7.5% de INSS patronal
    const pis = renda * 0.0165; // 1.65% de PIS
    const cofins = renda * 0.076; // 7.6% de COFINS
    const total = irpj + csll + inss + pis + cofins;
    return { irpj, csll, inss, pis, cofins, total, liquido: renda - total };
  };

  const pf = calcularPF();
  const mei = calcularMEI();
  const empresa = calcularEmpresa();

  const comparacao = [
    {
      aspecto: 'Faturamento Máximo',
      pf: 'Ilimitado',
      mei: 'R$ 81.000/ano (R$ 6.750/mês)',
      empresa: 'Ilimitado'
    },
    {
      aspecto: 'INSS',
      pf: '11% (autônomo)',
      mei: '5% (reduzido)',
      empresa: '7.5% (patronal)'
    },
    {
      aspecto: 'Imposto de Renda',
      pf: 'Carnê-Leão + IRPF',
      mei: 'Carnê-Leão + IRPF',
      empresa: 'IRPJ + CSLL'
    },
    {
      aspecto: 'Outros Impostos',
      pf: 'Nenhum',
      mei: 'Nenhum',
      empresa: 'PIS + COFINS'
    },
    {
      aspecto: 'Complexidade',
      pf: 'Baixa',
      mei: 'Baixa',
      empresa: 'Alta'
    },
    {
      aspecto: 'Contabilidade',
      pf: 'Simples',
      mei: 'Simples',
      empresa: 'Obrigatória'
    },
    {
      aspecto: 'Benefícios INSS',
      pf: 'Básicos',
      mei: 'Básicos',
      empresa: 'Completos'
    },
    {
      aspecto: 'Custo Contador',
      pf: 'R$ 0-300/ano',
      mei: 'R$ 0-300/ano',
      empresa: 'R$ 500-2000/mês'
    },
  ];

  const vantagens = {
    pf: [
      'Sem limite de faturamento',
      'Sem obrigações acessórias',
      'Flexibilidade total',
      'Sem necessidade de contador',
      'Simples de organizar'
    ],
    mei: [
      'INSS reduzido (5%)',
      'DAS mensal simples',
      'Sem limite de faturamento até R$ 81k',
      'Sem obrigações acessórias',
      'Fácil de gerenciar'
    ],
    empresa: [
      'Separação patrimônio pessoal/empresa',
      'Benefícios INSS completos',
      'Possibilidade de lucro distribuído',
      'Credibilidade com clientes',
      'Possibilidade de contratar'
    ]
  };

  const desvantagens = {
    pf: [
      'INSS mais alto (11%)',
      'Responsabilidade ilimitada',
      'Sem separação de patrimônio',
      'Sem benefícios INSS completos'
    ],
    mei: [
      'Limite de faturamento (R$ 81k/ano)',
      'Sem possibilidade de contratar',
      'Sem separação de patrimônio',
      'Responsabilidade ilimitada'
    ],
    empresa: [
      'Custo alto de contador',
      'Muitas obrigações acessórias',
      'Complexidade tributária',
      'Necessidade de CNPJ',
      'Burocracia maior'
    ]
  };

  return (
    <div className="space-y-6">
      {/* Introdução */}
      <div className="bg-gradient-to-br from-[#1B4965] to-[#2C5F7F] rounded-lg p-4 md:p-6 text-white space-y-3">
        <h3 className="text-xl md:text-2xl font-bold" style={{ fontFamily: 'Lexend, sans-serif' }}>
          🎯 PF vs MEI vs Empresa: Qual é Melhor?
        </h3>
        <p className="text-sm md:text-base opacity-90">
          Comparação completa entre os três regimes fiscais. Descubra qual é mais vantajoso para sua situação com calculadora interativa.
        </p>
      </div>

      {/* Sumário do Capítulo */}
      <div className="bg-[#F9F7F4] border border-[#E8E3DC] rounded-xl p-6 shadow-sm">
        <h4 className="font-extrabold text-[#1B4965] text-lg mb-4 flex items-center gap-2" style={{ fontFamily: 'Lexend, sans-serif' }}>
          📚 Sumário do Capítulo
        </h4>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { id: 'entender', label: '1. Entendendo os Três Regimes' },
            { id: 'calculadora', label: '2. Calculadora Comparativa' },
            { id: 'tabela', label: '3. Tabela Comparativa Completa' },
            { id: 'vantagens', label: '4. Vantagens e Desvantagens' },
            { id: 'migrar', label: '5. Quando Migrar de Regime?' },
            { id: 'recomendacoes', label: '6. Recomendações por Perfil' }
          ].map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleScrollAndExpand(topic.id)}
              className="text-left text-sm font-semibold text-[#1B4965] hover:text-[#2C5F7F] hover:underline flex items-center gap-2 py-1 transition"
            >
              <span className="text-xs">▶</span>
              {topic.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tópico 1: Entendendo os Regimes */}
      <div id="entender" style={{ scrollMarginTop: '2rem' }} className="border border-[#E8E3DC] rounded-lg overflow-hidden">
        <button
          onClick={() => toggleTopic('entender')}
          className="w-full px-4 md:px-6 py-4 bg-[#F9F7F4] hover:bg-[#F0EBE3] flex items-center justify-between transition"
        >
          <h4 className="font-semibold text-[#1B4965] text-sm md:text-base" style={{ fontFamily: 'Lexend, sans-serif' }}>
            📖 Entendendo os Três Regimes
          </h4>
          {expandedTopics['entender'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedTopics['entender'] && (
          <div className="px-4 md:px-6 py-4 space-y-4 text-sm md:text-base text-[#2C3E50]">
            <div className="border border-[#E8E3DC] rounded-lg p-4 bg-[#F9F7F4]">
              <h5 className="font-semibold text-[#1B4965] mb-2">👤 PF (Pessoa Física)</h5>
              <p className="mb-2">Você trabalha como autônomo, sem empresa. Recebe em seu CPF.</p>
              <p className="text-xs md:text-sm text-[#7F8C8D]"><strong>Quando usar:</strong> Renda baixa/média, flexibilidade total, sem limite de faturamento.</p>
            </div>

            <div className="border border-[#E8E3DC] rounded-lg p-4 bg-[#F9F7F4]">
              <h5 className="font-semibold text-[#1B4965] mb-2">🏪 MEI (Microempreendedor Individual)</h5>
              <p className="mb-2">Você tem um CNPJ, mas continua sendo praticamente autônomo. Limite: R$ 81.000/ano.</p>
              <p className="text-xs md:text-sm text-[#7F8C8D]"><strong>Quando usar:</strong> Renda até R$ 6.750/mês, quer CNPJ, quer INSS reduzido.</p>
            </div>

            <div className="border border-[#E8E3DC] rounded-lg p-4 bg-[#F9F7F4]">
              <h5 className="font-semibold text-[#1B4965] mb-2">🏢 Empresa (PJ)</h5>
              <p className="mb-2">Você tem uma empresa com CNPJ. Separação entre você e a empresa.</p>
              <p className="text-xs md:text-sm text-[#7F8C8D]"><strong>Quando usar:</strong> Renda alta, quer separação patrimonial, pode contratar.</p>
            </div>
          </div>
        )}
      </div>

      {/* Tópico 2: Calculadora Comparativa */}
      <div id="calculadora" style={{ scrollMarginTop: '2rem' }} className="border border-[#E8E3DC] rounded-lg overflow-hidden">
        <button
          onClick={() => toggleTopic('calculadora')}
          className="w-full px-4 md:px-6 py-4 bg-[#F9F7F4] hover:bg-[#F0EBE3] flex items-center justify-between transition"
        >
          <h4 className="font-semibold text-[#1B4965] text-sm md:text-base" style={{ fontFamily: 'Lexend, sans-serif' }}>
            💻 Calculadora Comparativa
          </h4>
          {expandedTopics['calculadora'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedTopics['calculadora'] && (
          <div className="px-4 md:px-6 py-4 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#1B4965] mb-2">
                Renda Mensal (R$)
              </label>
              <input
                type="number"
                value={rendaMensal}
                onChange={(e) => setRendaMensal(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-[#E8E3DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4965]"
                placeholder="5000"
              />
              <p className="text-xs text-[#7F8C8D] mt-1">Mude o valor para ver a comparação atualizada</p>
            </div>

            {/* Comparação Visual */}
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              {/* PF */}
              <div className="border border-[#E8E3DC] rounded-lg p-4 bg-gradient-to-br from-[#E3F2FD] to-white">
                <h5 className="font-semibold text-[#1B4965] mb-3">👤 PF (Autônomo)</h5>
                <div className="space-y-2 text-xs md:text-sm">
                  <div className="flex justify-between">
                    <span>Renda:</span>
                    <span className="font-semibold">R$ {rendaMensal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-[#E07856]">
                    <span>- INSS (11%):</span>
                    <span className="font-semibold">R$ {pf.inss.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-[#E07856]">
                    <span>- IR:</span>
                    <span className="font-semibold">R$ {pf.ir.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="border-t border-[#E8E3DC] pt-2 flex justify-between">
                    <span className="font-semibold">Total Impostos:</span>
                    <span className="font-bold text-[#E07856]">R$ {pf.total.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="bg-[#6BA587] text-white p-2 rounded flex justify-between">
                    <span className="font-semibold">Líquido:</span>
                    <span className="font-bold">R$ {pf.liquido.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <p className="text-[#7F8C8D] text-xs mt-2">
                    Carga: {((pf.total / rendaMensal) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* MEI */}
              <div className="border border-[#E8E3DC] rounded-lg p-4 bg-gradient-to-br from-[#E8F5E9] to-white">
                <h5 className="font-semibold text-[#1B4965] mb-3">🏪 MEI</h5>
                <div className="space-y-2 text-xs md:text-sm">
                  <div className="flex justify-between">
                    <span>Renda:</span>
                    <span className="font-semibold">R$ {rendaMensal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-[#E07856]">
                    <span>- DAS:</span>
                    <span className="font-semibold">R$ {mei.das.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-[#E07856]">
                    <span>- INSS (5%):</span>
                    <span className="font-semibold">R$ {mei.inss.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-[#E07856]">
                    <span>- IR:</span>
                    <span className="font-semibold">R$ {mei.ir.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="border-t border-[#E8E3DC] pt-2 flex justify-between">
                    <span className="font-semibold">Total Impostos:</span>
                    <span className="font-bold text-[#E07856]">R$ {mei.total.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="bg-[#6BA587] text-white p-2 rounded flex justify-between">
                    <span className="font-semibold">Líquido:</span>
                    <span className="font-bold">R$ {mei.liquido.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <p className="text-[#7F8C8D] text-xs mt-2">
                    Carga: {((mei.total / rendaMensal) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Empresa */}
              <div className="border border-[#E8E3DC] rounded-lg p-4 bg-gradient-to-br from-[#FFF3CD] to-white">
                <h5 className="font-semibold text-[#1B4965] mb-3">🏢 Empresa</h5>
                <div className="space-y-2 text-xs md:text-sm">
                  <div className="flex justify-between">
                    <span>Receita:</span>
                    <span className="font-semibold">R$ {rendaMensal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-[#E07856]">
                    <span>- IRPJ (15%):</span>
                    <span className="font-semibold">R$ {empresa.irpj.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-[#E07856]">
                    <span>- CSLL (9%):</span>
                    <span className="font-semibold">R$ {empresa.csll.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-[#E07856]">
                    <span>- Outros:</span>
                    <span className="font-semibold">R$ {(empresa.inss + empresa.pis + empresa.cofins).toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="border-t border-[#E8E3DC] pt-2 flex justify-between">
                    <span className="font-semibold">Total Impostos:</span>
                    <span className="font-bold text-[#E07856]">R$ {empresa.total.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="bg-[#D4A574] text-white p-2 rounded flex justify-between">
                    <span className="font-semibold">Disponível:</span>
                    <span className="font-bold">R$ {empresa.liquido.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <p className="text-[#7F8C8D] text-xs mt-2">
                    Carga: {((empresa.total / rendaMensal) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            {/* Resumo da Economia */}
            <div className="mt-4 p-4 bg-[#E8F5E9] border-l-4 border-[#6BA587] rounded">
              <p className="text-sm md:text-base text-[#1B4965]">
                <strong>💡 Análise:</strong> Para renda de R$ {rendaMensal.toFixed(0).replace('.', ',')}/mês:
              </p>
              <ul className="text-xs md:text-sm text-[#2C3E50] mt-2 space-y-1 pl-4">
                <li>✅ <strong>MEI economiza</strong> R$ {(pf.total - mei.total).toFixed(2).replace('.', ',')} vs PF</li>
                <li>✅ <strong>Melhor opção:</strong> {mei.total < pf.total && mei.total < empresa.total ? 'MEI' : pf.total < empresa.total ? 'PF' : 'Empresa'}</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Tópico 3: Tabela Comparativa */}
      <div id="tabela" style={{ scrollMarginTop: '2rem' }} className="border border-[#E8E3DC] rounded-lg overflow-hidden">
        <button
          onClick={() => toggleTopic('tabela')}
          className="w-full px-4 md:px-6 py-4 bg-[#F9F7F4] hover:bg-[#F0EBE3] flex items-center justify-between transition"
        >
          <h4 className="font-semibold text-[#1B4965] text-sm md:text-base" style={{ fontFamily: 'Lexend, sans-serif' }}>
            📊 Tabela Comparativa Completa
          </h4>
          {expandedTopics['tabela'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedTopics['tabela'] && (
          <div className="px-4 md:px-6 py-4 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#1B4965] text-white">
                    <th className="border border-[#E8E3DC] p-2 text-left">Aspecto</th>
                    <th className="border border-[#E8E3DC] p-2 text-center">PF</th>
                    <th className="border border-[#E8E3DC] p-2 text-center">MEI</th>
                    <th className="border border-[#E8E3DC] p-2 text-center">Empresa</th>
                  </tr>
                </thead>
                <tbody>
                  {comparacao.map((linha, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F9F7F4]'}>
                      <td className="border border-[#E8E3DC] p-2 font-semibold text-[#1B4965]">{linha.aspecto}</td>
                      <td className="border border-[#E8E3DC] p-2 text-center text-[#2C3E50]">{linha.pf}</td>
                      <td className="border border-[#E8E3DC] p-2 text-center text-[#2C3E50]">{linha.mei}</td>
                      <td className="border border-[#E8E3DC] p-2 text-center text-[#2C3E50]">{linha.empresa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Tópico 4: Vantagens e Desvantagens */}
      <div id="vantagens" style={{ scrollMarginTop: '2rem' }} className="border border-[#E8E3DC] rounded-lg overflow-hidden">
        <button
          onClick={() => toggleTopic('vantagens')}
          className="w-full px-4 md:px-6 py-4 bg-[#F9F7F4] hover:bg-[#F0EBE3] flex items-center justify-between transition"
        >
          <h4 className="font-semibold text-[#1B4965] text-sm md:text-base" style={{ fontFamily: 'Lexend, sans-serif' }}>
            ✅ Vantagens e Desvantagens
          </h4>
          {expandedTopics['vantagens'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedTopics['vantagens'] && (
          <div className="px-4 md:px-6 py-4 space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              {/* PF */}
              <div>
                <h5 className="font-semibold text-[#1B4965] mb-3">👤 PF (Autônomo)</h5>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-semibold text-[#6BA587] mb-2">✅ Vantagens:</p>
                    <ul className="text-xs text-[#2C3E50] space-y-1 pl-3">
                      {vantagens.pf.map((v, i) => <li key={i}>• {v}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#E07856] mb-2">❌ Desvantagens:</p>
                    <ul className="text-xs text-[#2C3E50] space-y-1 pl-3">
                      {desvantagens.pf.map((d, i) => <li key={i}>• {d}</li>)}
                    </ul>
                  </div>
                </div>
              </div>

              {/* MEI */}
              <div>
                <h5 className="font-semibold text-[#1B4965] mb-3">🏪 MEI</h5>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-semibold text-[#6BA587] mb-2">✅ Vantagens:</p>
                    <ul className="text-xs text-[#2C3E50] space-y-1 pl-3">
                      {vantagens.mei.map((v, i) => <li key={i}>• {v}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#E07856] mb-2">❌ Desvantagens:</p>
                    <ul className="text-xs text-[#2C3E50] space-y-1 pl-3">
                      {desvantagens.mei.map((d, i) => <li key={i}>• {d}</li>)}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Empresa */}
              <div>
                <h5 className="font-semibold text-[#1B4965] mb-3">🏢 Empresa</h5>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-semibold text-[#6BA587] mb-2">✅ Vantagens:</p>
                    <ul className="text-xs text-[#2C3E50] space-y-1 pl-3">
                      {vantagens.empresa.map((v, i) => <li key={i}>• {v}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#E07856] mb-2">❌ Desvantagens:</p>
                    <ul className="text-xs text-[#2C3E50] space-y-1 pl-3">
                      {desvantagens.empresa.map((d, i) => <li key={i}>• {d}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tópico 5: Quando Migrar */}
      <div id="migrar" style={{ scrollMarginTop: '2rem' }} className="border border-[#E8E3DC] rounded-lg overflow-hidden">
        <button
          onClick={() => toggleTopic('migrar')}
          className="w-full px-4 md:px-6 py-4 bg-[#F9F7F4] hover:bg-[#F0EBE3] flex items-center justify-between transition"
        >
          <h4 className="font-semibold text-[#1B4965] text-sm md:text-base" style={{ fontFamily: 'Lexend, sans-serif' }}>
            🔄 Quando Migrar de Regime?
          </h4>
          {expandedTopics['migrar'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedTopics['migrar'] && (
          <div className="px-4 md:px-6 py-4 space-y-4 text-sm md:text-base text-[#2C3E50]">
            <div className="border border-[#E8E3DC] rounded-lg p-4 bg-[#F9F7F4]">
              <h5 className="font-semibold text-[#1B4965] mb-2">PF → MEI</h5>
              <p className="mb-2"><strong>Quando:</strong> Sua renda está entre R$ 3.000-6.750/mês</p>
              <p className="text-xs md:text-sm text-[#7F8C8D]">
                <strong>Por quê:</strong> MEI tem INSS reduzido (5% vs 11%), economizando bastante. Você ganha CNPJ e credibilidade.
              </p>
            </div>

            <div className="border border-[#E8E3DC] rounded-lg p-4 bg-[#F9F7F4]">
              <h5 className="font-semibold text-[#1B4965] mb-2">MEI → Empresa</h5>
              <p className="mb-2"><strong>Quando:</strong> Sua renda ultrapassa R$ 6.750/mês (limite MEI)</p>
              <p className="text-xs md:text-sm text-[#7F8C8D]">
                <strong>Por quê:</strong> MEI não pode faturar mais. Empresa permite faturamento ilimitado e separação patrimonial.
              </p>
            </div>

            <div className="border border-[#E8E3DC] rounded-lg p-4 bg-[#F9F7F4]">
              <h5 className="font-semibold text-[#1B4965] mb-2">PF → Empresa</h5>
              <p className="mb-2"><strong>Quando:</strong> Sua renda é muito alta (acima de R$ 10.000/mês)</p>
              <p className="text-xs md:text-sm text-[#7F8C8D]">
                <strong>Por quê:</strong> Empresa pode ser mais vantajosa fiscalmente em rendas altas. Consulte contador.
              </p>
            </div>

            <div className="bg-[#FFF3CD] border-l-4 border-[#D4A574] p-4 rounded mt-4">
              <p className="font-semibold text-[#D4A574] mb-2">⚠️ Importante:</p>
              <p className="text-xs md:text-sm">Sempre consulte um contador especializado antes de migrar. Cada situação é única e há custos envolvidos.</p>
            </div>
          </div>
        )}
      </div>

      {/* Tópico 6: Recomendações por Perfil */}
      <div id="recomendacoes" style={{ scrollMarginTop: '2rem' }} className="border border-[#E8E3DC] rounded-lg overflow-hidden">
        <button
          onClick={() => toggleTopic('recomendacoes')}
          className="w-full px-4 md:px-6 py-4 bg-[#F9F7F4] hover:bg-[#F0EBE3] flex items-center justify-between transition"
        >
          <h4 className="font-semibold text-[#1B4965] text-sm md:text-base" style={{ fontFamily: 'Lexend, sans-serif' }}>
            🎯 Recomendações por Perfil
          </h4>
          {expandedTopics['recomendacoes'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedTopics['recomendacoes'] && (
          <div className="px-4 md:px-6 py-4 space-y-4">
            {[
              {
                perfil: 'Músico com Renda Baixa (até R$ 2.500/mês)',
                recomendacao: 'PF',
                motivo: 'Sem necessidade de imposto. Simples e sem burocracia.'
              },
              {
                perfil: 'Professor de Música (R$ 3.000-6.750/mês)',
                recomendacao: 'MEI',
                motivo: 'INSS reduzido economiza bastante. Ganha credibilidade com CNPJ.'
              },
              {
                perfil: 'Produtor Musical (R$ 6.750-15.000/mês)',
                recomendacao: 'Empresa (PJ)',
                motivo: 'Ultrapassa limite MEI. Empresa oferece mais flexibilidade.'
              },
              {
                perfil: 'Artista com Renda Alta (acima de R$ 15.000/mês)',
                recomendacao: 'Empresa (PJ)',
                motivo: 'Separação patrimonial importante. Possibilidade de lucro distribuído.'
              },
              {
                perfil: 'Múltiplas Fontes de Renda',
                recomendacao: 'Depende - Consulte Contador',
                motivo: 'Pode ser vantajoso ter empresa + PF. Situação complexa.'
              },
            ].map((item, idx) => (
              <div key={idx} className="border border-[#E8E3DC] rounded-lg p-4 bg-[#F9F7F4]">
                <p className="font-semibold text-[#1B4965] text-sm md:text-base">{item.perfil}</p>
                <p className="text-xs md:text-sm text-[#2C3E50] mt-1">
                  <strong>Recomendação:</strong> <span className="text-[#6BA587] font-semibold">{item.recomendacao}</span>
                </p>
                <p className="text-xs md:text-sm text-[#7F8C8D] mt-1">
                  <strong>Motivo:</strong> {item.motivo}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resumo Final */}
      <div className="bg-[#E8F5E9] border-l-4 border-[#6BA587] rounded-lg p-4 md:p-6 space-y-3">
        <h4 className="font-semibold text-[#6BA587] text-base md:text-lg">✅ Resumo: Escolhendo o Melhor Regime</h4>
        <ol className="space-y-2 pl-4 list-decimal text-sm md:text-base text-[#2C3E50]">
          <li><strong>Analise sua renda:</strong> Quanto você ganha por mês?</li>
          <li><strong>Compare impostos:</strong> Use a calculadora acima</li>
          <li><strong>Considere benefícios:</strong> CNPJ, INSS, separação patrimonial</li>
          <li><strong>Consulte contador:</strong> Cada caso é único</li>
          <li><strong>Revise anualmente:</strong> Sua situação pode mudar</li>
        </ol>
      </div>

      <PromoCardApp chapterName="regimes" />

      {/* Linkagem Interna Cruzada */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 border border-gray-200 p-6 rounded-2xl gap-4 my-8">
          <div>
              <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Próximo Capítulo</span>
              <h4 className="font-bold text-[#0c2461] text-lg mt-1" style={{ fontFamily: 'Lexend, sans-serif' }}>RPA: Imposto de Renda e Retenção</h4>
          </div>
          <Link href="/guia/rpa" className="bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold px-6 py-3 rounded-xl transition flex items-center gap-2 text-sm shadow-md w-full sm:w-auto justify-center">
              Ler Capítulo <ArrowRight size={16} />
          </Link>
      </div>
    </div>
  );
}
