import fs from 'fs'
import path from 'path'
import HeroAnimation from './HeroAnimation'
import MenuToggle from './MenuToggle'
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
      .filter((f) => /^\d+\.png$/i.test(f))
      .sort((a, b) => extractFrameNumber(a) - extractFrameNumber(b))
      .map((f) => `/frames/${f}`)
  } catch {
    return []
  }
}

const HEADLINE = 'Corte & barba con estilo clásico. Precisión, detalle y tradición en cada visita.'

export default function HeroShowcase() {
  const frames = getFrameUrls()
  const words = HEADLINE.split(' ')

  return (
    <>
      {/* SPLASH */}
      <div className="splash" aria-hidden="true">
        <div className="splash-row splash-row-top">
          <div className="splash-box" />
          <div className="splash-box" />
          <div className="splash-box" />
          <div className="splash-box" />
          <div className="splash-box" />
        </div>
        <div className="splash-row splash-row-bottom">
          <div className="splash-box" />
          <div className="splash-box" />
          <div className="splash-box" />
          <div className="splash-box" />
          <div className="splash-box" />
        </div>
      </div>

      {/* LOGO */}
      <div className="logo-wrapper">
        <div className="inner">
          <a href="/" aria-label="Inicio">
            <span className="logo-mark">{business.name}</span>
          </a>
        </div>
      </div>

      <MenuToggle />

      {/* HERO */}
      <main className="hero-showcase">
        <div className="hero-big-text creator-text-animate">
          <h2>Rustic</h2>
        </div>

        <div className="hero-base-img hero-image-animate" aria-hidden="true" />

        <div className="hero-reveal-wrapper" aria-hidden="true">
          <HeroAnimation frames={frames} />
        </div>

        <div className="hero-content">
          <div className="hero-content-inner">
            <h1 className="hero-headline">
              {words.map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className="word-reveal"
                  style={{ animationDelay: `${1 + i * 0.05}s` }}
                >
                  {word}
                </span>
              ))}
            </h1>
            <a href="#reservar" className="cta-btn cta-animate">
              <span className="cta-btn-bg" />
              <span className="cta-btn-text">Reservá tu turno</span>
              <span className="cta-btn-circle">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L13 5M13 5H6M13 5V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
