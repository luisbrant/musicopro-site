import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function PoliticaPrivacidade() {
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});

  const toggleSection = (id: number) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const sections = [
    {
      id: 1,
      title: '1. Introdução',
      content: 'O Músico Pro ("nós", "nosso" ou "responsável pelo serviço") é responsável pelo tratamento de seus dados pessoais. Esta Política de Privacidade explica como coletamos, usamos, compartilhamos e protegemos suas informações pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).'
    },
    {
      id: 2,
      title: '2. Dados que Coletamos',
      content: 'Coletamos os seguintes tipos de dados:\n\n• Dados de Identificação: Nome, e-mail, telefone (quando fornecidos voluntariamente).\n• Dados de Uso: Informações sobre como você interage com nosso site (páginas visitadas, tempo de permanência, cliques).\n• Dados Técnicos: Endereço IP, tipo de navegador, sistema operacional.\n• Dados de Transação: Informações sobre compras realizadas via Hotmart (processadas pela plataforma, não por nós).'
    },
    {
      id: 3,
      title: '3. Base Legal para Tratamento',
      content: 'Tratamos seus dados com base nas seguintes justificativas legais:\n\n• Consentimento: Quando você voluntariamente fornece informações (ex: e-mail para newsletter).\n• Execução de Contrato: Para processar sua compra e fornecer acesso ao conteúdo.\n• Interesse Legítimo: Para melhorar nossos serviços e segurança do site.\n• Obrigação Legal: Quando exigido por lei.'
    },
    {
      id: 4,
      title: '4. Uso dos Dados',
      content: 'Seus dados são utilizados para:\n\n• Fornecer acesso ao conteúdo do Músico Pro após compra.\n• Enviar atualizações e informações sobre novos conteúdos (se consentido).\n• Melhorar a experiência do usuário e otimizar o site.\n• Análise estatística de uso do site.\n• Prevenir fraudes e garantir segurança.\n\nUtilizamos o Google Analytics com anonimização de IP para análise estatística de uso do site.'
    },
    {
      id: 5,
      title: '5. Compartilhamento de Dados',
      content: 'Seus dados podem ser compartilhados com:\n\n• Hotmart: Plataforma de processamento de pagamentos (dados de transação apenas).\n• Google Analytics: Para análise de uso do site (com anonimização de IP).\n• Provedores de Hospedagem: Manus (infraestrutura do site).\n\nNão vendemos seus dados para terceiros. Compartilhamentos ocorrem apenas conforme necessário para operação do serviço.'
    },
    {
      id: 6,
      title: '6. Retenção de Dados',
      content: 'Seus dados são retidos pelo período necessário para:\n\n• Cumprir obrigações legais (ex: registros fiscais por 5 anos).\n• Manter seu acesso ao conteúdo adquirido.\n• Resolver disputas ou reclamações.\n\nApós o término da relação ou quando não mais necessários, seus dados são deletados ou anonimizados.'
    },
    {
      id: 7,
      title: '7. Segurança dos Dados',
      content: 'Implementamos medidas técnicas e organizacionais para proteger seus dados:\n\n• Criptografia de dados em trânsito (HTTPS).\n• Acesso restrito a dados pessoais.\n• Monitoramento de segurança.\n\nNo entanto, nenhum sistema é 100% seguro. Você é responsável pela confidencialidade de suas credenciais de acesso.'
    },
    {
      id: 8,
      title: '8. Seus Direitos',
      content: 'Conforme a LGPD, você tem direito a:\n\n• Acessar seus dados pessoais.\n• Corrigir dados imprecisos.\n• Deletar seus dados (direito ao esquecimento).\n• Portabilidade de dados.\n• Revogar consentimento a qualquer momento.\n• Receber informações sobre compartilhamento de dados.\n\nPara exercer esses direitos, entre em contato: suporte@musicopro.app.br'
    },
    {
      id: 9,
      title: '9. Cookies e Rastreamento',
      content: 'Utilizamos cookies para:\n\n• Manter sua sessão de login.\n• Lembrar preferências.\n• Análise de uso do site (Google Analytics).\n\nVocê pode desabilitar cookies em seu navegador, mas isso pode afetar a funcionalidade do site.\n\nAo continuar navegando neste site, você concorda com o uso de cookies conforme descrito nesta Política de Privacidade.'
    },
    {
      id: 10,
      title: '10. Contato e Reclamações',
      content: 'Para dúvidas sobre privacidade ou para exercer seus direitos:\n\nEmail: suporte@musicopro.app.br\n\nSe não estiver satisfeito com nossa resposta, você pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).'
    },
    {
      id: 11,
      title: '11. Encarregado de Proteção de Dados (DPO)',
      content: 'O responsável pelo Músico Pro atua como Encarregado de Proteção de Dados (DPO), conforme permitido pela LGPD para operações de pequeno porte.\n\nPara contato sobre dados pessoais:\n\nEmail: suporte@musicopro.app.br'
    },
    {
      id: 12,
      title: '12. Alterações nesta Política',
      content: 'Esta Política de Privacidade pode ser atualizada periodicamente. Alterações significativas serão comunicadas via e-mail ou aviso no site. Seu uso continuado do site após alterações constitui aceitação da nova política.'
    },
    {
      id: 13,
      title: '13. Lei Aplicável',
      content: 'Esta Política de Privacidade é regida pela Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) e pela legislação brasileira.'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Política de Privacidade</h1>
          <p className="text-muted-foreground">Última atualização: Janeiro de 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-invert max-w-none mb-12">
          <p className="text-lg text-muted-foreground mb-8">
            Esta Política de Privacidade descreve como o Músico Pro coleta, usa, compartilha e protege suas informações pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD).
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.id}
              className="border border-border rounded-lg bg-card text-card-foreground overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-accent/10 transition-colors"
              >
                <h2 className="text-lg font-semibold text-left">{section.title}</h2>
                <ChevronDown
                  size={20}
                  className={`transition-transform ${
                    expandedSections[section.id] ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedSections[section.id] && (
                <div className="px-6 py-4 border-t border-border bg-background/50">
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {section.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 p-6 bg-accent/10 border border-accent rounded-lg">
          <h3 className="text-xl font-bold mb-4">Dúvidas sobre Privacidade?</h3>
          <p className="text-muted-foreground mb-4">
            Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos seus dados, entre em contato conosco:
          </p>
          <p className="font-semibold">
            Email: <a href="mailto:suporte@musicopro.app.br" className="text-accent hover:underline">suporte@musicopro.app.br</a>
          </p>
        </div>
      </div>


    </div>
  );
}
