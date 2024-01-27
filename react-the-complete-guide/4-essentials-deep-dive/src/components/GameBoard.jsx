const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

export function GameBoard({ onSelectSquare }) {
  // const [gameBoard, setGameBoard] = useState(initialGameBoard)

  // function handleCellClick(rowIndex, cellIndex) {
  //   setGameBoard(prevGameBoard => {
  //     const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])]
  //     updatedBoard[rowIndex][cellIndex] = activePlayerSymbol
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
              {row.map((cell, cellIndex) => {
                return (
                  <li key={cellIndex}>
                    <button onClick={onSelectSquare}>{cell}</button>
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
