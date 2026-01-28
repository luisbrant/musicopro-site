// server/index.ts
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();

  // Ajuste do staticPath:
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "..", "dist")       // produção → dist
      : path.resolve(__dirname, "..", "client", "public"); // desenvolvimento → client/public

  console.log("Iniciando servidor...");
  console.log("Caminho estático:", staticPath);

  app.use(express.static(staticPath));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/`);
  });
}

startServer().catch(console.error);

