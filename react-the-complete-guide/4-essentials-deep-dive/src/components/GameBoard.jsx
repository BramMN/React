const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

export function GameBoard({ onSelectSquare, turns }) {
  let gameBoard = initialGameBoard

  for (const turn of turns) {
    const { square, player } = turn
    const { row, col } = square

    gameBoard[row][col] = player
  }

  // const [gameBoard, setGameBoard] = useState(initialGameBoard)

  // function handleCellClick(rowIndex, colIndex) {
  //   setGameBoard(prevGameBoard => {
  //     const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])]
  //     updatedBoard[rowIndex][colIndex] = activePlayerSymbol
  //     return updatedBoard
  //   })

  //   onSelectSquare()
  // }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol>
              {row.map((col, colIndex) => {
                return (
                  <li key={colIndex}>
                    <button onClick={() => onSelectSquare(rowIndex, colIndex)}>{col}</button>
                  </li>
                )
              })}
            </ol>
          </li>
        )
      })}
    </ol>
  )
}
