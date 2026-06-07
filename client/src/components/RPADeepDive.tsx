import { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import PromoCardApp from './PromoCardApp';

export default function RPADeepDive() {
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [calculatorData, setCalculatorData] = useState({
    cacheBruto: 0,
    retencao: 0,
    liquido: 0,
  });

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

  // Tabela de alíquotas de retenção 2026 (Isenção R$ 5k)
  const tabelaRetencao = [
    { faixa: 'Até R$ 5.000,00', aliquota: '0%', deducao: 'R$ 0,00' },
    { faixa: 'R$ 5.000,01 a R$ 7.500,00', aliquota: '7,5%', deducao: 'R$ 375,00' },
    { faixa: 'R$ 7.500,01 a R$ 10.000,00', aliquota: '15%', deducao: 'R$ 937,50' },
    { faixa: 'R$ 10.000,01 a R$ 12.500,00', aliquota: '22,5%', deducao: 'R$ 1.687,50' },
    { faixa: 'Acima de R$ 12.500,00', aliquota: '27,5%', deducao: 'R$ 2.312,50' },
  ];

  // Calcular retenção (Tabela 2026)
  const calcularRetencao = (valor: number) => {
    if (valor <= 5000.00) return 0;
    if (valor <= 7500.00) return (valor * 0.075) - 375.00;
    if (valor <= 10000.00) return (valor * 0.15) - 937.50;
    if (valor <= 12500.00) return (valor * 0.225) - 1687.50;
    return (valor * 0.275) - 2312.50;
  };

  const retencaoCalculada = calcularRetencao(calculatorData.cacheBruto);
  const liquido = calculatorData.cacheBruto - retencaoCalculada;

  const exemplosRPA = [
    {
      titulo: 'Exemplo 1: Cachê Pequeno',
      cacheBruto: 1500,
      retencao: 0,
      descricao: 'Abaixo do limite - sem retenção'
    },
    {
      titulo: 'Exemplo 2: Cachê Médio',
      cacheBruto: 3000,
      retencao: calcularRetencao(3000),
      descricao: 'Retenção de 15% - valor típico'
    },
    {
      titulo: 'Exemplo 3: Cachê Alto',
      cacheBruto: 5000,
      retencao: calcularRetencao(5000),
      descricao: 'Retenção de 27,5% - cachês maiores'
    },
    {
      titulo: 'Exemplo 4: Múltiplos Cachês',
      cacheBruto: 2000 + 1500 + 2500,
      retencao: calcularRetencao(2000) + calcularRetencao(1500) + calcularRetencao(2500),
      descricao: 'Retenção calculada por cachê'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Introdução */}
      <div className="bg-gradient-to-br from-[#E07856] to-[#D4A574] rounded-lg p-4 md:p-6 text-white space-y-3">
            <h3 className="text-xl md:text-2xl font-bold" style={{ fontFamily: 'Lexend, sans-serif' }}>
              💸 Retenção de IR (RPA): Guia Completo (Tabela 2026)
            </h3>
        <p className="text-sm md:text-base opacity-90">
          Entenda tudo sobre retenção de Imposto de Renda em cachês: o que é, quando ocorre, como calcular e como compensar na declaração anual.
        </p>
      </div>

      {/* Sumário do Capítulo */}
      <div className="bg-[#F9F7F4] border border-[#E8E3DC] rounded-xl p-6 shadow-sm">
        <h4 className="font-extrabold text-[#1B4965] text-lg mb-4 flex items-center gap-2" style={{ fontFamily: 'Lexend, sans-serif' }}>
          📚 Sumário do Capítulo
        </h4>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { id: 'oQueE', label: '1. O que é RPA (Retenção de IR)?' },
            { id: 'quando', label: '2. Quando Ocorre a Retenção?' },
            { id: 'tabela', label: '3. Tabela de Alíquotas 2026' },
            { id: 'calculadora', label: '4. Calculadora de Retenção' },
            { id: 'exemplos', label: '5. Exemplos Práticos' },
            { id: 'compensacao', label: '6. Como Compensar na Declaração Anual' },
            { id: 'erros', label: '7. Erros Comuns com RPA' },
            { id: 'faq', label: '8. Perguntas Frequentes' }
          ].map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleScrollAndExpand(topic.id)}
              className="text-left text-sm font-semibold text-[#E07856] hover:text-[#D4A574] hover:underline flex items-center gap-2 py-1 transition"
            >
              <span className="text-xs">▶</span>
              {topic.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tópico 1: O que é RPA */}
      <div id="oQueE" style={{ scrollMarginTop: '2rem' }} className="border border-[#E8E3DC] rounded-lg overflow-hidden">
        <button
          onClick={() => toggleTopic('oQueE')}
          className="w-full px-4 md:px-6 py-4 bg-[#F9F7F4] hover:bg-[#F0EBE3] flex items-center justify-between transition"
        >
          <h4 className="font-semibold text-[#1B4965] text-sm md:text-base" style={{ fontFamily: 'Lexend, sans-serif' }}>
            📖 O que é RPA (Retenção de IR)?
          </h4>
          {expandedTopics['oQueE'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        <div className={`px-4 md:px-6 py-4 space-y-4 text-sm md:text-base text-[#2C3E50] ${expandedTopics['oQueE'] ? 'block' : 'hidden print:block'}`}>
            <p>
              <strong>RPA (Recibo de Pagamento a Autônomo)</strong> é um documento que comprova o pagamento de um cachê a um profissional autônomo. Quando você recebe um cachê, o pagador pode reter (descontar) uma parte do valor como Imposto de Renda e repassar à Receita Federal.
            </p>
            
            <div className="bg-[#FFF3CD] border-l-4 border-[#D4A574] p-4 rounded">
              <p className="font-semibold text-[#D4A574] mb-2">💡 Resumo Simples:</p>
              <p>Você recebe R$ 3.000 de cachê → Retém R$ 450 (15%) → Você recebe R$ 2.550 na mão</p>
            </div>

            <h5 className="font-semibold text-[#1B4965] mt-4">Características principais:</h5>
            <ul className="space-y-2 pl-4">
              <li>✅ <strong>Automática:</strong> Quem paga o cachê faz a retenção</li>
              <li>✅ <strong>Progressiva:</strong> Quanto maior o cachê, maior a alíquota</li>
              <li>✅ <strong>Descontável:</strong> Reduz seu IR na declaração anual</li>
              <li>✅ <strong>Documentada:</strong> RPA serve como comprovante</li>
              <li>✅ <strong>Repassada:</strong> O pagador repassa à Receita Federal</li>
            </ul>

            <div className="bg-[#E3F2FD] border-l-4 border-[#1B4965] p-4 rounded mt-4">
              <p className="text-xs md:text-sm text-[#1B4965]">
                <strong>Diferença importante:</strong> RPA é retenção (desconto automático). Carnê-Leão é que você paga mensalmente. São coisas diferentes!
              </p>
            </div>
          </div>
      </div>

      {/* Tópico 2: Quando Ocorre Retenção */}
      <div id="quando" style={{ scrollMarginTop: '2rem' }} className="border border-[#E8E3DC] rounded-lg overflow-hidden">
        <button
          onClick={() => toggleTopic('quando')}
          className="w-full px-4 md:px-6 py-4 bg-[#F9F7F4] hover:bg-[#F0EBE3] flex items-center justify-between transition"
        >
          <h4 className="font-semibold text-[#1B4965] text-sm md:text-base" style={{ fontFamily: 'Lexend, sans-serif' }}>
            ⏰ Quando Ocorre a Retenção?
          </h4>
          {expandedTopics['quando'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        <div className={`px-4 md:px-6 py-4 space-y-4 text-sm md:text-base text-[#2C3E50] ${expandedTopics['quando'] ? 'block' : 'hidden print:block'}`}>
            <h5 className="font-semibold text-[#1B4965]">Retenção ocorre quando:</h5>
            <ul className="space-y-2 pl-4">
              <li>✅ Você recebe cachê de produtora/agência</li>
              <li>✅ Você recebe honorários de consultoria</li>
              <li>✅ Você recebe cachê de TV/rádio</li>
              <li>✅ Você recebe cachê de show em casa de shows</li>
              <li>✅ Você recebe pagamento de pessoa jurídica (empresa)</li>
            </ul>

            <h5 className="font-semibold text-[#1B4965] mt-4">NÃO há retenção quando:</h5>
            <ul className="space-y-2 pl-4">
              <li>❌ Você recebe de pessoa física (amigo, cliente particular)</li>
              <li>❌ Você é MEI e emite recibo próprio</li>
              <li>❌ Você tem empresa (PJ) e emite nota fiscal</li>
              <li>❌ Você é empregado (carteira assinada)</li>
            </ul>

            <div className="bg-[#FFF3CD] border-l-4 border-[#D4A574] p-4 rounded mt-4">
              <p className="font-semibold text-[#D4A574] mb-2">⚠️ Importante:</p>
              <p>A retenção só ocorre se o pagador está obrigado a fazer. Nem todos os pagadores fazem retenção corretamente. Sempre peça o RPA como comprovante.</p>
            </div>
          </div>
      </div>

      {/* Tópico 3: Tabela de Alíquotas */}
      <div id="tabela" style={{ scrollMarginTop: '2rem' }} className="border border-[#E8E3DC] rounded-lg overflow-hidden">
        <button
          onClick={() => toggleTopic('tabela')}
          className="w-full px-4 md:px-6 py-4 bg-[#F9F7F4] hover:bg-[#F0EBE3] flex items-center justify-between transition"
        >
            <h4 className="font-semibold text-[#1B4965] text-sm md:text-base" style={{ fontFamily: 'Lexend, sans-serif' }}>
              📊 Tabela de Alíquotas 2026 (Isenção R$ 5k)
            </h4>
          {expandedTopics['tabela'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        <div className={`px-4 md:px-6 py-4 space-y-4 ${expandedTopics['tabela'] ? 'block' : 'hidden print:block'}`}>
            <p className="text-sm md:text-base text-[#2C3E50]">
              A tabela abaixo mostra as alíquotas de retenção por valor de cachê para 2026, com a nova isenção de R$ 5.000,00:
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#E07856] text-white">
                    <th className="border border-[#E8E3DC] p-2 text-left">Valor do Cachê</th>
                    <th className="border border-[#E8E3DC] p-2 text-center">Alíquota</th>
                    <th className="border border-[#E8E3DC] p-2 text-center">Dedução</th>
                  </tr>
                </thead>
                <tbody>
                  {tabelaRetencao.map((linha, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F9F7F4]'}>
                      <td className="border border-[#E8E3DC] p-2">{linha.faixa}</td>
                      <td className="border border-[#E8E3DC] p-2 text-center font-semibold text-[#E07856]">{linha.aliquota}</td>
                      <td className="border border-[#E8E3DC] p-2 text-center">{linha.deducao}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-[#E3F2FD] border-l-4 border-[#1B4965] p-4 rounded mt-4">
              <p className="font-semibold text-[#1B4965] mb-2">📌 Como Usar a Tabela:</p>
              <p className="text-sm md:text-base">
                1. Encontre a faixa do seu cachê<br/>
                2. Multiplique pelo percentual<br/>
                3. Subtraia a dedução<br/>
                4. O resultado é o IR retido
              </p>
            </div>
          </div>
      </div>

      {/* Tópico 4: Calculadora */}
      <div id="calculadora" style={{ scrollMarginTop: '2rem' }} className="border border-[#E8E3DC] rounded-lg overflow-hidden">
        <button
          onClick={() => toggleTopic('calculadora')}
          className="w-full px-4 md:px-6 py-4 bg-[#F9F7F4] hover:bg-[#F0EBE3] flex items-center justify-between transition"
        >
          <h4 className="font-semibold text-[#1B4965] text-sm md:text-base" style={{ fontFamily: 'Lexend, sans-serif' }}>
            💻 Calculadora de Retenção
          </h4>
          {expandedTopics['calculadora'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        <div className={`px-4 md:px-6 py-4 space-y-4 ${expandedTopics['calculadora'] ? 'block' : 'hidden print:block'}`}>
            <p className="text-sm md:text-base text-[#2C3E50]">
              Digite o valor bruto do cachê para calcular quanto será retido:
            </p>

            <div>
              <label className="block text-sm font-semibold text-[#1B4965] mb-2">
                Valor Bruto do Cachê (R$)
              </label>
              <input
                type="number"
                value={calculatorData.cacheBruto}
                onChange={(e) => setCalculatorData({...calculatorData, cacheBruto: parseFloat(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-[#E8E3DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E07856]"
                placeholder="Ex: 3000"
              />
            </div>

            {/* Resultado */}
            <div className="mt-6 p-4 bg-gradient-to-br from-[#E07856] to-[#D4A574] rounded-lg text-white space-y-3">
              <div className="border-b border-white/20 pb-3">
                <p className="text-xs md:text-sm opacity-90">Cachê Bruto</p>
                <p className="text-lg md:text-2xl font-bold">R$ {calculatorData.cacheBruto.toFixed(2).replace('.', ',')}</p>
              </div>
              
              <div className="border-b border-white/20 pb-3">
                <p className="text-xs md:text-sm opacity-90">IR Retido</p>
                <p className="text-2xl md:text-3xl font-bold">R$ {retencaoCalculada.toFixed(2).replace('.', ',')}</p>
              </div>

              <div>
                <p className="text-xs md:text-sm opacity-90">Você Recebe (Líquido)</p>
                <p className="text-lg md:text-2xl font-bold">R$ {liquido.toFixed(2).replace('.', ',')}</p>
              </div>
            </div>

            <div className="bg-[#E3F2FD] border-l-4 border-[#1B4965] p-4 rounded mt-4 text-xs md:text-sm">
              <p><strong>Nota:</strong> Este cálculo é apenas para fins educacionais. Sempre solicite o RPA ao pagador para confirmar o valor retido.</p>
            </div>
          </div>
      </div>

      {/* Tópico 5: Exemplos Práticos */}
      <div id="exemplos" style={{ scrollMarginTop: '2rem' }} className="border border-[#E8E3DC] rounded-lg overflow-hidden">
        <button
          onClick={() => toggleTopic('exemplos')}
          className="w-full px-4 md:px-6 py-4 bg-[#F9F7F4] hover:bg-[#F0EBE3] flex items-center justify-between transition"
        >
          <h4 className="font-semibold text-[#1B4965] text-sm md:text-base" style={{ fontFamily: 'Lexend, sans-serif' }}>
            📝 Exemplos Práticos
          </h4>
          {expandedTopics['exemplos'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        <div className={`px-4 md:px-6 py-4 space-y-6 ${expandedTopics['exemplos'] ? 'block' : 'hidden print:block'}`}>
            {exemplosRPA.map((exemplo, idx) => (
              <div key={idx} className="border border-[#E8E3DC] rounded-lg p-4 bg-[#F9F7F4]">
                <h5 className="font-semibold text-[#1B4965] mb-3">{exemplo.titulo}</h5>
                <div className="space-y-2 text-sm md:text-base">
                  <div className="flex justify-between">
                    <span>Cachê Bruto:</span>
                    <span className="font-semibold">R$ {exemplo.cacheBruto.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-[#E07856]">
                    <span>IR Retido:</span>
                    <span className="font-semibold">R$ {exemplo.retencao.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between border-t border-[#E8E3DC] pt-2">
                    <span className="font-semibold">Você Recebe:</span>
                    <span className="font-bold text-[#6BA587]">R$ {(exemplo.cacheBruto - exemplo.retencao).toFixed(2).replace('.', ',')}</span>
                  </div>
                  <p className="text-xs md:text-sm text-[#7F8C8D] mt-2">{exemplo.descricao}</p>
                </div>
              </div>
            ))}
          </div>
      </div>

      {/* Tópico 6: Compensação na Declaração */}
      <div id="compensacao" style={{ scrollMarginTop: '2rem' }} className="border border-[#E8E3DC] rounded-lg overflow-hidden">
        <button
          onClick={() => toggleTopic('compensacao')}
          className="w-full px-4 md:px-6 py-4 bg-[#F9F7F4] hover:bg-[#F0EBE3] flex items-center justify-between transition"
        >
          <h4 className="font-semibold text-[#1B4965] text-sm md:text-base" style={{ fontFamily: 'Lexend, sans-serif' }}>
            📋 Como Compensar na Declaração Anual
          </h4>
          {expandedTopics['compensacao'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        <div className={`px-4 md:px-6 py-4 space-y-4 text-sm md:text-base text-[#2C3E50] ${expandedTopics['compensacao'] ? 'block' : 'hidden print:block'}`}>
            <p>
              A retenção que você sofreu durante o ano é <strong>abatida do seu IR</strong> na declaração anual. Aqui está como funciona:
            </p>

            <h5 className="font-semibold text-[#1B4965]">Passo a Passo:</h5>
            <ol className="space-y-3 pl-4 list-decimal">
              <li>
                <strong>Colete todos os RPAs</strong>
                <p className="text-xs md:text-sm text-[#7F8C8D] mt-1">Reúna todos os recibos de cachês que recebeu no ano</p>
              </li>
              <li>
                <strong>Some as retenções</strong>
                <p className="text-xs md:text-sm text-[#7F8C8D] mt-1">Total de IR retido durante o ano (ex: R$ 2.500)</p>
              </li>
              <li>
                <strong>Preencha a declaração</strong>
                <p className="text-xs md:text-sm text-[#7F8C8D] mt-1">Na seção "Imposto Retido" ou "Deduções", informe o total retido</p>
              </li>
              <li>
                <strong>Calcule seu IR devido</strong>
                <p className="text-xs md:text-sm text-[#7F8C8D] mt-1">IR total - Retenções = Saldo a pagar (ou restituição)</p>
              </li>
            </ol>

            <div className="bg-[#E8F5E9] border-l-4 border-[#6BA587] p-4 rounded mt-4">
              <p className="font-semibold text-[#6BA587] mb-2">💡 Exemplo:</p>
              <p className="text-xs md:text-sm">
                Você ganhou R$ 30.000 no ano e teve R$ 2.500 retido. Seu IR total é R$ 2.800. Resultado: você deve R$ 300 (2.800 - 2.500).
              </p>
            </div>

            <h5 className="font-semibold text-[#1B4965] mt-4">Documentos Necessários:</h5>
            <ul className="space-y-2 pl-4">
              <li>✅ <strong>RPA Original:</strong> Solicitado pelo pagador</li>
              <li>✅ <strong>Cópia do RPA:</strong> Para seus registros</li>
              <li>✅ <strong>Extrato Bancário:</strong> Comprovando o depósito</li>
              <li>✅ <strong>Planilha:</strong> Resumo de todos os cachês e retenções</li>
            </ul>

            <div className="bg-[#FFF3CD] border-l-4 border-[#D4A574] p-4 rounded mt-4">
              <p className="font-semibold text-[#D4A574] mb-2">⚠️ Importante:</p>
              <p className="text-xs md:text-sm">Se o pagador não fez retenção quando deveria, você continua obrigado a declarar e pagar o IR. Sempre peça o RPA!</p>
            </div>
          </div>
      </div>

      {/* Tópico 7: Erros Comuns */}
      <div id="erros" style={{ scrollMarginTop: '2rem' }} className="border border-[#E8E3DC] rounded-lg overflow-hidden">
        <button
          onClick={() => toggleTopic('erros')}
          className="w-full px-4 md:px-6 py-4 bg-[#F9F7F4] hover:bg-[#F0EBE3] flex items-center justify-between transition"
        >
          <h4 className="font-semibold text-[#1B4965] text-sm md:text-base" style={{ fontFamily: 'Lexend, sans-serif' }}>
            ❌ Erros Comuns com RPA
          </h4>
          {expandedTopics['erros'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        <div className={`px-4 md:px-6 py-4 space-y-4 ${expandedTopics['erros'] ? 'block' : 'hidden print:block'}`}>
            <div className="space-y-3">
              {[
                {
                  erro: 'Não guardar os RPAs',
                  consequencia: 'Sem comprovação da retenção na declaração',
                  solucao: 'Guarde todos os RPAs por 5 anos'
                },
                {
                  erro: 'Não informar retenção na declaração',
                  consequencia: 'Paga mais imposto do que deveria',
                  solucao: 'Sempre informe as retenções na declaração'
                },
                {
                  erro: 'Confundir RPA com Carnê-Leão',
                  consequencia: 'Dupla tributação ou omissão',
                  solucao: 'RPA = retenção automática. Carnê-Leão = você paga'
                },
                {
                  erro: 'Aceitar cachê sem RPA',
                  consequencia: 'Sem comprovação de pagamento',
                  solucao: 'Sempre solicite RPA ou recibo como comprovante'
                },
                {
                  erro: 'Não verificar se retenção está correta',
                  consequencia: 'Pagador pode reter errado',
                  solucao: 'Confira o cálculo no RPA'
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
      </div>

      {/* Tópico 8: FAQ */}
      <div id="faq" style={{ scrollMarginTop: '2rem' }} className="border border-[#E8E3DC] rounded-lg overflow-hidden">
        <button
          onClick={() => toggleTopic('faq')}
          className="w-full px-4 md:px-6 py-4 bg-[#F9F7F4] hover:bg-[#F0EBE3] flex items-center justify-between transition"
        >
          <h4 className="font-semibold text-[#1B4965] text-sm md:text-base" style={{ fontFamily: 'Lexend, sans-serif' }}>
            ❓ Perguntas Frequentes
          </h4>
          {expandedTopics['faq'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        <div className={`px-4 md:px-6 py-4 space-y-4 ${expandedTopics['faq'] ? 'block' : 'hidden print:block'}`}>
            <div className="space-y-3">
              {[
                {
                  pergunta: 'Se tive retenção, preciso preencher Carnê-Leão?',
                  resposta: 'Não necessariamente. Se o pagador fez a retenção corretamente, você pode não precisar preencher Carnê-Leão. Mas se tiver outras rendas, sim.'
                },
                {
                  pergunta: 'Posso pedir ao pagador para não fazer retenção?',
                  resposta: 'Não. A retenção é obrigatória por lei. O pagador é obrigado a fazer. Você não pode negociar isso.'
                },
                {
                  pergunta: 'Se pagador não fez retenção, o que faço?',
                  resposta: 'Você continua obrigado a declarar e pagar o IR. Exija o RPA ou recibo como comprovante. Se não receber, denuncie à Receita Federal.'
                },
                {
                  pergunta: 'RPA é válido como comprovante de renda?',
                  resposta: 'Sim! RPA é documento oficial que comprova renda. Vale para empréstimos, financiamentos, etc.'
                },
                {
                  pergunta: 'Quanto tempo guardo os RPAs?',
                  resposta: 'Guarde por 5 anos. A Receita pode fazer fiscalização até 5 anos após o ano-calendário.'
                },
              ].map((item, idx) => (
                <div key={idx} className="border border-[#E8E3DC] rounded-lg p-3 md:p-4">
                  <p className="font-semibold text-[#1B4965] text-sm md:text-base mb-2">❓ {item.pergunta}</p>
                  <p className="text-xs md:text-sm text-[#2C3E50]">{item.resposta}</p>
                </div>
              ))}
            </div>
          </div>
      </div>

      {/* Resumo Final */}
      <div className="bg-[#FFF3CD] border-l-4 border-[#D4A574] rounded-lg p-4 md:p-6 space-y-3">
        <h4 className="font-semibold text-[#D4A574] text-base md:text-lg">✅ Resumo: RPA em 5 Pontos</h4>
        <ol className="space-y-2 pl-4 list-decimal text-sm md:text-base text-[#2C3E50]">
          <li><strong>RPA é retenção automática</strong> quando você recebe cachê de empresa</li>
          <li><strong>Sempre peça o RPA</strong> como comprovante de pagamento</li>
          <li><strong>Guarde por 5 anos</strong> para possível fiscalização</li>
          <li><strong>Informe na declaração</strong> para compensar o IR retido</li>
          <li><strong>Consulte contador</strong> se tiver dúvidas sobre compensação</li>
        </ol>
      </div>

      <PromoCardApp chapterName="rpa" />
    </div>
  );
}
