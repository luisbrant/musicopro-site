import { useState } from 'react';
import { Music, Menu, X, Check, HelpCircle } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';
import { useAnalytics } from '@/hooks/useAnalytics';

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
              <h1 className="font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>Músico Pro</h1>
              <p className="text-xs text-[#6ba587]">App para organizar sua vida fiscal</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/guia" className="text-[#0c2461] hover:text-[#d4af37] transition font-medium">
              Guia Gratuito
            </a>
            <Link href="/pro">
              <button className="text-[#0c2461] hover:text-[#d4af37] transition font-medium">
                Licença PRO
              </button>
            </Link>
            <a href="https://app.musicopro.app.br/pwa/index.html" target="_blank" rel="noopener noreferrer">
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-[#0c2461] text-white p-4 space-y-2">
          <a href="/guia">
            <button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">
              Guia Gratuito
            </button>
          </a>
          <Link href="/pro">
            <button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">
              Licença PRO
            </button>
          </Link>
          <a href="https://app.musicopro.app.br/pwa/index.html" target="_blank" rel="noopener noreferrer">
            <button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition font-bold">
              Abrir App
            </button>
          </a>
        </nav>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* HERO SECTION */}
        <section className="mb-16 md:mb-20">
          <div className="bg-gradient-to-br from-[#0c2461] to-[#1a3a7a] rounded-lg p-8 md:p-12 text-white space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Imposto sem medo, do jeito certo.
            </h2>
            <p className="text-xl md:text-2xl opacity-95 font-medium">
              Organize receitas, despesas e saiba com antecedência quanto pagar de imposto.
            </p>
            <p className="text-lg opacity-90">
              Funciona direto no navegador — otimizado para celular, tablet e computador.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="https://app.musicopro.app.br/pwa/index.html" target="_blank" rel="noopener noreferrer">
                <button
                  onClick={() => trackDownloadAppClick()}
                  className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-8 py-4 rounded-lg transition w-full sm:w-auto text-lg shadow-lg hover:shadow-xl"
                >
                  👉 Usar App Grátis
                </button>
              </a>
              <Link href="/pro">
                <button
                  onClick={() => trackBuyClick()}
                  className="bg-transparent hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition border border-white/50 w-full sm:w-auto text-lg"
                >
                  👉 Comprar Licença PRO
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="mb-16 md:mb-20 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-3xl md:text-4xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
              Como funciona
            </h3>
            <p className="text-lg text-[#0c2461] opacity-75">
              3 passos simples para organizar sua vida fiscal
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#f0f4f8] rounded-lg p-6 space-y-4 border-t-4 border-[#d4af37]">
              <div className="text-4xl font-bold text-[#d4af37]">1</div>
              <h4 className="text-xl font-bold text-[#0c2461]">Registre seus ganhos</h4>
              <p className="text-[#0c2461] opacity-85">
                Adicione cada PIX, cachê ou aula que você recebe. Leva 10 segundos.
              </p>
            </div>

            <div className="bg-[#f0f4f8] rounded-lg p-6 space-y-4 border-t-4 border-[#d4af37]">
              <div className="text-4xl font-bold text-[#d4af37]">2</div>
              <h4 className="text-xl font-bold text-[#0c2461]">Lançar despesas</h4>
              <p className="text-[#0c2461] opacity-85">
                Registre o que você gastou com instrumentos, transporte, hospedagem, etc.
              </p>
            </div>

            <div className="bg-[#f0f4f8] rounded-lg p-6 space-y-4 border-t-4 border-[#d4af37]">
              <div className="text-4xl font-bold text-[#d4af37]">3</div>
              <h4 className="text-xl font-bold text-[#0c2461]">Veja o resultado</h4>
              <p className="text-[#0c2461] opacity-85">
                Saiba se está isento ou quanto precisa pagar de imposto no mês.
              </p>
            </div>
          </div>
        </section>

        {/* BENEFÍCIOS */}
        <section className="mb-16 md:mb-20 bg-[#f0f4f8] rounded-lg p-8 md:p-12 space-y-8">
          <h3 className="text-3xl md:text-4xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
            Benefícios do Músico Pro
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <Check className="w-6 h-6 text-[#d4af37] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#0c2461] mb-1">Clareza antes da multa</h4>
                <p className="text-[#0c2461] opacity-85">Saiba quanto pagar antes do prazo, não depois.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Check className="w-6 h-6 text-[#d4af37] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#0c2461] mb-1">Mês a mês</h4>
                <p className="text-[#0c2461] opacity-85">Acompanhe seu resultado todos os meses, não só no final do ano.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Check className="w-6 h-6 text-[#d4af37] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#0c2461] mb-1">Sem planilha</h4>
                <p className="text-[#0c2461] opacity-85">Tudo organizado em um app, não espalhado em vários arquivos.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Check className="w-6 h-6 text-[#d4af37] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#0c2461] mb-1">100% Privado</h4>
                <p className="text-[#0c2461] opacity-85">Seus dados ficam no seu navegador. Nada é enviado para a internet.</p>
              </div>
            </div>
          </div>
        </section>

        {/* GRÁTIS vs PRO */}
        <section className="mb-16 md:mb-20 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-3xl md:text-4xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
              Grátis vs PRO
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-[#d4af37]">
                  <th className="px-4 py-3 text-[#0c2461] font-bold">Recurso</th>
                  <th className="px-4 py-3 text-center text-[#0c2461] font-bold">Grátis</th>
                  <th className="px-4 py-3 text-center text-[#0c2461] font-bold">PRO</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#E8E3DC]">
                  <td className="px-4 py-3 text-[#0c2461]">Registrar receitas e despesas</td>
                  <td className="px-4 py-3 text-center"><Check className="w-5 h-5 text-[#d4af37] mx-auto" /></td>
                  <td className="px-4 py-3 text-center"><Check className="w-5 h-5 text-[#d4af37] mx-auto" /></td>
                </tr>
                <tr className="border-b border-[#E8E3DC]">
                  <td className="px-4 py-3 text-[#0c2461]">Calcular imposto (Carnê-Leão)</td>
                  <td className="px-4 py-3 text-center"><Check className="w-5 h-5 text-[#d4af37] mx-auto" /></td>
                  <td className="px-4 py-3 text-center"><Check className="w-5 h-5 text-[#d4af37] mx-auto" /></td>
                </tr>
                <tr className="border-b border-[#E8E3DC]">
                  <td className="px-4 py-3 text-[#0c2461]">Gerar recibos profissionais</td>
                  <td className="px-4 py-3 text-center">—</td>
                  <td className="px-4 py-3 text-center"><Check className="w-5 h-5 text-[#d4af37] mx-auto" /></td>
                </tr>
                <tr className="border-b border-[#E8E3DC]">
                  <td className="px-4 py-3 text-[#0c2461]">Gerar contratos</td>
                  <td className="px-4 py-3 text-center">—</td>
                  <td className="px-4 py-3 text-center"><Check className="w-5 h-5 text-[#d4af37] mx-auto" /></td>
                </tr>
                <tr className="border-b border-[#E8E3DC]">
                  <td className="px-4 py-3 text-[#0c2461]">Consultor IA</td>
                  <td className="px-4 py-3 text-center">—</td>
                  <td className="px-4 py-3 text-center"><Check className="w-5 h-5 text-[#d4af37] mx-auto" /></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-[#0c2461]">Guia Fiscal completo</td>
                  <td className="px-4 py-3 text-center">—</td>
                  <td className="px-4 py-3 text-center"><Check className="w-5 h-5 text-[#d4af37] mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* PRIVACIDADE */}
        <section className="mb-16 md:mb-20 bg-[#f0f4f8] rounded-lg p-8 md:p-12 space-y-4 border-l-4 border-[#d4af37]">
          <h3 className="text-2xl font-bold text-[#0c2461]">🔒 Seus dados são seus</h3>
          <p className="text-lg text-[#0c2461] opacity-90">
            O Músico Pro funciona 100% no seu navegador. Seus dados financeiros nunca são enviados para a internet. Você tem controle total.
          </p>
        </section>

        {/* FAQ */}
        <section className="mb-16 md:mb-20 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-3xl md:text-4xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
              Perguntas frequentes
            </h3>
          </div>

          <div className="space-y-4">
            <details className="bg-[#f0f4f8] rounded-lg p-6 cursor-pointer group">
              <summary className="flex items-center justify-between font-bold text-[#0c2461] text-lg">
                Preciso de internet para usar?
                <span className="group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-[#0c2461] opacity-85 mt-4">
                Você precisa de internet apenas para acessar o app. Depois, ele funciona offline. Seus dados ficam salvos no seu navegador.
              </p>
            </details>

            <details className="bg-[#f0f4f8] rounded-lg p-6 cursor-pointer group">
              <summary className="flex items-center justify-between font-bold text-[#0c2461] text-lg">
                Meus dados são seguros?
                <span className="group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-[#0c2461] opacity-85 mt-4">
                Sim. Seus dados ficam 100% no seu navegador e nunca são enviados para a internet. Você tem controle total.
              </p>
            </details>

            <details className="bg-[#f0f4f8] rounded-lg p-6 cursor-pointer group">
              <summary className="flex items-center justify-between font-bold text-[#0c2461] text-lg">
                Posso usar em múltiplos dispositivos?
                <span className="group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-[#0c2461] opacity-85 mt-4">
                Sim, o app funciona em qualquer navegador. Mas os dados são locais de cada dispositivo. Use a função Backup para sincronizar entre dispositivos.
              </p>
            </details>

            <details className="bg-[#f0f4f8] rounded-lg p-6 cursor-pointer group">
              <summary className="flex items-center justify-between font-bold text-[#0c2461] text-lg">
                O app substitui um contador?
                <span className="group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-[#0c2461] opacity-85 mt-4">
                Não. O Músico Pro ajuda você a organizar dados e entender seu resultado fiscal. Para declaração oficial, consulte um contador.
              </p>
            </details>

            <details className="bg-[#f0f4f8] rounded-lg p-6 cursor-pointer group">
              <summary className="flex items-center justify-between font-bold text-[#0c2461] text-lg">
                Quanto custa?
                <span className="group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-[#0c2461] opacity-85 mt-4">
                O app é grátis. A Licença PRO inclui recursos avançados como recibos, contratos e o Guia Fiscal completo.
              </p>
            </details>

            <details className="bg-[#f0f4f8] rounded-lg p-6 cursor-pointer group">
              <summary className="flex items-center justify-between font-bold text-[#0c2461] text-lg">
                Posso cancelar a Licença PRO?
                <span className="group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-[#0c2461] opacity-85 mt-4">
                Sim. Você pode cancelar a qualquer momento. Sem compromisso.
              </p>
            </details>
          </div>
        </section>

        {/* GUIA FISCAL SECTION */}
        <section className="mb-16 md:mb-20 bg-gradient-to-r from-[#d4af37]/10 to-[#d4af37]/5 rounded-lg p-8 md:p-12 border-2 border-[#d4af37] space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold text-[#0c2461]">📘 Guia Fiscal do Músico</h3>
          <p className="text-lg text-[#0c2461] opacity-90">
            Você também pode acessar nosso Guia Fiscal em formato de site. Ele explica a teoria e os casos comuns — e complementa o uso do app.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/guia">
              <button className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-6 py-3 rounded-lg transition">
                📖 Ler Guia Gratuito
              </button>
            </a>
            <a href="/guia#desbloquear">
              <button className="bg-transparent hover:bg-[#d4af37]/20 text-[#0c2461] font-bold px-6 py-3 rounded-lg transition border-2 border-[#d4af37]">
                🔓 Desbloquear com código
              </button>
            </a>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="mb-16 text-center space-y-6">
          <h3 className="text-3xl md:text-4xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
            Pronto para organizar sua vida fiscal?
          </h3>
          <a href="https://app.musicopro.app.br/pwa/index.html" target="_blank" rel="noopener noreferrer">
            <button
              onClick={() => trackDownloadAppClick()}
              className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-8 py-4 rounded-lg transition text-lg shadow-lg hover:shadow-xl"
            >
              👉 Começar a usar o app agora
            </button>
          </a>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
