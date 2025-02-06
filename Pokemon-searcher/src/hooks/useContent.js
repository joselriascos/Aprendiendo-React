import { useState, useEffect } from 'react'
import { useAppContext } from './useAppContext'
import { useFilters } from './useFilters'
import { fetchData } from '../utils/functions'
import {
  API_ALL_POKEMON,
  API_POKEMON_FILTERED_BY_TYPE,
  FILTERS_INITIAL_STATE,
} from '../utils/consts'

export function useContent() {
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [results, setResults] = useState(null)
  const { filters, filterResults } = useFilters()
  const { changeIsModalOpen } = useAppContext()

  useEffect(() => {
    const fetchDataAndFilter = async () => {
      setResults(null)
      const url =
        filters.type === FILTERS_INITIAL_STATE.type
          ? API_ALL_POKEMON
          : API_POKEMON_FILTERED_BY_TYPE + filters.type
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
    fetchDataAndFilter()
  }, [filters])

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
