import { useState } from 'react';
import { Music, Menu, X, Check, ArrowRight, Star } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { trackBuyClick, trackDownloadAppClick } = useAnalytics();

  return (
    <div className="min-h-screen bg-white font-sans text-[#0c2461]">
      <header className="sticky top-0 z-40 bg-white border-b border-[#E8E3DC]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="w-8 h-8 text-[#d4af37]" />
            <div>
              <h1 className="font-bold text-xl leading-none" style={{ fontFamily: 'Lexend, sans-serif' }}>
                Músico Pro
              </h1>
              <p className="text-[10px] uppercase tracking-wider text-[#d4af37] font-bold">Pacote Oficial</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/"><span className="cursor-pointer hover:text-[#d4af37] transition font-medium">Home</span></Link>
            <Link href="/guia"><span className="cursor-pointer hover:text-[#d4af37] transition font-medium">Guia</span></Link>
            <Link href="/app"><span className="cursor-pointer hover:text-[#d4af37] transition font-medium" onClick={() => trackDownloadAppClick()}>MusicoPro</span></Link>
            <Link href="/guia#validar-guia-pro">
              <button onClick={() => trackBuyClick()} className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-4 py-2 rounded-lg transition">
                Ativar Pacote
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
          <Link href="/guia"><button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">Guia</button></Link>
          <Link href="/app"><button onClick={() => trackDownloadAppClick()} className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">MusicoPro (App)</button></Link>
          <Link href="/guia#validar-guia-pro"><button onClick={() => trackBuyClick()} className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition font-bold text-[#d4af37]">Ativar Pacote</button></Link>
        </nav>
      )}

      <main className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        
        {/* HERO */}
        <section className="mb-16 text-center max-w-4xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Organize renda, despesas e impostos <span className="text-[#d4af37]">como músico autônomo</span>.
          </h2>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            Entenda a lógica no <strong>Guia</strong> e aplique na prática com o <strong>MusicoPro</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/guia">
              <button className="bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold px-8 py-4 rounded-xl transition text-lg shadow-lg shadow-blue-900/20">
                Começar pelo Guia
              </button>
            </Link>
            <Link href="/app">
              <button onClick={() => trackDownloadAppClick()} className="bg-white border-2 border-[#E8E3DC] hover:border-[#d4af37] text-[#0c2461] font-bold px-8 py-4 rounded-xl transition text-lg">
                Testar MusicoPro
              </button>
            </Link>
          </div>
        </section>

        {/* PROBLEMA / AGITAÇÃO */}
        <section className="mb-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold">O problema do músico autônomo</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <div className="bg-red-100 p-2 rounded-full"><X className="w-5 h-5 text-red-600" /></div>
                <p className="font-medium text-lg">Cachês, aulas, gravações... quanto sobrou mesmo?</p>
              </li>
              <li className="flex gap-3 items-start">
                <div className="bg-red-100 p-2 rounded-full"><X className="w-5 h-5 text-red-600" /></div>
                <p className="font-medium text-lg">Recibos espalhados no WhatsApp e notas perdidas.</p>
              </li>
              <li className="flex gap-3 items-start">
                <div className="bg-red-100 p-2 rounded-full"><X className="w-5 h-5 text-red-600" /></div>
                <p className="font-medium text-lg">Medo anual do Carnê-Leão e Imposto de Renda.</p>
              </li>
            </ul>
          </div>
          
          <div className="bg-[#f8fafc] p-8 rounded-2xl border border-[#E8E3DC] relative">
            <div className="absolute -top-4 -right-4 bg-[#d4af37] text-[#0c2461] px-4 py-1 rounded-full text-sm font-bold shadow-sm">
              Depoimento
            </div>
            <Star className="w-8 h-8 text-[#d4af37] mb-4 fill-current" />
            <p className="text-xl italic font-medium mb-6">
              "Eu misturava tudo. Com o Guia entendi a lógica e com o MusicoPro eu reservo o imposto certinho todo mês. Finalmente sei quanto ganho de verdade."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0c2461] rounded-full flex items-center justify-center text-white font-bold">J</div>
              <div>
                <p className="font-bold">João M.</p>
                <p className="text-sm opacity-70">Guitarrista & Produtor</p>
              </div>
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA / COMPARAÇÃO */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold">Como funciona</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Passo 1 */}
            <div className="bg-white border border-[#E8E3DC] p-6 rounded-xl hover:shadow-md transition">
              <div className="text-sm font-bold text-[#6ba587] mb-2 uppercase tracking-wide">Grátis</div>
              <h4 className="text-2xl font-bold mb-3">Guia</h4>
              <p className="opacity-80 mb-4">Entenda a lógica fiscal e organize sua rotina.</p>
              <Link href="/guia"><span className="text-[#d4af37] font-bold flex items-center gap-1 cursor-pointer hover:underline">Ler agora <ArrowRight size={16}/></span></Link>
            </div>

            {/* Passo 2 */}
            <div className="bg-white border border-[#E8E3DC] p-6 rounded-xl hover:shadow-md transition">
              <div className="text-sm font-bold text-[#6ba587] mb-2 uppercase tracking-wide">Grátis</div>
              <h4 className="text-2xl font-bold mb-3">MusicoPro</h4>
              <p className="opacity-80 mb-4">Registre o dia a dia e automatize cálculos básicos.</p>
              <Link href="/app"><span className="text-[#d4af37] font-bold flex items-center gap-1 cursor-pointer hover:underline">Abrir App <ArrowRight size={16}/></span></Link>
            </div>

            {/* Passo 3 */}
            <div className="bg-[#0c2461] text-white p-6 rounded-xl shadow-xl transform md:-translate-y-2">
              <div className="text-sm font-bold text-[#d4af37] mb-2 uppercase tracking-wide">Pacote Completo</div>
              <h4 className="text-2xl font-bold mb-3">Pacote Músico Pro</h4>
              <p className="opacity-90 mb-4 text-sm">Desbloqueia o <strong>Guia PRO aprofundado</strong> + todas as funções do <strong>MusicoPro</strong>.</p>
              <Link href="/guia#validar-guia-pro">
                <button onClick={() => trackBuyClick()} className="w-full bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold py-2 rounded-lg transition">
                  Ativar agora
                </button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}