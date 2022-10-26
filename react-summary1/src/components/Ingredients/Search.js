import React, { useState, useEffect, useRef } from "react"
import useHTTP from "../../hooks/http"

import Card from "../UI/Card"
import ErrorModal from "../UI/ErrorModal"
import "./Search.css"

const Search = React.memo(props => {
  const { onLoadIngredients } = props
  const [enteredFilter, setEnteredFilter] = useState("")
  const inputRef = useRef()
  const { isLoading, data, error, sendRequest, clear } = useHTTP()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query = enteredFilter.length === 0 ? "" : `?orderBy="title"&equalTo="${enteredFilter}"`
        sendRequest(process.env.REACT_APP_API_KEY + query, "GET")
      }
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [enteredFilter, inputRef, sendRequest])

  useEffect(() => {
    if (!isLoading && !error && data) {
      const loadedIngredients = []
      for (const key in data) {
        loadedIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
        })
      }
      onLoadIngredients(loadedIngredients)
    }
  }, [data, error, isLoading, onLoadIngredients])

  return (
    <section className="search">
      {error && <ErrorModal onclose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input type="text" value={enteredFilter} onChange={event => setEnteredFilter(event.target.value)} ref={inputRef} />
        </div>
      </Card>
    </section>
  )
})

export default Search
