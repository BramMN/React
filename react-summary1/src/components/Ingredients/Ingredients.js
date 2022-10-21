import React, { useState, useEffect, useCallback } from "react"

import IngredientForm from "./IngredientForm"
import Search from "./Search"
import IngredientList from "./IngredientList"

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([])

  // useEffect(() => {
  //   console.log("render")
  // })

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients)
  }, [])

  const addIngredientHandler = ingredient => {
    fetch(process.env.REACT_APP_API_KEY, {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: { "Content-Type": "application/json" },
    })
      .then(response => {
        return response.json()
      })
      .then(responseData => {
        setUserIngredients(prevState => [...prevState, { id: responseData.name, ...ingredient }])
      })
  }

  const removeIngredientHandler = id => {
    fetch(process.env.REACT_APP_API_KEY_DELETE + id + ".json", {
      method: "DELETE",
    }).then(response => {
      setUserIngredients(prevState => prevState.filter(el => id !== el.id))
    })
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  )
}

export default Ingredients
