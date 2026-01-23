import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { CheckCircle, Copy, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Obrigado() {
  const [, setLocation] = useLocation();
  const [copied, setCopied] = useState(false);
  const accessCode = 'MUSICOPRO2026PREMIUM';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accessCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c2461] via-[#1a3a7a] to-[#0c2461] text-white">
      {/* Header */}
      <header className="border-b border-[#d4af37]/20 bg-[#0c2461]/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Músico Pro</h1>
            <p className="text-sm text-[#6ba587]">Organização Fiscal para Músicos</p>
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

          <h2 className="text-4xl font-bold text-center mb-4">
            Parabéns! 🎉
          </h2>

          <p className="text-center text-lg text-gray-200 mb-8">
            Sua compra foi confirmada com sucesso!
          </p>

          {/* Access Instructions */}
          <div className="bg-[#0c2461]/50 border border-[#d4af37]/20 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-[#d4af37] mb-4">
              ✓ Como Acessar Sua Área Premium
            </h3>

            <div className="space-y-4">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#d4af37] rounded-full flex items-center justify-center font-bold text-[#0c2461]">
                  1
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">
                    Acesse a área premium
                  </p>
                  <a
                    href="/premium"
                    className="text-[#d4af37] hover:text-white transition underline"
                  >
                    musicopro.app.br/premium
                  </a>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#d4af37] rounded-full flex items-center justify-center font-bold text-[#0c2461]">
                  2
                </div>
                <div>
                  <p className="font-semibold text-white mb-2">
                    Cole seu código de acesso:
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={accessCode}
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
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#d4af37] rounded-full flex items-center justify-center font-bold text-[#0c2461]">
                  3
                </div>
                <div>
                  <p className="font-semibold text-white">
                    Clique em "Acessar" e aproveite!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What's Included */}
          <div className="bg-[#6ba587]/20 border border-[#6ba587]/30 rounded-xl p-6 mb-8">
            <h4 className="font-bold text-white mb-4">O que você tem acesso:</h4>
            <ul className="space-y-2 text-gray-200">
              <li className="flex items-center gap-2">
                <span className="text-[#d4af37]">✓</span>
                Calculadora Carnê-Leão 2026
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#d4af37]">✓</span>
                Calculadora RPA
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#d4af37]">✓</span>
                Simulador IR Anual
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#d4af37]">✓</span>
                Comparativo PF vs MEI vs Empresa
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#d4af37]">✓</span>
                Guias Exclusivos Atualizados
              </li>
            </ul>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => setLocation('/premium')}
            className="w-full bg-[#d4af37] hover:bg-[#e5c158] text-[#0c2461] font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition"
          >
            Acessar Premium Agora
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Support Info */}
        <div className="text-center text-gray-300 text-sm">
          <p className="mb-2">
            Dúvidas? Verifique seu email de confirmação ou entre em contato.
          </p>
          <p className="text-gray-400">
            Obrigado por escolher Músico Pro! 🎵
          </p>
        </div>
      </main>
    </div>
  );
}
