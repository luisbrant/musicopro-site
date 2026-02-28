import { useState, useEffect } from 'react'
import {
  ShieldCheck, CheckCircle, Minus, Plus, Star, Music,
  Clock, FileText, DollarSign, BarChart2, Info
} from 'lucide-react'
import { useAnalytics } from '../hooks/useAnalytics'
import Footer from '../components/Footer'

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [headlineVariant, setHeadlineVariant] = useState<'A' | 'B' | 'C' | null>(null)
  const [isAbResolved, setIsAbResolved] = useState(false)
  const [showBottomBar, setShowBottomBar] = useState(false)

  const {
    trackBuyClick,
    trackFreeClick,
    trackVariantExposed,
    trackFaqOpen,
    trackViewPlans
  } = useAnalytics()

  // A/B com persistência — sem CLS (não renderiza H1 antes de resolver)
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
    if (isAbResolved && headlineVariant) trackVariantExposed(headlineVariant)
  }, [isAbResolved])

  // Scroll listener otimizado com requestAnimationFrame + passive
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setShowBottomBar(window.scrollY > 400)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
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
      answer: 'O app estima os valores com base na sua organização de receitas e despesas dedutíveis, trazendo clareza sobre o que pagar. Não substitui a validação de um contador para o envio oficial à Receita.'
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

  const scrollToPlan = () =>
    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToComoFunciona = () =>
    document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })

  // URL do checkout Hotmart — substituir pelo link real
  const HOTMART_URL = 'https://pay.hotmart.com/SEU_PRODUTO_ID?checkoutMode=10'

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#0c2461] selection:bg-[#d4af37] selection:text-[#0c2461]">

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-[#E8E3DC] shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">

          {/* Logo — <span> em vez de <h1> para não duplicar o H1 da página */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo(0, 0)}
          >
            <Music className="w-6 h-6 text-[#d4af37]" aria-hidden="true" />
            <span
              className="font-bold text-lg leading-none tracking-tight"
              style={{ fontFamily: 'Lexend, sans-serif' }}
            >
              Músico Pro
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.location.href = '/app'}
              className="text-[#0c2461] hover:bg-gray-50 font-bold px-3 py-2 rounded-lg transition text-sm hidden sm:block"
            >
              Entrar
            </button>
            <button
              type="button"
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
        <section
          className="bg-white pt-24 pb-20 px-4 relative overflow-hidden"
          aria-label="Apresentação principal"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[100px] -z-10 translate-x-12 -translate-y-12" aria-hidden="true" />
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full font-bold text-sm border border-green-200 mb-4 shadow-sm">
              <ShieldCheck size={18} aria-hidden="true" /> 100% offline e privado
            </div>

            {/* H1 único — só renderiza após A/B resolver (evita CLS) */}
            {!isAbResolved ? (
              <div
                className="h-32 w-full max-w-2xl mx-auto animate-pulse bg-gray-100 rounded-xl"
                aria-hidden="true"
              />
            ) : (
              <>
                {headlineVariant === 'A' && (
                  <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#0c2461] tracking-tight">
                    Você toca.<br />
                    <span className="text-[#d4af37]">
                      O app cuida do imposto,<br />das contas e dos documentos.
                    </span>
                  </h1>
                )}
                {headlineVariant === 'B' && (
                  <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#0c2461] tracking-tight">
                    Pare de pagar imposto a mais.<br />
                    <span className="text-[#d4af37]">
                      Seu estúdio, internet e serviços contratados podem ser dedutíveis.
                    </span>
                  </h1>
                )}
                {headlineVariant === 'C' && (
                  <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#0c2461] tracking-tight">
                    Músico autônomo:<br />
                    <span className="text-[#d4af37]">
                      pare de adivinhar o Carnê-Leão.
                    </span>
                  </h1>
                )}
              </>
            )}

            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
              Músico não tem tempo para planilha. O Músico Pro organiza suas finanças, estima o Carnê-Leão e gera recibos em PDF — tudo em menos de 10 minutos por mês.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => { trackFreeClick('hero'); window.location.href = '/app' }}
                className="bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-black px-8 py-5 rounded-xl transition text-xl shadow-[0_10px_30px_rgba(12,36,97,0.3)] flex items-center justify-center gap-3 w-full sm:w-auto transform hover:-translate-y-1"
              >
                Calcular meu Carnê-Leão — grátis
              </button>
              <button
                type="button"
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
        <section
          className="py-24 px-4 bg-white border-t border-gray-100"
          aria-label="Identificação do problema"
        >
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
              <p>"Dedutível ou não dedutível? Estúdio conta? Internet conta? O que posso abater?"</p>
              <p>"Perco horas em burocracia que poderiam ser de ensaio, aula ou produção."</p>
              <p>"Meu contador não entende de música, e eu não entendo de imposto."</p>
            </div>
            <div className="mt-10 p-6 bg-slate-50 border border-gray-200 rounded-xl text-lg font-medium text-[#0c2461]">
              Nenhum desses medos te torna irresponsável. Eles existem porque ninguém ensina músico a lidar com imposto. O Músico Pro foi feito para isso — para você gastar seu tempo com música, não com planilha.
            </div>
          </div>
        </section>

        {/* O QUE O APP FAZ — 4 PILARES */}
        <section
          className="py-24 px-4 bg-[#0c2461] text-white"
          aria-label="O que o Músico Pro faz"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#d4af37]">
                O que o Músico Pro faz por você
              </h2>
              <p className="text-lg opacity-80">Quatro problemas resolvidos. Um único app.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <DollarSign size={28} aria-hidden="true" />,
                  title: 'Estima o imposto com precisão',
                  text: 'Aplica suas despesas de custeio dedutíveis — como aluguel de estúdio, internet profissional e serviços contratados — e mostra o Carnê-Leão estimado real. Não o valor bruto.'
                },
                {
                  icon: <BarChart2 size={28} aria-hidden="true" />,
                  title: 'Organiza suas finanças',
                  text: 'Registre cachês, aulas e qualquer entrada. Veja o saldo do mês, o histórico e saiba exatamente o que entrou e o que saiu.'
                },
                {
                  icon: <FileText size={28} aria-hidden="true" />,
                  title: 'Gera documentos profissionais',
                  text: 'Recibos, orçamentos e contratos em PDF em 1 clique. Envie para contratantes e tenha tudo documentado como um profissional.'
                },
                {
                  icon: <Clock size={28} aria-hidden="true" />,
                  title: 'Libera seu tempo',
                  text: 'Em menos de 10 minutos por mês você fecha a parte fiscal e volta para o que importa: a música.'
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 border border-white/20 rounded-2xl p-8 flex gap-6 items-start"
                >
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
        <section
          id="como-funciona"
          aria-label="Como funciona"
          className="py-24 px-4 bg-slate-50"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Como funciona na prática</h2>
              <p className="text-lg text-gray-600">
                Você não precisa entender de imposto. Só precisa registrar o que recebeu e o que gastou.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-16 right-16 h-1 bg-[#d4af37]/30 z-0" aria-hidden="true" />
              {[
                {
                  n: '1',
                  title: 'Registre o que recebeu',
                  text: 'Cachê, aula, produção — qualquer entrada. O app organiza por mês automaticamente.'
                },
                {
                  n: '2',
                  title: 'Adicione o que gastou para trabalhar',
                  text: 'Aluguel de estúdio, internet profissional, materiais e serviços contratados. O app já sabe quais despesas podem ser dedutíveis e aplica automaticamente.'
                },
                {
                  n: '3',
                  title: 'O app faz o resto',
                  text: 'Você vê o imposto estimado do mês, o saldo real e pode gerar recibos, orçamentos e contratos em PDF em 1 clique.'
                }
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center relative z-10 transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="w-16 h-16 bg-[#0c2461] text-white rounded-full flex items-center justify-center text-2xl font-black mb-6 shadow-lg">
                    {step.n}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => { trackFreeClick('como-funciona'); window.location.href = '/app' }}
                className="bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold px-8 py-4 rounded-xl transition text-lg"
              >
                Começar grátis agora
              </button>
            </div>
          </div>
        </section>

        {/* ANTES vs DEPOIS */}
        <section
          className="py-24 px-4 bg-white border-t border-gray-100"
          aria-label="Comparação antes e depois"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">O que você para de fazer</h2>
              <p className="text-lg text-gray-600">Comparando sua rotina antes e depois do Músico Pro.</p>
            </div>
            <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="p-6 font-bold text-lg bg-red-50 text-red-700 w-1/2">
                      ❌ Sem o Músico Pro
                    </th>
                    <th className="p-6 font-bold text-lg bg-green-50 text-green-700 w-1/2">
                      ✅ Com o Músico Pro
                    </th>
                  </tr>
                </thead>
                <tbody className="font-medium text-[15px]">
                  {[
                    ['Planilha desatualizada no Google Drive', 'Tudo registrado em segundos no celular'],
                    ['Adivinhar quanto vai pagar de imposto', 'Estimativa do Carnê-Leão mês a mês'],
                    ['Pagar imposto sobre o valor bruto', 'Despesas de custeio dedutíveis aplicadas automaticamente'],
                    ['Recibo feito no Word às 23h', 'PDF profissional gerado em 1 clique'],
                    ['Contrato pedido emprestado de alguém', 'Modelos prontos para enviar'],
                    ['Horas perdidas em burocracia', '10 minutos por mês e pronto'],
                  ].map(([before, after], idx) => (
                    <tr key={idx} className="border-b border-gray-100">
                      <td className="p-5 text-gray-600 bg-red-50/30">{before}</td>
                      <td className="p-5 text-gray-700 bg-green-50/30">{after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* PARA QUEM É / NÃO É */}
        <section
          className="py-24 px-4 bg-slate-50 border-t border-gray-100"
          aria-label="Para quem é o Músico Pro"
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-green-50/50 p-8 rounded-2xl border border-green-100">
                <h2 className="text-2xl font-bold text-[#0c2461] mb-6 flex items-center gap-2">
                  <CheckCircle className="text-green-600" aria-hidden="true" /> Para quem é
                </h2>
                <ul className="space-y-4 text-gray-700 font-medium">
                  {[
                    'Músico que recebe cachê como pessoa física',
                    'Professor de música autônomo',
                    'Produtor que presta serviço sem CNPJ',
                    'Quem ainda não tem contador ou quer entender antes de contratar',
                    'Quem quer parar de adivinhar o imposto',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-green-600 font-bold" aria-hidden="true">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50/50 p-8 rounded-2xl border border-red-100">
                <h2 className="text-2xl font-bold text-[#0c2461] mb-6 flex items-center gap-2">
                  <span className="text-red-600 font-black text-xl" aria-hidden="true">✕</span> Para quem NÃO é
                </h2>
                <ul className="space-y-4 text-gray-700 font-medium">
                  {[
                    'Quem já tem CNPJ e emite nota fiscal',
                    'Quem quer que o app substitua um contador para casos complexos',
                    'Quem não atua como músico autônomo',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-red-600 font-bold" aria-hidden="true">✕</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PROVA SOCIAL */}
        <section
          className="py-20 px-4 max-w-5xl mx-auto"
          aria-label="Depoimentos de usuários"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Quem já profissionalizou a carreira
            </h2>
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
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 text-[#d4af37] mb-4" aria-label="5 estrelas">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} fill="#d4af37" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="italic font-medium text-gray-700 mb-6">"{dep.text}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0c2461] flex items-center justify-center text-white font-black text-sm shrink-0" aria-hidden="true">
                    {dep.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-lg">{dep.author}</p>
                    <p className="text-sm text-gray-500 font-semibold">{dep.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GRÁTIS VS PRO */}
        <section
          className="py-24 px-4 bg-white border-t border-[#E8E3DC]"
          aria-label="Comparação de planos"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Tudo se adapta ao seu momento</h2>
              <p className="text-lg text-gray-600 mb-6">
                Compare e escolha a melhor ferramenta para o controle da sua carreira.
              </p>
              <div className="inline-block bg-[#0c2461]/5 text-[#0c2461] px-6 py-2 rounded-lg font-semibold text-sm">
                Comece grátis e já organize. Faça upgrade quando quiser gerar PDFs, exportar o Carnê-Leão e acessar a Academy.
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
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
                    {
                      label: 'Registrar receitas e despesas',
                      free: 'Acesso livre',
                      pro: 'Acesso livre',
                      proIcon: false
                    },
                    {
                      label: 'Estimativa de imposto (Carnê-Leão)',
                      free: 'Visão básica na tela',
                      pro: 'Carnê-Leão completo + exportação',
                      proIcon: false
                    },
                    {
                      label: 'Recibos em PDF',
                      free: null,
                      pro: 'Ilimitado',
                      proIcon: true
                    },
                    {
                      label: 'Orçamentos em PDF',
                      free: null,
                      pro: 'Ilimitado',
                      proIcon: true
                    },
                    {
                      label: 'Contratos (modelos prontos)',
                      free: null,
                      pro: 'Incluído',
                      proIcon: true
                    },
                    {
                      label: 'Músico Pro Academy (guia fiscal)',
                      free: null,
                      pro: 'Acesso exclusivo',
                      proIcon: true
                    },
                    {
                      label: 'Suporte prioritário',
                      free: null,
                      pro: 'Incluído',
                      proIcon: true
                    },
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-100">
                      <td className="p-6 text-gray-700">{row.label}</td>
                      <td className="p-6 text-center text-gray-500">
                        {row.free
                          ? row.free
                          : <Minus className="mx-auto text-gray-300" size={20} aria-label="Não disponível" />
                        }
                      </td>
                      <td className="p-6 text-center bg-[#f8fafe]">
                        {row.proIcon
                          ? <CheckCircle className="mx-auto text-[#d4af37]" size={22} aria-label="Incluído" />
                          : <span className="text-[#0c2461] font-bold">{row.pro}</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => { trackBuyClick('table'); scrollToPlan() }}
                className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-black px-10 py-4 rounded-xl shadow-[0_4px_20px_rgba(212,175,55,0.4)] transition text-xl transform hover:-translate-y-1"
              >
                Desbloquear PRO
              </button>
            </div>
          </div>
        </section>

        {/* OFERTA PRO */}
        <section
          id="planos"
          aria-label="Planos e preços"
          className="py-24 px-4 bg-[#0c2461]"
        >
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
            <div className="bg-white p-8 md:p-14 rounded-[2.5rem] shadow-2xl w-full relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#0c2461] font-black px-10 py-3 rounded-full uppercase tracking-wider shadow-lg text-xl whitespace-nowrap">
                Acesso Anual PRO
              </div>

              <div className="text-xl font-bold text-[#0c2461] mb-2 mt-6">
                Para o músico que quer parar de perder dinheiro e tempo com burocracia.
              </div>
              <p className="text-sm font-semibold text-gray-500 mb-8 max-w-sm mx-auto">
                Economize no imposto, gere documentos profissionais e feche o mês fiscal em 10 minutos.
              </p>

              <div className="flex justify-center items-end gap-2 mb-2 text-[#0c2461]">
                <span className="text-3xl font-bold mb-2">R$</span>
                <span className="text-8xl font-black leading-none tracking-tighter">97</span>
                <span className="text-xl font-bold mb-3">/ano</span>
              </div>
              <div className="text-lg font-bold text-gray-400 mb-8 pb-8 border-b border-[#E8E3DC]">
                Menos que uma hora de aula particular. Por um ano inteiro.
              </div>

              <div className="text-left max-w-sm mx-auto mb-10">
                <ul className="space-y-4 font-semibold text-lg text-[#0c2461]">
                  {[
                    'Exportação completa Carnê-Leão',
                    'Recibos, contratos e orçamentos ilimitados',
                    'Músico Pro Academy — guia fiscal exclusivo',
                    'Suporte prioritário e novidades',
                  ].map((f, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle size={24} className="text-[#d4af37] shrink-0" aria-hidden="true" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA direto para Hotmart — substituir SEU_PRODUTO_ID */}
              <button
                type="button"
                onClick={() => {
                  trackBuyClick('pricing')
                  window.open(HOTMART_URL, '_blank')
                }}
                className="w-full bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-black py-6 rounded-2xl shadow-[0_10px_30px_rgba(212,175,55,0.4)] transition-all text-2xl md:text-3xl transform hover:scale-[1.02] active:scale-95 mb-6"
              >
                Quero assinar o PRO
              </button>

              <div className="grid md:grid-cols-3 gap-4 text-center border-t border-gray-100 pt-6">
                {[
                  {
                    icon: <ShieldCheck size={20} className="text-green-600" aria-hidden="true" />,
                    title: 'Garantia de 7 dias',
                    text: 'Devolvemos 100% sem perguntas via Hotmart.'
                  },
                  {
                    icon: <Info size={20} className="text-[#d4af37]" aria-hidden="true" />,
                    title: 'Pagamento seguro',
                    text: 'Pix ou cartão — transação criptografada pela Hotmart.'
                  },
                  {
                    icon: <Minus size={20} className="text-[#0c2461]" aria-hidden="true" />,
                    title: 'Sem fidelidade',
                    text: 'Cancele antes do vencimento anual, sem burocracia.'
                  },
                ].map((card, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center"
                  >
                    <div className="mb-1">{card.icon}</div>
                    <div className="font-bold text-sm text-[#0c2461] mb-1">{card.title}</div>
                    <div className="text-xs text-gray-500">{card.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          className="py-20 px-4 max-w-3xl mx-auto border-b border-[#E8E3DC]"
          aria-label="Perguntas frequentes"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Perguntas Frequentes</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg bg-white overflow-hidden text-left"
              >
                <button
                  type="button"
                  id={`faq-btn-${index}`}
                  aria-expanded={openFaqIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full px-6 py-4 font-bold flex justify-between items-center text-[#0c2461] hover:bg-gray-50 transition"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <span aria-hidden="true">
                    {openFaqIndex === index
                      ? <Minus size={24} className="text-[#0c2461]" />
                      : <Plus size={24} className="text-[#0c2461]" />
                    }
                  </span>
                </button>
                {openFaqIndex === index && (
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-btn-${index}`}
                    className="px-6 pb-4 pt-2 text-gray-700 leading-relaxed font-medium"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ENCERRAMENTO */}
        <section
          className="py-24 px-4 bg-slate-50 border-t border-gray-200"
          aria-label="Chamada final para ação"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#0c2461]">
              Você passou anos aprendendo música.
            </h2>
            <p className="text-2xl text-gray-600 mb-4 font-medium">
              Não precisa aprender contabilidade também.
            </p>
            <p className="text-lg text-gray-500 mb-10 font-medium">
              O Músico Pro faz a parte chata. Você fica com a parte boa.
            </p>
            <button
              type="button"
              onClick={() => { trackFreeClick('footer'); window.location.href = '/app' }}
              className="bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold px-12 py-5 rounded-xl transition text-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Criar conta grátis — é de graça para começar
            </button>
          </div>
        </section>

      </main>

      {/* DISCLAIMER FISCAL */}
      <p className="text-xs text-center text-gray-400 max-w-2xl mx-auto px-4 pb-8 leading-relaxed">
        O Músico Pro fornece estimativas fiscais baseadas nos dados inseridos pelo usuário.
        As despesas dedutíveis seguem as regras da Receita Federal para o Livro Caixa (Carnê-Leão).
        Para orientação formal, declarações oficiais e casos específicos, consulte um contador registrado.
        Não nos responsabilizamos por decisões tomadas exclusivamente com base nas estimativas do app.
      </p>

      <Footer />

      {/* MOBILE STICKY BOTTOM BAR */}
      <div
        className={`fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50 md:hidden transition-transform duration-300 ${
          showBottomBar ? 'translate-y-0' : 'translate-y-full'
        }`}
        aria-hidden={!showBottomBar}
      >
        <div className="flex gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={() => { trackFreeClick('bottom-bar'); window.location.href = '/app' }}
            className="flex-1 bg-[#0c2461] text-white font-bold py-3 rounded-xl text-sm"
          >
            Usar Grátis
          </button>
          <button
            type="button"
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
