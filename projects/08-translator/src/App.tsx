import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useApp } from './hooks/useApp'

function App() {
  const { fromLanguage, setFromLenguage } = useApp()

  console.log(fromLanguage)

  return (
    <div className="App">
      <h1>Translator</h1>
      <button
        onClick={() => {
          setFromLenguage('es')
        }}
      >
        Cambiar a español
      </button>
    </div>
  )
}

export default App
