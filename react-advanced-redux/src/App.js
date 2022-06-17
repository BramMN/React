import { Fragment, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import Cart from "./components/Cart/Cart"
import Layout from "./components/Layout/Layout"
import Products from "./components/Shop/Products"
import { uiActions } from "./store/ui-slice"
import Notification from "./components/UI/Notification"

let isInitial = true

function App() {
  const dispatch = useDispatch()
  const showCart = useSelector(state => state.ui.cartIsVisible)
  const cart = useSelector(state => state.cart)
  const notification = useSelector(state => state.ui.notification)

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotificaion({
          status: "pending",
          title: "sending...",
          message: "sending cart data",
        })
      )
      const response = await fetch("", {
        method: "PUT",
        body: JSON.stringify(cart),
      })

      if (!response.ok) {
        throw new Error("error")
      }

      dispatch(
        uiActions.showNotificaion({
          status: "success",
          title: "success",
          message: "sent cart data successfully",
        })
      )
    }

    if (isInitial) {
      isInitial = false
      return
    }

    sendCartData().catch(error => {
      dispatch(
        uiActions.showNotificaion({
          status: "error",
          title: "error",
          message: "sending cart data failed",
        })
      )
    })
  }, [cart, dispatch])

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  )
}

export default App
