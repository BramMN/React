import { useEffect, useState } from "react"
import { MealItem } from "./MealItem"

export function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([])

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch("http://localhost:3000/meals")

      if (!response.ok) {
        throw new Error("Failed to fetch meals")
      }

      const meals = await response.json()
      setLoadedMeals(meals)
    }

    fetchMeals()
  }, [])

  return (
    <ul id="meals">
      {loadedMeals.map(meal => (
        <MealItem
          key={meal.id}
          {...meal}
        />
      ))}
    </ul>
  )
}
