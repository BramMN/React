import React, { useReducer, useEffect, useCallback, useMemo } from "react"

import IngredientForm from "./IngredientForm"
import IngredientList from "./IngredientList"
import ErrorModal from "../UI/ErrorModal"
import Search from "./Search"
import useHTTP from "../../hooks/http"

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
  const { isLoading, error, data, sendRequest, reqExtra, reqIdentifier, clear } = useHTTP()
  const [userIngredients, dispatch] = useReducer(ingredientReducer, [])

  useEffect(() => {
    if (!isLoading && !error && reqIdentifier === "REMOVE_INGREDIENT") {
      dispatch({ type: "DELETE", id: reqExtra })
    } else if (!isLoading && !error && reqIdentifier === "ADD_INGREDIENT") {
      dispatch({ type: "ADD", ingredient: { id: data.name, ...reqExtra } })
    }
  }, [data, error, isLoading, reqExtra, reqIdentifier])

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({ type: "SET", ingredients: filteredIngredients })
  }, [])

  const addIngredientHandler = useCallback(ingredient => {
    sendRequest(process.env.REACT_APP_API_KEY, "POST", JSON.stringify(ingredient), ingredient, "ADD_INGREDIENT")
  }, [sendRequest])

  const removeIngredientHandler = useCallback(id => {
    sendRequest(process.env.REACT_APP_API_KEY_DELETE + id + ".json", "DELETE", null, id, "REMOVE_INGREDIENT")
  }, [sendRequest])

  const ingredientList = useMemo(() => {
    return <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
  }, [removeIngredientHandler, userIngredients])

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  )
}

export default Ingredients
