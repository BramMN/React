import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { HomePage } from "./pages/Home"
import { ProductsPage } from "./pages/Products"

const router = createBrowserRouter([
  { path: "/", Component: HomePage },
  { path: "/products", Component: ProductsPage },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
