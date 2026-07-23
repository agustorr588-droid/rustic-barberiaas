import { supabase } from './supabase'

const AUTH_KEY = 'rustic-barber-auth'

export type Barber = {
  id: string
  name: string
  email: string
}

export type LoginResult =
  | { success: true; barber: Barber }
  | { success: false; message: string }

export async function loginBarber(email: string, password: string): Promise<LoginResult> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    if (error.message.toLowerCase().includes('email not confirmed')) {
      return { success: false, message: 'El email aún no fue confirmado. Desactivá la confirmación por email en Supabase o usá un email real.' }
    }
    return { success: false, message: 'Email o contraseña incorrectos.' }
  }
  if (!data.user) {
    return { success: false, message: 'No se pudo iniciar sesión.' }
  }

  const { data: profile } = await supabase
    .from('barber_profiles')
    .select('barber_id, name')
    .eq('email', email)
    .single()

  if (!profile) {
    return { success: false, message: 'Este usuario no está vinculado a ningún barbero.' }
  }

  const barber: Barber = { id: profile.barber_id, name: profile.name, email }
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(barber))
  }
  return { success: true, barber }
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
