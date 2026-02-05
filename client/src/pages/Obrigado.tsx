import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { CheckCircle, Copy, ArrowRight, Mail, BookOpen, Smartphone } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

export default function Obrigado() {
  const [, setLocation] = useLocation();
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState<string>('');

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
      // garante consistência com o fluxo do PWA
      localStorage.setItem('musicopro_email', resolvedEmail);
    }
  }, [resolvedEmail]);

  const copyToClipboard = async () => {
    try {
      if (!email) return;
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silencioso (sem travar UX)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c2461] via-[#1a3a7a] to-[#0c2461] text-white">
      {/* Header */}
      <header className="border-b border-[#d4af37]/20 bg-[#0c2461]/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Músico Pro</h1>
            <p className="text-sm text-[#6ba587]">Pacote Guia + App (método completo)</p>
          </div>
          <button
            onClick={() => setLocation('/')}
            className="text-sm text-[#d4af37] hover:text-white transition"
          >
            ← Voltar
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-16">
        {/* Success Card */}
        <div className="bg-white/10 backdrop-blur border border-[#d4af37]/30 rounded-2xl p-8 mb-8">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-[#d4af37]" />
          </div>

          <h2 className="text-4xl font-bold text-center mb-4">Compra confirmada! 🎉</h2>

          <p className="text-center text-lg text-gray-200 mb-8">
            Você acabou de garantir o <strong>Pacote Músico Pro</strong>: Guia + App.
            <br />
            Agora é só seguir os passos abaixo.
          </p>

          {/* Email Box */}
          <div className="bg-[#0c2461]/50 border border-[#d4af37]/20 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#d4af37] mt-1" />
              <div className="w-full">
                <h3 className="text-lg font-bold text-[#d4af37] mb-2">Seu e-mail de ativação</h3>

                {email ? (
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      readOnly
                      className="flex-1 bg-white/10 border border-[#d4af37]/30 rounded-lg px-4 py-2 text-white font-mono text-sm"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="bg-[#d4af37] hover:bg-[#e5c158] text-[#0c2461] px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition"
                    >
                      <Copy className="w-4 h-4" />
                      {copied ? 'Copiado!' : 'Copiar'}
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-gray-200">
                    Não detectei seu e-mail automaticamente.
                    <br />
                    Sem problema: você pode ativar usando o <strong>mesmo e-mail da compra</strong>.
                  </p>
                )}

                <p className="text-xs text-gray-300 mt-3">
                  A ativação é feita por <strong>e-mail</strong> (não por código).
                </p>
              </div>
            </div>
          </div>

          {/* Access Instructions */}
          <div className="bg-[#0c2461]/50 border border-[#d4af37]/20 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-[#d4af37] mb-4">✓ Próximos passos (ordem recomendada)</h3>

            <div className="space-y-4">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#d4af37] rounded-full flex items-center justify-center font-bold text-[#0c2461]">
                  1
                </div>
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-[#d4af37] mt-1" />
                  <div>
                    <p className="font-semibold text-white mb-1">Comece pelo Guia (método)</p>
                    <p className="text-sm text-gray-200">
                      Ele é o primeiro passo obrigatório para usar o app do jeito certo.
                    </p>
                    <button
                      onClick={() => setLocation('/guia')}
                      className="mt-2 text-[#d4af37] hover:text-white transition underline text-sm"
                    >
                      Abrir Guia
                    </button>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#d4af37] rounded-full flex items-center justify-center font-bold text-[#0c2461]">
                  2
                </div>
                <div className="flex items-start gap-3">
                  <Smartphone className="w-5 h-5 text-[#d4af37] mt-1" />
                  <div>
                    <p className="font-semibold text-white mb-1">Abra o App (execução)</p>
                    <p className="text-sm text-gray-200">
                      O app existe para operacionalizar o que você aprendeu no guia.
                    </p>
                    <a
                      href="https://app.musicopro.app.br/pwa/index.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-[#d4af37] hover:text-white transition underline text-sm"
                    >
                      Abrir App
                    </a>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#d4af37] rounded-full flex items-center justify-center font-bold text-[#0c2461]">
                  3
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">Ative o acesso Premium com seu e-mail</p>
                  <p className="text-sm text-gray-200">
                    Entre na página do pacote e valide usando o <strong>mesmo e-mail da compra</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What's Included */}
          <div className="bg-[#6ba587]/20 border border-[#6ba587]/30 rounded-xl p-6 mb-8">
            <h4 className="font-bold text-white mb-4">O que está incluso no pacote:</h4>
            <ul className="space-y-2 text-gray-200">
              <li className="flex items-center gap-2">
                <span className="text-[#d4af37]">✓</span>
                Guia educacional (método fiscal)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#d4af37]">✓</span>
                App Músico Pro (execução prática)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#d4af37]">✓</span>
                Conteúdos aprofundados (Premium)
              </li>
            </ul>
          </div>

          {/* CTA */}
          <Button
  onClick={() => {
    if (email) {
      setLocation(`/pro?email=${encodeURIComponent(email)}`);
    } else {
      setLocation('/pro');
    }
  }}
  className="w-full bg-[#d4af37] hover:bg-[#e5c158] text-[#0c2461] font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition"
>
  Ativar agora com este e-mail
  <ArrowRight className="w-5 h-5" />
</Button>

          <p className="text-xs text-gray-300 text-center mt-3">
            Dica: se a ativação não aparecer de primeira, confirme se está usando o <strong>mesmo e-mail da compra</strong>.
          </p>
        </div>

        {/* Support Info */}
        <div className="text-center text-gray-300 text-sm">
          <p className="mb-2">
            Dúvidas? Confira o e-mail de confirmação da compra ou fale com o suporte.
          </p>
          <p className="text-gray-400">Obrigado por escolher o Músico Pro! 🎵</p>
        </div>
      </main>
    </div>
  );
}
