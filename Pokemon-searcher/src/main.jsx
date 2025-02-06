import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppContextProvider } from './contexts/AppContext.jsx'
import { FiltersProvider } from './contexts/Filters.jsx'

createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <FiltersProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </FiltersProvider>
  </AppContextProvider>
)
