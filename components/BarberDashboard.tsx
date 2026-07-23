'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  LogOut,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  User,
  DollarSign,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { logoutBarber, getCurrentBarber, type Barber } from '@/lib/barberAuth'
import { getAppointmentsByBarber, deleteAppointment, type Appointment } from '@/lib/appointments'
import { appointment as appointmentConfig, services } from '@/lib/config'

export default function BarberDashboard() {
  const router = useRouter()
  const [barber, setBarber] = useState<Barber | null>(null)
  const [date, setDate] = useState<string>(() => new Date().toISOString().split('T')[0])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const current = getCurrentBarber()
    if (!current) {
      router.replace('/login')
      return
    }
    setBarber(current)
  }, [router])

  useEffect(() => {
    if (!barber) return
    let cancelled = false
    setLoading(true)
    setError(null)
    getAppointmentsByBarber(barber.id, date)
      .then((items) => {
        if (!cancelled) setAppointments(items)
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Error al cargar agenda.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [barber, date])

  const timeSlots = useMemo(() => {
    const slots: string[] = []
    const { minHour, maxHour, stepMinutes } = appointmentConfig
    for (let h = minHour; h < maxHour; h++) {
      for (let m = 0; m < 60; m += stepMinutes) {
        slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
      }
    }
    return slots
  }, [])

  const slotsWithStatus = useMemo(() => {
    const map = new Map(appointments.map((a) => [a.time, a]))
    return timeSlots.map((time) => ({ time, appointment: map.get(time) || null }))
  }, [timeSlots, appointments])

  const handleLogout = () => {
    logoutBarber()
    router.replace('/login')
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteAppointment(id)
      setAppointments((prev) => prev.filter((a) => a.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo cancelar el turno.')
    }
  }

  const changeDate = (days: number) => {
    const current = new Date(date + 'T00:00:00')
    current.setDate(current.getDate() + days)
    setDate(current.toISOString().split('T')[0])
  }

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number)
    return new Date(year, month - 1, day).toLocaleDateString('es-UY', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (!barber) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-wood-950 text-cream">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-wood-950 px-4 py-24 pt-32">
      <div className="pointer-events-none fixed inset-0 bg-wood-pattern opacity-10" />
      <div className="relative mx-auto max-w-5xl">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-vintage text-3xl font-bold text-gold md:text-4xl">
              Agenda de {barber.name}
            </h1>
            <p className="mt-1 text-cream/70">
              Horarios ocupados y libres del día seleccionado.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-xl border border-gold/20 bg-wood-800 px-4 py-2 text-sm font-semibold text-gold transition hover:border-gold/40 hover:bg-wood-700"
          >
            <LogOut className="h-4 w-4" /> Cerrar sesión
          </button>
        </header>

        <div className="frame-ornate card-glow mb-8 flex items-center justify-between rounded-2xl bg-wood-800 p-4">
          <button
            onClick={() => changeDate(-1)}
            className="rounded-lg bg-wood-700 p-2 text-gold transition hover:bg-wood-600"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-cream/50">Fecha</p>
            <p className="font-vintage text-xl font-semibold text-gold">
              {formatDate(date)}
            </p>
          </div>
          <button
            onClick={() => changeDate(1)}
            className="rounded-lg bg-wood-700 p-2 text-gold transition hover:bg-wood-600"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input-wood mb-8 w-full md:w-auto"
        />

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-900/20 p-4 text-red-200">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-gold" />
            <p className="mt-3 text-cream/60">Cargando agenda...</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {slotsWithStatus.map(({ time, appointment }) => (
              <div
                key={time}
                className={`rounded-xl border p-4 transition ${
                  appointment
                    ? 'border-gold/30 bg-gradient-to-br from-gold/20 to-gold/5'
                    : 'border-gold/10 bg-wood-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gold" />
                    <span className="font-vintage text-lg font-semibold text-cream">
                      {time} hs
                    </span>
                  </div>
                  {appointment ? (
                    <CheckCircle2 className="h-5 w-5 text-gold" />
                  ) : (
                    <XCircle className="h-5 w-5 text-cream/40" />
                  )}
                </div>

                {appointment ? (
                  <div className="mt-3 space-y-1 text-sm text-cream/90">
                    <p className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gold" /> {appointment.name}
                    </p>
                    <p className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-gold" /> ${appointment.price}
                    </p>
                    <p className="text-cream/70">
                      {services.find((s) => s.id === appointment.serviceId)?.name ?? appointment.serviceId}
                    </p>
                    <button
                      onClick={() => handleDelete(appointment.id)}
                      className="mt-2 inline-flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-300 transition hover:bg-red-500/20"
                    >
                      Cancelar turno
                    </button>
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-cream/50">Horario libre</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
