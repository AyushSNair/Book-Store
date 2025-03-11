import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/home.css';


const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5555/events')
      .then(response => {
        setEvents(response.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <div className="header">
      <h1>Events List</h1>
    <Link to="/events/create">
      <button className="learn-more">
        <span className="circle">
          <span className="icon arrow"></span>
        </span>
        <span className="button-text">Add Event</span>
      </button>
    </Link>
      </div>

      {loading ? <p>Loading events...</p> : (
        <div className="events-container">
        {events.map((event) => (
          <div key={event._id} className="cookieCard">
            <p className="cookieHeading">{event.eventName}</p>
            <p className="cookieDescription">
              Location: {event.location} <br />
              Participants: {event.numberOfParticipants} <br />
              Duration: {event.duration}
            </p>
            <div className="button-group">
              <Link to={`/events/show/${event._id}`} className="acceptButton">View</Link>
              <Link to={`/events/edit/${event._id}`} className="acceptButton">Edit</Link>
              <Link to={`/events/delete/${event._id}`} className="acceptButton delete">Delete</Link>
            </div>
          </div>
        ))}
      </div>
      
      )}
    </div>
  );
}

export default Home;
