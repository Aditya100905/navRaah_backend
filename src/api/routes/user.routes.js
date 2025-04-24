import express from "express";
import userController from "../controllers/user.controller.js";
import { validateJWT } from "../middlewares/auth.middlewares.js";

const router = express.Router();

// PUBLIC ROUTES
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/refresh-token", userController.refreshAccessToken);
router.post("/logout", userController.logout);

// PROTECTED ROUTES USED VALIDATOR
router.get("/me", validateJWT, userController.getCurrentUser);
router.put("/me", validateJWT, userController.updateCurrentUser);
router.delete("/me", validateJWT, userController.deleteUser);

export default router;
