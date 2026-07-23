import { barbers } from './config'

const AUTH_KEY = 'rustic-barber-auth'

export type Barber = {
  id: string
  name: string
  username: string
}

export function loginBarber(username: string, password: string): Barber | null {
  const barber = barbers.find(
    (b) => b.username.toLowerCase() === username.trim().toLowerCase() && b.password === password
  )
  if (!barber) return null

  const session: Barber = { id: barber.id, name: barber.name, username: barber.username }
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(session))
  }
  return session
}

export function logoutBarber() {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(AUTH_KEY)
  }
}

export function getCurrentBarber(): Barber | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(AUTH_KEY)
    return raw ? (JSON.parse(raw) as Barber) : null
  } catch {
    return null
  }
}

export function isBarberLoggedIn(): boolean {
  return getCurrentBarber() !== null
}
