import { useId } from 'react'
import './Filters.css'
import { useFilters } from '../hooks/useFilters'

export function Filters() {
  const minPriceFilterId = useId()
  const categoryFilterId = useId()

  const { filters, setFilters } = useFilters()
  const minPrice = filters.minPrice

  const handleChangeMinPrice = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      minPrice: event.target.value,
    }))
  }

  const handleChangeCategory = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      category: event.target.value,
    }))
  }

  return (
    <section className="filters">
      <div>
        <label htmlFor={minPriceFilterId}>Precio mínimo</label>
        <input
          type="range"
          id={minPriceFilterId}
          min="0"
          max="100"
          onChange={handleChangeMinPrice}
          value={minPrice}
        />
        <span>Min Price: $ {minPrice}</span>
      </div>

      <div>
        <label htmlFor={categoryFilterId}>Categoría</label>
        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value="all">Todas</option>
          <option value="beauty">Belleza</option>
          <option value="fragrances">Perfumería</option>
          <option value="furniture">Muebles</option>
          <option value="groceries">Comestibles</option>
        </select>
      </div>
    </section>
  )
}
