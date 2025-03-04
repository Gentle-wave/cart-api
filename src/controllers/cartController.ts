import { Request, Response } from 'express';
import { Database } from 'sqlite';

export class CartController {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  public async addToCart(req: Request, res: Response): Promise<Response> {
    try {
      const { productId } = req.body;

      const product = await this.db.get(
        'SELECT * FROM products WHERE id = ?',
        productId
      );

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      // Check if the product already exists in the cart
      const existingCartItem = await this.db.get(
        'SELECT * FROM cart_items WHERE product_id = ?',
        productId
      );

      if (existingCartItem) {
        // If the product is already in the cart, increment the quantity
        await this.db.run(
          'UPDATE cart_items SET quantity = quantity + 1 WHERE product_id = ?',
          productId
        );
      } else {
        // If the product is not in the cart, add it with quantity 1
        await this.db.run(
          'INSERT INTO cart_items (product_id, quantity) VALUES (?, ?)',
          productId,
          1
        );
      }

      return res.status(201).json({
        status: `success`,
        message: 'Product added to cart successfully',
        product_id: productId,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async removeFromCart(req: Request, res: Response): Promise<Response> {
    try {
      const { productId } = req.params;

      const result = await this.db.run(
        'DELETE FROM cart_items WHERE product_id = ?',
        productId
      );

      if (result.changes === 0) {
        return res.status(404).json({ error: 'Product not found in cart' });
      }

      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }



  public async getCart(req: Request, res: Response): Promise<Response> {
    try {
      const cartItems = await this.db.all(`
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

      return res.json({
        status: `success`,
        cartItems
      });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  checkout = async (req: Request, res: Response) => {
    try {
      await this.db.run('DELETE FROM cart_items');
      res.json({
        status: `success`,
        message: 'Checkout successful'
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}