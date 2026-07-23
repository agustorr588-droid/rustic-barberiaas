import { Phone, MapPin, Clock, Instagram, Facebook } from 'lucide-react'
import { business } from '@/lib/config'

export default function Footer() {
  const phoneLink = business.phone.replace(/\s/g, '')

  return (
    <footer className="border-t border-gold/10 bg-wood-900/80 px-4 py-14">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3">
        <div>
          <h4 className="font-vintage text-2xl font-bold text-gold">{business.name}</h4>
          <p className="mt-2 text-sm text-cream/70">{business.tagline}</p>
        </div>

        <div className="space-y-3 text-sm text-cream/80">
          <a
            href={`tel:${phoneLink}`}
            className="flex items-center gap-2 gold-hover"
          >
            <Phone className="h-4 w-4 text-gold" /> {business.phone}
          </a>
          <p className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            {business.location}
          </p>
        </div>

        <div className="space-y-2 text-sm text-cream/80">
          {business.schedule.map((s) => (
            <div key={s.day} className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gold" />
              <span>{s.day}:</span>
              <span className="text-gold">{s.hours}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-5xl text-center text-xs text-cream/40">
        © {new Date().getFullYear()} {business.fullName}. Diseño rústico inspirado en la tradición.
      </div>
    </footer>
  )
}
