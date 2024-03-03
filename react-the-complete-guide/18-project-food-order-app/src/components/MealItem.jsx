import { useContext } from "react"
import { currencyFormatter } from "../util/formatting"
import { Button } from "./UI/Button"
import { CartContext } from "../store/CartContext"

export function MealItem({ name, description, price, image }) {
  const cartCtx = useContext(CartContext)

  function handleAddMealToCart() {
    cartCtx.addItem({
      name,
      description,
      price,
      image,
    })
  }

  return (
    <li className="meal-item">
      <article>
        <img
          src={`http://localhost:3000/${image}`}
          alt={name}
        />
        <div>
          <h3>{name}</h3>
          <p className="meal-item-price">{currencyFormatter.format(price)}</p>
          <p className="meal-item-description">{description}</p>
        </div>
        <div className="meal-item-actions">
          <Button onClick={handleAddMealToCart}>Add to Cart</Button>
        </div>
      </article>
    </li>
  )
}
