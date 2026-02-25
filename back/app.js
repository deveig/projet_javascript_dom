import express from 'express';
import { json, urlencoded } from 'express';
import path from 'path';
import router from './routes/product.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images-kanap', express.static(path.join(__dirname, 'images')));
// app.use(express.static('images'));

app.use(urlencoded({extended: true}));
app.use(json());

app.use('/api/products', router);

export default app;
