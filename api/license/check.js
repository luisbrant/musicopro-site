import { Redis } from "@upstash/redis";
const redis = Redis.fromEnv();

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ ok: false, error: "method_not_allowed" });
    }

    const email = normalizeEmail(req.body?.email);
    if (!email) return res.status(400).json({ ok: false, error: "missing_email" });

    const key = `license:${email}`;
    const data = await redis.get(key);

    if (!data) {
      return res.status(200).json({
        ok: true,
        active: false,
        reason: "not_found",
      });
    }

    const active = data.status === "active";

    return res.status(200).json({
      ok: true,
      active,
      plan: data.plan || null,
      subscriberCode: data.subscriberCode || null,
      guideCode: data.guideCode || null,
      updatedAt: data.updatedAt || null,
    });
  } catch (err) {
    console.error("license check error:", err);
    return res.status(500).json({ ok: false, error: "internal_error" });
  }
}
