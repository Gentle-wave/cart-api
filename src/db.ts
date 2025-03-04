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
      description TEXT,
      image TEXT
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
INSERT INTO products (name, price, description, image)
VALUES 
  ('Aurora Wireless Headphones', 19.99, 'Immerse yourself in crystal-clear sound with these sleek, comfortable wireless headphones.', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1399&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
  ('Nimbus Smartwatch', 29.99, 'Stay connected and track your health with this stylish and feature-packed smartwatch.', 'https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
  ('Blaze Gaming Mouse', 39.99, 'Dominate your games with precision and speed using this high-performance gaming mouse.', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
  ('Luna Desk Lamp', 24.99, 'Brighten your workspace with this modern, adjustable LED desk lamp.', 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
  ('Zephyr Portable Speaker', 34.99, 'Take the party anywhere with this powerful and portable Bluetooth speaker.', 'https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
  ('Pulse Fitness Tracker', 44.99, 'Track your steps, heart rate, and more with this sleek fitness tracker.', 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
  ('Echo Wireless Charger', 14.99, 'Charge your devices quickly and wirelessly with this minimalist charger pad.', 'https://plus.unsplash.com/premium_photo-1670537994863-5ad53a3214e0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
  ('Nova Laptop Stand', 54.99, 'Improve your posture and workspace ergonomics with this adjustable laptop stand.', 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
  ('Solstice Desk Organizer', 64.99, 'Keep your workspace tidy and stylish with this multi-compartment desk organizer.', 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
  ('Vortex Mechanical Keyboard', 74.99, 'Type faster and more comfortably with this tactile mechanical keyboard.', 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D'),
  ('Glide Laptop Sleeve', 74.99, 'Protect your laptop on the go with this padded, water-resistant sleeve.', 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
  ('Stratus Power Bank', 74.99, 'Stay powered up anywhere with this high-capacity portable power bank.', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  `);
}