import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

// Helpers
function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function now() {
  return Date.now();
}

// Gere um código curto e legível pro Guia Premium (uma vez por e-mail)
function generateGuideCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sem I/O/1/0 pra evitar confusão
  let s = "MP-GUIA-";
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

/**
 * Regra simples para Assinatura:
 * - Active quando evento de compra aprovada/completa OU subscription.status ACTIVE
 * - Inactive quando cancelado/refund/chargeback/suspenso
 */
function computeStatus(event, payload) {
  const subStatus = payload?.data?.subscription?.status; // ACTIVE, CANCELED, etc. (quando vier)
  const e = String(event || "").toUpperCase();

  const NEGATIVE = new Set([
    "PURCHASE_CANCELED",
    "PURCHASE_REFUNDED",
    "CHARGEBACK",
    "SUBSCRIPTION_CANCELED",
    "SUBSCRIPTION_SUSPENDED",
    "SUBSCRIPTION_EXPIRED",
  ]);

  const POSITIVE = new Set([
    "PURCHASE_APPROVED",
    "PURCHASE_COMPLETE",
    "SUBSCRIPTION_ACTIVE",
  ]);

  if (NEGATIVE.has(e)) return "inactive";
  if (POSITIVE.has(e)) return "active";

  // fallback: se veio subscription.status, ele manda
  if (String(subStatus || "").toUpperCase() === "ACTIVE") return "active";
  if (subStatus) return "inactive"; // qualquer status diferente de ACTIVE -> bloqueia

  return "ignored";
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ ok: false, error: "method_not_allowed" });
    }

    const payload = req.body;

    // 1) Validação do HOTTOK (segurança básica)
    const expectedHottok = process.env.HOTMART_HOTTOK;
    const receivedHottok = payload?.hottok;

    if (!expectedHottok) {
      // Se faltar env, melhor falhar para você perceber (e Hotmart retentar)
      return res.status(500).json({ ok: false, error: "missing_env_hottok" });
    }
    if (!receivedHottok || receivedHottok !== expectedHottok) {
      return res.status(401).json({ ok: false, error: "invalid_hottok" });
    }

    // 2) Extrair dados principais
    const event = payload?.event;
    const email = normalizeEmail(payload?.data?.buyer?.email);

    if (!email) {
      // Sem email não dá pra vincular licença
      return res.status(200).json({ ok: true, ignored: true, reason: "missing_email" });
    }

    const status = computeStatus(event, payload);
    if (status === "ignored") {
      // Não é erro. Só não interessa para licença
      return res.status(200).json({ ok: true, ignored: true, event });
    }

    const key = `license:${email}`;

    // 3) Buscar licença atual (pra reaproveitar guideCode)
    const existing = await redis.get(key);

    const transaction = payload?.data?.purchase?.transaction || null;
    const planName = payload?.data?.subscription?.plan?.name || "pro_anual";
    const planId = payload?.data?.subscription?.plan?.id || null;
    const subscriberCode = payload?.data?.subscription?.subscriber?.code || null;

    const next = {
      email,
      source: "hotmart",
      status, // active | inactive
      plan: planName,
      planId,
      subscriberCode,
      hotmartTransaction: transaction,
      updatedAt: now(),
      createdAt: existing?.createdAt || now(),
      // Assinatura: melhor NÃO inventar expiresAt. O status é a verdade.
      // Se quiser no futuro, você cria "gracePeriodUntil" etc.
      expiresAt: existing?.expiresAt || null,
      guideCode: existing?.guideCode || generateGuideCode(),
      lastEvent: String(event || ""),
      lastPayloadId: payload?.id || null,
    };

    // 4) Salvar
    await redis.set(key, next);

    // 5) Responder rápido (Hotmart gosta de rapidez)
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("hotmart webhook error:", err);
    // Para Hotmart retentar, devolva 500.
    return res.status(500).json({ ok: false, error: "internal_error" });
  }
}
