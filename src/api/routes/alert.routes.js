import express from 'express'
import alertController from '../controllers/alert.controller.js'
import { validateJWT } from '../middlewares/auth.middlewares.js';

const router = express.Router();

// Protected Routes
router.post('/', validateJWT, alertController.createAlert);
router.put('/:id', validateJWT, alertController.updateAlert);
router.delete('/:id', validateJWT, alertController.deleteAlertByIdentifier);

// Public Routes
router.get('/:id', alertController.getAlertByIdentifier);
router.get('/', alertController.getAllAlert);

export default router;