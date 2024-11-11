import { createRoot } from "react-dom/client";
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render((<BrowserRouter>
  <App />
</BrowserRouter>));
