import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const [eventName, setEventName] = useState('');
  const [numberOfParticipants, setNumberOfParticipants] = useState('');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5555/events', {
        eventName,
        numberOfParticipants,
        location,
        duration,
      });
      navigate('/');
    } catch (err) {
      setError('Error creating event. Please try again.');
    }
  };

  return (
    <div>
      <h1>Create Event</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Name:</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Number of Participants:</label>
          <input
            type="number"
            value={numberOfParticipants}
            onChange={(e) => setNumberOfParticipants(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Duration (in hours):</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
