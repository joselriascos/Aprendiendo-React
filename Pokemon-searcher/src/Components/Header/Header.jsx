import './Header.css'
import { MoonIcon } from '../Icons.jsx'
import { SunIcon } from '../Icons.jsx'
import { useAppContext } from '../../hooks/useAppContext.js'
import { IL18N } from '../../utils/consts.js'
import { useRef, useState } from 'react'
import FiltersModal from '../FiltersModal/FiltersModal.jsx'
import { useSearch } from '../../hooks/useSearch.js'
import { useFilters } from '../../hooks/useFilters.js'
import { names } from '../../utils/names.js'
import { checkVisibilityAndScroll } from '../../utils/functions.js'

export function Header() {
  const [inputFocused, setInputFocuesed] = useState(false)
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const { theme, toggleTheme, lang, changeLang, isModalOpen } = useAppContext()
  const il18n = IL18N[lang]
  const { resetSearch, setSearch, search } = useSearch()
  const { checkFiltersActive, resetFilters } = useFilters()
  const searchRef = useRef()
  const suggestionContainerRef = useRef()
  const suggestionRef = useRef([])

  const openFiltersModal = () => {
    setIsFiltersModalOpen(true)
  }

  const closeFiltersModal = () => {
    setIsFiltersModalOpen(false)
  }

  const handleLangChange = (event) => {
    changeLang(event.target.value)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      searchRef.current.value = ''
      searchRef.current.blur()
      return
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (selectedIndex < suggestions.length - 1) {
        setSelectedIndex(selectedIndex + 1)
        checkVisibilityAndScroll({
          container: suggestionContainerRef.current,
          element: suggestionRef.current[selectedIndex + 1],
        })
      }
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1)
        checkVisibilityAndScroll({
          container: suggestionContainerRef.current,
          element: suggestionRef.current[selectedIndex - 1],
        })
      }
    }
    if (event.key === 'Enter') {
      if (selectedIndex > -1) {
        handleSuggestionSelect(suggestions[selectedIndex])
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newSearch = searchRef.current.value
    setSearch(newSearch.toLowerCase().trim())
    searchRef.current.select()
    setSuggestions([])
    setSelectedIndex(0)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    searchRef.current.value = newSearch
    if (!newSearch) {
      resetSearch()
      setSuggestions([])
      return
    }
    const newSuggesitions = names.filter((name) =>
      name.toLowerCase().includes(newSearch.toLowerCase())
    )
    setSuggestions(newSuggesitions)
    setSelectedIndex(0)
  }

  const handleFiltersOpen = (event) => {
    event.preventDefault()
    openFiltersModal()
  }

  const handleClickHome = () => {
    resetSearch()
    resetFilters()
    setSuggestions([])
    searchRef.current.value = ''
    setSelectedIndex(0)
  }

  const handleSuggestionSelect = (text) => {
    const newSearch = text.toLowerCase().trim()
    setSearch(newSearch)
    searchRef.current.value = newSearch
    searchRef.current.select()
    setSuggestions([])
    setSelectedIndex(0)
  }

  const handleInputFocus = (event) => {
    setInputFocuesed(true)
    handleChange(event)
  }

  const handleInputBlur = () => {
    setInputFocuesed(false)
    setSuggestions([])
  }

  return (
    <div
      className={`header-container 
        ${theme === 'dark' ? 'dark-mode' : ''} ${
        inputFocused ? 'input-focused' : ''
      } 
        ${isModalOpen ? 'hidden' : ''} 
        ${isFiltersModalOpen ? 'hidden' : ''} `}
    >
      <h1 onClick={handleClickHome}>Pokemon Searcher</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Pikachu, 154, Bulbasaur, 87..."
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={searchRef}
        />
        {suggestions && (
          <ul
            ref={suggestionContainerRef}
            className={`suggestion-list ${theme === 'dark' ? 'dark-mode' : ''}`}
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                ref={(element) => (suggestionRef.current[index] = element)}
                className={`suggestion 
                  ${theme === 'dark' ? 'dark-mode' : ''} 
                  ${selectedIndex === index ? 'selected' : ''}`}
                onMouseDown={() => handleSuggestionSelect(suggestion)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <button
          type="submit"
          className={`search-btn ${theme === 'dark' ? 'dark-mode' : ''} ${
            search !== '' ? 'search-active' : ''
          }`}
        >
          {il18n.search}
        </button>
        <button
          onClick={handleFiltersOpen}
          className={`filters-btn ${theme === 'dark' ? 'dark-mode' : ''} ${
            checkFiltersActive() ? 'filters-active' : ''
          } `}
        >
          {il18n.filters}
        </button>
      </form>

      <div className="global-conf-container">
        <div className="theme-container" onClick={toggleTheme}>
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </div>

        <select
          name="language-select"
          id="language-select"
          defaultValue={lang}
          className={theme === 'dark' ? 'dark-mode' : ''}
          onChange={handleLangChange}
        >
          <option value="es">Español</option>
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="pt">Português</option>
        </select>
      </div>
      <FiltersModal isOpen={isFiltersModalOpen} onClose={closeFiltersModal} />
    </div>
  )
}
