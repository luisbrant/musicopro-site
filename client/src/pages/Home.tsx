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
            </div>

            <p className="text-xs opacity-80">
              Ativação por e-mail (o mesmo usado na compra). Sem mensalidade.
            </p>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section id="como-funciona" className="mb-16 md:mb-20 space-y-8 scroll-mt-24">
          <div className="text-center space-y-2">
            <h3 className="text-3xl md:text-4xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
              Como funciona o pacote
            </h3>
            <p className="text-lg text-[#0c2461] opacity-75">
              3 passos simples para parar de adivinhar imposto
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#f0f4f8] rounded-lg p-6 space-y-4 border-t-4 border-[#d4af37]">
              <div className="text-4xl font-bold text-[#d4af37]">1</div>
              <h4 className="text-xl font-bold text-[#0c2461]">Aprenda (Guia)</h4>
              <p className="text-[#0c2461] opacity-85">
                Entenda suas regras: renda, despesas, carnê-leão, prazos e situações comuns de músico.
              </p>
            </div>

            <div className="bg-[#f0f4f8] rounded-lg p-6 space-y-4 border-t-4 border-[#d4af37]">
              <div className="text-4xl font-bold text-[#d4af37]">2</div>
              <h4 className="text-xl font-bold text-[#0c2461]">Configure (App)</h4>
              <p className="text-[#0c2461] opacity-85">
                Com a base do guia, você preenche com segurança e organiza seus lançamentos do jeito certo.
              </p>
            </div>

            <div className="bg-[#f0f4f8] rounded-lg p-6 space-y-4 border-t-4 border-[#d4af37]">
              <div className="text-4xl font-bold text-[#d4af37]">3</div>
              <h4 className="text-xl font-bold text-[#0c2461]">Mantenha (rotina)</h4>
              <p className="text-[#0c2461] opacity-85">
                O app calcula e te dá clareza mês a mês — e você entende o resultado porque aprendeu no guia.
              </p>
            </div>
          </div>
        </section>

        {/* BENEFÍCIOS */}
        <section className="mb-16 md:mb-20 bg-[#f0f4f8] rounded-lg p-8 md:p-12 space-y-8">
          <h3 className="text-3xl md:text-4xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
            Benefícios do pacote Músico Pro
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <Check className="w-6 h-6 text-[#d4af37] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#0c2461] mb-1">Clareza antes da multa</h4>
                <p className="text-[#0c2461] opacity-85">Entenda as regras e saiba quanto pagar antes do prazo.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Check className="w-6 h-6 text-[#d4af37] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#0c2461] mb-1">Aplicação prática</h4>
                <p className="text-[#0c2461] opacity-85">O app operacionaliza o que você aprendeu no guia.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Check className="w-6 h-6 text-[#d4af37] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#0c2461] mb-1">Sem planilha</h4>
                <p className="text-[#0c2461] opacity-85">Tudo organizado em um só lugar, com rotina mensal.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Check className="w-6 h-6 text-[#d4af37] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#0c2461] mb-1">100% Privado</h4>
                <p className="text-[#0c2461] opacity-85">Seus dados ficam no seu navegador. Nada vai para servidor.</p>
              </div>
            </div>
          </div>
        </section>

        {/* GRÁTIS vs PRO (recontextualizado como pacote) */}
        <section className="mb-16 md:mb-20 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-3xl md:text-4xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
              O que você ganha com o pacote
            </h3>
            <p className="text-[#0c2461] opacity-75">
              O app pode ser testado. O pacote libera o método completo (Guia + recursos PRO).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-[#d4af37]">
                  <th className="px-4 py-3 text-[#0c2461] font-bold">Recurso</th>
                  <th className="px-4 py-3 text-center text-[#0c2461] font-bold">Teste</th>
                  <th className="px-4 py-3 text-center text-[#0c2461] font-bold">Pacote (Guia + App)</th>
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
                  <td className="px-4 py-3 text-[#0c2461]">Guia fiscal completo (método)</td>
                  <td className="px-4 py-3 text-center">—</td>
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
                <tr>
                  <td className="px-4 py-3 text-[#0c2461]">Consultor IA</td>
                  <td className="px-4 py-3 text-center">—</td>
                  <td className="px-4 py-3 text-center"><Check className="w-5 h-5 text-[#d4af37] mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-center">
            <Link href="/pro">
              <button
                onClick={() => trackBuyClick()}
                className="mt-6 bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-8 py-4 rounded-lg transition text-lg shadow-lg hover:shadow-xl"
              >
                👉 Ver oferta do pacote (Guia + App)
              </button>
            </Link>
          </div>
        </section>

        {/* PRIVACIDADE */}
        <section className="mb-16 md:mb-20 bg-[#f0f4f8] rounded-lg p-8 md:p-12 space-y-4 border-l-4 border-[#d4af37]">
          <h3 className="text-2xl font-bold text-[#0c2461]">🔒 Seus dados são seus</h3>
          <p className="text-lg text-[#0c2461] opacity-90">
            O Músico Pro funciona 100% no seu navegador. Seus dados financeiros nunca são enviados para a internet.
            Você tem controle total.
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
                Você precisa de internet para acessar e ativar. Depois, o app pode funcionar offline.
                Seus dados ficam salvos no seu navegador.
              </p>
            </details>

            <details className="bg-[#f0f4f8] rounded-lg p-6 cursor-pointer group">
              <summary className="flex items-center justify-between font-bold text-[#0c2461] text-lg">
                Meus dados são seguros?
                <span className="group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-[#0c2461] opacity-85 mt-4">
                Sim. Seus dados ficam 100% no seu navegador e não são enviados para servidor.
              </p>
            </details>

            <details className="bg-[#f0f4f8] rounded-lg p-6 cursor-pointer group">
              <summary className="flex items-center justify-between font-bold text-[#0c2461] text-lg">
                Quanto custa?
                <span className="group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-[#0c2461] opacity-85 mt-4">
                O pacote Músico Pro inclui <strong>Guia + App</strong> e libera os recursos avançados (recibos, contratos, IA, etc).
                A ativação é por <strong>e-mail</strong> (o mesmo usado na compra).
              </p>
            </details>

            <details className="bg-[#f0f4f8] rounded-lg p-6 cursor-pointer group">
              <summary className="flex items-center justify-between font-bold text-[#0c2461] text-lg">
                Posso pedir reembolso?
                <span className="group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-[#0c2461] opacity-85 mt-4">
                Sim. Você pode solicitar reembolso dentro do prazo de garantia informado no checkout (ex.: 7 dias).
              </p>
            </details>
          </div>
        </section>

        {/* GUIA FISCAL SECTION (corrigida: sem "desbloquear com código") */}
        <section className="mb-16 md:mb-20 bg-gradient-to-r from-[#d4af37]/10 to-[#d4af37]/5 rounded-lg p-8 md:p-12 border-2 border-[#d4af37] space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold text-[#0c2461]">📘 O Guia é parte do pacote</h3>
          <p className="text-lg text-[#0c2461] opacity-90">
            O Guia ensina o método (regras e decisões). O App executa na prática (rotina e cálculos).
            Um sem o outro fica incompleto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/guia">
              <button className="bg-transparent hover:bg-[#d4af37]/20 text-[#0c2461] font-bold px-6 py-3 rounded-lg transition border-2 border-[#d4af37]">
                📖 Ler o Guia (começar)
              </button>
            </Link>

            <Link href="/pro">
              <button
                onClick={() => trackBuyClick()}
                className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-6 py-3 rounded-lg transition"
              >
                👉 Ativar pacote (Guia + App)
              </button>
            </Link>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="mb-16 text-center space-y-6">
          <h3 className="text-3xl md:text-4xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
            Quer fazer do jeito certo (sem adivinhar)?
          </h3>

          <Link href="/pro">
            <button
              onClick={() => trackBuyClick()}
              className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-8 py-4 rounded-lg transition text-lg shadow-lg hover:shadow-xl"
            >
              👉 Começar pacote completo (Guia + App)
            </button>
          </Link>

          <div className="text-sm text-[#0c2461] opacity-70">
            Prefere começar pela teoria? <Link href="/guia"><span className="underline">Abra o Guia</span></Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
