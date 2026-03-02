import { useEffect, useMemo, useRef, useState } from 'react';
import { Music, Menu, X, CheckCircle2, Loader2, ExternalLink, BookOpen, Lightbulb, Calculator, ArrowRight, Lock, FileText, Smartphone } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';

const PRO_API = 'https://www.musicopro.app.br/api/license/check';
const getProEmail = () => localStorage.getItem('musicopro_email') || '';
const setProEmail = (email: string) => localStorage.setItem('musicopro_email', email);

async function verificarLicencaPorEmail(email: string, transaction: string): Promise<boolean> {
  const res = await fetch(PRO_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, transaction })
  });
  const data = await res.json();
  return data?.active === true;
}

type Status = 'idle' | 'checking' | 'success' | 'inactive' | 'error';

const GUIDE_FREE_HTML =
  "<h2>Parte 1: Fundamentos do Imposto para Músicos</h2>\
  <p>Para a Receita Federal, <span class='highlight' style='background-color:#fef3c7; padding:2px 4px; border-radius:4px; font-weight:bold;'>renda</span> é todo valor recebido que aumenta seu patrimônio e não possui caráter de devolução.</p>\
\
  <h3>💰 Renda tributável na música:</h3>\
  <ul>\
      <li><strong>Cachês</strong> de shows (ao vivo/online)</li>\
      <li><strong>Direitos autorais</strong> e conexos</li>\
      <li><strong>Aulas</strong> particulares ou online</li>\
      <li><strong>Vendas</strong> de merchandising/produtos digitais</li>\
      <li><strong>Plataformas digitais</strong> (YouTube, Spotify)</li>\
      <li><strong>Participações</strong> em eventos</li>\
  </ul>\
\
  <div class='box success'>\
      <h4>🎯 Regra de Ouro</h4>\
      <p><strong>Cachês são SEMPRE renda tributável</strong>, independentemente de: frequência, meio de pagamento, quem pagou, ou valor individual.</p>\
  </div>\
\
  <h3>2. Obrigatoriedade da Declaração</h3>\
  <p><strong>Você DEVE declarar se (regras 2026 / ano-base 2025):</strong></p>\
  <ol style='margin-left:1.5rem; margin-bottom:1rem;'>\
      <li>Recebeu rendimentos tributáveis acima de R$ 33.888,00 no ano</li>\
      <li>Recebeu rendimentos isentos acima de R$ 200.000,00</li>\
      <li>Possui bens acima de R$ 800.000,00</li>\
      <li>Teve imposto retido na fonte (RPA)</li>\
  </ol>\
\
  <div class='box tip'>\
      <p>A maioria dos músicos que buscam profissionalização precisa declarar. A declaração não significa pagamento de imposto, mas sim obrigação de informar e justificar o aumento do seu patrimônio (como a compra de um instrumento caro).</p>\
  </div>\
\
  <h3>3. Meios de Recebimento: O Mito do Pix</h3>\
  <p><strong>Não existe \"imposto sobre Pix\".</strong> O Pix é apenas meio de pagamento. O imposto incide sobre a origem e natureza do dinheiro (seus cachês).</p>\
\
  <div class='box warning'>\
      <p>A Receita Federal cruza dados bancários, transferências Pix, cartões e notas fiscais. A falta de declaração de milhares de reais recebidos via Pix pode levar à presunção de renda omitida, com multas altíssimas.</p>\
      <p><strong>O problema não é o Pix. O problema é a omissão de renda.</strong></p>\
  </div>\
\
  <h3>4. Pessoa Física (PF) vs. Pessoa Jurídica (PJ)</h3>\
  <p>Qual regime você se encaixa hoje?</p>\
  <table style='width:100%; text-align:left; border-collapse:collapse; margin-top:1rem; margin-bottom:1rem; border:1px solid #e2e8f0; font-size:0.9rem;'>\
      <thead>\
          <tr style='background-color:#f1f5f9;'>\
              <th style='padding:0.5rem; border:1px solid #e2e8f0;'>Situação</th>\
              <th style='padding:0.5rem; border:1px solid #e2e8f0;'>Modelo</th>\
              <th style='padding:0.5rem; border:1px solid #e2e8f0;'>Tributação</th>\
          </tr>\
      </thead>\
      <tbody>\
          <tr>\
              <td style='padding:0.5rem; border:1px solid #e2e8f0;'>Músico Autônomo (Cachês Eventuais, Aulas Particulares)</td>\
              <td style='padding:0.5rem; border:1px solid #e2e8f0;'>PF</td>\
              <td style='padding:0.5rem; border:1px solid #e2e8f0;'>Carnê-Leão mensal obrigatório</td>\
          </tr>\
          <tr>\
              <td style='padding:0.5rem; border:1px solid #e2e8f0;'>Músico MEI (Baixo Faturamento)</td>\
              <td style='padding:0.5rem; border:1px solid #e2e8f0;'>Microempreendedor Individual</td>\
              <td style='padding:0.5rem; border:1px solid #e2e8f0;'>Aberto ~R$ 77/mês Fixo</td>\
          </tr>\
      </tbody>\
  </table>\
  <p>Enquanto você for Pessoa Física (CPF), a lei te obriga a usar o <strong>Carnê-Leão e o Livro Caixa</strong>. É no Livro Caixa que moram as Deduções Legais — Onde você legalmente abate seus gastos para pagar menos imposto. Isso você aprende a fundo no Pacote PRO.</p>";

