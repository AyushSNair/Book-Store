import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditBook = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5555/books/${id}`, book);
      navigate('/');
    } catch (err) {
      setError('Error updating book. Please try again.');
    }
  };

  return (
    <div>
      <h1>Edit Book</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={book.title || ''}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={book.author || ''}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Publish Year:</label>
          <input
            type="number"
            value={book.publishYear || ''}
            onChange={(e) => setBook({ ...book, publishYear: e.target.value })}
            required
          />
        </div>
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
