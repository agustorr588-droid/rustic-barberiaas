'use client'

import { useState } from 'react'

export default function MenuToggle() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <div className="burger-wrapper">
        <div className="inner">
          <button
            className={`burger-btn${menuOpen ? ' open' : ''}`}
            id="burger-btn"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="menu-panel"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>
      </div>

      <div
        className={`menu-panel${menuOpen ? ' open' : ''}`}
        id="menu-panel"
        role="dialog"
        aria-label="Menú de navegación"
      >
        <nav onClick={() => setMenuOpen(false)}>
          <a href="#servicios">Servicios</a>
          <a href="#galeria">Galería</a>
          <a href="#reservar">Reservar</a>
          <a href="/login">Barberos</a>
        </nav>
      </div>
    </>
  )
}
