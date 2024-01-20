import React from "react"
import { BrowserRouter } from "react-router-dom"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App"
import { FavoritesContextProvider } from "./components/store/favorites-context"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <FavoritesContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FavoritesContextProvider>
)
