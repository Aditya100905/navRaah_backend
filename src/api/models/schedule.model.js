import mongoose, { Schema, Types } from "mongoose";

const scheduleSchema = new Schema(
  {
    bus: {
      type: Schema.Types.ObjectId,
      ref: "Bus",
      required: true,
    },
    route: {
      type: Schema.Types.ObjectId,
      ref: "Route",
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Schedule = mongoose.model("Schedule", scheduleSchema);
