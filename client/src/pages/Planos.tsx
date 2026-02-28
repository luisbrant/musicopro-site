import { CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';

export default function Planos() {
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

                {/* Header */}
                <section className="bg-white py-16 px-4 border-b border-[#E8E3DC] text-center">
                    <div className="max-w-3xl mx-auto space-y-4">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0c2461]">
                            Escolha seu plano
                        </h1>
                        <p className="text-xl opacity-80">
                            Comece agora sem custo e evolua quando precisar exportar dados e gerar documentos profissionais.
                        </p>
                    </div>
                </section>

                {/* Pricing Tables */}
                <section className="py-20 px-4 max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 items-start">

                        {/* PLANO GRÁTIS */}
                        <div className="bg-white border text-center border-[#E8E3DC] rounded-3xl p-8 hover:shadow-lg transition">
                            <h3 className="text-2xl font-bold mb-2 text-gray-700">Versão Gratuita</h3>
                            <div className="text-4xl font-black text-[#0c2461] mb-2">R$ 0</div>
                            <p className="text-sm opacity-60 mb-8 border-b border-[#E8E3DC] pb-6">Para quem está começando a organizar as finanças agora.</p>

                            <ul className="text-left space-y-4 mb-8 font-medium opacity-80 h-64">
                                <li className="flex items-center gap-3"><CheckCircle className="text-gray-400" size={20} /> Registro ilimitado de receitas e despesas</li>
                                <li className="flex items-center gap-3"><CheckCircle className="text-gray-400" size={20} /> Histórico completo das movimentações</li>
                                <li className="flex items-center gap-3"><CheckCircle className="text-gray-400" size={20} /> Apuração do Carnê-Leão apenas visual</li>
                                <li className="flex items-center gap-3 opacity-50"><XCircle className="text-gray-300" size={20} /> Sem exportação para Contador/Receita</li>
                                <li className="flex items-center gap-3 opacity-50"><XCircle className="text-gray-300" size={20} /> Sem geração de Recibos/Contratos PDF</li>
                            </ul>

                            <Link href="/app">
                                <button className="w-full bg-gray-100 hover:bg-gray-200 text-[#0c2461] font-bold py-4 rounded-xl transition text-lg">
                                    Usar Grátis
                                </button>
                            </Link>
                        </div>

                        {/* PLANO PRO */}
                        <div className="bg-[#0c2461] text-white text-center border-2 border-[#d4af37] rounded-3xl p-8 shadow-2xl relative transform md:-translate-y-4">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#d4af37] text-[#0c2461] font-bold px-4 py-1 rounded-full text-sm uppercase tracking-widest shadow-md">
                                Mais Assinado
                            </div>

                            <h3 className="text-2xl font-bold mb-2 text-[#d4af37]">Plano PRO</h3>
                            <div className="text-5xl font-black mb-2">R$ 97</div>
                            <p className="text-sm opacity-80 mb-8 border-b border-white/20 pb-6 text-[#d4af37]">Pagamento único anual. R$ 8,08/mês apenas.</p>

                            <ul className="text-left space-y-4 mb-8 font-medium h-64">
                                <li className="flex items-center gap-3"><CheckCircle className="text-[#d4af37]" size={20} /> Exportação 1-clique para o e-CAC</li>
                                <li className="flex items-center gap-3"><CheckCircle className="text-[#d4af37]" size={20} /> Gerador de Recibos e Orçamentos com sua Logomarca</li>
                                <li className="flex items-center gap-3"><CheckCircle className="text-[#d4af37]" size={20} /> Gerador de Contratos de Serviço</li>
                                <li className="flex items-center gap-3"><CheckCircle className="text-[#d4af37]" size={20} /> Acesso ao Curso Financial Academy</li>
                                <li className="flex items-center gap-3"><CheckCircle className="text-[#d4af37]" size={20} /> Backup Avançado e PDF Download</li>
                            </ul>

                            <Link href="/vendas">
                                <button className="w-full bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold py-4 rounded-xl shadow-lg transition text-lg">
                                    Assinar o PRO Agora
                                </button>
                            </Link>
                        </div>

                    </div>
                </section>

                {/* Garantia */}
                <section className="pb-20 max-w-3xl mx-auto px-4 text-center">
                    <div className="bg-[#fff9e6] p-8 rounded-3xl border border-[#d4af37]/30 flex flex-col md:flex-row items-center gap-6 justify-center">
                        <div className="text-5xl font-black text-[#d4af37]">7</div>
                        <div className="text-left">
                            <h4 className="text-xl font-bold">Dias de Garantia Incondicional</h4>
                            <p className="opacity-80">Assine, use gerador de recibo, faça testes completos. Se você achar que a ferramenta não te ajuda a economizar dinheiro, devolvemos 100% do seu pagamento na mesma hora.</p>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
