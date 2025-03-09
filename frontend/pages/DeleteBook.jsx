import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/books/${id}`);
        setBook(response.data);
      } catch (err) {
        setError('Error fetching book details. Please try again.');
      }
    };
    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5555/books/${id}`);
      navigate('/');
    } catch (err) {
      setError('Error deleting book. Please try again.');
    }
  };

  return (
    <div>
      <h1>Delete Book</h1>
      {error && <p>{error}</p>}
      <p>Are you sure you want to delete the book titled "{book.title}"?</p>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={() => navigate('/')}>Cancel</button>
    </div>
  );
};

export default DeleteBook;
