import { useState, useEffect } from 'react';
import { Music, Menu, X, Lock, Check } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';

/* =====================================================
   CONFIG — IGUAL AO PWA
===================================================== */
const PRO_API = 'https://www.musicopro.app.br/api/license/check';

const getProEmail = () => localStorage.getItem('musicopro_email') || '';
const setProActive = (active: boolean) =>
  localStorage.setItem('musicopro_pro', active ? 'true' : 'false');

async function verificarLicencaPorEmail(email: string): Promise<boolean> {
  const res = await fetch(`${PRO_API}?email=${encodeURIComponent(email)}`);
  const data = await res.json();
  return data?.active === true;
}

export default function Guide() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [email, setEmail] = useState('');
  const [checkedLicense, setCheckedLicense] = useState(false);
  const [justActivated, setJustActivated] = useState(false);

  const validate = async (savedEmail: string) => {
    if (!savedEmail) {
      setIsPro(false);
      setCheckedLicense(true);
      return;
    }

    try {
      const ok = await verificarLicencaPorEmail(savedEmail);
      setProActive(ok);

      if (ok) {
        document.body.classList.add('pro-enabled');
        setIsPro(true);
      } else {
        document.body.classList.remove('pro-enabled');
        setIsPro(false);
      }
      setCheckedLicense(true);
    } catch (e) {
      console.error('Erro ao validar licença no Guia:', e);
      setIsPro(false);
      setCheckedLicense(true);
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

        // remove o param para não ficar repetindo
        url.searchParams.delete('pro');
        window.history.replaceState({}, '', url.toString());
      }
    } catch {
      // nada
    }

    validate(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const proLink = email ? `/pro?email=${encodeURIComponent(email)}` : '/pro';
  const fixEmailLink = email
    ? `/pro?email=${encodeURIComponent(email)}&focus=1`
    : '/pro?focus=1';

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

            <Link href={proLink}>
              <button className="text-[#0c2461] hover:text-[#d4af37] transition font-medium">
                Ativar Pacote
              </button>
            </Link>

            <a
              href="https://app.musicopro.app.br/pwa/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-4 py-2 rounded-lg transition">
                Abrir App
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

          <Link href={proLink}>
            <button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">
              Ativar Pacote
            </button>
          </Link>

          <a
            href="https://app.musicopro.app.br/pwa/index.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition font-bold">
              Abrir App
            </button>
          </a>
        </nav>
      )}

      {/* MAIN */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* ✅ Toast/aviso após retorno do /pro */}
        {justActivated && (
          <div className="mb-6 bg-[#e8fff2] border border-[#36b37e] rounded-lg p-4">
            <p className="text-[#0c2461] font-semibold">
              ✅ Ativação concluída — conferindo sua licença…
            </p>
            <p className="text-sm text-[#0c2461] opacity-80">
              Se estiver tudo certo, o conteúdo completo será liberado automaticamente.
            </p>
          </div>
        )}

        {/* HERO */}
        <section className="mb-16 space-y-6">
          <div className="bg-gradient-to-br from-[#0c2461] to-[#1a3a7a] rounded-lg p-8 md:p-12 text-white space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Guia do Músico Autônomo (incluído no pacote)
            </h2>

            <p className="text-xl opacity-95 font-medium">
              Primeiro você entende as regras. Depois executa no app.
            </p>

            <p className="text-base md:text-lg opacity-90">
              Sem o guia, o app vira um monte de campos para preencher.
              Sem o app, o guia vira teoria difícil de aplicar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href={proLink}>
                <button className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-6 py-3 rounded-lg transition">
                  👉 Começar pacote (Guia + App)
                </button>
              </Link>

              <a
                href="https://app.musicopro.app.br/pwa/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-transparent hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition border border-white/50">
                  Abrir o App (próximo passo)
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

          <div className="bg-[#f0f4f8] rounded-lg p-8 space-y-4">
            <h4 className="text-2xl font-bold text-[#0c2461]">Capítulo 1: Visão Geral</h4>
            <p className="text-[#0c2461] opacity-90">
              Tudo que você recebe pelo seu trabalho musical é renda tributável.
            </p>
          </div>

          <div className="bg-[#f0f4f8] rounded-lg p-8 space-y-4">
            <h4 className="text-2xl font-bold text-[#0c2461]">Capítulo 2: Vida Pessoal x Trabalho</h4>
            <p className="text-[#0c2461] opacity-90">
              Apenas despesas ligadas diretamente ao trabalho são dedutíveis.
            </p>
          </div>

          <div className="bg-[#f0f4f8] rounded-lg p-8 space-y-4">
            <h4 className="text-2xl font-bold text-[#0c2461]">Capítulo 3: Recebimentos</h4>
            <p className="text-[#0c2461] opacity-90">
              Registre tudo: PIX, cachê, aulas, eventos.
            </p>
          </div>
        </section>

        {/* CONTEÚDO PRO */}
        <section id="pro" className="mb-16 space-y-6">
          {isPro ? (
            <div className="bg-[#e8fff2] border-2 border-[#36b37e] rounded-lg p-6">
              <p className="font-bold text-[#0c2461]">✅ Acesso PRO confirmado</p>
              <p className="text-sm text-[#0c2461] opacity-80">
                Conteúdo completo liberado neste navegador.
              </p>
            </div>
          ) : (
            <div className="bg-[#fff4e6] border-2 border-[#d4af37] rounded-lg p-8 space-y-6">
              <div className="flex gap-3">
                <Lock className="w-6 h-6 text-[#d4af37] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-bold text-[#0c2461]">
                    Conteúdo completo (incluído no pacote)
                  </h4>
                  <p className="text-[#0c2461] opacity-90">
                    Os capítulos avançados ficam disponíveis após ativação por e-mail.
                  </p>
                </div>
              </div>

              {checkedLicense && email && !isPro && (
                <div className="bg-white border border-[#E8E3DC] rounded-lg p-4">
                  <p className="text-sm text-[#0c2461] opacity-80">
                    Detectei o e-mail <strong>{email}</strong>, mas a licença não está ativa.
                  </p>
                  <p className="text-sm text-[#0c2461] opacity-80 mt-1">
                    Se você comprou com outro e-mail, corrija abaixo:
                  </p>

                  <Link href={fixEmailLink}>
                    <button className="mt-3 w-full bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold px-6 py-3 rounded-lg transition">
                      ✍️ Corrigir e-mail
                    </button>
                  </Link>
                </div>
              )}

              {!email && (
                <Link href={proLink}>
                  <button className="w-full bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-6 py-3 rounded-lg transition">
                    👉 Ativar pacote agora
                  </button>
                </Link>
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
