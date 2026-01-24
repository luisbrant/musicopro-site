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
      title: "1. Aceitação dos Termos",
      content: "Ao acessar e usar o Músico Pro, você concorda em estar vinculado por estes Termos de Uso. Se você não concorda com qualquer parte destes termos, não deve usar o site. Estes termos se aplicam a todos os usuários, visitantes e outras pessoas que acessam ou usam o site."
    },
    {
      title: "2. Descrição do Serviço",
      content: "O Músico Pro é um guia educativo e informativo sobre Imposto de Renda para músicos autônomos brasileiros. O serviço inclui:\n\n• Conteúdo gratuito sobre fundamentos fiscais.\n• Acesso premium a conteúdo aprofundado mediante código de acesso.\n• Recomendações de ferramentas e práticas.\n\nO Músico Pro é um material educativo e informativo. Não substitui a orientação de um contador ou profissional especializado em impostos."
    },
    {
      title: "3. Licença de Uso",
      content: "Você recebe uma licença anual e não exclusiva para acessar e usar o Músico Pro para fins pessoais e educacionais. Esta licença:\n\n• É válida por 12 meses a partir da data de compra.\n• Não pode ser transferida para terceiros.\n• Não inclui direitos de revenda ou redistribuição.\n• Pode ser revogada se você violar estes termos.\n\nApós o término de 12 meses, você pode renovar sua licença mediante nova compra."
    },
    {
      title: "4. Restrições de Uso",
      content: "Você concorda em não:\n\n• Copiar, modificar ou criar trabalhos derivados do conteúdo.\n• Compartilhar seu código de acesso com terceiros.\n• Usar o site para fins comerciais ou competitivos.\n• Tentar contornar medidas de segurança.\n• Fazer scraping ou coleta automatizada de dados.\n• Usar o site para atividades ilegais ou prejudiciais.\n• Interferir com o funcionamento do site ou servidores.\n\nViolações podem resultar em suspensão ou encerramento do acesso."
    },
    {
      title: "5. Conteúdo do Usuário",
      content: "Qualquer conteúdo que você enviar (como dúvidas por email) pode ser usado para melhorar o serviço. Você garante que:\n\n• Tem direito de enviar o conteúdo.\n• O conteúdo não viola direitos de terceiros.\n• O conteúdo não é ilegal ou prejudicial.\n\nNão somos responsáveis por conteúdo enviado por usuários."
    },
    {
      title: "6. Isenção de Responsabilidade",
      content: "O Músico Pro é fornecido \"no estado em que se encontra\" sem garantias. Especificamente:\n\n• Não garantimos que o conteúdo é 100% preciso ou atualizado.\n• Não garantimos que o site funcionará sem interrupções.\n• Não somos responsáveis por perdas de dados ou acesso interrompido.\n• Você usa o site por sua conta e risco.\n\nSempre consulte um profissional especializado antes de tomar decisões fiscais importantes."
    },
    {
      title: "7. Limitação de Responsabilidade",
      content: "Em nenhuma circunstância o Músico Pro será responsável por:\n\n• Danos indiretos, incidentais ou consequentes.\n• Perda de lucros, dados ou oportunidades.\n• Erros ou omissões no conteúdo.\n• Ações de terceiros ou eventos fora de nosso controle.\n\nNossa responsabilidade total não excede o valor que você pagou pelo acesso premium."
    },
    {
      title: "8. Política de Reembolso",
      content: "Reembolsos são processados conforme a política da Hotmart (plataforma de vendas). Especificamente:\n\n• Você tem direito a reembolso dentro de 7 dias após a compra, conforme política da Hotmart.\n• Reembolsos são processados pela Hotmart, não pelo Músico Pro.\n• Após o reembolso, seu acesso ao conteúdo premium é revogado.\n• Para solicitar reembolso, entre em contato com o suporte da Hotmart.\n\nConsulte a política de reembolso da Hotmart para detalhes completos."
    },
    {
      title: "9. Propriedade Intelectual",
      content: "Todo o conteúdo do Músico Pro (textos, imagens, design, etc.) é protegido por direitos autorais. Você não pode:\n\n• Reproduzir ou distribuir o conteúdo sem permissão.\n• Usar o conteúdo para fins comerciais.\n• Reivindicar propriedade sobre o conteúdo.\n\nTodos os direitos reservados. Violações podem resultar em ação legal."
    },
    {
      title: "10. Links Externos",
      content: "O Músico Pro pode conter links para sites de terceiros. Não somos responsáveis por:\n\n• Conteúdo de sites externos.\n• Políticas de privacidade de terceiros.\n• Disponibilidade ou funcionamento de links externos.\n\nAcesso a sites externos é por sua conta e risco. Recomendamos revisar as políticas desses sites antes de fornecer informações pessoais."
    },
    {
      title: "11. Modificações dos Termos",
      content: "Podemos modificar estes Termos de Uso a qualquer momento. Notificaremos você sobre alterações significativas através de email ou aviso no site. Seu uso contínuo do site após alterações significa que você aceita os termos modificados.\n\nÚltima atualização: Janeiro de 2026"
    },
    {
      title: "12. Contato e Suporte",
      content: "Para dúvidas sobre estes Termos de Uso ou para reportar violações, entre em contato:\n\nEmail: suporte@musicopro.app.br\n\nResponderemos sua solicitação dentro de 5 dias úteis. Também estamos disponíveis para discutir questões legais, técnicas ou de conteúdo relacionadas ao Músico Pro."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Termos de Uso</h1>
          <p className="text-blue-100">Músico Pro - Condições de Serviço</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        {/* Intro Box */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-blue-500">
          <p className="text-gray-700 mb-4">
            Bem-vindo aos Termos de Uso do Músico Pro. Estes termos definem as condições sob as quais você pode usar nosso site e serviços. Leia-os atentamente antes de continuar.
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
          <p className="text-gray-700">
            O Músico Pro é um material educativo e informativo. Não substitui a orientação de um contador ou profissional especializado em impostos. As informações seguem a legislação vigente no momento da publicação. Sempre consulte um profissional especializado antes de tomar decisões fiscais.
          </p>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mt-8 border border-blue-200">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Precisa de Ajuda?</h3>
          <p className="text-gray-700 mb-4">
            Se você tiver dúvidas sobre estes Termos de Uso ou precisar de suporte, entre em contato:
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
          <p>Versão 1.0 - Termos Completos</p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
