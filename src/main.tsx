import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import App from "./App.tsx";
import "./index.css";


import ReactDOM from 'react-dom/client'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   
     <Router>
     <App />
     </Router>

    
  </React.StrictMode>,
)