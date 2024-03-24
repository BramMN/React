import { useState } from "react"

export function Player({ initialName, symbol, isActive, onChangeName }) {
  const [isEditing, setIsEditing] = useState(false)
  const [playerName, setPlayerName] = useState(initialName)

  const handleEdit = () => {
    setIsEditing(isEditing => !isEditing)
    if (isEditing) {
      onChangeName(symbol, playerName)
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value)
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            required
            value={playerName}
            onChange={handleChange}
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  )
}
