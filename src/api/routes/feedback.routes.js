import express from "express";
import feedbackController from "../controllers/feedback.controller.js";
import  {validateJWT}  from "../middlewares/auth.middlewares.js";

const router = express.Router();
console.log("Feedback Controller Methods:", feedbackController);

router.post("/add", validateJWT, feedbackController.addFeedback);
router.get("/", feedbackController.getFeedbacks);
router.get("/user/:userId", feedbackController.getFeedbackByUser);
router.delete("/:feedbackId", validateJWT, feedbackController.deleteFeedback);
router.put("/:feedbackId", validateJWT, feedbackController.updateFeedback);

export default router;
