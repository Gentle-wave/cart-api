import express from 'express';
import { initializeDb, setupDatabase } from './db';
import { createCartRouter } from './routes/cart';
import { createProductsRouter } from './routes/products';

const app = express();
const port = 3000;

app.use(express.json());

async function startServer() {
  const db = await initializeDb();
  await setupDatabase(db);

  // Initialize routes with db dependency
  app.use('/products', createProductsRouter(db));
  app.use('/cart', createCartRouter(db));

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer();