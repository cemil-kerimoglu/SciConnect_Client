import React from 'react';
import './App.css';
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import AuthSignUp from './components/Auth/AuthSignUp';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Container maxwidth="lg">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Auth />} />
        <Route path="/signup" element={<AuthSignUp />} />
      </Routes>
    </Container>
  );
}

export default App;
