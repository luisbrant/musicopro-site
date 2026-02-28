import { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';

export default function Contato() {
    const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        // Simulação de envio
        setTimeout(() => {
            setStatus("sent");
        }, 1500);
    };

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

                <section className="bg-white py-16 px-4 border-b border-[#E8E3DC] text-center">
                    <div className="max-w-2xl mx-auto space-y-4">
                        <div className="inline-block bg-blue-50 text-[#0c2461] p-3 rounded-full mb-4">
                            <MessageSquare className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl font-extrabold text-[#0c2461]">
                            Fale com nossa equipe
                        </h1>
                        <p className="text-xl opacity-80">
                            Dúvidas sobre o sistema, planos PRO ou suporte técnico? Mande uma mensagem e ajudaremos você rápido.
                        </p>
                    </div>
                </section>

                <section className="py-16 px-4 max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-start">

                        <div className="space-y-8 bg-[#0c2461] text-white p-10 md:p-14 rounded-[2.5rem] shadow-xl h-full relative overflow-hidden">
                            <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#d4af37] blur-[100px] opacity-20"></div>
                            <h2 className="text-3xl font-bold relative z-10">Informações de Contato</h2>
                            <p className="text-lg opacity-80 relative z-10">
                                Nossa equipe de suporte está online de segunda a sexta-feira, em horário comercial.
                            </p>

                            <div className="flex items-center gap-4 bg-white/10 p-6 rounded-2xl border border-white/20 relative z-10">
                                <div className="bg-[#d4af37] p-3 rounded-full text-[#0c2461]">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold opacity-80 text-sm uppercase tracking-wider">E-mail Principal</h4>
                                    <a href="mailto:suporte@musicopro.app.br" className="text-xl font-bold hover:text-[#d4af37] transition">suporte@musicopro.app.br</a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border text-left border-[#E8E3DC] rounded-[2.5rem] p-8 md:p-12 shadow-lg">
                            {status === "sent" ? (
                                <div className="text-center py-10 space-y-4 flex flex-col items-center">
                                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                        <Send size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold">Mensagem Enviada!</h3>
                                    <p className="opacity-80">Agradecemos o contato. Nossa equipe responderá no seu e-mail em até 24h úteis.</p>
                                    <button onClick={() => setStatus("idle")} className="text-[#d4af37] font-bold mt-4 underline">Enviar outra mensagem</button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="nome" className="block text-sm font-bold mb-2 opacity-80">Seu Nome</label>
                                        <input required type="text" id="nome" className="w-full bg-[#f8fafc] border border-[#E8E3DC] rounded-xl px-4 py-3 focus:outline-none focus:border-[#d4af37] transition font-medium" placeholder="Ex: João da Silva" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-bold mb-2 opacity-80">Seu E-mail</label>
                                        <input required type="email" id="email" className="w-full bg-[#f8fafc] border border-[#E8E3DC] rounded-xl px-4 py-3 focus:outline-none focus:border-[#d4af37] transition font-medium" placeholder="Ex: contato@banda.com" />
                                    </div>
                                    <div>
                                        <label htmlFor="msg" className="block text-sm font-bold mb-2 opacity-80">Mensagem</label>
                                        <textarea required id="msg" rows={4} className="w-full bg-[#f8fafc] border border-[#E8E3DC] rounded-xl px-4 py-3 focus:outline-none focus:border-[#d4af37] transition font-medium resize-none" placeholder="Como podemos ajudar?"></textarea>
                                    </div>
                                    <button type="submit" disabled={status === "sending"} className="w-full font-bold px-8 py-4 rounded-xl transition text-lg shadow-lg flex items-center justify-center gap-2 bg-[#0c2461] hover:bg-[#1a3a7a] text-white disabled:opacity-70">
                                        {status === "sending" ? "Enviando..." : "Enviar Mensagem"}
                                        {status !== "sending" && <Send size={20} />}
                                    </button>
                                </form>
                            )}
                        </div>

                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
