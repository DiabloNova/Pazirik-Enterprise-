import { PromotionalBanner } from "@/components/promotional-banner"
import { Navbar } from "@/components/navbar"
import { HeaderSlider } from "@/components/header-slider"
import { SpecialOffers } from "@/components/special-offers"
import { OurServices } from "@/components/our-services"
import { WhyPazirik } from "@/components/why-pazirik"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <PromotionalBanner />
      <Navbar />

      {/* Add top margin to account for fixed navbar */}
      <main className="pt-16">
        <HeaderSlider />
        <SpecialOffers />
        <OurServices />
        <WhyPazirik />
      </main>

      <Footer />
    </div>
  )
}
