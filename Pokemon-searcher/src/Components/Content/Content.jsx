import { ThreeDot } from 'react-loading-indicators'
import InfoModal from '../InfoModal/InfoModal.jsx'
import './Content.css'
import { PokemonResult } from '../PokemonResult.jsx'
import { useContent } from '../../hooks/useContent.js'
import { useAppContext } from '../../hooks/useAppContext.js'
import { IL18N } from '../../utils/consts.js'
import { useFilters } from '../../hooks/useFilters.js'
import { useSearch } from '../../hooks/useSearch.js'
import { usePaginator } from '../../hooks/usePaginator.js'

export default function Content() {
  const { openModal, closeModal, selectedPokemon, resultsNumber } = useContent()
  //TODO: se está actualizando en el hook pero no aquí -> solucionar
  const { paginatedResults } = usePaginator()
  const { theme, lang, isModalOpen } = useAppContext()
  const { checkFiltersActive } = useFilters()
  const { search } = useSearch()
  const il18n = IL18N[lang]

  return !paginatedResults ? (
    <div className="content-loading-container">
      <ThreeDot
        variant="bounce"
        size="medium"
        text=""
        textColor=""
        color={theme === 'dark' ? '#fff' : '#000'}
      />
    </div>
  ) : paginatedResults.length > 0 ? (
    <div className="results-container">
      <h2
        className={`${theme === 'dark' ? 'dark-mode' : ''} ${
          checkFiltersActive() && search === '' ? '' : 'hidden'
        }`}
      >
        {`${il18n.results_found} ${resultsNumber}`}
      </h2>

      <div className="results-grid">
        {paginatedResults.map((result, index) => {
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
