import './App.css'
import debounce from "just-debounce-it"
import { useState, useCallback } from 'react'
import { Movies } from './components/Movies'
import { Header } from './components/Header'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'

function App() {
  const [sort, setSort] = useState(false)
  const {search, updateSearch, error} = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search => {
    getMovies({ search })
    }, 300)
  , [])

  const handleSort = () => {
    setSort(!sort)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
    event.target.children[0].select()

    // Otra forma de recuperar el valor del imput, recupera todos los
    // valores de inputs dentro de un formulario  
    // const fields = Object.fromEntries(
    //   new window.FormData(event.target)
    // )
    // const {query} = fields
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    if(event.target.value.startsWith(" ")) return
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div className="page">
      <Header 
      handleChange={handleChange}
      handleSort={handleSort}
      handleSubmit={handleSubmit}
      error={error}
      sort={sort}
      search={search}
      />

      <main>
          {
            search.length > 0
            ? (loading ? <p>Cargando...</p> : <Movies movies={movies} />)
            : (<p>Aquí aparecerán tus películas...</p>)
          }
      </main>
    </div>
  )
}

export default App
