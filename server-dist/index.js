// server/index.ts
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
async function startServer() {
  const app = express();
  const staticPath = process.env.NODE_ENV === "production" ? path.resolve(__dirname, "public") : path.resolve(__dirname, "..", "client");
  console.log("Iniciando servidor...");
  console.log("Caminho est\xE1tico:", staticPath);
  app.use(express.static(staticPath, { index: false }));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
  const port = process.env.PORT || 3e3;
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/`);
  });
}
startServer().catch(console.error);
