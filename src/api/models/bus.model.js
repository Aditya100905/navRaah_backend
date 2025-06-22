import mongoose, { Schema } from 'mongoose';

const busSchema = new Schema(
    {
        busNo: {
            type: String,
            required: true,
            unique: true
        },
        capacity: {
            type: Number,
            required: true,
            min: 1
        },
        startJourney:{
            type: Boolean,
            default: false
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
    }
);

export const Bus = mongoose.model('Bus', busSchema);
