import { useEffect } from 'react';

export default function PWA() {
  useEffect(() => {
    // Redireciona para app.html (landing page)
    // Se acessado via subdomínio app.musicopro.app.br, redireciona para a landing page
    if (window.location.hostname === 'app.musicopro.app.br' || window.location.hostname.includes('app-')) {
      window.location.href = 'https://app.musicopro.app.br/app.html';
    } else {
      // Fallback para landing page
      window.location.href = 'https://app.musicopro.app.br/app.html';
    }
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '1rem' }}>
      <p>Redirecionando para app Músico Pro...</p>
      <div style={{ fontSize: '2rem' }}>🎵</div>
    </div>
  );
}
