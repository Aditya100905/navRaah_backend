import express from 'express'
import routeController from '../controllers/route.controller.js'

const router = express.Router();
console.log(routeController);

router.post('/', routeController.addRoute);
router.put('/:id', routeController.updateRoute);
router.delete('/:id', routeController.deleteRouteByIdentifier);
router.get('/:id', routeController.getRouteByIdentifier);
router.get('/', routeController.getAllRoute);

export default router;