import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

function generateKey() {
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false });
  }

  // 🔐 Validação do Hotmart HOTTOK
  const hottok = req.headers["x-hotmart-hottok"];
  if (!hottok || hottok !== process.env.HOTMART_HOTTOK) {
    return res.status(401).json({ ok: false, error: "unauthorized" });
  }

  const payload: any = req.body || {};
  const event = payload?.event || payload?.name || payload?.type;

  const email =
    payload?.data?.buyer?.email ||
    payload?.buyer?.email ||
    payload?.data?.purchase?.buyer?.email;

  if (!email) {
    return res.status(200).json({ ok: true, ignored: "no_email" });
  }

  const emailKey = `email:${email.toLowerCase()}`;

  const isApproved =
    String(event).includes("APPROVED") ||
    String(event).includes("COMPLETE");

  const isCanceled =
    String(event).includes("CANCELED") ||
    String(event).includes("REFUND") ||
    String(event).includes("CHARGEBACK");

  // ✅ Compra aprovada → cria / renova licença
  if (isApproved) {
    let licenseKey = await redis.get<string>(emailKey);
    if (!licenseKey) {
      licenseKey = generateKey();
      await redis.set(emailKey, licenseKey);
    }

    const now = Date.now();
    await redis.set(`license:${licenseKey}`, {
      status: "active",
      email,
      expiresAt: now + 365 * 24 * 60 * 60 * 1000,
      maxActivations: 2,
      devices: [],
      updatedAt: now,
      createdAt: now,
    });

    return res.status(200).json({ ok: true });
  }

  // ❌ Cancelamento / reembolso → revoga licença
  if (isCanceled) {
    const licenseKey = await redis.get<string>(emailKey);
    if (licenseKey) {
      const lic = await redis.get<any>(`license:${licenseKey}`);
      if (lic) {
        lic.status = "revoked";
        lic.updatedAt = Date.now();
        await redis.set(`license:${licenseKey}`, lic);
      }
    }
  }

  return res.status(200).json({ ok: true });
}
