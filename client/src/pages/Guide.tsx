import { useEffect, useRef, useState } from 'react';
import { Music, Menu, X, Lock, Check, ShieldCheck } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';

/* =====================================================
   CONFIG — IGUAL AO PWA
===================================================== */
const PRO_API = 'https://www.musicopro.app.br/api/license/check';

// App grátis (PWA) — URL principal + fallback (se houver deploy antigo)
const APP_URL = 'https://app.musicopro.app.br';
const APP_FALLBACK_URL = 'https://app.musicopro.app.br/pwa/index.html';

const getProEmail = () => localStorage.getItem('musicopro_email') || '';
const setProEmail = (email: string) => localStorage.setItem('musicopro_email', email);
const setProActive = (active: boolean) =>
  localStorage.setItem('musicopro_pro', active ? 'true' : 'false');

async function verificarLicencaPorEmail(email: string): Promise<boolean> {
  const res = await fetch(`${PRO_API}?email=${encodeURIComponent(email)}`);
  const data = await res.json();
  return data?.active === true;
}

type ValidationStatus = 'idle' | 'checking' | 'success' | 'inactive' | 'error';

export default function Guide() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isPro, setIsPro] = useState(false);
  const [email, setEmail] = useState('');

  const [checkedLicense, setCheckedLicense] = useState(false);
  const [justActivated, setJustActivated] = useState(false);

  const [status, setStatus] = useState<ValidationStatus>('idle');
  const [statusMsg, setStatusMsg] = useState('');

  const emailInputRef = useRef<HTMLInputElement | null>(null);

  const scrollToValidate = (focus = false) => {
    const el = document.getElementById('validar-licenca');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (focus) {
      setTimeout(() => emailInputRef.current?.focus(), 300);
    }
  };

  const applyProUI = (ok: boolean) => {
    setProActive(ok);

    if (ok) {
      document.body.classList.add('pro-enabled');
      setIsPro(true);
    } else {
      document.body.classList.remove('pro-enabled');
      setIsPro(false);
    }
  };

  const validate = async (rawEmail: string) => {
    const normalized = rawEmail.trim().toLowerCase();
    setEmail(normalized);

    if (!normalized) {
      setStatus('error');
      setStatusMsg('Digite o e-mail usado na compra para validar.');
      setCheckedLicense(true);
      return;
    }

    try {
      setStatus('checking');
      setStatusMsg('Validando sua licença…');

      setProEmail(normalized);

      const ok = await verificarLicencaPorEmail(normalized);
      applyProUI(ok);

      setCheckedLicense(true);

      if (ok) {
        setStatus('success');
        setStatusMsg('✅ Licença ativa! Conteúdo PRO liberado neste navegador.');
        setJustActivated(true);
        setTimeout(() => setJustActivated(false), 6000);
      } else {
        setStatus('inactive');
        setStatusMsg('Licença não ativa para este e-mail. Verifique se usou o mesmo e-mail da compra.');
      }
    } catch (e) {
      console.error('Erro ao validar licença no Guia:', e);
      applyProUI(false);
      setCheckedLicense(true);
      setStatus('error');
      setStatusMsg('Não foi possível validar agora. Tente novamente em instantes.');
    }
  };

  const handleActivateClick = async () => {
    // Ativar Pacote agora valida (não é só navegar)
    scrollToValidate(!email);
    const saved = (email || getProEmail()).trim().toLowerCase();
    if (saved) {
      await validate(saved);
    } else {
      setStatus('idle');
      setStatusMsg('');
    }
  };

  /* =====================================================
     AUTO-CHECK DA LICENÇA (AO ABRIR)
  ===================================================== */
  useEffect(() => {
    const saved = getProEmail().trim().toLowerCase();
    if (saved) setEmail(saved);

    // Se veio do /pro após ativar, recebe ?pro=1
    try {
      const url = new URL(window.location.href);
      const proFlag = url.searchParams.get('pro');

      if (proFlag === '1') {
        setJustActivated(true);
        url.searchParams.delete('pro');
        window.history.replaceState({}, '', url.toString());
      }
    } catch {
      // nada
    }

    if (saved) validate(saved);
    else setCheckedLicense(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const proLink = email ? `/pro?email=${encodeURIComponent(email)}` : '/pro';

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E8E3DC]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="w-8 h-8 text-[#d4af37]" />
            <div>
              <h1 className="font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                Músico Pro
              </h1>
              <p className="text-xs text-[#6ba587]">Parte do pacote: Guia + App</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/">
              <button className="text-[#0c2461] hover:text-[#d4af37] transition font-medium">
                Home
              </button>
            </Link>

            <button
              onClick={handleActivateClick}
              className="text-[#0c2461] hover:text-[#d4af37] transition font-medium"
            >
              Ativar Pacote
            </button>

            <a href={APP_URL} target="_blank" rel="noopener noreferrer">
              <button className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-4 py-2 rounded-lg transition">
                App grátis
              </button>
            </a>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#0c2461]"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-[#0c2461] text-white p-4 space-y-2">
          <Link href="/">
            <button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">
              Home
            </button>
          </Link>

          <button
            onClick={handleActivateClick}
            className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition"
          >
            Ativar Pacote
          </button>

          <a href={APP_URL} target="_blank" rel="noopener noreferrer">
            <button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition font-bold">
              App grátis
            </button>
          </a>
        </nav>
      )}

      {/* MAIN */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Toast/aviso após ativação */}
        {justActivated && (
          <div className="mb-6 bg-[#e8fff2] border border-[#36b37e] rounded-lg p-4">
            <p className="text-[#0c2461] font-semibold">✅ PRO liberado neste navegador</p>
            <p className="text-sm text-[#0c2461] opacity-80">
              Se você trocar de navegador/celular, valide novamente com o mesmo e-mail.
            </p>
          </div>
        )}

        {/* HERO */}
        <section className="mb-12 space-y-6">
          <div className="bg-gradient-to-br from-[#0c2461] to-[#1a3a7a] rounded-lg p-8 md:p-12 text-white space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Guia do Músico Autônomo (incluído no pacote)
            </h2>

            <p className="text-xl opacity-95 font-medium">
              Primeiro você entende as regras. Depois executa no app.
            </p>

            <p className="text-base md:text-lg opacity-90">
              Sem o guia, o app vira um monte de campos para preencher. Sem o app, o guia vira teoria
              difícil de aplicar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={handleActivateClick}
                className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-6 py-3 rounded-lg transition"
              >
                👉 Ativar pacote (validar licença)
              </button>

              <a href={APP_URL} target="_blank" rel="noopener noreferrer">
                <button className="bg-transparent hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition border border-white/50">
                  Abrir App grátis
                </button>
              </a>
            </div>

            <p className="text-xs opacity-80">
              Se o app não abrir, use o link alternativo:{' '}
              <a className="underline" href={APP_FALLBACK_URL} target="_blank" rel="noopener noreferrer">
                abrir pelo caminho antigo
              </a>
              .
            </p>
          </div>
        </section>

        {/* VALIDAR LICENÇA */}
        <section id="validar-licenca" className="mb-12 space-y-4">
          <h3 className="text-2xl font-bold text-[#0c2461]">Já comprou? Valide sua licença PRO</h3>

          <div className="bg-[#f8fafc] border border-[#E8E3DC] rounded-lg p-6 space-y-4">
            <p className="text-[#0c2461] opacity-90">
              Digite o <strong>mesmo e-mail usado na compra</strong>. Se estiver ativo, o conteúdo PRO
              libera imediatamente neste navegador.
            </p>

            {(status !== 'idle' || (checkedLicense && isPro)) && (
              <div
                className={[
                  'rounded-lg p-4 border flex gap-3 items-start',
                  status === 'success' || isPro
                    ? 'bg-[#e8fff2] border-[#36b37e]'
                    : status === 'inactive'
                      ? 'bg-[#fff4e6] border-[#d4af37]'
                      : status === 'checking'
                        ? 'bg-[#eef6ff] border-[#2f6fed]'
                        : 'bg-[#fff1f2] border-[#ef4444]',
                ].join(' ')}
              >
                <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#0c2461]" />
                <div>
                  <p className="font-semibold text-[#0c2461]">
                    {status === 'checking'
                      ? 'Validando…'
                      : status === 'success' || isPro
                        ? 'Acesso PRO confirmado'
                        : status === 'inactive'
                          ? 'Licença não ativa'
                          : 'Falha na validação'}
                  </p>
                  <p className="text-sm text-[#0c2461] opacity-80">
                    {statusMsg ||
                      (isPro
                        ? 'Conteúdo completo liberado neste navegador.'
                        : 'Digite seu e-mail e valide para liberar.')}
                  </p>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-[1fr_auto] gap-3">
              <input
                ref={emailInputRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu e-mail (usado na compra)"
                className="w-full px-4 py-3 rounded-lg border border-[#E8E3DC] focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                type="email"
                autoComplete="email"
              />

              <button
                onClick={() => validate(email)}
                disabled={status === 'checking'}
                className="bg-[#0c2461] hover:bg-[#1a3a7a] disabled:opacity-60 text-white font-bold px-6 py-3 rounded-lg transition"
              >
                {status === 'checking' ? 'Validando…' : 'Validar licença'}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Link href={proLink}>
                <button className="w-full sm:w-auto bg-white border border-[#E8E3DC] hover:bg-[#f0f4f8] text-[#0c2461] font-semibold px-5 py-2 rounded-lg transition">
                  Comprar / Gerenciar assinatura
                </button>
              </Link>

              <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-5 py-2 rounded-lg transition">
                  Abrir App grátis
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* O QUE VOCÊ VAI APRENDER */}
        <section className="mb-16 space-y-6">
          <h3 className="text-3xl font-bold text-[#0c2461]">O que você vai aprender</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Quando você precisa declarar imposto',
              'O que entra como rendimento',
              'Despesas comuns e critérios',
              'Exemplos de cenários reais',
              'Erros que levam a multa',
              'Rotina mensal de 15 minutos',
            ].map((t) => (
              <div key={t} className="flex gap-3 bg-[#f0f4f8] p-4 rounded-lg">
                <Check className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <p className="text-[#0c2461]">{t}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTEÚDO GRATUITO */}
        <section className="mb-16 space-y-8">
          <h3 className="text-3xl font-bold text-[#0c2461]">Conteúdo Gratuito</h3>

          {/* Capítulo 1 */}
          <div className="bg-[#f0f4f8] rounded-lg p-8 space-y-4">
            <h4 className="text-2xl font-bold text-[#0c2461]">Capítulo 1: Visão Geral</h4>
            <p className="text-[#0c2461] leading-relaxed">
              <strong>O que é renda tributável para músico?</strong>
            </p>
            <p className="text-[#0c2461] opacity-90 leading-relaxed">
              Como músico autônomo, você precisa declarar qualquer valor que receba pelo seu trabalho.
              Isso inclui cachês de shows, aulas de música, PIX de clientes, apresentações em eventos,
              etc.
            </p>
            <p className="text-[#0c2461] opacity-90 leading-relaxed">
              Regra prática: se você recebeu dinheiro (ou PIX, ou transferência) em troca de um serviço
              musical, isso é rendimento.
            </p>
            <div className="bg-white border border-[#E8E3DC] rounded-lg p-4">
              <p className="text-sm text-[#0c2461] opacity-80">
                Dica prática: guarde o comprovante (PIX/transferência) e anote quem pagou e pelo quê. No
                app, isso vira histórico e evita “esquecimentos” no fim do ano.
              </p>
            </div>
          </div>

          {/* Capítulo 2 */}
          <div className="bg-[#f0f4f8] rounded-lg p-8 space-y-4">
            <h4 className="text-2xl font-bold text-[#0c2461]">Capítulo 2: Vida Pessoal vs Trabalho</h4>
            <p className="text-[#0c2461] leading-relaxed">
              <strong>O que pode entrar como despesa?</strong>
            </p>
            <p className="text-[#0c2461] opacity-90 leading-relaxed">
              No Carnê-Leão, só faz sentido registrar como “despesa de trabalho” aquilo que tem ligação
              direta com a sua atividade musical e que você consegue comprovar. Separar pessoal vs
              trabalho é o que mais reduz risco de dor de cabeça depois.
            </p>
            <ul className="space-y-2 text-[#0c2461] opacity-90">
              <li>
                ✅ <strong>Geralmente faz sentido:</strong> instrumentos, acessórios, manutenção,
                transporte para show
              </li>
              <li>
                ✅ <strong>Também pode entrar:</strong> hospedagem em viagem para apresentação,
                alimentação durante evento
              </li>
              <li>
                ❌ <strong>Normalmente não entra:</strong> gastos pessoais do dia a dia (mercado,
                internet da casa, lazer), salvo casos específicos e bem documentados
              </li>
            </ul>
            <div className="bg-white border border-[#E8E3DC] rounded-lg p-4">
              <p className="text-sm text-[#0c2461] opacity-80">
                Regra de ouro: se você faria esse gasto mesmo sem ser músico, provavelmente é pessoal.
              </p>
            </div>
          </div>

          {/* Capítulo 3 */}
          <div className="bg-[#f0f4f8] rounded-lg p-8 space-y-4">
            <h4 className="text-2xl font-bold text-[#0c2461]">Capítulo 3: Recebimentos</h4>
            <p className="text-[#0c2461] leading-relaxed">
              <strong>PIX, cachê, aulas, eventos — como registrar?</strong>
            </p>
            <p className="text-[#0c2461] opacity-90 leading-relaxed">
              Todos os tipos de recebimento devem ser registrados. Não importa se foi PIX, dinheiro,
              transferência ou depósito: o que importa é a consistência.
            </p>

            <div className="bg-white border border-[#E8E3DC] rounded-lg p-4 space-y-2">
              <p className="text-sm text-[#0c2461] opacity-80">Registre sempre 3 coisas:</p>
              <ul className="text-sm text-[#0c2461] opacity-80 list-disc pl-5 space-y-1">
                <li>Data do recebimento</li>
                <li>Valor</li>
                <li>Quem pagou + motivo (show, aula, evento, produção)</li>
              </ul>
            </div>

            <p className="text-[#0c2461] opacity-90 leading-relaxed">
              Depois, o app organiza por mês e te ajuda a enxergar se houve imposto e o que precisa
              ser pago/registrado.
            </p>
          </div>

          {/* Capítulo 4 */}
          <div className="bg-[#f0f4f8] rounded-lg p-8 space-y-4">
            <h4 className="text-2xl font-bold text-[#0c2461]">Capítulo 4: Despesas Dedutíveis</h4>
            <p className="text-[#0c2461] leading-relaxed">
              <strong>O que costuma ser comum para músico?</strong>
            </p>
            <p className="text-[#0c2461] opacity-90 leading-relaxed">
              Pense em despesas como “tudo o que foi necessário para você trabalhar e receber”. Quanto
              mais claro for o vínculo com o show/aula/serviço, melhor.
            </p>
            <ul className="space-y-2 text-[#0c2461] opacity-90">
              <li>🎸 Instrumentos e acessórios (cordas, palhetas, afinador)</li>
              <li>🎤 Equipamento de som (microfone, amplificador, caixa)</li>
              <li>🚗 Transporte (Uber, combustível, estacionamento para show)</li>
              <li>🏨 Hospedagem em viagem para apresentação</li>
              <li>📚 Cursos e aulas de música</li>
              <li>💾 Software de produção musical</li>
            </ul>
            <div className="bg-white border border-[#E8E3DC] rounded-lg p-4">
              <p className="text-sm text-[#0c2461] opacity-80">
                Boas práticas: tire foto/print do comprovante e anote qual trabalho aquele gasto
                apoiou. Isso deixa o histórico “à prova de dúvidas”.
              </p>
            </div>
          </div>

          {/* Capítulo 5 */}
          <div className="bg-[#f0f4f8] rounded-lg p-8 space-y-4">
            <h4 className="text-2xl font-bold text-[#0c2461]">Capítulo 5: Checklist Mensal</h4>
            <p className="text-[#0c2461] leading-relaxed">
              <strong>Rotina de 15 minutos</strong>
            </p>
            <p className="text-[#0c2461] opacity-90 leading-relaxed">
              A melhor estratégia é não “deixar para o fim do ano”. Se você fecha o mês em 15 minutos,
              você mantém tudo em dia e reduz drasticamente risco de erros.
            </p>
            <ol className="space-y-2 text-[#0c2461] opacity-90">
              <li>1. Abra o app no último dia do mês</li>
              <li>2. Revise todos os recebimentos (PIX, cachês, aulas)</li>
              <li>3. Adicione as despesas do mês (com comprovantes)</li>
              <li>4. Vá na aba &quot;Carnê-Leão&quot; para ver o resultado</li>
              <li>5. Se houver imposto, anote a data de pagamento</li>
              <li>6. Faça um backup dos dados</li>
            </ol>
            <div className="bg-white border border-[#E8E3DC] rounded-lg p-4">
              <p className="text-sm text-[#0c2461] opacity-80">
                Meta: terminar o mês com “zero pendências” (sem valores soltos no extrato e sem notas
                fiscais perdidas).
              </p>
            </div>
          </div>
        </section>

        {/* CONTEÚDO PRO */}
        <section id="pro" className="mb-16 space-y-6">
          {isPro ? (
            <div className="bg-[#f0f4f8] rounded-lg p-8 space-y-4 border-l-4 border-[#d4af37]">
              <h4 className="text-2xl font-bold text-[#0c2461]">Capítulos avançados (PRO)</h4>
              <p className="text-[#0c2461] opacity-90 leading-relaxed">
                Você está com acesso liberado. Agora é só abrir o app para aplicar na prática (cálculos,
                guias e rotina mensal).
              </p>
              <a href={APP_URL} target="_blank" rel="noopener noreferrer">
                <button className="w-full bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-6 py-3 rounded-lg transition">
                  🚀 Abrir App
                </button>
              </a>
            </div>
          ) : (
            <div className="bg-[#fff4e6] border-2 border-[#d4af37] rounded-lg p-8 space-y-4">
              <div className="flex gap-3">
                <Lock className="w-6 h-6 text-[#d4af37] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-bold text-[#0c2461]">Capítulos avançados (PRO)</h4>
                  <p className="text-[#0c2461] opacity-90">
                    Valide sua licença por e-mail para liberar o conteúdo completo.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  scrollToValidate(true);
                }}
                className="w-full bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold px-6 py-3 rounded-lg transition"
              >
                Validar licença agora
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
