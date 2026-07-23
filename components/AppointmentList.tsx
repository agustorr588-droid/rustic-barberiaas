'use client'

import { useMemo } from 'react'
import { Trash2, Calendar, Clock, User, DollarSign } from 'lucide-react'
import { services } from '@/lib/config'
import { getAppointments, deleteAppointment, formatDate, type Appointment } from '@/lib/appointments'

export default function AppointmentList({
  refresh,
  onSaved,
}: {
  refresh: number
  onSaved: () => void
}) {
  const appointments = useMemo(() => {
    const items = getAppointments()
    return items.sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`))
  }, [refresh])

  const handleDelete = (id: string) => {
    deleteAppointment(id)
    onSaved()
  }

  const serviceName = (id: string) => services.find((s) => s.id === id)?.name ?? id

  if (appointments.length === 0) {
    return (
      <div className="wood-card rounded-2xl p-8 text-center">
        <p className="text-cream/60">Aún no hay turnos agendados.</p>
        <p className="mt-1 text-sm text-cream/40">
          Completá el formulario para ver tu reserva aquí.
        </p>
      </div>
    )
  }

  return (
    <div className="wood-card rounded-2xl p-6 md:p-8">
      <h3 className="font-vintage text-2xl font-semibold text-gold">Turnos agendados</h3>
      <ul className="mt-6 space-y-4">
        {appointments.map((a: Appointment) => (
          <li
            key={a.id}
            className="flex flex-col gap-3 rounded-xl border border-gold/10 bg-wood-800/60 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="grid gap-1 text-sm text-cream/90">
              <p className="flex items-center gap-2 font-semibold text-gold">
                <User className="h-4 w-4" /> {a.name}
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gold" /> {formatDate(a.date)}
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gold" /> {a.time} hs
              </p>
              <p className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gold" /> ${a.price} — {serviceName(a.serviceId)}
              </p>
            </div>
            <button
              onClick={() => handleDelete(a.id)}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-500/30 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4" /> Cancelar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
