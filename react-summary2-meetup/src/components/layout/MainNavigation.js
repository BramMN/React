import { Link } from "react-router-dom"

const MainNavigation = () => {
  return (
    <header>
      <div>React Meetups</div>
      <ul>
        <li>
          <Link to="/">All Meetups</Link>
        </li>
        <li>
          <Link to="/new-meetup">Add New Meetups</Link>
        </li>
        <li>
          <Link to="/favorites">My Favorites</Link>
        </li>
      </ul>
    </header>
  )
}

export default MainNavigation
