import { useState, useEffect } from 'react'
import {
  ShieldCheck, CheckCircle, Star, Music,
  FileText, DollarSign, BarChart2,
  Smartphone, Lock, Database, AlertCircle,
  Download, Power, Check
} from 'lucide-react'
import { useAnalytics } from '../hooks/useAnalytics'
import Footer from '../components/Footer'
import { getAppUrl, isAndroidDevice } from '@/const'

export default function Home() {
  const [showBottomBar, setShowBottomBar] = useState(false)
  const [passedPricing, setPassedPricing] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)

  const {
    trackBuyClick,
    trackFreeClick
  } = useAnalytics()

  // Scroll listener otimizado
  useEffect(() => {
    setIsAndroid(isAndroidDevice())
    // SEO
    document.title = "MúsicoPro | Aplicativo de Gestão Financeira para Músicos";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "O MúsicoPro é o aplicativo definitivo de gestão financeira e recibos para músicos autônomos. Calcule o Carnê-Leão rápido e sem erros.");
    }

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setShowBottomBar(window.scrollY > 400)
          const planosEl = document.getElementById('planos')
          if (planosEl) {
            setPassedPricing(window.scrollY > planosEl.offsetTop)
          }
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])



  // Subir link do produto real da Hotmart
  const HOTMART_URL = 'https://pay.hotmart.com/J104095456E?bid=1772371738966'

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
              onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-[#0c2461] font-bold px-4 py-2 hover:bg-gray-100 rounded-lg transition text-base hidden md:block"
            >
              Ver planos
            </button>
            <button
              type="button"
              onClick={() => { trackFreeClick('header'); window.location.href = getAppUrl() }}
              className="bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 text-base tracking-wide hover:-translate-y-0.5"
            >
              Testar grátis
            </button>
          </div>
        </div>
      </header>

      <main className="pb-24 md:pb-16">
        {/* 1. HERO SECTION */}
        <section className="bg-white pt-20 pb-24 px-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/10 rounded-full blur-[120px] -z-10 translate-x-24 -translate-y-24" />
          <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
            <p className="text-lg md:text-xl text-[#d4af37] font-bold uppercase tracking-widest mb-4">
              Gestão Financeira e Fiscal para Músicos
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-[#0c2461] tracking-tight">
              Você já é profissional no palco.<br />
              <span className="text-[#d4af37]">Agora organize a carreira como um.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
              O <strong>app para músicos</strong> definitivo: sistema completo de <strong>gestão financeira musical</strong> com controle de receitas, despesas, <strong>cálculo de imposto</strong>, Carnê-Leão e relatórios.
            </p>
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => { trackFreeClick('hero'); window.location.href = getAppUrl() }}
                className="bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-black px-10 py-5 rounded-2xl transition text-xl shadow-[0_10px_30px_rgba(12,36,97,0.3)] w-full sm:w-auto transform hover:-translate-y-1"
              >
                Testar grátis — sem cadastro
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
                  alt="Dashboard do MúsicoPro mostrando receita total, despesas dedutíveis e imposto estimado para o Carnê-Leão"
                  width={800}
                  height={500}
                  className="w-full rounded-2xl shadow-xl"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling;
                    if (fallback) fallback.classList.remove('hidden');
                  }}
                />
                <div className="hidden text-center p-10 w-full min-h-[300px] flex-col justify-center items-center">
                  <BarChart2 size={64} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-400 font-semibold text-xl">Print real do dashboard</p>
                  <p className="text-sm text-gray-400 mt-2">Salve o arquivo em: /public/images/dashboard-print.png</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. POR QUE O MÚSICO AUTÔNOMO PRECISA */}
        <section className="py-24 px-4 bg-slate-50 border-t border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-sm md:text-base text-gray-500 font-bold uppercase tracking-widest mb-4">
                Por que o músico autônomo precisa do MúsicoPro?
              </h2>
              <p className="text-4xl md:text-5xl font-extrabold mb-8 text-[#0c2461] leading-tight tracking-tight">
                A vida de quem vive de música vai <span className="text-[#d4af37]">muito além do palco.</span>
              </p>
              <div className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed space-y-4">
                <p>
                  Depois que o show acaba, o equipamento é guardado e a adrenalina baixa, começa a verdadeira dor de cabeça: organizar os cachês, preencher recibos improvisados e lidar com o medo constante de cair na malha fina da Receita Federal.
                </p>
                <p className="font-bold text-[#0c2461] mt-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 italic">
                  O MúsicoPro foi desenhado exatamente para tirar esse peso das suas costas.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Emissão */}
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition duration-300 flex flex-col items-center text-center">
                <div className="text-5xl mb-6 bg-slate-50 w-20 h-20 flex items-center justify-center rounded-2xl">🧾</div>
                <h3 className="text-2xl font-bold text-[#0c2461] mb-4 leading-snug">Emissão Imediata de Recibos</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Gere recibos profissionais direto do celular e envie pelo WhatsApp antes de sair do evento.
                  Sem bloquinho, sem PDF montado em casa — com a sua identidade e validade legal.
                </p>
              </div>

              {/* Carnê-Leão */}
              <div className="bg-[#0c2461] text-white p-8 md:p-10 rounded-3xl shadow-2xl border border-[#1a3a7a] transform md:-translate-y-4 transition duration-300 flex flex-col items-center text-center">
                <div className="text-5xl mb-6 bg-white/10 w-20 h-20 flex items-center justify-center rounded-2xl">🦁</div>
                <h3 className="text-2xl font-bold text-[#d4af37] mb-4 leading-snug">Cálculo Automático do Carnê-Leão sem Erros</h3>
                <p className="text-gray-300 font-medium leading-relaxed">
                  Se você recebe de pessoas físicas, o Carnê-Leão é obrigatório. O app calcula automaticamente
                  o imposto mensal com base nos seus ganhos — sem diploma de contabilidade.
                </p>
              </div>

              {/* Histórico */}
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition duration-300 flex flex-col items-center text-center">
                <div className="text-5xl mb-6 bg-slate-50 w-20 h-20 flex items-center justify-center rounded-2xl">📊</div>
                <h3 className="text-2xl font-bold text-[#0c2461] mb-4 leading-snug">Histórico Financeiro</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Saiba exatamente quanto entrou e saiu a cada mês — shows, aulas, cordas, transporte.
                  Veja quem pagou, quem ainda deve e a lucratividade real da sua carreira.
                </p>
              </div>
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
                { icon: <BarChart2 size={28} />, title: 'Histórico Financeiro de Shows', desc: 'Veja tudo que entrou mês a mês.' },
                { icon: <CheckCircle size={28} />, title: 'Registro de despesas dedutíveis', desc: 'Instrumento, transporte, hospedagem.' },
                { icon: <DollarSign size={28} />, title: 'Cálculo Automático do Carnê-Leão', desc: 'Valor exato, sem surpresa no vencimento.' },
                { icon: <FileText size={28} />, title: 'Gerar Recibo de Cachê Online', desc: 'PDF profissional em um clique.' },
                { icon: <Download size={28} />, title: 'Relatórios prontos para contador', desc: 'CSV e PDF formatados. Só encaminhar.' },
                { icon: <Database size={28} />, title: 'Backup seguro', desc: 'Exporte seus dados e salve onde quiser.' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center gap-5 transition hover:bg-white/10">
                  <div className="text-[#d4af37] bg-[#0c2461] p-4 rounded-2xl shadow-lg border border-white/5">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-xl leading-snug">{item.title}</h3>
                  <p className="text-white/60 text-sm mt-2">{item.desc}</p>
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
              <h2 className="text-sm md:text-base text-gray-400 font-bold uppercase tracking-widest mb-3 text-center">
                Como proteger seu cachê da Malha Fina da Receita Federal
              </h2>
              <p className="text-3xl md:text-5xl font-bold mb-6 text-[#0c2461]">
                Um processo simples.<br />Feito em minutos, sem complicação.
              </p>
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-800 px-6 py-3 rounded-xl border border-green-200 font-bold text-lg">
                <CheckCircle size={22} className="text-green-600" />
                Não precisa entender de contabilidade.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative">
              <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gray-200 z-0" />
              {[
                { n: '1', title: 'Registre seus recebimentos', text: 'Lance os pagamentos recebidos de forma rápida e segura.' },
                { n: '2', title: 'Deduza despesas de custeio', text: 'Registre gastos dedutíveis conforme as regras da Receita Federal e pague imposto só sobre o que realmente sobra.' },
                { n: '3', title: 'Gere seu Carnê-Leão', text: 'Imposto estimado e arquivo pronto para importar no Carnê-Leão Web da Receita Federal.' },
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

        {/* 4.5 PWA / PLAY STORE INSTALLATION */}
        <section className="py-24 px-4 bg-[#0c2461] text-white">
          <div className="max-w-4xl mx-auto text-center">
            {isAndroid ? (
              <>
                <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-[#d4af37] leading-tight">
                  MúsicoPro na Google Play Store! <br className="hidden md:block" />
                  <span className="text-white opacity-90 text-2xl md:text-4xl">(Baixe o app oficial agora)</span>
                </h2>
                <p className="text-xl text-gray-300 font-medium mb-12 leading-relaxed max-w-3xl mx-auto">
                  Acesse com a melhor experiência no seu Android, com notificações, atualizações automáticas e melhor desempenho.
                </p>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden text-left mb-10 max-w-2xl mx-auto">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37] opacity-10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                  <p className="font-bold text-2xl text-white mb-6 flex items-center gap-3">
                    <span className="bg-[#d4af37] text-[#0c2461] w-8 h-8 flex items-center justify-center rounded-full text-lg">🚀</span>
                    Vantagens do app oficial:
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-white/10 p-3 rounded-xl min-w-max"><Check className="text-[#d4af37]" /></div>
                      <div>
                        <h4 className="font-bold text-xl text-white">Instalação Segura</h4>
                        <p className="text-gray-400 mt-1">Instale com um clique pela loja de aplicativos oficial da Google.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-white/10 p-3 rounded-xl min-w-max"><Check className="text-[#d4af37]" /></div>
                      <div>
                        <h4 className="font-bold text-xl text-white">Acesso Rápido</h4>
                        <p className="text-gray-400 mt-1">O ícone fica direto na gaveta de aplicativos do seu celular Android.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-center">
                  <a
                    href={getAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackBuyClick('install_playstore')}
                    className="inline-flex items-center bg-black hover:bg-zinc-900 text-white border border-zinc-800 rounded-2xl px-8 py-3.5 transition shadow-2xl transform hover:-translate-y-1 active:scale-95 w-full sm:w-auto justify-center"
                  >
                    <svg viewBox="0 0 24 24" className="w-8 h-8 mr-3 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.25 2.25v19.5c0 .65.45 1 1 .65l10.25-9.15-10.25-9.15c-.55-.35-1 0-1 .65z" fill="#00F0FF"/>
                      <path d="M14.5 13.25l3.95 3.5c.5.45 1.25.25 1.25-.4V7.65c0-.65-.75-.85-1.25-.4L14.5 10.75v2.5z" fill="#4CAF50"/>
                      <path d="M14.5 10.75l-10.25-9.15c-.45-.4-1.2-.2-1.2.45v.35L14.5 10.75z" fill="#FF3D00"/>
                      <path d="M14.5 13.25L3.05 21.6v.35c0 .65.75.85 1.2.45l10.25-9.15z" fill="#FFEA00"/>
                    </svg>
                    <div className="text-left">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Disponível no</p>
                      <p className="text-xl font-black font-sans leading-none mt-1">Google Play</p>
                    </div>
                  </a>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-[#d4af37] leading-tight">
                  Leve o MúsicoPro no bolso <br className="hidden md:block" />
                  <span className="text-white opacity-90 text-2xl md:text-4xl">(sem lotar a memória do celular)</span>
                </h2>
                <p className="text-xl text-gray-300 font-medium mb-12 leading-relaxed max-w-3xl mx-auto">
                  O MúsicoPro é um aplicativo moderno que funciona direto do seu navegador. Você não precisa procurar na Play Store ou App Store, nem apagar seus vídeos e guias de áudio para liberar espaço.
                </p>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden text-left mb-10 max-w-2xl mx-auto">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37] opacity-10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                  <p className="font-bold text-2xl text-white mb-6 flex items-center gap-3">
                    <span className="bg-[#d4af37] text-[#0c2461] w-8 h-8 flex items-center justify-center rounded-full text-lg">👇</span>
                    Adicione à sua tela inicial em 2 cliques:
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-white/10 p-3 rounded-xl min-w-max"><Smartphone className="text-[#d4af37]" /></div>
                      <div>
                        <h4 className="font-bold text-xl text-white">No Android (Chrome)</h4>
                        <p className="text-gray-400 mt-1">Toque nos 3 pontinhos <strong className="text-white">⋮</strong> no topo da tela e escolha "Adicionar à tela inicial".</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-white/10 p-3 rounded-xl min-w-max"><Smartphone className="text-[#d4af37]" /></div>
                      <div>
                        <h4 className="font-bold text-xl text-white">No iPhone (Safari)</h4>
                        <p className="text-gray-400 mt-1">Toque no ícone de compartilhar <strong className="text-white">[↑]</strong> e escolha "Adicionar à Tela de Início".</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-black px-10 py-5 rounded-2xl transition text-2xl shadow-[0_10px_30px_rgba(212,175,55,0.3)] transform hover:-translate-y-1 flex items-center justify-center gap-3 w-full sm:w-auto mx-auto"
                  onClick={() => { trackBuyClick('install_pwa'); window.location.href = getAppUrl() }}
                >
                  <Smartphone size={28} /> Abrir o app e instalar →
                </button>
              </>
            )}
          </div>
        </section>

        {/* 5. PARA QUEM É */}
        <section className="py-24 px-4 bg-slate-50 border-t border-gray-100 overflow-hidden">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-10 text-[#0c2461] leading-tight">
                  Feito para quem recebe cachê, dá aula e presta serviço.
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
                O que músicos reais estão dizendo
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {[
                { text: 'Com o app eu sei exatamente a provisão fiscal do mês. Acabou a ansiedade com o Carnê-Leão e a Receita.', author: 'Felipe T.', role: 'Baterista', city: 'São Paulo, SP' },
                { text: 'Parei de pagar imposto pelo bruto e passei a deduzir minhas despesas legais reais. Retorno imediato.', author: 'Mariana S.', role: 'Professora e Cantora', city: 'Belo Horizonte, MG' },
                { text: 'Os recibos em PDF mudaram como meus contratantes me veem. Muito mais profissional.', author: 'Rodrigo M.', role: 'Produtor Musical', city: 'Recife, PE' },
              ].map((dep, idx) => (
                <div key={idx} className="bg-slate-50 p-10 rounded-3xl border border-gray-100 flex flex-col items-start gap-6">
                  <div className="flex gap-1 text-[#d4af37]">
                    {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#d4af37" />)}
                  </div>
                  <p className="italic font-medium text-lg text-gray-700 leading-relaxed">"{dep.text}"</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-[#0c2461] text-white flex items-center justify-center font-bold text-lg shrink-0">
                      {dep.author[0]}
                    </div>
                    <div>
                      <p className="font-bold text-xl text-[#0c2461]">{dep.author}</p>
                      <p className="text-sm text-gray-500 font-semibold">{dep.role} · {dep.city}</p>
                    </div>
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
                Menos que uma corda de guitarra por mês.<br />
                <span className="text-[#d4af37]">Por um ano inteiro de controle fiscal.</span>
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
                <p className="text-sm text-[#d4af37] font-semibold mt-2 opacity-90">
                  O equivalente a R$ 8,08 por mês
                </p>
              </div>
              <div className="p-10 space-y-8">
                <div className="mb-8 border-b border-gray-100 pb-8 text-center">
                  <p className="text-lg text-gray-500 font-bold">
                    Menos que o custo de um único erro fiscal.
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    💡 Uma multa por Carnê-Leão não declarado começa em R$ 165,74 —
                    o MúsicoPro custa R$ 97 o <em>ano</em>.
                  </p>
                </div>
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
                  onClick={() => { 
                    trackBuyClick('pricing'); 
                    window.open(isAndroid ? getAppUrl() : HOTMART_URL, '_blank') 
                  }}
                  className="w-full bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-black py-6 rounded-2xl transition text-2xl shadow-[0_10px_30px_rgba(212,175,55,0.3)] transform hover:-translate-y-1"
                >
                  {isAndroid ? 'Assinar no App Android' : 'Assinar PRO'}
                </button>
              </div>
            </div>

            {/* Garantia */}
            <div className="mt-8 max-w-sm mx-auto flex items-center justify-center gap-4 text-gray-600 bg-white py-4 px-6 rounded-full shadow-sm border border-gray-200">
              <ShieldCheck size={28} className="text-green-600" />
              <div className="text-left leading-tight">
                <p className="font-bold text-sm">Garantia incondicional</p>
                <p className="text-xs">7 dias ou seu dinheiro de volta</p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. SEGURANÇA E GARANTIA */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center">
            {[
              { icon: <Lock size={32} />, title: '100% privado — seus dados nunca saem do seu dispositivo' },
              { icon: <Download size={32} />, title: 'Exporta tudo para o Carnê-Leão Web' },
              { icon: <Database size={32} />, title: 'Backup grátis — online e offline' },
              { icon: <Smartphone size={32} />, title: 'Funciona no celular e no computador' },
              { icon: <Power size={32} />, title: 'Cancele quando quiser, sem burocracia' }
            ].map((item, idx) => (
              <div key={idx} className={`flex flex-col items-center ${idx === 4 ? 'col-span-2 sm:col-span-1 md:col-span-1' : ''}`}>
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

        {/* 9. FAQ */}
        <section className="py-24 px-4 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0c2461]">Dúvidas Frequentes (FAQ)</h2>
          </div>

          <div className="space-y-4">
            <details className="bg-[#f8fafc] border border-[#E8E3DC] rounded-xl p-6 cursor-pointer group hover:bg-white transition shadow-sm">
              <summary className="flex items-center justify-between font-bold text-[#0c2461] text-lg list-none">
                O MúsicoPro é uma distribuidora digital de músicas?
                <span className="group-open:rotate-180 transition transform text-[#d4af37]">▼</span>
              </summary>
              <p className="text-[#0c2461] opacity-80 mt-4 leading-relaxed text-lg">
                <strong>Não.</strong> O MúsicoPro é um sistema de Gestão Financeira, Emissão de Recibos e cálculo de Carnê-Leão para músicos autônomos. Se você procura distribuição digital (como CD Baby ou ONErpm), esse não é o nosso serviço. Nosso foco exclusivo é proteger o seu dinheiro e o seu cachê da Malha Fina.
              </p>
            </details>
            <details className="bg-[#f8fafc] border border-[#E8E3DC] rounded-xl p-6 cursor-pointer group hover:bg-white transition shadow-sm">
              <summary className="flex items-center justify-between font-bold text-[#0c2461] text-lg list-none">
                Preciso ser MEI ou ter CNPJ para usar?
                <span className="group-open:rotate-180 transition transform text-[#d4af37]">▼</span>
              </summary>
              <p className="text-[#0c2461] opacity-80 mt-4 leading-relaxed text-lg">
                Não. O MúsicoPro foi feito para músicos que recebem como <strong>pessoa física (CPF)</strong>.
                Se você recebe cachês, dá aulas ou presta serviços sem nota fiscal de empresa,
                é exatamente para você — sem necessidade de CNPJ ou MEI.
              </p>
            </details>

            <details className="bg-[#f8fafc] border border-[#E8E3DC] rounded-xl p-6 cursor-pointer group hover:bg-white transition shadow-sm">
              <summary className="flex items-center justify-between font-bold text-[#0c2461] text-lg list-none">
                Por que não tem login e senha?
                <span className="group-open:rotate-180 transition transform text-[#d4af37]">▼</span>
              </summary>
              <p className="text-[#0c2461] opacity-80 mt-4 leading-relaxed text-lg">
                Porque <strong>sua segurança vem em primeiro lugar</strong>. Quando um site pede senha, é para salvar seus dados na nuvem deles (o que traz risco de vazamento).
                <br /><br />
                O MúsicoPro usa tecnologia <strong>Local-First</strong>: seus dados ficam salvos criptografados apenas no seu celular/computador. Nós não temos acesso.
              </p>
            </details>

            <details className="bg-[#f8fafc] border border-[#E8E3DC] rounded-xl p-6 cursor-pointer group hover:bg-white transition shadow-sm">
              <summary className="flex items-center justify-between font-bold text-[#0c2461] text-lg list-none">
                E se eu perder o celular?
                <span className="group-open:rotate-180 transition transform text-[#d4af37]">▼</span>
              </summary>
              <p className="text-[#0c2461] opacity-80 mt-4 leading-relaxed text-lg">
                Como não guardamos seus dados, você é o responsável pelo backup. O App tem uma função simples: <strong>"Exportar Dados"</strong>. Recomendamos que você faça isso uma vez por mês e salve no seu e-mail ou nuvem pessoal.
              </p>
            </details>

            <details className="bg-[#f8fafc] border border-[#E8E3DC] rounded-xl p-6 cursor-pointer group hover:bg-white transition shadow-sm">
              <summary className="flex items-center justify-between font-bold text-[#0c2461] text-lg list-none">
                O app substitui um contador?
                <span className="group-open:rotate-180 transition transform text-[#d4af37]">▼</span>
              </summary>
              <p className="text-[#0c2461] opacity-80 mt-4 leading-relaxed text-lg">
                Não. O MúsicoPro é uma ferramenta de suporte. Ele deixa tudo organizado, emite os recibos e calcula tudo pronto para você mesmo utilizar no Carnê-Leão Web ou entregar mastigado para o seu contador declarar, evitando erros.
              </p>
            </details>
          </div>
        </section>

        {/* 10. FECHAMENTO EMOCIONAL */}
        <section className="py-32 px-4 bg-[#0c2461] text-white text-center rounded-t-[3rem] shadow-[-10px_0_30px_rgba(0,0,0,0.1)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-10 text-[#d4af37] leading-[1.1]">
              Você entende de música.<br />A gente entende do resto.
            </h2>
            <p className="text-2xl text-gray-300 font-medium mb-16 leading-relaxed max-w-2xl mx-auto">
              Comece grátis. Sem cadastro. Sem cartão.
            </p>
            {isAndroid ? (
              <div className="flex justify-center">
                <a
                  href={getAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-black hover:bg-zinc-900 text-white border border-zinc-800 rounded-2xl px-10 py-4.5 transition shadow-2xl transform hover:-translate-y-1.5 active:scale-95 text-left"
                >
                  <svg viewBox="0 0 24 24" className="w-10 h-10 mr-4 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.25 2.25v19.5c0 .65.45 1 1 .65l10.25-9.15-10.25-9.15c-.55-.35-1 0-1 .65z" fill="#00F0FF"/>
                    <path d="M14.5 13.25l3.95 3.5c.5.45 1.25.25 1.25-.4V7.65c0-.65-.75-.85-1.25-.4L14.5 10.75v2.5z" fill="#4CAF50"/>
                    <path d="M14.5 10.75l-10.25-9.15c-.45-.4-1.2-.2-1.2.45v.35L14.5 10.75z" fill="#FF3D00"/>
                    <path d="M14.5 13.25L3.05 21.6v.35c0 .65.75.85 1.2.45l10.25-9.15z" fill="#FFEA00"/>
                  </svg>
                  <div>
                    <p className="text-[12px] text-gray-400 font-bold uppercase tracking-widest leading-none">Disponível no</p>
                    <p className="text-2xl font-black font-sans leading-none mt-1.5">Google Play</p>
                  </div>
                </a>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => { window.location.href = getAppUrl() }}
                className="bg-white hover:bg-gray-100 text-[#0c2461] font-black px-12 py-6 rounded-2xl transition text-3xl shadow-xl transform hover:-translate-y-2 hover:shadow-2xl"
              >
                Testar grátis agora
              </button>
            )}
          </div>
        </section>

      </main>

      <div className="pb-24 md:pb-0">
        <Footer />
      </div>

      {/* MOBILE STICKY BOTTOM BAR */}
      <div
        className={`fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-40 md:hidden transition-transform duration-300 ${showBottomBar ? 'translate-y-0' : 'translate-y-full'
          }`}
        aria-hidden={!showBottomBar}
      >
        <button
          type="button"
          onClick={() => {
            if (passedPricing) {
              trackBuyClick('bottom_bar_pro')
              window.open(isAndroid ? getAppUrl() : HOTMART_URL, '_blank')
            } else {
              trackFreeClick('bottom_bar_free')
              window.location.href = getAppUrl()
            }
          }}
          className="w-full bg-[#0c2461] text-white font-bold py-4 rounded-xl text-lg shadow-lg"
        >
          {passedPricing ? (isAndroid ? 'Instalar e Assinar — Google Play' : 'Assinar PRO — R$97/ano') : isAndroid ? 'Baixar na Play Store' : 'Testar grátis agora'}
        </button>
      </div>

    </div>
  )
}
