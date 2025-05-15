import { Route } from "../models/route.model.js";

const routeController = {
    addRoute: async (req, res) => {
        try {
            const { startPoint, endPoint, distance, time, middleStops } = req.body;

            // Validation
            if (!startPoint || !endPoint || !distance || !time) {
                return res.status(400).json({
                    success: false,
                    message: "All required fields must be provided."
                });
            }

            const newRoute = new Route({
                startPoint,
                endPoint,
                distance,
                time,
                middleStops: middleStops || [] // Optional
            });

            await newRoute.save();

            return res.status(201).json({
                success: true,
                message: "Route added successfully!",
                data: newRoute
            });

        }
        catch (err) {
            console.log("Error adding route: ", err);
            return res.status(500).json({
                success: false,
                message: "Failed to add route.Try Again!"
            })
        }
    },
    updateRoute: async (req, res) => {
        try {
            const routeId = req.params.id;
            const { startPoint, endPoint, distance, time, middleStops } = req.body;

            if (!routeId) {
                return res.status(400).json({
                    success: false,
                    message: "Route ID is required."
                });
            }

            const updatedRoute = await Route.findByIdAndUpdate(
                routeId,
                {
                    $set: {
                        ...(startPoint && { startPoint }),
                        ...(endPoint && { endPoint }),
                        ...(distance !== undefined && { distance }),
                        ...(time && { time }),
                        ...(middleStops && { middleStops })
                    }
                },
                { new: true } // return updated doc
            );

            if (!updatedRoute) {
                return res.status(404).json({
                    success: false,
                    message: "No route found with this ID."
                });
            }

            return res.status(200).json({
                success: true,
                message: "Route updated successfully!",
                data: updatedRoute
            });
        }
        catch (err) {
            console.log("Error updating route: ", err);
            return res.status(500).json({
                success: false,
                message: "Failed to update route. Try Again!"
            })
        }
    },
    deleteRouteByIdentifier: async (req, res) => {
        try {
            const routeId = req.params.id;

            if (!routeId) {
                return res.status(400).json({
                    success: false,
                    message: "Route ID is required."
                });
            }

            const deletedRoute = await Route.findByIdAndDelete(routeId);

            if (!deletedRoute) {
                return res.status(404).json({
                    success: false,
                    message: "No route found with this ID."
                });
            }

            return res.status(200).json({
                success: true,
                message: "Route deleted successfully!",
                data: deletedRoute
            });
        }
        catch (err) {
            console.log("Error deleting route: ", err);
            return res.status(500).json({
                success: false,
                message: "Failed to delete bus.Try Again!"
            })
        }
    },
    getRouteByIdentifier: async (req, res) => {
        try {
            const routeId = req.params.id;

            if (!routeId) {
                return res.status(400).json({
                    success: false,
                    message: "Route ID is required."
                });
            }

            const route = await Route.findById(routeId)
                .populate("startPoint")
                .populate("endPoint")
                .populate("middleStops");

            if (!route) {
                return res.status(404).json({
                    success: false,
                    message: "No route found with this ID."
                });
            }

            return res.status(200).json({
                success: true,
                message: "Route fetched successfully.",
                data: route
            });

        } catch (err) {
            console.log("Error fetching route: ", err);
            return res.status(500).json({
                success: false,
                message: "Failed to fetch route. Try again!"
            });
        }
    },
    getAllRoute: async (req, res) => {
        try {
            const routes = await Route.find()
                .populate("startPoint")
                .populate("endPoint")
                .populate("middleStops");

            if (!routes || routes.length === 0) {
                return res.status(200).json({
                    success: true,
                    message: "No routes found.",
                    data: []
                });
            }

            return res.status(200).json({
                success: true,
                message: "All routes fetched successfully.",
                data: routes
            });

        } catch (err) {
            console.log("Error fetching routes: ", err);
            return res.status(500).json({
                success: false,
                message: "Failed to fetch routes. Try Again!"
            });
        }
    },
}
export default routeController;