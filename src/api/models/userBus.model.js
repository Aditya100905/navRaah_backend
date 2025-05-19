import mongoose, { Schema, Types } from "mongoose";

const userBusSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bus: {
    type: Schema.Types.ObjectId,
    ref: "Bus",
    required: true,
  },
});

export const UserBus = mongoose.model("UserBus", userBusSchema);
