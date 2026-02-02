export const config = {
  runtime: "nodejs",
};

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

async function getRedis() {
  const { Redis } = await import("@upstash/redis");
  return Redis.fromEnv();
}

// 🔑 parse seguro do body (Hotmart-friendly)
function parseBody(body) {
  if (!body) return null;

  if (typeof body === "object") return body;

  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return Object.fromEntries(new URLSearchParams(body));
    }
  }

  return null;
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ ok: false, error: "method_not_allowed" });
    }

    // 🔐 HOTTOK
    const hottok = req.headers["x-hotmart-hottok"];
    if (!hottok || hottok !== process.env.HOTMART_HOTTOK) {
      console.error("HOTTOK inválido");
      return res.status(401).json({ ok: false, error: "unauthorized" });
    }

    const payload = parseBody(req.body);
    if (!payload) {
      console.error("Payload não parseado", req.body);
      return res.status(400).json({ ok: false, error: "invalid_payload" });
    }

    const event =
      payload.event ||
      payload.type ||
      payload.name ||
      "";

    const buyerEmail =
      payload?.data?.buyer?.email ||
      payload?.buyer?.email ||
      payload?.email;

    if (!buyerEmail) {
      console.warn("Evento sem email", payload);
      return res.status(200).json({ ok: true, ignored: "no_email" });
    }

    const email = buyerEmail.toLowerCase().trim();
    const emailKey = `email:${email}`;

    const isApproved =
      event.includes("APPROVED") ||
      event.includes("COMPLETE");

    const isCanceled =
      event.includes("CANCELED") ||
      event.includes("REFUND") ||
      event.includes("CHARGEBACK");

    if (!isApproved && !isCanceled) {
      return res.status(200).json({ ok: true, ignored: true });
    }

    const redis = await getRedis();

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
        createdAt: now,
        updatedAt: now,
      });

      return res.status(200).json({ ok: true });
    }

    if (isCanceled) {
      const licenseKey = await redis.get(emailKey);
      if (licenseKey) {
        const lic = await redis.get(`license:${licenseKey}`);
        if (lic) {
          lic.status = "revoked";
          lic.updatedAt = Date.now();
          await redis.set(`license:${licenseKey}`, lic);
        }
      }
    }

    return res.status(200).json({ ok: true });

  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(500).json({ ok: false, error: "internal_error" });
  }
}
