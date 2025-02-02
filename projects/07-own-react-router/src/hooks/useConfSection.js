import { useGlobalConf } from './useGlobalConf'
import { THEMES } from '../utils/consts'
import { useEffect } from 'react'

export function useConfSection() {
  const { changeLang, lang, theme, toggleTheme } = useGlobalConf()

  useEffect(() => {
    const linkId = 'theme-stylesheet'
    let link = document.getElementById(linkId)

    if (theme === THEMES.LIGHT) {
      if (!link) {
        link = document.createElement('link')
        link.id = linkId
        link.rel = 'stylesheet'
        link.href = 'index.css'
        document.head.appendChild(link)
      }
    } else {
      if (link) link.remove()
    }
  }, [theme])

  const handleThemeChange = () => {
    toggleTheme()
  }

  const handleLangChange = (event) => {
    const newLang = event.target.value
    changeLang(newLang)
  }

  return { theme, lang, handleLangChange, handleThemeChange }
}
