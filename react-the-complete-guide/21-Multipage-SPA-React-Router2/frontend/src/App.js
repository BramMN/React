// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { NewEventPage } from "./pages/NewEvent"
import { EventDetailPage } from "./pages/EventDetail"
import { EditEventPage } from "./pages/EditEvent"
import { EventsPage } from "./pages/Events"
import { HomePage } from "./pages/Home"
import { RootLayout } from "./pages/Root"
import { EventsRoot } from "./pages/EventsRoot"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, Component: HomePage },
      {
        path: "events",
        element: <EventsRoot />,
        children: [
          {
            index: true,
            Component: EventsPage,
            loader: async () => {
              const response = await fetch("http://localhost:8080/events")

              if (!response.ok) {
                // ...
              } else {
                const resData = await response.json()
                return resData.events
              }
            },
          },
          { path: "new", Component: NewEventPage },
          { path: ":eventId", Component: EventDetailPage },
          { path: ":eventId/edit", Component: EditEventPage },
        ],
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
