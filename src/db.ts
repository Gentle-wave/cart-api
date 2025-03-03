import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function initializeDb() {
  return open({
    filename: ':memory:',
    driver: sqlite3.Database
  });
}

export async function setupDatabase(db: any) {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      FOREIGN KEY(product_id) REFERENCES products(id)
    );
  `);

  // Seed initial products
  await db.exec(`
    INSERT INTO products (name, price, description)
    VALUES 
      ('Product 1', 19.99, 'Description 1'),
      ('Product 2', 29.99, 'Description 2'),
      ('Product 3', 39.99, 'Description 3');
  `);
}