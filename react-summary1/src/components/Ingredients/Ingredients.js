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
  const { isLoading, error, data, sendRequest, reqExtra, reqIdentifier } = useHTTP()
  const [userIngredients, dispatch] = useReducer(ingredientReducer, [])
  //const [userIngredients, setUserIngredients] = useState([])
  //const [isLoading, setIsLoading] = useState(false)
  //const [error, setError] = useState(null)

  useEffect(() => {
    if (!isLoading && !error && reqIdentifier === "REMOVE_INGREDIENT") {
      dispatch({ type: "DELETE", id: reqExtra })
    } else if (!isLoading && !error && reqIdentifier === "ADD_INGREDIENT") {
      dispatch({ type: "ADD", ingredient: { id: data.name, ...reqExtra } })
    }
  }, [data, error, isLoading, reqExtra, reqIdentifier])

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    //setUserIngredients(filteredIngredients)
    dispatch({ type: "SET", ingredients: filteredIngredients })
  }, [])

  const addIngredientHandler = useCallback(ingredient => {
    sendRequest(process.env.REACT_APP_API_KEY, "POST", JSON.stringify(ingredient), ingredient, "ADD_INGREDIENT")
    // dispatchHttp({ type: "SEND" })
    // fetch(process.env.REACT_APP_API_KEY, {
    //   method: "POST",
    //   body: JSON.stringify(ingredient),
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then(response => {
    //     dispatchHttp({ type: "RESPONSE" })
    //     return response.json()
    //   })
    //   .then(responseData => {
    //     //setUserIngredients(prevState => [...prevState, { id: responseData.name, ...ingredient }])
    //     dispatch({ type: "ADD", ingredient: { id: responseData.name, ...ingredient } })
    //   })
  }, [])

  const removeIngredientHandler = useCallback(id => {
    sendRequest(process.env.REACT_APP_API_KEY_DELETE + id + ".json", "DELETE", null, id, "REMOVE_INGREDIENT")
  }, [sendRequest])

  const clearError = useCallback(() => {
    //dispatchHttp({ type: "CLEAR" })
  }, [])

  const ingredientList = useMemo(() => {
    return <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
  }, [removeIngredientHandler, userIngredients])

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  )
}

export default Ingredients
