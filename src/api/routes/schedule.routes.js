import express from "express";
import { validateJWT } from "../middlewares/auth.middlewares.js";
import scheduleController from "../controllers/schedule.controller.js";

const router = express.Router();
console.log("Schedule Controller Methods:", scheduleController);

// PUBLIC ROUTES
router.get("/", scheduleController.getAllSchedules);
router.get("/bus/:busId", scheduleController.getScheduleByBus);
router.get("/route/:routeId", scheduleController.getScheduleByRoute);
router.post("/schedule/:scheduleId", scheduleController.getScheduleById);
router.get("/bus/:busId/route/:routeId", scheduleController.getSchedulesByBusAndRoute);

// PROTECTED ROUTES
router.post("/", validateJWT, scheduleController.createSchedule);
router.put("/:scheduleId", validateJWT, scheduleController.updateSchedule);
router.delete("/:scheduleId", validateJWT, scheduleController.deleteSchedule);

export default router;