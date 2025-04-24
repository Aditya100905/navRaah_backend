import { User } from "../models/user.model.js";

const userController = {
  // login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const isPasswordCorrect = await user.isPasswordCorrect(password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
      user.refreshToken = refreshToken;
      await user.save();
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        message: "Login successful",
        accessToken,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // register
  register: async (req, res) => {
    try {
      const { name, email, password, phone } = req.body;
      const existingUser = await User.findOne({
        $or: [{ email }, { phone }],
      });
      if (existingUser) {
        return res.status(400).json({
          message: "User with this email or phone already exists",
        });
      }
      const newUser = await User.create({
        name,
        email,
        password,
        phone,
      });
      const accessToken = newUser.generateAccessToken();
      const refreshToken = newUser.generateRefreshToken();
      newUser.refreshToken = refreshToken;
      await newUser.save();
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.status(201).json({
        message: "User registered successfully",
        accessToken,
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          role: newUser.role,
        },
      });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // logout
  logout: async (req, res) => {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
      }
      const user = await User.findOne({ refreshToken });
      if (!user) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }
      user.refreshToken = null;
      await user.save();
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("Error during logout:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // generating a new access token if refereshToken exists
  refreshAccessToken: async (req, res) => {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
      }
      const user = await User.findOne({ refreshToken });
      if (!user) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }
      const newAccessToken = user.generateAccessToken();
      res.status(200).json({
        message: "Access token refreshed successfully",
        accessToken: newAccessToken,
      });
    } catch (error) {
      console.error("Error during token refresh:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // get user
  getCurrentUser: async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        message: "User retrieved successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Error retrieving user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // update user
  updateCurrentUser: async (req, res) => {
    try {
      const { name, email, phone } = req.body;
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { name, email, phone },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        message: "User updated successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // delete user
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.user._id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default userController;
