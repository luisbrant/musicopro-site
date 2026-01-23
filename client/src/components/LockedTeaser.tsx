import { Lock } from 'lucide-react';
import { Link } from 'wouter';

interface LockedTeaserProps {
  title: string;
  preview: string;
  icon?: React.ReactNode;
}

export default function LockedTeaser({ title, preview, icon }: LockedTeaserProps) {
  return (
    <div className="bg-gradient-to-br from-[#F9F7F4] to-[#E8E3DC] rounded-lg p-6 md:p-8 border border-[#E8E3DC] relative overflow-hidden">
      {/* Efeito de bloqueio sutil */}
      <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
      
      <div className="relative z-10 space-y-4">
        {/* Título com ícone */}
        <div className="flex items-start gap-3">
          {icon && <div className="text-3xl flex-shrink-0">{icon}</div>}
          <h3 className="text-xl md:text-2xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
            {title}
          </h3>
        </div>

        {/* Prévia */}
        <p className="text-sm md:text-base text-[#6ba587] leading-relaxed">
          {preview}
        </p>

        {/* Frase de valor padrão */}
        <p className="text-xs md:text-sm text-[#0c2461] italic border-l-4 border-[#d4af37] pl-4 py-2">
          No Premium você vê exemplos reais preenchidos, checklists mensais e calculadoras prontas para uso.
        </p>

        {/* Bloqueio visual e CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-4 border-t border-[#d4af37]/30">
          <div className="flex items-center gap-2 text-[#0c2461] font-semibold">
            <Lock size={18} className="text-[#d4af37]" />
            <span>Conteúdo Premium</span>
          </div>
          <Link href="/premium" className="ml-auto">
            <button className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-4 py-2 rounded-lg transition text-sm">
              Desbloquear agora
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
