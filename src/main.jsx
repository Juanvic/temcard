import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Temcard from './components/Temcard/index.jsx'
import Footer from './components/shared/Footer/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Temcard />
    <Footer />
  </StrictMode>,
)
