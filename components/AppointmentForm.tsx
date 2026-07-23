'use client'

import { useState, useMemo } from 'react'
import { CalendarDays, Clock, User, Phone, CheckCircle } from 'lucide-react'
import { services, appointment as appointmentConfig } from '@/lib/config'
import { addAppointment, isSlotAvailable, type Appointment } from '@/lib/appointments'

export default function AppointmentForm({ onSaved }: { onSaved: () => void }) {
  const today = new Date().toISOString().split('T')[0]

  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: today,
    time: '',
    serviceId: services[0]?.id ?? '',
  })
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const selectedService = useMemo(
    () => services.find((s) => s.id === form.serviceId),
    [form.serviceId]
  )

  const timeOptions = useMemo(() => {
    const options: string[] = []
    const { minHour, maxHour, stepMinutes } = appointmentConfig
    for (let h = minHour; h < maxHour; h++) {
      for (let m = 0; m < 60; m += stepMinutes) {
        options.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
      }
    }
    return options
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (status !== 'idle') setStatus('idle')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim() || !form.date || !form.time || !form.serviceId) {
      setStatus('error')
      setMessage('Completá todos los campos para confirmar tu turno.')
      return
    }

    if (!isSlotAvailable(form.date, form.time)) {
      setStatus('error')
      setMessage('Ese horario ya está reservado. Por favor elegí otro.')
      return
    }

    addAppointment({
      name: form.name.trim(),
      phone: form.phone.trim(),
      date: form.date,
      time: form.time,
      serviceId: form.serviceId,
      price: selectedService?.price ?? 0,
    })

    setStatus('success')
    setMessage('¡Turno reservado con éxito! Te esperamos en Rustic.')
    setForm({ name: '', phone: '', date: today, time: '', serviceId: services[0]?.id ?? '' })
    onSaved()
  }

  return (
    <form onSubmit={handleSubmit} className="wood-card rounded-2xl p-6 md:p-8">
      <h3 className="font-vintage text-2xl font-semibold text-gold">Agendá tu turno</h3>
      <p className="mt-2 text-sm text-cream/70">
        Completá el formulario y reservá tu lugar. Los datos se guardan en este navegador.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-1 flex items-center gap-2 text-sm font-medium text-cream/90">
            <User className="h-4 w-4 text-gold" /> Nombre completo
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            className="input-wood"
          />
        </div>

        <div>
          <label className="mb-1 flex items-center gap-2 text-sm font-medium text-cream/90">
            <Phone className="h-4 w-4 text-gold" /> Teléfono
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="09XXXXXXX"
            className="input-wood"
          />
        </div>

        <div>
          <label className="mb-1 flex items-center gap-2 text-sm font-medium text-cream/90">
            <CalendarDays className="h-4 w-4 text-gold" /> Fecha
          </label>
          <input
            type="date"
            name="date"
            min={today}
            value={form.date}
            onChange={handleChange}
            className="input-wood"
          />
        </div>

        <div>
          <label className="mb-1 flex items-center gap-2 text-sm font-medium text-cream/90">
            <Clock className="h-4 w-4 text-gold" /> Horario
          </label>
          <select
            name="time"
            value={form.time}
            onChange={handleChange}
            className="input-wood appearance-none"
          >
            <option value="">Seleccionar hora</option>
            {timeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 flex items-center gap-2 text-sm font-medium text-cream/90">
            <CheckCircle className="h-4 w-4 text-gold" /> Servicio
          </label>
          <select
            name="serviceId"
            value={form.serviceId}
            onChange={handleChange}
            className="input-wood appearance-none"
          >
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — ${s.price}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <div className="w-full rounded-lg border border-gold/20 bg-gold/10 px-4 py-3 text-center">
            <span className="text-sm text-cream/70">Total aproximado</span>
            <p className="text-2xl font-bold text-gold">
              ${selectedService?.price ?? 0}
            </p>
          </div>
        </div>
      </div>

      {status !== 'idle' && (
        <div
          className={`mt-5 rounded-lg px-4 py-3 text-sm font-medium ${
            status === 'success'
              ? 'bg-green-900/30 text-green-200'
              : 'bg-red-900/30 text-red-200'
          }`}
        >
          {message}
        </div>
      )}

      <button type="submit" className="btn-rustic mt-6 w-full">
        Confirmar reserva
      </button>
    </form>
  )
}
