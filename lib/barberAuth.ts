import { supabase } from './supabase'

const AUTH_KEY = 'rustic-barber-auth'

export type Barber = {
  id: string
  name: string
  email: string
}

export async function loginBarber(email: string, password: string): Promise<Barber | null> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error || !data.user) return null

  const { data: profile } = await supabase
    .from('barber_profiles')
    .select('barber_id, name')
    .eq('email', email)
    .single()

  if (!profile) return null

  const session: Barber = { id: profile.barber_id, name: profile.name, email }
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(session))
  }
  return session
}

export function logoutBarber() {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(AUTH_KEY)
  }
  supabase.auth.signOut().catch(() => {})
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
