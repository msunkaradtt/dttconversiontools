import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ToastifyProvider } from "./providers"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastifyProvider>
      <App />
    </ToastifyProvider>
  </StrictMode>,
)
