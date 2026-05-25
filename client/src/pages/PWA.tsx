import { useEffect } from 'react';
import { getAppUrl } from '@/const';

export default function PWA() {
  useEffect(() => {
    // Redireciona para o app (Google Play no Android, PWA nos demais)
    window.location.href = getAppUrl();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '1rem' }}>
      <p>Carregando app Músico Pro...</p>
      <div style={{ fontSize: '2rem' }}>🎵</div>
    </div>
  );
}
