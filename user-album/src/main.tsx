import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import './tailwind.css'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
)
