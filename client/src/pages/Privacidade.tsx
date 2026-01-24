import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Footer from '@/components/Footer';

export default function Privacidade() {
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});

  const toggleSection = (index: number) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const sections = [
    {
      title: "1. Introdução",
      content: "A Política de Privacidade do Músico Pro descreve como coletamos, usamos, protegemos e compartilhamos suas informações pessoais. Estamos comprometidos em proteger sua privacidade e garantir transparência total sobre o tratamento de seus dados, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018)."
    },
    {
      title: "2. Responsável pelo Tratamento de Dados",
      content: "Responsável pelo serviço: Músico Pro\nEmail de contato: suporte@musicopro.app.br\n\nO responsável pelo tratamento de dados é a pessoa ou entidade que determina as finalidades e meios do tratamento de dados pessoais. Para dúvidas sobre privacidade, entre em contato através do email acima."
    },
    {
      title: "3. Dados Coletados",
      content: "Coletamos os seguintes dados pessoais:\n\n• Email: Necessário para criar conta, enviar código de acesso e comunicações de suporte.\n• Código de Acesso: Utilizado para validar acesso ao conteúdo premium.\n• Dados de Navegação: Coletados via Google Analytics 4 (GA4) para análise de uso do site.\n• Cookies: Utilizados para melhorar sua experiência de navegação.\n\nTodos os dados são coletados com seu consentimento explícito."
    },
    {
      title: "4. Finalidades do Tratamento",
      content: "Seus dados são utilizados para:\n\n• Fornecer acesso ao conteúdo premium mediante código de acesso.\n• Enviar comunicações relacionadas ao seu acesso e suporte.\n• Melhorar a experiência do usuário através de análise de navegação.\n• Cumprir obrigações legais e regulatórias.\n• Prevenir fraudes e abusos.\n• Comunicações sobre atualizações de conteúdo (apenas com seu consentimento)."
    },
    {
      title: "5. Base Legal para o Tratamento",
      content: "O tratamento de seus dados é baseado em:\n\n• Consentimento: Você concorda explicitamente ao usar o site.\n• Execução de Contrato: Necessário para fornecer o serviço de acesso ao conteúdo premium.\n• Obrigação Legal: Para cumprir requisitos legais e regulatórios.\n• Interesse Legítimo: Para melhorar segurança, prevenir fraudes e otimizar o serviço."
    },
    {
      title: "6. Compartilhamento de Dados",
      content: "Seus dados podem ser compartilhados com:\n\n• Hotmart: Plataforma de vendas e entrega de licenças (dados de compra apenas).\n• Google Analytics: Para análise de navegação e comportamento do usuário (dados anonimizados).\n• Provedores de Email: Para envio de comunicações (dados de email apenas).\n\nNão compartilhamos dados com terceiros para fins de marketing sem seu consentimento explícito."
    },
    {
      title: "7. Retenção de Dados",
      content: "Seus dados são retidos pelo tempo necessário para:\n\n• Fornecer o serviço contratado.\n• Cumprir obrigações legais e regulatórias.\n• Resolver disputas e questões legais.\n\nApós o término da relação, seus dados são deletados ou anonimizados dentro de 30 dias, exceto quando exigido por lei manter registros por período mais longo."
    },
    {
      title: "8. Segurança de Dados",
      content: "Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados:\n\n• Criptografia de dados em trânsito (HTTPS).\n• Acesso restrito a dados pessoais apenas para funcionários autorizados.\n• Monitoramento de segurança contínuo.\n• Política de senhas fortes e autenticação segura.\n\nApesar de nossas medidas, nenhum sistema é 100% seguro. Recomendamos que você mantenha sua senha confidencial."
    },
    {
      title: "9. Seus Direitos",
      content: "Conforme a LGPD, você tem direito a:\n\n• Acessar seus dados pessoais.\n• Corrigir dados imprecisos.\n• Deletar seus dados (direito ao esquecimento).\n• Portar seus dados para outro serviço.\n• Revogar consentimento a qualquer momento.\n• Ser informado sobre vazamentos de dados.\n• Receber informações sobre o tratamento de seus dados.\n\nPara exercer qualquer desses direitos, entre em contato: suporte@musicopro.app.br"
    },
    {
      title: "10. Consentimento de Cookies",
      content: "O Músico Pro utiliza cookies para:\n\n• Melhorar sua experiência de navegação.\n• Lembrar suas preferências.\n• Analisar o uso do site via Google Analytics 4.\n\nVocê pode desabilitar cookies nas configurações do seu navegador. No entanto, isso pode afetar a funcionalidade do site. Ao continuar usando o site, você consente com o uso de cookies conforme descrito nesta política."
    },
    {
      title: "11. Google Analytics 4 e Anonimização de IP",
      content: "Utilizamos Google Analytics 4 (GA4) para análise de navegação. Implementamos as seguintes medidas de privacidade:\n\n• Anonimização de IP: Endereços IP são anonimizados automaticamente.\n• Dados Agregados: Analisamos dados em nível agregado, não individual.\n• Sem Rastreamento de Identificadores: GA4 não rastreia informações que o identifiquem pessoalmente.\n• Conformidade com LGPD: O processamento está em conformidade com requisitos de privacidade.\n\nVocê pode desabilitar o rastreamento do GA4 através de extensões de navegador ou configurações de privacidade."
    },
    {
      title: "12. Encarregado de Proteção de Dados (DPO)",
      content: "Para pequenas organizações como a Músico Pro, a designação de um DPO formal pode não ser obrigatória conforme a LGPD. No entanto, designamos um responsável pela proteção de dados:\n\nContato para assuntos de privacidade: suporte@musicopro.app.br\n\nEste responsável está disponível para responder dúvidas sobre tratamento de dados e exercer seus direitos conforme a LGPD."
    },
    {
      title: "13. Alterações nesta Política",
      content: "Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas, tecnologia ou requisitos legais. Notificaremos você sobre alterações significativas através de email ou aviso no site. Seu uso contínuo do site após alterações significa que você aceita a política atualizada.\n\nÚltima atualização: Janeiro de 2026"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Política de Privacidade</h1>
          <p className="text-blue-100">Músico Pro - Conformidade LGPD</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        {/* Intro Box */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-blue-500">
          <p className="text-gray-700 mb-4">
            Bem-vindo à Política de Privacidade do Músico Pro. Esta política explica como coletamos, usamos e protegemos suas informações pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD).
          </p>
          <p className="text-gray-600 text-sm">
            <strong>Dúvidas sobre privacidade?</strong> Entre em contato: <a href="mailto:suporte@musicopro.app.br" className="text-blue-600 hover:underline">suporte@musicopro.app.br</a>
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

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mt-8 border border-blue-200">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Precisa de Ajuda?</h3>
          <p className="text-gray-700 mb-4">
            Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como seus dados são tratados, entre em contato conosco:
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
          <p>Versão 1.0 - Conformidade LGPD</p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
