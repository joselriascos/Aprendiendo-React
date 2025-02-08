import { useState, useEffect } from 'react'
import { useAppContext } from './useAppContext'
import { useFilters } from './useFilters'
import { fetchData } from '../utils/functions'
import {
  API_ALL_POKEMON,
  API_POKEMON_FILTERED_BY_TYPE_PREFIX,
  FILTERS_INITIAL_STATE,
  API_POKEMON_SEARCH_POKEMON,
} from '../utils/consts'
import { useSearch } from './useSearch'

export function useContent() {
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [results, setResults] = useState(null)
  const { filters, filterResults } = useFilters()
  const { changeIsModalOpen } = useAppContext()
  const { search, checkSearchInFilters } = useSearch()

  useEffect(() => {
    const fetchDataAndFilter = async () => {
      setResults(null)
      if (search.length) {
        const url = `${API_POKEMON_SEARCH_POKEMON}${search}/`
        try {
          const newResult = await fetchData(url)
          const checkedResult = checkSearchInFilters(newResult)
          setResults(checkedResult)
        } catch (error) {
          console.error(error)
        }
      } else {
        const url =
          filters.type === FILTERS_INITIAL_STATE.type
            ? API_ALL_POKEMON
            : API_POKEMON_FILTERED_BY_TYPE_PREFIX + filters.type
        try {
          const newResults = await fetchData(url)
          const filteredResults =
            filters.type === FILTERS_INITIAL_STATE.type
              ? filterResults(newResults.results)
              : filterResults(newResults.pokemon)
          setResults(filteredResults.slice(0, 20))
        } catch (error) {
          console.error(error)
        }
      }
    }
    fetchDataAndFilter()
  }, [filters, search])

  const openModal = (id) => {
    if (!id) return
    changeIsModalOpen(true)
    setSelectedPokemon(id)
  }

  const closeModal = () => {
    changeIsModalOpen(false)
    setSelectedPokemon(null)
  }

  return { openModal, closeModal, results, selectedPokemon }
}
