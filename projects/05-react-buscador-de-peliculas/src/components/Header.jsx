export function Header({
  handleSubmit,
  handleChange,
  handleSort,
  error,
  sort,
  search,
}) {
  return (
    <header>
      <h1>Buscador de películas</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="search-container">
          <input
            style={{
              border: 'transparent 1px solid',
              borderColor: error ? 'red' : 'transparent',
            }}
            autoComplete="off"
            onChange={handleChange}
            value={search}
            name="search"
            type="text"
            placeholder="Avengers, Star Wars, The Matrix ..."
          />
          <button type="submit">Buscar</button>
        </div>
        <div className="check-container">
          <input
            type="checkbox"
            id="sorted-check"
            onChange={handleSort}
            checked={sort}
          />
          <label htmlFor="sorted-check">Ordenados</label>
        </div>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </header>
  )
}
