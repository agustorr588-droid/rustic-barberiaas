'use client'

import { useMemo } from 'react'
import { Trash2, Calendar, Clock, User, DollarSign, ListChecks } from 'lucide-react'
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

  const header = (
    <div className="relative flex items-center gap-3">
      <div className="rounded-full border border-gold/30 bg-gold/10 p-2.5 text-gold">
        <ListChecks className="h-6 w-6" />
      </div>
      <h3 className="font-vintage text-2xl font-semibold text-gold md:text-3xl">
        Turnos agendados
      </h3>
    </div>
  )

  if (appointments.length === 0) {
    return (
      <div className="frame-ornate card-glow rounded-2xl bg-wood-800 p-6 md:p-8">
        {header}
        <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-dashed border-gold/20 bg-wood-900/40 p-8 text-center">
          <Calendar className="h-10 w-10 text-gold/40" />
          <p className="mt-3 text-cream/70">Aún no hay turnos agendados.</p>
          <p className="mt-1 text-sm text-cream/50">
            Completá el formulario para ver tu reserva aquí.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="frame-ornate card-glow rounded-2xl bg-wood-800 p-6 md:p-8">
      {header}
      <ul className="mt-8 space-y-4">
        {appointments.map((a: Appointment) => (
          <li
            key={a.id}
            className="group relative flex flex-col gap-4 rounded-xl border border-gold/10 bg-gradient-to-br from-wood-900/80 to-wood-800/80 p-4 transition hover:border-gold/30 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="absolute -left-1 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r bg-gold/40" />
            <div className="grid gap-1.5 pl-3 text-sm text-cream/90">
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
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-2 text-sm font-medium text-red-300 transition hover:border-red-500/50 hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4" /> Cancelar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