const CONTENT_STYLE = `
  .guide-content h2 { font-size: 1.5rem; font-weight: 800; margin: 2rem 0 1rem; color: #0c2461; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem; }
  .guide-content h3 { font-size: 1.25rem; font-weight: 700; margin: 1.5rem 0 .5rem; color: #0c2461; display: flex; align-items: center; gap: 8px; }
  .guide-content h4 { font-size: 1rem; font-weight: 800; margin: 0 0 .5rem; color: inherit; }
  .guide-content p { line-height: 1.75; color: #334155; margin: .75rem 0; font-size: 1.05rem; }
  .guide-content ul { margin: .5rem 0 1rem 1.2rem; color: #334155; list-style-type: disc; }
  .guide-content li { margin: .35rem 0; line-height: 1.6; }
  .guide-content code { background: #f1f5f9; padding: 2px 8px; border-radius: 4px; font-family: monospace; color: #d4af37; font-weight: 700; border: 1px solid #e2e8f0; }
  .guide-content .box { border-radius: 8px; padding: 1.5rem; margin: 2rem 0; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
  .guide-content .box.success { background-color: #f0fdf4; border: 1px solid #bbf7d0; border-left: 4px solid #16a34a; color: #166534; }
  .guide-content .box.tip { background-color: #eff6ff; border: 1px solid #bfdbfe; border-left: 4px solid #3b82f6; color: #1e3a8a; }
  .guide-content .box.warning { background-color: #fffbeb; border: 1px solid #fde68a; border-left: 4px solid #d97706; color: #92400e; }
  .guide-content .box p { color: inherit; margin-bottom: 0; }
`;

