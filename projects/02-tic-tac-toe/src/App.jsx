import { useState } from "react"

const TURNS = {
  X: 'x',
  O: 'o'
}

const WINNER_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
  [0, 4, 8], [2, 4, 6] // diagonal
]

const Square = ({ children, updateBoard,isSelected, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  )
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  // null es que no hay ganador, false es empate
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a]
        && boardToCheck[a] === boardToCheck[b]
        && boardToCheck[a] === boardToCheck[c]) 
        {
        return boardToCheck[a]
      }
    }
    return null
  }

  const updateBoard = (index) => {
    /* Es una buena práctica crear una copia del estado para no
    modificarlo directamente, sino hacerlo a través de la función que nos
    proporciona setState, es decir, setBoard */

    /* el Spread operator es util para hacer una copia superficial de
    arreglos como en este caso, si se necesitase hacer una copia profunda
    se podría hacer mediante la función structuredClone(array)*/
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)// La actualización de los estados es asíncrona
      alert(`The winner is ${newWinner}`)
    }
  }

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}>
                  {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected = {turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected = {turn === TURNS.O}>{TURNS.O}</Square>
      </section>
    </main>
  )
}

export default App