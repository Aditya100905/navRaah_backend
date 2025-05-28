import {Feedback} from "../models/feedback.model.js";

const feedbackController = {    
    addFeedback: async (req, res) => {
        try {
            const { message, rating } = req.body;
            if (!message || rating === undefined) {
                return res.status(400).json({
                    success: false,
                    message: "Message and rating are required"
                });
            }
            const userId = req.user._id;

            const newFeedback = new Feedback({ user: userId, message, rating });
            await newFeedback.save();

            return res.status(201).json({
                success: true,
                message: "Feedback added successfully!"
            });
        } catch (err) {
            console.error("Error adding feedback:", err);
            return res.status(500).json({
                success: false,
                message: "Failed to add feedback. Try Again!"
            });
        }
    },

    getFeedbacks: async (req, res) => {
        try {
            const feedbacks = await Feedback.find().populate("user");
            return res.status(200).json({
                success: true,
                feedbacks
            });
        } catch (err) {
            console.error("Error retrieving feedbacks:", err);
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve feedbacks. Try Again!"
            });
        }
    },
    getFeedbackByUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const feedbacks = await Feedback.find({ user: userId }).populate("user");
            if (!feedbacks || feedbacks.length === 0) {
                return res.status(404).json({ message: "No feedback found for this user" });
            }
            return res.status(200).json({
                success: true,
                feedbacks
            });
        } catch (err) {
            console.error("Error retrieving feedback by user:", err);
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve feedback. Try Again!"
            });
        }
    },
    deleteFeedback: async (req, res) => {
        try {
            const { feedbackId } = req.params;
            const feedback = await Feedback.findByIdAndDelete(feedbackId);
            if (!feedback) {
                return res.status(404).json({ message: "Feedback not found" });
            }
            return res.status(200).json({
                success: true,
                message: "Feedback deleted successfully"
            });
        } catch (err) {
            console.error("Error deleting feedback:", err);
            return res.status(500).json({
                success: false,
                message: "Failed to delete feedback. Try Again!"
            });
        }
    },
    updateFeedback: async (req, res) => {
        try {
            const { feedbackId } = req.params;
            const { message, rating } = req.body;

            if (!message || rating === undefined) {
                return res.status(400).json({
                    success: false,
                    message: "Message and rating are required"
                });
            }
            const updatedFeedback = await Feedback.findByIdAndUpdate(
                feedbackId,
                { message, rating },
                { new: true }
            );
            if (!updatedFeedback) {
                return res.status(404).json({ message: "Feedback not found" });
            }
            return res.status(200).json({
                success: true,
                message: "Feedback updated successfully",
                feedback: updatedFeedback
            });
        } catch (err) {
            console.error("Error updating feedback:", err);
            return res.status(500).json({
                success: false,
                message: "Failed to update feedback. Try Again!"
            });
        }
    },
};

export default feedbackController;