import { Header } from "@/components/header/header";
import { HeroSection } from "@/components/hero/hero-section";
import { Preloader } from "@/components/ui/preloader";
import { DriversTimeline } from "@/components/timeline/drivers-timeline";
import { DriverSection } from "@/components/timeline/driver-section";
import { SennaLegacySection } from "@/components/timeline/senna-legacy-section";
import { BortoletoSection } from "@/components/timeline/bortoleto-section";
import { HonorableMentions } from "@/components/timeline/honorable-mentions";
import { Footer } from "@/components/footer/footer";
import { DRIVERS } from "@/data/drivers";

export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <main className="w-full flex flex-col">
        <HeroSection />
        <DriversTimeline>
          <DriverSection driver={DRIVERS.fittipaldi} chapter={1} />
          <DriverSection driver={DRIVERS.piquet} chapter={2} />
          <DriverSection driver={DRIVERS.senna} chapter={3} />
          <SennaLegacySection />
          <DriverSection driver={DRIVERS.barrichello} chapter={4} />
          <DriverSection driver={DRIVERS.massa} chapter={5} />
        </DriversTimeline>
        <BortoletoSection />
        <HonorableMentions />
      </main>
      <Footer />
    </>
  );
}
