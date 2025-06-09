import { Alert } from '../models/alert.model.js'

const alertController = {
    createAlert: async (req, res) => {
    try {
      const { title, Description, type, isActive } = req.body;

      // Validate required fields
      if (!title || !Description || !type) {
        return res.status(400).json({
          success: false,
          message: "Title, Description, and Type are required fields.",
        });
      }

      // Create and save the alert
      const newAlert = new Alert({
        title,
        Description,
        type,
        isActive: isActive // optional field
      });

      await newAlert.save();

      return res.status(201).json({
        success: true,
        message: "Alert created successfully.",
        alert: newAlert,
      });
    } catch (err) {
      console.error("Error creating alert:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to create alert. Try again!",
      });
    }
  },
    updateAlert: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, Description, type, isActive } = req.body;

      // Check if alert exists
      const existingAlert = await Alert.findById(id);
      if (!existingAlert) {
        return res.status(404).json({
          success: false,
          message: 'Alert not found',
        });
      }

      // Update fields
      if (title) existingAlert.title = title;
      if (Description) existingAlert.Description = Description;
      if (type) existingAlert.type = type;
      if (isActive) existingAlert.isActive = isActive;

      await existingAlert.save();

      return res.status(200).json({
        success: true,
        message: 'Alert updated successfully',
        alert: existingAlert,
      });
    } catch (err) {
      console.error('Error updating alert:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to update alert. Try again!',
      });
    }
  },
    deleteAlertByIdentifier: async (req, res) => {
    try {
      const { id } = req.params;

      // Check if the alert exists
      const alert = await Alert.findById(id);
      if (!alert) {
        return res.status(404).json({
          success: false,
          message: 'Alert not found',
        });
      }

      await Alert.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: 'Alert deleted successfully',
        deletedAlert: alert,
      });
    } catch (err) {
      console.error('Error deleting alert:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to delete alert. Try again!',
      });
    }
  },
    getAlertByIdentifier: async (req, res) => {
        try {
            const id = req.params.id;
            if(!id){
                return res.status(400).json({
                    success: false,
                    message: "alert id is required."
                })
            }

            const requiredAlert = await Alert.findById(id);
            if(!requiredAlert){
                return res.status(200).json({
                    success: true,
                    message: "No Alert existis with this alert Id"
                })
            }

            return res.status(200).json({
                success: true,
                message: "Alert fetched successfully",
                data: requiredAlert
            })
        }
        catch (err) {
            console.log("Error fetching alert by id: ", err);
            return res.status(500).json({
                success: false,
                message: "Failed to fetch alert by id.Try Again!"
            })
        }
    },
    getAllAlert: async (req, res) => {
        try {
            const allAlerts = await Alert.find();  //array of alerts
            if(allAlerts.length === 0){
                return res.status(200).json({
                    success: true,
                    message: "No Alerts found."
                })
            }
            return res.status(200).json({
                success: true,
                message: "All alerts fetched successfully!",
                data: allAlerts
            })
        }
        catch (err) {
            console.log("Error fetching alerts: ", err);
            return res.status(500).json({
                success: false,
                message: "Failed to fetch alerts.Try Again!"
            })
        }
    },
}

export default alertController;