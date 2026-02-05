import { useState } from 'react';
import { Music, Menu, X, CheckCircle2, Star, ShieldCheck, ArrowRight, Zap, FileText, Smartphone, BookOpen, Download } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';

export default function Vendas() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-[#0c2461]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E8E3DC]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Music className="w-8 h-8 text-[#d4af37]" />
            <div>
              <h1 className="font-bold text-xl leading-none" style={{ fontFamily: 'Lexend, sans-serif' }}>
                Músico Pro
              </h1>
              <p className="text-[10px] uppercase tracking-wider text-[#d4af37] font-bold">Pacote Oficial</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/"><button className="hover:text-[#d4af37] transition font-medium">Home</button></Link>
            <Link href="/guia"><button className="hover:text-[#d4af37] transition font-medium">Guia Grátis</button></Link>
            <Link href="/app"><button className="hover:text-[#d4af37] transition font-medium">Entrar no App</button></Link>
            <a href="#comprar" className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] px-6 py-2 rounded-lg font-bold transition shadow-sm">
              Comprar Agora
            </a>
          </nav>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden bg-[#0c2461] text-white p-4 space-y-2 border-t border-[#E8E3DC]">
             <Link href="/"><button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">Home</button></Link>
             <Link href="/guia"><button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">Guia</button></Link>
             <Link href="/app"><button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">App</button></Link>
          </nav>
        )}
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        
        {/* HERO SECTION DE ALTA CONVERSÃO */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-[#0c2461] to-[#1a3a7a] rounded-2xl p-8 md:p-14 text-white shadow-2xl relative overflow-hidden">
            {/* Elemento decorativo de fundo */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37] opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="relative z-10 max-w-3xl">
              <div className="inline-block bg-[#d4af37] text-[#0c2461] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4">
                Oferta por Tempo Limitado
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                Profissionalize sua carreira por menos de <span className="text-[#d4af37]">R$ 0,30 por dia</span>.
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl">
                O único pacote que une a <strong>ferramenta</strong> que você precisa (App) com o <strong>conhecimento</strong> que te economiza milhares de reais (Guia PRO).
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#comprar" className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-8 py-4 rounded-xl transition text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  Quero ser Profissional <ArrowRight size={20}/>
                </a>
                <div className="flex items-center gap-2 text-sm opacity-80 justify-center sm:justify-start px-4">
                   <ShieldCheck size={18} className="text-[#d4af37]"/> Garantia de 7 dias
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* A SOLUÇÃO COMPLETA (VALUE STACK) */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-[#0c2461]">O que você leva no Pacote?</h3>
            <p className="opacity-70 mt-2">Não é só um app, é um escritório completo.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* LADO A: A FERRAMENTA */}
            <div className="bg-white border border-[#E8E3DC] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="bg-[#f0f4f8] p-6 border-b border-[#E8E3DC] flex items-center gap-3">
                <div className="bg-[#0c2461] p-3 rounded-lg text-white"><Smartphone size={24}/></div>
                <div>
                  <h4 className="font-bold text-xl text-[#0c2461]">App MusicoPro (Anual)</h4>
                  <p className="text-sm opacity-70">Acesso ilimitado à ferramenta.</p>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <ul className="space-y-3">
                  <li className="flex gap-3 text-[#0c2461]"><CheckCircle2 className="text-[#d4af37] w-5 h-5 shrink-0"/> <span><strong>Gerador de Recibos</strong> e Contratos PDF</span></li>
                  <li className="flex gap-3 text-[#0c2461]"><CheckCircle2 className="text-[#d4af37] w-5 h-5 shrink-0"/> <span>Cálculo automático de <strong>Carnê-Leão</strong></span></li>
                  <li className="flex gap-3 text-[#0c2461]"><CheckCircle2 className="text-[#d4af37] w-5 h-5 shrink-0"/> <span>Exportação para Contador (CSV/PDF)</span></li>
                  <li className="flex gap-3 text-[#0c2461]"><CheckCircle2 className="text-[#d4af37] w-5 h-5 shrink-0"/> <span>Consultor <strong>IA Fiscal 24h</strong></span></li>
                </ul>
              </div>
            </div>

            {/* LADO B: O CONHECIMENTO */}
            <div className="bg-white border border-[#E8E3DC] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="bg-[#f0f4f8] p-6 border-b border-[#E8E3DC] flex items-center gap-3">
                 <div className="bg-[#d4af37] p-3 rounded-lg text-[#0c2461]"><BookOpen size={24}/></div>
                 <div>
                  <h4 className="font-bold text-xl text-[#0c2461]">Guia Fiscal PRO</h4>
                  <p className="text-sm opacity-70">Estratégia para pagar menos.</p>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <ul className="space-y-3">
                  <li className="flex gap-3 text-[#0c2461]"><CheckCircle2 className="text-[#d4af37] w-5 h-5 shrink-0"/> <span>Módulo: <strong>Deduções Avançadas</strong> (O segredo)</span></li>
                  <li className="flex gap-3 text-[#0c2461]"><CheckCircle2 className="text-[#d4af37] w-5 h-5 shrink-0"/> <span>Módulo: Aposentadoria do Músico</span></li>
                  <li className="flex gap-3 text-[#0c2461]"><CheckCircle2 className="text-[#d4af37] w-5 h-5 shrink-0"/> <span>5 Estudos de Caso Reais</span></li>
                  <li className="flex gap-3 text-[#0c2461]"><CheckCircle2 className="text-[#d4af37] w-5 h-5 shrink-0"/> <span>Checklist Anual de Documentação</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PROVA SOCIAL */}
        <section className="mb-20 bg-[#f8fafc] border border-[#E8E3DC] rounded-2xl p-8 md:p-12 text-center">
          <Star className="w-10 h-10 text-[#d4af37] mx-auto mb-6 fill-current" />
          <h3 className="text-2xl font-bold text-[#0c2461] mb-4">
            "Eu pagava R$ 400 de imposto todo mês sem saber. Com o Guia aprendi a deduzir e o App faz a conta certa. Hoje pago menos de R$ 100."
          </h3>
          <div className="flex items-center justify-center gap-3">
             <div className="w-10 h-10 bg-[#0c2461] rounded-full flex items-center justify-center text-white font-bold">R</div>
             <div className="text-left">
                <p className="font-bold text-[#0c2461] text-sm">Ricardo S.</p>
                <p className="text-xs opacity-70">Baterista Profissional</p>
             </div>
          </div>
        </section>

        {/* PRICING CARD (OFERTA IRRESISTÍVEL) */}
        <section id="comprar" className="mb-20 scroll-mt-24">
          <div className="max-w-md mx-auto bg-white rounded-2xl border-2 border-[#d4af37] shadow-2xl overflow-hidden transform hover:-translate-y-1 transition duration-300">
            <div className="bg-[#d4af37] text-[#0c2461] px-6 py-4 text-center">
              <p className="font-bold text-xl flex items-center justify-center gap-2"><Zap size={20} fill="currentColor"/> ACESSO TOTAL</p>
            </div>

            <div className="p-8 space-y-6">
              <div className="text-center">
                <p className="text-gray-400 line-through mb-1 text-sm font-medium">De R$ 197,00 por</p>
                <div className="flex items-center justify-center gap-1">
                   <span className="text-2xl font-bold text-[#0c2461] mb-4">R$</span>
                   <span className="text-6xl font-extrabold text-[#0c2461]">97</span>
                   <span className="text-xl font-bold text-[#0c2461] mb-4">,00</span>
                </div>
                <p className="text-sm bg-green-100 text-green-800 inline-block px-3 py-1 rounded-full font-bold">Pagamento Único (1 Ano)</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                 <div className="flex justify-between items-center text-sm">
                    <span className="opacity-70">App MusicoPro</span>
                    <span className="font-bold">Incluso ✅</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="opacity-70">Guia PRO Avançado</span>
                    <span className="font-bold">Incluso ✅</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="opacity-70">Atualizações 2026</span>
                    <span className="font-bold">Incluso ✅</span>
                 </div>
              </div>

              <a
                href="https://pay.hotmart.com/J104095456E?bid=1769979069812"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold py-4 rounded-xl transition text-center text-lg shadow-lg hover:shadow-xl"
              >
                COMPRAR AGORA
              </a>

              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-xs text-[#0c2461] opacity-70">
                  <ShieldCheck size={14} /> Pagamento 100% seguro via Hotmart
                </div>
                <p className="text-xs text-green-700 font-bold">Risco Zero: 7 dias de garantia incondicional.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-20 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-[#0c2461]">Perguntas Frequentes</h3>
          </div>
          
          <div className="space-y-4">
             {[
               { q: "O app substitui um contador?", a: "Não. O Músico Pro é uma ferramenta de organização e pré-contabilidade. Ele deixa tudo pronto para o seu contador (ou você) declarar, evitando erros e multas." },
               { q: "Posso usar no celular e no computador?", a: "Sim! O MusicoPro é um PWA (Web App). Você acessa pelo navegador de qualquer dispositivo e seus dados estão sempre sincronizados na nuvem." },
               { q: "Como acesso o Guia PRO?", a: "Assim que o pagamento for confirmado, você recebe um e-mail com o acesso. Basta validar seu e-mail na área 'Guia' do site para desbloquear." },
               { q: "Serve para banda ou só carreira solo?", a: "O foco principal é o músico autônomo (CPF). Se você tem banda, pode usar para controlar sua parte dos ganhos. Para CNPJ de banda, consulte um contador específico." }
             ].map((item, idx) => (
                <details key={idx} className="bg-[#f8fafc] border border-[#E8E3DC] rounded-lg p-5 cursor-pointer group hover:bg-white transition">
                  <summary className="flex items-center justify-between font-bold text-[#0c2461] text-lg list-none">
                    {item.q}
                    <span className="group-open:rotate-180 transition transform text-[#d4af37]">▼</span>
                  </summary>
                  <p className="text-[#0c2461] opacity-80 mt-3 leading-relaxed">
                    {item.a}
                  </p>
                </details>
             ))}
          </div>
        </section>
        
        <Footer />
      </main>
    </div>
  );
}