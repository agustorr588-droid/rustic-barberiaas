import BarberLogin from '@/components/BarberLogin'
import { business } from '@/lib/config'

export const metadata = {
  title: `Acceso barberos | ${business.name}`,
  description: 'Ingreso exclusivo para barberos de Rustic.',
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-wood-950 px-4 py-20 pt-24 sm:py-24 sm:pt-32">
      <div className="absolute inset-0 bg-wood-pattern opacity-10" />
      <div className="relative mx-auto w-full max-w-md">
        <BarberLogin />
      </div>
    </main>
  )
}
