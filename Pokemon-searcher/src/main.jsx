import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppContextProvider } from './contexts/AppContext.jsx'
import { FiltersProvider } from './contexts/Filters.jsx'
import { SearchProvider } from './contexts/Search.jsx'

createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <FiltersProvider>
      <SearchProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </SearchProvider>
    </FiltersProvider>
  </AppContextProvider>
)
