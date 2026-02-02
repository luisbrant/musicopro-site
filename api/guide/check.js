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
    const guideCode = String(req.body?.guideCode || "").trim().toUpperCase();

    if (!email && !guideCode) {
      return res.status(400).json({ ok: false, error: "missing_email_or_code" });
    }

    // Caminho A (forte): por e-mail
    if (email) {
      const key = `license:${email}`;
      const data = await redis.get(key);
      const unlocked = !!data && data.status === "active";
      return res.status(200).json({
        ok: true,
        unlocked,
        guideCode: data?.guideCode || null,
      });
    }

    // Caminho B (fallback): por guideCode (varre não dá; então não recomendo sem índice)
    // Se você quiser 100% por código, me fale que eu te passo o índice por guideCode.
    return res.status(501).json({ ok: false, error: "code_only_requires_index" });
  } catch (err) {
    console.error("guide check error:", err);
    return res.status(500).json({ ok: false, error: "internal_error" });
  }
}
