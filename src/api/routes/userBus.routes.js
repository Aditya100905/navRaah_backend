import express from "express";
import { validateJWT } from "../middlewares/auth.middlewares.js";
import userBusController from "../controllers/userBus.controller.js";

const router = express.Router();
console.log("UserBus Controller Methods:", userBusController);

// PUBLIC ROUTES
router.get("/", userBusController.getAllUserBus);
router.get("/:userId", userBusController.getUserBus);

// PROTECTED ROUTES
router.post("/", validateJWT, userBusController.createUserBus);
router.put("/:userId", validateJWT, userBusController.updateUserBus);
router.delete("/:userId", validateJWT, userBusController.deleteUserBus);

export default router;