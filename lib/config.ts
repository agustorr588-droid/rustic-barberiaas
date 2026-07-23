// Configuración editable de la barbería.
// Modifica estos valores para cambiar los datos de la web sin tocar componentes.

export const business = {
  name: 'Rustic',
  fullName: 'Barbería Rustic',
  tagline: 'Corte & Barba con estilo clásico',
  phone: '0937799',
  phoneLabel: 'Teléfono',
  location: 'Manuel Acuña esq. Aparicio Saravia',
  locationLabel: 'Ubicación',
  schedule: [
    { day: 'Lunes a Viernes', hours: '09:00 – 20:00' },
    { day: 'Sábados', hours: '09:00 – 14:00' },
    { day: 'Domingos', hours: 'Cerrado' },
  ],
  logo: '/Screenshot_11.png',
}

export const services = [
  {
    id: 'corte-basico',
    name: 'Corte Básico',
    description: 'Corte de pelo profesional con acabado clásico o moderno.',
    price: 300,
    durationMinutes: 30,
  },
  {
    id: 'corte-y-barba',
    name: 'Corte + Barba',
    description: 'Corte de pelo completo más arreglo de barba con navaja y productos.',
    price: 450,
    durationMinutes: 60,
  },
]

export const barbers = [
  { id: 'rey-julian', name: 'Rey Julian' },
  { id: 'cara-jaula', name: 'Cara Jaula' },
  { id: 'saraza-del-sabor', name: 'El Saraza del Sabor' },
] as const

export const appointment = {
  // Franja horaria disponible para agendar (formato 24 hs)
  minHour: 9,
  maxHour: 20,
  stepMinutes: 30,
  storageKey: 'rustic-appointments',
}
