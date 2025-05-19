import { UserBus } from "../models/userBus.model";

const userBusControllers = {

  getAllUserBus: async (req, res) => {
    try {
      const userBus = await UserBus.find().populate("user").populate("bus");
      res.status(200).json({
        message: "UserBus retrieved successfully",
        userBus,
      });
    } catch (error) {
      console.error("Error retrieving userBus:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getUserBus: async (req, res) => {
    try {
      const { userId } = req.params;
      const userBus = await UserBus.findOne({ user: userId })
        .populate("user")
        .populate("bus");
      if (!userBus) {
        return res.status(404).json({ message: "UserBus not found" });
      }
      res.status(200).json({
        message: "UserBus retrieved successfully",
        userBus,
      });
    } catch (error) {
      console.error("Error retrieving userBus:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  createUserBus: async (req, res) => {
    try {
      const { user, bus } = req.body;
      const userBus = new UserBus({
        user,
        bus,
      });
      await userBus.save();
      res.status(201).json({
        message: "UserBus created successfully",
        userBus,
      });
    } catch (error) {
      console.error("Error creating userBus:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  updateUserBus: async (req, res) => {
    try {
      const { userId } = req.params;
      const { bus } = req.body;
      const userBus = await UserBus.findOneAndUpdate(
        { user: userId },
        { bus },
        { new: true }
      )
        .populate("user")
        .populate("bus");
      if (!userBus) {
        return res.status(404).json({ message: "UserBus not found" });
      }
      res.status(200).json({
        message: "UserBus updated successfully",
        userBus,
      });
    } catch (error) {
      console.error("Error updating userBus:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  deleteUserBus: async (req, res) => {
    try {
      const { userId } = req.params;
      const userBus = await UserBus.findOneAndDelete({ user: userId });
      if (!userBus) {
        return res.status(404).json({ message: "UserBus not found" });
      }
      res.status(200).json({ message: "UserBus deleted successfully" });
    } catch (error) {
      console.error("Error deleting userBus:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

};

export default userBusControllers;