import { Mail, Heart } from 'lucide-react';
import { Link } from 'wouter';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0c2461] text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-8">
          {/* Branding */}
          <div className="space-y-3 col-span-2 md:col-span-1">
            <h3 className="text-lg font-bold" style={{ fontFamily: 'Lexend, sans-serif' }}>
              Músico Pro
            </h3>
            <p className="text-sm opacity-80">
              A melhor ferramenta para organizar sua vida fiscal como músico autônomo.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-base font-bold">Navegação</h4>
            <div className="space-y-2 text-sm flex flex-col">
              <a href="/#como-funciona" className="opacity-80 hover:text-[#d4af37] transition">Como Funciona</a>
              <a href="/#planos" className="opacity-80 hover:text-[#d4af37] transition">Planos e Preços</a>
              <a href="https://app.musicopro.app.br" className="opacity-80 hover:text-[#d4af37] transition">Entrar no App</a>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h4 className="text-base font-bold">Suporte</h4>
            <div className="space-y-2 text-sm flex flex-col">
              <a
                href="mailto:suporte@musicopro.app.br"
                className="flex items-center gap-2 text-[#d4af37] hover:text-[#e5c158] transition font-semibold"
              >
                <Mail size={16} />
                suporte@musicopro.app.br
              </a>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="text-base font-bold">Legal</h4>
            <div className="space-y-2 text-sm flex flex-col">
              <Link href="/termos" className="opacity-80 hover:text-[#d4af37] transition">Termos de Uso</Link>
              <Link href="/privacidade" className="opacity-80 hover:text-[#d4af37] transition">Política de Privacidade</Link>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pt-8 mb-8 text-xs text-center opacity-60">
          <p className="max-w-4xl mx-auto leading-relaxed">
            <strong>Aviso Legal:</strong> O Músico Pro fornece estimativas fiscais baseadas nos dados inseridos pelo usuário.
            Para orientação formal, defesa em malha fina e declarações oficiais perante a Receita Federal, consulte um contador registrado (CRC). As ferramentas deste site visam organização financeira e não substituem responsabilidades legais.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6 text-center text-sm opacity-75">
          <p className="flex items-center justify-center gap-1">
            © {currentYear} Músico Pro. Feito com <Heart size={14} className="text-[#d4af37]" /> para músicos.
          </p>
        </div>
      </div>
    </footer>
  );
}
