import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './Square'
import { WinnerModal } from './WinnerModal'
import { TURNS } from '../utils/constants'
import { checkWinnerFrom, checkEndGame } from '../logic/board'

export function Board() {

  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  // null es que no hay ganador, false es empate
  const [winner, setWinner] = useState(null)

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
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
        confetti()
        setWinner(newWinner)// La actualización de los estados es asíncrona
        return
    } else if (checkEndGame(newBoard)) {
        setWinner(false)
        return
    }
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
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

      <WinnerModal winner = {winner} resetGame = {resetGame}/>
    </main>
  )
}