import { Schedule } from "../models/schedule.model";

const scheduleController = {

  getAllSchedules: async (req, res) => {
    try {
      const schedules = await Schedule.find().populate("bus").populate("route");
      res.status(200).json({
        message: "Schedules retrieved successfully",
        schedules,
      });
    } catch (error) {
      console.error("Error retrieving schedules:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getScheduleByBus: async (req, res) => {
    try {
      const { busId } = req.params;
      const schedule = await Schedule.findOne({ bus: busId })
        .populate("bus")
        .populate("route");
      if (!schedule) {
        return res.status(404).json({ message: "Schedule not found" });
      }
      res.status(200).json({
        message: "Schedule retrieved successfully",
        schedule,
      });
    } catch (error) {
      console.error("Error retrieving schedule:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getScheduleByRoute: async (req, res) => {
    try {
      const { routeId } = req.params;
      const schedule = await Schedule.findOne({ route: routeId })
        .populate("bus")
        .populate("route");
      if (!schedule) {
        return res.status(404).json({ message: "Schedule not found" });
      }
      res.status(200).json({
        message: "Schedule retrieved successfully",
        schedule,
      });
    } catch (error) {
      console.error("Error retrieving schedule:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  createSchedule: async (req, res) => {
    try {
      const { bus, route, startTime, endTime } = req.body;
      const schedule = new Schedule({
        bus,
        route,
        startTime,
        endTime,
      });
      await schedule.save();
      res.status(201).json({
        message: "Schedule created successfully",
        schedule,
      });
    } catch (error) {
      console.error("Error creating schedule:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  updateSchedule: async (req, res) => {
    try {
      const { scheduleId } = req.params;
      const { bus, route, startTime, endTime } = req.body;
      const schedule = await Schedule.findByIdAndUpdate(
        scheduleId,
        { bus, route, startTime, endTime },
        { new: true }
      );
      if (!schedule) {
        return res.status(404).json({ message: "Schedule not found" });
      }
      res.status(200).json({
        message: "Schedule updated successfully",
        schedule,
      });
    } catch (error) {
      console.error("Error updating schedule:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  deleteSchedule: async (req, res) => {
    try {
      const { scheduleId } = req.params;
      const schedule = await Schedule.findByIdAndDelete(scheduleId);
      if (!schedule) {
        return res.status(404).json({ message: "Schedule not found" });
      }
      res.status(200).json({ message: "Schedule deleted successfully" });
    } catch (error) {
      console.error("Error deleting schedule:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getScheduleById: async (req, res) => {
    try {
      const { scheduleId } = req.params;
      const schedule = await Schedule.findById(scheduleId)
        .populate("bus")
        .populate("route");
      if (!schedule) {
        return res.status(404).json({ message: "Schedule not found" });
      }
      res.status(200).json({
        message: "Schedule retrieved successfully",
        schedule,
      });
    } catch (error) {
      console.error("Error retrieving schedule:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getSchedulesByBusAndRoute: async (req, res) => {
    try {
      const { busId, routeId } = req.params;
      const schedules = await Schedule.find({ bus: busId, route: routeId })
        .populate("bus")
        .populate("route");
      if (!schedules || schedules.length === 0) {
        return res.status(404).json({ message: "No schedules found" });
      }
      res.status(200).json({
        message: "Schedules retrieved successfully",
        schedules,
      });
    } catch (error) {
      console.error("Error retrieving schedules:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

};

export default scheduleController;