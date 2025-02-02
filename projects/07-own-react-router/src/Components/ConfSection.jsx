import { DarkModeIcon } from './DarkModeIcon'
import { LightModeIcon } from './LightModeIcon'
import { useConfSection } from '../hooks/useConfSection'
import { Tooltip } from 'react-tooltip'
import { IL18N } from '../utils/consts'
import { useEffect, useState } from 'react'

export function ConfSection() {
  const { theme, lang, handleLangChange, handleThemeChange } = useConfSection()
  const [isTouchScreen, setIsTouchScreen] = useState(false)

  useEffect(() => {
    // Detects if the device is a touch screen
    setIsTouchScreen('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  const text = IL18N.confSection[lang]

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'center',
        gap: ' 20px ',
        paddingTop: '20px',
      }}
    >
      <div
        className="theme-container"
        onClick={handleThemeChange}
        style={{
          width: '30px',
          height: '30px',
          cursor: 'pointer',
        }}
        data-tooltip-id="theme-tooltip"
      >
        {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
      </div>
      {!isTouchScreen && (
        <Tooltip
          id="theme-tooltip"
          content={
            theme === 'dark' ? text.change_to_light : text.change_to_dark
          }
        />
      )}

      <select
        onChange={handleLangChange}
        style={{ cursor: 'pointer' }}
        defaultValue={lang}
      >
        <option value="es">Español</option>
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="pt">Português</option>
      </select>
    </div>
  )
}
