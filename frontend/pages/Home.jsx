import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../src/components/Spinner.jsx';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox } from 'react-icons/md';
import '../styles/home.css';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5555/books')
      .then(response => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []); // ✅ Added dependency array to run only on mount

  return (
    <>
      <div className="container">
  <div className="header">
    <h1>Books List</h1>
    <Link to="/books/create" className="add-book-btn">+ Add Book</Link>
  </div>
  <table>
    <thead>
      <tr>
        <th>Sr No.</th>
        <th>Title</th>
        <th>Author</th>
        <th>Publish Year</th>
        <th>Operations</th>
      </tr>
    </thead>
    <tbody>
      {books.map((book, index) => (
        <tr key={book._id}>
          <td>{index + 1}</td>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{book.publishYear}</td>
          <td>
            <Link to={`/books/show/${book._id}`} className="icon-link icon-view">🔍</Link>
            <Link to={`/books/edit/${book._id}`} className="icon-link icon-edit">✏️</Link>
            <Link to={`/books/delete/${book._id}`} className="icon-link icon-delete">🗑️</Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </>
  );
}

export default Home;
