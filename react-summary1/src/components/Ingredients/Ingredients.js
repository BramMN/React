import React, { useState, useEffect, useCallback } from "react"

import IngredientForm from "./IngredientForm"
import IngredientList from "./IngredientList"
import ErrorModal from "../UI/ErrorModal"
import Search from "./Search"

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log("render")
  })

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients)
  }, [])

  const addIngredientHandler = ingredient => {
    setIsLoading(true)
    fetch(process.env.REACT_APP_API_KEY, {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: { "Content-Type": "application/json" },
    })
      .then(response => {
        setIsLoading(false)
        return response.json()
      })
      .then(responseData => {
        setUserIngredients(prevState => [...prevState, { id: responseData.name, ...ingredient }])
      })
  }

  const removeIngredientHandler = id => {
    setIsLoading(true)
    fetch(process.env.REACT_APP_API_KEY_DELETE + id + ".json", {
      method: "DELETE",
    })
      .then(response => {
        setIsLoading(false)
        setUserIngredients(prevState => prevState.filter(el => id !== el.id))
      })
      .catch(error => {
        setError(error.message)
        setIsLoading(false)
      })
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  )
}

export default Ingredients
