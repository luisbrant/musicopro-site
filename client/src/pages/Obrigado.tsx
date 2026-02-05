import { useEffect, useState, useMemo } from 'react';
import { useLocation, Link } from 'wouter';
import { Music, CheckCircle2, Copy, ArrowRight, BookOpen, Smartphone, ShieldCheck, Mail, Zap } from 'lucide-react';
import Footer from '@/components/Footer';

export default function Obrigado() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);

  // Lógica para recuperar o e-mail da compra (URL ou LocalStorage)
  const resolvedEmail = useMemo(() => {
    try {
      const url = new URL(window.location.href);
      const qpEmail = (url.searchParams.get('email') || '').trim().toLowerCase();
      if (qpEmail) return qpEmail;

      const saved = (localStorage.getItem('musicopro_email') || '').trim().toLowerCase();
      return saved;
    } catch {
      return '';
    }
  }, []);

  useEffect(() => {
    if (resolvedEmail) {
      setEmail(resolvedEmail);
      localStorage.setItem('musicopro_email', resolvedEmail);
    }
  }, [resolvedEmail]);

  const copyToClipboard = async () => {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleGoToVip = () => {
    if (email) {
      // Redireciona já passando o e-mail para facilitar
      window.location.href = `/guia-pro?email=${encodeURIComponent(email)}`;
    } else {
      setLocation('/guia-pro');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#0c2461]">
      {/* HEADER SIMPLIFICADO */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E8E3DC]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Music className="w-8 h-8 text-[#d4af37]" />
            <div>
              <h1 className="font-bold text-xl leading-none" style={{ fontFamily: 'Lexend, sans-serif' }}>
                Músico Pro
              </h1>
              <p className="text-[10px] uppercase tracking-wider text-[#d4af37] font-bold">Compra Confirmada</p>
            </div>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 md:py-16">
        
        {/* HERO DE SUCESSO */}
        <section className="mb-12 text-center">
          <div className="bg-gradient-to-br from-[#0c2461] to-[#1a3a7a] rounded-2xl p-10 md:p-14 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#d4af37] opacity-20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="bg-white rounded-full p-4 mb-6 shadow-lg">
                <CheckCircle2 className="w-12 h-12 text-[#0c2461]" />
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
                Pagamento Confirmado!
              </h2>
              <p className="text-xl opacity-90 max-w-2xl">
                Parabéns, você agora faz parte da elite dos músicos profissionais. <br/>
                Seu acesso ao <strong>Pacote Músico Pro</strong> já está liberado.
              </p>
            </div>
          </div>
        </section>

        {/* DADOS DE ACESSO */}
        <section className="mb-16">
          <div className="max-w-2xl mx-auto bg-[#f8fafc] border-2 border-[#d4af37] rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#0c2461] mb-6 flex items-center gap-2">
              <Zap className="text-[#d4af37]" /> Seu passaporte de acesso
            </h3>

            <div className="bg-white border border-[#E8E3DC] rounded-lg p-6 space-y-4">
              <div>
                <p className="text-sm font-bold text-[#0c2461] mb-2 uppercase tracking-wide">E-mail Cadastrado</p>
                {email ? (
                  <div className="flex items-center gap-2 bg-gray-50 p-3 rounded border border-gray-200">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="flex-1 font-mono text-[#0c2461] font-medium">{email}</span>
                    <button 
                      onClick={copyToClipboard}
                      className="text-xs bg-[#0c2461] text-white px-3 py-1.5 rounded hover:bg-[#1a3a7a] transition flex items-center gap-1"
                    >
                      {copied ? <CheckCircle2 size={12}/> : <Copy size={12}/>}
                      {copied ? 'Copiado' : 'Copiar'}
                    </button>
                  </div>
                ) : (
                  <div className="bg-yellow-50 p-3 rounded border border-yellow-100 text-yellow-800 text-sm">
                    ⚠️ Não identificamos seu e-mail automaticamente. Use o <strong>mesmo e-mail da compra</strong> para acessar.
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500">
                Você usará este e-mail para desbloquear tanto o <strong>Guia PRO</strong> quanto o <strong>App</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* PRÓXIMOS PASSOS */}
        <section className="mb-20">
          <h3 className="text-2xl font-bold text-[#0c2461] text-center mb-8">Por onde começar?</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* CARD 1: ÁREA VIP */}
            <div className="bg-white border border-[#E8E3DC] rounded-xl p-8 hover:shadow-lg transition group">
              <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#0c2461] transition duration-300">
                <BookOpen className="text-[#0c2461] w-6 h-6 group-hover:text-[#d4af37]" />
              </div>
              <h4 className="text-xl font-bold text-[#0c2461] mb-2">1. Acesse a Área VIP</h4>
              <p className="text-[#0c2461] opacity-70 mb-6 min-h-[48px]">
                Desbloqueie os módulos avançados de dedução, aposentadoria e contratos.
              </p>
              <button 
                onClick={handleGoToVip}
                className="w-full bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
              >
                Entrar na Área VIP <ArrowRight size={18}/>
              </button>
            </div>

            {/* CARD 2: APP */}
            <div className="bg-white border border-[#E8E3DC] rounded-xl p-8 hover:shadow-lg transition group">
              <div className="bg-yellow-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#d4af37] transition duration-300">
                <Smartphone className="text-[#d4af37] w-6 h-6 group-hover:text-[#0c2461]" />
              </div>
              <h4 className="text-xl font-bold text-[#0c2461] mb-2">2. Use o App PRO</h4>
              <p className="text-[#0c2461] opacity-70 mb-6 min-h-[48px]">
                Gere seus primeiros recibos profissionais e organize sua vida financeira.
              </p>
              <Link href="/app">
                <button className="w-full bg-white border-2 border-[#0c2461] hover:bg-gray-50 text-[#0c2461] font-bold py-3 rounded-lg transition flex items-center justify-center gap-2">
                  Abrir App MusicoPro
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* SUPORTE */}
        <section className="text-center text-[#0c2461] opacity-70 text-sm max-w-md mx-auto">
          <div className="flex justify-center mb-2"><ShieldCheck className="w-6 h-6"/></div>
          <p className="mb-2">
            Precisa de ajuda? Verifique também sua caixa de entrada (e spam) para o e-mail de confirmação da Hotmart.
          </p>
          <p>Obrigado pela confiança! 🎵</p>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}