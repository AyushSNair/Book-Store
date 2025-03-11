import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/events/${id}`);
        setEvent(response.data);
      } catch (err) {
        setError('Error fetching event details. Please try again.');
      }
    };
    fetchEvent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5555/events/${id}`, event);
      navigate('/');
    } catch (err) {
      setError('Error updating event. Please try again.');
    }
  };

  return (
    <div>
      <h1>Edit Event</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Name:</label>
          <input
            type="text"
            value={event.eventName || ''}
            onChange={(e) => setEvent({ ...event, eventName: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Number of Participants:</label>
          <input
            type="number"
            value={event.numberOfParticipants || ''}
            onChange={(e) => setEvent({ ...event, numberOfParticipants: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={event.location || ''}
            onChange={(e) => setEvent({ ...event, location: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Duration (in hours):</label>
          <input
            type="number"
            value={event.duration || ''}
            onChange={(e) => setEvent({ ...event, duration: e.target.value })}
            required
          />
        </div>
        <button type="submit">Update Event</button>
      </form>
    </div>
  );
};

export default EditEvent;
