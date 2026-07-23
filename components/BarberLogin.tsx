'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Lock, LogIn } from 'lucide-react'
import { loginBarber } from '@/lib/barberAuth'

export default function BarberLogin() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const barber = loginBarber(username, password)
    if (barber) {
      router.push('/dashboard')
    } else {
      setError('Usuario o contraseña incorrectos.')
    }
  }

  return (
    <div className="frame-ornate card-glow mx-auto w-full max-w-md rounded-2xl bg-wood-800 p-6 md:p-8">
      <div className="mb-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
          <LogIn className="h-6 w-6" />
        </div>
        <h2 className="font-vintage mt-4 text-2xl font-bold text-gold md:text-3xl">
          Acceso barberos
        </h2>
        <p className="mt-2 text-sm text-cream/70">
          Ingresá tus credenciales para ver tu agenda.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-cream">
            <User className="h-4 w-4 text-gold" /> Usuario
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="reyjulian"
            className="input-wood w-full"
          />
        </div>

        <div>
          <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-cream">
            <Lock className="h-4 w-4 text-gold" /> Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••"
            className="input-wood w-full"
          />
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-900/20 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <button type="submit" className="btn-rustic w-full text-lg font-bold">
          <LogIn className="h-5 w-5" />
          Ingresar
        </button>
      </form>

      <div className="mt-6 rounded-xl border border-gold/10 bg-wood-900/50 p-4 text-xs text-cream/60">
        <p className="mb-2 font-semibold text-gold">Usuarios de prueba:</p>
        <ul className="space-y-1">
          <li>reyjulian / agus</li>
          <li>carajaula / agus</li>
          <li>saraza / agus</li>
        </ul>
      </div>
    </div>
  )
}
