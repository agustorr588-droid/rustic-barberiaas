import { appointment } from './config'

export type Appointment = {
  id: string
  name: string
  phone: string
  date: string
  time: string
  serviceId: string
  price: number
  createdAt: number
}

export function getAppointments(): Appointment[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(appointment.storageKey)
    return raw ? (JSON.parse(raw) as Appointment[]) : []
  } catch {
    return []
  }
}

export function saveAppointments(items: Appointment[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(appointment.storageKey, JSON.stringify(items))
}

export function addAppointment(appointmentData: Omit<Appointment, 'id' | 'createdAt'>) {
  const items = getAppointments()
  const newItem: Appointment = {
    ...appointmentData,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  }
  saveAppointments([...items, newItem])
  return newItem
}

export function deleteAppointment(id: string) {
  const items = getAppointments().filter((a) => a.id !== id)
  saveAppointments(items)
}

export function isSlotAvailable(date: string, time: string, excludeId?: string) {
  return !getAppointments().some((a) => a.date === date && a.time === time && a.id !== excludeId)
}

export function formatDate(dateString: string) {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('es-UY', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
