import { createContext, useState } from 'react'
import { FILTERS_INITIAL_STATE } from '../utils/consts'

export const FiltersContext = createContext()

export function FiltersProvider({ children }) {
  const [filters, setFilters] = useState({
    minId: 1,
    maxId: 10279,
    type: 'all',
  })

  const resetFilters = () => {
    setFilters(FILTERS_INITIAL_STATE)
  }

  return (
    <FiltersContext.Provider value={{ filters, setFilters, resetFilters }}>
      {children}
    </FiltersContext.Provider>
  )
}
