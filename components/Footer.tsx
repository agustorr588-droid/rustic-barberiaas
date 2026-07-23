import { Phone, MapPin, Clock, Instagram, Facebook, Scissors, LogIn } from 'lucide-react'
import { business } from '@/lib/config'
import Divider from './Divider'

export default function Footer() {
  const phoneLink = business.phone.replace(/\s/g, '')

  return (
    <footer className="relative border-t border-gold/10 bg-wood-900/90 px-4 py-14">
      <div className="pointer-events-none absolute inset-0 bg-wood-pattern opacity-10" />
      <div className="relative mx-auto max-w-5xl">
        <div className="mb-10 flex justify-center">
          <Divider />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div className="frame-ornate card-glow rounded-xl bg-wood-800/50 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full border border-gold/30 bg-gold/10 p-2 text-gold">
                <Scissors className="h-5 w-5" />
              </div>
              <h4 className="font-vintage text-xl font-bold text-gold sm:text-2xl">{business.name}</h4>
            </div>
            <p className="mt-3 text-sm text-cream/70">{business.tagline}</p>
          </div>

          <div className="space-y-3 rounded-xl border border-gold/10 bg-wood-800/50 p-6 text-sm text-cream/80">
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

          <div className="space-y-2 rounded-xl border border-gold/10 bg-wood-800/50 p-6 text-sm text-cream/80">
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
          <p>© {new Date().getFullYear()} {business.fullName}. Diseño rústico inspirado en la tradición.</p>
          <p className="mt-1 flex flex-wrap items-center justify-center gap-2 text-gold/50">
            <Instagram className="h-3.5 w-3.5" />
            <Facebook className="h-3.5 w-3.5" />
            <span>Seguinos en redes</span>
          </p>
          <p className="mt-3">
            <a
              href="/login"
              className="inline-flex items-center gap-1 text-gold/60 transition hover:text-gold"
            >
              <LogIn className="h-3.5 w-3.5" /> Acceso barberos
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
