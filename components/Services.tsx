import { business, services } from '@/lib/config'

export default function Services() {
  return (
    <section id="servicios" className="px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-vintage text-center text-3xl font-bold text-gold md:text-4xl">
          Nuestros servicios
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-cream/80">
          En {business.fullName} combinamos técnica clásica y productos de calidad para que salgas con el mejor look.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.id}
              className="wood-card relative rounded-2xl p-8 text-left transition-transform hover:-translate-y-1"
            >
              <div className="absolute -top-4 right-6 rounded-full bg-gold px-4 py-1 text-sm font-bold text-wood-900 shadow">
                ${service.price}
              </div>
              <h3 className="font-vintage text-2xl font-semibold text-gold">
                {service.name}
              </h3>
              <p className="mt-3 text-cream/80">{service.description}</p>
              <p className="mt-4 text-sm text-cream/60">
                Duración aproximada: {service.durationMinutes} min
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
