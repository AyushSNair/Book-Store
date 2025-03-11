import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ShowEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [error, setError] = useState('');

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

  return (
    <div>
      <h1>Event Details</h1>
      {error && <p>{error}</p>}
      {event && (
        <div>
          <h2>{event.eventName}</h2>
          <p>Number of Participants: {event.numberOfParticipants}</p>
          <p>Location: {event.location}</p>
          <p>Duration: {event.duration} hours</p>
          <Link to="/">Back to Events List</Link>
        </div>
      )}
    </div>
  );
};

export default ShowEvent;
