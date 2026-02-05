import { useEffect, useMemo, useRef, useState } from 'react';
import { Music, Menu, X, Check, ShieldCheck, Lock, ExternalLink, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';

const PRO_API = 'https://www.musicopro.app.br/api/license/check';
const PWA_URL = 'https://app.musicopro.app.br';
const PWA_FALLBACK_URL = 'https://app.musicopro.app.br/pwa/index.html';

const getSavedEmail = () => localStorage.getItem('musicopro_email') || '';
const setSavedEmail = (email: string) => localStorage.setItem('musicopro_email', email);

async function verificarLicencaPorEmail(email: string): Promise<boolean> {
  const res = await fetch(`${PRO_API}?email=${encodeURIComponent(email)}`);
  const data = await res.json();
  return data?.active === true;
}

type Status = 'idle' | 'checking' | 'success' | 'inactive' | 'error';

export default function AppOnly() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [msg, setMsg] = useState('');
  const [isPro, setIsPro] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const pwaUrlWithEmail = useMemo(() => {
    const e = email.trim().toLowerCase();
    return e ? `${PWA_URL}?email=${encodeURIComponent(e)}` : PWA_URL;
  }, [email]);

  const openPwa = () => window.open(pwaUrlWithEmail, '_blank', 'noopener,noreferrer');
  
  const validate = async () => {
    const normalized = email.trim().toLowerCase();
    setEmail(normalized);
    if (!normalized) { setStatus('error'); setMsg('Digite o e-mail da compra.'); emailRef.current?.focus(); return; }

    try {
      setStatus('checking'); setMsg('Verificando...'); setSavedEmail(normalized);
      const ok = await verificarLicencaPorEmail(normalized);
      setIsPro(ok);
      if (ok) {
        setStatus('success'); setMsg('✅ Licença confirmada! MusicoPro PRO liberado.');
      } else {
        setStatus('inactive'); setMsg('E-mail não encontrado no sistema.');
      }
    } catch (e) {
      setStatus('error'); setMsg('Erro de conexão. Tente novamente.');
    }
  };

  useEffect(() => {
    const saved = getSavedEmail().trim().toLowerCase();
    if (saved) setEmail(saved);
    const url = new URL(window.location.href);
    const qEmail = (url.searchParams.get('email') || '').trim().toLowerCase();
    if (qEmail) { setEmail(qEmail); setSavedEmail(qEmail); }
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-[#0c2461]">
      <header className="sticky top-0 z-40 bg-white border-b border-[#E8E3DC]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="w-8 h-8 text-[#d4af37]" />
            <div>
              <h1 className="font-bold text-xl leading-none" style={{ fontFamily: 'Lexend, sans-serif' }}>Músico Pro</h1>
              <p className="text-[10px] uppercase tracking-wider text-[#6ba587] font-bold">App</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/"><button className="hover:text-[#d4af37] transition font-medium">Home</button></Link>
            <Link href="/guia"><button className="hover:text-[#d4af37] transition font-medium">Guia</button></Link>
            <Link href="/guia#validar-guia-pro"><button className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-4 py-2 rounded-lg transition">Ativar Pacote</button></Link>
          </nav>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <nav className="md:hidden bg-[#0c2461] text-white p-4 space-y-2">
          <Link href="/"><button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">Home</button></Link>
          <Link href="/guia"><button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">Guia</button></Link>
        </nav>
      )}

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* HERO */}
        <section className="mb-10">
          <div className="bg-gradient-to-br from-[#0c2461] to-[#1a3a7a] rounded-xl p-8 md:p-12 text-white space-y-6 shadow-xl">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">MusicoPro</h2>
            <p className="text-lg opacity-90 max-w-2xl">
              A ferramenta prática para registrar receitas, despesas e manter a rotina organizada.
              <br/><span className="text-sm opacity-75 block mt-2">Versão Web (funciona no celular e PC)</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button onClick={openPwa} className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-6 py-3 rounded-lg transition flex items-center justify-center gap-2">
                📲 Abrir App MusicoPro
              </button>
              <Link href="/guia">
                <button className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition border border-white/20">
                  Voltar ao Guia
                </button>
              </Link>
            </div>
            <p className="text-xs opacity-60">Se não abrir, <a href={PWA_FALLBACK_URL} target="_blank" className="underline">clique aqui</a>.</p>
          </div>
        </section>

        {/* FUNCIONALIDADES */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6">O que o MusicoPro faz?</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {['Registra cachês e PIX recebidos', 'Controla despesas de transporte/equipamento', 'Resumo mensal automático', 'Prepara dados para o IR'].map(f => (
              <div key={f} className="bg-[#f8fafc] p-4 rounded-lg flex gap-3 items-center border border-[#E8E3DC]">
                <Check className="w-5 h-5 text-[#d4af37]"/> <span className="font-medium">{f}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ATIVAÇÃO PRO */}
        <section id="ativar-app-pro" className="mb-12 pt-8 border-t border-[#E8E3DC]">
           <div className="bg-white border-2 border-[#d4af37] rounded-xl p-6 md:p-8 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#d4af37] text-[#0c2461] text-xs font-bold px-3 py-1 rounded-bl-lg">ÁREA PRO</div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Liberar Funções PRO</h3>
              <p className="text-[#0c2461] opacity-80">
                Se você comprou o <strong>Pacote Músico Pro</strong>, digite seu e-mail para desbloquear todas as funções do app.
              </p>
            </div>

            {status !== 'idle' && (
              <div className={`rounded-lg p-4 border flex gap-3 items-start ${status === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                {status === 'success' ? <CheckCircle2 className="w-5 h-5 text-green-700"/> : <ShieldCheck className="w-5 h-5 text-red-700"/>}
                <p className="font-medium text-sm pt-0.5">{msg}</p>
              </div>
            )}

            <div className="grid md:grid-cols-[1fr_auto] gap-3">
              <input ref={emailRef} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail da compra" className="w-full px-4 py-3 rounded-lg border border-[#E8E3DC] focus:ring-2 focus:ring-[#d4af37] outline-none" type="email" />
              <button onClick={validate} disabled={status === 'checking'} className="bg-[#0c2461] hover:bg-[#1a3a7a] disabled:opacity-50 text-white font-bold px-6 py-3 rounded-lg transition">
                {status === 'checking' ? '...' : 'Liberar PRO'}
              </button>
            </div>

            {isPro ? (
              <button onClick={openPwa} className="w-full bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-6 py-4 rounded-lg transition flex items-center justify-center gap-2 shadow-md">
                🚀 Abrir App MusicoPro (PRO Ativo) <ExternalLink size={18}/>
              </button>
            ) : (
              <div className="flex gap-2 items-center justify-center text-sm opacity-70 mt-4">
                <Lock size={14}/> Valide para liberar relatórios avançados e backup.
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}