import { Redis } from "@upstash/redis";

/**
 * Inicializa o Redis usando as env vars:
 * UPSTASH_REDIS_REST_URL
 * UPSTASH_REDIS_REST_TOKEN
 */
const redis = Redis.fromEnv();

/**
 * Gera um código de licença no formato:
 * MP-XXXX-XXXX-XXXX-XXXX
 */
function generateLicenseKey() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let key = "MP-";
  for (let i = 0; i < 4; i++) {
    let part = "";
    for (let j = 0; j < 4; j++) {
      part += chars[Math.floor(Math.random() * chars.length)];
    }
    key += part + (i < 3 ? "-" : "");
  }
  return key;
}

export default async function handler(req, res) {
  // A Hotmart sempre envia POST
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false });
  }

  // 🔐 Validação de segurança do webhook Hotmart
  // Header: X-HOTMART-HOTTOK
  const hottok = req.headers["x-hotmart-hottok"];
  if (!hottok || hottok !== process.env.HOTMART_HOTTOK) {
    return res.status(401).json({ ok: false, error: "unauthorized" });
  }

  const payload = req.body || {};
  const event = payload.event || payload.name || payload.type || "";

  // Email do comprador (varia conforme o evento)
  const buyerEmail =
    payload?.data?.buyer?.email ||
    payload?.buyer?.email ||
    payload?.data?.purchase?.buyer?.email;

  // Sem email, não dá pra licenciar → ignora
  if (!buyerEmail) {
    return res.status(200).json({ ok: true, ignored: "no_email" });
  }

  const email = String(buyerEmail).toLowerCase().trim();
  const emailKey = `email:${email}`;

  // Eventos de aprovação
  const isApproved =
    String(event).includes("APPROVED") ||
    String(event).includes("COMPLETE");

  // Eventos de cancelamento / reembolso
  const isCanceled =
    String(event).includes("CANCELED") ||
    String(event).includes("REFUND") ||
    String(event).includes("CHARGEBACK");

  /**
   * ✅ COMPRA APROVADA
   * - Cria (ou reutiliza) uma licença para o email
   * - Validade: 1 ano
   */
  if (isApproved) {
    // Reutiliza a licença se o email já tiver comprado antes
    let licenseKey = await redis.get(emailKey);

    if (!licenseKey) {
      licenseKey = generateLicenseKey();
      await redis.set(emailKey, licenseKey);
    }

    const now = Date.now();

    await redis.set(`license:${licenseKey}`, {
      status: "active",
      email,
      expiresAt: now + 365 * 24 * 60 * 60 * 1000, // 1 ano
      maxActivations: 2,
      devices: [],
      createdAt: now,
      updatedAt: now,
    });

    return res.status(200).json({ ok: true });
  }

  /**
   * ❌ CANCELAMENTO / REEMBOLSO / CHARGEBACK
   * - Revoga a licença
   */
  if (isCanceled) {
    const licenseKey = await redis.get(emailKey);

    if (licenseKey) {
      const license = await redis.get(`license:${licenseKey}`);
      if (license) {
        license.status = "revoked";
        license.updatedAt = Date.now();
        await redis.set(`license:${licenseKey}`, license);
      }
    }

    return res.status(200).json({ ok: true });
  }

  // Eventos que não afetam licença
  return res.status(200).json({ ok: true, ignored: true, event });
}
