import fs from 'fs'
import path from 'path'
import HeroAnimation from './HeroAnimation'
import { business } from '@/lib/config'

function extractFrameNumber(name: string): number {
  const digits = name.replace(/^.*?(\d+).*?\.[^.]+$/i, '$1')
  return parseInt(digits || '0', 10)
}

function getFrameUrls(): string[] {
  const framesDir = path.join(process.cwd(), 'public', 'frames')
  try {
    const files = fs.readdirSync(framesDir)
    return files
      .filter((f) => /^\d+\.(jpe?g|png)$/i.test(f))
      .sort((a, b) => extractFrameNumber(a) - extractFrameNumber(b))
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
