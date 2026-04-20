import NavBar from '@/components/NavBar'
import HeroSection from '@/components/HeroSection'
import ForPlayersSection from '@/components/ForPlayersSection'
import ForVenuesSection from '@/components/ForVenuesSection'
import Footer from '@/components/Footer'

export default function App() {
  return (
    <div className="bg-surface text-on-surface font-body min-h-screen">
      <NavBar />
      <main>
        <HeroSection />
        <ForPlayersSection />
        <ForVenuesSection />
      </main>
      <Footer />
    </div>
  )
}
