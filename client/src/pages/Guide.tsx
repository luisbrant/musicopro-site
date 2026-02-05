import { useEffect, useMemo, useRef, useState } from 'react';
import { Music, Menu, X, CheckCircle2, Loader2, ExternalLink, BookOpen, Lightbulb, Calculator, ArrowRight, Lock, FileText, Smartphone } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';

const PRO_API = 'https://www.musicopro.app.br/api/license/check';
const getProEmail = () => localStorage.getItem('musicopro_email') || '';
const setProEmail = (email: string) => localStorage.setItem('musicopro_email', email);

async function verificarLicencaPorEmail(email: string): Promise<boolean> {
  const res = await fetch(`${PRO_API}?email=${encodeURIComponent(email)}`);
  const data = await res.json();
  return data?.active === true;
}

type Status = 'idle' | 'checking' | 'success' | 'inactive' | 'error';

const GUIDE_FREE_HTML =
  "<h2>4 Passos Simples para Organização</h2>\
  <h3>1. Entradas (Receita)</h3>\
  <p>Você deve somar tudo: cachês de shows, aulas, gravações, direitos autorais e vendas de produtos. <strong>Tudo conta</strong>, seja recebido em Pix, dinheiro ou nota.</p>\
  <h3>2. Despesas (Deduções)</h3>\
  <p>Liste tudo o que é essencial para trabalhar: transporte (Uber/combustível), manutenção de instrumentos, cordas, baquetas, internet e telefone profissional.</p>\
  <h3>3. Impostos (O Leão)</h3>\
  <p>Existem dois cenários principais:</p>\
  <ul>\
    <li><strong>Retidos na Fonte:</strong> Quando você recebe via RPA e o contratante já descontou o imposto.</li>\
    <li><strong>Carnê-Leão:</strong> Quando você recebe de pessoas físicas (aulas, shows particulares). Esse você mesmo calcula mês a mês.</li>\
  </ul>\
  <h3>4. Resumo (Sobra Real)</h3>\
  <p>A conta mágica é: <code>Entradas - Saídas - Reserva de Imposto = Sua Renda Real</code>.</p>\
  <div class='box'>\
    <h4>💡 Exemplo de Mês Típico</h4>\
    <p>Imagine que você faturou <strong>R$ 4.000</strong>.</p>\
    <ul>\
      <li>Gastou <strong>R$ 500</strong> de Uber e cordas.</li>\
      <li>Reservou <strong>R$ 200</strong> para eventual imposto.</li>\
    </ul>\
    <p>Sua renda real para gastar em casa é <strong>R$ 3.300</strong>. O erro comum é gastar os R$ 4.000 achando que é tudo lucro.</p>\
  </div>";

const CONTENT_STYLE = `
  .guide-content h2 { font-size: 1.5rem; font-weight: 800; margin: 2rem 0 1rem; color: #0c2461; }
  .guide-content h3 { font-size: 1.25rem; font-weight: 700; margin: 1.5rem 0 .5rem; color: #0c2461; display: flex; align-items: center; gap: 8px; }
  .guide-content h4 { font-size: 1rem; font-weight: 700; margin: .5rem 0 .4rem; color: #0c2461; }
  .guide-content p { line-height: 1.75; color: #334155; margin: .75rem 0; font-size: 1.05rem; }
  .guide-content ul { margin: .5rem 0 1rem 1.2rem; color: #334155; list-style-type: disc; }
  .guide-content li { margin: .35rem 0; line-height: 1.6; }
  .guide-content code { background: #f1f5f9; padding: 2px 8px; border-radius: 4px; font-family: monospace; color: #d4af37; font-weight: 700; border: 1px solid #e2e8f0; }
  .guide-content .box { border: 1px solid #e2e8f0; border-left: 4px solid #d4af37; background: #f8fafc; border-radius: 8px; padding: 1.5rem; margin: 2rem 0; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
`;

