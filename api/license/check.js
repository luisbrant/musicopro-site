export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  const email =
    req.method === "GET"
      ? req.query.email
      : req.body?.email;

  if (!email) {
    return res.status(400).json({ ok: false, error: "missing_email" });
  }

  // TODO: validar no Upstash depois
  return res.status(200).json({ ok: true, email, active: false });
}
