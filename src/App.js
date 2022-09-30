import React, { useState } from 'react';
import './App.css';
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import AuthSignUp from './components/Auth/AuthSignUp';
import PostDetails from './components/PostDetails/PostDetails';
import { Routes, Route } from 'react-router-dom';

function App() {
  // const user = JSON.parse(localStorage.getItem('profile'));
  const [author, setAuthor] = useState("");

  return (
    <Container maxwidth="xl">
      <Navbar author={author} setAuthor={setAuthor} />
      <Routes>
        <Route path="/" element={<Home author={author} />} />
        <Route path="/posts" element={<Home author={author} />} />
        <Route path="/posts/search" element={<Home author={author} />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/signin" element={<Auth />} />
        <Route path="/signup" element={<AuthSignUp />} />
      </Routes>
    </Container>
  );
}

export default App;
