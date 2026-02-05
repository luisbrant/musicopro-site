import { useEffect, useMemo, useRef, useState } from 'react';
import { Music, Menu, X, Check, ShieldCheck, Lock } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';

const PRO_API = 'https://www.musicopro.app.br/api/license/check';

// PWA (App grátis)
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

  const openPwa = () => {
    window.open(pwaUrlWithEmail, '_blank', 'noopener,noreferrer');
  };

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

      setSavedEmail(normalized);

      const ok = await verificarLicencaPorEmail(normalized);
      setIsPro(ok);

      if (ok) {
        setStatus('success');
        setMsg('✅ Licença ativa! Ao abrir o app, ele já entra em modo PRO.');
      } else {
        setStatus('inactive');
        setMsg('Licença não ativa para este e-mail. Verifique se usou o mesmo e-mail da compra.');
      }
    } catch (e) {
      console.error(e);
      setIsPro(false);
      setStatus('error');
      setMsg('Não foi possível validar agora. Tente novamente em instantes.');
    }
  };

  useEffect(() => {
    const saved = getSavedEmail().trim().toLowerCase();
    if (saved) setEmail(saved);

    // Se chegou com ?email=..., pré-preenche (vindo do Guia)
    try {
      const url = new URL(window.location.href);
      const qEmail = (url.searchParams.get('email') || '').trim().toLowerCase();
      if (qEmail) {
        setEmail(qEmail);
        setSavedEmail(qEmail);
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E8E3DC]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="w-8 h-8 text-[#d4af37]" />
            <div>
              <h1 className="font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                Músico Pro
              </h1>
              <p className="text-xs text-[#6ba587]">App (ferramenta prática)</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/">
              <button className="text-[#0c2461] hover:text-[#d4af37] transition font-medium">
                Home
              </button>
            </Link>
            <Link href="/guia">
              <button className="text-[#0c2461] hover:text-[#d4af37] transition font-medium">
                Guia
              </button>
            </Link>
            <button
              onClick={openPwa}
              className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-4 py-2 rounded-lg transition"
            >
              Abrir App grátis
            </button>
          </nav>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-[#0c2461]">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-[#0c2461] text-white p-4 space-y-2">
          <Link href="/">
            <button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">
              Home
            </button>
          </Link>
          <Link href="/guia">
            <button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">
              Guia
            </button>
          </Link>
          <button
            onClick={openPwa}
            className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition font-bold"
          >
            Abrir App grátis
          </button>
        </nav>
      )}

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Hero */}
        <section className="mb-10">
          <div className="bg-gradient-to-br from-[#0c2461] to-[#1a3a7a] rounded-lg p-8 md:p-12 text-white space-y-5">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">App do Músico Pro</h2>
            <p className="text-lg opacity-90">
              A ferramenta prática para registrar receitas/despesas e manter sua rotina organizada.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={openPwa}
                className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-6 py-3 rounded-lg transition"
              >
                📲 Abrir App grátis
              </button>

              <Link href="/guia">
                <button className="bg-transparent hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition border border-white/50">
                  📖 Ler o Guia
                </button>
              </Link>
            </div>

            <p className="text-xs opacity-80">
              Se o app não abrir, use o link alternativo:{' '}
              <a className="underline" href={PWA_FALLBACK_URL} target="_blank" rel="noopener noreferrer">
                abrir pelo caminho antigo
              </a>
              .
            </p>
          </div>
        </section>

        {/* O que o app faz */}
        <section className="mb-12 space-y-4">
          <h3 className="text-2xl font-bold text-[#0c2461]">O que o app faz</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Registrar recebimentos (PIX, cachês, aulas)',
              'Registrar despesas (instrumentos, transporte, etc.)',
              'Organizar mês a mês (rotina simples)',
              'Evitar esquecimentos no fim do ano'
            ].map((t) => (
              <div key={t} className="flex gap-3 bg-[#f0f4f8] p-4 rounded-lg">
                <Check className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <p className="text-[#0c2461]">{t}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ativação PRO do App */}
        <section id="ativar-app-pro" className="mb-12 space-y-4">
          <h3 className="text-2xl font-bold text-[#0c2461]">Ativar App PRO</h3>

          <div className="bg-[#f8fafc] border border-[#E8E3DC] rounded-lg p-6 space-y-4">
            <p className="text-[#0c2461] opacity-90">
              Digite o <strong>mesmo e-mail usado na compra</strong>. Se estiver ativo, ao abrir o app ele já entra em modo PRO.
            </p>

            {status !== 'idle' && (
              <div
                className={[
                  'rounded-lg p-4 border flex gap-3 items-start',
                  status === 'success'
                    ? 'bg-[#e8fff2] border-[#36b37e]'
                    : status === 'inactive'
                      ? 'bg-[#fff4e6] border-[#d4af37]'
                      : status === 'checking'
                        ? 'bg-[#eef6ff] border-[#2f6fed]'
                        : 'bg-[#fff1f2] border-[#ef4444]'
                ].join(' ')}
              >
                <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#0c2461]" />
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

            <div className="flex flex-col sm:flex-row gap-3 pt-1 items-center">
              {isPro ? (
                <button
                  onClick={openPwa}
                  className="w-full sm:w-auto bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-6 py-3 rounded-lg transition"
                >
                  🚀 Abrir App PRO agora
                </button>
              ) : (
                <div className="flex gap-2 items-center text-sm text-[#0c2461] opacity-80">
                  <Lock className="w-4 h-4" />
                  <span>Valide a licença para liberar o PRO.</span>
                </div>
              )}

              <Link href="/pro">
                <button className="w-full sm:w-auto bg-white border border-[#E8E3DC] hover:bg-[#f0f4f8] text-[#0c2461] font-semibold px-6 py-3 rounded-lg transition">
                  Comprar / Gerenciar
                </button>
              </Link>

              <Link href="/instalar">
                <button className="w-full sm:w-auto bg-white border border-[#E8E3DC] hover:bg-[#f0f4f8] text-[#0c2461] font-semibold px-6 py-3 rounded-lg transition">
                  Como instalar no celular
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
