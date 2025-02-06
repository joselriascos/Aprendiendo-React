import { useState } from 'react'
import { ThreeDot } from 'react-loading-indicators'

export function PokemonResult({ result, theme, onClick }) {
  const [isLoading, setIsLoading] = useState(true)
  const { pokemon } = result
  const { name, url } = pokemon ? pokemon : result
  const id = url.slice(url.lastIndexOf('pokemon') + 8, url.lastIndexOf('/'))
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

  return (
    <div
      className={`result ${theme === 'dark' ? 'dark-mode' : ''}`}
      onClick={() => onClick(id)}
    >
      {isLoading && (
        <div className="loading-container">
          <ThreeDot
            variant="bounce"
            size="medium"
            text=""
            textColor=""
            color={theme === 'dark' ? '#000' : '#fff'}
          />
        </div>
      )}
      <img
        src={imgUrl}
        alt={`${name} sprite`}
        onLoad={() => setIsLoading(false)}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
      <h3>{name}</h3>
      <h4>{`# ${id}`}</h4>
    </div>
  )
}
