import { useEffect, useState } from 'react'
import { FILTERS_INITIAL_STATE } from '../utils/consts'
import { useFilters } from './useFilters'

export function useFiltersModal({ isOpen, onClose }) {
  const { filters, setFilters, resetFilters } = useFilters()
  const [errors, setErrors] = useState([])
  const [selectedMin, setSelectedMin] = useState(filters.minId)
  const [selectedMax, setSelectedMax] = useState(filters.maxId)
  const [selectedType, setSelectedType] = useState(filters.type)

  useEffect(() => {
    setSelectedMin(filters.minId)
    setSelectedMax(filters.maxId)
    setSelectedType(filters.type)
  }, [isOpen])

  useEffect(() => {
    if (selectedMin > selectedMax) {
      setErrors([...errors, 'El valor mínimo debe ser menor que el máximo'])
    }
    if (selectedMin <= FILTERS_INITIAL_STATE.minId - 1) {
      setErrors([
        ...errors,
        `El valor mínimo debe ser mayor a ${FILTERS_INITIAL_STATE.minId - 1}`,
      ])
    }
    if (selectedMax > FILTERS_INITIAL_STATE.maxId) {
      setErrors([...errors, `La id máxima es ${FILTERS_INITIAL_STATE.maxId}`])
    }

    return () => setErrors([])
  }, [selectedMin, selectedMax])

  const handleMinChange = (e) => {
    const newValue = Number(e.target.value)
    setSelectedMin(newValue)
  }

  const handleMaxChange = (e) => {
    const newValue = Number(e.target.value)
    setSelectedMax(newValue)
  }

  const handleFilter = () => {
    if (errors.length) return

    setFilters({
      minId: selectedMin,
      maxId: selectedMax,
      type: selectedType,
    })
    setErrors([])
    onClose()
  }

  const resetSelection = () => {
    resetFilters()
    setSelectedMin(FILTERS_INITIAL_STATE.minId)
    setSelectedMax(FILTERS_INITIAL_STATE.maxId)
    setSelectedType(FILTERS_INITIAL_STATE.type)
  }

  return {
    errors,
    handleMinChange,
    handleMaxChange,
    handleFilter,
    resetSelection,
    selectedMin,
    selectedMax,
    selectedType,
    setSelectedType,
  }
}
