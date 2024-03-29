import { Route, Switch } from "react-router-dom"
import Layout from "./components/layout/Layout"

import AllMeetupsPage from "./pages/AllMeetups"
import FavoritesPage from "./pages/Favorites"
import NewMeetupPage from "./pages/NewMeetup"

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <AllMeetupsPage />
        </Route>
        <Route path="/new-meetup" exact>
          <NewMeetupPage />
        </Route>
        <Route path="/favorites" exact>
          <FavoritesPage />
        </Route>
      </Switch>
    </Layout>
  )
}

export default App
