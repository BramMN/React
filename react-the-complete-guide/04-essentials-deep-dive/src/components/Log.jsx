export function Log({ gameTurns }) {
  return (
    <ol id="log">
      {gameTurns.map((turn, index) => {
        const { player, square } = turn
        const { row, col } = square

        return (
          <li key={index}>
            <p>
              {player} selected row {row + 1} col {col + 1}
            </p>
          </li>
        )
      })}
    </ol>
  )
}
