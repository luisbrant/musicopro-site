import { Link } from 'wouter';
import Footer from '@/components/Footer';
import { Smartphone, Globe, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAppUrl, isAndroidDevice, PLAY_STORE_URL } from '@/const';

export default function AppInstructions() {
  const [showModal, setShowModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  const APP_URL = getAppUrl();
  const LS_KEY = 'mp_install_prompt_dismissed_until';
  const DAYS_30 = 30 * 24 * 60 * 60 * 1000;

  const shouldShowModal = () => {
    const until = Number(localStorage.getItem(LS_KEY) || 0);
    return Date.now() > until;
  };

  const closeModal = (remindLater: boolean = false) => {
    setShowModal(false);
    if (remindLater) {
      localStorage.setItem(LS_KEY, String(Date.now() + DAYS_30));
    }
  };

  useEffect(() => {
    const isIOSDevice = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    setIsIOS(isIOSDevice);
    setIsAndroid(isAndroidDevice());

    if (shouldShowModal()) {
      setShowModal(true);
    }
  }, []);

  const handleInstallApp = () => {
    window.location.href = APP_URL;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E8E3DC]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>Músico Pro</h1>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="/" className="text-[#0c2461] hover:text-[#d4af37] transition">App</Link>
            <Link href="/guia" className="text-[#0c2461] hover:text-[#d4af37] transition">Guia</Link>
            <Link href="/pro" className="text-[#0c2461] hover:text-[#d4af37] transition">Licença PRO</Link>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-4 text-sm text-[#0c2461] opacity-75">
        <Link href="/" className="hover:opacity-100 transition">Início</Link>
        <span className="mx-2">/</span>
        <span>Como usar o App</span>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* HERO */}
        <section className="mb-16 md:mb-20">
          <div className="bg-gradient-to-br from-[#0c2461] to-[#1a3a7a] rounded-lg p-8 md:p-12 text-white space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight" style={{ fontFamily: 'Lexend, sans-serif' }}>
              Como usar o App Músico Pro
            </h1>
            <p className="text-xl md:text-2xl opacity-95 font-medium">
              Você não precisa instalar. O app funciona direto no navegador — e você pode adicionar um atalho na tela inicial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
           <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-8 py-4 rounded-lg transition text-lg shadow-lg hover:shadow-xl">
  			🚀 Abrir o App
		</a>

              <button onClick={handleInstallApp} className="bg-[#6ba587] hover:bg-[#5a9475] text-white font-bold px-8 py-4 rounded-lg transition text-lg shadow-lg hover:shadow-xl">
                  📲 Instalar no dispositivo
              </button>
              
              <Link href="/pro#comprar">
                <button className="bg-transparent hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition border border-white/50 text-lg">
                  💳 Comprar Licença PRO
                </button>
              </Link>
            </div>
           
              <p className="text-sm opacity-90 pt-2">
                Crie um atalho no seu celular ou computador para abrir o app como aplicativo.
              </p>
          
          </div>
        </section>

        {/* SEÇÃO 1 - Acesso Rápido */}
        <section className="mb-16 md:mb-20 bg-[#f0f4f8] rounded-lg p-8 md:p-12 space-y-6">
          <h2 className="text-3xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
            Acesso rápido
          </h2>
          <div className="space-y-4 text-[#0c2461]">
            <div className="flex gap-3">
              <Globe className="w-6 h-6 text-[#d4af37] flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold mb-1">Abra o link do App</p>
                <p className="opacity-85">Use no celular, tablet ou computador</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Smartphone className="w-6 h-6 text-[#d4af37] flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold mb-1">Para facilitar, adicione na tela inicial</p>
                <p className="opacity-85">Parece um app instalado, mas funciona no navegador</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border-l-4 border-[#d4af37]">
            <p className="text-sm font-semibold text-[#0c2461] mb-2">💡 Recomendado:</p>
            <p className="text-sm text-[#0c2461] opacity-85">Chrome (Android), Safari (iPhone), Edge/Chrome (PC)</p>
          </div>
        </section>

        {/* SEÇÃO 2 - Android */}
        <section className="mb-16 md:mb-20">
          <div className="bg-white rounded-lg border border-[#E8E3DC] p-8 md:p-12 space-y-6">
            <h2 className="text-3xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
              📱 Android (Google Play Store)
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              O Músico Pro agora está disponível na loja oficial do Android! Baixe diretamente na Play Store para ter a melhor experiência e atualizações automáticas.
            </p>
            <div className="pt-2">
              <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold px-8 py-4 rounded-xl transition shadow-md hover:shadow-lg">
                Baixar na Google Play Store →
              </a>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
              <p className="text-[#0c2461] font-semibold">💡 Prefere não baixar?</p>
              <p className="text-[#0c2461] opacity-85 text-sm mt-1">
                Você também pode usar a versão web (PWA) no navegador. Abra o menu ⋮ do Chrome e selecione "Adicionar à tela inicial" para criar um atalho rápido.
              </p>
            </div>
          </div>
        </section>

        {/* SEÇÃO 3 - iPhone */}
        <section className="mb-16 md:mb-20">
          <div className="bg-white rounded-lg border border-[#E8E3DC] p-8 md:p-12 space-y-6">
            <h2 className="text-3xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
              🍎 iPhone (Safari)
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#d4af37] text-[#0c2461] flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <p className="font-semibold text-[#0c2461] mb-1">Abra o App no Safari</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#d4af37] text-[#0c2461] flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <p className="font-semibold text-[#0c2461] mb-1">Toque no botão Compartilhar (quadrado com seta)</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#d4af37] text-[#0c2461] flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <p className="font-semibold text-[#0c2461] mb-1">Selecione "Adicionar à Tela de Início"</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#d4af37] text-[#0c2461] flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <p className="font-semibold text-[#0c2461] mb-1">Toque em Adicionar</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-[#0c2461] font-semibold">💡 Nota:</p>
              <p className="text-[#0c2461] opacity-85 text-sm mt-1">No iPhone, isso funciona melhor pelo Safari (nao pelo navegador do Instagram).</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-[#0c2461] font-semibold">i Instalacao no iPhone:</p>
              <p className="text-[#0c2461] opacity-85 text-sm mt-1">Abra este site no Safari, toque em Compartilhar e escolha Adicionar a Tela de Inicio.</p>
            </div>
          </div>
        </section>

        {/* SEÇÃO 4 - Privacidade */}
        <section className="mb-16 md:mb-20 bg-[#f0f4f8] rounded-lg p-8 md:p-12 space-y-6">
          <h2 className="text-3xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
            🔒 Seus dados e privacidade
          </h2>
          <p className="text-[#0c2461] opacity-90 leading-relaxed">
            O Músico Pro funciona localmente no seu navegador. Seus lançamentos ficam no seu dispositivo e não precisam ir para servidores para o app funcionar.
          </p>
          <div className="space-y-3">
            <div className="flex gap-3">
              <Lock className="w-5 h-5 text-[#6BA587] flex-shrink-0 mt-0.5" />
              <span className="text-[#0c2461]">✔ Sem login obrigatório</span>
            </div>
            <div className="flex gap-3">
              <Lock className="w-5 h-5 text-[#6BA587] flex-shrink-0 mt-0.5" />
              <span className="text-[#0c2461]">✔ Funciona bem em conexões lentas</span>
            </div>
            <div className="flex gap-3">
              <Lock className="w-5 h-5 text-[#6BA587] flex-shrink-0 mt-0.5" />
              <span className="text-[#0c2461]">✔ Depois de aberto, você consegue usar mesmo com internet instável</span>
            </div>
          </div>
        </section>

        {/* SEÇÃO 5 - Limitações */}
        <section className="mb-16 md:mb-20">
          <div className="bg-white rounded-lg border-l-4 border-[#d63031] p-8 md:p-12 space-y-6">
            <h2 className="text-3xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
              ⚠️ Limitações importantes
            </h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-[#d63031] font-bold flex-shrink-0">⚠</span>
                <p className="text-[#0c2461]">Se você limpar os dados do navegador (cache/dados do site), pode perder seus registros locais</p>
              </div>
              <div className="flex gap-3">
                <span className="text-[#d63031] font-bold flex-shrink-0">⚠</span>
                <p className="text-[#0c2461]">Trocar de celular pode exigir configurar o app novamente</p>
              </div>
              <div className="flex gap-3">
                <span className="text-[#d63031] font-bold flex-shrink-0">⚠</span>
                <p className="text-[#0c2461]">A Licença PRO funciona por ativação (conforme instruções do seu acesso)</p>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
              <p className="text-sm text-[#0c2461] font-semibold">💡 Dica:</p>
              <p className="text-sm text-[#0c2461] opacity-85 mt-1">Faça backup dos seus dados regularmente (opção no app).</p>
            </div>
          </div>
        </section>

        {/* SEÇÃO 6 - FAQ */}
        <section className="mb-16 md:mb-20 space-y-8">
          <h2 className="text-3xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
            Dúvidas rápidas
          </h2>

          <div className="space-y-4 max-w-3xl">
            <details className="bg-[#f0f4f8] rounded-lg p-6 cursor-pointer group">
              <summary className="flex items-center justify-between font-bold text-[#0c2461] text-lg">
                Preciso instalar?
                <span className="group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-[#0c2461] opacity-85 mt-4">
                Não. Você pode usar pelo navegador. O "instalar" é só criar um atalho na tela inicial.
              </p>
            </details>

            <details className="bg-[#f0f4f8] rounded-lg p-6 cursor-pointer group">
              <summary className="flex items-center justify-between font-bold text-[#0c2461] text-lg">
                Funciona no computador?
                <span className="group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-[#0c2461] opacity-85 mt-4">
                Sim, normalmente. Abra em qualquer navegador moderno (Chrome, Safari, Edge, Firefox).
              </p>
            </details>

            <details className="bg-[#f0f4f8] rounded-lg p-6 cursor-pointer group">
              <summary className="flex items-center justify-between font-bold text-[#0c2461] text-lg">
                Funciona no navegador do Instagram?
                <span className="group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-[#0c2461] opacity-85 mt-4">
                Pode funcionar, mas é melhor abrir no Chrome/Safari para instalar o atalho corretamente.
              </p>
            </details>

            <details className="bg-[#f0f4f8] rounded-lg p-6 cursor-pointer group">
              <summary className="flex items-center justify-between font-bold text-[#0c2461] text-lg">
                Meus dados ficam onde?
                <span className="group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-[#0c2461] opacity-85 mt-4">
                No seu navegador/dispositivo. Nenhum servidor tem acesso aos seus dados financeiros.
              </p>
            </details>

            <details className="bg-[#f0f4f8] rounded-lg p-6 cursor-pointer group">
              <summary className="flex items-center justify-between font-bold text-[#0c2461] text-lg">
                Posso usar em múltiplos dispositivos?
                <span className="group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-[#0c2461] opacity-85 mt-4">
                Sim, mas os dados são locais de cada dispositivo. Use a função Backup para sincronizar entre eles.
              </p>
            </details>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="text-center space-y-6 mb-16">
          <div className="bg-gradient-to-br from-[#0c2461] to-[#1a3a7a] rounded-lg p-8 md:p-12 text-white space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Lexend, sans-serif' }}>
              Pronto para começar?
            </h3>
            <p className="text-lg opacity-90">
              Abra ou instale o app e faça seu primeiro lançamento agora.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
             <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-8 py-4 rounded-lg transition text-lg shadow-lg hover:shadow-xl">
  			🚀 Abrir o App
  		  </a>
            
                <button onClick={handleInstallApp} className="bg-[#6ba587] hover:bg-[#5a9475] text-white font-bold px-8 py-4 rounded-lg transition text-lg shadow-lg hover:shadow-xl">
                  📲 Instalar no dispositivo
                </button>
              
              <Link href="/">
                <button className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg transition border border-white/50 text-lg">
                  ← Voltar para a Página Inicial
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      {/* Modal de Instalacao */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md space-y-4">
            <h2 className="text-2xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
              {isAndroid ? 'Baixe o App Músico Pro' : 'Instale o atalho do Músico Pro'}
            </h2>
            <p className="text-[#0c2461] opacity-90">
              {isIOS
                ? 'No iPhone, a instalação é feita pelo menu de compartilhamento do Safari.'
                : isAndroid 
                ? 'O Músico Pro está disponível na Google Play Store para o seu celular!'
                : 'Instale para abrir como aplicativo e acessar mais rápido.'}
            </p>

            {isIOS && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                <p className="font-semibold text-[#0c2461]">No iPhone (Safari):</p>
                <ol className="list-decimal list-inside space-y-2 text-[#0c2461] text-sm">
                  <li>Toque em <b>Compartilhar</b></li>
                  <li>Selecione <b>Adicionar à Tela de Início</b></li>
                  <li>Toque em <b>Adicionar</b></li>
                </ol>
                <p className="text-xs opacity-75 pt-2">
                  Dica: se você abriu pelo Instagram/WhatsApp, toque em "Abrir no Safari".
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleInstallApp}
                className="flex-1 bg-[#6ba587] hover:bg-[#5a9475] text-white font-bold py-3 rounded-lg transition"
              >
                {isIOS ? '✓ Entendi' : isAndroid ? '📲 Baixar na Google Play' : '📲 Instalar agora'}
              </button>
              <button
                onClick={() => closeModal(true)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-[#0c2461] font-bold py-3 rounded-lg transition"
              >
                {isAndroid ? 'Usar versão Web' : 'Continuar sem instalar'}
              </button>
            </div>

            <p className="text-xs text-[#0c2461] opacity-75 text-center">
              Você pode {isAndroid ? 'baixar' : 'instalar'} depois a qualquer momento nesta página.
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
