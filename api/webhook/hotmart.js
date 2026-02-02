export const config = { runtime: "nodejs" };

function generateLicenseKey() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let key = "MP-";
  for (let i = 0; i < 4; i++) {
    let part = "";
    for (let j = 0; j < 4; j++) part += chars[Math.floor(Math.random() * chars.length)];
    key += part + (i < 3 ? "-" : "");
  }
  return key;
}

async function getRedis() {
  const { Redis } = await import("@upstash/redis");
  return Redis.fromEnv();
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ ok: false, error: "method_not_allowed" });
    }

    // ✅ Hotmart pode mandar hottok no header OU no body
    const payload = req.body || {};
    const hottok =
      req.headers["x-hotmart-hottok"] ||
      req.headers["x-hotmart-hottok-signature"] ||
      payload?.hottok;

    if (!hottok || hottok !== process.env.HOTMART_HOTTOK) {
      console.error("HOTTOK inválido", { hottokReceived: hottok ? "present" : "missing" });
      return res.status(401).json({ ok: false, error: "unauthorized" });
    }

    const event = String(payload.event || payload.name || payload.type || "");
    const buyerEmail = payload?.data?.buyer?.email;

    if (!buyerEmail) {
      console.warn("Sem buyer email no payload");
      return res.status(200).json({ ok: true, ignored: "no_email" });
    }

    const email = buyerEmail.toLowerCase().trim();
    const emailKey = `email:${email}`;

    const isApproved = event.includes("APPROVED") || event.includes("COMPLETE");
    const isCanceled = event.includes("CANCELED") || event.includes("REFUND") || event.includes("CHARGEBACK");

    if (!isApproved && !isCanceled) {
      return res.status(200).json({ ok: true, ignored: true, event });
    }

    // ✅ Redis com erro claro
    let redis;
    try {
      redis = await getRedis();
    } catch (e) {
      console.error("Redis import/fromEnv failed:", e);
      return res.status(500).json({ ok: false, error: "redis_init_failed" });
    }

    try {
      if (isApproved) {
        let licenseKey = await redis.get(emailKey);

        if (!licenseKey) {
          licenseKey = generateLicenseKey();
          await redis.set(emailKey, licenseKey);
        }

        const now = Date.now();
        await redis.set(`license:${licenseKey}`, {
          status: "active",
          email,
          expiresAt: now + 365 * 24 * 60 * 60 * 1000,
          maxActivations: 2,
          devices: [],
          createdAt: now,
          updatedAt: now,
        });

        return res.status(200).json({ ok: true });
      }

      // isCanceled
      const licenseKey = await redis.get(emailKey);
      if (licenseKey) {
        const lic = await redis.get(`license:${licenseKey}`);
        if (lic) {
          lic.status = "revoked";
          lic.updatedAt = Date.now();
          await redis.set(`license:${licenseKey}`, lic);
        }
      }

      return res.status(200).json({ ok: true });
    } catch (e) {
      console.error("Redis command failed:", e);
      return res.status(500).json({ ok: false, error: "redis_command_failed" });
    }
  } catch (err) {
    console.error("Webhook general error:", err);
    return res.status(500).json({ ok: false, error: "internal_error" });
  }
}
