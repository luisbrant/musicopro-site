import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Footer from '@/components/Footer';

export default function Termos() {
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});

  const toggleSection = (index: number) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const sections = [
    {
      title: "1. Introdução e Aceitação dos Termos",
      content: "Estes Termos de Uso regulam o acesso e uso do site, conteúdo e aplicativo Músico Pro.\n\nAo acessar ou utilizar o Músico Pro, você declara que leu, compreendeu e concorda integralmente com estes Termos. Se você não concorda com qualquer disposição, não deve acessar ou usar o serviço."
    },
    {
      title: "2. Definições",
      content: "Para fins destes Termos, os seguintes termos têm os significados abaixo:\n\n• Músico Pro: Plataforma educacional e aplicativo de organização fiscal para músicos.\n• Usuário: Pessoa que acessa ou utiliza o site, conteúdo ou app.\n• Conteúdo Premium: Materiais, ferramentas e funcionalidades acessíveis mediante código/licença.\n• Serviço: O site, aplicativo, conteúdo e todas as funcionalidades oferecidas pelo Músico Pro."
    },
    {
      title: "3. Descrição do Serviço",
      content: "O Músico Pro oferece conteúdo educativo e ferramentas digitais para auxiliar músicos na organização de receitas, despesas e obrigações fiscais, incluindo apoio ao entendimento do Carnê-Leão.\n\nO serviço não substitui a atuação de contador ou consultor fiscal. As informações fornecidas são de natureza educativa e não constituem aconselhamento profissional. Sempre consulte um profissional especializado antes de tomar decisões fiscais importantes."
    },
    {
      title: "4. Elegibilidade de Uso",
      content: "O uso do Músico Pro é permitido a:\n\n• Pessoas maiores de 18 anos ou legalmente capazes.\n• Usuários que concordam integralmente com estes Termos.\n• Usuários que não foram suspensos ou banidos do serviço.\n\nVocê é responsável por garantir que seu uso do serviço está em conformidade com todas as leis e regulamentos aplicáveis em sua jurisdição."
    },
    {
      title: "5. Cadastro e Acesso",
      content: "Algumas funcionalidades do Músico Pro exigem cadastro ou código de acesso.\n\nVocê é responsável por:\n\n• Manter seu código e dados de acesso em sigilo absoluto.\n• Não compartilhar seu código com terceiros.\n• Notificar imediatamente o suporte em caso de acesso não autorizado.\n• Todas as atividades realizadas com seu código são de sua responsabilidade.\n\nO Músico Pro não se responsabiliza por uso não autorizado de sua conta caso você não mantenha seus dados em sigilo."
    },
    {
      title: "6. Licença de Uso",
      content: "Concedemos ao usuário uma licença limitada, pessoal, intransferível e não exclusiva para uso do conteúdo e do app, exclusivamente para fins pessoais.\n\nEsta licença permite que você:\n\n• Acesse e visualize o conteúdo do Músico Pro.\n• Use as ferramentas e calculadoras fornecidas.\n• Imprima conteúdo para uso pessoal.\n\nNão é permitido:\n\n• Revender, compartilhar ou transferir a licença.\n• Usar o conteúdo para fins comerciais.\n• Modificar ou criar trabalhos derivados.\n• Fazer engenharia reversa ou tentar contornar medidas de segurança."
    },
    {
      title: "7. Pagamentos, Planos e Acesso Premium",
      content: "O acesso Premium é adquirido por meio de plataformas de pagamento parceiras (ex.: Hotmart).\n\nInformações importantes:\n\n• O Músico Pro não armazena dados de cartão de crédito.\n• Todos os dados de pagamento são processados com segurança pela plataforma parceira.\n• Reembolsos e garantias seguem as regras da plataforma de pagamento utilizada.\n• O acesso Premium é válido por 12 meses a partir da data de compra.\n• Após 12 meses, você pode renovar sua licença mediante nova compra.\n• Cancelamentos e devoluções devem ser solicitados diretamente à plataforma de pagamento.\n\nConsulte a política de reembolso da Hotmart para detalhes completos sobre direitos de devolução."
    },
    {
      title: "8. Obrigações do Usuário",
      content: "Ao usar o Músico Pro, você compromete-se a:\n\n• Fornecer informações verdadeiras e precisas.\n• Não compartilhar seus códigos de acesso com terceiros.\n• Não utilizar o serviço para fins ilegais ou prejudiciais.\n• Não copiar, revender, distribuir ou compartilhar o conteúdo.\n• Não fazer scraping, coleta automatizada ou acesso não autorizado.\n• Não interferir com o funcionamento do site ou servidores.\n• Respeitar os direitos de propriedade intelectual do Músico Pro.\n• Não usar o serviço para atividades que violem leis aplicáveis.\n\nViolações destas obrigações podem resultar em suspensão ou encerramento do acesso sem direito a reembolso."
    },
    {
      title: "9. Propriedade Intelectual",
      content: "Todo o conteúdo do Músico Pro, incluindo textos, imagens, design, ferramentas, calculadoras e estrutura, é protegido por direitos autorais e leis de propriedade intelectual.\n\nÉ proibida a reprodução total ou parcial do conteúdo sem autorização expressa. Violações de direitos autorais podem resultar em:\n\n• Encerramento imediato do acesso.\n• Ação legal para proteção dos direitos.\n• Indenizações por danos e prejuízos.\n\nTodos os direitos reservados. © 2026 Músico Pro."
    },
    {
      title: "10. Limitação de Responsabilidade",
      content: "O Músico Pro é fornecido \"no estado em que se encontra\" sem garantias de qualquer tipo.\n\nO Músico Pro não se responsabiliza por:\n\n• Decisões fiscais tomadas pelo usuário com base nas informações fornecidas.\n• Multas, autuações, juros ou prejuízos decorrentes do uso das informações.\n• Indisponibilidades temporárias ou permanentes do serviço.\n• Erros, omissões ou imprecisões no conteúdo.\n• Perda de dados ou acesso interrompido.\n• Ações de terceiros ou eventos fora de nosso controle.\n• Danos indiretos, incidentais ou consequentes.\n\nEm nenhuma circunstância a responsabilidade total do Músico Pro excederá o valor que você pagou pelo acesso ao serviço."
    },
    {
      title: "11. Suspensão e Encerramento de Acesso",
      content: "O acesso ao Músico Pro poderá ser suspenso ou encerrado em caso de:\n\n• Violação destes Termos de Uso.\n• Compartilhamento não autorizado de códigos de acesso.\n• Atividades ilegais ou prejudiciais.\n• Tentativa de contornar medidas de segurança.\n• Não pagamento de taxas devidas.\n• Solicitação do usuário.\n\nEm caso de suspensão ou encerramento:\n\n• Seu acesso será revogado imediatamente.\n• Você não terá direito a reembolso.\n• Dados associados à sua conta podem ser retidos conforme exigido por lei.\n\nO Músico Pro se reserva o direito de suspender ou encerrar o acesso a qualquer momento, com ou sem aviso prévio, conforme necessário."
    },
    {
      title: "12. Privacidade e Proteção de Dados",
      content: "O tratamento de dados pessoais é regido pela Política de Privacidade, que é parte integrante destes Termos.\n\nAo usar o Músico Pro, você consente com:\n\n• Coleta de dados conforme descrito na Política de Privacidade.\n• Uso de cookies e tecnologias de rastreamento.\n• Compartilhamento de dados com parceiros de serviço (ex.: Hotmart, Google Analytics).\n• Processamento de dados conforme a Lei Geral de Proteção de Dados (LGPD).\n\nVocê tem direito a:\n\n• Acessar seus dados pessoais.\n• Corrigir dados imprecisos.\n• Solicitar exclusão de dados (direito ao esquecimento).\n• Revogar consentimento a qualquer momento.\n\nPara exercer esses direitos, entre em contato: suporte@musicopro.app.br"
    },
    {
      title: "13. Alterações dos Termos",
      content: "O Músico Pro poderá atualizar estes Termos de Uso a qualquer momento para refletir mudanças em nossas práticas, tecnologia ou requisitos legais.\n\nNotificaremos você sobre alterações significativas através de:\n\n• Email para o endereço registrado em sua conta.\n• Aviso destacado no site.\n• Publicação da versão atualizada nesta página.\n\nO uso contínuo do serviço após alterações implica aceitação integral da versão atualizada dos Termos.\n\nÚltima atualização: Janeiro de 2026"
    },
    {
      title: "14. Legislação Aplicável e Foro",
      content: "Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil, especialmente:\n\n• Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).\n• Código de Defesa do Consumidor (Lei 8.078/1990).\n• Legislação tributária e fiscal brasileira.\n\nForo Competente:\n\nFica eleito o foro do domicílio do usuário, conforme o Código de Defesa do Consumidor, para dirimir qualquer controvérsia decorrente destes Termos ou do uso do Músico Pro.\n\nEm caso de litígio, as partes concordam em tentar resolver a questão através de negociação amigável antes de recorrer a ações judiciais."
    },
    {
      title: "15. Contato",
      content: "Para dúvidas, sugestões ou reclamações sobre estes Termos de Uso, entre em contato:\n\n📧 Email: suporte@musicopro.app.br\n\nResponderemos sua solicitação dentro de 5 dias úteis.\n\nTambém estamos disponíveis para discutir:\n\n• Questões sobre conformidade com estes Termos.\n• Solicitações de exclusão de dados ou encerramento de conta.\n• Reclamações sobre conteúdo ou funcionalidades.\n• Sugestões de melhorias no serviço.\n\nSeu feedback é importante para melhorarmos continuamente o Músico Pro."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Termos de Uso</h1>
          <p className="text-blue-100">Músico Pro - Condições de Serviço Completas</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        {/* Intro Box */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-blue-500">
          <p className="text-gray-700 mb-4">
            Bem-vindo aos Termos de Uso do Músico Pro. Estes termos definem as condições sob as quais você pode usar nosso site, conteúdo e aplicativo. Leia-os atentamente antes de continuar usando o serviço.
          </p>
          <p className="text-gray-600 text-sm">
            <strong>Dúvidas sobre os termos?</strong> Entre em contato: <a href="mailto:suporte@musicopro.app.br" className="text-blue-600 hover:underline">suporte@musicopro.app.br</a>
          </p>
        </div>

        {/* Expandable Sections */}
        <div className="space-y-3">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleSection(index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-left font-semibold text-gray-800">{section.title}</h3>
                <ChevronDown
                  size={20}
                  className={`text-gray-600 flex-shrink-0 transition-transform ${
                    expandedSections[index] ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedSections[index] && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {section.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 rounded-lg p-6 mt-8 border-l-4 border-yellow-500">
          <h3 className="text-lg font-bold text-gray-800 mb-3">⚠️ Aviso Importante</h3>
          <p className="text-gray-700 mb-3">
            O Músico Pro é um material educativo e informativo. Não substitui a orientação de um contador ou profissional especializado em impostos.
          </p>
          <p className="text-gray-700">
            As informações seguem a legislação vigente no momento da publicação. Sempre consulte um profissional especializado antes de tomar decisões fiscais importantes.
          </p>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mt-8 border border-blue-200">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Precisa de Ajuda?</h3>
          <p className="text-gray-700 mb-4">
            Se você tiver dúvidas sobre estes Termos de Uso ou precisar de suporte, entre em contato conosco:
          </p>
          <div className="bg-white rounded p-4">
            <p className="text-gray-800">
              <strong>Email:</strong> <a href="mailto:suporte@musicopro.app.br" className="text-blue-600 hover:underline">suporte@musicopro.app.br</a>
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Responderemos sua solicitação dentro de 5 dias úteis.
            </p>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>Última atualização: Janeiro de 2026</p>
          <p>Versão 2.0 - Termos Completos e Detalhados</p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
