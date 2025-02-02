import { createContext, useState } from 'react'

export const GlobalConf = createContext()

function useGlobalConfProvider() {
  const initialLang = window.localStorage.getItem('lang') || 'es'
  const initialTheme = window.localStorage.getItem('theme') || 'dark'

  const [lang, setLang] = useState(initialLang)
  const [theme, setTheme] = useState(initialTheme)

  const changeLang = (newLang) => {
    setLang(newLang)
    window.localStorage.setItem('lang', newLang)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    window.localStorage.setItem('theme', newTheme)
  }

  return { lang, changeLang, theme, toggleTheme }
}

export function GlobalConfProvider({ children }) {
  const { lang, changeLang, theme, toggleTheme } = useGlobalConfProvider()
  return (
    <GlobalConf.Provider
      value={{
        lang,
        changeLang,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </GlobalConf.Provider>
  )
}
