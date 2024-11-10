import { Router, Request, Response } from 'express';
import { getProducts } from '../services/ecwidService';

const router = Router();

// GET /api/products
router.get('/', async (req: Request, res: Response) => {
    try {
        const products = await getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
});

export default router;