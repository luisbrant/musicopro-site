import { useEffect, useMemo, useRef, useState } from 'react';
import { Music, Menu, X, CheckCircle2, Loader2, ExternalLink } from 'lucide-react';
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

// Conteúdo atualizado com base no "Funil de Harmonização"
const GUIDE_FREE_HTML =
  "<h1>Guia do Músico Autônomo</h1>\
  <p>Bem-vindo à parte teórica. Aqui você entende a lógica; no app <strong>MusicoPro</strong> você aplica.</p>\
  <h2>4 Passos Simples para Organização</h2>\
  <h3>1. Entradas (Receita)</h3>\
  <p>Você deve somar tudo: cachês de shows, aulas, gravações, direitos autorais e vendas de produtos. <strong>Tudo conta</strong>, seja recebido em Pix, dinheiro ou nota.</p>\
  <h3>2. Despesas (Deduções)</h3>\
  <p>Liste tudo o que é essencial para trabalhar: transporte (Uber/combustível), manutenção de instrumentos, cordas, baquetas, internet e telefone profissional.</p>\
  <h3>3. Impostos (O Leão)</h3>\
  <p>Existem dois cenários:</p>\
  <ul>\
    <li><strong>Retidos na Fonte:</strong> Quando você recebe via RPA e o contratante já descontou o imposto.</li>\
    <li><strong>Carnê-Leão:</strong> Quando você recebe de pessoas físicas (aulas, shows particulares). Esse você mesmo calcula.</li>\
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
    <p>Sua renda real para gastar em casa é <strong>R$ 3.300</strong>. O erro é gastar os R$ 4.000 achando que é tudo seu.</p>\
  </div>\
  <h2>Como o app MusicoPro ajuda?</h2>\
  <p>Fazer essa conta no papel cansa. O <strong>MusicoPro</strong> automatiza esse fluxo: você lança o cachê, lança o Uber, e ele te diz quanto sobrou.</p>";

const CONTENT_STYLE = `
  .guide-content h1 { font-size: 2rem; font-weight: 800; margin: 1.5rem 0 1rem; color: #0c2461; line-height: 1.1; }
  .guide-content h2 { font-size: 1.5rem; font-weight: 800; margin: 2rem 0 1rem; color: #0c2461; border-bottom: 2px solid #E8E3DC; padding-bottom: .5rem; }
  .guide-content h3 { font-size: 1.2rem; font-weight: 700; margin: 1.5rem 0 .5rem; color: #0c2461; }
  .guide-content h4 { font-size: 1rem; font-weight: 700; margin: .5rem 0 .4rem; color: #0c2461; }
  .guide-content p { line-height: 1.75; color: #334155; margin: .75rem 0; font-size: 1.05rem; }
  .guide-content ul { margin: .5rem 0 1rem 1.2rem; color: #334155; list-style-type: disc; }
  .guide-content li { margin: .35rem 0; line-height: 1.6; }
  .guide-content code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-family: monospace; color: #0c2461; font-weight: 600; }
  .guide-content .box { border: 1px solid #e2e8f0; border-left: 4px solid #d4af37; background: #f8fafc; border-radius: 8px; padding: 1.5rem; margin: 2rem 0; }
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
    return e ? `/app?email=${encodeURIComponent(e)}#ativar-app-pro` : '/app#ativar-app-pro';
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
            <Link href="/app"><button className="hover:text-[#d4af37] transition font-medium">MusicoPro</button></Link>
            <button onClick={() => scrollToValidate(!email)} className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-4 py-2 rounded-lg transition">
              Ativar Pacote
            </button>
          </nav>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <nav className="md:hidden bg-[#0c2461] text-white p-4 space-y-2">
          <Link href="/"><button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">Home</button></Link>
          <Link href="/app"><button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">MusicoPro</button></Link>
          <button onClick={() => { setMobileMenuOpen(false); scrollToValidate(true); }} className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition font-bold text-[#d4af37]">Ativar Pacote</button>
        </nav>
      )}

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* HERO CONTENT */}
        <section className="mb-10 space-y-5">
           <div className="bg-gradient-to-br from-[#0c2461] to-[#1a3a7a] rounded-xl p-8 md:p-12 text-white space-y-5 shadow-xl">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">Guia do Músico Autônomo</h2>
            <p className="text-lg opacity-90">
              Abaixo está o <strong>conteúdo grátis</strong> para você começar. 
              <br/>O <strong>Pacote Músico Pro</strong> desbloqueia o Guia Aprofundado + App Completo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/app">
                <button className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-6 py-3 rounded-lg transition">
                  Ver MusicoPro em ação
                </button>
              </Link>
              <button onClick={() => scrollToValidate(!email)} className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition border border-white/20">
                Já tenho o Pacote
              </button>
            </div>
          </div>
        </section>

        {/* CONTEÚDO GRÁTIS */}
        <section className="mb-14">
          <div className="guide-content" dangerouslySetInnerHTML={{ __html: GUIDE_FREE_HTML }} />
        </section>

        {/* SEÇÃO DE ATIVAÇÃO */}
        <section id="validar-guia-pro" className="mb-12 pt-8 border-t border-[#E8E3DC]">
          <h3 className="text-2xl font-bold mb-6">Ativar Pacote Músico Pro</h3>
          
          <div className="bg-[#f8fafc] border border-[#E8E3DC] rounded-xl p-6 md:p-8 space-y-6 shadow-sm">
            <div className="space-y-2">
              <p className="text-[#0c2461] font-medium">Digite o e-mail usado na compra.</p>
              <p className="text-sm opacity-75">Isso libera o <strong>Guia PRO</strong> e o <strong>MusicoPro (App)</strong>.</p>
            </div>

            {status !== 'idle' && (
              <div className={`rounded-lg p-4 border flex gap-3 items-start ${
                status === 'success' ? 'bg-green-50 border-green-200' : 
                status === 'error' ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'
              }`}>
                {status === 'checking' ? <Loader2 className="animate-spin w-5 h-5 text-[#0c2461]"/> : <CheckCircle2 className="w-5 h-5 text-[#0c2461]"/>}
                <div>
                  <p className="font-bold text-sm">{status === 'checking' ? 'Validando...' : status === 'success' ? 'Sucesso!' : 'Atenção'}</p>
                  <p className="text-sm opacity-90">{msg}</p>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-[1fr_auto] gap-3">
              <input ref={emailRef} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" className="w-full px-4 py-3 rounded-lg border border-[#E8E3DC] focus:ring-2 focus:ring-[#d4af37] outline-none" type="email" />
              <button onClick={validate} disabled={status === 'checking'} className="bg-[#0c2461] hover:bg-[#1a3a7a] disabled:opacity-50 text-white font-bold px-6 py-3 rounded-lg transition">
                {status === 'checking' ? '...' : 'Validar Licença'}
              </button>
            </div>

            {isPro && (
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <Link href="/guia-pro">
                  <button className="w-full bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-6 py-3 rounded-lg transition flex items-center justify-center gap-2">
                    Abrir Guia PRO <ExternalLink size={16}/>
                  </button>
                </Link>
                <Link href={appActivationLink}>
                  <button className="w-full bg-white border border-[#E8E3DC] hover:bg-gray-50 text-[#0c2461] font-bold px-6 py-3 rounded-lg transition">
                    Ir para MusicoPro
                  </button>
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}