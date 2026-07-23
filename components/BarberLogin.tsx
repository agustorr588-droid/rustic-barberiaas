'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Lock, LogIn } from 'lucide-react'
import { loginBarber } from '@/lib/barberAuth'

export default function BarberLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    setError('')
    try {
      const result = await loginBarber(email, password)
      if (result.success) {
        router.push('/dashboard')
      } else {
        setError(result.message)
      }
    } finally {
      setLoading(false)
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
            <User className="h-4 w-4 text-gold" /> Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="reyjulian@rustic.com"
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

        <button
          type="submit"
          disabled={loading}
          className="btn-rustic w-full text-lg font-bold disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-wood-900 border-t-transparent" />
              Ingresando...
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <LogIn className="h-5 w-5" />
              Ingresar
            </span>
          )}
        </button>
      </form>

      <div className="mt-6 rounded-xl border border-gold/10 bg-wood-900/50 p-4 text-xs text-cream/60">
        <p className="font-semibold text-gold">Acceso exclusivo para barberos</p>
        <p className="mt-1">Usá el email completo asignado por la barbería.</p>
      </div>
    </div>
  )
}
