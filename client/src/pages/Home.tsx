import { useState, useEffect } from 'react'
import {
  ShieldCheck, CheckCircle, Minus, Plus, Star, Music,
  Clock, FileText, DollarSign, BarChart2, Info
} from 'lucide-react'
import { useAnalytics } from '../hooks/useAnalytics'
import Footer from '../components/Footer'

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [headlineVariant, setHeadlineVariant] = useState<'A' | 'B' | 'C'>('A')
  const [isAbResolved, setIsAbResolved] = useState(false)
  const [showBottomBar, setShowBottomBar] = useState(false)

  const { trackBuyClick, trackFreeClick, trackVariantExposed, trackFaqOpen, trackViewPlans } = useAnalytics()

  // A/B com persistência no localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('musicopro_ab_headline') as 'A' | 'B' | 'C' | null
      if (saved === 'A' || saved === 'B' || saved === 'C') {
        setHeadlineVariant(saved)
      } else {
        const variants: ('A' | 'B' | 'C')[] = ['A', 'B', 'C']
        const picked = variants[Math.floor(Math.random() * variants.length)]
        setHeadlineVariant(picked)
        localStorage.setItem('musicopro_ab_headline', picked)
      }
    } catch {
      setHeadlineVariant('A')
    }
    setIsAbResolved(true)
  }, [])

  useEffect(() => {
    if (isAbResolved) trackVariantExposed(headlineVariant)
  }, [isAbResolved])

  // Sticky bottom bar
  useEffect(() => {
    const handleScroll = () => setShowBottomBar(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Evento view_plans com IntersectionObserver
  useEffect(() => {
    const el = document.getElementById('planos')
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) trackViewPlans() },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const faqs = [
    {
      question: 'Posso cancelar?',
      answer: 'Sim. Cancelamento simples a qualquer momento, sem fidelidade e sem burocracia.'
    },
    {
      question: 'Como funciona a garantia?',
      answer: 'Você tem 7 dias de garantia no plano PRO. Se não gostar do produto, a Hotmart devolve 100% do seu dinheiro sem perguntas.'
    },
    {
      question: 'O app calcula o imposto automaticamente?',
      answer: 'O app estima os valores com base na sua organização de receitas e despesas dedutíveis, trazendo clareza sobre o que pagar. Mas não substitui a validação de um contador para o envio oficial à Receita.'
    },
    {
      question: 'Preciso de contador para usar?',
      answer: 'Não. O sistema organiza seus dados e simplifica sua rotina fiscal de forma significativa. Para orientação legal e formal especializada, consulte um contador registrado.'
    },
    {
      question: 'Funciona no celular?',
      answer: 'Sim. Totalmente adaptado para uso no navegador do celular ou computador.'
    },
    {
      question: 'Como fazer backup dos meus dados?',
      answer: 'Como mantemos total privacidade de forma offline, você controla seus dados. Recomendamos usar o botão "Exportar Dados" no app semanalmente e salvar no seu drive ou e-mail.'
    },
    {
      question: 'Como restaurar em outro dispositivo?',
      answer: 'Basta clicar em "Restaurar Dados" no app e selecionar o arquivo de backup exportado anteriormente. Rápido e fácil.'
    },
  ]

  const toggleFaq = (index: number) => {
    const isOpening = openFaqIndex !== index
    setOpenFaqIndex(isOpening ? index : null)
    if (isOpening) trackFaqOpen(faqs[index].question)
  }

  const scrollToPlan = () => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToComoFunciona = () => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#0c2461] selection:bg-[#d4af37] selection:text-[#0c2461]">

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-[#E8E3DC] shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <Music className="w-6 h-6 text-[#d4af37]" />
            <h1 className="font-bold text-lg leading-none tracking-tight" style={{ fontFamily: 'Lexend, sans-serif' }}>
              Músico Pro
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.location.href = '/app'}
              className="text-[#0c2461] hover:bg-gray-50 font-bold px-3 py-2 rounded-lg transition text-sm hidden sm:block"
            >
              Entrar
            </button>
            <button
              onClick={() => { trackBuyClick('header'); scrollToPlan() }}
              className="bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold px-4 py-2 rounded-lg transition shadow flex items-center gap-2 text-sm"
            >
              Assinar PRO
            </button>
          </div>
        </div>
      </header>

      <main className="pb-16">

        {/* HERO */}
        <section className="bg-white pt-24 pb-20 px-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[100px] -z-10 translate-x-12 -translate-y-12" />
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full font-bold text-sm border border-green-200 mb-4 shadow-sm">
              <ShieldCheck size={18} /> 100% offline e privado
            </div>

            {headlineVariant === 'A' && (
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#0c2461] tracking-tight">
                Você toca.<br />
                <span className="text-[#d4af37]">O app cuida do imposto,<br />das contas e dos documentos.</span>
              </h1>
            )}
            {headlineVariant === 'B' && (
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#0c2461] tracking-tight">
                Pare de pagar imposto a mais.<br />
                <span className="text-[#d4af37]">Seu estúdio, transporte e instrumento são dedutíveis.</span>
              </h1>
            )}
            {headlineVariant === 'C' && (
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#0c2461] tracking-tight">
                Músico autônomo:<br />
                <span className="text-[#d4af37]">pare de adivinhar o Carnê-Leão.</span>
              </h1>
            )}

            <p className="text-xl opacity-80 max-w-2xl mx-auto font-medium leading-relaxed">
              Músico não tem tempo para planilha. O Músico Pro organiza suas finanças, estima o Carnê-Leão e gera recibos em PDF — tudo em menos de 10 minutos por mês.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => { trackFreeClick('hero'); window.location.href = '/app' }}
                className="bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-black px-8 py-5 rounded-xl transition text-xl shadow-[0_10px_30px_rgba(12,36,97,0.3)] flex items-center justify-center gap-3 w-full sm:w-auto transform hover:-translate-y-1"
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
              <span>Sem cartão</span> · <span>Cancele quando quiser</span> · <span>100% offline e privado</span>
            </p>
          </div>
        </section>

        {/* AGITAÇÃO DA DOR */}
        <section className="py-24 px-4 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-[#0c2461] text-center md:text-left">
              Músico não estudou para fazer contabilidade.
            </h2>
            <p className="text-lg text-gray-500 font-semibold mb-10 text-center md:text-left">
              Mas a Receita Federal não quer saber disso.
            </p>
            <div className="space-y-4 text-lg text-gray-700 font-medium italic pl-4 border-l-4 border-[#d4af37]">
              <p>"Quanto vou pagar de imposto esse mês? Nem ideia."</p>
              <p>"Será que estou declarando certo? E se a Receita me chamar?"</p>
              <p>"Tenho uma planilha que nunca está atualizada."</p>
              <p>"Dedutível ou não dedutível? Transporte conta? Instrumento conta?"</p>
              <p>"Perco horas em burocracia que poderiam ser de ensaio, aula ou produção."</p>
              <p>"Meu contador não entende de música, e eu não entendo de imposto."</p>
            </div>
            <div className="mt-10 p-6 bg-slate-50 border border-gray-200 rounded-xl text-lg font-medium text-[#0c2461]">
              Nenhum desses medos te torna irresponsável. Eles existem porque ninguém ensina músico a lidar com imposto. O Músico Pro foi feito para isso — para você gastar seu tempo com música, não com planilha.
            </div>
          </div>
        </section>

        {/* O QUE O APP FAZ — 4 PILARES */}
        <section className="py-24 px-4 bg-[#0c2461] text-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#d4af37]">O que o Músico Pro faz por você</h2>
              <p className="text-lg opacity-80">Quatro problemas resolvidos. Um único app.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <DollarSign size={28} />,
                  title: 'Economiza imposto',
                  text: 'Aplica suas despesas dedutíveis — transporte, instrumento, estúdio, internet — e mostra o Carnê-Leão estimado real. Não o valor bruto.'
                },
                {
                  icon: <BarChart2 size={28} />,
                  title: 'Organiza suas finanças',
                  text: 'Registre cachês, aulas e qualquer entrada. Veja o saldo do mês, o histórico e saiba exatamente o que entrou e o que saiu.'
                },
                {
                  icon: <FileText size={28} />,
                  title: 'Gera documentos profissionais',
                  text: 'Recibos, orçamentos e contratos em PDF em 1 clique. Envie para contratantes e tenha tudo documentado como um profissional.'
                },
                {
                  icon: <Clock size={28} />,
                  title: 'Libera seu tempo',
                  text: 'Em menos de 10 minutos por mês você fecha a parte fiscal e volta para o que importa: a música.'
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/10 border border-white/20 rounded-2xl p-8 flex gap-6 items-start">
                  <div className="text-[#d4af37] shrink-0 mt-1">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="opacity-80 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section id="como-funciona" className="py-24 px-4 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Como funciona na prática</h2>
              <p className="text-lg opacity-80">Você não precisa entender de imposto. Só precisa registrar o que recebeu e o que gastou.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-16 right-16 h-1 bg-[#d4af37]/30 z-0" />
              {[
                {
                  n: '1',
                  title: 'Registre o que recebeu',
                  text: 'Cachê, aula, produção — qualquer entrada. O app organiza por mês automaticamente.'
                },
                {
                  n: '2',
                  title: 'Adicione o que gastou para trabalhar',
                  text: 'Transporte, instrumento, estúdio, internet profissional. Essas despesas reduzem seu imposto e o app já sabe quais são dedutíveis.'
                },
                {
                  n: '3',
                  title: 'O app faz o resto',
                  text: 'Você vê o imposto estimado do mês, o saldo real e pode gerar recibos, orçamentos e contratos em PDF em 1 clique.'
                }
              ].map((step, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center relative z-10 transition hover:-translate-y-1 hover:shadow-md">
                  <div className="w-16 h-16 bg-[#0c2461] text-white rounded-full flex items-center justify-center text-2xl font-black mb-6 shadow-lg">
                    {step.n}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="opacity-80 text-sm">{step.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center flex justify-center">
              <button
                onClick={() => { trackFreeClick('como-funciona'); window.location.href = '/app' }}
                className="bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold px-8 py-4 rounded-xl transition text-lg flex items-center justify-center gap-2"
              >
                Começar grátis agora
              </button>
            </div>
          </div>
        </section>

        {/* ANTES vs DEPOIS */}
        <section className="py-24 px-4 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">O que você para de fazer</h2>
              <p className="text-lg opacity-80">Comparando sua vida antes e depois do Músico Pro.</p>
            </div>
            <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="p-6 font-bold text-lg bg-red-50 text-red-700 w-1/2">❌ Sem o Músico Pro</th>
                    <th className="p-6 font-bold text-lg bg-green-50 text-green-700 w-1/2">✅ Com o Músico Pro</th>
                  </tr>
                </thead>
                <tbody className="font-medium text-[15px]">
                  {[
                    ['Planilha desatualizada no Google Drive', 'Tudo registrado em segundos no celular'],
                    ['Adivinhar quanto vai pagar de imposto', 'Estimativa do Carnê-Leão mês a mês'],
                    ['Pagar imposto sobre o valor bruto', 'Despesas dedutíveis aplicadas automaticamente'],
                    ['Recibo feito no Word às 23h', 'PDF profissional gerado em 1 clique'],
                    ['Contrato pedido emprestado de alguém', 'Modelos prontos para enviar'],
                    ['Horas perdidas em burocracia', '10 minutos por mês e pronto'],
                  ].map(([before, after], idx) => (
                    <tr key={idx} className="border-b border-gray-100">
                      <td className="p-5 opacity-80 bg-red-50/30">{before}</td>
                      <td className="p-5 opacity-90 bg-green-50/30">{after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* PARA QUEM É / NÃO É */}
        <section className="py-24 px-4 bg-slate-50 border-t border-gray-100">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-green-50/50 p-8 rounded-2xl border border-green-100">
                <h3 className="text-2xl font-bold text-[#0c2461] mb-6 flex items-center gap-2">
                  <CheckCircle className="text-green-600" /> Para quem é
                </h3>
                <ul className="space-y-4 text-gray-700 font-medium">
                  {[
                    'Músico que recebe cachê como pessoa física',
                    'Professor de música autônomo',
                    'Produtor que presta serviço sem CNPJ',
                    'Quem ainda não tem contador ou quer entender antes de contratar',
                    'Quem quer parar de adivinhar o imposto',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50/50 p-8 rounded-2xl border border-red-100">
                <h3 className="text-2xl font-bold text-[#0c2461] mb-6 flex items-center gap-2">
                  <div className="text-red-600 font-black text-xl">✕</div> Para quem NÃO é
                </h3>
                <ul className="space-y-4 text-gray-700 font-medium">
                  {[
                    'Quem já tem CNPJ e emite nota fiscal',
                    'Quem quer que o app substitua um contador para casos complexos',
                    'Quem não atua como músico autônomo',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-red-600 font-bold">✕</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PROVA SOCIAL */}
        <section className="py-20 px-4 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quem já profissionalizou a carreira</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                text: 'Eu perdia horas na planilha tentando não errar o Carnê-Leão. Com o app eu sei exatamente o imposto a pagar no mês.',
                author: 'Felipe T.',
                role: 'Baterista Autônomo · SP'
              },
              {
                text: 'Parei de pagar imposto pelo bruto e comecei a deduzir minhas despesas reais. Valeu a pena já no primeiro mês, recomendo demais.',
                author: 'Mariana S.',
                role: 'Professora de Canto · RJ'
              },
              {
                text: 'Os recibos e orçamentos em PDF mudaram a forma como meus contratantes me enxergam. Muito mais profissional.',
                author: 'Rodrigo M.',
                role: 'Produtor Musical · MG'
              },
            ].map((dep, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-[#d4af37] mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#d4af37" />)}
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

        {/* GRÁTIS VS PRO */}
        <section className="py-24 px-4 bg-white border-t border-[#E8E3DC]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Tudo se adapta ao seu momento</h2>
              <p className="text-lg opacity-80 mb-6">Compare e escolha a melhor ferramenta para o controle da sua carreira.</p>
              <div className="inline-block bg-[#0c2461]/5 text-[#0c2461] px-6 py-2 rounded-lg font-semibold text-sm">
                Comece grátis e já organize. Faça upgrade quando quiser gerar PDFs, exportar o Carnê-Leão e acessar a Academy.
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
                  {[
                    ['Registrar receitas e despesas', 'Acesso livre', 'Acesso livre', false],
                    ['Estimativa de imposto (Carnê-Leão)', 'Visão básica na tela', 'Carnê-Leão completo + exportação', true],
                    ['Recibos em PDF', null, 'Ilimitado', true],
                    ['Orçamentos em PDF', null, 'Ilimitado', true],
                    ['Contratos (modelos prontos)', null, 'Incluído', true],
                    ['Músico Pro Academy (guia fiscal)', null, 'Acesso exclusivo', true],
                    ['Suporte prioritário', null, 'Incluído', true],
                  ].map(([label, free, pro, highlight], idx) => (
                    <tr key={idx} className="border-b border-gray-100">
                      <td className="p-6 opacity-90">{label as string}</td>
                      <td className="p-6 text-center text-gray-500">
                        {free ? free as string : <Minus className="mx-auto text-gray-300" size={20} />}
                      </td>
                      <td className="p-6 text-center bg-[#f8fafe]">
                        {highlight
                          ? <CheckCircle className="mx-auto text-[#d4af37]" size={22} />
                          : <span>{pro as string}</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-12 text-center flex justify-center">
              <button
                onClick={() => { trackBuyClick('table'); scrollToPlan() }}
                className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-black px-10 py-4 rounded-xl shadow-[0_4px_20px_rgba(212,175,55,0.4)] transition text-xl flex items-center justify-center gap-2 transform hover:-translate-y-1"
              >
                Desbloquear PRO
              </button>
            </div>
          </div>
        </section>

        {/* OFERTA PRO */}
        <section id="planos" className="py-24 px-4 bg-[#0c2461]">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
            <div className="bg-white p-8 md:p-14 rounded-[2.5rem] shadow-2xl w-full relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#0c2461] font-black px-10 py-3 rounded-full uppercase tracking-wider shadow-lg text-xl whitespace-nowrap">
                Acesso Anual PRO
              </div>
              <div className="text-xl font-bold text-[#0c2461] mb-2 mt-6">
                Para o músico que quer parar de perder dinheiro e tempo com burocracia.
              </div>
              <p className="text-sm font-semibold opacity-70 mb-8 max-w-sm mx-auto">
                Economize no imposto, gere documentos profissionais e feche o mês fiscal em 10 minutos.
              </p>
              <div className="flex justify-center items-end gap-2 mb-2 text-[#0c2461]">
                <span className="text-3xl font-bold mb-2">R$</span>
                <span className="text-8xl font-black leading-none tracking-tighter">97</span>
                <span className="text-xl font-bold mb-3">/ano</span>
              </div>
              <div className="text-lg font-bold opacity-60 mb-8 pb-8 border-b border-[#E8E3DC]">
                Menos que uma hora de aula particular. Por um ano inteiro.
              </div>
              <div className="text-left max-w-sm mx-auto mb-10">
                <ul className="space-y-4 font-semibold text-lg text-[#0c2461]">
                  {[
                    'Exportação completa Carnê-Leão',
                    'Recibos, contratos e orçamentos ilimitados',
                    'Treinamento Academy Exclusiva',
                    'Suporte prioritário e novidades',
                  ].map((f, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle size={24} className="text-[#d4af37] shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => { trackBuyClick('pricing'); window.location.href = '/vendas' }}
                className="w-full bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-black py-6 rounded-2xl shadow-[0_10px_30px_rgba(212,175,55,0.4)] transition-all text-2xl md:text-3xl transform hover:scale-[1.02] active:scale-95 mb-6"
              >
                Quero assinar o PRO
              </button>
              <div className="grid md:grid-cols-3 gap-4 text-center border-t border-gray-100 pt-6">
                {[
                  { icon: <ShieldCheck size={20} className="text-green-600" />, title: 'Garantia de 7 dias', text: 'Devolvemos 100% sem perguntas via Hotmart.' },
                  { icon: <Info size={20} className="text-[#d4af37]" />, title: 'Pagamento seguro', text: 'Pix ou cartão — transação criptografada pela Hotmart.' },
                  { icon: <Minus size={20} className="text-[#0c2461]" />, title: 'Sem fidelidade', text: 'Cancele antes do vencimento anual, sem burocracia.' },
                ].map((card, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                    <div className="mb-1">{card.icon}</div>
                    <div className="font-bold text-sm text-[#0c2461] mb-1">{card.title}</div>
                    <div className="text-xs opacity-70">{card.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
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
                  <span>{openFaqIndex === index ? <Minus size={24} /> : <Plus size={24} />}</span>
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

        {/* ENCERRAMENTO */}
        <section className="py-24 px-4 bg-slate-50 border-t border-gray-200">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#0c2461]">
              Você passou anos aprendendo música.
            </h2>
            <p className="text-2xl opacity-80 text-gray-600 mb-4 font-medium">
              Não precisa aprender contabilidade também.
            </p>
            <p className="text-lg opacity-60 text-gray-500 mb-10 font-medium">
              O Músico Pro faz a parte chata. Você fica com a parte boa.
            </p>
            <button
              onClick={() => { trackFreeClick('footer'); window.location.href = '/app' }}
              className="bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold px-12 py-5 rounded-xl transition text-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Criar conta grátis — é de graça para começar
            </button>
          </div>
        </section>

      </main>

      {/* DISCLAIMER */}
      <p className="text-xs text-center text-gray-400 max-w-2xl mx-auto px-4 pb-8 leading-relaxed">
        O Músico Pro fornece estimativas fiscais baseadas nos dados inseridos pelo usuário. Para orientação formal,
        declarações oficiais e casos específicos, consulte um contador registrado. Não nos responsabilizamos por
        decisões tomadas exclusivamente com base nas estimativas do app.
      </p>

      <Footer />

      {/* MOBILE STICKY BOTTOM BAR */}
      <div
        className={`fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50 md:hidden transition-transform duration-300 ${showBottomBar ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="flex gap-2 max-w-sm mx-auto">
          <button
            onClick={() => { trackFreeClick('bottom-bar'); window.location.href = '/app' }}
            className="flex-1 bg-[#0c2461] text-white font-bold py-3 rounded-xl text-sm"
          >
            Usar Grátis
          </button>
          <button
            onClick={() => { trackBuyClick('bottom-bar'); scrollToPlan() }}
            className="flex-1 bg-[#d4af37] text-[#0c2461] font-bold py-3 rounded-xl text-sm"
          >
            Ver Planos
          </button>
        </div>
      </div>

    </div>
  )
}
