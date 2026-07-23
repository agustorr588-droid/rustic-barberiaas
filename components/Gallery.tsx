import Image from 'next/image'
import { Star, Scissors } from 'lucide-react'
import Divider from './Divider'

const images = [
  { src: '/images.jfif', alt: 'Corte de ejemplo 1' },
  { src: '/images.jpg', alt: 'Corte de ejemplo 2' },
  { src: '/images1.jfif', alt: 'Corte de ejemplo 3' },
]

const phrases = [
  {
    title: 'Opción 1 (recomendada)',
    text: 'En nuestra barbería, cada corte se realiza con precisión, dedicación y atención a los detalles para ofrecer un estilo moderno, limpio y adaptado a la personalidad de cada cliente.',
  },
  {
    title: 'Opción 2',
    text: 'Trabajamos con las últimas tendencias y técnicas de barbería para lograr cortes de alta calidad que combinan estilo, comodidad y un acabado profesional.',
  },
  {
    title: 'Opción 3',
    text: 'Más que un simple corte de cabello, buscamos brindar una experiencia donde la calidad, la atención personalizada y el profesionalismo se reflejen en cada resultado.',
  },
  {
    title: 'Opción 4 (más elegante)',
    text: 'Creemos que un buen corte marca la diferencia. Por eso nos enfocamos en ofrecer un servicio profesional, utilizando técnicas modernas y cuidando cada detalle para que salgas con la mejor versión de tu estilo.',
  },
  {
    title: 'Opción 5 (más cercana)',
    text: 'Ya sea que busques un cambio de look o mantener tu estilo de siempre, estamos listos para ayudarte con cortes de calidad, atención personalizada y un ambiente pensado para que te sientas cómodo.',
  },
]

export default function Gallery() {
  return (
    <section className="relative px-4 py-24 accent-ribbon">
      <div className="pointer-events-none absolute inset-0 bg-wood-pattern opacity-20" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-center gap-4">
          <Divider />
          <div className="flex items-center gap-2 text-gold">
            <Star className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Galería</span>
            <Star className="h-5 w-5" />
          </div>
          <h2 className="font-vintage text-center text-3xl font-bold text-gold md:text-4xl">
            Estilo en cada corte
          </h2>
          <p className="mx-auto max-w-2xl text-center text-cream/70">
            Mirá algunos de nuestros trabajos y conocé nuestra forma de trabajar.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {images.map((img, index) => (
            <div
              key={img.src}
              className="frame-ornate card-glow group relative overflow-hidden rounded-2xl bg-wood-800 p-2"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-wood-mid text-gold shadow-lg">
                <Scissors className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {phrases.map((item, index) => (
            <div
              key={item.title}
              className="rounded-xl border border-gold/10 bg-wood-800/70 p-6 transition hover:border-gold/30"
            >
              <h3 className="font-vintage text-lg font-semibold text-gold">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/80">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
