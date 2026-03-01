import { Mail, Heart } from 'lucide-react';
import { Link } from 'wouter';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0c2461] text-white pt-20 pb-10 border-t border-[#1a3a7a]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-16">
          {/* Branding */}
          <div className="space-y-5 md:col-span-5">
            <h3 className="text-3xl font-bold text-[#d4af37]" style={{ fontFamily: 'Lexend, sans-serif' }}>
              MúsicoPro
            </h3>
            <p className="text-xl text-gray-300 max-w-sm leading-relaxed">
              A ferramenta executiva definitiva para você organizar sua carreira musical e abandonar o improviso fiscal.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-5 md:col-span-2">
            <h4 className="text-2xl font-bold text-white tracking-wide">Navegação</h4>
            <div className="space-y-4 text-xl flex flex-col">
              <a href="/#como-funciona" className="opacity-80 hover:text-[#d4af37] transition">Como Funciona</a>
              <a href="/#planos" className="opacity-80 hover:text-[#d4af37] transition">Planos e Preços</a>
              <a href="https://app.musicopro.app.br" className="opacity-80 hover:text-[#d4af37] transition">Entrar no App</a>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-5 md:col-span-3">
            <h4 className="text-2xl font-bold text-white tracking-wide">Suporte</h4>
            <div className="space-y-4 text-xl flex flex-col">
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
          <div className="space-y-5 md:col-span-2">
            <h4 className="text-2xl font-bold text-white tracking-wide">Legal</h4>
            <div className="space-y-4 text-xl flex flex-col">
              <Link href="/termos" className="opacity-80 hover:text-[#d4af37] transition">Termos de Uso</Link>
              <Link href="/privacidade" className="opacity-80 hover:text-[#d4af37] transition">Política de Privacidade</Link>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pt-8 mb-8 text-base text-center text-gray-400 border-t border-white/10">
          <p className="max-w-5xl mx-auto leading-relaxed">
            <strong>Aviso Legal:</strong> O MúsicoPro fornece estimativas fiscais baseadas nos dados inseridos pelo usuário.
            Para orientação formal, defesa em malha fina e declarações oficiais perante a Receita Federal, consulte um contador registrado (CRC). As ferramentas deste site visam organização financeira e não substituem suas obrigações legais em momento algum.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 pb-4 text-center text-lg text-gray-400">
          <p className="flex items-center justify-center gap-1.5 font-medium">
            © {currentYear} MúsicoPro. Desenvolvido com <Heart size={18} className="text-[#d4af37] fill-[#d4af37]" /> para músicos.
          </p>
        </div>
      </div>
    </footer>
  );
}
