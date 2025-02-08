import { ThreeDot } from 'react-loading-indicators'
import InfoModal from '../InfoModal/InfoModal.jsx'
import './Content.css'
import { PokemonResult } from '../PokemonResult.jsx'
import { useContent } from '../../hooks/useContent.js'
import { useAppContext } from '../../hooks/useAppContext.js'
import { IL18N } from '../../utils/consts.js'
import { useFilters } from '../../hooks/useFilters.js'
import { useSearch } from '../../hooks/useSearch.js'

export default function Content() {
  const { openModal, closeModal, results, selectedPokemon, resultsNumber } =
    useContent()
  const { theme, lang, isModalOpen } = useAppContext()
  const { checkFiltersActive } = useFilters()
  const { search } = useSearch()
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
      <h2
        className={`${theme === 'dark' ? 'dark-mode' : ''} ${
          checkFiltersActive() && search === '' ? '' : 'hidden'
        }`}
      >
        {`Se encontraron ${resultsNumber} resultados`}
      </h2>

      <div className="results-grid">
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
    </div>
  ) : (
    <div
      className={`no-results-container ${theme === 'dark' ? 'dark-mode' : ''}`}
    >
      {il18n.no_results}
    </div>
  )
}
