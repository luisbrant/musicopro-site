import Footer from '@/components/Footer';

export function PoliticaPrivacidade() {
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
          <h1 className="text-4xl font-bold mb-8">Política de Privacidade</h1>
          
          <p className="text-muted-foreground mb-6">
            <strong>Última atualização: Janeiro de 2026</strong>
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Introdução</h2>
            <p className="mb-4">
              O Músico Pro ("nós", "nosso" ou "empresa") respeita a privacidade dos usuários ("você" ou "usuário"). Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Dados Coletados</h2>
            <p className="mb-4">
              Coletamos os seguintes dados pessoais:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li><strong>Dados de Cadastro:</strong> Nome, email, telefone (opcional).</li>
              <li><strong>Dados de Compra:</strong> Informações de pagamento processadas via Hotmart (não armazenamos dados de cartão).</li>
              <li><strong>Dados de Uso:</strong> Acesso ao app, páginas visitadas, tempo de permanência (via Google Analytics).</li>
              <li><strong>Dados de Contato:</strong> Mensagens enviadas ao suporte.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Base Legal para Coleta de Dados</h2>
            <p className="mb-4">
              Coletamos dados com base nas seguintes bases legais (LGPD):
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li><strong>Consentimento:</strong> Você concorda ao se cadastrar e usar o serviço.</li>
              <li><strong>Execução de Contrato:</strong> Dados necessários para processar sua compra e fornecer acesso.</li>
              <li><strong>Obrigação Legal:</strong> Dados exigidos por lei (ex: notas fiscais).</li>
              <li><strong>Interesse Legítimo:</strong> Melhorar o serviço e prevenir fraudes.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Uso dos Dados</h2>
            <p className="mb-4">
              Usamos seus dados para:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Processar sua compra e gerar acesso ao conteúdo.</li>
              <li>Enviar confirmação de compra e código de acesso.</li>
              <li>Fornecer suporte técnico e responder dúvidas.</li>
              <li>Enviar comunicações sobre atualizações do serviço (você pode se desinscrever).</li>
              <li>Analisar uso do app para melhorias (dados anônimos via Google Analytics).</li>
              <li>Cumprir obrigações legais e fiscais.</li>
              <li>Prevenir fraudes e atividades ilegais.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Compartilhamento de Dados</h2>
            <p className="mb-4">
              Seus dados podem ser compartilhados com:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li><strong>Hotmart:</strong> Processadora de pagamentos (dados de compra).</li>
              <li><strong>Google Analytics:</strong> Dados anônimos de uso do site.</li>
              <li><strong>Manus:</strong> Plataforma de hospedagem (dados de acesso).</li>
              <li><strong>Autoridades Legais:</strong> Se exigido por lei.</li>
            </ul>
            <p className="mt-4">
              <strong>Não vendemos seus dados para terceiros.</strong>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Retenção de Dados</h2>
            <p className="mb-4">
              Retemos seus dados pelo tempo necessário para:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Fornecer o serviço (durante a validade da licença + 30 dias).</li>
              <li>Cumprir obrigações legais (até 5 anos para fins fiscais).</li>
              <li>Resolver disputas.</li>
            </ul>
            <p className="mt-4">
              Após este período, seus dados serão deletados ou anonimizados.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Segurança dos Dados</h2>
            <p className="mb-4">
              Implementamos medidas de segurança para proteger seus dados:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Criptografia SSL/TLS para transmissão de dados.</li>
              <li>Senhas hasheadas e não armazenadas em texto plano.</li>
              <li>Acesso restrito a dados pessoais.</li>
              <li>Monitoramento de atividades suspeitas.</li>
            </ul>
            <p className="mt-4">
              <strong>Nota:</strong> Nenhum sistema é 100% seguro. Você é responsável por manter seu código de acesso confidencial.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Seus Direitos (LGPD)</h2>
            <p className="mb-4">
              Você tem os seguintes direitos sob a LGPD:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li><strong>Direito de Acesso:</strong> Solicitar cópia de seus dados.</li>
              <li><strong>Direito de Retificação:</strong> Corrigir dados incorretos.</li>
              <li><strong>Direito de Exclusão:</strong> Solicitar exclusão de dados ("direito ao esquecimento").</li>
              <li><strong>Direito de Portabilidade:</strong> Receber dados em formato estruturado.</li>
              <li><strong>Direito de Oposição:</strong> Opor-se ao processamento de dados.</li>
              <li><strong>Direito de Revogar Consentimento:</strong> Retirar consentimento a qualquer momento.</li>
            </ul>
            <p className="mt-4">
              Para exercer esses direitos, entre em contato: <strong>contato@musicopro.app.br</strong>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Cookies e Rastreamento</h2>
            <p className="mb-4">
              Usamos cookies para:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Manter você conectado ao app.</li>
              <li>Lembrar preferências.</li>
              <li>Analisar uso do site (Google Analytics).</li>
            </ul>
            <p className="mt-4">
              Você pode desabilitar cookies nas configurações do navegador, mas isso pode afetar a funcionalidade do app.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">10. Transferência de Dados Internacionais</h2>
            <p className="mb-4">
              Seus dados podem ser armazenados em servidores localizados fora do Brasil (ex: Manus, Google). Garantimos que esses servidores implementam medidas de proteção equivalentes às da LGPD.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">11. Alterações na Política</h2>
            <p className="mb-4">
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre mudanças significativas via email. Seu uso continuado do serviço após as mudanças constitui aceitação da nova política.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">12. Contato e Reclamações</h2>
            <p className="mb-4">
              Para dúvidas sobre esta Política de Privacidade ou para exercer seus direitos:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li><strong>Email:</strong> contato@musicopro.app.br</li>
              <li><strong>Horário:</strong> Segunda a sexta, 9h às 18h (horário de Brasília)</li>
            </ul>
            <p className="mt-4">
              Se você não estiver satisfeito com nossa resposta, pode registrar uma reclamação junto à Autoridade Nacional de Proteção de Dados (ANPD).
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">13. Encarregado de Proteção de Dados</h2>
            <p className="mb-4">
              Designamos um Encarregado de Proteção de Dados (DPO) para supervisionar a conformidade com a LGPD. Você pode contatá-lo em: <strong>contato@musicopro.app.br</strong>
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
