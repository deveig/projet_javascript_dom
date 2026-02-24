import express from 'express';
const router = express.Router();

import { getAllProducts, getOneProduct, orderProducts } from '../controllers/product.js';

router.get('/', getAllProducts);
router.get('/:id', getOneProduct);
router.post('/order', orderProducts);

export default router;