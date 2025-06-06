import express from 'express';
import stopController from "../controllers/stop.controller.js"
import { validateJWT } from '../middlewares/auth.middlewares.js';
const router = express.Router();

console.log("Stop Controller Methods:",stopController);

// Protected Routes
router.post('/', validateJWT, stopController.addStop);
router.put('/:id', validateJWT, stopController.updateStop);
router.delete('/:id', validateJWT, stopController.deleteStop);

// Public Routes
router.get('/', stopController.getStops);
router.get('/:id', stopController.getStopById);

export default router;
