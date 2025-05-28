import mongoose, { Schema } from 'mongoose';

const feedbackSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        }
    },
    {
        timestamps: true,
    }
);

export const Feedback = mongoose.model('Feedback', feedbackSchema);
