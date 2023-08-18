import { useState } from "react"

const TURNS = {
  X: 'x',
  O: 'o'
}

// Dibuja los cuadrados del tablero
// eslint-disable-next-line react/prop-types
const Square = ({ children, isSelected, updateBoard, index}) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleCLick = () => {
    updateBoard(index) //el index nos dira en que Square se dio click
  }

  return (
    <div onClick={handleCLick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null)) // Cantidad de Squares
  
  const [turn, setTurn] = useState(TURNS.X)
   //null si no hay ganador, false empate
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    // revisamos las combinaciones ganadoras para ver quien gana
    for (const combo of WINNER_COMBOS) {
      const [a,b,c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] == boardToCheck[b] &&
        boardToCheck[a] == boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    //si no hay ganador
    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
      //revisar si hay empate
      // y si no hay espacios vacios en el tablero
      return newBoard.every((square) => square != null)
  } 

  const updateBoard = (index) => {
    // no actualizamos posicion que ya tenga algo distinto de null
    if (board[index] || winner) return
    // actualiza el tablero
    const newBoard = [ ... board]
    newBoard[index] = turn
    setBoard(newBoard)
    // cambiar el turno
    // Si es turno de X => el proximo turno es de O, y si es turno de O =>
    // el proximo turno es de X
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // comprobar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner){
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }


  // _ es la primera posicion, tambien podemos usar square
  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
      {
        board.map((_, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {board[index]}
            </Square>
          )
        })
      }
      </section>

      <section className="turn">
        <Square isSelected={turn == TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn == TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      {
        winner != null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner == false ? 'Empate'
                  : 'Ganador: ' + winner
                }
              </h2>

              <header className="win">
                {
                  winner && <Square>
                    {winner}
                  </Square>
                }
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}
  
export default App
