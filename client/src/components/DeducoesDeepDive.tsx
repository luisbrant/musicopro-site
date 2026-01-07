import { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle2, X } from 'lucide-react';

export default function DeducoesDeepDive() {
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [deducoes, setDeducoes] = useState({
    combustivel: 0,
    material: 0,
    aluguelEstudio: 0,
    equipamentos: 0,
    internet: 0,
    telefone: 0,
    transporte: 0,
    manutencao: 0,
    cursos: 0,
  });

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topic]: !prev[topic]
    }));
  };

  const totalDeducoes = Object.values(deducoes).reduce((a, b) => a + b, 0);

  const deducoesPermitidas = [
    {
      categoria: 'Transporte e Combustível',
      itens: [
        { nome: 'Combustível para ir a shows', permitido: true },
        { nome: 'Uber/táxi para apresentações', permitido: true },
        { nome: 'Estacionamento em eventos', permitido: true },
        { nome: 'Combustível uso pessoal', permitido: false },
      ]
    },
    {
      categoria: 'Material e Equipamento',
      itens: [
        { nome: 'Cordas de instrumentos', permitido: true },
        { nome: 'Palhetas e acessórios', permitido: true },
        { nome: 'Cabos e conectores', permitido: true },
        { nome: 'Equipamentos de áudio/gravação', permitido: true },
        { nome: 'Computador pessoal', permitido: false },
      ]
    },
    {
      categoria: 'Espaço de Trabalho',
      itens: [
        { nome: 'Aluguel de estúdio/sala de ensaio', permitido: true },
        { nome: 'Aluguel de sala para aulas', permitido: true },
        { nome: 'Aluguel de espaço para gravação', permitido: true },
        { nome: 'Aluguel de casa (uso pessoal)', permitido: false },
      ]
    },
    {
      categoria: 'Comunicação',
      itens: [
        { nome: 'Internet (% profissional)', permitido: true },
        { nome: 'Telefone (% profissional)', permitido: true },
        { nome: 'Email marketing', permitido: true },
        { nome: 'Internet uso pessoal 100%', permitido: false },
      ]
    },
    {
      categoria: 'Profissional e Educação',
      itens: [
        { nome: 'Cursos de música/produção', permitido: true },
        { nome: 'Workshops e seminários', permitido: true },
        { nome: 'Livros técnicos', permitido: true },
        { nome: 'Consultoria com produtor', permitido: true },
      ]
    },
    {
      categoria: 'Manutenção',
      itens: [
        { nome: 'Reparo de instrumento', permitido: true },
        { nome: 'Manutenção de equipamento', permitido: true },
        { nome: 'Limpeza de estúdio', permitido: true },
        { nome: 'Seguro de instrumento', permitido: true },
      ]
    },
  ];

  const exemplosDeducoes = [
    {
      titulo: 'Exemplo 1: Músico com Renda Baixa',
      renda: 2500,
      deducoes: {
        combustivel: 150,
        material: 100,
        aluguelEstudio: 0,
        equipamentos: 0,
        internet: 30,
        telefone: 0,
        transporte: 50,
        manutencao: 0,
        cursos: 0,
      }
    },
    {
      titulo: 'Exemplo 2: Professor de Música',
      renda: 4500,
      deducoes: {
        combustivel: 200,
        material: 150,
        aluguelEstudio: 800,
        equipamentos: 100,
        internet: 50,
        telefone: 40,
        transporte: 100,
        manutencao: 50,
        cursos: 100,
      }
    },
    {
      titulo: 'Exemplo 3: Produtor Musical',
      renda: 8000,
      deducoes: {
        combustivel: 300,
        material: 300,
        aluguelEstudio: 2000,
        equipamentos: 500,
        internet: 100,
        telefone: 80,
        transporte: 200,
        manutencao: 200,
        cursos: 300,
      }
    },
  ];

  return (
    <div className="space-y-6">
      {/* Introdução */}
      <div className="bg-gradient-to-br from-[#6BA587] to-[#5A9470] rounded-lg p-4 md:p-6 text-white space-y-3">
        <h3 className="text-xl md:text-2xl font-bold" style={{ fontFamily: 'Lexend, sans-serif' }}>
          💰 Deduções Fiscais: Maximize Sua Economia
        </h3>
        <p className="text-sm md:text-base opacity-90">
          Aprenda quais despesas você pode deduzir, como comprovar e quanto economizar em impostos. Com exemplos práticos e calculadora interativa.
        </p>
      </div>

      {/* Tópico 1: O que é Dedução */}
      <div className="border border-[#E8E3DC] rounded-lg overflow-hidden">
        <button
          onClick={() => toggleTopic('oQueE')}
          className="w-full px-4 md:px-6 py-4 bg-[#F9F7F4] hover:bg-[#F0EBE3] flex items-center justify-between transition"
        >
          <h4 className="font-semibold text-[#1B4965] text-sm md:text-base" style={{ fontFamily: 'Lexend, sans-serif' }}>
            📖 O que é Dedução Fiscal?
          </h4>
          {expandedTopics['oQueE'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedTopics['oQueE'] && (
          <div className="px-4 md:px-6 py-4 space-y-4 text-sm md:text-base text-[#2C3E50]">
            <p>
              <strong>Dedução fiscal</strong> é uma despesa que você teve para exercer sua profissão e que pode ser descontada da sua renda para calcular o imposto. Quanto maior a dedução, menor o imposto que você paga.
            </p>
            
            <div className="bg-[#E8F5E9] border-l-4 border-[#6BA587] p-4 rounded">
              <p className="font-semibold text-[#6BA587] mb-2">💡 Exemplo Simples:</p>
              <p>Se você ganhou R$ 5.000 e teve despesas de R$ 1.000, sua base de cálculo é R$ 4.000 (não R$ 5.000). Isso reduz seu imposto!</p>
            </div>

            <h5 className="font-semibold text-[#1B4965] mt-4">Regra de Ouro:</h5>
            <p className="bg-[#FFF3CD] border-l-4 border-[#D4A574] p-4 rounded">
              <strong>Dedução válida = Despesa necessária + Comprovação</strong>
            </p>
            <p>Sem comprovação (nota fiscal, recibo), a Receita Federal pode rejeitar a dedução e aplicar multa.</p>
          </div>
        )}
      </div>

      {/* Tópico 2: Deduções Permitidas vs Proibidas */}
      <div className="border border-[#E8E3DC] rounded-lg overflow-hidden">
        <button
          onClick={() => toggleTopic('permitidas')}
          className="w-full px-4 md:px-6 py-4 bg-[#F9F7F4] hover:bg-[#F0EBE3] flex items-center justify-between transition"
        >
          <h4 className="font-semibold text-[#1B4965] text-sm md:text-base" style={{ fontFamily: 'Lexend, sans-serif' }}>
            ✅ Deduções Permitidas vs Proibidas
          </h4>
          {expandedTopics['permitidas'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedTopics['permitidas'] && (
          <div className="px-4 md:px-6 py-4 space-y-4">
            {deducoesPermitidas.map((categoria, idx) => (
              <div key={idx} className="border border-[#E8E3DC] rounded-lg p-4">
                <h5 className="font-semibold text-[#1B4965] mb-3">{categoria.categoria}</h5>
                <div className="space-y-2">
                  {categoria.itens.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-3 text-sm md:text-base">
                      {item.permitido ? (
                        <>
                          <CheckCircle2 size={20} className="text-[#6BA587] flex-shrink-0 mt-0.5" />
                          <span className="text-[#2C3E50]">{item.nome}</span>
                        </>
                      ) : (
                        <>
                          <X size={20} className="text-[#E07856] flex-shrink-0 mt-0.5" />
                          <span className="text-[#7F8C8D] line-through">{item.nome}</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-[#FFF3CD] border-l-4 border-[#D4A574] p-4 rounded mt-4">
              <p className="font-semibold text-[#D4A574] mb-2">⚠️ Regra Importante:</p>
              <p className="text-sm md:text-base">A despesa deve estar <strong>diretamente relacionada</strong> à sua atividade profissional. Despesas pessoais (alimentação, moradia 100%, diversão) NÃO são dedutíveis.</p>
            </div>
          </div>
        )}
      </div>

      {/* Tópico 3: Comprovação */}
      <div className="border border-[#E8E3DC] rounded-lg overflow-hidden">
        <button
          onClick={() => toggleTopic('comprovacao')}
          className="w-full px-4 md:px-6 py-4 bg-[#F9F7F4] hover:bg-[#F0EBE3] flex items-center justify-between transition"
        >
          <h4 className="font-semibold text-[#1B4965] text-sm md:text-base" style={{ fontFamily: 'Lexend, sans-serif' }}>
            📋 Como Comprovar Deduções
          </h4>
          {expandedTopics['comprovacao'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedTopics['comprovacao'] && (
          <div className="px-4 md:px-6 py-4 space-y-4 text-sm md:text-base text-[#2C3E50]">
            <h5 className="font-semibold text-[#1B4965]">Documentos que Comprovam:</h5>
            <ul className="space-y-2 pl-4">
              <li>✅ <strong>Nota Fiscal</strong> - Melhor comprovação (com CNPJ do fornecedor)</li>
              <li>✅ <strong>Recibo</strong> - Válido para profissionais autônomos</li>
              <li>✅ <strong>Extrato Bancário</strong> - Mostra transferência/pagamento</li>
              <li>✅ <strong>Cupom Fiscal</strong> - Vale para pequenas compras</li>
              <li>✅ <strong>Contrato</strong> - Para aluguel de estúdio, aulas, etc.</li>
            </ul>

            <h5 className="font-semibold text-[#1B4965] mt-4">Prazo de Guarda:</h5>
            <div className="bg-[#E3F2FD] border-l-4 border-[#1B4965] p-4 rounded">
              <p><strong>Guarde por 5 anos!</strong></p>
              <p className="text-xs md:text-sm mt-2">A Receita Federal pode fazer fiscalização até 5 anos após o ano-calendário. Se não tiver comprovação, pode sofrer multa.</p>
            </div>

            <h5 className="font-semibold text-[#1B4965] mt-4">Organização Recomendada:</h5>
            <div className="bg-[#F9F7F4] p-4 rounded space-y-2 text-xs md:text-sm">
              <p>📁 <strong>Pasta por Mês:</strong> Janeiro, Fevereiro, etc.</p>
              <p>📁 <strong>Subpasta por Categoria:</strong> Combustível, Material, Aluguel, etc.</p>
              <p>📊 <strong>Planilha Excel:</strong> Data, Descrição, Valor, Categoria</p>
              <p>📸 <strong>Fotos:</strong> Fotografe os recibos para backup digital</p>
            </div>
          </div>
        )}
      </div>

      {/* Tópico 4: Calculadora de Economia */}
      <div className="border border-[#E8E3DC] rounded-lg overflow-hidden">
        <button
          onClick={() => toggleTopic('calculadora')}
          className="w-full px-4 md:px-6 py-4 bg-[#F9F7F4] hover:bg-[#F0EBE3] flex items-center justify-between transition"
        >
          <h4 className="font-semibold text-[#1B4965] text-sm md:text-base" style={{ fontFamily: 'Lexend, sans-serif' }}>
            💻 Calculadora de Economia
          </h4>
          {expandedTopics['calculadora'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedTopics['calculadora'] && (
          <div className="px-4 md:px-6 py-4 space-y-4">
            <p className="text-sm md:text-base text-[#2C3E50]">
              Preencha suas despesas mensais para ver quanto você economiza em impostos:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { key: 'combustivel', label: 'Combustível (R$)', icon: '⛽' },
                { key: 'material', label: 'Material/Acessórios (R$)', icon: '🎸' },
                { key: 'aluguelEstudio', label: 'Aluguel Estúdio (R$)', icon: '🏠' },
                { key: 'equipamentos', label: 'Equipamentos (R$)', icon: '🎙️' },
                { key: 'internet', label: 'Internet % Prof. (R$)', icon: '📡' },
                { key: 'telefone', label: 'Telefone % Prof. (R$)', icon: '📱' },
                { key: 'transporte', label: 'Transporte (R$)', icon: '🚗' },
                { key: 'manutencao', label: 'Manutenção (R$)', icon: '🔧' },
                { key: 'cursos', label: 'Cursos/Educação (R$)', icon: '📚' },
              ].map((item) => (
                <div key={item.key}>
                  <label className="block text-xs md:text-sm font-semibold text-[#1B4965] mb-1">
                    {item.icon} {item.label}
                  </label>
                  <input
                    type="number"
                    value={deducoes[item.key as keyof typeof deducoes]}
                    onChange={(e) => setDeducoes({...deducoes, [item.key]: parseFloat(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-[#E8E3DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6BA587] text-sm"
                    placeholder="0"
                  />
                </div>
              ))}
            </div>

            {/* Resultado */}
            <div className="mt-6 p-4 bg-gradient-to-br from-[#6BA587] to-[#5A9470] rounded-lg text-white space-y-3">
              <div className="border-b border-white/20 pb-3">
                <p className="text-xs md:text-sm opacity-90">Total de Deduções Mensais</p>
                <p className="text-2xl md:text-3xl font-bold">R$ {totalDeducoes.toFixed(2).replace('.', ',')}</p>
              </div>
              
              <div>
                <p className="text-xs md:text-sm opacity-90">Economia Anual Estimada*</p>
                <p className="text-xl md:text-2xl font-bold">R$ {(totalDeducoes * 12 * 0.15).toFixed(2).replace('.', ',')}</p>
                <p className="text-xs opacity-75 mt-1">*Considerando alíquota média de 15%</p>
              </div>
            </div>

            <div className="bg-[#E3F2FD] border-l-4 border-[#1B4965] p-4 rounded text-xs md:text-sm">
              <p><strong>Nota:</strong> Este cálculo é apenas ilustrativo. A economia real depende de sua alíquota de IR, que varia conforme sua renda total.</p>
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
            📝 Exemplos de Deduções por Perfil
          </h4>
          {expandedTopics['exemplos'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedTopics['exemplos'] && (
          <div className="px-4 md:px-6 py-4 space-y-6">
            {exemplosDeducoes.map((exemplo, idx) => {
              const totalEx = Object.values(exemplo.deducoes).reduce((a, b) => a + b, 0);
              return (
                <div key={idx} className="border border-[#E8E3DC] rounded-lg p-4 bg-[#F9F7F4]">
                  <h5 className="font-semibold text-[#1B4965] mb-3">{exemplo.titulo}</h5>
                  <div className="space-y-2 text-xs md:text-sm mb-4">
                    {Object.entries(exemplo.deducoes).map(([key, value]) => (
                      value > 0 && (
                        <div key={key} className="flex justify-between">
                          <span className="text-[#2C3E50]">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                          <span className="font-semibold text-[#1B4965]">R$ {value.toFixed(2).replace('.', ',')}</span>
                        </div>
                      )
                    ))}
                  </div>
                  <div className="bg-white p-3 rounded border-l-4 border-[#6BA587]">
                    <p className="text-xs md:text-sm text-[#2C3E50]">
                      <strong>Renda:</strong> R$ {exemplo.renda.toFixed(2).replace('.', ',')} | 
                      <strong className="ml-2">Deduções:</strong> R$ {totalEx.toFixed(2).replace('.', ',')} | 
                      <strong className="ml-2">Base de Cálculo:</strong> R$ {(exemplo.renda - totalEx).toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Tópico 6: Erros Comuns */}
      <div className="border border-[#E8E3DC] rounded-lg overflow-hidden">
        <button
          onClick={() => toggleTopic('erros')}
          className="w-full px-4 md:px-6 py-4 bg-[#F9F7F4] hover:bg-[#F0EBE3] flex items-center justify-between transition"
        >
          <h4 className="font-semibold text-[#1B4965] text-sm md:text-base" style={{ fontFamily: 'Lexend, sans-serif' }}>
            ❌ Erros Comuns com Deduções
          </h4>
          {expandedTopics['erros'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedTopics['erros'] && (
          <div className="px-4 md:px-6 py-4 space-y-4">
            <div className="space-y-3">
              {[
                {
                  erro: 'Deduzir sem comprovação',
                  consequencia: 'Receita rejeita e aplica multa',
                  solucao: 'Sempre guarde nota fiscal ou recibo'
                },
                {
                  erro: 'Deduzir 100% de despesa compartilhada',
                  consequencia: 'Autuação por dedução indevida',
                  solucao: 'Deduza apenas a % profissional (ex: 50% internet)'
                },
                {
                  erro: 'Não guardar documentos',
                  consequencia: 'Não consegue comprovar em fiscalização',
                  solucao: 'Organize e guarde por 5 anos'
                },
                {
                  erro: 'Deduzir despesa pessoal como profissional',
                  consequencia: 'Multa por fraude fiscal',
                  solucao: 'Separe bem despesas pessoais de profissionais'
                },
                {
                  erro: 'Não atualizar valores anualmente',
                  consequencia: 'Perde economia potencial',
                  solucao: 'Revise e atualize deduções todo ano'
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

      {/* Resumo Final */}
      <div className="bg-[#E8F5E9] border-l-4 border-[#6BA587] rounded-lg p-4 md:p-6 space-y-3">
        <h4 className="font-semibold text-[#6BA587] text-base md:text-lg">✅ Resumo: Deduções em 5 Pontos</h4>
        <ol className="space-y-2 pl-4 list-decimal text-sm md:text-base text-[#2C3E50]">
          <li><strong>Deduza despesas profissionais</strong> comprovadas com documentos</li>
          <li><strong>Guarde comprovantes</strong> por 5 anos (nota fiscal, recibo, contrato)</li>
          <li><strong>Separe bem</strong> despesas pessoais de profissionais</li>
          <li><strong>Organize mensalmente</strong> para não perder nada</li>
          <li><strong>Consulte contador</strong> para situações complexas</li>
        </ol>
      </div>
    </div>
  );
}
