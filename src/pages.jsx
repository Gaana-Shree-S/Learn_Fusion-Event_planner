import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Input, Textarea } from './components/ui'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

// This would typically come from an API
const events = [
  { id: 1, title: 'Summer Music Festival', date: '2023-07-15' },
  { id: 2, title: 'Tech Conference 2023', date: '2023-08-22' },
  { id: 3, title: 'Community Cleanup Day', date: '2023-09-05' },
]

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 text-center">
      <h1 className="text-4xl font-bold">Welcome to Event Planner</h1>
      <p className="text-xl max-w-2xl">
        Plan, manage, and attend events with ease. Create your own events or RSVP to others.
      </p>
      <div className="space-x-4">
        <Button asChild>
          <Link to="/events">Browse Events</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/events/create">Create Event</Link>
        </Button>
      </div>
    </div>
  )
}

export function EventList() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-gray-600">{event.date}</p>
            <Button asChild className="mt-2">
              <Link to={`/events/${event.id}`}>View Details</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export function EventCreate() {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log({ title, date, description })
    // Reset form or redirect
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label htmlFor="title" className="block mb-2">
            Event Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date" className="block mb-2">
            Event Date
          </label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2">
            Event Description
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Create Event</Button>
      </form>
    </div>
  )
}

export function EventDetails() {
  const { id } = useParams()
  const [isRsvp, setIsRsvp] = useState(false)

  const handleRsvp = () => {
    // Here you would typically send the RSVP to your backend
    setIsRsvp(true)
  }

  // This would typically come from an API based on the id
  const event = {
    id: 1,
    title: 'Summer Music Festival',
    date: '2023-07-15',
    description: 'Join us for a day of great music and fun!',
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p className="text-xl mb-2">Date: {event.date}</p>
      <p className="mb-4">{event.description}</p>
      <Button onClick={handleRsvp} disabled={isRsvp}>
        {isRsvp ? 'RSVP Confirmed' : 'RSVP'}
      </Button>
    </div>
  )
}

export function CalendarPage() {
  const calendarEvents = [
    {
      title: 'Summer Music Festival',
      start: new Date(2023, 6, 15),
      end: new Date(2023, 6, 15),
    },
    {
      title: 'Tech Conference 2023',
      start: new Date(2023, 7, 22),
      end: new Date(2023, 7, 24),
    },
    {
      title: 'Community Cleanup Day',
      start: new Date(2023, 8, 5),
      end: new Date(2023, 8, 5),
    },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Event Calendar</h1>
      <div style={{ height: '500px' }}>
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    </div>
  )
}

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the login request to your backend
    console.log({ email, password })
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <div>
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <p className="text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  )
}

export function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the registration request to your backend
    console.log({ name, email, password })
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Register</h1>
        <div>
          <label htmlFor="name" className="block mb-2">
            Name
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Register
        </Button>
        <p className="text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  )
}
