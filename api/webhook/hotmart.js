// api/webhook/hotmart.js
import { Redis } from "@upstash/redis";

// ===== Helpers =====
function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function json(res, status, body) {
  return res.status(status).json(body);
}

function safeJsonParse(s) {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

/**
 * Mapeia eventos Hotmart → status de licença
 */
function mapHotmartEventToActive(event) {
  const e = String(event || "").toUpperCase();

  const activates = new Set([
    "PURCHASE_APPROVED",
    "PURCHASE_COMPLETE",
    "PURCHASE_COMPLETED",
    "SUBSCRIPTION_PURCHASED",
    "SUBSCRIPTION_REACTIVATED",
    "SUBSCRIPTION_ACTIVE",
  ]);

  const deactivates = new Set([
    "PURCHASE_CANCELED",
    "PURCHASE_CANCELLED",
    "PURCHASE_REFUNDED",
    "REFUND",
    "CHARGEBACK",
    "SUBSCRIPTION_CANCELED",
    "SUBSCRIPTION_CANCELLED",
    "SUBSCRIPTION_EXPIRED",
    "SUBSCRIPTION_SUSPENDED",
    "SUBSCRIPTION_OVERDUE",
  ]);

  if (activates.has(e)) return true;
  if (deactivates.has(e)) return false;

  return null; // desconhecido → não altera status
}

async function upsertLicenseByEmail({ redis, namespace, email, active, payload }) {
  const emailKey = `${namespace}:email:${email}`;
  const nowIso = new Date().toISOString();

  const currentRaw = await redis.get(emailKey);
  const current = currentRaw ? safeJsonParse(currentRaw) : null;

  const next = {
    email,
    active: typeof active === "boolean" ? active : current?.active ?? false,
    plan: current?.plan ?? "premium",
    source: "hotmart",
    lastEvent: payload?.event ?? current?.lastEvent ?? null,
    transaction: payload?.data?.purchase?.transaction ?? current?.transaction ?? null,
    productUcode: payload?.data?.product?.ucode ?? current?.productUcode ?? null,
    updatedAt: nowIso,
    createdAt: current?.createdAt ?? nowIso,
  };

  await redis.set(emailKey, JSON.stringify(next));

  const tx = next.transaction ? String(next.transaction) : null;
  if (tx) await redis.set(`${namespace}:tx:${tx}`, email);

  return next;
}

function getReceivedHottok(req, body) {
  // Pode vir no body…
  const hottokBody = body?.hottok;

  // …ou em headers (variações comuns)
  const hottokHeader =
    req.headers["x-hotmart-hottok"] ||
    req.headers["hotmart-hottok"] ||
    req.headers["hottok"] ||
    req.headers["x-hottok"];

  return { received: hottokBody || hottokHeader, hottokBody, hottokHeader };
}

// ===== Handler =====
export default async function handler(req, res) {
  // CORS básico
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return json(res, 405, { ok: false, error: "method_not_allowed" });

  try {
    // 1) Valida envs
    const expected = process.env.HOTMART_HOTTOK;
    if (!expected) return json(res, 500, { ok: false, error: "missing_env_hotmart_hottok" });

    const redis = getRedis();
    if (!redis) return json(res, 500, { ok: false, error: "missing_env_upstash" });

    // 2) Garante body objeto
    const body = typeof req.body === "string" ? safeJsonParse(req.body) : req.body;
    if (!body || typeof body !== "object") {
      return json(res, 400, { ok: false, error: "invalid_json_body" });
    }

    // 3) Segurança: valida HOTTOK (body OU header)
    const { received, hottokBody, hottokHeader } = getReceivedHottok(req, body);

    // Log seguro (não vaza tokens)
    console.log("hotmart_hottok_debug", {
      hasExpected: Boolean(expected),
      expectedLen: expected ? String(expected).length : 0,
      hasBody: Boolean(hottokBody),
      bodyLen: hottokBody ? String(hottokBody).length : 0,
      hasHeader: Boolean(hottokHeader),
      headerLen: hottokHeader ? String(hottokHeader).length : 0,
    });

    if (!received || received !== expected) {
      return json(res, 401, { ok: false, error: "invalid_hottok" });
    }

    // 4) Email
    const email = normalizeEmail(body?.data?.buyer?.email);
    if (!email) return json(res, 400, { ok: false, error: "missing_buyer_email" });

    // 5) Evento → status
    const event = body?.event;
    const activeMapped = mapHotmartEventToActive(event);

    // 6) Grava nos namespaces
    const namespaces = ["license", "guide"];
    const results = [];

    for (const ns of namespaces) {
      const saved = await upsertLicenseByEmail({
        redis,
        namespace: ns,
        email,
        active: activeMapped,
        payload: body,
      });
      results.push({ namespace: ns, active: saved.active });
    }

    return json(res, 200, { ok: true, email, event, results });
  } catch (err) {
    console.error("hotmart webhook error:", err);
    return json(res, 500, { ok: false, error: "internal_error" });
  }
}
