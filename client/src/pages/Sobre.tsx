import { BookOpen, Star, Music, Target } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';

export default function Sobre() {
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
                <section className="bg-white py-20 px-4 border-b border-[#E8E3DC] text-center">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <div className="inline-block bg-[#fff9e6] border border-[#d4af37]/30 text-[#0c2461] px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                            Nossa História
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-[#0c2461]">
                            Feito <span className="text-[#d4af37]">por Músicos</span>,<br /> para Músicos
                        </h1>
                        <p className="text-xl opacity-80 mt-4 leading-relaxed">
                            O ecossistema Músico Pro nasceu da dor real: a dificuldade de manter a saúde financeira trabalhando como artista independente no Brasil.
                        </p>
                    </div>
                </section>

                {/* Content Blocks */}
                <section className="py-16 px-4 max-w-4xl mx-auto space-y-16">

                    <div className="grid md:grid-cols-2 gap-8 items-center bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-[#E8E3DC]">
                        <div className="space-y-4">
                            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-xl">
                                <Target className="w-8 h-8 text-[#0c2461]" />
                            </div>
                            <h2 className="text-2xl font-bold">Nossa Missão</h2>
                            <p className="opacity-80 text-lg leading-relaxed">
                                Profissionalizar a gestão financeira da classe artística, garantindo proteção fiscal e clareza de dados para que os músicos possam focar em sua arte, não na burocracia contábil.
                            </p>
                        </div>
                        <div className="bg-gray-50 h-full rounded-2xl flex items-center justify-center p-8 border border-gray-100">
                            <Music className="w-24 h-24 text-gray-300" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-center bg-[#0c2461] text-white p-8 md:p-12 rounded-3xl shadow-lg flex-col-reverse md:flex-row-reverse relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37] opacity-10 rounded-full blur-3xl"></div>

                        <div className="space-y-4 relative z-10">
                            <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-xl">
                                <BookOpen className="w-8 h-8 text-[#d4af37]" />
                            </div>
                            <h2 className="text-2xl font-bold">Posicionamento Educacional</h2>
                            <p className="opacity-80 text-lg leading-relaxed">
                                Mais do que uma ferramenta de emissão de recibos, o Músico Pro opera como um ambiente educativo. Acreditamos que a educação financeira para músicos é negligenciada, forçando o artista a depender 100% de terceiros.
                            </p>
                        </div>
                        <div className="bg-white/5 h-full rounded-2xl flex items-center justify-center p-8 border border-white/10 relative z-10">
                            <BookOpen className="w-24 h-24 text-white/20" />
                        </div>
                    </div>

                </section>

            </main>
            <Footer />
        </div>
    );
}
