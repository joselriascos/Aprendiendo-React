import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GlobalConfProvider } from './contexts/globalConf.jsx'

createRoot(document.getElementById('root')).render(
  <GlobalConfProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </GlobalConfProvider>
)
