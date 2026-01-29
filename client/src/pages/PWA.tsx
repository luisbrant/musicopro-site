import { useEffect } from 'react';

export default function PWA() {
  useEffect(() => {
    // Redireciona para 'https://app.musicopro.app.br/' (o app PWA)
    window.location.href = 'https://app.musicopro.app.br/';
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '1rem' }}>
      <p>Carregando app Músico Pro...</p>
      <div style={{ fontSize: '2rem' }}>🎵</div>
    </div>
  );
}
