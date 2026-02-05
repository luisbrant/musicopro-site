import { useEffect, useMemo, useRef, useState } from 'react';
import { Music, Menu, X, ShieldCheck, CheckCircle2, Loader2, ExternalLink } from 'lucide-react';
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
  "<h1>PARTE 1: FUNDAMENTOS</h1>\
  <h2>1. O Conceito de Renda para o Músico</h2>\
  <p>Para a Receita Federal, <strong>renda</strong> é todo valor recebido que aumenta seu patrimônio e não possui caráter de devolução.</p>\
  <h3>💰 Renda tributável na música:</h3>\
  <ul>\
    <li><strong>Cachês</strong> de shows (ao vivo/online)</li>\
    <li><strong>Direitos autorais</strong> e conexos</li>\
    <li><strong>Aulas</strong> particulares ou online</li>\
    <li><strong>Vendas</strong> de merchandising/produtos digitais</li>\
    <li><strong>Plataformas digitais</strong> (YouTube, Spotify)</li>\
    <li><strong>Participações</strong> em eventos</li>\
    <li><strong>Produções musicais</strong> para terceiros</li>\
  </ul>\
  <div class='box'>\
    <h4>🎯 Regra de Ouro</h4>\
    <p><strong>Cachês são SEMPRE renda tributável</strong>, independentemente de frequência, meio de pagamento, quem pagou ou valor individual.</p>\
  </div>\
  <h2>2. Obrigatoriedade da Declaração</h2>\
  <p><strong>Você DEVE declarar se:</strong></p>\
  <ol>\
    <li>Recebeu rendimentos tributáveis acima de R$ 30.639,90</li>\
    <li>Recebeu rendimentos isentos acima de R$ 200.000,00</li>\
    <li>Possui bens acima de R$ 800.000,00</li>\
    <li>Teve imposto retido na fonte (RPA)</li>\
    <li>Obteve ganho de capital na venda de bens</li>\
  </ol>\
  <div class='box'>\
    <p>A maioria dos músicos que buscam profissionalização precisa declarar. Declarar não significa pagar imposto — significa informar.</p>\
  </div>\
  <h2>3. Pix, Dinheiro e Transferência</h2>\
  <h3>❌ O MITO DO PIX</h3>\
  <p><strong>Não existe “imposto sobre Pix”.</strong> Pix é meio de pagamento. O imposto incide sobre a origem/natureza da renda.</p>\
  <div class='box'>\
    <p>A Receita cruza dados bancários, Pix, cartões e notas fiscais. O problema não é o Pix — é omitir renda.</p>\
  </div>";

const CONTENT_STYLE = `
  .guide-content h1 { font-size: 1.7rem; font-weight: 800; margin: 1.8rem 0 1rem; color: #0c2461; }
  .guide-content h2 { font-size: 1.25rem; font-weight: 800; margin: 1.4rem 0 .75rem; color: #0c2461; border-bottom: 1px solid #E8E3DC; padding-bottom: .35rem; }
  .guide-content h3 { font-size: 1.05rem; font-weight: 750; margin: 1.15rem 0 .5rem; color: #0c2461; }
  .guide-content h4 { font-size: 1rem; font-weight: 700; margin: .9rem 0 .4rem; color: #0c2461; }
  .guide-content p { line-height: 1.75; color: #0c2461; opacity: .92; margin: .55rem 0; }
  .guide-content ul, .guide-content ol { margin: .5rem 0 .9rem 1.1rem; color: #0c2461; opacity: .92; }
  .guide-content li { margin: .35rem 0; line-height: 1.65; }
  .guide-content .box { border: 1px solid #e8e3dc; border-left: 4px solid #d4af37; background: #fff; border-radius: 12px; padding: 14px; margin: 14px 0; }
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
      setMsg('Digite o e-mail usado na compra para validar.');
      scrollToValidate(true);
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
        setMsg('✅ Licença ativa! O pacote PRO libera Guia aprofundado + App PRO.');
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
    if (saved) setEmail(saved);
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
              <p className="text-xs text-[#6ba587]">Guia</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/"><button className="text-[#0c2461] hover:text-[#d4af37] transition font-medium">Home</button></Link>
            <Link href="/app"><button className="text-[#0c2461] hover:text-[#d4af37] transition font-medium">App</button></Link>
            <button
              onClick={() => scrollToValidate(!email)}
              className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-4 py-2 rounded-lg transition"
            >
              Ativar pacote
            </button>
          </nav>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-[#0c2461]">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <nav className="md:hidden bg-[#0c2461] text-white p-4 space-y-2">
          <Link href="/"><button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">Home</button></Link>
          <Link href="/app"><button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">App</button></Link>
          <button
            onClick={() => { setMobileMenuOpen(false); scrollToValidate(true); }}
            className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition font-bold"
          >
            Ativar pacote
          </button>
        </nav>
      )}

      {/* ✅ mais largo no notebook */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <section className="mb-10 space-y-5">
          <div className="bg-gradient-to-br from-[#0c2461] to-[#1a3a7a] rounded-lg p-8 md:p-12 text-white space-y-5">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">Guia do Músico Autônomo</h2>
            <p className="text-lg opacity-90">
              Aqui fica o <strong>conteúdo grátis</strong>. O PRO é um pacote completo:
              <strong> Guia aprofundado + App com todas as funções PRO</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={() => scrollToValidate(!email)}
                className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-6 py-3 rounded-lg transition"
              >
                🔓 Ativar pacote PRO
              </button>

              <Link href="/guia-pro">
                <button className="bg-transparent hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition border border-white/50">
                  Ver Guia PRO completo
                </button>
              </Link>

              <Link href="/app">
                <button className="bg-transparent hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition border border-white/50">
                  Ir para o App
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Ativação */}
        <section id="validar-guia-pro" className="mb-12 space-y-4">
          <h3 className="text-2xl font-bold text-[#0c2461]">Ativar pacote PRO (Guia + App)</h3>

          <div className="bg-[#f8fafc] border border-[#E8E3DC] rounded-lg p-6 space-y-4">
            <p className="text-[#0c2461] opacity-90">
              Digite o <strong>mesmo e-mail usado na compra</strong>. O PRO libera:
              <strong> Guia aprofundado</strong> + <strong>App com todas as funções PRO</strong>.
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
                        : 'bg-[#fff1f2] border-[#ef4444]',
                ].join(' ')}
              >
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

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Link href="/guia-pro">
                <button className="w-full sm:w-auto bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-6 py-3 rounded-lg transition flex items-center justify-center gap-2">
                  Abrir Guia PRO completo <ExternalLink className="w-4 h-4" />
                </button>
              </Link>

              <Link href={appActivationLink}>
                <button className="w-full sm:w-auto bg-white border border-[#E8E3DC] hover:bg-[#f0f4f8] text-[#0c2461] font-semibold px-6 py-3 rounded-lg transition">
                  Ativar no App
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Conteúdo grátis */}
        <section className="mb-14 space-y-4">
          <h3 className="text-3xl font-bold text-[#0c2461]">Conteúdo grátis</h3>

          <div className="bg-[#f0f4f8] rounded-lg p-6 md:p-8">
            <div className="guide-content" dangerouslySetInnerHTML={{ __html: GUIDE_FREE_HTML }} />
          </div>
        </section>
      </main>

      {/* ✅ Footer fora do main */}
      <Footer />
    </div>
  );
}
