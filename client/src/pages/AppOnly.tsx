import { useEffect, useMemo, useRef, useState } from 'react';
import { Music, Menu, X, Check, ShieldCheck, Lock, ExternalLink, CheckCircle2, Loader2, Smartphone, FileText, Database, HardDrive, Download, Bot, Zap, Key } from 'lucide-react';
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
            <div className="inline-flex items-center gap-2 bg-blue-100 text-[#0c2461] px-3 py-1 rounded-full text-sm font-bold mb-2">
              <ShieldCheck size={16}/> Conformidade LGPD
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              O controle financeiro que <span className="text-[#d4af37]">toca no seu ritmo</span>.
            </h2>
            <p className="text-lg opacity-80">
              Esqueça planilhas. Lance seus cachês em segundos, gere recibos na hora e saiba quanto pagar de imposto.
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
              <Lock size={14} className="text-green-600"/> Dados locais. Sem login, sem vazamentos.
            </p>
          </div>

          {/* SECURITY CARD NOTICE */}
          <div className="bg-[#f0f4f8] rounded-2xl p-6 border border-[#E8E3DC] shadow-inner space-y-4 relative">
             <div className="absolute top-4 right-4 bg-white border border-[#d4af37] px-2 py-1 rounded text-[10px] font-bold text-[#0c2461] flex items-center gap-1">
               <ShieldCheck size={12} className="text-[#d4af37]"/> LGPD OK
             </div>
             
             <h3 className="font-bold flex items-center gap-2 text-[#0c2461]"><Database className="text-[#d4af37]"/> Como salvamos seus dados?</h3>
             <p className="text-sm text-gray-600">
                O MusicoPro utiliza uma tecnologia moderna chamada <strong>Local Storage</strong>.
             </p>
             <ul className="space-y-3">
                <li className="flex gap-2 text-sm bg-white p-3 rounded shadow-sm">
                   <Lock className="w-5 h-5 text-green-600 shrink-0"/>
                   <span><strong>Privacidade Total:</strong> Seus dados ficam gravados no navegador deste aparelho. Nós não temos acesso a nada.</span>
                </li>
                <li className="flex gap-2 text-sm bg-white p-3 rounded shadow-sm">
                   <HardDrive className="w-5 h-5 text-blue-600 shrink-0"/>
                   <span><strong>Backup Manual:</strong> Como não temos acesso aos seus dados, você é o dono do backup. Use a função <strong>"Exportar Dados"</strong> no app mensalmente.</span>
                </li>
             </ul>
          </div>
        </section>

        {/* FEATURES LIST */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Funcionalidades do App</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#f8fafc] p-4 rounded-lg flex gap-3 items-start border border-[#E8E3DC]">
              <Download className="w-5 h-5 text-[#d4af37] mt-1"/> 
              <div>
                <span className="font-bold block">Relatórios Completos</span>
                <span className="text-sm opacity-80">Exporte PDF/CSV para seu contador. Busca avançada por mês e lançamento.</span>
              </div>
            </div>
            <div className="bg-[#f8fafc] p-4 rounded-lg flex gap-3 items-start border border-[#E8E3DC]">
              <FileText className="w-5 h-5 text-[#d4af37] mt-1"/> 
              <div>
                <span className="font-bold block">Gerador de Documentos</span>
                <span className="text-sm opacity-80">Recibos profissionais e Contratos Express com QR Code de segurança.</span>
              </div>
            </div>
             <div className="bg-[#f8fafc] p-4 rounded-lg flex gap-3 items-start border border-[#E8E3DC]">
              <Bot className="w-5 h-5 text-[#d4af37] mt-1"/> 
              <div>
                <span className="font-bold block">Consultor IA</span>
                <span className="text-sm opacity-80">Estratégias para seu negócio musical e dúvidas fiscais.</span>
              </div>
            </div>
            <div className="bg-[#f8fafc] p-4 rounded-lg flex gap-3 items-start border border-[#E8E3DC]">
              <Zap className="w-5 h-5 text-[#d4af37] mt-1"/> 
              <div>
                <span className="font-bold block">Offline First</span>
                <span className="text-sm opacity-80">Funciona mesmo sem internet. Seus dados estão sempre com você.</span>
              </div>
            </div>
          </div>
        </section>

        {/* PRO ACTIVATION */}
        <section id="ativar-app-pro" className="mb-12 pt-8 border-t border-[#E8E3DC]">
           <div className="bg-white border-2 border-[#d4af37] rounded-xl p-6 md:p-8 space-y-6 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 bg-[#d4af37] text-[#0c2461] text-xs font-bold px-3 py-1 rounded-bl-lg">ÁREA PRO</div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Liberar Funções PRO</h3>
              <p className="text-[#0c2461] opacity-80">
                Digite o e-mail da compra para desbloquear os recursos premium.
              </p>
            </div>

            {/* Aviso de Segurança */}
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex gap-3 text-sm text-[#0c2461]">
               <Key className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
               <div>
                 <p className="font-bold mb-1">Para que serve o e-mail?</p>
                 <p className="opacity-80">
                   Apenas para verificar sua licença. <strong>Não é um login de dados.</strong> Seus lançamentos continuam salvos apenas no seu dispositivo.
                 </p>
               </div>
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
                🚀 Abrir App Completo (PRO Ativo) <ExternalLink size={18}/>
              </button>
            ) : (
               <div className="text-center pt-2">
                <Link href="/vendas">
                  <span className="text-[#0c2461] underline text-sm cursor-pointer hover:text-[#d4af37]">Ainda não tem licença? Clique aqui para comprar.</span>
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