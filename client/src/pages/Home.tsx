import { useState } from 'react';
import { Music, Menu, X, Star, FileText, Bot, ShieldCheck } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { trackBuyClick, trackDownloadAppClick } = useAnalytics();

  return (
    <div className="min-h-screen bg-white font-sans text-[#0c2461]">
      {/* HEADER */}
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
            <Link href="/guia"><span className="cursor-pointer hover:text-[#d4af37] transition font-medium">Guia Grátis</span></Link>
            <Link href="/app"><span className="cursor-pointer hover:text-[#d4af37] transition font-medium" onClick={() => trackDownloadAppClick()}>Entrar no App</span></Link>
            <Link href="/vendas">
              <button onClick={() => trackBuyClick()} className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-4 py-2 rounded-lg transition shadow-md">
                Comprar Licença PRO
              </button>
            </Link>
          </nav>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-[#0c2461] text-white p-4 space-y-2">
          <Link href="/guia"><button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">Guia Grátis</button></Link>
          <Link href="/app"><button onClick={() => trackDownloadAppClick()} className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">Entrar no App</button></Link>
          <Link href="/vendas"><button onClick={() => trackBuyClick()} className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition font-bold text-[#d4af37]">Comprar Licença PRO</button></Link>
        </nav>
      )}

      <main className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        
        {/* HERO SECTION (Atualizado com a nova Copy) */}
        <section className="mb-20 text-center max-w-4xl mx-auto space-y-6">
          {/* 1. Headline */}
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#0c2461]">
            Pague menos imposto <span className="text-[#d4af37]">organizando suas despesas</span> de músico.
          </h2>

          {/* 2. Subheadline */}
          <p className="text-xl opacity-80 max-w-2xl mx-auto text-[#0c2461]">
            A única solução que une <strong>Estratégia (Guia)</strong> e <strong>Prática (App)</strong>. 
            Descubra quais gastos abatem seu imposto legalmente e use nossa ferramenta para organizar suas finanças.
          </p>

          {/* 3. Diferencial Visual */}
          <div className="flex items-center justify-center gap-4 py-4 opacity-90">
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
              <span className="text-[#0c2461] font-bold text-sm">📘 Guia</span>
              <span className="text-sm text-[#0c2461]">Aprenda a regra</span>
            </div>
            <span className="text-[#d4af37] font-bold text-2xl">+</span>
            <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-100">
              <span className="text-[#0c2461] font-bold text-sm">📱 App</span>
              <span className="text-sm text-[#0c2461]">Aplique na prática</span>
            </div>
          </div>

          {/* 4. CTA Principal */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link href="/guia">
              <button className="bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold px-8 py-4 rounded-xl transition text-lg shadow-lg shadow-blue-900/20">
                Começar Agora Grátis
              </button>
            </Link>
            <Link href="/vendas">
              <button className="bg-white border-2 border-[#d4af37] text-[#0c2461] font-bold px-8 py-4 rounded-xl transition text-lg hover:bg-[#fff9e6]">
                Ver Funções PRO
              </button>
            </Link>
          </div>
        </section>

        {/* FEATURES GRID (Suporte à Promessa) */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold">Muito mais que uma planilha</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#f8fafc] p-6 rounded-xl border border-[#E8E3DC]">
              <FileText className="w-10 h-10 text-[#d4af37] mb-4"/>
              <h4 className="font-bold text-xl mb-2">Burocracia Zero</h4>
              <p className="opacity-80">Gerador de Recibos e Contratos Express com QR Code para segurança.</p>
            </div>
            <div className="bg-[#f8fafc] p-6 rounded-xl border border-[#E8E3DC]">
              <ShieldCheck className="w-10 h-10 text-[#d4af37] mb-4"/>
              <h4 className="font-bold text-xl mb-2">Contabilidade Pronta</h4>
              <p className="opacity-80">Cálculo de Carnê-Leão (DARF) e exportação de relatórios PDF/CSV para seu contador.</p>
            </div>
            <div className="bg-[#f8fafc] p-6 rounded-xl border border-[#E8E3DC]">
              <Bot className="w-10 h-10 text-[#d4af37] mb-4"/>
              <h4 className="font-bold text-xl mb-2">Consultor IA</h4>
              <p className="opacity-80">Tire dúvidas sobre impostos e receba estratégias de carreira com nossa IA.</p>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <section className="mb-20 bg-[#0c2461] text-white rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <Star className="w-8 h-8 text-[#d4af37] mx-auto mb-4 fill-current" />
          <p className="text-xl md:text-2xl italic font-medium mb-6 max-w-2xl mx-auto z-10 relative">
            "Antes eu perdia horas com planilhas. Agora gero um contrato em segundos e já sei quanto tenho que pagar de imposto. O consultor IA me deu ideias incríveis!"
          </p>
          <div className="opacity-70 font-bold">Ricardo S., Baterista e Produtor</div>
        </section>

        <Footer />
      </main>
    </div>
  );
}