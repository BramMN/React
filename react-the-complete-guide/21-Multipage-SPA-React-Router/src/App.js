import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { HomePage } from "./pages/Home"
import { ProductsPage } from "./pages/Products"

// const routeDefinitions = createRoutesFromElements(
//   <Route>
//     <Route
//       path="/"
//       element={<HomePage />}
//     />
//     <Route
//       path="/products"
//       element={<ProductsPage />}
//     />
//   </Route>
// )

const router = createBrowserRouter([
  { path: "/", Component: HomePage },
  { path: "/products", Component: ProductsPage },
])

// const router = createBrowserRouter(routeDefinitions)

function App() {
  return <RouterProvider router={router} />
}

export default App
