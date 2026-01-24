import Footer from '@/components/Footer';

export function TermosDeUso() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">Músico Pro</h1>
            <p className="text-sm text-muted-foreground">Guia + App para organizar sua vida fiscal como músico autônomo</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-sm max-w-none">
          <h1 className="text-4xl font-bold mb-8">Termos de Uso</h1>
          
          <p className="text-muted-foreground mb-6">
            <strong>Última atualização: Janeiro de 2026</strong>
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Aceitação dos Termos</h2>
            <p className="mb-4">
              Ao acessar e usar o Músico Pro (incluindo o guia, app e conteúdo relacionado), você concorda em aceitar e cumprir estes Termos de Uso. Se você não concorda com qualquer parte destes termos, por favor, não use o serviço.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Descrição do Serviço</h2>
            <p className="mb-4">
              O Músico Pro é um guia educativo + app que fornece informações sobre organização fiscal para músicos autônomos. O serviço inclui:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Guia completo sobre Imposto de Renda, Carnê-Leão e MEI.</li>
              <li>App para registrar receitas e despesas.</li>
              <li>Checklists e ferramentas de organização fiscal.</li>
              <li>Exemplos práticos e calculadoras.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Natureza Educativa do Conteúdo</h2>
            <p className="mb-4">
              <strong>O Músico Pro é um material educativo e não substitui orientação profissional.</strong>
            </p>
            <p className="mb-4">
              O conteúdo fornecido é baseado na legislação vigente no momento da publicação. Recomendamos que você:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Consulte um contador especializado para sua situação específica.</li>
              <li>Verifique a legislação atual junto à Receita Federal.</li>
              <li>Não tome decisões fiscais baseadas apenas neste guia.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Licença de Uso</h2>
            <p className="mb-4">
              Ao comprar a Licença PRO do Músico Pro, você recebe:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li><strong>Acesso pessoal e intransferível</strong> ao conteúdo premium.</li>
              <li><strong>Uso em até 2 dispositivos</strong> simultaneamente.</li>
              <li><strong>Validade de 12 meses</strong> a partir da data de compra.</li>
              <li>Acesso a atualizações de conteúdo durante o período de validade.</li>
            </ul>
            <p className="mt-4">
              Você <strong>não pode</strong> compartilhar, revender ou transferir sua licença para terceiros.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Código de Acesso</h2>
            <p className="mb-4">
              Seu código de acesso é pessoal e intransferível. Você é responsável por:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Manter seu código seguro e confidencial.</li>
              <li>Não compartilhar seu código com outras pessoas.</li>
              <li>Notificar-nos imediatamente se suspeitar de uso não autorizado.</li>
            </ul>
            <p className="mt-4">
              A Músico Pro não é responsável por acessos não autorizados resultantes de negligência do usuário.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Reembolso e Garantia</h2>
            <p className="mb-4">
              As compras são processadas através da Hotmart. A política de reembolso segue as normas da Hotmart:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li><strong>Período de reembolso:</strong> Até 7 dias após a compra.</li>
              <li><strong>Condições:</strong> Reembolso integral se o produto não atender às expectativas.</li>
              <li>Para solicitar reembolso, entre em contato com o suporte da Hotmart.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Limitação de Responsabilidade</h2>
            <p className="mb-4">
              O Músico Pro fornece conteúdo "como está" (as-is). Não garantimos:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Que o conteúdo está 100% preciso ou atualizado.</li>
              <li>Que o app funcionará sem interrupções.</li>
              <li>Resultados específicos ou economia de impostos.</li>
            </ul>
            <p className="mt-4">
              <strong>Você é responsável por verificar todas as informações com um profissional qualificado antes de implementar qualquer ação fiscal.</strong>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Proibições</h2>
            <p className="mb-4">
              Você concorda em não:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Copiar, reproduzir ou distribuir o conteúdo sem autorização.</li>
              <li>Usar o app para fins ilegais ou prejudiciais.</li>
              <li>Compartilhar seu código de acesso com terceiros.</li>
              <li>Tentar contornar medidas de segurança.</li>
              <li>Usar o serviço para fins comerciais sem permissão.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Modificações dos Termos</h2>
            <p className="mb-4">
              Reservamos o direito de modificar estes Termos de Uso a qualquer momento. Mudanças significativas serão comunicadas via email. Seu uso continuado do serviço após as mudanças constitui aceitação dos novos termos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">10. Contato e Suporte</h2>
            <p className="mb-4">
              Para dúvidas sobre estes Termos de Uso, entre em contato:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li><strong>Email:</strong> contato@musicopro.app.br</li>
              <li><strong>Horário:</strong> Segunda a sexta, 9h às 18h (horário de Brasília)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">11. Lei Aplicável</h2>
            <p className="mb-4">
              Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer disputa será resolvida nos tribunais competentes do Brasil.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">12. Disposições Finais</h2>
            <p className="mb-4">
              Se alguma disposição destes Termos for considerada inválida, as demais disposições permanecerão em vigor. Estes termos constituem o acordo integral entre você e o Músico Pro.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
