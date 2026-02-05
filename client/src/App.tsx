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
import Premium from "./pages/Premium";
import Obrigado from "./pages/Obrigado";
import Privacidade from "./pages/Privacidade";
import Termos from "./pages/Termos";
import PWA from "./pages/PWA";
import Guide from "./pages/Guide";
import AppInstructions from "./pages/AppInstructions";

// ✅ NOVA PÁGINA (SÓ APP)
import AppOnly from "./pages/AppOnly";

function Router() {
  const { showBanner, closeBanner } = useAttribution();

  return (
    <>
      <AttributionBanner isVisible={showBanner} onClose={closeBanner} />
      <Switch>
        <Route path={"/"} component={Home} />

        {/* ✅ App (página dedicada) */}
        <Route path="/app" component={AppOnly} />

        {/* ✅ Instruções de instalação (mantida separada) */}
        <Route path="/instalar" component={AppInstructions} />

        {/* ✅ Guia (página dedicada) */}
        <Route path="/guia" component={Guide} />

        <Route path="/pro" component={Vendas} />
        <Route path="/premium" component={Premium} />
        <Route path="/obrigado" component={Obrigado} />
        <Route path="/demo" component={Demo} />
        <Route path="/privacidade" component={Privacidade} />
        <Route path="/termos" component={Termos} />
        <Route path="/pwa/*" component={PWA} />
        <Route path="/404" component={NotFound} />

        {/* Final fallback route */}
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
