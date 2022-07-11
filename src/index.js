import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from './App';
import Login from './components/e-insta/login/login'
import Home from './components/e-insta/main/home'
import Flows from './components/e-insta/main/flows';
import Reactflow from './components/e-insta/main/reactflow';
import reportWebVitals from './reportWebVitals';
import { UserContextProvider } from './components/e-insta/context/usercontext';
import { FlowProvider } from './components/e-insta/context/flowcontext';


const rootElement = document.getElementById("root");
render(
  <React.StrictMode>
    <BrowserRouter>
      <FlowProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </FlowProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
