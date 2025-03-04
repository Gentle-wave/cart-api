import { Router } from 'express';
import { Request, Response } from 'express';
import { Database } from 'sqlite';

export const createProductsRouter = (db: Database) => {
  const router = Router();

  router.get('/', async (req: Request, res: Response) => {
    try {
      const products = await db.all('SELECT * FROM products');
      const cartItems = await db.all(`
        SELECT 
          cart_items.id,
          cart_items.quantity,
          products.id as product_id,
          products.name,
          products.price,
          products.description,
          products.image
        FROM cart_items
        INNER JOIN products ON cart_items.product_id = products.id
      `);

      res.json({ products, cartCount: cartItems });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
};