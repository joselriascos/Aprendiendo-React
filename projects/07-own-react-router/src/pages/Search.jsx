import { useRef } from 'react'
import { Link } from '../Components/Link.jsx'
import { navigate } from '../services/functions.js'
import { IL18N } from '../utils/consts.js'
import { useGlobalConf } from '../hooks/useGlobalConf.js'
import { useSearch } from '../hooks/useSearch.js'

export default function SearchPage({ routeParams }) {
  const inputRef = useRef()
  const { lang } = useGlobalConf()
  const text = IL18N.searchPage[lang]
  const { search, setSearch } = useSearch({ text, routeParams })

  const handleSubmit = (event) => {
    event.preventDefault()
    const newSearch = inputRef.current.value.trim()
    if (!newSearch) return
    setSearch(newSearch)
    navigate(`/search/${newSearch}`)
  }

  return (
    <div className="search-page">
      <h1>
        {routeParams.query
          ? `${text.title_first_part} ${routeParams.query}`
          : `${text.title_second_part}`}
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoFocus
          ref={inputRef}
          placeholder="JavaScript, Python, C++..."
          onChange={(e) => setSearch(e.target.value.trimStart())}
          value={search}
        />
        <input type="submit" value={text.button} />
      </form>
      <Link to="/">{text.link}</Link>
    </div>
  )
}
