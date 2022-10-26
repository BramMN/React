import React, { useReducer, useEffect, useCallback, useMemo } from "react"

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

const httpReducer = (state, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null }
    case "RESPONSE":
      return { ...state, loading: false }
    case "ERROR":
      return { loading: false, error: action.errorMessage }
    case "CLEAR":
      return { ...state, error: null }
    default:
      throw new Error("Should not get here!")
  }
}

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, [])
  const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null })
  //const [userIngredients, setUserIngredients] = useState([])
  //const [isLoading, setIsLoading] = useState(false)
  //const [error, setError] = useState(null)

  useEffect(() => {
    console.log("render")
  })

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    //setUserIngredients(filteredIngredients)
    dispatch({ type: "SET", ingredients: filteredIngredients })
  }, [])

  const addIngredientHandler = useCallback(ingredient => {
    dispatchHttp({ type: "SEND" })
    fetch(process.env.REACT_APP_API_KEY, {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: { "Content-Type": "application/json" },
    })
      .then(response => {
        dispatchHttp({ type: "RESPONSE" })
        return response.json()
      })
      .then(responseData => {
        //setUserIngredients(prevState => [...prevState, { id: responseData.name, ...ingredient }])
        dispatch({ type: "ADD", ingredient: { id: responseData.name, ...ingredient } })
      })
  }, [])

  const removeIngredientHandler = useCallback(id => {
    dispatchHttp({ type: "SEND" })
    fetch(process.env.REACT_APP_API_KEY_DELETE + id + ".json", {
      method: "DELETE",
    })
      .then(response => {
        dispatchHttp({ type: "RESPONSE" })
        //setUserIngredients(prevState => prevState.filter(el => id !== el.id))
        dispatch({ type: "DELETE", id: id })
      })
      .catch(error => {
        dispatchHttp({ type: "ERROR", errorMessage: error.message })
      })
  }, [])

  const clearError = useCallback(() => {
    dispatchHttp({ type: "CLEAR" })
  }, [])

  const ingredientList = useMemo(() => {
    return <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
  }, [removeIngredientHandler, userIngredients])

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredientHandler} loading={httpState.loading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  )
}

export default Ingredients
