import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/**
 * The main entry point of the React application.
 * It renders the root component (<App />) into the DOM.
 */
createRoot(document.getElementById('root')).render(
  // StrictMode is a tool for highlighting potential problems in an application.
  // It activates additional checks and warnings for its descendants.
  <StrictMode>
    <App /> {/* The main application component */}
  </StrictMode>,
)
