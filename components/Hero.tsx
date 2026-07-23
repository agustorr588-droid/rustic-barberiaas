import Image from 'next/image'
import { Phone, MapPin, Clock, Scissors } from 'lucide-react'
import { business } from '@/lib/config'

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center">
      <div className="gold-border relative mx-auto mb-8 h-64 w-64 overflow-hidden rounded-full p-1 md:h-80 md:w-80">
        <Image
          src={business.logo}
          alt={`Logo ${business.fullName}`}
          fill
          className="rounded-full object-cover"
          priority
        />
      </div>

      <h1 className="font-vintage text-5xl font-bold text-gold md:text-7xl">
        {business.name}
      </h1>
      <p className="mt-3 max-w-xl text-lg text-cream/90 md:text-xl">
        {business.tagline}
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
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
        className="btn-rustic mt-12 text-lg"
      >
        <Scissors className="h-5 w-5" />
        Reservar turno
      </a>
    </section>
  )
}
