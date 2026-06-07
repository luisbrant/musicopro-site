import { Smartphone, Check, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { getAppUrl } from '@/const';
import { useAnalytics } from '@/hooks/useAnalytics';

interface PromoCardAppProps {
  chapterName?: string;
}

export default function PromoCardApp({ chapterName = 'guia' }: PromoCardAppProps) {
  const { trackFreeClick } = useAnalytics();
  const appUrl = getAppUrl();

  const handleOpenApp = () => {
    trackFreeClick(`card_promo_${chapterName}`);
    window.open(appUrl, '_blank');
  };

  return (
    <div className="my-12 bg-gradient-to-br from-[#0c2461] to-[#1a3a7a] rounded-3xl text-white shadow-2xl border border-white/10 overflow-hidden relative group">
      {/* Decorações em degradê de fundo */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4af37] opacity-10 rounded-full blur-[80px] -translate-y-1/3 translate-x-1/3 transition-transform duration-500 group-hover:scale-110 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500 opacity-20 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 p-8 md:p-12 items-center relative z-10">
        {/* Lado Esquerdo: Textos & Recursos */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#d4af37]/20 border border-[#d4af37]/30 text-[#d4af37] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles size={12} className="fill-current" />
            Automatize sua Rotina
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl md:text-3xl font-extrabold leading-tight" style={{ fontFamily: 'Lexend, sans-serif' }}>
              Chega de perder tempo com contas e papelada!
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Você acabou de ler a teoria, mas na prática você não precisa fazer cálculos manuais. Deixe o **App MúsicoPro** cuidar de tudo para você com total segurança e privacidade.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3.5 pt-2">
            {[
              'Carnê-Leão calculado na hora',
              'Geração de recibos de cachê em PDF',
              'Segurança Local-First (dados no celular)',
              'Funciona 100% offline'
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs md:text-sm text-white/90">
                <div className="bg-[#6ba587] text-white p-1 rounded-full shrink-0">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 items-start sm:items-center">
            <button
              onClick={handleOpenApp}
              className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-black px-8 py-4 rounded-xl transition text-lg shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Testar o App Grátis <ArrowRight size={18} strokeWidth={3} />
            </button>
            <div className="flex items-center gap-1.5 text-xs text-white/70 justify-center w-full sm:w-auto">
              <ShieldCheck size={16} className="text-[#6ba587]" />
              Sem cadastro ou cartão
            </div>
          </div>
        </div>

        {/* Lado Direito: Preview Simulada do Dashboard */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-inner relative overflow-hidden select-none">
          <div className="absolute top-2 right-2 text-[10px] bg-white/10 text-white/50 px-2 py-0.5 rounded font-bold uppercase tracking-widest">
            App View
          </div>
          
          <p className="text-xs font-bold text-[#d4af37] uppercase tracking-wider mb-4">Simulação Mensal</p>
          
          <div className="space-y-4 font-sans text-left">
            <div>
              <p className="text-[10px] text-white/60 uppercase font-bold tracking-wider">Cachês Recebidos</p>
              <p className="text-2xl font-black text-white">R$ 4.500,00</p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-b border-white/10 py-3">
              <div>
                <p className="text-[10px] text-white/60 uppercase font-bold tracking-wider">Despesas Dedutíveis</p>
                <p className="text-base font-bold text-red-300">- R$ 1.200,00</p>
              </div>
              <div>
                <p className="text-[10px] text-white/60 uppercase font-bold tracking-wider">Base de Cálculo</p>
                <p className="text-base font-bold text-green-300">R$ 3.300,00</p>
              </div>
            </div>

            <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 flex justify-between items-center">
              <div>
                <p className="text-[10px] text-[#d4af37] uppercase font-bold tracking-wider">Imposto Estimado (DARF)</p>
                <p className="text-lg font-black text-white">R$ 100,84</p>
              </div>
              <div className="bg-[#6ba587]/20 border border-[#6ba587]/30 text-[#6ba587] text-[10px] px-2.5 py-1 rounded-full font-black uppercase">
                Otimizado
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
