import { useEffect } from 'react';

export default function PWA() {
  useEffect(() => {
    // Redireciona para /pwa/index.html
    // Se acessado via subdomínio app.musicopro.app.br, redireciona para o PWA
    if (window.location.hostname === 'app.musicopro.app.br' || window.location.hostname.includes('app-')) {
      window.location.href = '/pwa/index.html';
    } else {
      // Fallback para rota padrão
      window.location.href = '/pwa/index.html';
    }
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '1rem' }}>
      <p>Carregando app Músico Pro...</p>
      <div style={{ fontSize: '2rem' }}>🎵</div>
    </div>
  );
}
