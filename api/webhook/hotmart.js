const { Redis } = require("@upstash/redis");

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

// Força runtime Node (evita edge)
module.exports.config = {
  runtime: "nodejs",
};

module.exports = async function handler(req, res) {
  // Inicializa Redis dentro do handler (evita crash no load)
  let redis;
  try {
    redis = Redis.fromEnv();
  } catch (err) {
    console.error("Redis init failed:", err);
    return res.status(500).json({ ok: false, error: "redis_init_failed" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false });
  }

  const hottok = req.headers["x-hotmart-hottok"];
  if (!hottok || hottok !== process.env.HOTMART_HOTTOK) {
    return res.status(401).json({ ok: false, error: "unauthorized" });
  }

  const payload = req.body || {};
  const event = payload.event || payload.name || payload.type || "";

  const buyerEmail =
    payload?.data?.buyer?.email ||
    payload?.buyer?.email ||
    payload?.data?.purchase?.buyer?.email;

  if (!buyerEmail) {
    return res.status(200).json({ ok: true, ignored: "no_email" });
  }

  const email = String(buyerEmail).toLowerCase().trim();
  const emailKey = `email:${email}`;

  const isApproved = event.includes("APPROVED") || event.includes("COMPLETE");
  const isCanceled =
    event.includes("CANCELED") || event.includes("REFUND") || event.includes("CHARGEBACK");

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
    return res.status(200).json({ ok: true });
  }

  return res.status(200).json({ ok: true, ignored: true, event });
};
