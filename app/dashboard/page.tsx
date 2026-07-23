import BarberDashboard from '@/components/BarberDashboard'
import { business } from '@/lib/config'

export const metadata = {
  title: `Agenda de barberos | ${business.name}`,
  description: 'Panel de agenda para barberos de Rustic.',
}

export default function DashboardPage() {
  return <BarberDashboard />
}
