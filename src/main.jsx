import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Temcard from './components/Temcard/index.jsx'
import Header from './components/Header/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Temcard />
  </StrictMode>,
)
