import fs from 'fs'
import path from 'path'
import HeroAnimation from './HeroAnimation'
import { business } from '@/lib/config'

function getFrameUrls(): string[] {
  const framesDir = path.join(process.cwd(), 'public', 'frames')
  try {
    const files = fs.readdirSync(framesDir)
    return files
      .filter((f) => /^\d+\.jpe?g$/i.test(f))
      .sort((a, b) => {
        const na = parseInt(a.replace(/\.jpe?g$/i, ''), 10)
        const nb = parseInt(b.replace(/\.jpe?g$/i, ''), 10)
        return na - nb
      })
      .map((f) => `/frames/${f}`)
  } catch {
    return []
  }
}

export default function Hero() {
  const frames = getFrameUrls()

  return (
    <section className="hero-premium">
      <div className="hero-premium-gradient" aria-hidden="true" />

      <div className="hero-premium-inner">
        <div className="hero-premium-content">
          <p className="hero-premium-eyebrow">{business.fullName}</p>
          <h1 className="hero-premium-headline">
            Estilo que se siente,
            <br />
            tradición que se nota.
          </h1>
          <p className="hero-premium-description">
            Corte clásico, barba cuidada y una experiencia pensada para el hombre moderno. Reservá tu lugar y dejate transformar.
          </p>
          <div className="hero-premium-actions">
            <a href="#reservar" className="hero-premium-btn hero-premium-btn-primary">
              Reservar turno
            </a>
            <a href="#servicios" className="hero-premium-btn hero-premium-btn-secondary">
              Ver servicios
            </a>
          </div>
        </div>

        <div className="hero-premium-media">
          <div className="hero-premium-glow" aria-hidden="true" />
          <HeroAnimation frames={frames} />
        </div>
      </div>
    </section>
  )
}
