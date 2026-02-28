import { useState, useEffect } from 'react';
import { ShieldCheck, ArrowRight, TrendingDown, PiggyBank, FileText, Music, Info, CheckCircle, Minus, Plus, Star } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import Footer from '@/components/Footer';

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [headlineVariant, setHeadlineVariant] = useState<'A' | 'B'>('A');
  const [isAbResolved, setIsAbResolved] = useState(false);
  const { trackBuyClick, trackFreeClick, trackVariantExposed, trackFaqOpen } = useAnalytics();

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
    const isOpening = openFaqIndex !== index;
    setOpenFaqIndex(isOpening ? index : null);

    if (isOpening) {
      trackFaqOpen(faqs[index].question);
    }
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
                Você sabe quanto de imposto<br />
                <span className="text-[#d4af37]">vai pagar esse mês?</span>
              </h1>
            ) : (
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#0c2461] tracking-tight">
                Músico autônomo: pare de<br />
                <span className="text-[#d4af37]">adivinhar o Carnê-Leão.</span>
              </h1>
            )}

            <p className="text-xl opacity-80 max-w-2xl mx-auto font-medium leading-relaxed">
              O Músico Pro organiza suas receitas, aplica suas despesas dedutíveis e te mostra uma estimativa do Carnê-Leão — mês a mês, sem planilha e sem contador.
            </p>

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
              <span>Sem cartão de crédito</span> • <span>100% offline</span> • <span>Cancele quando quiser</span>
            </p>
          </div>
        </section>

        {/* AGITAÇÃO DA DOR */}
        <section className="py-24 px-4 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto text-center md:text-left">
            <h2 className="text-3xl font-bold mb-10 text-[#0c2461]">Se você é músico autônomo, provavelmente já pensou:</h2>
            <div className="space-y-4 text-lg text-gray-700 font-medium italic pl-4 border-l-4 border-[#d4af37]">
              <p>"Quanto vou pagar de imposto esse mês? Nem ideia."</p>
              <p>"Será que estou declarando certo? E se a Receita me chamar?"</p>
              <p>"Tenho uma planilha mas nunca sei se tá atualizada."</p>
              <p>"Dedutível ou não dedutível? Transporte conta? Instrumento conta?"</p>
              <p>"Meu contador não entende de música, e eu não entendo de imposto."</p>
            </div>
            <div className="mt-10 p-6 bg-slate-50 border border-gray-200 rounded-xl text-lg font-medium text-[#0c2461]">
              Nenhum desses medos te torna irresponsável. Eles existem porque ninguém ensina músico a lidar com imposto. O Músico Pro foi feito pra isso.
            </div>
          </div>
        </section>

        {/* APRESENTAÇÃO DO APP */}
        <section className="py-24 px-4 bg-[#0c2461] text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#d4af37]">O que é o Músico Pro?</h2>
            <p className="text-xl leading-relaxed mb-10 opacity-90">
              É um app para músicos autônomos que recebem cachê, dão aula ou prestam serviço como pessoa física. Ele organiza suas entradas e despesas e calcula uma estimativa do Carnê-Leão — para você saber o que deve antes que o prazo chegue.
            </p>
            <div className="flex flex-col gap-4 text-left mx-auto max-w-md bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/20">
              <h2 className="text-3xl font-extrabold mb-1">Acesso Anual PRO</h2>
              <div className="text-lg opacity-80 font-medium mt-2">Para o músico que não quer improvisos.</div>
              <div className="my-6">
                <span className="text-5xl font-black">R$ 97</span>
                <span className="text-xl opacity-80">/ano</span>
              </div>
              <p className="opacity-90 font-medium mb-8 text-[#0c2461]">
                Menos que R$ 10 por mês para organizar tudo e nunca mais adivinhar o Carnê-Leão.
              </p>

              <div className="space-y-4 mb-8 text-left">
                {[
                  "Exportação completa Carnê-Leão",
                  "Recibos, contratos e orçamentos ilimitados",
                  "Treinamento Academy Exclusiva",
                  "Suporte prioritário e novidades"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle size={24} className="text-[#d4af37] shrink-0" />
                    <span className="font-semibold text-lg">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => { trackBuyClick('pricing'); window.location.href = '/vendas'; }}
                className="w-full bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-black py-4 rounded-xl shadow-[0_4px_20px_rgba(212,175,55,0.4)] transition text-xl flex items-center justify-center gap-2 transform hover:-translate-y-1"
              >
                Quero assinar o PRO
              </button>
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA (PASSO A PASSO) */}
        <section id="como-funciona" className="py-24 px-4 bg-slate-50 relative">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Como funciona na prática</h2>
              <p className="text-lg opacity-80">Em menos de 10 minutos por mês, sua vida fiscal se organiza.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-1 bg-[#d4af37]/30 z-0"></div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center relative z-10 transition hover:-translate-y-1 hover:shadow-md">
                <div className="w-16 h-16 bg-[#0c2461] text-white rounded-full flex items-center justify-center text-2xl font-black mb-6 shadow-lg">1</div>
                <h3 className="text-xl font-bold mb-3">Registre o que recebeu</h3>
                <p className="opacity-80 text-sm">Cachê, aula, produção — qualquer entrada. O app organiza por mês automaticamente.</p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center relative z-10 transition hover:-translate-y-1 hover:shadow-md">
                <div className="w-16 h-16 bg-[#0c2461] text-white rounded-full flex items-center justify-center text-2xl font-black mb-6 shadow-lg">2</div>
                <h3 className="text-xl font-bold mb-3">Adicione suas despesas dedutíveis</h3>
                <p className="opacity-80 text-sm">Transporte, instrumentos, estúdio, internet profissional. O app aplica as deduções certas.</p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center relative z-10 transition hover:-translate-y-1 hover:shadow-md">
                <div className="w-16 h-16 bg-[#0c2461] text-white rounded-full flex items-center justify-center text-2xl font-black mb-6 shadow-lg">3</div>
                <h3 className="text-xl font-bold mb-3">Veja o Carnê-Leão estimado</h3>
                <p className="opacity-80 text-sm">O sistema mostra o imposto estimado do mês — e te avisa se ficou abaixo do limite de isenção.</p>
              </div>
            </div>

            <div className="mt-12 text-center flex justify-center">
              <button
                onClick={() => { trackFreeClick('como-funciona'); window.location.href = '/app'; }}
                className="bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold px-8 py-4 rounded-xl transition text-lg flex items-center justify-center gap-2"
              >
                Começar grátis agora
              </button>
            </div>
          </div>
        </section>

        {/* PARA QUEM É / NÃO É */}
        <section className="py-24 px-4 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-green-50/50 p-8 rounded-2xl border border-green-100">
                <h3 className="text-2xl font-bold text-[#0c2461] mb-6 flex items-center gap-2">
                  <CheckCircle className="text-green-600" /> Para quem é
                </h3>
                <ul className="space-y-4 text-gray-700 font-medium overflow-hidden">
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold">✓</span> Músico que recebe cachê como pessoa física</li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold">✓</span> Professor de música autônomo</li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold">✓</span> Produtor que presta serviço sem CNPJ</li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold">✓</span> Quem ainda não tem contador (ou quer entender antes)</li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold">✓</span> Quem quer parar de adivinhar o imposto</li>
                </ul>
              </div>

              <div className="bg-red-50/50 p-8 rounded-2xl border border-red-100">
                <h3 className="text-2xl font-bold text-[#0c2461] mb-6 flex items-center gap-2">
                  <div className="text-red-600 font-black text-xl">✕</div> Para quem NÃO é
                </h3>
                <ul className="space-y-4 text-gray-700 font-medium">
                  <li className="flex items-start gap-3"><span className="text-red-600 font-bold">✕</span> Quem já tem CNPJ e emite nota fiscal</li>
                  <li className="flex items-start gap-3"><span className="text-red-600 font-bold">✕</span> Quem quer que o app substitua um contador p/ casos complexos</li>
                  <li className="flex items-start gap-3"><span className="text-red-600 font-bold">✕</span> Quem não é autônomo da música</li>
                </ul>
              </div>
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
                <div className="bg-slate-50 p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                  <div className="text-green-600 mb-1"><ShieldCheck size={20} /></div>
                  <div className="font-bold text-sm text-[#0c2461] mb-1">Garantia de 7 dias</div>
                  <div className="text-xs opacity-70">Devolvemos 100% sem perguntas (via Hotmart).</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                  <div className="text-[#d4af37] mb-1"><Info size={20} /></div>
                  <div className="font-bold text-sm text-[#0c2461] mb-1">Segurança Hotmart</div>
                  <div className="text-xs opacity-70">Privacidade dos dados financeiros e pagamento inviolável.</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                  <div className="text-[#0c2461] mb-1"><Minus size={20} /></div>
                  <div className="font-bold text-sm text-[#0c2461] mb-1">Sem fidelidade</div>
                  <div className="text-xs opacity-70">Cancele antes do vencimento anual, sem burocracia.</div>
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

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg bg-white overflow-hidden text-left">
                <button
                  className="w-full px-6 py-4 font-bold flex justify-between items-center text-[#0c2461] hover:bg-gray-50 transition"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <span className="text-[#0c2461]">{openFaqIndex === index ? <Minus size={24} /> : <Plus size={24} />}</span>
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-4 pt-2 text-gray-700 leading-relaxed font-medium">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA FINAL (EMOTIONAL CLOSE) */}
        <section className="py-24 px-4 bg-slate-50 border-t border-gray-200">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#0c2461]">
              Você já investiu anos no seu talento.
            </h2>
            <p className="text-xl opacity-80 mb-10 max-w-2xl mx-auto font-medium">
              Invista alguns minutos para organizar sua carreira fiscal. Comece grátis — sem cartão, sem compromisso.
            </p>
            <button
              onClick={() => { trackFreeClick('footer'); window.location.href = '/app'; }}
              className="bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold px-12 py-5 rounded-xl transition text-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Criar conta grátis
            </button>
          </div>
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