import { Request, Response } from 'express';
import { Database } from 'sqlite';

export class CartController {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  public async addToCart(req: Request, res: Response): Promise<Response> {
    try {
      const { productId, quantity } = req.body;
      
      const product = await this.db.get(
        'SELECT * FROM products WHERE id = ?', 
        productId
      );
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const result = await this.db.run(
        'INSERT INTO cart_items (product_id, quantity) VALUES (?, ?)',
        productId,
        quantity
      );

      return res.status(201).json({
        id: result.lastID,
        product_id: productId,
        quantity
      });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };


  public async removeFromCart(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const result = await this.db.run(
        'DELETE FROM cart_items WHERE id = ?', 
        id
      );
      
      if (result.changes === 0) {
        return res.status(404).json({ error: 'Cart item not found' });
      }

      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };


  public async getCart(req: Request, res: Response): Promise<Response> {
    try {
      const cartItems = await this.db.all(`
        SELECT 
          cart_items.id,
          cart_items.quantity,
          products.id as product_id,
          products.name,
          products.price,
          products.description
        FROM cart_items
        INNER JOIN products ON cart_items.product_id = products.id
      `);
      
      return res.json(cartItems);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  checkout = async (req: Request, res: Response) => {
    try {
      await this.db.run('DELETE FROM cart_items');
      res.json({ message: 'Checkout successful' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}