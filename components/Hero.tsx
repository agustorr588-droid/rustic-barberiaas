import Image from 'next/image'
import { Phone, MapPin, Clock, Scissors, ChevronDown } from 'lucide-react'
import { business } from '@/lib/config'
import Divider from './Divider'

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center">
      <div className="pointer-events-none absolute inset-0 bg-wood-pattern opacity-20" />

      <div className="gold-border relative mx-auto mb-6 h-48 w-48 overflow-hidden rounded-full p-1 sm:h-64 sm:w-64 md:mb-8 md:h-80 md:w-80">
        <Image
          src={business.logo}
          alt={`Logo ${business.fullName}`}
          fill
          className="rounded-full object-cover"
          priority
        />
      </div>

      <h1 className="font-vintage text-4xl font-bold text-gold sm:text-5xl md:text-7xl">
        {business.name}
      </h1>
      <p className="mt-3 max-w-xl px-2 text-base text-cream/90 sm:text-lg md:text-xl">
        {business.tagline}
      </p>

      <div className="mt-4">
        <Divider />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <a
          href={`tel:${business.phone.replace(/\s/g, '')}`}
          className="wood-card flex items-center gap-3 rounded-xl px-5 py-4 text-cream/90 gold-hover"
        >
          <Phone className="h-5 w-5 text-gold" />
          <span className="text-sm font-medium">{business.phone}</span>
        </a>

        <div className="wood-card flex items-center gap-3 rounded-xl px-5 py-4 text-cream/90">
          <MapPin className="h-5 w-5 shrink-0 text-gold" />
          <span className="text-left text-sm font-medium">{business.location}</span>
        </div>

        <div className="wood-card flex items-center gap-3 rounded-xl px-5 py-4 text-cream/90">
          <Clock className="h-5 w-5 shrink-0 text-gold" />
          <div className="text-left text-sm leading-tight">
            <p>{business.schedule[0].day}</p>
            <p className="text-gold">{business.schedule[0].hours}</p>
          </div>
        </div>
      </div>

      <a
        href="#reservar"
        className="btn-rustic z-10 mt-12 text-lg shadow-[0_0_25px_rgba(197,160,89,0.3)]"
      >
        <Scissors className="h-5 w-5" />
        Reservar turno
      </a>

      <a
        href="#servicios"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-gold/60 transition hover:text-gold"
        aria-label="Ver servicios"
      >
        <ChevronDown className="h-7 w-7" />
      </a>
    </section>
  )
}
