import express from 'express'
import busController from '../controllers/bus.controller.js'
import { validateJWT } from '../middlewares/auth.middlewares.js';

const router = express.Router();
console.log("Bus Controller Methods:",busController);

// Protected Routes
router.post('/', validateJWT,busController.addBus);
router.put('/:id',validateJWT, busController.updateBus);
router.delete('/:id',validateJWT, busController.deleteBusByIdentifier);

// Public Routes
router.get('/:id', busController.getBusByIdentifier);
router.get('/', busController.getAllBus);

export default router;