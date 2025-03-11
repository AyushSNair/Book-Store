import express from 'express';
import { Event } from '../models/eventModels.js';
const router = express.Router();

// Route for creating a new event
router.post('/', async (request, response) => {
    try {
        const { eventName, numberOfParticipants, location, duration } = request.body;
        if (!eventName || !numberOfParticipants || !location || !duration) {
            return response.status(400).send({ message: "Please fill all fields" });
        }

        const newEvent = { eventName, numberOfParticipants, location, duration };
        const event = await Event.create(newEvent);
        response.status(201).send(event);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for getting all events
router.get('/', async (request, response) => {
    try {
        const events = await Event.find({});
        return response.status(200).json({ count: events.length, data: events });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for getting an event by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const event = await Event.findById(id);
        return response.status(200).json(event);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error });
    }
});

// Route for updating an event by ID
router.put('/:id', async (request, response) => {
    const { id } = request.params;
    const eventUpdate = await Event.findByIdAndUpdate(id, request.body);
    if (!eventUpdate) {
        return response.status(404).json({ message: 'Event not found' });
    }
    return response.status(200).json(eventUpdate);
});

// Route for deleting an event by ID
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const eventDelete = await Event.findByIdAndDelete(id);
        return response.status(200).send({ message: `Event with ${id} was successfully deleted` });
    } catch (error) {
        response.status(404).json({ message: 'Event not found' });
    }
});

export default router;
