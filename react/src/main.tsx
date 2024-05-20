import React from 'react'
import ReactDOM from 'react-dom/client'
import './globals.css'
import Router from './routes/index.tsx'
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </React.StrictMode>,
)