export default function Guide() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [transaction, setTransaction] = useState('');
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
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedTx = transaction.trim().toUpperCase();
    setEmail(normalizedEmail);
    setTransaction(normalizedTx);

    if (!normalizedEmail || !normalizedTx.startsWith('HP')) {
      setStatus('error');
      setMsg('Digite o e-mail e o código da transação da Hotmart.');
      scrollToValidate(true);
      return;
    }
    try {
      setStatus('checking');
      setMsg('Validando…');
      setProEmail(normalizedEmail);
      const ok = await verificarLicencaPorEmail(normalizedEmail, normalizedTx);
      setIsPro(ok);
      if (ok) {
        setStatus('success');
        setMsg('✅ Pacote Músico Pro ativo! Guia PRO + App PRO liberados.');
      } else {
        setStatus('inactive');
        setMsg('Dados incorretos ou licença inativa. Verifique seu recibo.');
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
                Aprenda a sobreviver ao leão sem precisar de contador. <br />
                Para automatizar tudo isso, use o <strong>App Músico Pro</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link href="/app">
                  <button className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-6 py-3 rounded-lg transition flex items-center gap-2">
                    <Smartphone size={20} /> Testar o App Grátis
                  </button>
                </Link>
                <button onClick={() => scrollToValidate(!email)} className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition border border-white/20">
                  Acessar Guia PRO
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
              <div className="bg-blue-100 p-3 rounded-full h-fit"><Lightbulb className="w-6 h-6 text-[#0c2461]" /></div>
              <div>
                <h4 className="font-bold text-[#0c2461] mb-1">O Guia ensina:</h4>
                <p className="text-sm text-gray-600">"Liste suas despesas dedutíveis para abater o imposto."</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E8E3DC] flex gap-4 relative overflow-hidden">
              <div className="absolute right-0 top-0 bg-[#d4af37] text-[10px] font-bold px-2 py-1 text-[#0c2461] rounded-bl">APP</div>
              <div className="bg-yellow-100 p-3 rounded-full h-fit"><Calculator className="w-6 h-6 text-[#d4af37]" /></div>
              <div>
                <h4 className="font-bold text-[#0c2461] mb-1">O App faz:</h4>
                <p className="text-sm text-gray-600">Calcula automaticamente o Carnê-Leão baseado nos seus lançamentos.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E8E3DC] flex gap-4">
              <div className="bg-blue-100 p-3 rounded-full h-fit"><FileText className="w-6 h-6 text-[#0c2461]" /></div>
              <div>
                <h4 className="font-bold text-[#0c2461] mb-1">O Guia ensina:</h4>
                <p className="text-sm text-gray-600">"Tenha comprovantes organizados e profissionalismo."</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E8E3DC] flex gap-4 relative overflow-hidden">
              <div className="absolute right-0 top-0 bg-[#d4af37] text-[10px] font-bold px-2 py-1 text-[#0c2461] rounded-bl">APP</div>
              <div className="bg-yellow-100 p-3 rounded-full h-fit"><CheckCircle2 className="w-6 h-6 text-[#d4af37]" /></div>
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
                    <h4 className="text-2xl font-bold text-[#0c2461]">O que você vai descobrir no PRO</h4>
                    <p className="text-gray-600">Este guia gratuito é só o começo. Assinantes PRO têm acesso imediato a:</p>
                    <ul className="space-y-3">
                      <li className="flex gap-2 text-sm text-[#0c2461] font-medium"><CheckCircle2 size={18} className="text-[#d4af37]" /> 10 Capítulos Avançados (MEI, RPA e mais)</li>
                      <li className="flex gap-2 text-sm text-[#0c2461] font-medium"><CheckCircle2 size={18} className="text-[#d4af37]" /> 5 Casos Reais de Músicos (Com DARF real)</li>
                      <li className="flex gap-2 text-sm text-[#0c2461] font-medium"><CheckCircle2 size={18} className="text-[#d4af37]" /> Tabela Prática de Deduções Aceitas</li>
                      <li className="flex gap-2 text-sm text-[#0c2461] font-medium"><CheckCircle2 size={18} className="text-[#d4af37]" /> Ferramentas de Orçamento e Contratos no App</li>
                    </ul>
                    <Link href="/vendas">
                      <button className="text-[#0c2461] underline text-sm hover:text-[#d4af37] font-bold">
                        Quero Assinar o PRO
                      </button>
                    </Link>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <div className="text-center mb-4">
                      <p className="font-bold text-[#0c2461]">Já comprou?</p>
                      <p className="text-xs text-gray-500">Valide seu e-mail para desbloquear</p>
                    </div>

                    {status !== 'idle' && (
                      <div className={`rounded-lg p-3 mb-3 border flex gap-3 items-start ${status === 'success' ? 'bg-green-50 border-green-200' :
                        status === 'error' ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'
                        }`}>
                        {status === 'checking' ? <Loader2 className="animate-spin w-4 h-4 text-[#0c2461]" /> : <CheckCircle2 className="w-4 h-4 text-[#0c2461]" />}
                        <p className="font-medium text-xs pt-0.5">{msg}</p>
                      </div>
                    )}

                    <div className="space-y-3">
                      <input ref={emailRef} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail da compra" className="w-full px-4 py-3 rounded-lg border border-[#E8E3DC] focus:ring-2 focus:ring-[#d4af37] outline-none" type="email" />
                      <input value={transaction} onChange={(e) => setTransaction(e.target.value)} placeholder="Código Transação (Ex: HP...)" className="w-full px-4 py-3 rounded-lg border border-[#E8E3DC] focus:ring-2 focus:ring-[#d4af37] outline-none" type="text" />
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