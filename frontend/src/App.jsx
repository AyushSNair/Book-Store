import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import CreateEvent from '../pages/CreateEvent.jsx';
import EditEvent from '../pages/EditEvent.jsx';
import DeleteEvent from '../pages/DeleteEvent.jsx';
import ShowEvent from '../pages/ShowEvent.jsx';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/events/create' element={<CreateEvent />} />
      <Route path='/events/edit/:id' element={<EditEvent />} />
      <Route path='/events/delete/:id' element={<DeleteEvent />} />
      <Route path='/events/show/:id' element={<ShowEvent />} />
    </Routes>
  );
}

export default App;
