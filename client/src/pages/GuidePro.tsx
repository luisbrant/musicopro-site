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

const CONTENT_STYLE = `
  .guide-content h1 { font-size: 1.7rem; font-weight: 800; margin: 1.8rem 0 1rem; color: #0c2461; }
  .guide-content h2 { font-size: 1.25rem; font-weight: 800; margin: 1.4rem 0 .75rem; color: #0c2461; border-bottom: 1px solid #E8E3DC; padding-bottom: .35rem; }
  .guide-content h3 { font-size: 1.05rem; font-weight: 750; margin: 1.15rem 0 .5rem; color: #0c2461; }
  .guide-content h4 { font-size: 1rem; font-weight: 700; margin: .9rem 0 .4rem; color: #0c2461; }
  .guide-content p { line-height: 1.75; color: #0c2461; opacity: .92; margin: .55rem 0; }
  .guide-content ul, .guide-content ol { margin: .5rem 0 .9rem 1.1rem; color: #0c2461; opacity: .92; }
  .guide-content li { margin: .35rem 0; line-height: 1.65; }
  .guide-content code { background: #f1f5f9; padding: 2px 6px; border-radius: 6px; font-size: .9em; }
  .guide-content table { width: 100%; border-collapse: collapse; margin: 1rem 0; font-size: .95rem; border-radius: 12px; overflow: hidden; }
  .guide-content th { background: #0c2461; color: #fff; text-align: left; padding: 10px 12px; }
  .guide-content td { border: 1px solid #e8e3dc; padding: 10px 12px; vertical-align: top; }
  .guide-content tr:nth-child(even) td { background: #f8fafc; }
  .guide-content .box { border: 1px solid #e8e3dc; border-left: 4px solid #d4af37; background: #fff; border-radius: 12px; padding: 14px; margin: 14px 0; }
`;

/**
 * ✅ Aqui é onde você vai colar o seu HTML PRO abrangente (quando quiser).
 * Por enquanto, deixo um bloco base + rodapé 2026.
 */
const GUIDE_PRO_HTML_BASE =
  "<h1>Guia PRO (conteúdo completo)</h1>\
  <p>Este é o espaço do seu conteúdo PRO abrangente.</p>\
  <div class='box'>\
    <p><strong>Importante:</strong> A licença PRO é um pacote completo: <strong>Guia aprofundado + App com todas as funções PRO</strong>.</p>\
  </div>";

const GUIDE_FOOTER_2026 =
  "<div style='margin-top: 40pt; padding-top: 20pt; border-top: 2pt solid #e2e8f0; text-align: center; font-size: 9pt; color: #64748b;'>\
    <p><strong>Guia Essencial do IR para Músicos Autônomos</strong></p>\
    <p>Versão 2.0 | Janeiro/2026 | Base Legal: Ano-calendário 2025</p>\
    <p style='margin-top: 15pt;'>© 2026 | Todos os direitos reservados</p>\
    <p>Este material tem caráter educativo. Consulte contador para casos específicos.</p>\
  </div>";

