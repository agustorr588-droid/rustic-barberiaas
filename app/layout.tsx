import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { business, services } from '@/lib/config'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const corteBasico = services.find((s) => s.id === 'corte-basico')?.price ?? 300
const corteBarba = services.find((s) => s.id === 'corte-y-barba')?.price ?? 450

export const metadata: Metadata = {
  title: `${business.fullName} | ${business.tagline}`,
  description: `Reserva tu turno en ${business.fullName}. Corte básico $${corteBasico} y corte + barba $${corteBarba}. ${business.location}. Tel: ${business.phone}.`,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body className="wood-bg min-h-screen antialiased">{children}</body>
    </html>
  )
}
