import { Router } from 'express';
import { Request, Response } from 'express';
import { Database } from 'sqlite';

export const createProductsRouter = (db: Database) => {
  const router = Router();

  router.get('/', async (req: Request, res: Response) => {
    try {
      const products = await db.all('SELECT * FROM products');
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
};