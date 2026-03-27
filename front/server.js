import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use("/js/api/products", express.raw({type: "*/*", limit: "10mb"}));
app.use("/js/api/products", async (req, res) => {
    try {
        const response = await fetch(`http://back:3000${req.originalUrl.split("/js")[1]}`, {
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
app.use("/js/images-kanap", async (req, res) => {
    try {
        const response = await fetch(`http://back:3000${req.originalUrl.split("/js")[1]}`, {
            headers: req.headers
        });
        const buffer = await response.arrayBuffer();
        res.status(response.status).send(Buffer.from(buffer));
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
});
app.use('/js', express.static(path.join(__dirname, "html")));
app.use('/js/images', express.static(path.join(__dirname, "images")));
app.use('/js/js', express.static(path.join(__dirname, "js")));
app.use('/js/css', express.static(path.join(__dirname, "css")));
app.listen(3005, () => {
  console.log("Serveur démarré sur le port 3005");
});
