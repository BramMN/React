import React, { useState, useCallback } from "react"

import "./App.css"
import DemoOutput from "./components/Demo/DemoOutput"
import Button from "./components/UI/Button/Button"

function App() {
  const [showParagraph, setShowParagraph] = useState(false)
  const [allowToggle, setAllowToggle] = useState(false)

  console.log("App Running")

  const toggleParagraphHandler = useCallback(() => {
    if (allowToggle) {
      setShowParagraph(showParagraph => !showParagraph)
    }
  }, [allowToggle])

  const allowToggleHandler = () => {
    setAllowToggle(true)
  }

  return (
    <div className='app'>
      <h1>Hi there!</h1>
      <DemoOutput show={showParagraph} />
      <Button onClick={allowToggleHandler}>Allow Toggle</Button>
      <Button onClick={toggleParagraphHandler}>Show Paragraph</Button>
    </div>
  )
}

export default App
