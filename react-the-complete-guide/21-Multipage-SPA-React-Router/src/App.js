import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { HomePage } from "./pages/Home"
import { ProductsPage } from "./pages/Products"
import { RootLayout } from "./pages/Root"
import { ErrorPage } from "./pages/Error"
import { ProductDetailPage } from "./pages/ProductDetail"

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
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", Component: HomePage },
      { path: "products", Component: ProductsPage },
      { path: "products/:productId", Component: ProductDetailPage },
    ],
  },
])

// const router = createBrowserRouter(routeDefinitions)

function App() {
  return <RouterProvider router={router} />
}

export default App
