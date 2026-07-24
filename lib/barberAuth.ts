import { supabase } from './supabase'
import { barbers } from './config'

const AUTH_KEY = 'rustic-barber-auth'

export type Barber = {
  id: string
  name: string
  email: string
}

export type LoginResult =
  | { success: true; barber: Barber }
  | { success: false; message: string }

function findBarberByEmail(email: string): Barber | null {
  const b = barbers.find((x) => x.email.toLowerCase() === email.toLowerCase())
  return b ? { id: b.id, name: b.name, email: b.email } : null
}

export async function loginBarber(email: string, password: string): Promise<LoginResult> {
  const cleanEmail = email.trim().toLowerCase()
  const { data, error } = await supabase.auth.signInWithPassword({ email: cleanEmail, password })

  if (error) {
    console.error('[loginBarber] Supabase auth error:', error.message)

    const msg = error.message.toLowerCase()
    if (msg.includes('email not confirmed') || msg.includes('not confirmed')) {
      return { success: false, message: 'El email aún no fue confirmado. En Supabase andá a Authentication → Providers → Email y desactivá "Confirm email".' }
    }
    if (msg.includes('invalid login credentials')) {
      return { success: false, message: 'Email o contraseña incorrectos. Verificá que la contraseña sea exactamente "agus" y que el email esté confirmado en Supabase.' }
    }
    return { success: false, message: `No se pudo iniciar sesión: ${error.message}` }
  }

  if (!data.user) {
    return { success: false, message: 'No se pudo iniciar sesión.' }
  }

  // Primero intentamos leer desde Supabase
  try {
    const { data: rows, error: profileError } = await supabase
      .from('barber_profiles')
      .select('barber_id, name, email')
      .eq('email', cleanEmail)
      .limit(1)

    if (profileError) {
      console.error('[loginBarber] Supabase profile error:', profileError.message)
    }

    if (rows && rows.length > 0) {
      const profile = rows[0]
      const barber: Barber = { id: profile.barber_id, name: profile.name, email: cleanEmail }
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(AUTH_KEY, JSON.stringify(barber))
      }
      return { success: true, barber }
    }
  } catch (err) {
    console.error('[loginBarber] Exception reading profile:', err)
  }

  // Fallback: buscar localmente en config.ts
  const fallbackBarber = findBarberByEmail(cleanEmail)
  if (fallbackBarber) {
    console.warn('[loginBarber] Usando fallback local para barbero:', fallbackBarber.email)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(AUTH_KEY, JSON.stringify(fallbackBarber))
    }
    return { success: true, barber: fallbackBarber }
  }

  return { success: false, message: 'Este usuario no está vinculado a ningún barbero. Verificá que exista en la tabla barber_profiles.' }
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
