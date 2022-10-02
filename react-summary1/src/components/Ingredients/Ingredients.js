import React, { useState, useEffect } from "react"

import IngredientForm from "./IngredientForm"
import Search from "./Search"
import IngredientList from "./IngredientList"

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([])

  useEffect(() => {
    fetch(process.env.REACT_APP_API_KEY)
      .then(response => response.json())
      .then(responseData => {
        const loadedIngredients = []
        for (const key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          })
        }
        setUserIngredients(loadedIngredients)
      })
  }, [])

  const addIngredientHandler = ingredient => {
    console.log(process.env.REACT_APP_API_KEY)
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
    setUserIngredients(prevState => prevState.filter(el => id !== el.id))
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  )
}

export default Ingredients
