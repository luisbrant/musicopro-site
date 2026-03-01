import { useState, useEffect } from 'react'
import {
  ShieldCheck, CheckCircle, Star, Music,
  FileText, DollarSign, BarChart2,
  Smartphone, Lock, Database, AlertCircle,
  Download, Power, Check
} from 'lucide-react'
import { useAnalytics } from '../hooks/useAnalytics'
import Footer from '../components/Footer'

export default function Home() {
  const [showBottomBar, setShowBottomBar] = useState(false)

  const {
    trackBuyClick,
    trackFreeClick
  } = useAnalytics()

  // Scroll listener otimizado
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



  // Subir link do produto real da Hotmart
  const HOTMART_URL = 'https://pay.hotmart.com/SEU_PRODUTO_ID?checkoutMode=10'

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#0c2461] selection:bg-[#d4af37] selection:text-[#0c2461]">

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-[#E8E3DC] shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo(0, 0)}
          >
            <Music className="w-10 h-10 text-[#d4af37] group-hover:scale-105 transition-transform" aria-hidden="true" />
            <span
              className="font-bold text-3xl leading-none tracking-tight text-[#0c2461]"
              style={{ fontFamily: 'Lexend, sans-serif' }}
            >
              MúsicoPro
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => { trackBuyClick('header'); document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-2 text-lg md:text-xl tracking-wide hover:-translate-y-1"
            >
              Seja PRO
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* 1. HERO SECTION */}
        <section className="bg-white pt-20 pb-24 px-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/10 rounded-full blur-[120px] -z-10 translate-x-24 -translate-y-24" />
          <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-[#0c2461] tracking-tight">
              Você já é profissional no palco.<br />
              <span className="text-[#d4af37]">Agora organize a carreira como um.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
              Sistema completo para controle de receitas, despesas, Carnê-Leão, recibos e relatórios — feito para quem vive de música.
            </p>
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => { trackFreeClick('hero'); window.location.href = 'https://app.musicopro.app.br' }}
                className="bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-black px-10 py-5 rounded-2xl transition text-xl shadow-[0_10px_30px_rgba(12,36,97,0.3)] w-full sm:w-auto transform hover:-translate-y-1"
              >
                Acessar o App
              </button>
              <button
                type="button"
                onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white hover:bg-gray-50 border-2 border-[#0c2461] text-[#0c2461] font-black px-10 py-5 rounded-2xl transition text-xl w-full sm:w-auto"
              >
                Ver como funciona
              </button>
            </div>

            <div className="mt-16 mx-auto max-w-4xl bg-[#f8fafc] rounded-[2rem] shadow-2xl overflow-hidden border border-gray-200">
              <div className="flex items-center gap-2 px-6 py-4 bg-white border-b border-gray-200">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>
              {/* NOTE: Add actual dashboard screenshot here later */}
              <div className="relative bg-gray-50 flex flex-col items-center justify-center p-0">
                <img
                  src="/images/dashboard-print.png"
                  alt="Dashboard Músico Pro"
                  className="w-full h-auto block hidden"
                  onLoad={(e) => {
                    e.currentTarget.classList.remove('hidden')
                    const fallback = e.currentTarget.nextElementSibling
                    if (fallback) fallback.classList.add('hidden')
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling;
                    if (fallback) fallback.classList.remove('hidden');
                  }}
                />
                <div className="text-center p-10">
                  <BarChart2 size={64} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-400 font-semibold text-xl">Print real do dashboard</p>
                  <p className="text-sm text-gray-400 mt-2">Salve o arquivo em: /public/images/dashboard-print.png</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. A DOR REAL */}
        <section className="py-24 px-4 bg-slate-50 border-t border-gray-100">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-[#0c2461] text-center md:text-left leading-tight">
              O palco é onde você domina.<br />
              <span className="text-gray-500">O problema começa depois do show.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mb-16">
              <div className="space-y-6 text-xl text-gray-700 font-medium">
                <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <div className="text-[#0c2461] bg-red-50 p-3 rounded-xl min-w-max"><AlertCircle size={24} className="text-red-500" /></div>
                  <p>"Recebi três cachês esse mês. Quanto vou pagar de imposto? Não faço ideia."</p>
                </div>
                <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <div className="text-[#0c2461] bg-red-50 p-3 rounded-xl min-w-max"><AlertCircle size={24} className="text-red-500" /></div>
                  <p>"Fui chamar um contador. Ele nunca ouviu falar em cachê de show. Desisti."</p>
                </div>
                <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <div className="text-[#0c2461] bg-red-50 p-3 rounded-xl min-w-max"><AlertCircle size={24} className="text-red-500" /></div>
                  <p>"Sei que algumas despesas são dedutíveis. Só não sei quais."</p>
                </div>
              </div>
              <div className="space-y-6 text-xl text-gray-700 font-medium md:mt-10">
                <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <div className="text-[#0c2461] bg-red-50 p-3 rounded-xl min-w-max"><AlertCircle size={24} className="text-red-500" /></div>
                  <p>"Tenho medo de errar e ser chamado pela Receita."</p>
                </div>
                <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <div className="text-[#0c2461] bg-red-50 p-3 rounded-xl min-w-max"><AlertCircle size={24} className="text-red-500" /></div>
                  <p>"Cada hora que gasto com isso é uma hora a menos no instrumento."</p>
                </div>
              </div>
            </div>

            <div className="p-10 bg-white border-l-4 border-[#d4af37] shadow-sm rounded-r-3xl">
              <p className="text-2xl font-bold text-[#0c2461] leading-relaxed">
                A imensa maioria é profissional na arte, mas improvisa perigosamente na gestão.
              </p>
            </div>
          </div>
        </section>

        {/* 3. A TRANSFORMAÇÃO */}
        <section className="py-24 px-4 bg-[#0c2461] text-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#d4af37]">
                Tudo organizado em um só lugar.
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {[
                { icon: <BarChart2 size={28} />, title: 'Controle mensal de receitas' },
                { icon: <CheckCircle size={28} />, title: 'Registro de despesas dedutíveis' },
                { icon: <DollarSign size={28} />, title: 'Cálculo com arquivo pronto para o Carnê-Leão Web' },
                { icon: <FileText size={28} />, title: 'Geração de recibos profissionais' },
                { icon: <Download size={28} />, title: 'Relatórios prontos para contador' },
                { icon: <Database size={28} />, title: 'Backup seguro' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center gap-5 transition hover:bg-white/10">
                  <div className="text-[#d4af37] bg-[#0c2461] p-4 rounded-2xl shadow-lg border border-white/5">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-xl leading-snug">{item.title}</h3>
                </div>
              ))}
            </div>

            <div className="text-center border-t border-white/10 pt-16">
              <p className="text-3xl md:text-4xl font-bold text-white leading-relaxed">
                Menos improviso fiscal. <br className="md:hidden" />
                <span className="text-[#d4af37]">Mais controle. Mais tranquilidade.</span>
              </p>
            </div>
          </div>
        </section>

        {/* 4. COMO FUNCIONA */}
        <section id="como-funciona" className="py-24 px-4 bg-white relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#0c2461]">
                Simples. Direto. Feito para músico.
              </h2>
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-800 px-6 py-3 rounded-xl border border-green-200 font-bold text-lg">
                <CheckCircle size={22} className="text-green-600" />
                Não precisa entender de contabilidade.
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6 relative">
              <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gray-200 z-0" />
              {[
                { n: '1', title: 'Registre seus recebimentos', text: 'Lance os pagamentos recebidos de forma rápida e segura.' },
                { n: '2', title: 'Deduza despesas', text: 'Registre gastos dedutíveis e abandone o imposto sobre o lucro bruto.' },
                { n: '3', title: 'Exportação Carnê-Leão', text: 'Imposto estimado e arquivo digital preparado com todos os dados para ECAC/Carnê-Leão Web.' },
                { n: '4', title: 'Gere documentos', text: 'Recibos assinados e contratos formatados em um único clique.' }
              ].map((step, idx) => (
                <div key={idx} className="bg-white pt-8 pb-10 px-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center relative z-10 transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="w-16 h-16 bg-[#0c2461] text-white rounded-full flex items-center justify-center text-2xl font-black mb-6 shadow-xl border-4 border-white">
                    {step.n}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-[#0c2461]">{step.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 5. PARA QUEM É */}
        <section className="py-24 px-4 bg-slate-50 border-t border-gray-100 overflow-hidden">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-10 text-[#0c2461] leading-tight">
                  A ferramenta exata<br /> para o seu momento.
                </h2>
                <ul className="space-y-6 text-gray-700 font-semibold text-xl lg:text-2xl">
                  {[
                    'Músicos solo',
                    'Bandas',
                    'Professores de música',
                    'Instrumentistas freelancers',
                    'Produtores musicais'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-4">
                      <div className="bg-[#d4af37] p-2 rounded-full text-[#0c2461] shadow-md">
                        <Check size={24} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#0c2461] p-12 lg:p-16 rounded-[2.5rem] text-white text-center shadow-[0_20px_50px_rgba(12,36,97,0.3)] transform md:rotate-2 hover:rotate-0 transition duration-500">
                <Music size={56} className="mx-auto mb-8 text-[#d4af37] opacity-90" />
                <p className="text-3xl font-bold leading-snug">
                  Se você recebe como pessoa física, o MúsicoPro é para você.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. PROVA E AUTORIDADE */}
        <section className="py-24 px-4 bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#0c2461]">
                Aprovado por profissionais
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {[
                { text: 'Com o app eu sei exatamente a provisão fiscal do mês. Acabou a ansiedade com o Carnê-Leão e a Receita.', author: 'Felipe T.', role: 'Baterista' },
                { text: 'Parei de pagar imposto pelo bruto e passei a deduzir minhas despesas legais reais. Retorno imediato.', author: 'Mariana S.', role: 'Professora e Cantora' },
                { text: 'Os recibos em PDF mudaram a percepção de valor dos meus contratantes. Ferramenta extremamente assertiva.', author: 'Rodrigo M.', role: 'Produtor Musical' },
              ].map((dep, idx) => (
                <div key={idx} className="bg-slate-50 p-10 rounded-3xl border border-gray-100 flex flex-col items-start gap-6">
                  <div className="flex gap-1 text-[#d4af37]">
                    {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#d4af37" />)}
                  </div>
                  <p className="italic font-medium text-lg text-gray-700 leading-relaxed">"{dep.text}"</p>
                  <div className="mt-auto">
                    <p className="font-bold text-xl text-[#0c2461]">{dep.author}</p>
                    <p className="text-md text-gray-500 font-semibold">{dep.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Transparência */}
            <div className="bg-[#f8fafc] border border-gray-200 rounded-[2.5rem] p-10 md:p-14 text-center grid md:grid-cols-3 gap-10 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              <div className="md:px-8">
                <p className="font-bold text-xl mb-4 text-[#0c2461]">Realidade Brasileira</p>
                <p className="text-gray-600 font-medium">Desenvolvido com base nas regras do Carnê-Leão e da Receita Federal.</p>
              </div>
              <div className="pt-10 md:pt-0 md:px-8">
                <p className="font-bold text-xl mb-4 text-[#0c2461]">Foco Exclusivo</p>
                <p className="text-gray-600 font-medium">Diferente de apps genéricos, nosso ecossistema é 100% voltado aos músicos.</p>
              </div>
              <div className="pt-10 md:pt-0 md:px-8">
                <p className="font-bold text-xl mb-4 text-[#0c2461]">Atualizações</p>
                <p className="text-gray-600 font-medium">Sistema constantemente adaptado para as atualizações da legislação.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. PREÇO */}
        <section id="planos" className="py-24 px-4 bg-slate-50 border-y border-gray-200">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#0c2461] leading-tight">
                Gestão profissional segura<br /> <span className="text-[#d4af37]">a partir de R$ 97/ano.</span>
              </h2>
            </div>

            <div className="max-w-md mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-200 transform transition hover:scale-[1.02]">
              <div className="bg-[#0c2461] p-10 text-center text-white relative">
                <div className="absolute top-0 right-0 left-0 h-1.5 bg-[#d4af37]"></div>
                <h3 className="text-2xl font-bold mb-4 text-[#d4af37] uppercase tracking-wider">Plano Anual</h3>
                <div className="flex justify-center items-start gap-1">
                  <span className="text-3xl font-bold mt-2">R$</span>
                  <span className="text-8xl font-black tracking-tighter">97</span>
                  <span className="text-2xl font-bold mt-auto mb-3 text-gray-300">/ano</span>
                </div>
              </div>
              <div className="p-10 space-y-8">
                <p className="text-lg text-gray-500 font-bold mb-8 text-center border-b border-gray-100 pb-8">
                  Menos que o custo de um único erro fiscal.
                </p>
                <ul className="space-y-5 text-gray-700 font-semibold mb-8">
                  {[
                    'Lançamentos ilimitados',
                    'Calcula imposto e gera arquivo de importação no Carnê-Leão Web',
                    'Recibos e Relatórios em PDF',
                    'Atualizações contínuas de segurança'
                  ].map((f, idx) => (
                    <li key={idx} className="flex gap-4 items-start text-lg">
                      <CheckCircle size={24} className="text-green-600 mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => { trackBuyClick('pricing'); window.open(HOTMART_URL, '_blank') }}
                  className="w-full bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-black py-6 rounded-2xl transition text-2xl shadow-[0_10px_30px_rgba(212,175,55,0.3)] transform hover:-translate-y-1"
                >
                  Assinar PRO
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 8. SEGURANÇA E GARANTIA */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {[
              { icon: <Lock size={32} />, title: 'Seus dados são seus' },
              { icon: <Download size={32} />, title: 'Exportação completa' },
              { icon: <Database size={32} />, title: 'Backup livre online e offline' },
              { icon: <Smartphone size={32} />, title: 'Acesso pelo Celular' },
              { icon: <Power size={32} />, title: 'Sem fidelidade, cancele simples' }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="text-[#0c2461] mb-4 bg-slate-50 p-5 rounded-2xl border border-gray-200">
                  {item.icon}
                </div>
                <p className="font-bold text-gray-700">{item.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8.5 PREFÁCIO AO FECHAMENTO (Texto elogiado pelo usuário) */}
        <section className="py-20 px-4 bg-slate-50 border-t border-gray-100">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#0c2461]">
              Você dedicou anos ao seu instrumento.
            </h2>
            <p className="text-2xl text-gray-600 mb-4 font-medium">
              A gente dedicou os nossos para entender a vida fiscal de quem vive exclusivamente de música.
            </p>
            <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
              O Músico Pro não é uma "planilha mais limpa". É a expertise que você precisava — sem precisar virar contador.
            </p>
          </div>
        </section>

        {/* 9. FECHAMENTO EMOCIONAL */}
        <section className="py-32 px-4 bg-[#0c2461] text-white text-center rounded-t-[3rem] shadow-[-10px_0_30px_rgba(0,0,0,0.1)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-10 text-[#d4af37] leading-[1.1]">
              Sua música merece profissionalismo também na gestão.
            </h2>
            <p className="text-2xl text-gray-300 font-medium mb-16 leading-relaxed max-w-2xl mx-auto">
              Você já investe pesado em instrumentos, aulas e horas de estúdio.<br className="hidden md:block" />
              Tome o controle executivo da sua própria carreira.
            </p>
            <button
              type="button"
              onClick={() => { window.location.href = 'https://app.musicopro.app.br' }}
              className="bg-white hover:bg-gray-100 text-[#0c2461] font-black px-12 py-6 rounded-2xl transition text-3xl shadow-xl transform hover:-translate-y-2 hover:shadow-2xl"
            >
              Acessar o App
            </button>
          </div>
        </section>

      </main>

      <Footer />

      {/* MOBILE STICKY BOTTOM BAR */}
      <div
        className={`fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50 md:hidden transition-transform duration-300 ${showBottomBar ? 'translate-y-0' : 'translate-y-full'
          }`}
        aria-hidden={!showBottomBar}
      >
        <button
          type="button"
          onClick={() => { window.location.href = 'https://app.musicopro.app.br' }}
          className="w-full bg-[#0c2461] text-white font-bold py-4 rounded-xl text-lg shadow-lg"
        >
          Acessar o App
        </button>
      </div>

    </div>
  )
}
