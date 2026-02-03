// api/guide/check.js
import { Redis } from "@upstash/redis";

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function safeJsonParse(s) {
  try { return JSON.parse(s); } catch { return null; }
}

function json(res, status, body) {
  return res.status(status).json(body);
}

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method !== "GET" && req.method !== "POST") {
    return json(res, 405, { ok: false, error: "method_not_allowed" });
  }

  const redis = getRedis();
  if (!redis) return json(res, 500, { ok: false, error: "missing_env_upstash" });

  const body = typeof req.body === "string" ? safeJsonParse(req.body) : req.body;

  const emailRaw = req.method === "GET" ? req.query?.email : body?.email;
  const email = normalizeEmail(emailRaw);

  if (!email) return json(res, 400, { ok: false, error: "missing_email" });

  try {
    const key = `guide:email:${email}`;
    const raw = await redis.get(key);

    const doc =
      typeof raw === "string" ? safeJsonParse(raw) :
      (raw && typeof raw === "object" ? raw : null);

    const active = Boolean(doc?.active);

    return json(res, 200, {
      ok: true,
      email,
      active,
      lastEvent: doc?.lastEvent ?? null,
      updatedAt: doc?.updatedAt ?? null,
    });
  } catch (err) {
    console.error("guide check error:", err);
    return json(res, 500, { ok: false, error: "internal_error" });
  }
}
