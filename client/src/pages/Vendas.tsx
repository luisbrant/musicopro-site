import { CheckCircle2, Star, Download, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

export default function Vendas() {
  return (
    <div className="min-h-screen bg-[#F9F7F4] font-['Poppins',_sans-serif]">
      {/* Header Simples */}
      <header className="bg-white border-b border-[#E8E3DC] sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[#1B4965] font-bold text-lg">
            <span>🎵</span>
            <span>Guia IR Músicos</span>
          </Link>
          <a href="#comprar" className="bg-[#E07856] text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-[#D06846] transition">
            Quero a Licença PRO
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#1B4965] text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <span className="bg-[#E07856] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
            Oferta Especial de Lançamento
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 font-['Lexend',_sans-serif] leading-tight">
            Licença PRO + Guia Completo
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
            Desbloqueie todo o potencial do App MusicoPro, baixe o E-book em PDF e acesse checklists exclusivos.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="#comprar" className="bg-[#E07856] text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-[#D06846] transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2">
              Quero Acesso Imediato <ArrowRight size={20} />
            </a>
            <a href="/app-musico-pro.html" download className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-lg text-lg font-bold hover:bg-white/20 transition flex items-center justify-center gap-2">
              <Download size={20} /> Baixar App Grátis
            </a>
          </div>
        </div>
      </section>

      {/* O Problema */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1B4965] text-center mb-12 font-['Lexend',_sans-serif]">
            Você vive essa realidade?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#F9F7F4] p-6 rounded-xl border border-[#E8E3DC]">
              <div className="text-4xl mb-4">😰</div>
              <h3 className="font-bold text-[#1B4965] mb-2">Medo da Malha Fina</h3>
              <p className="text-[#2C3E50] text-sm">Recebe PIX de cachês e alunos, mas não sabe se deve declarar ou como fazer isso corretamente.</p>
            </div>
            <div className="bg-[#F9F7F4] p-6 rounded-xl border border-[#E8E3DC]">
              <div className="text-4xl mb-4">💸</div>
              <h3 className="font-bold text-[#1B4965] mb-2">Imposto Alto Demais</h3>
              <p className="text-[#2C3E50] text-sm">Sente que paga muito imposto ou tem medo de pagar uma fortuna de uma vez só no ajuste anual.</p>
            </div>
            <div className="bg-[#F9F7F4] p-6 rounded-xl border border-[#E8E3DC]">
              <div className="text-4xl mb-4">📉</div>
              <h3 className="font-bold text-[#1B4965] mb-2">Desorganização Total</h3>
              <p className="text-[#2C3E50] text-sm">Mistura dinheiro pessoal com profissional, perde recibos e não sabe quanto realmente lucra.</p>
            </div>
          </div>
        </div>
      </section>

      {/* A Solução: O Kit */}
      <section id="demo" className="py-16 bg-[#1B4965] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 font-['Lexend',_sans-serif]">
              Apresentando o Kit MusicoPro
            </h2>
            <p className="text-gray-300">
              Não é apenas um e-book. É um sistema completo de gestão para sua carreira.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-[#E07856] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl">1</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">E-book Guia Definitivo (PDF + Web)</h3>
                  <p className="text-gray-300 text-sm">O manual completo com 15 capítulos, atualizado para 2026. Aprenda sobre Carnê-Leão, RPA, Deduções e muito mais em linguagem simples.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-[#6BA587] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl">2</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Ferramenta MusicoPro AI (App)</h3>
                  <p className="text-gray-300 text-sm">Aplicativo exclusivo para controle financeiro. Lance cachês, despesas, gere recibos profissionais e tenha um consultor IA na palma da mão.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-[#D4A574] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl">3</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Pack de Checklists & Modelos</h3>
                  <p className="text-gray-300 text-sm">Arquivos prontos para usar: Checklist Mensal de Obrigações, Planilha de Cálculo de Preço de Show e Modelo de Contrato.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-2 transform rotate-2 hover:rotate-0 transition duration-500 shadow-2xl">
              {/* Placeholder para imagem do produto */}
              <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <span className="text-6xl">📱 + 📘</span>
                  <p className="mt-4 font-bold text-gray-500">Preview do App + E-book</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detalhes da Ferramenta */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col-reverse md:flex-row gap-12 items-center">
            <div className="flex-1 bg-[#F9F7F4] p-8 rounded-2xl border border-[#E8E3DC] w-full">
              <h3 className="text-xl font-bold text-[#1B4965] mb-6 flex items-center gap-2">
                <Star className="text-[#E07856] fill-current" />
                O que o App MusicoPro faz por você:
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#6BA587] flex-shrink-0 mt-1" />
                  <span className="text-[#2C3E50]"><strong>Gestão de Cachês:</strong> Registre cada show, aula ou gravação.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#6BA587] flex-shrink-0 mt-1" />
                  <span className="text-[#2C3E50]"><strong>Gerador de Recibos:</strong> Crie recibos profissionais em PDF com QR Code em segundos.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#6BA587] flex-shrink-0 mt-1" />
                  <span className="text-[#2C3E50]"><strong>Relatórios Visuais:</strong> Veja gráficos de faturamento mensal e anual.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#6BA587] flex-shrink-0 mt-1" />
                  <span className="text-[#2C3E50]"><strong>Funciona Offline:</strong> Baixe e use no celular, tablet ou computador, sem precisar de internet.</span>
                </li>
              </ul>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-[#1B4965] mb-4 font-['Lexend',_sans-serif]">
                Seu Assistente Financeiro de Bolso
              </h2>
              <p className="text-[#2C3E50] mb-6 leading-relaxed">
                Chega de planilhas complicadas ou anotações em caderno. O MusicoPro foi desenvolvido especificamente para a realidade do músico brasileiro. Simples, direto e poderoso.
              </p>
              <div className="inline-block bg-[#E8F5E9] text-[#6BA587] px-4 py-2 rounded-lg font-bold text-sm">
                🎁 Bônus exclusivo desta oferta
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preço e CTA */}
      <section id="comprar" className="py-20 bg-[#F9F7F4]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1B4965] mb-12 font-['Lexend',_sans-serif]">
            Comece a Profissionalizar sua Carreira Hoje
          </h2>
          
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-[#E8E3DC] relative">
            <div className="absolute top-0 right-0 bg-[#E07856] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              MAIS VENDIDO
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold text-[#2C3E50] mb-2">Kit MusicoPro Completo</h3>
              <p className="text-gray-500 text-sm mb-6">Acesso vitalício a todo o conteúdo</p>
              
              <div className="flex justify-center items-baseline gap-1 mb-8">
                <span className="text-gray-400 text-lg line-through">R$ 197,00</span>
                <span className="text-4xl font-bold text-[#1B4965]">R$ 97,00</span>
              </div>

              <ul className="space-y-4 mb-8 text-left">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#6BA587] shrink-0 mt-1" />
                  <span><strong>Licença PRO Vitalícia:</strong> Desbloqueie todas as funções do App.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#6BA587] shrink-0 mt-1" />
                  <span><strong>E-book PDF (Download):</strong> Guia completo para ler offline.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#6BA587] shrink-0 mt-1" />
                  <span><strong>Pacote de Checklists:</strong> Organização fiscal mês a mês.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#6BA587] shrink-0 mt-1" />
                  <span><strong>Atualizações Garantidas:</strong> Acesso às novas versões do App.</span>
                </li>
              </ul>

              <a 
                href="https://pay.hotmart.com/SEU_LINK_AQUI" 
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#E07856] hover:bg-[#D06846] text-white text-xl font-bold py-4 rounded-xl shadow-lg transform hover:-translate-y-1 transition mb-4"
              >
                Comprar Licença PRO
              </a>
              <a 
                href="/app-musico-pro.html" 
                download
                className="block w-full bg-white border-2 border-[#1B4965] text-[#1B4965] hover:bg-gray-50 text-lg font-bold py-3 rounded-xl transition"
              >
                Baixar App Grátis (Versão Free)
              </a>
              <p className="text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                <ShieldCheck size={12} /> Pagamento 100% seguro via Hotmart
              </p>
            </div>
            <div className="bg-gray-50 p-4 text-xs text-gray-500 border-t border-gray-100">
              Garantia incondicional de 7 dias. Se não gostar, devolvemos seu dinheiro.
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1B4965] text-white py-8 text-center text-sm opacity-90">
        <div className="container mx-auto px-4">
          <p>&copy; 2026 Guia IR para Músicos. Todos os direitos reservados.</p>
          <p className="mt-2 text-xs opacity-70">Este site não possui vínculo com a Receita Federal.</p>
        </div>
      </footer>
    </div>
  );
}
