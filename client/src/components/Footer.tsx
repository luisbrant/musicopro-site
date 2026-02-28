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
              <Link href="/funcionalidades" className="opacity-80 hover:text-[#d4af37] transition">Funcionalidades</Link>
              <Link href="/carne-leao" className="opacity-80 hover:text-[#d4af37] transition">Carnê-Leão</Link>
              <Link href="/planos" className="opacity-80 hover:text-[#d4af37] transition">Planos</Link>
              <Link href="/sobre" className="opacity-80 hover:text-[#d4af37] transition">Sobre</Link>
              <Link href="/contato" className="opacity-80 hover:text-[#d4af37] transition">Contato</Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h4 className="text-base font-bold">Suporte</h4>
            <div className="space-y-2 text-sm flex flex-col">
              <Link href="/contato" className="opacity-80 hover:text-[#d4af37] transition">Fale Conosco</Link>
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
        <div className="bg-white/10 rounded-lg p-4 mb-8 text-sm">
          <p className="opacity-90 leading-relaxed">
            <strong>Aviso Importante:</strong> O Músico Pro é um material educativo e informativo.
            Não substitui a orientação de um contador. As informações seguem a legislação vigente no momento da publicação.
            Sempre consulte um profissional especializado antes de tomar decisões fiscais.
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
