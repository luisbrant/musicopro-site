import { useState, useEffect } from 'react';
import { ShieldCheck, ArrowRight, TrendingDown, PiggyBank, FileText, Music, Info, CheckCircle, Minus, Plus, Star } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import Footer from '@/components/Footer';

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [headlineVariant, setHeadlineVariant] = useState<'A' | 'B'>('A');
  const [isAbResolved, setIsAbResolved] = useState(false);
  const { trackBuyClick, trackFreeClick, trackVariantExposed } = useAnalytics();

  // A/B test with LocalStorage Persistence
  useState(() => {
    try {
      const savedVariant = localStorage.getItem('musicopro_ab_headline');
      if (savedVariant === 'A' || savedVariant === 'B') {
        setHeadlineVariant(savedVariant);
        setIsAbResolved(true);
      } else {
        const newVariant = Math.random() > 0.5 ? 'A' : 'B';
        setHeadlineVariant(newVariant);
        localStorage.setItem('musicopro_ab_headline', newVariant);
        setIsAbResolved(true);
      }
    } catch (e) {
      // Fallback for private mode / no localstorage
      setHeadlineVariant(Math.random() > 0.5 ? 'A' : 'B');
      setIsAbResolved(true);
    }
  });

  // Track the variant exposure once resolved
  useState(() => {
    if (isAbResolved) {
      trackVariantExposed(headlineVariant);
    }
  });

  // Controle para exibir o bottom bar sticky (só após scroll de hero)
  const [showBottomBar, setShowBottomBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBottomBar(true);
      } else {
        setShowBottomBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqs = [
    { question: "Posso cancelar?", answer: "Sim. Cancelamento simples a qualquer momento (sem fidelidade e sem burocracias)." },
    { question: "Como funciona a garantia?", answer: "Você tem 7 dias de garantia pelo PRO. Se não gostar do produto, a Hotmart devolve 100% do seu dinheiro sem perguntas." },
    { question: "O app calcula o imposto automaticamente?", answer: "O app estima os valores com base na sua organização de receitas e despesas dedutíveis (trazendo clareza), mas não substitui a validação humana final para enviar à Receita." },
    { question: "Preciso de contador?", answer: "O sistema organiza seus dados e facilita sua rotina fiscal absurdamente. Mas para orientação legal/formal especializada, sempre consulte contador registrado." },
    { question: "Como fazer backup?", answer: "Como mantemos total privacidade de forma offline, você controla seus dados. Recomendamos usar o botão 'Exportar Dados' no app semanalmente e salvar no seu drive ou e-mail." },
    { question: "Como restaurar meus dados?", answer: "Caso troque de dispositivo, basta clicar em 'Restaurar Dados' no app e selecionar o arquivo de backup exportado anteriormente. Rápido e fácil." }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollToPlan = () => {
    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToComoFunciona = () => {
    document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' });
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

          <div className="flex items-center gap-3">
            <button
              onClick={() => { window.location.href = '/app'; }}
              className="text-[#0c2461] hover:bg-gray-50 font-bold px-3 py-2 rounded-lg transition text-sm hidden sm:block"
            >
              Entrar
            </button>
            <button onClick={() => { trackBuyClick('header'); scrollToPlan(); }} className="bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold px-4 py-2 rounded-lg transition shadow flex items-center gap-2 text-sm">
              Assinar PRO
            </button>
          </div>
        </div>
      </header>

      <main className="pb-16">

        {/* HERO */}
        <section className="bg-white pt-24 pb-20 px-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>

          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full font-bold text-sm border border-green-200 mb-4 shadow-sm">
              <ShieldCheck size={18} /> 100% offline e privado
            </div>

            {headlineVariant === 'A' ? (
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#0c2461] tracking-tight">
                Organize impostos de músico<br />
                <span className="text-[#d4af37]">sem planilhas.</span>
              </h1>
            ) : (
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#0c2461] tracking-tight">
                Saiba quanto imposto pagar<br />
                mês a mês <span className="text-[#d4af37]">(sem planilha).</span>
              </h1>
            )}

            <p className="text-xl opacity-80 max-w-2xl mx-auto font-medium leading-relaxed">
              Controle receitas, registre despesas, apure seu Carnê-Leão e gere documentos profissionais em um único sistema.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-lg font-bold text-red-700/80 mb-8 pt-4">
              <span>Sem planilhas improvisadas.</span>
              <span className="hidden md:inline">•</span>
              <span>Tenha clareza do imposto estimado.</span>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => { trackFreeClick('hero'); window.location.href = '/app'; }}
                className="bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-black px-8 py-5 rounded-xl transition text-xl shadow-[0_10px_30px_rgba(12,36,97,0.3)] flex items-center justify-center gap-3 w-full sm:w-auto transform hover:scale-105"
              >
                Usar grátis agora
              </button>
              <button
                onClick={scrollToComoFunciona}
                className="bg-white hover:bg-gray-50 border-2 border-[#0c2461] text-[#0c2461] font-black px-8 py-5 rounded-xl transition text-xl flex items-center justify-center gap-3 w-full sm:w-auto"
              >
                Como funciona
              </button>
            </div>

            <p className="mt-4 text-sm font-bold text-gray-500 flex items-center justify-center gap-2 flex-wrap">
              <span>100% offline</span> • <span>Sem cartão</span> • <span>Cancele quando quiser</span>
            </p>
          </div>
        </section>

        {/* COMO FUNCIONA (PASSO A PASSO) */}
        <section id="como-funciona" className="py-24 px-4 bg-slate-50 relative">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Como funciona na prática</h2>
              <p className="text-lg opacity-80">Em menos de 10 minutos por mês, sua vida financeira se organiza.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-1 bg-[#d4af37]/30 z-0"></div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center relative z-10 transition hover:-translate-y-1 hover:shadow-md">
                <div className="w-16 h-16 bg-[#0c2461] text-white rounded-full flex items-center justify-center text-2xl font-black mb-6 shadow-lg">1</div>
                <h3 className="text-xl font-bold mb-3">Registre entradas e despesas</h3>
                <p className="opacity-80 text-sm">Adicione o recebimento de cachês e as despesas com transporte, instrumentos ou estúdio.</p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center relative z-10 transition hover:-translate-y-1 hover:shadow-md">
                <div className="w-16 h-16 bg-[#0c2461] text-white rounded-full flex items-center justify-center text-2xl font-black mb-6 shadow-lg">2</div>
                <h3 className="text-xl font-bold mb-3">Veja o imposto estimado</h3>
                <p className="opacity-80 text-sm">O sistema calcula o limite de isenção e mostra o Carnê-Leão a pagar usando despesas dedutíveis.</p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center relative z-10 transition hover:-translate-y-1 hover:shadow-md">
                <div className="w-16 h-16 bg-[#0c2461] text-white rounded-full flex items-center justify-center text-2xl font-black mb-6 shadow-lg">3</div>
                <h3 className="text-xl font-bold mb-3">Gere relatórios e recibos</h3>
                <p className="opacity-80 text-sm">Emita recibos em PDF em 1 clique ou exporte sua escrituração para repassar ao seu contador.</p>
              </div>
            </div>

            <div className="mt-12 text-center flex justify-center">
              <button
                onClick={() => { trackFreeClick('como-funciona'); window.location.href = '/app'; }}
                className="bg-white border-2 border-[#0c2461] hover:bg-gray-50 text-[#0c2461] font-bold px-8 py-4 rounded-xl transition text-lg flex items-center justify-center gap-2"
              >
                Começar grátis agora
              </button>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF (DEPOIMENTOS) */}
        <section className="py-20 px-4 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quem já profissionalizou a carreira</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { text: "Eu perdia horas na planilha tentando não errar o Carnê-Leão. Com o app eu sei exatamente o imposto a pagar no mês.", author: "Felipe T.", role: "Baterista Autônomo • SP" },
              { text: "Parei de pagar imposto pelo bruto e comecei a deduzir minhas despesas reais. Se pagou no primeiro mês, recomendo demais.", author: "Mariana S.", role: "Professora de Canto • RJ" },
              { text: "Os recibos e orçamentos em PDF mudaram a forma como meus contratantes me enxergam. Muito mais profissional.", author: "Rodrigo M.", role: "Produtor Musical • MG" }
            ].map((dep, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-[#d4af37] mb-4">
                    <Star size={20} fill="#d4af37" />
                    <Star size={20} fill="#d4af37" />
                    <Star size={20} fill="#d4af37" />
                    <Star size={20} fill="#d4af37" />
                    <Star size={20} fill="#d4af37" />
                  </div>
                  <p className="italic font-medium opacity-90 mb-6">"{dep.text}"</p>
                </div>
                <div>
                  <p className="font-bold text-lg">{dep.author}</p>
                  <p className="text-sm opacity-70 font-semibold">{dep.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GRÁTIS VS PRO TABLE */}
        <section className="py-24 px-4 bg-white relative border-t border-[#E8E3DC]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Tudo se adapta ao seu momento</h2>
              <p className="text-lg opacity-80 mb-6">Compare e escolha a melhor ferramenta para o controle da sua carreira.</p>
              <div className="inline-block bg-[#0c2461]/5 text-[#0c2461] px-6 py-2 rounded-lg font-semibold text-sm">
                💡 Comece grátis. Faça upgrade quando precisar de PDFs, exportações e Academy.
              </div>
            </div>

            <div className="bg-white border text-[#0c2461] border-gray-200 rounded-3xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-gray-200">
                    <th className="p-6 font-bold text-lg w-1/3">Recurso</th>
                    <th className="p-6 font-bold text-lg text-center w-1/3 text-gray-500">Grátis</th>
                    <th className="p-6 font-bold text-lg text-center w-1/3 bg-[#0c2461] text-white">PRO</th>
                  </tr>
                </thead>
                <tbody className="font-semibold text-[15px]">
                  <tr className="border-b border-gray-100">
                    <td className="p-6 opacity-90">Receitas e Despesas (Mês)</td>
                    <td className="p-6 text-center text-gray-500">Acesso Livre</td>
                    <td className="p-6 text-center bg-[#f8fafe]">Acesso Livre</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-6 opacity-90">Previsão de Imposto</td>
                    <td className="p-6 text-center text-gray-500">Visão básica na tela</td>
                    <td className="p-6 text-center bg-[#f8fafe] text-green-700 font-bold">Carnê-Leão Web & Exportação</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-6 opacity-90 flex flex-col">Gerador de PDF Profissional <span className="text-xs font-normal opacity-70">Recibos, propostas, relatórios</span></td>
                    <td className="p-6 text-center text-gray-500"><Minus className="mx-auto text-gray-300" size={20} /></td>
                    <td className="p-6 text-center bg-[#f8fafe] text-[#d4af37]"><CheckCircle className="mx-auto" size={22} /></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-6 opacity-90 flex flex-col">Contratos e Orçamentos <span className="text-xs font-normal opacity-70">Modelos jurídicos e comerciais prontos</span></td>
                    <td className="p-6 text-center text-gray-500"><Minus className="mx-auto text-gray-300" size={20} /></td>
                    <td className="p-6 text-center bg-[#f8fafe] text-[#d4af37]"><CheckCircle className="mx-auto" size={22} /></td>
                  </tr>
                  <tr>
                    <td className="p-6 opacity-90 flex flex-col">Músico Pro Academy <span className="text-xs font-normal opacity-70">Guia fiscal e crescimento acelerado</span></td>
                    <td className="p-6 text-center text-gray-500"><Minus className="mx-auto text-gray-300" size={20} /></td>
                    <td className="p-6 text-center bg-[#f8fafe] text-[#d4af37]"><CheckCircle className="mx-auto" size={22} /></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-12 text-center flex justify-center">
              <button
                onClick={() => { trackBuyClick('table'); scrollToPlan(); }}
                className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-black px-10 py-4 rounded-xl shadow-[0_4px_20px_rgba(212,175,55,0.4)] transition text-xl flex items-center justify-center gap-2 transform hover:-translate-y-1"
              >
                Desbloquear PRO
              </button>
            </div>
          </div>
        </section>

        {/* OFERTA PRO PLANOS */}
        <section id="planos" className="py-24 px-4 bg-[#0c2461] relative">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center">

            <div className="bg-white p-8 md:p-14 rounded-[2.5rem] shadow-2xl w-full relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#0c2461] font-black px-10 py-3 rounded-full uppercase tracking-wider shadow-lg text-xl whitespace-nowrap">
                Acesso Anual PRO
              </div>

              <div className="text-xl font-bold text-[#0c2461] mb-2 mt-6">Para o músico que não quer improvisos.</div>
              <p className="text-sm font-semibold opacity-70 mb-8 max-w-sm mx-auto">Profissionalize seus documentos e tenha clareza do seu lucro real para investir na carreira.</p>

              <div className="flex justify-center items-end gap-2 mb-2 text-[#0c2461]">
                <span className="text-3xl font-bold mb-2">R$</span>
                <span className="text-8xl font-black leading-none tracking-tighter">97</span>
                <span className="text-xl font-bold mb-3">/ano</span>
              </div>
              <div className="text-lg font-bold opacity-60 mb-8 pb-8 border-b border-[#E8E3DC]">O equivalente a R$ 8,10 por mês.</div>

              <div className="text-left max-w-sm mx-auto mb-10">
                <ul className="space-y-4 font-semibold text-lg text-[#0c2461]">
                  <li className="flex items-center gap-3"><CheckCircle size={24} className="text-[#d4af37] shrink-0" /> <span>Exportação completa (Carnê-Leão)</span></li>
                  <li className="flex items-center gap-3"><CheckCircle size={24} className="text-[#d4af37] shrink-0" /> <span>Recibos, contratos e orçamentos ilimitados</span></li>
                  <li className="flex items-center gap-3"><CheckCircle size={24} className="text-[#d4af37] shrink-0" /> <span>Treinamento: Academy Exclusiva</span></li>
                  <li className="flex items-center gap-3"><CheckCircle size={24} className="text-[#d4af37] shrink-0" /> <span>Suporte prioritário e novidades</span></li>
                </ul>
              </div>

              <button
                onClick={() => { trackBuyClick('pricing'); window.location.href = '/vendas'; }}
                className="w-full bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-black py-6 rounded-2xl shadow-[0_10px_30px_rgba(212,175,55,0.4)] transition-all text-2xl md:text-3xl transform hover:scale-[1.02] active:scale-95 mb-6"
              >
                Quero assinar o PRO
              </button>

              <div className="grid md:grid-cols-3 gap-4 text-center border-t border-gray-100 pt-6">
                <div className="bg-slate-50 p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="font-bold text-sm text-[#0c2461] mb-1">Renovação e Cancelamento</div>
                  <div className="text-xs opacity-70">Sem fidelidade. Cancele com 1 clique antes do vencimento anual.</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="font-bold text-sm text-[#0c2461] mb-1">Pagamento Seguro</div>
                  <div className="text-xs opacity-70">Transação criptografada garantida pela Hotmart (Pix ou Cartão).</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="font-bold text-sm text-[#0c2461] mb-1">Pós-compra Garantido</div>
                  <div className="text-xs opacity-70">Garantia padrão de 7 dias. Devolvemos 100% se você não se adaptar.</div>
                </div>
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
            onClick={() => { trackFreeClick('footer'); window.location.href = '/app'; }}
            className="bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold px-12 py-5 rounded-xl transition text-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Criar conta grátis.
          </button>
        </section>

      </main>

      {/* FOOTER */}
      <Footer />

      {/* MOBILE STICKY BOTTOM BAR */}
      <div
        className={`fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50 md:hidden transition-transform duration-300 ${showBottomBar ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="flex gap-2 max-w-sm mx-auto">
          <button
            onClick={() => { trackFreeClick('bottom-bar'); window.location.href = '/app'; }}
            className="flex-1 bg-[#0c2461] text-white font-bold py-3 rounded-xl text-sm"
          >
            Usar Grátis
          </button>
          <button
            onClick={() => { trackBuyClick('bottom-bar'); scrollToPlan(); }}
            className="flex-1 bg-[#d4af37] text-[#0c2461] font-bold py-3 rounded-xl text-sm"
          >
            Ver Planos
          </button>
        </div>
      </div>
    </div >
  );
}