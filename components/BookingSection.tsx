'use client'

import { useState } from 'react'
import { CalendarHeart } from 'lucide-react'
import AppointmentForm from './AppointmentForm'
import AppointmentList from './AppointmentList'
import Divider from './Divider'

export default function BookingSection() {
  const [refresh, setRefresh] = useState(0)

  const handleSaved = () => {
    setRefresh((prev) => prev + 1)
  }

  return (
    <section id="reservar" className="relative px-4 py-24 accent-ribbon">
      <div className="pointer-events-none absolute inset-0 bg-wood-pattern opacity-30" />
      <div className="relative mx-auto max-w-5xl">
        <div className="flex flex-col items-center justify-center gap-4">
          <Divider />
          <h2 className="font-vintage text-center text-4xl font-bold text-gold md:text-5xl">
            Reservá tu turno
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-lg text-cream/80">
            Elegí el servicio, día y horario que prefieras. Te esperamos en Rustic.
          </p>
          <div className="mt-2 flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-1 text-sm text-gold">
            <CalendarHeart className="h-4 w-4" />
            <span>Atención personalizada</span>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <AppointmentForm onSaved={handleSaved} />
          <AppointmentList refresh={refresh} onSaved={handleSaved} />
        </div>

        <Divider />
      </div>
    </section>
  )
}
