import { useState } from 'react';
import { ChevronDown, ChevronUp, Calculator, AlertCircle, CheckCircle2, Info } from 'lucide-react';

export default function CarneLeaoDeepDive() {
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [anoBase, setAnoBase] = useState<'2025' | '2026'>('2026');
  const [calculatorData, setCalculatorData] = useState({
    rendaBruta: 0,
    despesas: 0,
    inss: 0,
  });

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topic]: !prev[topic]
    }));
  };

  // Tabela progressiva 2026 (Isenção R$ 5.000)
  const tabelaProgressiva = [
    { faixa: 'Até R$ 5.000,00', aliquota: '0%', deducao: 'R$ 0,00', descricao: 'Isento' },
    { faixa: 'R$ 5.000,01 a R$ 7.500,00', aliquota: '7,5%', deducao: 'R$ 375,00', descricao: 'Primeira faixa' },
    { faixa: 'R$ 7.500,01 a R$ 10.000,00', aliquota: '15%', deducao: 'R$ 937,50', descricao: 'Segunda faixa' },
    { faixa: 'R$ 10.000,01 a R$ 12.500,00', aliquota: '22,5%', deducao: 'R$ 1.687,50', descricao: 'Terceira faixa' },
    { faixa: 'Acima de R$ 12.500,00', aliquota: '27,5%', deducao: 'R$ 2.312,50', descricao: 'Quarta faixa' },
  ];

  // Calcular IR (Tabela 2026 ou 2025)
  const calcularIR = () => {
    const baseCalculo = calculatorData.rendaBruta - calculatorData.despesas - calculatorData.inss;
    
    if (anoBase === '2026') {
      // Tabela 2026 (Isenção 5k)
      if (baseCalculo <= 5000.00) return 0;
      if (baseCalculo <= 7500.00) return (baseCalculo * 0.075) - 375.00;
      if (baseCalculo <= 10000.00) return (baseCalculo * 0.15) - 937.50;
      if (baseCalculo <= 12500.00) return (baseCalculo * 0.225) - 1687.50;
      return (baseCalculo * 0.275) - 2312.50;
    } else {
      // Tabela 2025 (Isenção 2.259,20)
      if (baseCalculo <= 2259.20) return 0;
      if (baseCalculo <= 2826.65) return (baseCalculo * 0.075) - 169.44;
      if (baseCalculo <= 3751.05) return (baseCalculo * 0.15) - 381.44;
      if (baseCalculo <= 4664.68) return (baseCalculo * 0.225) - 662.77;
      return (baseCalculo * 0.275) - 896.00;
    }
  };

  const irCalculado = calcularIR();
  const baseCalculo = calculatorData.rendaBruta - calculatorData.despesas - calculatorData.inss;

  return (
    <div className="space-y-6">
      {/* Introdução */}
      <div className="bg-gradient-to-br from-[#1B4965] to-[#2C5F7F] rounded-lg p-4 md:p-6 text-white space-y-3">
            <h3 className="text-xl md:text-2xl font-bold" style={{ fontFamily: 'Lexend, sans-serif' }}>
              🎯 Carnê-Leão: Guia Completo (Tabela 2026)
            </h3>
        <p className="text-sm md:text-base opacity-90">
          Entenda tudo sobre o Carnê-Leão: o que é, como funciona, quando é obrigatório, como calcular e como pagar. Com exemplos práticos e calculadora interativa.
        </p>
      </div>

      {/* Tópico 1: O que é Carnê-Leão */}
      <div className="border border-[#E8E3DC] rounded-lg overflow-hidden">
        <button
          onClick={() => toggleTopic('oQueE')}
          className="w-full px-4 md:px-6 py-4 bg-[#F9F7F4] hover:bg-[#F0EBE3] flex items-center justify-between transition"
        >
          <h4 className="font-semibold text-[#1B4965] text-sm md:text-base" style={{ fontFamily: 'Lexend, sans-serif' }}>
            📖 O que é Carnê-Leão?
          </h4>
          {expandedTopics['oQueE'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedTopics['oQueE'] && (
          <div className="px-4 md:px-6 py-4 space-y-4 text-sm md:text-base text-[#2C3E50]">
            <p>
              <strong>Carnê-Leão</strong> é um documento de arrecadação de impostos que você preenche e paga mensalmente à Receita Federal. É obrigatório para quem recebe rendimentos de trabalho autônomo ou profissional liberal sem vínculo empregatício.
            </p>
            
            <div className="bg-[#F9F7F4] border-l-4 border-[#6BA587] p-4 rounded">
              <p className="font-semibold text-[#6BA587] mb-2">💡 Resumo Simples:</p>
              <p>Carnê-Leão = Imposto que você calcula e paga por conta própria, todo mês, sobre seus rendimentos como músico autônomo.</p>
            </div>

            <h5 className="font-semibold text-[#1B4965] mt-4">Características principais:</h5>
            <ul className="space-y-2 pl-4">
              <li>✅ <strong>Obrigatório:</strong> Se sua renda mensal ultrapassa R$ 5.000,00</li>
              <li>✅ <strong>Mensal:</strong> Você paga todo mês, não anualmente</li>
              <li>✅ <strong>Progressivo:</strong> Quanto mais você ganha, maior a alíquota</li>
              <li>✅ <strong>Descontável:</strong> Reduz sua renda na declaração anual de IR</li>
              <li>✅ <strong>Sem retenção:</strong> Você recebe o valor integral e paga o imposto</li>
            </ul>
          </div>
        )}
      </div>

      {/* Tópico 2: Quando é Obrigatório */}
      <div className="border border-[#E8E3DC] rounded-lg overflow-hidden">
        <button
          onClick={() => toggleTopic('obrigatorio')}
          className="w-full px-4 md:px-6 py-4 bg-[#F9F7F4] hover:bg-[#F0EBE3] flex items-center justify-between transition"
        >
          <h4 className="font-semibold text-[#1B4965] text-sm md:text-base" style={{ fontFamily: 'Lexend, sans-serif' }}>
            ⚠️ Quando é Obrigatório?
          </h4>
          {expandedTopics['obrigatorio'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedTopics['obrigatorio'] && (
          <div className="px-4 md:px-6 py-4 space-y-4 text-sm md:text-base text-[#2C3E50]">
            <h5 className="font-semibold text-[#1B4965]">Você DEVE preencher Carnê-Leão se:</h5>
            <ul className="space-y-2 pl-4">
              <li>✅ Recebe cachês como músico autônomo</li>
              <li>✅ Dá aulas particulares de música</li>
              <li>✅ Recebe direitos autorais de composições</li>
              <li>✅ Tem rendimentos de shows e apresentações</li>
              <li>✅ Trabalha como freelancer/profissional liberal</li>
              <li>✅ Sua renda mensal ultrapassa R$ 5.000,00</li>
            </ul>

            <div className="bg-[#FFF3CD] border-l-4 border-[#D4A574] p-4 rounded mt-4">
              <p className="font-semibold text-[#D4A574] mb-2">⚡ Atenção:</p>
              <p>Mesmo que sua renda seja menor que R$ 5.000,00, você pode preencher Carnê-Leão voluntariamente. Isso é recomendado para manter controle e organização.</p>
            </div>

            <h5 className="font-semibold text-[#1B4965] mt-4">Você NÃO precisa de Carnê-Leão se:</h5>
            <ul className="space-y-2 pl-4">
              <li>❌ É empregado com carteira assinada (IR já é descontado)</li>
              <li>❌ É MEI (Microempreendedor Individual) - paga DAS em vez disso</li>
              <li>❌ É Empresa (PJ) - paga IR diferente</li>
              <li>❌ Sua renda é muito baixa (abaixo do limite)</li>
            </ul>
          </div>
        )}
      </div>

      {/* Tópico 3: Tabela Progressiva */}
      <div className="border border-[#E8E3DC] rounded-lg overflow-hidden">
        <button
          onClick={() => toggleTopic('tabela')}
          className="w-full px-4 md:px-6 py-4 bg-[#F9F7F4] hover:bg-[#F0EBE3] flex items-center justify-between transition"
        >
            <h4 className="font-semibold text-[#1B4965] text-sm md:text-base" style={{ fontFamily: 'Lexend, sans-serif' }}>
              📊 Tabela Progressiva 2026 (Isenção R$ 5k)
            </h4>
          {expandedTopics['tabela'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedTopics['tabela'] && (
          <div className="px-4 md:px-6 py-4 space-y-4">
            <p className="text-sm md:text-base text-[#2C3E50]">
              A tabela abaixo mostra as alíquotas progressivas do Carnê-Leão para 2026, com a nova isenção de R$ 5.000,00. Quanto maior sua renda, maior o percentual de imposto.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#1B4965] text-white">
                    <th className="border border-[#E8E3DC] p-2 text-left">Base de Cálculo</th>
                    <th className="border border-[#E8E3DC] p-2 text-center">Alíquota</th>
                    <th className="border border-[#E8E3DC] p-2 text-center">Dedução</th>
                  </tr>
                </thead>
                <tbody>
                  {tabelaProgressiva.map((linha, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F9F7F4]'}>
                      <td className="border border-[#E8E3DC] p-2">{linha.faixa}</td>
                      <td className="border border-[#E8E3DC] p-2 text-center font-semibold text-[#E07856]">{linha.aliquota}</td>
                      <td className="border border-[#E8E3DC] p-2 text-center">{linha.deducao}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-[#E8F5E9] border-l-4 border-[#6BA587] p-4 rounded mt-4">
              <p className="font-semibold text-[#6BA587] mb-2">📌 Como Usar a Tabela:</p>
              <p className="text-sm md:text-base">
                1. Calcule sua <strong>base de cálculo</strong> (renda - despesas - INSS)<br/>
                2. Encontre a faixa correspondente<br/>
                3. Multiplique a base pela alíquota<br/>
                4. Subtraia a dedução<br/>
                5. O resultado é seu imposto mensal
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Tópico 4: Calculadora Interativa */}
      <div className="border border-[#E8E3DC] rounded-lg overflow-hidden">
        <button
          onClick={() => toggleTopic('calculadora')}
          className="w-full px-4 md:px-6 py-4 bg-[#F9F7F4] hover:bg-[#F0EBE3] flex items-center justify-between transition"
        >
          <h4 className="font-semibold text-[#1B4965] text-sm md:text-base" style={{ fontFamily: 'Lexend, sans-serif' }}>
            <Calculator size={18} className="inline mr-2" />
            Calculadora de Carnê-Leão
          </h4>
          {expandedTopics['calculadora'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedTopics['calculadora'] && (
          <div className="px-4 md:px-6 py-4 space-y-4">
            <p className="text-sm md:text-base text-[#2C3E50]">
              Preencha os valores abaixo para calcular seu imposto mensal:
            </p>

            <div className="space-y-4">
              {/* Seletor de Ano */}
              <div className="flex gap-2 mb-4 bg-white p-1 rounded-lg border border-[#E8E3DC] w-fit">
                <button
                  onClick={() => setAnoBase('2026')}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                    anoBase === '2026' 
                      ? 'bg-[#1B4965] text-white shadow-sm' 
                      : 'text-[#7F8C8D] hover:bg-[#F5F2ED]'
                  }`}
                >
                  Regra 2026 (Carnê-Leão)
                </button>
                <button
                  onClick={() => setAnoBase('2025')}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                    anoBase === '2025' 
                      ? 'bg-[#1B4965] text-white shadow-sm' 
                      : 'text-[#7F8C8D] hover:bg-[#F5F2ED]'
                  }`}
                >
                  Regra 2025 (Declaração)
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1B4965] mb-2">
                  Renda Bruta Mensal (R$)
                </label>
                <input
                  type="number"
                  value={calculatorData.rendaBruta}
                  onChange={(e) => setCalculatorData({...calculatorData, rendaBruta: parseFloat(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-[#E8E3DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4965]"
                  placeholder="Ex: 5000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1B4965] mb-2">
                  Despesas Dedutíveis (R$)
                </label>
                <input
                  type="number"
                  value={calculatorData.despesas}
                  onChange={(e) => setCalculatorData({...calculatorData, despesas: parseFloat(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-[#E8E3DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4965]"
                  placeholder="Ex: 800"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1B4965] mb-2">
                  INSS Pago (R$)
                </label>
                <input
                  type="number"
                  value={calculatorData.inss}
                  onChange={(e) => setCalculatorData({...calculatorData, inss: parseFloat(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-[#E8E3DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4965]"
                  placeholder="Ex: 300"
                />
              </div>
            </div>

            {/* Resultado */}
            <div className="mt-6 p-4 bg-gradient-to-br from-[#1B4965] to-[#2C5F7F] rounded-lg text-white space-y-3">
              <div className="border-b border-white/20 pb-3">
                <p className="text-xs md:text-sm opacity-90">Base de Cálculo</p>
                <p className="text-lg md:text-2xl font-bold">R$ {baseCalculo.toFixed(2).replace('.', ',')}</p>
              </div>
              
              <div className="border-b border-white/20 pb-3">
                <p className="text-xs md:text-sm opacity-90">Imposto Mensal (Carnê-Leão)</p>
                <p className="text-2xl md:text-3xl font-bold text-[#E07856]">R$ {Math.max(0, irCalculado).toFixed(2).replace('.', ',')}</p>
              </div>

              <div>
                <p className="text-xs md:text-sm opacity-90">Renda Líquida (após IR)</p>
                <p className="text-lg md:text-xl font-bold">R$ {(calculatorData.rendaBruta - Math.max(0, irCalculado)).toFixed(2).replace('.', ',')}</p>
              </div>
            </div>

            <div className="bg-[#E3F2FD] border-l-4 border-[#1B4965] p-4 rounded mt-4">
              <p className="text-xs md:text-sm text-[#1B4965]">
                <strong>Nota:</strong> Esta calculadora é apenas para fins educacionais. Para situações complexas, consulte um contador especializado.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Tópico 5: Exemplos Práticos */}
      <div className="border border-[#E8E3DC] rounded-lg overflow-hidden">
        <button
          onClick={() => toggleTopic('exemplos')}
          className="w-full px-4 md:px-6 py-4 bg-[#F9F7F4] hover:bg-[#F0EBE3] flex items-center justify-between transition"
        >
          <h4 className="font-semibold text-[#1B4965] text-sm md:text-base" style={{ fontFamily: 'Lexend, sans-serif' }}>
            📝 Exemplos Práticos
          </h4>
          {expandedTopics['exemplos'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedTopics['exemplos'] && (
          <div className="px-4 md:px-6 py-4 space-y-6">
            {/* Exemplo 1 */}
            <div className="border border-[#E8E3DC] rounded-lg p-4 bg-[#F9F7F4]">
              <h5 className="font-semibold text-[#1B4965] mb-3">Exemplo 1: Músico com Renda Baixa</h5>
              <div className="space-y-2 text-sm md:text-base">
                <p><strong>Situação:</strong> João toca em bares e recebe R$ 2.000/mês</p>
                <p><strong>Despesas:</strong> R$ 300 (combustível e cordas)</p>
                <p><strong>INSS:</strong> R$ 180 (contribuição mensal)</p>
                
                <div className="bg-white p-3 rounded mt-3 space-y-2">
                  <p>Base de Cálculo = R$ 2.000 - R$ 300 - R$ 180 = <strong>R$ 1.520</strong></p>
                  <p className="text-[#6BA587]">✅ Resultado 2026: <strong>ISENTO</strong> (abaixo de R$ 5.000,00)</p>
                  <p className="text-xs text-[#7F8C8D] mt-1">Nota: Na declaração referente a 2025, o limite era R$ 2.259,20.</p>
                  <p className="text-xs text-[#7F8C8D]">João não precisa pagar Carnê-Leão este mês</p>
                </div>
              </div>
            </div>

            {/* Exemplo 2 */}
            <div className="border border-[#E8E3DC] rounded-lg p-4 bg-[#F9F7F4]">
              <h5 className="font-semibold text-[#1B4965] mb-3">Exemplo 2: Músico com Renda Média</h5>
              <div className="space-y-2 text-sm md:text-base">
                <p><strong>Situação:</strong> Maria dá aulas e toca em eventos, recebe R$ 4.500/mês</p>
                <p><strong>Despesas:</strong> R$ 800 (aluguel estúdio, material)</p>
                <p><strong>INSS:</strong> R$ 400 (contribuição mensal)</p>
                
                <div className="bg-white p-3 rounded mt-3 space-y-2">
                  <p>Base de Cálculo = R$ 4.500 - R$ 800 - R$ 400 = <strong>R$ 3.300</strong></p>
                  <p>Alíquota: 15% | Dedução: R$ 381,44</p>
                  <p>IR = (R$ 3.300 × 0,15) - R$ 381,44 = <strong>R$ 113,56</strong></p>
                  <p className="text-[#E07856]">⚠️ Maria deve pagar R$ 113,56 de Carnê-Leão</p>
                </div>
              </div>
            </div>

            {/* Exemplo 3 */}
            <div className="border border-[#E8E3DC] rounded-lg p-4 bg-[#F9F7F4]">
              <h5 className="font-semibold text-[#1B4965] mb-3">Exemplo 3: Músico com Renda Alta</h5>
              <div className="space-y-2 text-sm md:text-base">
                <p><strong>Situação:</strong> Pedro é produtor musical, recebe R$ 8.000/mês</p>
                <p><strong>Despesas:</strong> R$ 2.000 (estúdio, equipamentos)</p>
                <p><strong>INSS:</strong> R$ 600 (contribuição mensal)</p>
                
                <div className="bg-white p-3 rounded mt-3 space-y-2">
                  <p>Base de Cálculo = R$ 8.000 - R$ 2.000 - R$ 600 = <strong>R$ 5.400</strong></p>
                  <p>Alíquota: 27,5% | Dedução: R$ 896,00</p>
                  <p>IR = (R$ 5.400 × 0,275) - R$ 896,00 = <strong>R$ 589,00</strong></p>
                  <p className="text-[#E07856]">⚠️ Pedro deve pagar R$ 589,00 de Carnê-Leão</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tópico 6: Como Pagar */}
      <div className="border border-[#E8E3DC] rounded-lg overflow-hidden">
        <button
          onClick={() => toggleTopic('comoPagar')}
          className="w-full px-4 md:px-6 py-4 bg-[#F9F7F4] hover:bg-[#F0EBE3] flex items-center justify-between transition"
        >
          <h4 className="font-semibold text-[#1B4965] text-sm md:text-base" style={{ fontFamily: 'Lexend, sans-serif' }}>
            💳 Como Pagar o Carnê-Leão
          </h4>
          {expandedTopics['comoPagar'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedTopics['comoPagar'] && (
          <div className="px-4 md:px-6 py-4 space-y-4 text-sm md:text-base text-[#2C3E50]">
            <h5 className="font-semibold text-[#1B4965]">Passo a Passo para Pagar:</h5>
            
            <ol className="space-y-3 pl-4 list-decimal">
              <li>
                <strong>Acesse o site da Receita Federal</strong>
                <p className="text-xs md:text-sm text-[#7F8C8D] mt-1">www.gov.br/receitafederal</p>
              </li>
              <li>
                <strong>Clique em "Gerar DARF"</strong>
                <p className="text-xs md:text-sm text-[#7F8C8D] mt-1">Procure pela opção de gerar DARF (Documento de Arrecadação de Receitas Federais)</p>
              </li>
              <li>
                <strong>Preencha os dados</strong>
                <p className="text-xs md:text-sm text-[#7F8C8D] mt-1">CPF, período, valor do imposto calculado</p>
              </li>
              <li>
                <strong>Gere o código de barras</strong>
                <p className="text-xs md:text-sm text-[#7F8C8D] mt-1">O sistema gera um código de barras para pagamento</p>
              </li>
              <li>
                <strong>Pague no banco ou internet banking</strong>
                <p className="text-xs md:text-sm text-[#7F8C8D] mt-1">Use o código de barras para pagar até o último dia útil do mês</p>
              </li>
            </ol>

            <div className="bg-[#FFF3CD] border-l-4 border-[#D4A574] p-4 rounded mt-4">
              <p className="font-semibold text-[#D4A574] mb-2">⏰ Prazo Importante:</p>
              <p>O pagamento deve ser feito até o <strong>último dia útil do mês</strong>. Se não pagar no prazo, você fica sujeito a multa e juros.</p>
            </div>

            <h5 className="font-semibold text-[#1B4965] mt-6">Alternativas de Pagamento:</h5>
            <ul className="space-y-2 pl-4">
              <li>✅ <strong>Débito automático:</strong> Configure no e-CAC da Receita</li>
              <li>✅ <strong>Internet banking:</strong> Pague pelo app do seu banco</li>
              <li>✅ <strong>Caixa eletrônico:</strong> Insira o código de barras</li>
              <li>✅ <strong>Banco/Lotérica:</strong> Leve o DARF impresso</li>
            </ul>
          </div>
        )}
      </div>

      {/* Tópico 7: Erros Comuns */}
      <div className="border border-[#E8E3DC] rounded-lg overflow-hidden">
        <button
          onClick={() => toggleTopic('erros')}
          className="w-full px-4 md:px-6 py-4 bg-[#F9F7F4] hover:bg-[#F0EBE3] flex items-center justify-between transition"
        >
          <h4 className="font-semibold text-[#1B4965] text-sm md:text-base" style={{ fontFamily: 'Lexend, sans-serif' }}>
            ❌ Erros Comuns a Evitar
          </h4>
          {expandedTopics['erros'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedTopics['erros'] && (
          <div className="px-4 md:px-6 py-4 space-y-4">
            <div className="space-y-3">
              {[
                {
                  erro: 'Não preencher Carnê-Leão quando obrigatório',
                  consequencia: 'Multa de 75% + juros + possível malha fina',
                  solucao: 'Preencha se renda > R$ 5.000 (Regra 2026) ou > R$ 2.259 (Regra 2025)'
                },
                {
                  erro: 'Deduzir despesas sem comprovação',
                  consequencia: 'Autuação pela Receita Federal',
                  solucao: 'Guarde todas as notas fiscais e recibos'
                },
                {
                  erro: 'Pagar após o prazo (último dia útil)',
                  consequencia: 'Multa de 0,33% ao dia + juros',
                  solucao: 'Pague sempre antes do último dia útil do mês'
                },
                {
                  erro: 'Omitir rendimentos no Carnê-Leão',
                  consequencia: 'Fraude fiscal, multa pesada',
                  solucao: 'Declare TODOS os rendimentos, mesmo pequenos'
                },
                {
                  erro: 'Confundir Carnê-Leão com MEI',
                  consequencia: 'Pagamento de imposto errado',
                  solucao: 'Verifique se você é PF ou MEI'
                },
              ].map((item, idx) => (
                <div key={idx} className="border border-[#E8E3DC] rounded-lg p-3 md:p-4 bg-[#FFF3CD]/30">
                  <p className="font-semibold text-[#C85A54] text-sm md:text-base mb-2">❌ {item.erro}</p>
                  <p className="text-xs md:text-sm text-[#2C3E50] mb-2"><strong>Consequência:</strong> {item.consequencia}</p>
                  <p className="text-xs md:text-sm text-[#6BA587]"><strong>✅ Solução:</strong> {item.solucao}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tópico 8: FAQ */}
      <div className="border border-[#E8E3DC] rounded-lg overflow-hidden">
        <button
          onClick={() => toggleTopic('faq')}
          className="w-full px-4 md:px-6 py-4 bg-[#F9F7F4] hover:bg-[#F0EBE3] flex items-center justify-between transition"
        >
          <h4 className="font-semibold text-[#1B4965] text-sm md:text-base" style={{ fontFamily: 'Lexend, sans-serif' }}>
            ❓ Perguntas Frequentes
          </h4>
          {expandedTopics['faq'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedTopics['faq'] && (
          <div className="px-4 md:px-6 py-4 space-y-4">
            <div className="space-y-3">
              {[
                {
                  pergunta: 'Posso deduzir TODAS as minhas despesas?',
                  resposta: 'Não. Apenas despesas diretamente relacionadas à sua atividade profissional. Exemplo: combustível para ir a shows, cordas de instrumentos, aluguel de estúdio. Não pode: conta de água de casa, alimentação pessoal.'
                },
                {
                  pergunta: 'E se eu tiver um mês sem renda?',
                  resposta: 'Se sua renda mensal for zero ou muito baixa, você não precisa preencher Carnê-Leão naquele mês. Mas se tiver despesas, você pode deduzir do próximo mês com renda.'
                },
                {
                  pergunta: 'Carnê-Leão reduz meu IR na declaração anual?',
                  resposta: 'Sim! Todo Carnê-Leão pago durante o ano é abatido do seu IR anual. Se pagou R$ 500/mês (R$ 6.000/ano), isso reduz seu imposto final.'
                },
                {
                  pergunta: 'Preciso guardar os comprovantes de pagamento?',
                  resposta: 'Sim! Guarde por 5 anos. Em caso de fiscalização, você precisa comprovar que pagou. Guarde também as notas das despesas deduzidas.'
                },
                {
                  pergunta: 'Posso pagar Carnê-Leão em atraso?',
                  resposta: 'Pode, mas vai sofrer multa de 0,33% ao dia + juros. É melhor pagar no prazo. Se não conseguir, pague assim que possível.'
                },
              ].map((item, idx) => (
                <div key={idx} className="border border-[#E8E3DC] rounded-lg p-3 md:p-4">
                  <p className="font-semibold text-[#1B4965] text-sm md:text-base mb-2">❓ {item.pergunta}</p>
                  <p className="text-xs md:text-sm text-[#2C3E50]">{item.resposta}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Resumo Final */}
      <div className="bg-[#E8F5E9] border-l-4 border-[#6BA587] rounded-lg p-4 md:p-6 space-y-3">
        <h4 className="font-semibold text-[#6BA587] text-base md:text-lg">✅ Resumo: Carnê-Leão em 5 Pontos</h4>
        <ol className="space-y-2 pl-4 list-decimal text-sm md:text-base text-[#2C3E50]">
          <li><strong>Para 2026 (Carnê-Leão):</strong> Obrigatório se renda mensal &gt; R$ 5.000,00</li>
          <li><strong>Para Declaração 2026 (Ano-base 2025):</strong> Obrigatório se renda mensal &gt; R$ 2.259,20</li>
          <li><strong>Você calcula e paga</strong> mensalmente (até o último dia útil)</li>
          <li><strong>Use a tabela progressiva</strong> para calcular o valor correto</li>
          <li><strong>Deduza apenas despesas comprovadas</strong> relacionadas à sua atividade</li>
          <li><strong>Guarde comprovantes</strong> por 5 anos para possível fiscalização</li>
        </ol>
      </div>
    </div>
  );
}
