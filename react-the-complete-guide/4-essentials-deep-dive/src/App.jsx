import { useState } from "react"
import { GameBoard } from "./components/GameBoard"
import { Player } from "./components/Player"
import { Log } from "./components/Log"
import { WINNING_COMBINATIONS } from "./winning-combinations"
import { GameOver } from "./components/GameOver"

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function deriveActivePlayer(gameTurns) {
  let activePlayer = "X"

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    activePlayer = "O"
  }

  return activePlayer
}

function deriveGameBoard(gameTurns) {
  const gameBoard = [...INITIAL_GAME_BOARD.map(row => [...row])]

  for (const turn of gameTurns) {
    const { player, square } = turn
    const { row, col } = square

    gameBoard[row][col] = player
  }

  return gameBoard
}

function deriveWinner(gameBoard, players) {
  let winner

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col]

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol]
    }
  }

  return winner
}

function App() {
  const [gameTurns, setGameTurns] = useState([])
  const [players, setPlayers] = useState(PLAYERS)

  let gameBoard = deriveGameBoard(gameTurns)
  const winner = deriveWinner(gameBoard, players)
  const activePlayer = deriveActivePlayer(gameTurns)
  const hasDraw = gameTurns.length === 9 && !winner

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns)
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns]

      return updatedTurns
    })
  }

  function handleRestart() {
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol
          id="players"
          className="highlight-player"
        >
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver
            winner={winner}
            onRestart={handleRestart}
          />
        )}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  )
}

export default App
