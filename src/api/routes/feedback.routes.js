import express from "express";
import feedbackController from "../controllers/feedback.controller.js";
import  {validateJWT}  from "../middlewares/auth.middlewares.js";

const router = express.Router();
console.log("Feedback Controller Methods:", feedbackController);

// Protected Routes
router.post("/", validateJWT, feedbackController.addFeedback);
router.delete("/:feedbackId", validateJWT, feedbackController.deleteFeedback);
router.put("/:feedbackId", validateJWT, feedbackController.updateFeedback);

// Public Routes
router.get("/", feedbackController.getFeedbacks);
router.get("/user/:userId", feedbackController.getFeedbackByUser);

export default router;
