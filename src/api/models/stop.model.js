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
    },
    {
        timestamps: true,
    }
);

export const Stop = mongoose.model('Stop', stopSchema);
