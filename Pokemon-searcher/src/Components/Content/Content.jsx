import { useState } from 'react'
import { useAppContext } from '../../hooks/useAppContext.js'
import { ThreeDot } from 'react-loading-indicators'
import data from '../../mocks/general_results.json'
import InfoModal from '../InfoModal/InfoModal.jsx'
import './Content.css'

const results = data.results

export default function Content() {
  const { theme, isModalOpen, changeIsModalOpen } = useAppContext()
  const [selectedPokemon, setSelectedPokemon] = useState(null)

  const className = `result ${theme === 'dark' ? 'dark-mode' : ''}`

  const openModal = (id) => {
    if (!id) return
    changeIsModalOpen(true)
    setSelectedPokemon(id)
  }

  const closeModal = () => {
    changeIsModalOpen(false)
    setSelectedPokemon(null)
  }

  return (
    <div className="results-container">
      {results.map((result) => {
        const { name, url } = result
        const id = url.slice(
          url.lastIndexOf('pokemon') + 8,
          url.lastIndexOf('/')
        )
        const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        const [isLoading, setIsLoading] = useState(true)

        return (
          <div className={className} key={name} onClick={() => openModal(id)}>
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
      })}

      {selectedPokemon && (
        <InfoModal
          isOpen={isModalOpen}
          onClose={closeModal}
          id={selectedPokemon}
        />
      )}
    </div>
  )
}
