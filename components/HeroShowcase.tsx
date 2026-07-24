'use client'

import { useEffect, useRef, useState } from 'react'
import { business } from '@/lib/config'

const HEADLINE = 'Corte & barba con estilo clásico. Precisión, detalle y tradición en cada visita.'

export default function HeroShowcase() {
  const [menuOpen, setMenuOpen] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const imgLayer = revealRef.current
    if (!canvas || !imgLayer) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const SPOTLIGHT_R = 260
    const mouse = { x: -999, y: -999 }
    const smooth = { x: -999, y: -999 }
    let rafId = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', onMouseMove)

    const loop = () => {
      smooth.x += (mouse.x - smooth.x) * 0.1
      smooth.y += (mouse.y - smooth.y) * 0.1

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const grad = ctx.createRadialGradient(smooth.x, smooth.y, 0, smooth.x, smooth.y, SPOTLIGHT_R)
      grad.addColorStop(0, 'rgba(255,255,255,1)')
      grad.addColorStop(0.4, 'rgba(255,255,255,1)')
      grad.addColorStop(0.6, 'rgba(255,255,255,0.75)')
      grad.addColorStop(0.75, 'rgba(255,255,255,0.4)')
      grad.addColorStop(0.88, 'rgba(255,255,255,0.12)')
      grad.addColorStop(1, 'rgba(255,255,255,0)')

      ctx.beginPath()
      ctx.arc(smooth.x, smooth.y, SPOTLIGHT_R, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()

      const dataUrl = canvas.toDataURL()
      imgLayer.style.webkitMaskImage = `url(${dataUrl})`
      imgLayer.style.maskImage = `url(${dataUrl})`
      imgLayer.style.webkitMaskSize = '100% 100%'
      imgLayer.style.maskSize = '100% 100%'

      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)

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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={business.logo} alt={`Logo ${business.fullName}`} />
          </a>
        </div>
      </div>

      {/* BURGER */}
      <div className="burger-wrapper">
        <div className="inner">
          <button
            className={`burger-btn${menuOpen ? ' open' : ''}`}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>
      </div>

      {/* MENU PANEL */}
      <div className={`menu-panel${menuOpen ? ' open' : ''}`}>
        <nav>
          <a href="#servicios" onClick={closeMenu}>Servicios</a>
          <a href="#galeria" onClick={closeMenu}>Galería</a>
          <a href="#reservar" onClick={closeMenu}>Reservar</a>
          <a href="/login" onClick={closeMenu}>Barberos</a>
        </nav>
        <div className="menu-contact">
          <a href={`tel:${business.phone.replace(/\s/g, '')}`} className="menu-email">
            {business.phone}
          </a>
          <div className="menu-socials">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
          </div>
        </div>
        <div style={{ marginTop: 32 }}>
          <a href="#reservar" onClick={closeMenu} className="menu-cta-btn">
            <span className="menu-cta-bg" />
            <span className="menu-cta-text">Reservá tu turno</span>
            <span className="menu-cta-circle">
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L13 5M13 5H6M13 5V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      {/* HERO */}
      <section className="hero-showcase">
        <div className="hero-big-text creator-text-animate">
          <h2>Rustic</h2>
        </div>

        <div
          className="hero-base-img hero-image-animate"
          style={{ backgroundImage: `url('${business.logo}')`, filter: 'grayscale(1) brightness(0.85)' }}
        />

        <canvas id="reveal-canvas" ref={canvasRef} />
        <div
          className="hero-reveal-img"
          ref={revealRef}
          style={{ backgroundImage: `url('${business.logo}')` }}
        />

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
      </section>
    </>
  )
}
