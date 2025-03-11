import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteEvent = () => {
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

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5555/events/${id}`);
      navigate('/');
    } catch (err) {
      setError('Error deleting event. Please try again.');
    }
  };

  return (
    <div>
      <h1>Delete Event</h1>
      {error && <p>{error}</p>}
      <p>Are you sure you want to delete the event titled "{event.eventName}"?</p>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={() => navigate('/')}>Cancel</button>
    </div>
  );
};

export default DeleteEvent;
