import { useEffect, useMemo, useRef, useState } from 'react';
import { Music, Menu, X, Check, ShieldCheck, Lock, ExternalLink, CheckCircle2, Loader2, Smartphone, FileText, PieChart, Zap, Download } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';

const PRO_API = 'https://www.musicopro.app.br/api/license/check';
const PWA_URL = 'https://app.musicopro.app.br';
// Link direto para instrução de instalação ou fallback
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
    // Passa o email via URL para o app já tentar reconhecer
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
        setStatus('inactive'); setMsg('E-mail não encontrado. Verifique ou compre uma licença.');
      }
    } catch (e) {
      setStatus('error'); setMsg('Erro de conexão. Tente novamente.');
    }
  };

  useEffect(() => {
    const saved = getSavedEmail().trim().toLowerCase();
    if (saved) setEmail(saved);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-[#0c2461]">
      <header className="sticky top-0 z-40 bg-white border-b border-[#E8E3DC]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="w-8 h-8 text-[#d4af37]" />
            <div>
              <h1 className="font-bold text-xl leading-none" style={{ fontFamily: 'Lexend, sans-serif' }}>MusicoPro</h1>
              <p className="text-[10px] uppercase tracking-wider text-[#6ba587] font-bold">App Web</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/"><button className="hover:text-[#d4af37] transition font-medium">Home</button></Link>
            <Link href="/guia"><button className="hover:text-[#d4af37] transition font-medium">Guia</button></Link>
            <Link href="/vendas"><button className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-4 py-2 rounded-lg transition">Comprar PRO</button></Link>
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
          <Link href="/vendas"><button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition font-bold text-[#d4af37]">Comprar PRO</button></Link>
        </nav>
      )}

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {/* HERO SECTION */}
        <section className="mb-16 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-blue-100 text-[#0c2461] px-3 py-1 rounded-full text-sm font-bold mb-2">
              ✨ Versão Web (PWA)
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              O controle financeiro que <span className="text-[#d4af37]">toca no seu ritmo</span>.
            </h2>
            <p className="text-lg opacity-80">
              Esqueça planilhas complexas. Lance seus cachês em segundos, gere recibos na hora e saiba exatamente quanto pagar de imposto.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button onClick={openPwa} className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-8 py-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg">
                <Smartphone size={20} /> Abrir App Grátis
              </button>
              <Link href="/vendas">
                <button className="bg-white border-2 border-[#E8E3DC] hover:bg-gray-50 text-[#0c2461] font-bold px-8 py-4 rounded-xl transition">
                  Conhecer o PRO
                </button>
              </Link>
            </div>
            <p className="text-sm opacity-60 flex items-center gap-1">
              <CheckCircle2 size={14} className="text-green-600"/> Funciona no iPhone, Android e PC. Sem instalação.
            </p>
          </div>

          {/* MOCKUP VISUAL */}
          <div className="bg-gradient-to-br from-[#f0f4f8] to-[#e2e8f0] rounded-2xl p-6 border border-[#E8E3DC] shadow-inner">
             <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#E8E3DC]">
                <div className="bg-[#0c2461] p-4 flex justify-between items-center text-white">
                   <div className="font-bold">MusicoPro</div>
                   <Menu size={20} />
                </div>
                <div className="p-6 space-y-4">
                   <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-gray-500 uppercase">Saldo do Mês</p>
                        <p className="text-2xl font-bold text-[#0c2461]">R$ 4.250,00</p>
                      </div>
                      <PieChart className="text-[#d4af37]" />
                   </div>
                   <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#d4af37] w-3/4"></div>
                   </div>
                   <div className="grid grid-cols-2 gap-3">
                      <div className="bg-blue-50 p-3 rounded-lg text-center text-xs font-bold text-[#0c2461]">
                         Resumo Mensal
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg text-center text-xs font-bold text-green-800">
                         Dados p/ IR
                      </div>
                   </div>
                   <button className="w-full bg-[#0c2461] text-white py-2 rounded-lg text-sm font-bold">
                      + Novo Lançamento
                   </button>
                </div>
             </div>
          </div>
        </section>

        {/* COMPARATIVO FREE vs PRO */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold">Por que usar o App?</h3>
            <p className="opacity-80">Comece grátis e evolua conforme sua carreira cresce.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* FREE TIER */}
            <div className="bg-white border border-[#E8E3DC] rounded-xl p-8 relative">
              <div className="absolute top-0 right-0 bg-gray-200 text-[#0c2461] text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">GRÁTIS</div>
              <h4 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Music className="w-6 h-6 text-gray-400" /> Essencial
              </h4>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm opacity-90">
                  <Check className="w-5 h-5 text-green-500 shrink-0" /> Controle de Entradas e Saídas
                </li>
                <li className="flex gap-3 text-sm opacity-90">
                  <Check className="w-5 h-5 text-green-500 shrink-0" /> Categorias Musicais (Cachê, Aulas, Equipamento)
                </li>
                <li className="flex gap-3 text-sm opacity-90">
                  <Check className="w-5 h-5 text-green-500 shrink-0" /> Resumo Financeiro Simples
                </li>
                 <li className="flex gap-3 text-sm opacity-90">
                  <Check className="w-5 h-5 text-green-500 shrink-0" /> Acesso em qualquer dispositivo
                </li>
              </ul>
              <button onClick={openPwa} className="w-full mt-8 bg-gray-100 hover:bg-gray-200 text-[#0c2461] font-bold py-3 rounded-lg transition">
                Usar Grátis
              </button>
            </div>

            {/* PRO TIER */}
            <div className="bg-[#0c2461] text-white rounded-xl p-8 relative shadow-xl transform md:-translate-y-2">
              <div className="absolute top-0 right-0 bg-[#d4af37] text-[#0c2461] text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">RECOMENDADO</div>
              <h4 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-[#d4af37]" /> Profissional
              </h4>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0" /> Tudo do Grátis +
                </li>
                <li className="flex gap-3 text-sm opacity-90">
                  <FileText className="w-5 h-5 text-[#d4af37] shrink-0" /> <strong>Recibos e Contratos</strong> (com QR Code)
                </li>
                <li className="flex gap-3 text-sm opacity-90">
                  <Download className="w-5 h-5 text-[#d4af37] shrink-0" /> <strong>Exportação PDF/CSV</strong> para Contador
                </li>
                <li className="flex gap-3 text-sm opacity-90">
                  <ShieldCheck className="w-5 h-5 text-[#d4af37] shrink-0" /> <strong>Cálculo Carnê-Leão</strong> (DARF)
                </li>
              </ul>
              <Link href="/vendas">
                <button className="w-full mt-8 bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold py-3 rounded-lg transition shadow-md">
                  Virar PRO
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* PRO ACTIVATION / LOGIN */}
        <section id="ativar-app-pro" className="mb-12 pt-8 border-t border-[#E8E3DC]">
           <div className="bg-white border-2 border-[#d4af37] rounded-xl p-6 md:p-10 space-y-6 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 bg-[#d4af37] text-[#0c2461] text-xs font-bold px-3 py-1 rounded-bl-lg">ÁREA DO CLIENTE</div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold">Já comprou sua licença?</h3>
                <p className="text-[#0c2461] opacity-80">
                  Valide seu e-mail aqui ou diretamente dentro do app para desbloquear as funções exclusivas instantaneamente.
                </p>
                <div className="text-sm bg-blue-50 text-blue-800 p-3 rounded-lg inline-block">
                  <strong>Dica:</strong> Se já estiver logado no app, a liberação é automática!
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-[#E8E3DC]">
                {status !== 'idle' && (
                  <div className={`rounded-lg p-3 mb-4 border flex gap-3 items-start ${status === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                    {status === 'success' ? <CheckCircle2 className="w-5 h-5 text-green-700"/> : <ShieldCheck className="w-5 h-5 text-red-700"/>}
                    <p className="font-medium text-sm pt-0.5">{msg}</p>
                  </div>
                )}

                <div className="space-y-3">
                  <label className="text-sm font-bold text-[#0c2461]">E-mail de compra</label>
                  <input ref={emailRef} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ex: joao@gmail.com" className="w-full px-4 py-3 rounded-lg border border-[#E8E3DC] focus:ring-2 focus:ring-[#d4af37] outline-none bg-white" type="email" />
                  
                  <button onClick={validate} disabled={status === 'checking'} className="w-full bg-[#0c2461] hover:bg-[#1a3a7a] disabled:opacity-50 text-white font-bold px-6 py-3 rounded-lg transition flex items-center justify-center gap-2">
                    {status === 'checking' ? <Loader2 className="animate-spin" /> : 'Liberar Acesso PRO'}
                  </button>
                </div>

                {isPro && (
                  <button onClick={openPwa} className="w-full mt-3 bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-6 py-3 rounded-lg transition flex items-center justify-center gap-2 shadow-md">
                    🚀 Entrar no App AGORA <ExternalLink size={16}/>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}