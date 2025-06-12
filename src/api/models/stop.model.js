import mongoose, { Schema } from 'mongoose';

const stopSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        latitude: {
            type: String,
            required: true,
        },
        longitude: {
            type: String,
            required: true,
        },
        tentativeArrivalTime: {
            type: Date,
            required: false,
        },
        actualArrivalTime: {
            type: Date,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Stop = mongoose.model('Stop', stopSchema);
