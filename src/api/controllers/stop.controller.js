import { Stop } from "../models/stop.model.js";

const stopController = {
    addStop: async (req, res) => {
        try {
            const { name, latitude, longitude } = req.body;

            if (!name || !latitude || !longitude) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                });
            }

            // Check for existing stop
            const existingStop = await Stop.findOne({ name });
            if (existingStop) {
                return res.status(409).json({ message: "Stop already exists!" });
            }

            const newStop = new Stop({
                name,
                latitude,
                longitude
            });

            await newStop.save();
            return res.status(200).json({
                success: true,
                message: "Stop added successfully!"
            });

        } catch (err) {
            console.log("Error adding stop: ", err);
            return res.status(500).json({
                success: false,
                message: "Failed to add stop. Try Again!"
            });
        }
    },

    updateStop: async (req, res) => {
        try {
            const stopId = req.params.id;
            const { name, latitude, longitude } = req.body;
            if (!name || !latitude || !longitude) {
            return res.status(400).json({   
                success: false,
                message: "All fields are required"
            });
            }
            // Validate stopId

            if (!stopId) {
            return res.status(400).json({
                success: false,
                message: "stopId is required"
            });
            }

            const updatedStop = await Stop.findByIdAndUpdate(
                stopId,
                { name, latitude, longitude },
                { new: true, runValidators: true }  
            )
            if (!updatedStop) {
                return res.status(404).json({
                    success: false,
                    message: "Stop not found"
                });
            }
            return res.status(200).json({
                success: true,
                message: "Stop updated successfully!",
                data: updatedStop
            });


        } catch (err) {
            console.log("Error updating stop: ", err);
            return res.status(500).json({
            success: false,
            message: "Failed to update stop. Try Again!"
            });
        }
        }
        ,


    deleteStop: async (req, res) => {
        try {
            const stopId = req.params.id;

            // Validate stopId
            if (!stopId) {
                return res.status(400).json({
                    success: false,
                    message: "stopId is required"
                });
            }
            // Find and delete stop
            const stop = await Stop.findByIdAndDelete(stopId);
            if (!stop) {
                return res.status(404).json({
                    success: false,
                    message: "Stop not found"
                });
            }
            return res.status(200).json({
                success: true,
                message: "Stop deleted successfully!"
            });
        } catch (err) {
            console.log("Error deleting stop: ", err);
            return res.status(500).json({
                success: false,
                message: "Failed to delete stop. Try Again!"
            });
        }
    },
    getStops: async (req, res) => {
        try {
            const stops = await Stop.find();
            return res.status(200).json({
                success: true,
                message: "Stops retrieved successfully!",
                data: stops
            });
        } catch (err) {
            console.log("Error retrieving stops: ", err);
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve stops. Try Again!"
            });
        }
    },
    getStopById: async (req, res) => {
        try {
            const stopId = req.params.id;

            // Validate stopId
            if (!stopId) {
                return res.status(400).json({
                    success: false,
                    message: "stopId is required"
                });
            }

            // Find stop by id
            const stop = await Stop.findById(stopId);
            if (!stop) {
                return res.status(404).json({
                    success: false,
                    message: "Stop not found"
                });
            }
            return res.status(200).json({
                success: true,
                message: "Stop retrieved successfully!",
                data: stop
            });
        } catch (err) {
            console.log("Error retrieving stop: ", err);
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve stop. Try Again!"
            });
        }
    }
};

export default stopController