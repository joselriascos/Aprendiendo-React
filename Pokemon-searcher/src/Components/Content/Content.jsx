import { ThreeDot } from 'react-loading-indicators'
import InfoModal from '../InfoModal/InfoModal.jsx'
import './Content.css'
import { PokemonResult } from '../PokemonResult.jsx'
import { useContent } from '../../hooks/useContent.js'
import { useAppContext } from '../../hooks/useAppContext.js'
import { IL18N } from '../../utils/consts.js'

export default function Content() {
  const { openModal, closeModal, results, selectedPokemon } = useContent()
  const { theme, lang, isModalOpen } = useAppContext()
  const il18n = IL18N[lang]

  return !results ? (
    <div className="content-loading-container">
      <ThreeDot
        variant="bounce"
        size="medium"
        text=""
        textColor=""
        color={theme === 'dark' ? '#fff' : '#000'}
      />
    </div>
  ) : results.length > 0 ? (
    <div className="results-container">
      {results.map((result, index) => {
        return (
          <PokemonResult
            result={result}
            key={index}
            theme={theme}
            onClick={openModal}
          />
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
  ) : (
    <div
      className={`no-results-container ${theme === 'dark' ? 'dark-mode' : ''}`}
    >
      {il18n.no_results}
    </div>
  )
}
