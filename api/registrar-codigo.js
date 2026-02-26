// api/registrar-codigo.js
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { email, codigo } = req.body;

  if (!email || !codigo) return res.status(400).json({ erro: "Dados incompletos" });

  try {
    // Salva: "Este código MP-XXXX pertence ao email tal"
    await redis.set(`ref_code:${codigo}`, email.toLowerCase().trim());
    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao registrar" });
  }
}