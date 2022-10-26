import React, { useReducer, useState, useEffect, useCallback } from "react"

import IngredientForm from "./IngredientForm"
import IngredientList from "./IngredientList"
import ErrorModal from "../UI/ErrorModal"
import Search from "./Search"

const ingredientReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients
    case "ADD":
      return [...state, action.ingredient]
    case "DELETE":
      return state.filter(el => el.id !== action.id)
    default:
      throw new Error("Should not get here!")
  }
}

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, [])
  //const [userIngredients, setUserIngredients] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log("render")
  })

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    //setUserIngredients(filteredIngredients)
    dispatch({ type: "SET", ingredients: filteredIngredients })
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
        //setUserIngredients(prevState => [...prevState, { id: responseData.name, ...ingredient }])
        dispatch({ type: "ADD", ingredient: { id: responseData.name, ...ingredient } })
      })
  }

  const removeIngredientHandler = id => {
    setIsLoading(true)
    fetch(process.env.REACT_APP_API_KEY_DELETE + id + ".json", {
      method: "DELETE",
    })
      .then(response => {
        setIsLoading(false)
        //setUserIngredients(prevState => prevState.filter(el => id !== el.id))
        dispatch({ type: "DELETE", id: id })
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
