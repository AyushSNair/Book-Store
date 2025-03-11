import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
    {
        eventName: {
            type: String,
            required: true,
            unique: true
        },
        numberOfParticipants: {
            type: Number,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

export const Event = mongoose.model('Event', eventSchema);
