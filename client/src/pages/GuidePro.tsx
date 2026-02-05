import { useEffect, useMemo, useRef, useState } from 'react';
import { Music, Menu, X, Lock, Loader2, CheckCircle2 } from 'lucide-react';
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

const GUIDE_PRO_HTML_BASE =
  "<h1>Guia PRO (Aprofundado)</h1>\
  <p>Parabéns por investir na sua carreira. Este é o conteúdo avançado do <strong>Pacote Músico Pro</strong>.</p>\
  <div class='box'>\
    <p><strong>Status:</strong> ✅ Licença Ativa. <br/>Você também tem acesso total ao app <strong>MusicoPro</strong>.</p>\
  </div>";

const GUIDE_FOOTER_2026 =
  "<div style='margin-top: 40pt; padding-top: 20pt; border-top: 2pt solid #e2e8f0; text-align: center; font-size: 9pt; color: #64748b;'>\
    <p><strong>Pacote Músico Pro</strong></p>\
    <p>Versão 2.1 | Base Legal 2025/2026</p>\
  </div>";

const CONTENT_STYLE = `
  .guide-content h1 { font-size: 2rem; font-weight: 800; margin: 1.5rem 0 1rem; color: #0c2461; }
  .guide-content p { line-height: 1.75; color: #334155; margin: .75rem 0; }
  .guide-content .box { border: 1px solid #e2e8f0; border-left: 4px solid #d4af37; background: #fff; border-radius: 8px; padding: 1.5rem; margin: 2rem 0; }
`;

export default function GuidePro() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [msg, setMsg] = useState('');
  const [isPro, setIsPro] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const validate = async () => {
    const normalized = email.trim().toLowerCase();
    setEmail(normalized);
    if (!normalized) { setStatus('error'); setMsg('Digite o e-mail da compra.'); return; }
    try {
      setStatus('checking'); setMsg('Validando...'); setProEmail(normalized);
      const ok = await verificarLicencaPorEmail(normalized);
      setIsPro(ok);
      if (ok) { setStatus('success'); setMsg('✅ Acesso Liberado!'); } 
      else { setStatus('inactive'); setMsg('Licença não encontrada.'); }
    } catch { setIsPro(false); setStatus('error'); }
  };

  useEffect(() => {
    const saved = getProEmail().trim().toLowerCase();
    if (saved) {
      setEmail(saved);
      (async () => {
        try {
          setStatus('checking');
          const ok = await verificarLicencaPorEmail(saved);
          setIsPro(ok);
          setStatus(ok ? 'success' : 'inactive');
          setMsg(ok ? '✅ Acesso Confirmado' : 'Sessão expirada.');
        } catch { setStatus('idle'); }
      })();
    }
  }, []);

  const fullHtml = useMemo(() => `${GUIDE_PRO_HTML_BASE}${GUIDE_FOOTER_2026}`, []);

  return (
    <div className="min-h-screen bg-white font-sans text-[#0c2461]">
      <style>{CONTENT_STYLE}</style>

      <header className="sticky top-0 z-40 bg-white border-b border-[#E8E3DC]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="w-8 h-8 text-[#d4af37]" />
            <div>
              <h1 className="font-bold text-xl leading-none" style={{ fontFamily: 'Lexend, sans-serif' }}>Músico Pro</h1>
              <p className="text-[10px] uppercase tracking-wider text-[#d4af37] font-bold">Área VIP</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/"><button className="hover:text-[#d4af37] transition font-medium">Home</button></Link>
            <Link href="/guia"><button className="hover:text-[#d4af37] transition font-medium">Guia Grátis</button></Link>
            <Link href="/app"><button className="hover:text-[#d4af37] transition font-medium">MusicoPro</button></Link>
          </nav>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <nav className="md:hidden bg-[#0c2461] text-white p-4 space-y-2">
           <Link href="/"><button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">Home</button></Link>
           <Link href="/guia"><button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">Guia Grátis</button></Link>
        </nav>
      )}

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {!isPro ? (
          <div className="bg-red-50 border-2 border-red-100 rounded-xl p-8 text-center space-y-6">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold">Conteúdo Bloqueado</h2>
            <p className="opacity-80 max-w-md mx-auto">
              Este conteúdo faz parte do <strong>Pacote Músico Pro</strong>. Valide sua licença abaixo para acessar o Guia Completo e liberar o App.
            </p>
            
            <div className="max-w-md mx-auto space-y-3">
              <input ref={emailRef} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Seu e-mail de compra" className="w-full px-4 py-3 rounded-lg border border-[#E8E3DC] focus:outline-none focus:ring-2 focus:ring-[#d4af37]"/>
              <button onClick={validate} disabled={status === 'checking'} className="w-full bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold px-6 py-3 rounded-lg transition">
                {status === 'checking' ? 'Validando...' : 'Liberar Acesso'}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-[#E8E3DC] rounded-xl p-8 md:p-12 shadow-sm">
             <div className="guide-content" dangerouslySetInnerHTML={{ __html: fullHtml }} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}