import { CheckCircle, ShieldCheck, FileText, Music, Lock, Database, FileOutput, Calculator } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';

export default function Funcionalidades() {
    return (
        <div className="min-h-screen bg-[#fafafa] font-sans text-[#0c2461]">
            {/* NAVBAR SIMPLES */}
            <header className="sticky top-0 z-40 bg-white border-b border-[#E8E3DC] shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/">
                        <div className="flex items-center gap-2 cursor-pointer">
                            <Music className="w-8 h-8 text-[#d4af37]" />
                            <h1 className="font-bold text-xl leading-none" style={{ fontFamily: 'Lexend, sans-serif' }}>
                                Músico Pro
                            </h1>
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

                {/* HEADER SECTION */}
                <section className="bg-[#0c2461] text-white py-20 px-4 text-center">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold">Tudo que o músico profissional precisa</h1>
                        <p className="text-xl opacity-80">Conheça as ferramentas que vão transformar a forma como você organiza a sua carreira e as suas finanças.</p>
                    </div>
                </section>

                {/* FUNCIONALIDADES GRID */}
                <section className="py-20 px-4 max-w-6xl mx-auto">
                    <div className="space-y-16">

                        {/* Bloco 1: Organização Financeira */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-xl">
                                    <Calculator className="w-8 h-8 text-[#0c2461]" />
                                </div>
                                <h2 className="text-3xl font-bold">Organização Financeira</h2>
                                <p className="text-lg opacity-80">Mantenha os números do seu negócio musical sempre à vista, sem planilhas complexas.</p>
                                <ul className="space-y-3 font-medium">
                                    <li className="flex items-center gap-3"><CheckCircle className="text-[#d4af37]" size={20} /> Registro rápido de receitas (cachês, aulas, streams)</li>
                                    <li className="flex items-center gap-3"><CheckCircle className="text-[#d4af37]" size={20} /> Controle anual de faturamento</li>
                                    <li className="flex items-center gap-3"><CheckCircle className="text-[#d4af37]" size={20} /> Histórico completo e categorizado de movimentos</li>
                                </ul>
                            </div>
                            <div className="bg-white border-[#E8E3DC] border-8 rounded-3xl shadow-xl h-64 flex flex-col items-center justify-center text-gray-500 font-medium overflow-hidden">
                                <div className="w-full h-8 bg-gray-100 border-b flex items-center px-4"><div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div><div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div><div className="w-3 h-3 rounded-full bg-green-400"></div></div>
                                <div className="flex-1 flex items-center justify-center">Mockup Dashboard Financeiro</div>
                            </div>
                        </div>

                        {/* Bloco 2: Carnê-Leão */}
                        <div className="grid md:grid-cols-2 gap-12 items-center flex-col-reverse md:flex-row-reverse">
                            <div className="space-y-6 bg-white p-8 md:p-12 rounded-3xl border-2 border-[#d4af37]/30 shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 w-64 h-64 bg-yellow-50 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>
                                <div className="inline-flex items-center justify-center p-3 bg-yellow-100 rounded-xl">
                                    <FileOutput className="w-8 h-8 text-[#d4af37]" />
                                </div>
                                <h2 className="text-3xl font-bold">Carnê-Leão Express</h2>
                                <p className="text-lg opacity-80">A primeira ferramenta focada em apurar impostos mensalmente com as regras exatas para músicos PF.</p>
                                <ul className="space-y-3 font-medium">
                                    <li className="flex items-center gap-3"><CheckCircle className="text-[#d4af37]" size={20} /> Apuração mensal automática com base nos seus gastos dedutíveis</li>
                                    <li className="flex items-center gap-3"><CheckCircle className="text-[#d4af37]" size={20} /> Separação clara entre Pessoa Física e despesas da profissão</li>
                                    <li className="flex items-center gap-3"><CheckCircle className="text-[#d4af37]" size={20} /> Exportação em PDF e formato para a Receita Federal</li>
                                </ul>
                            </div>
                            <div className="bg-[#f8fafc] border-[#E8E3DC] border-8 rounded-3xl shadow-inner h-64 flex flex-col items-center justify-center text-gray-400 font-medium">
                                <div className="w-full h-8 bg-white border-b flex items-center px-4"><div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div><div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div><div className="w-3 h-3 rounded-full bg-green-400"></div></div>
                                <div className="flex-1 flex items-center justify-center">Mockup Tabela Carnê-Leão</div>
                            </div>
                        </div>

                        {/* Bloco 3: Documentos Profissionais */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-xl">
                                    <FileText className="w-8 h-8 text-[#0c2461]" />
                                </div>
                                <h2 className="text-3xl font-bold">Documentos Profissionais</h2>
                                <p className="text-lg opacity-80">Eleve a percepção de valor do seu trabalho ao entregar PDFs estruturados para seus contratantes.</p>
                                <ul className="space-y-3 font-medium">
                                    <li className="flex items-center gap-3"><CheckCircle className="text-[#d4af37]" size={20} /> Gerador de Recibos em PDF de alto padrão</li>
                                    <li className="flex items-center gap-3"><CheckCircle className="text-[#d4af37]" size={20} /> Criador de Orçamentos comerciais persuasivos</li>
                                    <li className="flex items-center gap-3"><CheckCircle className="text-[#d4af37]" size={20} /> Gerador de Contratos de prestação de serviços musicais</li>
                                </ul>
                            </div>
                            <div className="bg-white border-[#E8E3DC] border-8 rounded-3xl shadow-xl h-64 flex flex-col items-center justify-center text-gray-500 font-medium">
                                <div className="w-full h-8 bg-gray-100 border-b flex items-center px-4"><div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div><div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div><div className="w-3 h-3 rounded-full bg-green-400"></div></div>
                                <div className="flex-1 flex items-center justify-center">Mockup Recibo Gerado</div>
                            </div>
                        </div>

                        {/* Bloco 4: Segurança */}
                        <div className="grid md:grid-cols-2 gap-12 items-center bg-[#0c2461] text-white p-8 md:p-12 rounded-3xl mt-20 relative overflow-hidden shadow-2xl">
                            <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#d4af37] opacity-10 rounded-full blur-3xl"></div>
                            <div className="space-y-6 relative z-10">
                                <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-xl">
                                    <ShieldCheck className="w-8 h-8 text-[#d4af37]" />
                                </div>
                                <h2 className="text-3xl font-bold">Segurança e Privacidade</h2>
                                <p className="text-lg opacity-80">O App é concebido com arquitetura Local-First. Seus dados sigilosos não vão para a nuvem pública.</p>
                                <ul className="space-y-4 font-medium mt-4">
                                    <li className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10"><Lock className="text-[#d4af37]" size={20} /> Proteção de acesso local com PIN no App</li>
                                    <li className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10"><Database className="text-[#d4af37]" size={20} /> Arquivos e backups salvos na sua própria conta ou dispositivo</li>
                                    <li className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10"><ShieldCheck className="text-[#d4af37]" size={20} /> Restauração simplificada a qualquer momento</li>
                                </ul>
                            </div>
                            <div className="relative z-10 flex flex-col items-center justify-center gap-4 bg-white/5 rounded-3xl p-8 border border-white/10 h-full">
                                <ShieldCheck className="w-32 h-32 text-[#d4af37] opacity-80 drop-shadow-lg" />
                                <div className="text-[#d4af37] font-bold tracking-widest text-xl">100% SEGURO</div>
                                <p className="text-center text-sm opacity-60 max-w-xs mt-2">Tecnologia desenvolvida pensando primeiro na integridade do músico.</p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* CTA */}
                <section className="text-center px-4 py-10 mt-10">
                    <Link href="/vendas">
                        <button className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-10 py-5 rounded-xl transition text-xl shadow-lg">
                            Desbloquear Todas as Ferramentas
                        </button>
                    </Link>
                </section>

            </main>
            <Footer />
        </div>
    );
}
