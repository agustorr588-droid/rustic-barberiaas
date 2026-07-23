'use client'

import { useState } from 'react'
import AppointmentForm from './AppointmentForm'
import AppointmentList from './AppointmentList'

export default function BookingSection() {
  const [refresh, setRefresh] = useState(0)

  const handleSaved = () => {
    setRefresh((prev) => prev + 1)
  }

  return (
    <section id="reservar" className="px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-vintage text-center text-3xl font-bold text-gold md:text-4xl">
          Reservas
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-cream/80">
          Elegí el servicio, día y horario que prefieras. Te esperamos.
        </p>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <AppointmentForm onSaved={handleSaved} />
          <AppointmentList refresh={refresh} onSaved={handleSaved} />
        </div>
      </div>
    </section>
  )
}
