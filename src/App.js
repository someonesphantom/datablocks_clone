import React, { useState, useRef, useCallback, useEffect } from 'react';
import './index.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Login from './components/login'
import Home from './components/home'
import Reactflow from './components/reactflow';
import Flows from './components/flows';

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
