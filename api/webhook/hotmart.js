// api/webhook/hotmart.js

const { Redis } = require("@upstash/redis");

// ✅ Upstash via REST (recomendado para serverless)
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// ===== Helpers =====
function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function json(res, status, body) {
  return res.status(status).json(body);
}

/**
 * Mapeia eventos Hotmart → status de licença
 * Ajuste os nomes conforme seus eventos reais (vou cobrir os principais).
 */
function mapHotmartEventToActive(event) {
  const e = String(event || "").toUpperCase();

  // ✅ eventos que ativam
  const activates = new Set([
    "PURCHASE_APPROVED",
    "PURCHASE_COMPLETE",
    "PURCHASE_COMPLETED",
    "SUBSCRIPTION_PURCHASED",
    "SUBSCRIPTION_REACTIVATED",
    "SUBSCRIPTION_ACTIVE",
  ]);

  // ❌ eventos que desativam
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

  // Evento desconhecido → não muda status (mas registra)
  return null;
}

async function upsertLicenseByEmail({ namespace, email, active, payload }) {
  const emailKey = `${namespace}:email:${email}`;

  const nowIso = new Date().toISOString();

  // Carrega estado atual (pra não “voltar” status sem querer)
  const currentRaw = await redis.get(emailKey);
  const current = currentRaw ? safeJsonParse(currentRaw) : null;

  const next = {
    email,
    active: typeof active === "boolean" ? active : (current?.active ?? false),
    plan: current?.plan ?? "premium",
    source: "hotmart",
    lastEvent: payload?.event ?? current?.lastEvent ?? null,
    transaction: payload?.data?.purchase?.transaction ?? current?.transaction ?? null,
    productUcode: payload?.data?.product?.ucode ?? current?.productUcode ?? null,
    updatedAt: nowIso,
    createdAt: current?.createdAt ?? nowIso,
  };

  // Salva documento principal (email como chave)
  await redis.set(emailKey, JSON.stringify(next));

  // Índices recomendados (não atrapalham, só ajudam)
  // 1) Index por transaction → email
  const tx = next.transaction ? String(next.transaction) : null;
  if (tx) {
    await redis.set(`${namespace}:tx:${tx}`, email);
  }

  // 2) Index por product ucode → (opcional) email set
  // Se quiser listar compradores de um produto depois:
  // await redis.sadd(`${namespace}:product:${next.productUcode}`, email);

  return next;
}

function safeJsonParse(s) {
  try { return JSON.parse(s); } catch { return null; }
}

// ===== Handler =====
module.exports = async function handler(req, res) {
  // CORS básico (Hotmart não precisa, mas não atrapalha)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return json(res, 405, { ok: false, error: "method_not_allowed" });

  try {
    // 1) Segurança: valida HOTTOK
    const expected = process.env.HOTMART_HOTTOK;
    const received = req.body?.hottok;

    if (!expected) {
      // Melhor falhar explícito pra você configurar
      return json(res, 500, { ok: false, error: "missing_env_hotmart_hottok" });
    }
    if (!received || received !== expected) {
      return json(res, 401, { ok: false, error: "invalid_hottok" });
    }

    // 2) Extrai email do comprador (no seu payload é buyer.email)
    const email = normalizeEmail(req.body?.data?.buyer?.email);
    if (!email) return json(res, 400, { ok: false, error: "missing_buyer_email" });

    // 3) Decide ativo/desativo
    const event = req.body?.event;
    const activeMapped = mapHotmartEventToActive(event);

    // 4) Namespace (pra separar licenças do app vs guia, se quiser)
    // Aqui vou gravar em "license". Se quiser também o "guide", dá pra duplicar.
    const namespaces = ["license", "guide"];

// grava nos dois
const results = [];
for (const ns of namespaces) {
  const saved = await upsertLicenseByEmail({
    namespace: ns,
    email,
    active: activeMapped,   // se null, mantém o atual
    payload: req.body,
  });
  results.push({ namespace: ns, active: saved.active });
}

return json(res, 200, {
  ok: true,
  email,
  event,
  results, // [{namespace:"license", active:true}, {namespace:"guide", active:true}]
});

    // Log útil no Vercel
    console.error("hotmart webhook error:", err);
    return json(res, 500, { ok: false, error: "internal_error" });
  }
};
