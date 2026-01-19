import { useState } from 'react';
import { Calculator, CheckCircle2, AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';

export default function ConsultoriaRapida() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    rendaMensal: '',
    despesasDedutiveis: '',
    temDependentes: false,
    numDependentes: 0,
  });
  const [resultado, setResultado] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calcularRecomendacao = () => {
    const renda = parseFloat(formData.rendaMensal) || 0;
    const despesas = parseFloat(formData.despesasDedutiveis) || 0;
    const dependentes = formData.temDependentes ? (formData.numDependentes || 0) : 0;
    
    // Dedução por dependente (valor aproximado 2026)
    const deducaoDependente = 189.59 * dependentes;
    
    // Cálculo PF (Carnê-Leão)
    const baseCalculoPF = renda - despesas - deducaoDependente;
    let impostoPF = 0;
    
    // Tabela 2026 (Isenção 5k)
    if (baseCalculoPF <= 5000) impostoPF = 0;
    else if (baseCalculoPF <= 7500) impostoPF = (baseCalculoPF * 0.075) - 375;
    else if (baseCalculoPF <= 10000) impostoPF = (baseCalculoPF * 0.15) - 937.50;
    else if (baseCalculoPF <= 12500) impostoPF = (baseCalculoPF * 0.225) - 1687.50;
    else impostoPF = (baseCalculoPF * 0.275) - 2312.50;
    
    // INSS Autônomo (11% sobre salário mínimo ou 20% sobre renda - simplificado 11% s.m. para comparação)
    const inssPF = 1518 * 0.11; // Salário mínimo est. 2025/26
    const custoTotalPF = impostoPF + inssPF;

    // Cálculo MEI (se elegível)
    const limiteMEI = 81000 / 12; // 6750 mensal
    const custoMEI = 75; // DAS aproximado
    const elegivelMEI = renda <= limiteMEI;

    // Cálculo Simples Nacional (Anexo III - 6%)
    const impostoPJ = renda * 0.06;
    const inssPJ = 1518 * 0.11; // Pro-labore mínimo
    const contador = 300; // Custo médio contador online
    const custoTotalPJ = impostoPJ + inssPJ + contador;

    let recomendacao = '';
    let economia = 0;
    let detalhes = '';

    if (elegivelMEI && renda <= 6750) {
      recomendacao = 'MEI (Microempreendedor Individual)';
      economia = custoTotalPF - custoMEI;
      detalhes = 'Sua renda permite ser MEI. É a opção mais barata e burocracia zero.';
    } else if (custoTotalPF < custoTotalPJ) {
      recomendacao = 'Pessoa Física (Carnê-Leão)';
      economia = custoTotalPJ - custoTotalPF;
      detalhes = 'Com a nova isenção de R$ 5.000,00, manter-se como Pessoa Física é mais vantajoso que abrir empresa para sua faixa de renda.';
    } else {
      recomendacao = 'Abrir Empresa (Simples Nacional)';
      economia = custoTotalPF - custoTotalPJ;
      detalhes = 'Sua renda já justifica abrir uma empresa (PJ). A economia de impostos pagará o contador e sobrará dinheiro.';
    }

    setResultado({
      recomendacao,
      economia: Math.max(0, economia),
      detalhes,
      custoPF: custoTotalPF,
      custoPJ: custoTotalPJ,
      custoMEI: elegivelMEI ? custoMEI : null
    });
    setStep(2);
  };

  const reset = () => {
    setStep(1);
    setFormData({
      rendaMensal: '',
      despesasDedutiveis: '',
      temDependentes: false,
      numDependentes: 0,
    });
    setResultado(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-[#E8E3DC]">
      <div className="bg-gradient-to-r from-[#1B4965] to-[#2C5F7F] p-6 text-white">
        <h3 className="text-xl font-bold flex items-center gap-2" style={{ fontFamily: 'Lexend, sans-serif' }}>
          <Calculator size={24} className="text-[#E07856]" />
          Consultoria Fiscal Automática
        </h3>
        <p className="text-sm opacity-90 mt-2">
          Descubra em segundos qual o melhor regime para você (PF, MEI ou Empresa) com base na nova tabela 2026.
        </p>
      </div>

      <div className="p-6">
        {step === 1 ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#1B4965] mb-2">
                Qual sua renda média mensal? (R$)
              </label>
              <input
                type="number"
                name="rendaMensal"
                value={formData.rendaMensal}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-[#E8E3DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4965] text-lg"
                placeholder="Ex: 6000"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1B4965] mb-2">
                Tem despesas dedutíveis mensais? (R$)
                <span className="text-xs font-normal text-[#7F8C8D] block">(Aluguel de estúdio, instrumentos, cursos, etc.)</span>
              </label>
              <input
                type="number"
                name="despesasDedutiveis"
                value={formData.despesasDedutiveis}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-[#E8E3DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4965]"
                placeholder="Ex: 500"
              />
            </div>

            <button
              onClick={calcularRecomendacao}
              disabled={!formData.rendaMensal}
              className="w-full bg-[#E07856] hover:bg-[#D66A49] text-white font-bold py-4 rounded-lg transition flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Ver Recomendação Grátis
              <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <p className="text-sm text-[#7F8C8D] uppercase tracking-wide font-semibold">Melhor opção para você:</p>
              <h2 className="text-3xl font-bold text-[#1B4965]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                {resultado.recomendacao}
              </h2>
            </div>

            <div className="bg-[#E8F5E9] border border-[#6BA587] rounded-lg p-4 flex items-start gap-3">
              <CheckCircle2 size={24} className="text-[#6BA587] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-[#2C3E50]">Por que essa escolha?</h4>
                <p className="text-sm text-[#2C3E50] mt-1">{resultado.detalhes}</p>
              </div>
            </div>

            {resultado.economia > 0 && (
              <div className="bg-[#FFF3CD] border border-[#D4A574] rounded-lg p-4 text-center">
                <p className="text-sm text-[#D4A574] font-semibold uppercase">Economia Estimada</p>
                <p className="text-2xl font-bold text-[#D4A574]">
                  R$ {resultado.economia.toFixed(2)} <span className="text-sm font-normal text-[#2C3E50]">/mês</span>
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-[#F9F7F4] p-3 rounded-lg">
                <p className="text-[#7F8C8D]">Custo como PF</p>
                <p className="font-bold text-[#2C3E50]">R$ {resultado.custoPF.toFixed(2)}</p>
              </div>
              <div className="bg-[#F9F7F4] p-3 rounded-lg">
                <p className="text-[#7F8C8D]">Custo como PJ</p>
                <p className="font-bold text-[#2C3E50]">R$ {resultado.custoPJ.toFixed(2)}</p>
              </div>
            </div>

            <button
              onClick={reset}
              className="w-full border border-[#1B4965] text-[#1B4965] hover:bg-[#F5F2ED] font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} />
              Fazer Nova Simulação
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
