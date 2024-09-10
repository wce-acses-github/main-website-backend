import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        indx: {
            type: Number,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        poster: {
            type: String,
            required: true,
        },
        photos: [
            {
                type: String,
                required: true,
            },
        ],
        instaUrl: {
            type: String,
        },
        linkedInUrl: {
            type: String,
        },
        photosLink: {
            type: String,
        },
        eventType: {
            type: String,
            required: true,
        },
        eventStatus: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Event = mongoose.model("Event", eventSchema);
