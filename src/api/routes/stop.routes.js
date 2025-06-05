import express from 'express';
import stopController from "../controllers/stop.controller.js"
import { validateJWT } from '../middlewares/auth.middlewares.js';
const router = express.Router();

router.post('/add', validateJWT, stopController.addStop);
router.put('/update/:id', validateJWT, stopController.updateStop);
router.get('/', stopController.getStops);
router.get('/:id', stopController.getStopById);
router.delete('/:id', validateJWT, stopController.deleteStop);

export default router;
