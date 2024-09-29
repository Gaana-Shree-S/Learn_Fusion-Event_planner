import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Home, EventList, EventCreate, EventDetails, CalendarPage, Login, Register } from './pages'

function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Event Planner
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/events" className="hover:text-gray-600">
                Events
              </Link>
            </li>
            <li>
              <Link to="/calendar" className="hover:text-gray-600">
                Calendar
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-gray-600">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-4 text-center">
        <p>&copy; 2023 Event Planner. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/events" component={EventList} />
            <Route path="/events/create" component={EventCreate} />
            <Route path="/events/:id" component={EventDetails} />
            <Route path="/calendar" component={CalendarPage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
