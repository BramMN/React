import { createContext, useReducer } from "react"

export const CartContext = createContext({
  items: [],
  addItem: item => {},
  removeItem: id => {},
})

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)

    const updatedItems = [...state.items]

    if (existingCartItemIndex !== -1) {
      const existingItem = state.items[existingCartItemIndex]
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      }
      updatedItems[existingCartItemIndex] = updatedItem
    } else {
      updatedItems.push({ ...action.item, quantity: 1 })
    }

    return { ...state, items: updatedItems }
  }

  if (action.type === "REMOVE_ITEM") {
    const updatedItems = state.items.filter(item => item.id !== action.id)
    return { items: updatedItems }
  }

  return state
}

export function CartContextProvider({ children }) {
  const [] = useReducer(cartReducer, { items: [] })

  function addItem() {}
  function removeItem() {}

  const context = {
    items: [],
    addItem,
    removeItem,
  }

  return <CartContext.Provider value={context}>{children}</CartContext.Provider>
}