export default function GuidePro() {
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

  const validate = async () => {
    const normalized = email.trim().toLowerCase();
    setEmail(normalized);

    if (!normalized) {
      setStatus('error');
      setMsg('Digite o e-mail usado na compra para validar.');
      emailRef.current?.focus();
      return;
    }

    try {
      setStatus('checking');
      setMsg('Validando sua licença…');
      setProEmail(normalized);

      const ok = await verificarLicencaPorEmail(normalized);
      setIsPro(ok);

      if (ok) {
        setStatus('success');
        setMsg('✅ Licença ativa! Guia PRO liberado.');
      } else {
        setStatus('inactive');
        setMsg('Licença não ativa para este e-mail. Verifique se é o mesmo e-mail da compra.');
      }
    } catch (e) {
      console.error(e);
      setIsPro(false);
      setStatus('error');
      setMsg('Não foi possível validar agora. Tente novamente em instantes.');
    }
  };

  useEffect(() => {
    const saved = getProEmail().trim().toLowerCase();
    if (saved) {
      setEmail(saved);
      // tentativa automática
      (async () => {
        try {
          setStatus('checking');
          setMsg('Validando sua licença…');
          const ok = await verificarLicencaPorEmail(saved);
          setIsPro(ok);
          setStatus(ok ? 'success' : 'inactive');
          setMsg(ok ? '✅ Licença ativa! Guia PRO liberado.' : 'Licença não ativa para este e-mail.');
        } catch {
          setIsPro(false);
          setStatus('idle');
        }
      })();
    }
  }, []);

  const fullHtml = useMemo(() => {
    return `${GUIDE_PRO_HTML_BASE}${GUIDE_FOOTER_2026}`;
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <style>{CONTENT_STYLE}</style>

      <header className="sticky top-0 z-40 bg-white border-b border-[#E8E3DC]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="w-8 h-8 text-[#d4af37]" />
            <div>
              <h1 className="font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                Músico Pro
              </h1>
              <p className="text-xs text-[#6ba587]">Guia PRO completo</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/"><button className="text-[#0c2461] hover:text-[#d4af37] transition font-medium">Home</button></Link>
            <Link href="/guia"><button className="text-[#0c2461] hover:text-[#d4af37] transition font-medium">Guia</button></Link>
            <Link href="/app"><button className="text-[#0c2461] hover:text-[#d4af37] transition font-medium">App</button></Link>
            <Link href="/guia#validar-guia-pro">
              <button className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-4 py-2 rounded-lg transition">
                Ativar pacote
              </button>
            </Link>
          </nav>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-[#0c2461]">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <nav className="md:hidden bg-[#0c2461] text-white p-4 space-y-2">
          <Link href="/"><button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">Home</button></Link>
          <Link href="/guia"><button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">Guia</button></Link>
          <Link href="/app"><button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">App</button></Link>
          <Link href="/guia#validar-guia-pro"><button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition font-bold">Ativar pacote</button></Link>
        </nav>
      )}

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {!isPro && (
          <div className="bg-[#fff4e6] border-2 border-[#d4af37] rounded-lg p-6 md:p-8 space-y-4 mb-8">
            <div className="flex gap-3">
              <Lock className="w-6 h-6 text-[#d4af37] flex-shrink-0 mt-1" />
              <div>
                <p className="text-[#0c2461] font-bold text-lg">Conteúdo PRO bloqueado</p>
                <p className="text-[#0c2461] opacity-90">
                  Valide sua licença. O PRO é um pacote completo: <strong>Guia aprofundado + App PRO</strong>.
                </p>
              </div>
            </div>

            {status !== 'idle' && (
              <div className="rounded-lg p-4 border bg-white flex gap-3 items-start">
                {status === 'checking' ? (
                  <Loader2 className="w-5 h-5 flex-shrink-0 mt-0.5 animate-spin text-[#0c2461]" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#0c2461]" />
                )}
                <div>
                  <p className="font-semibold text-[#0c2461]">
                    {status === 'checking'
                      ? 'Validando…'
                      : status === 'success'
                        ? 'Acesso PRO confirmado'
                        : status === 'inactive'
                          ? 'Licença não ativa'
                          : 'Falha na validação'}
                  </p>
                  <p className="text-sm text-[#0c2461] opacity-80">{msg}</p>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-[1fr_auto] gap-3">
              <input
                ref={emailRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu e-mail (usado na compra)"
                className="w-full px-4 py-3 rounded-lg border border-[#E8E3DC] focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                type="email"
                autoComplete="email"
              />

              <button
                onClick={validate}
                disabled={status === 'checking'}
                className="bg-[#0c2461] hover:bg-[#1a3a7a] disabled:opacity-60 text-white font-bold px-6 py-3 rounded-lg transition"
              >
                {status === 'checking' ? 'Validando…' : 'Validar licença'}
              </button>
            </div>

            <Link href={appActivationLink}>
              <button className="w-full bg-white border border-[#E8E3DC] hover:bg-[#f0f4f8] text-[#0c2461] font-semibold px-6 py-3 rounded-lg transition">
                Ativar no App
              </button>
            </Link>
          </div>
        )}

        {isPro && (
          <div className="bg-white border border-[#E8E3DC] rounded-lg p-6 md:p-10">
            <div className="guide-content" dangerouslySetInnerHTML={{ __html: fullHtml }} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
