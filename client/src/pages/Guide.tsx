import { useState, useEffect } from 'react';
import { Music, Menu, X, Lock, Unlock, Check, AlertCircle } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';

const GUIA_CODE = 'GUIA-MUSICOPRO-2026';

export default function Guide() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [codeMessage, setCodeMessage] = useState('');
  const [codeError, setCodeError] = useState(false);

  useEffect(() => {
    // Verificar se já foi desbloqueado
    const unlocked = localStorage.getItem('mp_guia_unlocked') === 'true';
    setIsUnlocked(unlocked);
  }, []);

  const handleUnlock = () => {
    if (codeInput.toUpperCase() === GUIA_CODE) {
      localStorage.setItem('mp_guia_unlocked', 'true');
      localStorage.setItem('mp_guia_unlocked_at', Date.now().toString());
      setIsUnlocked(true);
      setCodeMessage('✅ Guia PRO liberado neste dispositivo.');
      setCodeError(false);
      setCodeInput('');
      setTimeout(() => setCodeMessage(''), 3000);
    } else {
      setCodeMessage('❌ Código inválido. Confira o e-mail de compra.');
      setCodeError(true);
      setTimeout(() => setCodeMessage(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E8E3DC]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="w-8 h-8 text-[#d4af37]" />
            <div>
              <h1 className="font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>Músico Pro</h1>
              <p className="text-xs text-[#6ba587]">Guia Fiscal do Músico Autônomo</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/">
              <button className="text-[#0c2461] hover:text-[#d4af37] transition font-medium">
                App
              </button>
            </Link>
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
          <Link href="/">
            <button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">
              App
            </button>
          </Link>
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
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* HERO */}
        <section className="mb-16 space-y-6">
          <div className="bg-gradient-to-br from-[#0c2461] to-[#1a3a7a] rounded-lg p-8 md:p-12 text-white space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Guia Fiscal do Músico Autônomo
            </h2>
            <p className="text-xl opacity-95 font-medium">
              Entenda como organizar cachês, PIX, aulas e despesas — e use o app com segurança.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/">
                <button className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-6 py-3 rounded-lg transition">
                  ← Voltar para o App
                </button>
              </Link>
              <Link href="/pro">
                <button className="bg-transparent hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition border border-white/50">
                  Comprar Licença PRO
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* O QUE VOCÊ VAI APRENDER */}
        <section className="mb-16 space-y-6">
          <h3 className="text-3xl font-bold text-[#0c2461]">O que você vai aprender</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex gap-3 bg-[#f0f4f8] p-4 rounded-lg">
              <Check className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
              <p className="text-[#0c2461]">Quando você precisa declarar imposto</p>
            </div>
            <div className="flex gap-3 bg-[#f0f4f8] p-4 rounded-lg">
              <Check className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
              <p className="text-[#0c2461]">O que entra como rendimento</p>
            </div>
            <div className="flex gap-3 bg-[#f0f4f8] p-4 rounded-lg">
              <Check className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
              <p className="text-[#0c2461]">Despesas comuns e critérios</p>
            </div>
            <div className="flex gap-3 bg-[#f0f4f8] p-4 rounded-lg">
              <Check className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
              <p className="text-[#0c2461]">Exemplos de cenários reais</p>
            </div>
            <div className="flex gap-3 bg-[#f0f4f8] p-4 rounded-lg">
              <Check className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
              <p className="text-[#0c2461]">Erros que levam a multa</p>
            </div>
            <div className="flex gap-3 bg-[#f0f4f8] p-4 rounded-lg">
              <Check className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
              <p className="text-[#0c2461]">Rotina mensal de 15 minutos</p>
            </div>
          </div>
        </section>

        {/* CONTEÚDO GRATUITO */}
        <section className="mb-16 space-y-8">
          <h3 className="text-3xl font-bold text-[#0c2461]">Conteúdo Gratuito</h3>

          {/* Capítulo 1 */}
          <div className="bg-[#f0f4f8] rounded-lg p-8 space-y-4">
            <h4 className="text-2xl font-bold text-[#0c2461]">Capítulo 1: Visão Geral</h4>
            <p className="text-[#0c2461] leading-relaxed">
              <strong>O que é renda tributável para músico?</strong>
            </p>
            <p className="text-[#0c2461] opacity-90 leading-relaxed">
              Como músico autônomo, você precisa declarar qualquer valor que receba pelo seu trabalho. Isso inclui cachês de shows, aulas de música, PIX de clientes, apresentações em eventos, etc.
            </p>
            <p className="text-[#0c2461] opacity-90 leading-relaxed">
              A regra é simples: se você recebeu dinheiro (ou PIX, ou transferência) em troca de um serviço musical, isso é rendimento tributável.
            </p>
            <p className="text-[#0c2461] opacity-90 leading-relaxed">
              Existem exceções (como presentes de familiares), mas a maioria dos músicos precisa declarar tudo que ganha.
            </p>
          </div>

          {/* Capítulo 2 */}
          <div className="bg-[#f0f4f8] rounded-lg p-8 space-y-4">
            <h4 className="text-2xl font-bold text-[#0c2461]">Capítulo 2: Vida Pessoal vs Trabalho</h4>
            <p className="text-[#0c2461] leading-relaxed">
              <strong>Como separar vida pessoal de vida profissional?</strong>
            </p>
            <p className="text-[#0c2461] opacity-90 leading-relaxed">
              A separação é importante para fins fiscais. Você só declara como despesa o que está diretamente ligado ao seu trabalho como músico.
            </p>
            <ul className="space-y-2 text-[#0c2461] opacity-90">
              <li>✅ <strong>Dedutível:</strong> Compra de instrumentos, corda de violão, afinador, amplificador, transporte para show</li>
              <li>✅ <strong>Dedutível:</strong> Hospedagem em viagem para apresentação, alimentação durante evento</li>
              <li>❌ <strong>Não dedutível:</strong> Alimentação do dia a dia, aluguel da casa, conta de luz (a menos que tenha estúdio em casa)</li>
            </ul>
          </div>

          {/* Capítulo 3 */}
          <div className="bg-[#f0f4f8] rounded-lg p-8 space-y-4">
            <h4 className="text-2xl font-bold text-[#0c2461]">Capítulo 3: Recebimentos</h4>
            <p className="text-[#0c2461] leading-relaxed">
              <strong>PIX, cachê, aulas, eventos — como registrar?</strong>
            </p>
            <p className="text-[#0c2461] opacity-90 leading-relaxed">
              Todos os tipos de recebimento devem ser registrados. Não importa se é PIX, dinheiro em mão, transferência ou cheque.
            </p>
            <p className="text-[#0c2461] opacity-90 leading-relaxed">
              O importante é: <strong>registre tudo</strong>. Depois, o app calcula automaticamente quanto você precisa pagar de imposto.
            </p>
          </div>

          {/* Capítulo 4 */}
          <div className="bg-[#f0f4f8] rounded-lg p-8 space-y-4">
            <h4 className="text-2xl font-bold text-[#0c2461]">Capítulo 4: Despesas Dedutíveis</h4>
            <p className="text-[#0c2461] leading-relaxed">
              <strong>O que costuma ser aceito?</strong>
            </p>
            <ul className="space-y-2 text-[#0c2461] opacity-90">
              <li>🎸 Instrumentos e acessórios (cordas, palhetas, afinador)</li>
              <li>🎤 Equipamento de som (microfone, amplificador, caixa)</li>
              <li>🚗 Transporte (Uber, combustível, estacionamento para show)</li>
              <li>🏨 Hospedagem em viagem para apresentação</li>
              <li>📚 Cursos e aulas de música</li>
              <li>💾 Software de produção musical</li>
            </ul>
          </div>

          {/* Capítulo 5 */}
          <div className="bg-[#f0f4f8] rounded-lg p-8 space-y-4">
            <h4 className="text-2xl font-bold text-[#0c2461]">Capítulo 5: Checklist Mensal</h4>
            <p className="text-[#0c2461] leading-relaxed">
              <strong>Rotina de 15 minutos</strong>
            </p>
            <ol className="space-y-2 text-[#0c2461] opacity-90">
              <li>1. Abra o app no último dia do mês</li>
              <li>2. Revise todos os recebimentos (PIX, cachês, aulas)</li>
              <li>3. Adicione as despesas do mês</li>
              <li>4. Vá na aba "Carnê-Leão" para ver o resultado</li>
              <li>5. Se houver imposto, anote a data de pagamento</li>
              <li>6. Faça um backup dos dados</li>
            </ol>
          </div>
        </section>

        {/* ÁREA BLOQUEADA */}
        <section id="desbloquear" className="mb-16 space-y-8">
          {isUnlocked ? (
            <>
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 flex gap-3">
                <Unlock className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-green-900">Guia PRO Desbloqueado</h4>
                  <p className="text-green-800 text-sm">Você agora tem acesso ao conteúdo completo.</p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Capítulo 6 */}
                <div className="bg-[#f0f4f8] rounded-lg p-8 space-y-4 border-l-4 border-[#d4af37]">
                  <h4 className="text-2xl font-bold text-[#0c2461]">Capítulo 6: Casos Práticos</h4>
                  <p className="text-[#0c2461] leading-relaxed">
                    <strong>5 cenários reais de músicos</strong>
                  </p>
                  <div className="space-y-4 text-[#0c2461] opacity-90">
                    <div>
                      <p className="font-semibold">Caso 1: Músico que toca em bares</p>
                      <p>Recebe R$ 800/mês em 4 apresentações. Gasta R$ 200 em transporte. Resultado: R$ 600 tributável.</p>
                    </div>
                    <div>
                      <p className="font-semibold">Caso 2: Professor de aulas particulares</p>
                      <p>Recebe R$ 2.000/mês em aulas. Gasta R$ 300 em material. Resultado: R$ 1.700 tributável.</p>
                    </div>
                    <div>
                      <p className="font-semibold">Caso 3: Músico que viaja para eventos</p>
                      <p>Recebe R$ 5.000 por show. Gasta R$ 1.500 em hospedagem e transporte. Resultado: R$ 3.500 tributável.</p>
                    </div>
                  </div>
                </div>

                {/* Capítulo 7 */}
                <div className="bg-[#f0f4f8] rounded-lg p-8 space-y-4 border-l-4 border-[#d4af37]">
                  <h4 className="text-2xl font-bold text-[#0c2461]">Capítulo 7: Retenção de CNPJ</h4>
                  <p className="text-[#0c2461] leading-relaxed">
                    <strong>Como registrar quando há retenção?</strong>
                  </p>
                  <p className="text-[#0c2461] opacity-90 leading-relaxed">
                    Algumas empresas retêm 11% de INSS quando pagam músicos. Isso é normal. No app, você registra o valor bruto, e o sistema calcula automaticamente.
                  </p>
                </div>

                {/* Capítulo 8 */}
                <div className="bg-[#f0f4f8] rounded-lg p-8 space-y-4 border-l-4 border-[#d4af37]">
                  <h4 className="text-2xl font-bold text-[#0c2461]">Capítulo 8: Declaração Anual</h4>
                  <p className="text-[#0c2461] leading-relaxed">
                    <strong>Como se preparar para o Imposto de Renda?</strong>
                  </p>
                  <p className="text-[#0c2461] opacity-90 leading-relaxed">
                    Use o app durante todo o ano para manter os dados atualizados. No final do ano, exporte o relatório e leve para seu contador.
                  </p>
                </div>

                {/* Capítulo 9 */}
                <div className="bg-[#f0f4f8] rounded-lg p-8 space-y-4 border-l-4 border-[#d4af37]">
                  <h4 className="text-2xl font-bold text-[#0c2461]">Capítulo 9: Erros Comuns</h4>
                  <p className="text-[#0c2461] leading-relaxed">
                    <strong>Lista de erros que travam o músico</strong>
                  </p>
                  <ul className="space-y-2 text-[#0c2461] opacity-90">
                    <li>❌ Não registrar PIX porque "é informal"</li>
                    <li>❌ Misturar despesas pessoais com profissionais</li>
                    <li>❌ Esquecer de guardar comprovantes</li>
                    <li>❌ Declarar despesas sem nota fiscal</li>
                    <li>❌ Não fazer backup dos dados</li>
                  </ul>
                </div>

                {/* Capítulo 10 */}
                <div className="bg-[#f0f4f8] rounded-lg p-8 space-y-4 border-l-4 border-[#d4af37]">
                  <h4 className="text-2xl font-bold text-[#0c2461]">Capítulo 10: Rotina Mensal com o App</h4>
                  <p className="text-[#0c2461] leading-relaxed">
                    <strong>Passo a passo detalhado</strong>
                  </p>
                  <ol className="space-y-3 text-[#0c2461] opacity-90">
                    <li><strong>1.</strong> Abra o app no último dia do mês</li>
                    <li><strong>2.</strong> Clique em "+ RECEITA" e adicione cada recebimento</li>
                    <li><strong>3.</strong> Clique em "- DESPESA" e adicione cada gasto</li>
                    <li><strong>4.</strong> Vá na aba "Carnê-Leão" para ver o resultado</li>
                    <li><strong>5.</strong> Se houver imposto, gere o DARF e pague</li>
                    <li><strong>6.</strong> Faça backup clicando em "Baixar Backup"</li>
                  </ol>
                </div>
              </div>

              <div className="bg-[#f0f4f8] rounded-lg p-8 space-y-4 border-l-4 border-[#d4af37]">
                <h4 className="text-xl font-bold text-[#0c2461]">Próximos passos</h4>
                <div className="space-y-3">
                  <a href="https://app.musicopro.app.br/pwa/index.html" target="_blank" rel="noopener noreferrer">
                    <button className="w-full bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-6 py-3 rounded-lg transition">
                      🚀 Abrir App agora
                    </button>
                  </a>
                  <Link href="/pro">
                    <button className="w-full bg-transparent hover:bg-[#d4af37]/20 text-[#0c2461] font-bold px-6 py-3 rounded-lg transition border-2 border-[#d4af37]">
                      📊 Ver Licença PRO
                    </button>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-[#fff4e6] border-2 border-[#d4af37] rounded-lg p-8 space-y-6">
              <div className="flex gap-3">
                <Lock className="w-6 h-6 text-[#d4af37] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-bold text-[#0c2461]">Desbloquear Guia PRO</h4>
                  <p className="text-[#0c2461] opacity-90">Comprou a Licença PRO? Digite seu código do Guia para liberar o conteúdo completo neste dispositivo.</p>
                </div>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  placeholder="Código do Guia"
                  className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
                />
                <button
                  onClick={handleUnlock}
                  className="w-full bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-6 py-3 rounded-lg transition"
                >
                  🔓 Desbloquear
                </button>
              </div>

              {codeMessage && (
                <div className={`p-4 rounded-lg text-center font-semibold ${codeError ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                  {codeMessage}
                </div>
              )}

              <div className="bg-white p-4 rounded-lg border border-[#E8E3DC] space-y-2">
                <p className="text-sm text-[#0c2461] opacity-75">
                  <strong>Não tem o código?</strong> Compre a Licença PRO para receber seu código por e-mail.
                </p>
                <Link href="/pro">
                  <button className="text-[#d4af37] hover:text-[#c99a2e] font-semibold text-sm">
                    → Comprar Licença PRO
                  </button>
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
