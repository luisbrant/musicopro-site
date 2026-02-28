import { CheckCircle, AlertTriangle, FileText, Landmark, FileOutput, ShieldCheck, TrendingDown, PiggyBank } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';

export default function CarneLeao() {
    return (
        <div className="min-h-screen bg-[#fafafa] font-sans text-[#0c2461]">
            <header className="sticky top-0 z-40 bg-white border-b border-[#E8E3DC] shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/">
                        <div className="flex items-center gap-2 cursor-pointer">
                            <span className="font-bold text-xl leading-none" style={{ fontFamily: 'Lexend, sans-serif' }}>
                                Músico Pro
                            </span>
                        </div>
                    </Link>
                    <Link href="/vendas">
                        <button className="bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold px-4 py-2 rounded-lg transition shadow flex items-center gap-2 text-sm">
                            Acessar PRO
                        </button>
                    </Link>
                </div>
            </header>

            <main className="pb-20">

                {/* SEO Header */}
                <section className="bg-white py-20 px-4 border-b border-[#E8E3DC]">
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <div className="inline-block bg-[#fff9e6] border border-[#d4af37]/30 text-[#0c2461] px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                            O Guia Definitivo
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#0c2461]">
                            Carnê-Leão para Músicos
                        </h1>
                        <p className="text-xl md:text-2xl opacity-80 max-w-3xl mx-auto">
                            Tudo o que você precisa saber para não ter problemas com a Receita Federal recebendo cachês e aulas como Pessoa Física.
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-16 px-4 max-w-4xl mx-auto font-medium text-lg text-[#0c2461]">

                    {/* O que é */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <Landmark className="text-[#d4af37] w-8 h-8" /> O que é o Carnê-Leão?
                        </h2>
                        <p className="opacity-80 leading-relaxed mb-4">
                            O Carnê-Leão é o recolhimento mensal obrigatório do Imposto de Renda sobre rendimentos recebidos por pessoas físicas (como cachês de shows com contratantes PF, aulas particulares de música, direitos autorais).
                        </p>
                        <p className="opacity-80 leading-relaxed">
                            Muitos músicos autônomos recebem dinheiro na conta física e esperam para declarar apenas no ano seguinte. Isso é um erro que pode gerar multas de até 50% sobre o valor devido.
                        </p>
                    </div>

                    {/* Quem precisa pagar */}
                    <div className="mb-16 bg-[#f8fafc] p-8 rounded-3xl border border-[#E8E3DC]">
                        <h2 className="text-2xl font-bold mb-4">Quem precisa pagar?</h2>
                        <ul className="space-y-4 opacity-80">
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-green-600 mt-1 shrink-0" />
                                <span>Músicos que recebem de outras <strong>Pessoas Físicas</strong> (ex: Noivos em casamento, alunos particulares sem CNPJ).</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-green-600 mt-1 shrink-0" />
                                <span>Músicos que recebem do <strong>exterior</strong> (ex: plataformas de streaming, YouTube, patrocínios internacionais).</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <AlertTriangle className="text-yellow-600 mt-1 shrink-0" />
                                <span><em>Atenção:</em> O pagamento só é devido se a soma mensal destes rendimentos ultrapassar o limite de isenção da tabela da Receita Federal.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Como músico deve declarar */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <FileText className="text-[#d4af37] w-8 h-8" /> Como o músico deve declarar
                        </h2>
                        <p className="opacity-80 leading-relaxed mb-4">
                            A regra de ouro é: <strong>mantenha um livro-caixa</strong>. O governo permite que trabalhadores autônomos abatam despesas essenciais para o exercício da profissão do valor que receberam antes de calcular o imposto. É aí que você paga menos (ou nada) de forma legal.
                        </p>
                    </div>

                    {/* O que é dedutível */}
                    <div className="mb-16 bg-white border border-[#E8E3DC] shadow-lg p-8 rounded-3xl">
                        <h2 className="text-2xl font-bold mb-4">O que é despesa dedutível para músico?</h2>
                        <p className="opacity-80 leading-relaxed mb-6">
                            Para a Receita, dedutível é tudo aquilo que você "precisa gastar para conseguir ganhar". Exemplos válidos com comprovante:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                "Aluguel de estúdio de ensaio",
                                "Manutenção de instrumentos",
                                "Cordas, palhetas e baquetas",
                                "Propaganda (Tráfego pago no Insta)",
                                "Conselho Regional (OMB)",
                                "Pagamento a músicos de apoio (se houver recibo)"
                            ].map((item, i) => (
                                <div key={i} className="flex gap-2 items-center bg-gray-50 p-3 rounded-lg text-base">
                                    <CheckCircle className="text-[#d4af37] w-5 h-5" /> {item}
                                </div>
                            ))}
                        </div>
                        <p className="text-sm mt-6 text-gray-500 italic">
                            * Roupas comuns, alimentação e gasolina do seu carro de passeio geralmente NÃO são aceitos em auditoria se não houver um contexto profissional inegável.
                        </p>
                    </div>

                    {/* Como o Músico Pro ajuda a economizar */}
                    <div className="mb-16 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 p-8 md:p-12 rounded-[2rem] shadow-lg">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex-1 space-y-4">
                                <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold mb-2">
                                    Economia Inteligente
                                </div>
                                <h2 className="text-3xl font-extrabold text-[#0c2461]">
                                    Pague apenas o imposto justo.
                                </h2>
                                <p className="opacity-80 leading-relaxed text-lg">
                                    A maior vantagem do <strong>Músico Pro</strong> é a clareza. O sistema te dá a visão gráfica exata do seu <strong>lucro real</strong> (Receitas) frente às suas <strong>despesas operacionais</strong> (Dedutíveis).
                                </p>
                                <p className="opacity-80 leading-relaxed text-lg">
                                    Ao te mostrar e incentivar o registro correto de custos como transporte, manutenção e aluguel de estúdio, você <strong>reduz drasticamente sua base de cálculo</strong> e usa a lei a seu favor para <strong>economizar centenas de reais em impostos todos os meses</strong>.
                                </p>
                                <div className="pt-4 flex flex-col gap-3">
                                    <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-green-100">
                                        <div className="bg-red-100 text-red-600 p-2 rounded-lg"><TrendingDown size={20} /></div>
                                        <p className="font-bold text-sm">Acompanhe e abata custos dedutíveis na origem</p>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-green-100">
                                        <div className="bg-green-100 text-green-600 p-2 rounded-lg"><PiggyBank size={20} /></div>
                                        <p className="font-bold text-sm">Visualize a alíquota mensal e economize no IR final</p>
                                    </div>
                                </div>
                            </div>

                            {/* Mockup visual do app */}
                            <div className="flex-1 w-full bg-white rounded-2xl shadow-xl border border-[#E8E3DC] p-6 relative">
                                <div className="text-sm font-bold text-gray-500 mb-4 border-b pb-2">Seu fechamento transparente (Exemplo)</div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl">
                                        <div className="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-wider">Base de Cálculo</div>
                                        <div className="text-xl font-black text-[#0c2461]">R$ 9.000,00</div>
                                    </div>
                                    <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl">
                                        <div className="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-wider">Gastos Dedutíveis</div>
                                        <div className="text-xl font-black text-red-600">R$ 3.500,00</div>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-[#E8E3DC] text-center mb-4">
                                    <div className="text-xs text-[#d4af37] font-bold uppercase mb-1">Imposto Simulável a Pagar</div>
                                    <div className="text-3xl font-black text-[#0c2461]">R$ 139,40</div>
                                    <div className="text-xs text-gray-400 font-bold mt-2">Alíq. Efetiva Reduzida</div>
                                </div>
                                <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg flex items-center gap-3">
                                    <span className="text-xl">💡</span>
                                    <span className="text-sm text-blue-800 font-medium leading-tight">Suas despesas abateram a base e <strong>reduziram o imposto gerado!</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Como o Músico Pro ajuda */}
                    <div className="bg-[#0c2461] text-white p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
                        <div className="absolute right-0 top-0 w-64 h-64 bg-[#d4af37] blur-[100px] opacity-20 -z-0"></div>

                        <div className="relative z-10 space-y-6">
                            <h2 className="text-3xl font-extrabold mb-2">Pare de sofrer com isso.</h2>
                            <p className="text-lg opacity-90 mb-6">
                                Preencher o sistema do governo (e-CAC) manualmente ou pagar caro pra contador fazer seu livro-caixa de 5 em 5 notas é coisa do passado.
                            </p>

                            <div className="space-y-4 font-medium pb-4">
                                <div className="flex gap-3 items-start">
                                    <ShieldCheck className="text-[#d4af37] w-6 h-6 shrink-0" />
                                    <p><strong>Automação de Cálculos:</strong> O <em>Músico Pro</em> já possui as regras e alíquotas cadastradas. Você só digita os shows e as palhetas, ele faz a conta.</p>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <FileOutput className="text-[#d4af37] w-6 h-6 shrink-0" />
                                    <p><strong>Exportação Perfeita:</strong> Ele gera um relatório exatamente no formato que o governo entende, para copiar e colar.</p>
                                </div>
                            </div>

                            <Link href="/vendas">
                                <button className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-8 py-4 rounded-xl transition text-lg shadow-lg w-full sm:w-auto mt-4">
                                    Assinar Músico Pro e Automatizar
                                </button>
                            </Link>
                        </div>
                    </div>

                </section>
            </main>
            <Footer />
        </div>
    );
}
