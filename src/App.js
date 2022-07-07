import React, { useState, useRef, useCallback, useEffect } from 'react';
import './index.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Login from './components/e-insta/login/login'
import Home from './components/e-insta/home'
import Reactflow from './components/e-insta/reactflow';
import Flows from './components/e-insta/flows';

const routing = (
  <Router>
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/reactapp" element={<Reactflow />} />
      <Route exact path="/flowlist" element={<Flows />} />
    </Routes>
  </Router>
)

export default function App() {
  return (routing);
}
