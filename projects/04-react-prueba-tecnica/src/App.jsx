import { useCatImage } from './hooks/useCatImage'
import { useCatFact } from './hooks/useCatFact'
import './App.css'

export function App() {
  const { fact, refreshFact } = useCatFact()
  const { imageUrl } = useCatImage({ fact })

  // get fact when image is clicked
  const handleClick = async () => {
    refreshFact()
  }

  return (
    <main>
      <h1>App de gatitos</h1>
      {fact && <p>{fact}</p>}
      {fact && imageUrl && (
        <img
          src={imageUrl}
          alt={`cat saying ${fact.split(' ')[0]}`}
          onClick={handleClick}
        />
      )}
    </main>
  )
}
