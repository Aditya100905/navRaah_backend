import mongoose, {Schema, Types} from "mongoose";


const routeSchema = new Schema(
    {
        startPoint: {
            type: Schema.Types.ObjectId,
            ref: "Stop",
            required: true
        },
        endPoint: {
            type: Schema.Types.ObjectId,
            ref: "Stop",
            required: true
        },
        distance: {
            type: Number,
            min: 0,
            required: true
        },
        time: {
            type: String, //in minutes
            required: true,
            min: 0 
        },
        middleStops: [{
            type: Schema.Types.ObjectId,
            ref: "Stop"
        }]
    },
    {
        timestamps: true,
    }
);

export const Route = mongoose.model('Route', routeSchema);
