import React, { useState, useRef, useCallback, useEffect } from 'react';
import './index.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'  
import Login from './components/e-insta/login/login'
import Home from './components/e-insta/home'
import Reactflow from './components/e-insta/reactflow';
import Flows from './components/e-insta/flows';
const routing = (data,setData) => (
  <Router>
    <Routes>
      <Route exact path="/" element={<Login data={data} setData={setData}/>} />  
      <Route exact path="/home" element={<Home data={data} setData={setData}/>} />  
      <Route exact path="/reactapp" element={<Reactflow data={data} setData={setData}/>} />
      <Route exact path="/flowlist" element={<Flows data={data} setData={setData}/>} />
    </Routes>  
  </Router>  
)

export default function App() {
  const [data, setData] = useState([]);
  return (routing(data,setData));
}