export default function Guide() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [msg, setMsg] = useState('');
  const [isPro, setIsPro] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const appActivationLink = useMemo(() => {
    const e = email.trim().toLowerCase();
    return e ? `/app?email=${encodeURIComponent(e)}` : '/app';
  }, [email]);

  const scrollToValidate = (focus = false) => {
    const el = document.getElementById('validar-guia-pro');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (focus) setTimeout(() => emailRef.current?.focus(), 250);
  };

  const validate = async () => {
    const normalized = email.trim().toLowerCase();
    setEmail(normalized);
    if (!normalized) {
      setStatus('error');
      setMsg('Digite o e-mail usado na compra.');
      scrollToValidate(true);
      return;
    }
    try {
      setStatus('checking');
      setMsg('Validando…');
      setProEmail(normalized);
      const ok = await verificarLicencaPorEmail(normalized);
      setIsPro(ok);
      if (ok) {
        setStatus('success');
        setMsg('✅ Pacote Músico Pro ativo! Guia PRO + App PRO liberados.');
      } else {
        setStatus('inactive');
        setMsg('Licença não encontrada. Verifique se é o mesmo e-mail da compra.');
      }
    } catch (e) {
      setIsPro(false);
      setStatus('error');
      setMsg('Erro ao validar. Tente novamente.');
    }
  };

  useEffect(() => {
    const saved = getProEmail().trim().toLowerCase();
    if (saved) setEmail(saved);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-[#0c2461]">
      <style>{CONTENT_STYLE}</style>

      <header className="sticky top-0 z-40 bg-white border-b border-[#E8E3DC]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="w-8 h-8 text-[#d4af37]" />
            <div>
              <h1 className="font-bold text-xl leading-none" style={{ fontFamily: 'Lexend, sans-serif' }}>
                Músico Pro
              </h1>
              <p className="text-[10px] uppercase tracking-wider text-[#6ba587] font-bold">Guia</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/"><button className="hover:text-[#d4af37] transition font-medium">Home</button></Link>
            <Link href="/app"><button className="hover:text-[#d4af37] transition font-medium">MusicoPro App</button></Link>
            <Link href="/vendas">
              <button className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-4 py-2 rounded-lg transition">
                Comprar Pacote PRO
              </button>
            </Link>
          </nav>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <nav className="md:hidden bg-[#0c2461] text-white p-4 space-y-2">
          <Link href="/"><button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">Home</button></Link>
          <Link href="/app"><button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">MusicoPro App</button></Link>
          <Link href="/vendas"><button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition font-bold text-[#d4af37]">Comprar PRO</button></Link>
        </nav>
      )}

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* HERO CONTENT */}
        <section className="mb-12">
           <div className="bg-gradient-to-br from-[#0c2461] to-[#1a3a7a] rounded-xl p-8 md:p-12 text-white shadow-xl grid md:grid-cols-[1.5fr_1fr] gap-8 items-center">
            <div className="space-y-5">
              <div className="inline-block bg-[#d4af37] text-[#0c2461] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                Módulo 1: Fundamentos
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">Guia do Músico Autônomo</h2>
              <p className="text-lg opacity-90">
                Abaixo você aprende a teoria gratuita. <br/>
                Para aplicar isso sem dor de cabeça, use o <strong>App MusicoPro</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link href="/app">
                  <button className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-6 py-3 rounded-lg transition flex items-center gap-2">
                    <Smartphone size={20}/> Abrir o App
                  </button>
                </Link>
                <button onClick={() => scrollToValidate(!email)} className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition border border-white/20">
                  Já sou PRO (Login)
                </button>
              </div>
            </div>
            {/* Visual Abstract */}
            <div className="hidden md:flex justify-center">
              <div className="bg-white/10 p-6 rounded-full border border-white/20 backdrop-blur-sm">
                <BookOpen size={80} className="text-[#d4af37]" />
              </div>
            </div>
          </div>
        </section>

        {/* CONTEÚDO GRÁTIS */}
        <section className="mb-16">
          <div className="bg-white rounded-xl p-2 md:p-0">
             <div className="guide-content" dangerouslySetInnerHTML={{ __html: GUIDE_FREE_HTML }} />
          </div>
        </section>

        {/* BRIDGE SECTION: THEORY VS PRACTICE */}
        <section className="mb-16 bg-[#f8fafc] border border-[#E8E3DC] rounded-xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#0c2461]">Pare de fazer contas no papel</h3>
            <p className="text-[#0c2461] opacity-75">Veja como o App automatiza o que você acabou de ler:</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E8E3DC] flex gap-4">
              <div className="bg-blue-100 p-3 rounded-full h-fit"><Lightbulb className="w-6 h-6 text-[#0c2461]"/></div>
              <div>
                <h4 className="font-bold text-[#0c2461] mb-1">O Guia ensina:</h4>
                <p className="text-sm text-gray-600">"Liste suas despesas dedutíveis para abater o imposto."</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E8E3DC] flex gap-4 relative overflow-hidden">
              <div className="absolute right-0 top-0 bg-[#d4af37] text-[10px] font-bold px-2 py-1 text-[#0c2461] rounded-bl">APP</div>
              <div className="bg-yellow-100 p-3 rounded-full h-fit"><Calculator className="w-6 h-6 text-[#d4af37]"/></div>
              <div>
                <h4 className="font-bold text-[#0c2461] mb-1">O App faz:</h4>
                <p className="text-sm text-gray-600">Calcula automaticamente o Carnê-Leão baseado nos seus lançamentos.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E8E3DC] flex gap-4">
              <div className="bg-blue-100 p-3 rounded-full h-fit"><FileText className="w-6 h-6 text-[#0c2461]"/></div>
              <div>
                <h4 className="font-bold text-[#0c2461] mb-1">O Guia ensina:</h4>
                <p className="text-sm text-gray-600">"Tenha comprovantes organizados e profissionalismo."</p>
              </div>
            </div>

             <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E8E3DC] flex gap-4 relative overflow-hidden">
              <div className="absolute right-0 top-0 bg-[#d4af37] text-[10px] font-bold px-2 py-1 text-[#0c2461] rounded-bl">APP</div>
              <div className="bg-yellow-100 p-3 rounded-full h-fit"><CheckCircle2 className="w-6 h-6 text-[#d4af37]"/></div>
              <div>
                <h4 className="font-bold text-[#0c2461] mb-1">O App faz:</h4>
                <p className="text-sm text-gray-600">Gera <strong>Recibos PDF</strong> e Contratos com QR Code na hora.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
             <Link href="/app">
                <button className="bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold px-8 py-3 rounded-lg transition flex items-center gap-2 mx-auto">
                  Testar o App Grátis <ArrowRight size={18} />
                </button>
             </Link>
          </div>
        </section>

        {/* LOCKED PRO CONTENT */}
        <section id="validar-guia-pro" className="mb-12 pt-4">
          <div className="bg-white border-2 border-[#d4af37] rounded-xl overflow-hidden shadow-lg">
             <div className="bg-[#d4af37] p-4 text-center">
                <h3 className="text-[#0c2461] font-bold text-xl flex items-center justify-center gap-2">
                  <Lock size={20} /> Área do Assinante PRO
                </h3>
             </div>
             
             <div className="p-8 md:p-10">
                {!isPro ? (
                  <div className="grid md:grid-cols-2 gap-10 items-center">
                     <div className="space-y-4">
                        <h4 className="text-2xl font-bold text-[#0c2461]">O que está bloqueado?</h4>
                        <p className="text-gray-600">Este guia gratuito é apenas a introdução. Assinantes PRO têm acesso a:</p>
                        <ul className="space-y-3">
                           <li className="flex gap-2 text-sm text-[#0c2461] font-medium"><CheckCircle2 size={18} className="text-[#d4af37]"/> 10 Capítulos Avançados</li>
                           <li className="flex gap-2 text-sm text-[#0c2461] font-medium"><CheckCircle2 size={18} className="text-[#d4af37]"/> 5 Casos Reais de Músicos</li>
                           <li className="flex gap-2 text-sm text-[#0c2461] font-medium"><CheckCircle2 size={18} className="text-[#d4af37]"/> Checklist de Documentação Anual</li>
                           <li className="flex gap-2 text-sm text-[#0c2461] font-medium"><CheckCircle2 size={18} className="text-[#d4af37]"/> Consultor IA no App</li>
                        </ul>
                        <Link href="/vendas">
                          <button className="text-[#0c2461] underline text-sm hover:text-[#d4af37] font-bold">
                            Ver planos e preços
                          </button>
                        </Link>
                     </div>

                     <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <div className="text-center mb-4">
                           <p className="font-bold text-[#0c2461]">Já comprou?</p>
                           <p className="text-xs text-gray-500">Valide seu e-mail para desbloquear</p>
                        </div>
                        
                        {status !== 'idle' && (
                          <div className={`rounded-lg p-3 mb-3 border flex gap-3 items-start ${
                            status === 'success' ? 'bg-green-50 border-green-200' : 
                            status === 'error' ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'
                          }`}>
                            {status === 'checking' ? <Loader2 className="animate-spin w-4 h-4 text-[#0c2461]"/> : <CheckCircle2 className="w-4 h-4 text-[#0c2461]"/>}
                            <p className="font-medium text-xs pt-0.5">{msg}</p>
                          </div>
                        )}

                        <div className="space-y-3">
                          <input ref={emailRef} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail da compra" className="w-full px-4 py-3 rounded-lg border border-[#E8E3DC] focus:ring-2 focus:ring-[#d4af37] outline-none" type="email" />
                          <button onClick={validate} disabled={status === 'checking'} className="w-full bg-[#0c2461] hover:bg-[#1a3a7a] disabled:opacity-50 text-white font-bold px-6 py-3 rounded-lg transition">
                            {status === 'checking' ? '...' : 'Liberar Acesso'}
                          </button>
                        </div>
                     </div>
                  </div>
                ) : (
                  <div className="text-center space-y-6">
                     <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg inline-block">
                        ✅ <strong>Licença Ativa!</strong> Você tem acesso total.
                     </div>
                     <p className="text-lg text-[#0c2461]">
                        Você desbloqueou o Guia Completo e todas as funções do App.
                     </p>
                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/guia-pro">
                           <button className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-8 py-3 rounded-lg transition flex items-center gap-2">
                             📖 Ler Guia PRO Completo
                           </button>
                        </Link>
                        <Link href={appActivationLink}>
                           <button className="bg-white border border-[#E8E3DC] hover:bg-gray-50 text-[#0c2461] font-bold px-8 py-3 rounded-lg transition">
                             📲 Ir para o App PRO
                           </button>
                        </Link>
                     </div>
                  </div>
                )}
             </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}