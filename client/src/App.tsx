import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { useAttribution } from "./hooks/useAttribution";
import { AttributionBanner } from "./components/AttributionBanner";

import Vendas from "./pages/Vendas";
import Demo from "./pages/Demo";
// Premium removido pois agora usamos GuidePro
import Obrigado from "./pages/Obrigado";
import Privacidade from "./pages/Privacidade";
import Termos from "./pages/Termos";
import PWA from "./pages/PWA";
import Guide from "./pages/Guide";
import AppInstructions from "./pages/AppInstructions";

// ✅ Página dedicada do App
import AppOnly from "./pages/AppOnly";

// ✅ Página dedicada do Guia PRO completo (Área VIP)
import GuidePro from "./pages/GuidePro";

function Router() {
  const { showBanner, closeBanner } = useAttribution();

  return (
    <>
      <AttributionBanner isVisible={showBanner} onClose={closeBanner} />

      <Switch>
        <Route path="/" component={Home} />

        {/* ✅ App (página dedicada) */}
        <Route path="/app" component={AppOnly} />

        {/* ✅ Instruções de instalação */}
        <Route path="/instalar" component={AppInstructions} />

        {/* ✅ Guia (conteúdo grátis + ativação do pacote) */}
        <Route path="/guia" component={Guide} />

        {/* ✅ Guia PRO completo (Área do Aluno) */}
        <Route path="/guia-pro" component={GuidePro} />

        {/* ✅ CORREÇÃO: Rota de Vendas atualizada para /vendas */}
        <Route path="/vendas" component={Vendas} />
        
        {/* Mantendo /pro redirecionando para vendas ou como alias, se desejar. 
            Mas para corrigir o 404 do print, a linha acima é a essencial. */}
        <Route path="/pro" component={Vendas} />

        <Route path="/obrigado" component={Obrigado} />
        <Route path="/demo" component={Demo} />
        <Route path="/privacidade" component={Privacidade} />
        <Route path="/termos" component={Termos} />
        <Route path="/pwa/*" component={PWA} />
        
        {/* Rota 404 e Fallback */}
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;