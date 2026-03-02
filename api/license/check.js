// api/license/check.js
import { Redis } from "@upstash/redis";

// ===== helpers =====
function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function safeJsonParse(s) {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
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

// ===== handler =====
export default async function handler(req, res) {
  // ✅ CORS (se seu app chamar do navegador)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method !== "GET" && req.method !== "POST") {
    return json(res, 405, { ok: false, error: "method_not_allowed" });
  }

  // ✅ valida env
  const redis = getRedis();
  if (!redis) return json(res, 500, { ok: false, error: "missing_env_upstash" });

  // ✅ garante body objeto quando vier string
  const body = typeof req.body === "string" ? safeJsonParse(req.body) : req.body;

  const emailRaw = req.method === "GET" ? req.query?.email : body?.email;
  const transactionRaw = req.method === "GET" ? req.query?.transaction : body?.transaction;

  const email = normalizeEmail(emailRaw);
  const transaction = String(transactionRaw || "").trim().toUpperCase();

  if (!email) return json(res, 400, { ok: false, error: "missing_email" });
  if (!transaction) return json(res, 400, { ok: false, error: "missing_transaction" });

  try {
    const key = `license:email:${email}`;
    const raw = await redis.get(key);

    // Upstash REST pode devolver string/objeto; tratamos os dois
    const doc =
      typeof raw === "string" ? safeJsonParse(raw) :
        (raw && typeof raw === "object" ? raw : null);

    const active = Boolean(doc?.active);

    // Validação de segurança: transação bate?
    const savedTx = String(doc?.transaction || "").trim().toUpperCase();
    const isValidTx = (transaction === savedTx) || (transaction === doc?.productUcode); // Aceita também o ucode do produto caso alguém use? melhor focar na transação.

    if (active && (!savedTx || transaction !== savedTx)) {
      return json(res, 401, { ok: false, error: "invalid_transaction", active: false });
    }

    return json(res, 200, {
      ok: true,
      email,
      active: active && transaction === savedTx,
      lastEvent: doc?.lastEvent ?? null,
      updatedAt: doc?.updatedAt ?? null,
    });
  } catch (err) {
    console.error("license check error:", err);
    return json(res, 500, { ok: false, error: "internal_error" });
  }
}
