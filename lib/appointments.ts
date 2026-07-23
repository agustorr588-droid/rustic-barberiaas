import { supabase } from './supabase'

export type Appointment = {
  id: string
  name: string
  phone: string
  date: string
  time: string
  serviceId: string
  price: number
  created_at?: string
}

export type AppointmentInsert = Omit<Appointment, 'id' | 'created_at'>

export function formatDate(dateString: string) {
  if (!dateString) return ''
  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('es-UY', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export async function getAppointments(): Promise<Appointment[]> {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('date', { ascending: true })
    .order('time', { ascending: true })

  if (error) {
    console.error('Error al obtener turnos:', error)
    throw new Error('No se pudieron cargar los turnos.')
  }

  return (data || []).map((item) => ({
    id: item.id,
    name: item.name,
    phone: item.phone,
    date: item.date,
    time: item.time,
    serviceId: item.service_id,
    price: item.price,
    created_at: item.created_at,
  }))
}

export async function addAppointment(appointment: AppointmentInsert): Promise<void> {
  const { error } = await supabase.from('appointments').insert({
    name: appointment.name,
    phone: appointment.phone,
    date: appointment.date,
    time: appointment.time,
    service_id: appointment.serviceId,
    price: appointment.price,
  })

  if (error) {
    console.error('Error al guardar turno:', error)
    throw new Error('No se pudo guardar el turno. Intentá de nuevo.')
  }
}

export async function deleteAppointment(id: string): Promise<void> {
  const { error } = await supabase.from('appointments').delete().eq('id', id)

  if (error) {
    console.error('Error al eliminar turno:', error)
    throw new Error('No se pudo cancelar el turno.')
  }
}

export async function isSlotAvailable(date: string, time: string): Promise<boolean> {
  const { count, error } = await supabase
    .from('appointments')
    .select('*', { count: 'exact', head: true })
    .eq('date', date)
    .eq('time', time)

  if (error) {
    console.error('Error al verificar disponibilidad:', error)
    return false
  }

  return count === 0
}
