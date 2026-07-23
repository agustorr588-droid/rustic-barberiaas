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
  const cleanEmail = email.trim().toLowerCase()
  const { data, error } = await supabase.auth.signInWithPassword({ email: cleanEmail, password })

  if (error) {
    // Logueamos el error exacto para poder depurar desde la consola del navegador
    console.error('[loginBarber] Supabase error:', error.message)

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

  // Buscamos el perfil sin importar mayúsculas/minúsculas
  const { data: profile, error: profileError } = await supabase
    .from('barber_profiles')
    .select('barber_id, name, email')
    .ilike('email', cleanEmail)
    .maybeSingle()

  console.log('[loginBarber] cleanEmail:', cleanEmail)
  console.log('[loginBarber] profile:', profile)
  console.log('[loginBarber] profileError:', profileError)

  if (profileError) {
    return { success: false, message: `Error al leer el perfil: ${profileError.message}` }
  }

  if (!profile) {
    return { success: false, message: 'Este usuario no está vinculado a ningún barbero. Verificá que exista en la tabla barber_profiles.' }
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
