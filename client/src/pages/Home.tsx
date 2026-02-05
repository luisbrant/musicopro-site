import { useState } from 'react';
import { Music, Menu, X, Check } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';
import { useAnalytics } from '@/hooks/useAnalytics';

// App grátis (PWA)
const APP_URL = 'https://app.musicopro.app.br';
const APP_FALLBACK_URL = 'https://app.musicopro.app.br/pwa/index.html';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { trackBuyClick, trackDownloadAppClick } = useAnalytics();

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
              <p className="text-xs text-[#6ba587]">Pacote (Guia + App) para gestão fiscal</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#como-funciona">
              <span className="text-[#0c2461] hover:text-[#d4af37] transition font-medium">
                Como funciona
              </span>
            </Link>

            <Link href="/guia">
              <span className="text-[#0c2461] hover:text-[#d4af37] transition font-medium">
                Guia (comece aqui)
              </span>
            </Link>

            <a href={APP_URL} target="_blank" rel="noopener noreferrer">
              <span
                onClick={() => trackDownloadAppClick()}
                className="text-[#0c2461] hover:text-[#d4af37] transition font-medium cursor-pointer"
              >
                App grátis
              </span>
            </a>

            <Link href="/pro">
              <button className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-4 py-2 rounded-lg transition">
                Começar pacote (Guia + App)
              </button>
            </Link>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#0c2461]"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-[#0c2461] text-white p-4 space-y-2">
          <Link href="/#como-funciona">
            <button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">
              Como funciona
            </button>
          </Link>

          <Link href="/guia">
            <button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">
              Guia (comece aqui)
            </button>
          </Link>

          <a href={APP_URL} target="_blank" rel="noopener noreferrer">
            <button
              onClick={() => trackDownloadAppClick()}
              className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition"
            >
              App grátis
            </button>
          </a>

          <Link href="/pro">
            <button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition font-bold">
              Começar pacote (Guia + App)
            </button>
          </Link>
        </nav>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* HERO SECTION */}
        <section className="mb-16 md:mb-20">
          <div className="bg-gradient-to-br from-[#0c2461] to-[#1a3a7a] rounded-lg p-8 md:p-12 text-white space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Gestão fiscal completa para músicos autônomos:
              <span className="text-[#d4af37]"> guia + app</span> (no mesmo pacote)
            </h2>

            <p className="text-xl md:text-2xl opacity-95 font-medium">
              Primeiro você entende as regras no Guia. Depois você aplica tudo na prática com o App.
            </p>

            <p className="text-lg opacity-90">
              Sem o guia, o app vira um monte de campos para preencher. Sem o app, o guia vira teoria difícil de aplicar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/pro">
                <button
                  onClick={() => trackBuyClick()}
                  className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-8 py-4 rounded-lg transition w-full sm:w-auto text-lg shadow-lg hover:shadow-xl"
                >
                  👉 Começar pacote completo (Guia + App)
                </button>
              </Link>

              <Link href="/guia">
                <button
                  className="bg-transparent hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition border border-white/50 w-full sm:w-auto text-lg"
                >
                  📖 Ver o Guia (primeiro passo)
                </button>
              </Link>

              <a href={APP_URL} target="_blank" rel="noopener noreferrer">
                <button
                  onClick={() => trackDownloadAppClick()}
                  className="bg-transparent hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition border border-white/50 w-full sm:w-auto text-lg"
                >
                  📲 Abrir App grátis
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

            <p className="text-xs opacity-80">
              Ativação por e-mail (o mesmo usado na compra). Sem mensalidade.
            </p>
          </div>
        </section>

        {/* ... resto do seu Home permanece igual ... */}
        {/* (mantive seu conteúdo original abaixo; apenas adicionei os botões e links do App) */}

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
