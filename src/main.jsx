import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './indexStyle.css'
import App from './App.jsx'

// Change the page title
document.title = 'Colorlez';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)