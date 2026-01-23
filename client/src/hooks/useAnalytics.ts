// Hook para rastrear eventos de conversão e GA4

export const useAnalytics = () => {
  // Rastrear clique em "Comprar Licença PRO"
  const trackBuyClick = () => {
    if (window.gtag) {
      window.gtag('event', 'comprar_licenca_pro', {
        event_category: 'engagement',
        event_label: 'Comprar Licença PRO',
        value: 1
      });
      window.gtag('event', 'conversion', {
        'conversion_id': 'comprar_licenca_pro'
      });
    }
    // Rastrear com Hotmart (se disponível)
    if (window.htmx) {
      window.htmx('trackEvent', 'compra_iniciada');
    }
  };

  // Rastrear clique em "Entrar no Premium"
  const trackPremiumClick = () => {
    if (window.gtag) {
      window.gtag('event', 'entrar_premium', {
        event_category: 'engagement',
        event_label: 'Entrar no Premium',
        value: 1
      });
    }
  };

  // Rastrear clique em "Baixar App Grátis"
  const trackDownloadAppClick = () => {
    if (window.gtag) {
      window.gtag('event', 'baixar_app_gratis', {
        event_category: 'engagement',
        event_label: 'Baixar App Grátis',
        value: 1
      });
    }
  };

  // Rastrear visualização de página
  const trackPageView = (pageName: string) => {
    if (window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: window.location.pathname,
        page_title: pageName
      });
    }
  };

  // Rastrear código de acesso inserido
  const trackAccessCodeSubmit = (success: boolean) => {
    if (window.gtag) {
      window.gtag('event', 'codigo_acesso_' + (success ? 'sucesso' : 'erro'), {
        event_category: 'premium',
        event_label: 'Código de Acesso',
        value: success ? 1 : 0
      });
    }
  };

  return {
    trackBuyClick,
    trackPremiumClick,
    trackDownloadAppClick,
    trackPageView,
    trackAccessCodeSubmit
  };
};

// Declarar tipos globais para window
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    htmx?: (...args: any[]) => void;
  }
}
