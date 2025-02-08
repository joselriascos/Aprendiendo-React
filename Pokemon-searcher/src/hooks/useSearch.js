import { useContext } from 'react'
import { SearchContext } from '../contexts/Search'

export function useSearch() {
  const useSearch = useContext(SearchContext)

  return useSearch
}
