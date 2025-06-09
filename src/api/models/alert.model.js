import mongoose, { Schema } from 'mongoose';

const alertSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        Description: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        isActive: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

export const Alert = mongoose.model('Alert', alertSchema);
