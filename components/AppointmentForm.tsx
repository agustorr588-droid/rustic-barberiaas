'use client'

import { useState, useMemo } from 'react'
import { CalendarDays, Clock, User, Phone, CheckCircle, Sparkles } from 'lucide-react'
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
    <form
      onSubmit={handleSubmit}
      className="frame-ornate card-glow relative overflow-hidden rounded-2xl bg-wood-800 p-6 md:p-8"
    >
      <div className="absolute right-0 top-0 h-24 w-24 -translate-y-1/2 translate-x-1/2 rounded-full bg-gold/5 blur-2xl" />

      <div className="relative flex items-center gap-3">
        <div className="rounded-full border border-gold/30 bg-gold/10 p-2.5 text-gold">
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-vintage text-2xl font-semibold text-gold md:text-3xl">
            Agendá tu turno
          </h3>
          <p className="text-sm text-cream/70">
            Completá el formulario y reservá tu lugar.
          </p>
        </div>
      </div>

      <div className="relative mt-8 grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-cream">
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
          <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-cream">
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
          <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-cream">
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
          <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-cream">
            <Clock className="h-4 w-4 text-gold" /> Horario
          </label>
          <select
            name="time"
            value={form.time}
            onChange={handleChange}
            className="select-wood appearance-none"
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
          <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-cream">
            <CheckCircle className="h-4 w-4 text-gold" /> Servicio
          </label>
          <select
            name="serviceId"
            value={form.serviceId}
            onChange={handleChange}
            className="select-wood appearance-none"
          >
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — ${s.price}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <div className="w-full rounded-xl border-2 border-gold/30 bg-gradient-to-br from-gold/20 to-gold/5 px-4 py-3 text-center shadow-inner">
            <span className="text-xs uppercase tracking-wider text-cream/70">Total aproximado</span>
            <p className="font-vintage text-3xl font-bold text-gold drop-shadow-sm">
              ${selectedService?.price ?? 0}
            </p>
          </div>
        </div>
      </div>

      {status !== 'idle' && (
        <div
          className={`relative mt-5 rounded-xl border px-4 py-3 text-sm font-semibold ${
            status === 'success'
              ? 'border-green-500/30 bg-green-900/30 text-green-200'
              : 'border-red-500/30 bg-red-900/30 text-red-200'
          }`}
        >
          {message}
        </div>
      )}

      <button
        type="submit"
        className="btn-rustic mt-6 w-full text-lg font-bold shadow-[0_0_20px_rgba(197,160,89,0.25)]"
      >
        <Sparkles className="h-5 w-5" />
        Confirmar reserva
      </button>
    </form>
  )
}
