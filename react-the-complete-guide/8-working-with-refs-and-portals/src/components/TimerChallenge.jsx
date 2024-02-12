import { useState } from "react"

export function TimerChallenge({ title, targetTime }) {
  const [timerExpired, setTimerExpired] = useState(false)
  const [timerStarted, setTimerStarted] = useState(false)

  function handleStart() {
    setTimerStarted(true)

    setTimeout(() => {
      setTimerExpired(true)
    }, targetTime * 1000)
  }

  function handleStop() {}

  return (
    <section className="challenge">
      <h2>{title}</h2>
      {timerExpired && <p>Time's up!</p>}
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? "s" : ""}
      </p>
      <p>
        <button onClick={handleStart}>{timerStarted ? " Stop" : "Start"} Challenge</button>
      </p>
      <p className={timerStarted ? "active" : undefined}>{timerStarted ? "Time is running..." : "Timer inactive"}</p>
    </section>
  )
}
