import { CheckCircle2, Star, Download, ShieldCheck, ArrowRight, Music } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';

export default function Vendas() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E8E3DC]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Music className="w-8 h-8 text-[#d4af37]" />
            <h1 className="font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>Músico Pro</h1>
          </Link>
          <a href="#comprar" className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] px-6 py-2 rounded-lg font-bold transition">
            Comprar Licença PRO
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* HERO */}
        <section className="mb-16 md:mb-20">
          <div className="bg-gradient-to-br from-[#0c2461] to-[#1a3a7a] rounded-lg p-8 md:p-12 text-white space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Licença PRO
            </h2>
            <p className="text-xl md:text-2xl opacity-95 font-medium">
              Desbloqueie recursos avançados + acesso completo ao Guia Fiscal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#comprar" className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-8 py-4 rounded-lg transition text-lg shadow-lg hover:shadow-xl">
                👉 Comprar Agora
              </a>
              <Link href="/guia">
                <button className="bg-transparent hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition border border-white/50 text-lg">
                  📖 Ver Guia Gratuito
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* O QUE INCLUI */}
        <section className="mb-16 md:mb-20 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-3xl md:text-4xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
              O que inclui a Licença PRO
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#f0f4f8] rounded-lg p-8 space-y-4 border-l-4 border-[#d4af37]">
              <h4 className="text-2xl font-bold text-[#0c2461]">🚀 App Completo</h4>
              <ul className="space-y-3 text-[#0c2461] opacity-90">
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span>Registrar receitas e despesas ilimitadas</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span>Calcular Carnê-Leão automaticamente</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span>Gerar recibos profissionais em PDF</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span>Gerar contratos de prestação de serviços</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span>Consultor IA para dúvidas fiscais</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#f0f4f8] rounded-lg p-8 space-y-4 border-l-4 border-[#d4af37]">
              <h4 className="text-2xl font-bold text-[#0c2461]">📘 Guia Fiscal Completo</h4>
              <ul className="space-y-3 text-[#0c2461] opacity-90">
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span>10 capítulos avançados (PRO)</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span>5 casos práticos reais</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span>Rotina mensal passo a passo</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span>Checklist de documentação</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span>Atualizações para 2026</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* BENEFÍCIOS */}
        <section className="mb-16 md:mb-20 bg-[#f0f4f8] rounded-lg p-8 md:p-12 space-y-8">
          <h3 className="text-3xl md:text-4xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
            Benefícios da Licença PRO
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <Star className="w-6 h-6 text-[#d4af37] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#0c2461] mb-1">Recibos Profissionais</h4>
                <p className="text-[#0c2461] opacity-85">Gere recibos em PDF para seus clientes com um clique.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Star className="w-6 h-6 text-[#d4af37] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#0c2461] mb-1">Contratos Automatizados</h4>
                <p className="text-[#0c2461] opacity-85">Crie contratos de prestação de serviços em segundos.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Star className="w-6 h-6 text-[#d4af37] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#0c2461] mb-1">Consultor IA</h4>
                <p className="text-[#0c2461] opacity-85">Faça perguntas sobre impostos e receba respostas personalizadas.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Star className="w-6 h-6 text-[#d4af37] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#0c2461] mb-1">Guia Completo Desbloqueado</h4>
                <p className="text-[#0c2461] opacity-85">Acesso a todos os 10 capítulos avançados do Guia Fiscal.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Star className="w-6 h-6 text-[#d4af37] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#0c2461] mb-1">Suporte Prioritário</h4>
                <p className="text-[#0c2461] opacity-85">Dúvidas? Receba respostas rápidas do nosso time.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Star className="w-6 h-6 text-[#d4af37] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#0c2461] mb-1">Atualizações Garantidas</h4>
                <p className="text-[#0c2461] opacity-85">Receba novas funcionalidades e conteúdo atualizado.</p>
              </div>
            </div>
          </div>
        </section>

        {/* PREÇO E CTA */}
        <section id="comprar" className="mb-16 md:mb-20">
          <div className="max-w-md mx-auto bg-white rounded-lg border-2 border-[#d4af37] shadow-xl overflow-hidden">
            <div className="bg-[#d4af37] text-[#0c2461] px-6 py-4 text-center">
              <p className="font-bold text-lg">Licença PRO Anual</p>
              <p className="text-sm opacity-90">Acesso completo por 12 meses</p>
            </div>

            <div className="p-8 space-y-6">
              <div className="text-center">
                <p className="text-gray-400 line-through mb-2">R$ 197,00</p>
                <p className="text-5xl font-bold text-[#0c2461]">R$ 97,00</p>
                <p className="text-sm text-[#0c2461] opacity-75 mt-2">Acesso imediato após compra</p>
              </div>

              <div className="space-y-3 text-sm text-[#0c2461]">
                <div className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                  <span>App completo com todas as funções</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                  <span>Guia Fiscal com 10 capítulos PRO</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                  <span>Recibos e contratos profissionais</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                  <span>Consultor IA incluído</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                  <span>Suporte prioritário</span>
                </div>
              </div>

              <a
                href="https://pay.hotmart.com/SEU_LINK_AQUI"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold py-4 rounded-lg transition text-center text-lg shadow-lg hover:shadow-xl"
              >
                Comprar Licença PRO
              </a>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center text-sm text-green-800">
                <p className="font-semibold">✅ Garantia de 7 dias</p>
                <p>Se não gostar, devolvemos seu dinheiro.</p>
              </div>

              <div className="text-center text-xs text-[#0c2461] opacity-75 flex items-center justify-center gap-1">
                <ShieldCheck size={14} /> Pagamento 100% seguro via Hotmart
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16 md:mb-20 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-3xl md:text-4xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
              Perguntas frequentes
            </h3>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            <details className="bg-[#f0f4f8] rounded-lg p-6 cursor-pointer group">
              <summary className="flex items-center justify-between font-bold text-[#0c2461] text-lg">
                Qual é a diferença entre Grátis e PRO?
                <span className="group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-[#0c2461] opacity-85 mt-4">
                A versão Grátis permite registrar receitas e despesas, calcular imposto e usar o app básico. A versão PRO adiciona recibos profissionais, contratos, consultor IA e acesso ao Guia Fiscal completo.
              </p>
            </details>

            <details className="bg-[#f0f4f8] rounded-lg p-6 cursor-pointer group">
              <summary className="flex items-center justify-between font-bold text-[#0c2461] text-lg">
                Como recebo o código do Guia PRO?
                <span className="group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-[#0c2461] opacity-85 mt-4">
                Após a compra, você receberá um e-mail com seu código de desbloqueio. Use esse código na página do Guia Fiscal para liberar o conteúdo PRO.
              </p>
            </details>

            <details className="bg-[#f0f4f8] rounded-lg p-6 cursor-pointer group">
              <summary className="flex items-center justify-between font-bold text-[#0c2461] text-lg">
                Posso usar em múltiplos dispositivos?
                <span className="group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-[#0c2461] opacity-85 mt-4">
                Sim. O app funciona em qualquer navegador. Seus dados são locais de cada dispositivo, mas você pode fazer backup e sincronizar entre eles.
              </p>
            </details>

            <details className="bg-[#f0f4f8] rounded-lg p-6 cursor-pointer group">
              <summary className="flex items-center justify-between font-bold text-[#0c2461] text-lg">
                Há limite de tempo para usar?
                <span className="group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-[#0c2461] opacity-85 mt-4">
                A Licença PRO é válida por 12 meses. Você pode renovar a qualquer momento. Mesmo após expirar, seus dados no app permanecem intactos.
              </p>
            </details>

            <details className="bg-[#f0f4f8] rounded-lg p-6 cursor-pointer group">
              <summary className="flex items-center justify-between font-bold text-[#0c2461] text-lg">
                Posso cancelar?
                <span className="group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-[#0c2461] opacity-85 mt-4">
                Sim. Você tem 7 dias de garantia. Se não gostar, devolvemos seu dinheiro sem perguntas. Após esse período, não há reembolso, mas você pode deixar expirar.
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
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="text-center space-y-6 mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
            Pronto para profissionalizar sua carreira?
          </h3>
          <a href="#comprar" className="inline-block bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-8 py-4 rounded-lg transition text-lg shadow-lg hover:shadow-xl">
            👉 Comprar Licença PRO Agora
          </a>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
