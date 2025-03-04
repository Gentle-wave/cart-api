import { Router } from 'express';
import { CartController } from '../controllers/cartController';
import { Database } from 'sqlite';
import asyncHandler from 'express-async-handler';

export const createCartRouter = (db: Database) => {
    const router = Router();
    const cartController = new CartController(db);

    router.post('/', asyncHandler(async (req, res) => {
        await cartController.addToCart(req, res);
    }));

    router.delete('/delete', asyncHandler(async (req, res) => {
        await cartController.removeFromCart(req, res);
    }));

    router.get('/', asyncHandler(async (req, res) => {
        await cartController.getCart(req, res);
    }));

    router.post('/checkout', asyncHandler(async (req, res) => {
        await cartController.checkout(req, res);
    }));

    return router;
};