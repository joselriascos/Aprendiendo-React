import './Header.css'
import { MoonIcon } from '../Icons.jsx'
import { SunIcon } from '../Icons.jsx'
import { useAppContext } from '../../hooks/useAppContext.js'
import { IL18N } from '../../utils/consts.js'
import {  useState } from 'react'

export function Header() {
  const { theme, toggleTheme, lang, changeLang, isModalOpen } = useAppContext()
  const il18n = IL18N[lang]
  const [inputFocused, setInputFocuesed] = useState(false)

  const handleLangChange = (event) => {
    changeLang(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const handleClick = (event) => {
    event.preventDefault()
  }

  return (
    <div
      className={`header-container ${theme === 'dark' ? 'dark-mode' : ''} ${
        inputFocused ? 'input-focused' : ''
      } ${isModalOpen ? 'hidden' : ''} `}
    >
      <h1>Pokemon Searcher</h1>

      <form>
        <input
          type="text"
          placeholder="Pikachu, 154, Bulbasaur, 87..."
          onFocus={() => setInputFocuesed(true)}
          onBlur={() => setInputFocuesed(false)}
          onSubmit={handleSubmit}
        />
        <input
          type="submit"
          value={il18n.search}
          className={theme === 'dark' ? 'dark-mode' : ''}
        />
        <button onClick={handleClick} className={theme === 'dark' ? 'dark-mode' : ''}>
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
    </div>
  )
}
