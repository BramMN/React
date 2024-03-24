import { uiActions } from "./ui-slice"
import { cartActions } from "./cart-slice"

export const fetchCartData = () => {
  return async dispatch => {
    const fetchData = async () => {
      const response = await fetch("")

      if (!response.ok) {
        throw new Error("Could not fetch cart data")
      }

      const data = await response.json()

      return data
    }

    try {
      const cartData = await fetchData()
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      )
    } catch (error) {
      dispatch(
        uiActions.showNotificaion({
          status: "error",
          title: "error",
          message: "fetching cart data failed",
        })
      )
    }
  }
}

export const sendCartData = cart => {
  return async dispatch => {
    dispatch(
      uiActions.showNotificaion({
        status: "pending",
        title: "sending...",
        message: "sending cart data",
      })
    )

    const sendRequest = async () => {
      const response = await fetch("", {
        method: "PUT",
        body: JSON.stringify({ items: cart.items, totalQuantity: cart.totalQuantity }),
      })

      if (!response.ok) {
        throw new Error("error")
      }
    }

    try {
      await sendRequest()

      dispatch(
        uiActions.showNotificaion({
          status: "success",
          title: "success",
          message: "sent cart data successfully",
        })
      )
    } catch (error) {
      dispatch(
        uiActions.showNotificaion({
          status: "error",
          title: "error",
          message: "sending cart data failed",
        })
      )
    }
  }
}
