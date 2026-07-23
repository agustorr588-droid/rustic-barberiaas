import { business, services } from '@/lib/config'
import { Scissors, Sparkles } from 'lucide-react'
import Divider from './Divider'

export default function Services() {
  const icons = [Scissors, Sparkles]

  return (
    <section id="servicios" className="relative px-4 py-24 accent-ribbon">
      <div className="pointer-events-none absolute inset-0 bg-wood-pattern opacity-20" />
      <div className="relative mx-auto max-w-5xl">
        <div className="flex flex-col items-center justify-center gap-4">
          <Divider />
          <h2 className="font-vintage text-center text-3xl font-bold text-gold md:text-4xl">
            Nuestros servicios
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-cream/80">
            En {business.fullName} combinamos técnica clásica y productos de calidad para que salgas con el mejor look.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = icons[index % icons.length]
            return (
              <div
                key={service.id}
                className="frame-ornate card-glow relative rounded-2xl bg-wood-800 p-8 text-left transition hover:-translate-y-1"
              >
                <div className="absolute -right-3 -top-3 flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-wood-mid text-gold shadow-lg">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="absolute -top-4 right-16 rounded-full border border-gold/30 bg-gold px-4 py-1 text-sm font-bold text-wood-900 shadow">
                  ${service.price}
                </div>
                <h3 className="font-vintage text-2xl font-semibold text-gold">
                  {service.name}
                </h3>
                <p className="mt-3 text-cream/80">{service.description}</p>
                <p className="mt-4 text-sm text-cream/60">
                  Duración aproximada: {service.durationMinutes} min
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-16">
          <Divider />
        </div>
      </div>
    </section>
  )
}
