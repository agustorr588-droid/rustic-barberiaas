import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Gallery from '@/components/Gallery'
import BookingSection from '@/components/BookingSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Gallery />
      <BookingSection />
      <Footer />
    </main>
  )
}
