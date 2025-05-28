import express from 'express'
import busController from '../controllers/bus.controller.js'

const router = express.Router();
console.log("Bus Controller Methods:",busController);

router.post('/', busController.addBus);
router.put('/:id', busController.updateBus);
router.delete('/:id', busController.deleteBusByIdentifier);
router.get('/:id', busController.getBusByIdentifier);
router.get('/', busController.getAllBus);

export default router;