import { X } from 'lucide-react';

interface AttributionBannerProps {
  isVisible: boolean;
  onClose: () => void;
}

export const AttributionBanner = ({ isVisible, onClose }: AttributionBannerProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-30 bg-gradient-to-r from-[#0c2461] to-[#1a3a7a] text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-lg">🎵</span>
          <p className="text-sm md:text-base font-medium">
            Você chegou por indicação de outro músico. Seu benefício será aplicado automaticamente.
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 hover:bg-white/10 rounded transition"
          aria-label="Fechar banner"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
