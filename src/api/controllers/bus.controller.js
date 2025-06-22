import { Bus } from '../models/bus.model.js'

const busController = {
    addBus: async (req, res) => {
        try {
            const { busNo, capacity, status } = req.body;
            //status - optional because default is set as active
            if (!busNo || !capacity) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                })
            }

            //check for existing bus
            const existingBus = await Bus.findOne({ busNo });
            if (existingBus) {
                return res.status(409).json({ message: "Bus already exist!" })
            }

            const newBus = new Bus({
                busNo,
                capacity,
                status
            })
            await newBus.save();
            return res.status(200).json({
                success: true,
                message: "Bus added successfully!"
            })

        }
        catch (err) {
            console.log("Error adding bus: ", err);
            return res.status(500).json({
                success: false,
                message: "Failed to add bus.Try Again!"
            })
        }

    },
    updateBus: async (req, res) => {
        try {
            const busId = req.params.id;
            const { busNo, capacity, status } = req.body;

            // busId provided or not
            if (!busId) {
                return res.status(400).json({
                    success: false,
                    message: "busId is required"
                });
            }

            // Find bus by id
            const bus = await Bus.findById(busId);
            if (!bus) {
                return res.status(404).json({
                    success: false,
                    message: "Bus not found"
                });
            }

            // Update fields which are provided by the user
            if (busNo !== undefined) bus.busNo = busNo;
            if (capacity !== undefined) bus.capacity = capacity;
            if (status !== undefined) bus.status = status;

            await bus.save();

            return res.status(200).json({
                success: true,
                message: "Bus updated successfully",
                bus
            });
        }
        catch (err) {
            console.log("Error updating bus: ", err);
            return res.status(500).json({
                success: false,
                message: "Failed to update bus.Try Again!"
            })
        }
    },
    deleteBusByIdentifier: async (req, res) => {
        try {
            const busId = req.params.id;
            if(!busId){
                return res.status(400).json({
                    success: false,
                    message: "Bus id is required"
                })
            }

            const deletedBus = await Bus.findByIdAndDelete(busId);
            //validation
            if(!deletedBus){
                return res.status(404).json({
                    success:false,
                    message: "Bus not found with the provided busId"
                })
            }
            
            res.status(200).json({
                success: true,
                message: "Bus deleted successfully!",
                data: deletedBus
            })
        }
        catch (err) {
            console.log("Error deleting bus: ", err);
            return res.status(500).json({
                success: false,
                message: "Failed to delete bus.Try Again!"
            })
        }
    },
    getBusByIdentifier: async (req, res) => {
        try {
            const busId = req.params.id;
            if(!busId){
                return res.status(400).json({
                    success: false,
                    message: "busId is required."
                })
            }

            const requiredBus = await Bus.findById(busId);
            if(!requiredBus){
                return res.status(200).json({
                    success: true,
                    message: "No bus existis with this bus Id"
                })
            }

            return res.status(200).json({
                success: true,
                message: "Bus fetched successfully",
                data: requiredBus
            })
        }
        catch (err) {
            console.log("Error fetching bus by id: ", err);
            return res.status(500).json({
                success: false,
                message: "Failed to fetch bus by id.Try Again!"
            })
        }
    },
    getAllBus: async (req, res) => {
        try {
            const allBuses = await Bus.find();  //array of buses
            if(allBuses.length === 0){
                return res.status(200).json({
                    success: true,
                    message: "No bus found."
                })
            }
            return res.status(200).json({
                success: true,
                message: "All buses fetched successfully!",
                data: allBuses
            })
        }
        catch (err) {
            console.log("Error fetching buses: ", err);
            return res.status(500).json({
                success: false,
                message: "Failed to fetch buses.Try Again!"
            })
        }
    },
}

export default busController;