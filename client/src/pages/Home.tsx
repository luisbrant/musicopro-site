import { useState } from 'react';
import { ShieldCheck, ArrowRight, TrendingDown, PiggyBank, FileText, Music, Info, CheckCircle, Minus, Plus } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import Footer from '@/components/Footer';

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const { trackBuyClick } = useAnalytics();

  const faqs = [
    { question: "Preciso de contador?", answer: "O sistema organiza seus dados e facilita sua rotina fiscal. Para orientação formal, consulte contador registrado." },
    { question: "Funciona no celular?", answer: "Sim. Totalmente adaptado para uso no navegador." },
    { question: "É seguro?", answer: "Seus dados ficam armazenados localmente no dispositivo." },
    { question: "Posso cancelar?", answer: "Sim. Cancelamento simples." }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollToPlan = () => {
    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#0c2461] selection:bg-[#d4af37] selection:text-[#0c2461]">

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-[#E8E3DC] shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <Music className="w-6 h-6 text-[#d4af37]" />
            <div>
              <h1 className="font-bold text-lg leading-none tracking-tight" style={{ fontFamily: 'Lexend, sans-serif' }}>
                Músico Pro
              </h1>
            </div>
          </div>

          <button onClick={() => { trackBuyClick(); scrollToPlan(); }} className="bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold px-4 py-2 rounded-lg transition shadow flex items-center gap-2 text-sm">
            Assinar PRO
          </button>
        </div>
      </header>

      <main className="pb-16">

        {/* HERO */}
        <section className="bg-white pt-24 pb-20 px-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>

          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#0c2461] tracking-tight">
              Você já é profissional no palco.<br />
              <span className="text-[#d4af37] underline decoration-[#0c2461]">Agora organize sua carreira como um.</span>
            </h1>

            <p className="text-xl opacity-80 max-w-2xl mx-auto font-medium leading-relaxed">
              Controle receitas, registre despesas, apure seu Carnê-Leão e gere documentos profissionais em um único sistema.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-lg font-bold text-red-700/80 mb-8 pt-4">
              <span>Sem planilhas improvisadas.</span>
              <span className="hidden md:inline">•</span>
              <span>Sem confusão tributária.</span>
              <span className="hidden md:inline">•</span>
              <span>Sem medo da Receita.</span>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => window.location.href = '/app'}
                className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-black px-8 py-5 rounded-xl transition text-xl shadow-[0_0_40px_rgba(212,175,55,0.5)] flex items-center justify-center gap-3 w-full sm:w-auto transform hover:scale-105"
              >
                Quero organizar minha carreira
              </button>
            </div>

            <p className="mt-4 text-sm font-bold text-gray-500 flex items-center justify-center gap-2">
              Teste gratuito disponível
            </p>
            <p className="text-sm font-bold text-green-700 flex items-center justify-center gap-1">
              <ShieldCheck size={16} /> Acesso imediato no PRO • Garantia de 7 dias
            </p>
          </div>
        </section>

        {/* A VERDADE QUE NINGUÉM FALA */}
        <section className="py-20 px-4 max-w-3xl mx-auto border-t border-[#E8E3DC]">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">A Verdade Que Quase Ninguém Fala</h2>
            <p className="text-lg opacity-80">Ser músico autônomo no Brasil exige mais do que talento.</p>
          </div>

          <div className="bg-[#fff0f0] p-8 rounded-2xl border border-red-100 mb-12">
            <p className="font-bold text-xl mb-4 text-[#0c2461]">Você precisa:</p>
            <ul className="space-y-3 font-semibold text-lg text-red-900/90 mb-8">
              <li className="flex items-center gap-3"><CheckCircle className="text-red-500" size={20} /> Receber como pessoa física</li>
              <li className="flex items-center gap-3"><CheckCircle className="text-red-500" size={20} /> Pagar imposto mensal</li>
              <li className="flex items-center gap-3"><CheckCircle className="text-red-500" size={20} /> Emitir recibos</li>
              <li className="flex items-center gap-3"><CheckCircle className="text-red-500" size={20} /> Comprovar renda</li>
              <li className="flex items-center gap-3"><CheckCircle className="text-red-500" size={20} /> Organizar despesas</li>
            </ul>
            <p className="font-bold text-lg text-[#0c2461]">
              E fazer tudo isso sem estrutura é o que transforma uma carreira promissora em dor de cabeça constante.
            </p>
            <p className="font-bold text-xl mt-6 text-[#0c2461] text-center border-t border-red-200 pt-6">
              Não é falta de capacidade. <br /><span className="text-red-600">É falta de sistema.</span>
            </p>
          </div>
        </section>

        {/* PROFISSIONALISMO NÃO É SÓ MUSICAL */}
        <section className="bg-slate-100 py-24 px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Profissionalismo Não É Só Musical</h2>
              <p className="text-lg opacity-80">Quando você não organiza suas finanças:</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
              {[
                "O imposto é calculado sobre o valor bruto.",
                "Despesas reais deixam de ser abatidas.",
                "O Carnê-Leão vira urgência de última hora.",
                "Multas e juros aparecem silenciosamente.",
                "Sua imagem profissional enfraquece."
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-start gap-4">
                  <Minus className="text-red-500 shrink-0 mt-1" />
                  <span className="font-semibold text-lg">{item}</span>
                </div>
              ))}
            </div>

            <div className="text-center bg-[#0c2461] text-white p-10 rounded-3xl max-w-3xl mx-auto shadow-xl">
              <p className="text-2xl md:text-3xl font-bold leading-relaxed">
                "Você trabalha como empresa.<br /> Mas se organiza como pessoa física comum."
              </p>
              <p className="text-[#d4af37] font-black text-2xl mt-6 uppercase tracking-wider">Isso precisa mudar.</p>
            </div>
          </div>
        </section>

        {/* O QUE O MÚSICO PRO FAZ */}
        <section className="py-24 px-4 max-w-5xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0c2461]">O Que o Músico Pro Faz Por Você</h2>
            <p className="text-2xl font-bold text-gray-500">Ele não promete milagre. <span className="text-[#d4af37] underline">Ele entrega estrutura.</span></p>
          </div>

          <div className="space-y-12">

            {/* Benefício 1 */}
            <div className="flex flex-col md:flex-row gap-10 items-center bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
              <div className="bg-blue-50 p-6 rounded-full">
                <TrendingDown className="w-16 h-16 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-4">Visão real do seu lucro</h3>
                <p className="text-lg opacity-80 mb-6">Você passa a enxergar:</p>
                <ul className="grid grid-cols-2 gap-4 font-semibold text-gray-700 mb-6">
                  <li className="flex items-center gap-2"><CheckCircle className="text-green-500" size={20} /> Receita total</li>
                  <li className="flex items-center gap-2"><CheckCircle className="text-green-500" size={20} /> Custos da atividade</li>
                  <li className="flex items-center gap-2"><CheckCircle className="text-green-500" size={20} /> Resultado líquido</li>
                  <li className="flex items-center gap-2"><CheckCircle className="text-green-500" size={20} /> Base real de imposto</li>
                </ul>
                <p className="text-xl font-bold text-blue-900 bg-blue-50 p-4 rounded-xl inline-block mt-2">Você para de confundir faturamento com lucro.</p>
              </div>
            </div>

            {/* Benefício 2 */}
            <div className="flex flex-col md:flex-row gap-10 items-center bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
              <div className="bg-amber-50 p-6 rounded-full md:order-2">
                <PiggyBank className="w-16 h-16 text-amber-600" />
              </div>
              <div className="flex-1 md:order-1">
                <h3 className="text-3xl font-bold mb-4">Carnê-Leão organizado, sem improviso</h3>
                <ul className="space-y-3 font-semibold text-gray-700 mb-6">
                  <li className="flex items-center gap-3"><ArrowRight className="text-amber-500" size={20} /> Separação automática de receitas PF</li>
                  <li className="flex items-center gap-3"><ArrowRight className="text-amber-500" size={20} /> Identificação de despesas dedutíveis</li>
                  <li className="flex items-center gap-3"><ArrowRight className="text-amber-500" size={20} /> Apuração mensal estruturada</li>
                  <li className="flex items-center gap-3"><ArrowRight className="text-amber-500" size={20} /> Exportação pronta para o portal da Receita</li>
                </ul>
                <p className="text-xl font-bold text-amber-900 bg-amber-50 p-4 rounded-xl inline-block mt-2">Você não calcula no susto. Você confirma com clareza.</p>
              </div>
            </div>

            {/* Benefício 3 */}
            <div className="flex flex-col md:flex-row gap-10 items-center bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
              <div className="bg-purple-50 p-6 rounded-full">
                <FileText className="w-16 h-16 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-4">Documentos que passam autoridade</h3>
                <p className="text-lg font-semibold text-gray-700 space-y-2 mb-6 flex flex-col">
                  <span>Recibos profissionais em PDF.</span>
                  <span>Orçamentos organizados.</span>
                  <span>Contratos estruturados.</span>
                </p>
                <p className="text-xl font-bold text-purple-900 bg-purple-50 p-4 rounded-xl inline-block mt-2">Seu cliente percebe organização antes mesmo do show começar.</p>
              </div>
            </div>

          </div>
        </section>

        {/* CONTROLE É PODER & ACADEMY */}
        <section className="bg-[#0c2461] text-white py-24 px-4 overflow-hidden relative">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 relative z-10">

            {/* Controle */}
            <div className="space-y-6">
              <ShieldCheck className="w-12 h-12 text-[#d4af37]" />
              <h2 className="text-3xl font-bold">Controle é Poder</h2>
              <p className="text-xl opacity-90 font-medium pb-4">Seus dados ficam armazenados no seu dispositivo.</p>
              <ul className="space-y-3 opacity-80 text-lg">
                <li>• Sem exposição desnecessária.</li>
                <li>• Sem depender de sistemas complexos.</li>
              </ul>
              <p className="text-xl font-bold text-[#d4af37] pt-4">Você no controle da sua própria gestão.</p>
            </div>

            {/* Academy */}
            <div className="space-y-6">
              <Info className="w-12 h-12 text-[#d4af37]" />
              <h2 className="text-3xl font-bold">Evolução Profissional</h2>
              <p className="text-lg opacity-90">Ao se tornar PRO, você recebe acesso à:</p>
              <div className="bg-white/10 p-5 rounded-xl border border-white/20">
                <h4 className="font-bold text-xl text-[#d4af37] mb-2">Músico Pro Academy</h4>
                <p className="opacity-90">O Guia Definitivo de Organização Fiscal para Músicos.</p>
              </div>
              <div className="pt-2">
                <p className="font-bold mb-3">Você aprende:</p>
                <ul className="grid grid-cols-2 gap-2 text-sm opacity-80">
                  <li>• Estruturar sua carreira</li>
                  <li>• Lidar com Carnê-Leão</li>
                  <li>• Reduzir riscos fiscais</li>
                  <li>• Crescer de forma sustentável</li>
                </ul>
              </div>
              <p className="text-xl font-bold text-[#d4af37] pt-4 uppercase tracking-wide">Talento abre portas.<br />Estrutura mantém portas abertas.</p>
            </div>

          </div>
        </section>

        {/* OFERTA PRO */}
        <section id="planos" className="py-24 px-4 bg-[#fff9e6] relative">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center">

            <div className="bg-white p-8 md:p-14 rounded-[2.5rem] shadow-2xl border-4 border-[#0c2461] w-full relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#0c2461] font-black px-10 py-3 rounded-full uppercase tracking-wider shadow-lg text-xl whitespace-nowrap">
                Plano PRO
              </div>

              <div className="text-xl font-bold text-gray-500 mb-6 mt-6">Organização profissional por:</div>
              <div className="flex justify-center items-end gap-2 mb-2 text-[#0c2461]">
                <span className="text-3xl font-bold mb-2">R$</span>
                <span className="text-8xl font-black leading-none tracking-tighter">97</span>
                <span className="text-xl font-bold mb-3">/ano</span>
              </div>
              <div className="text-lg font-bold opacity-60 mb-8 pb-8 border-b border-[#E8E3DC]">Menos de R$ 8,10 por mês.</div>

              <div className="text-left max-w-sm mx-auto mb-10">
                <p className="font-bold text-lg mb-4 text-[#0c2461]">Inclui:</p>
                <ul className="space-y-4 font-semibold text-lg text-gray-700">
                  <li className="flex items-center gap-3"><CheckCircle size={24} className="text-[#d4af37] shrink-0" /> <span>Exportação para Carnê-Leão</span></li>
                  <li className="flex items-center gap-3"><CheckCircle size={24} className="text-[#d4af37] shrink-0" /> <span>Visão completa de lucro real</span></li>
                  <li className="flex items-center gap-3"><CheckCircle size={24} className="text-[#d4af37] shrink-0" /> <span>Recibos ilimitados em PDF</span></li>
                  <li className="flex items-center gap-3"><CheckCircle size={24} className="text-[#d4af37] shrink-0" /> <span>Contratos e orçamentos</span></li>
                  <li className="flex items-center gap-3"><CheckCircle size={24} className="text-[#d4af37] shrink-0" /> <span>Academy exclusiva</span></li>
                  <li className="flex items-center gap-3"><CheckCircle size={24} className="text-[#d4af37] shrink-0" /> <span>Ferramentas avançadas</span></li>
                </ul>
              </div>

              <button
                onClick={() => { trackBuyClick(); window.location.href = '/vendas'; }}
                className="w-full bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-black py-6 rounded-2xl shadow-[0_10px_30px_rgba(212,175,55,0.4)] transition-all text-2xl md:text-3xl transform hover:scale-[1.02] active:scale-95"
              >
                Quero ser profissional
              </button>

              <div className="mt-8 flex flex-col items-center justify-center gap-2">
                <div className="flex items-center gap-2 text-green-700 font-bold text-lg">
                  <ShieldCheck size={24} />
                  Garantia de 7 dias.
                </div>
                <span className="text-base font-medium opacity-80 text-gray-600">Se não fizer sentido para você, devolvemos 100%.</span>
              </div>
            </div>

          </div>
        </section>

        {/* FAQ FINAL PARA OBJEÇÕES */}
        <section className="py-20 px-4 max-w-3xl mx-auto border-b border-[#E8E3DC]">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Perguntas Frequentes</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border text-left border-gray-200 rounded-xl overflow-hidden cursor-pointer" onClick={() => toggleFaq(idx)}>
                <div className="p-6 font-bold text-lg flex justify-between items-center hover:bg-gray-50 transition">
                  {faq.question}
                  {openFaqIndex === idx ? <Minus size={24} className="text-[#0c2461]" /> : <Plus size={24} className="text-[#0c2461]" />}
                </div>
                {openFaqIndex === idx && (
                  <div className="px-6 pb-6 pt-2 bg-white text-base leading-relaxed opacity-80 font-medium">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ENCERRAMENTO */}
        <section className="py-24 px-4 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0c2461] mb-6">
            Você já investiu anos no seu talento.
          </h2>
          <p className="text-2xl opacity-80 text-gray-600 mb-10 font-medium">
            Invista alguns minutos para organizar sua carreira.
          </p>
          <button
            onClick={() => { scrollToPlan(); }}
            className="bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold px-12 py-5 rounded-xl transition text-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Comece hoje.
          </button>
        </section>

      </main>

      {/* FOOTER */}
      <Footer />
    </div >
  );
}