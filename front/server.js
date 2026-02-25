import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use("/api/products", express.raw({type: "*/*", limit: "10mb"}));
app.use("/api/products", async (req, res) => {
    try {
        const response = await fetch(`http://back:3000${req.originalUrl}`, {
            method: req.method,
            headers: req.headers,
            body: req.method === 'POST' ? req.body : undefined,
        });
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
});
app.use("/images-kanap", async (req, res) => {
    try {
        const response = await fetch(`http://back:3000${req.originalUrl}`, {
            headers: req.headers
        });
        const buffer = await response.arrayBuffer();
        res.status(response.status).send(Buffer.from(buffer));
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
});
app.use(express.static(__dirname));
app.listen(3005, () => {
  console.log("Serveur démarré sur le port 3005");
});
