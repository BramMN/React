import { useEffect, useState } from "react"

export function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout)

  useEffect(() => {
    setTimeout(onTimeout, timeout)

    return () => clearTimeout()
  }, [timeout, onTimeout])

  useEffect(() => {
    setInterval(() => {
      setRemainingTime(prevRemainingTime => prevRemainingTime - 100)
    }, 100)

    return () => clearInterval()
  }, [])

  return (
    <progress
      id="question-time"
      max={timeout}
      value={remainingTime}
    />
  )
}
