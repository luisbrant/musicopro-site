import { useState } from 'react';
import { Music, Menu, X, Check } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { trackBuyClick, trackDownloadAppClick } = useAnalytics();

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 bg-white border-b border-[#E8E3DC]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="w-8 h-8 text-[#d4af37]" />
            <div>
              <h1 className="font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                Músico Pro
              </h1>
              <p className="text-xs text-[#6ba587]">Guia + App (pacote completo)</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/guia">
              <span className="text-[#0c2461] hover:text-[#d4af37] transition font-medium">Guia</span>
            </Link>

            <Link href="/app">
              <span
                className="text-[#0c2461] hover:text-[#d4af37] transition font-medium"
                onClick={() => trackDownloadAppClick()}
              >
                App
              </span>
            </Link>

            <Link href="/pro">
              <button
                onClick={() => trackBuyClick()}
                className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-4 py-2 rounded-lg transition"
              >
                Ativar / Comprar PRO
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
          <Link href="/guia">
            <button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">
              Guia
            </button>
          </Link>

          <Link href="/app">
            <button
              onClick={() => trackDownloadAppClick()}
              className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition"
            >
              App
            </button>
          </Link>

          <Link href="/pro">
            <button
              onClick={() => trackBuyClick()}
              className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition font-bold"
            >
              Ativar / Comprar PRO
            </button>
          </Link>
        </nav>
      )}

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Ponte rápida */}
        <section className="mb-14">
          <div className="bg-gradient-to-br from-[#0c2461] to-[#1a3a7a] rounded-lg p-8 md:p-12 text-white space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Guia + App: o pacote completo para músico autônomo
            </h2>

            <p className="text-lg opacity-90">
              O <strong>Guia</strong> te ensina as regras. O <strong>App</strong> te ajuda a aplicar na prática mês a mês.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/guia">
                <button className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-8 py-4 rounded-lg transition w-full sm:w-auto">
                  📖 Começar pelo Guia
                </button>
              </Link>

              <Link href="/app">
                <button
                  onClick={() => trackDownloadAppClick()}
                  className="bg-transparent hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition border border-white/50 w-full sm:w-auto"
                >
                  📲 Ir para o App
                </button>
              </Link>

              <Link href="/pro">
                <button
                  onClick={() => trackBuyClick()}
                  className="bg-transparent hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition border border-white/50 w-full sm:w-auto"
                >
                  🔓 Ativar PRO
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Dois cards: Guia vs App */}
        <section className="mb-16 grid md:grid-cols-2 gap-6">
          <div className="bg-[#f0f4f8] rounded-lg p-8 space-y-4 border-t-4 border-[#d4af37]">
            <h3 className="text-2xl font-bold text-[#0c2461]">Guia</h3>
            <p className="text-[#0c2461] opacity-85">
              Entenda renda, despesas, rotinas e os erros mais comuns. (Base pra usar o app com segurança.)
            </p>
            <ul className="space-y-2 text-[#0c2461] opacity-90">
              <li className="flex gap-2"><Check className="w-5 h-5 text-[#d4af37]" /> Conteúdo grátis</li>
              <li className="flex gap-2"><Check className="w-5 h-5 text-[#d4af37]" /> Ativação PRO por e-mail</li>
            </ul>
            <Link href="/guia">
              <button className="mt-2 bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold px-6 py-3 rounded-lg transition">
                Ver Guia
              </button>
            </Link>
          </div>

          <div className="bg-[#f0f4f8] rounded-lg p-8 space-y-4 border-t-4 border-[#d4af37]">
            <h3 className="text-2xl font-bold text-[#0c2461]">App</h3>
            <p className="text-[#0c2461] opacity-85">
              Ferramenta prática para registrar receitas/despesas e manter a organização mensal.
            </p>
            <ul className="space-y-2 text-[#0c2461] opacity-90">
              <li className="flex gap-2"><Check className="w-5 h-5 text-[#d4af37]" /> App grátis (PWA)</li>
              <li className="flex gap-2"><Check className="w-5 h-5 text-[#d4af37]" /> Ativação PRO por e-mail</li>
            </ul>
            <Link href="/app">
              <button
                onClick={() => trackDownloadAppClick()}
                className="mt-2 bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold px-6 py-3 rounded-lg transition"
              >
                Ver App
              </button>
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
