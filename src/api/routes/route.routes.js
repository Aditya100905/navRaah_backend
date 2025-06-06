import express from 'express'
import routeController from '../controllers/route.controller.js'
import { validateJWT } from '../middlewares/auth.middlewares.js';

const router = express.Router();
console.log("Route Controller Methods:",routeController);

// Protected Routes
router.post('/',validateJWT, routeController.addRoute);
router.put('/:id',validateJWT, routeController.updateRoute);
router.delete('/:id',validateJWT, routeController.deleteRouteByIdentifier);

// Public Routes
router.get('/:id', routeController.getRouteByIdentifier);
router.get('/', routeController.getAllRoute);

export default router;