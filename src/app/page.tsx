import { Header } from "@/components/header/header";
import { HeroSection } from "@/components/hero/hero-section";
import { Preloader } from "@/components/ui/preloader";
import { FittipaldiSection } from "@/components/timeline/fittipaldi-section";
import { PiquetSection } from "@/components/timeline/piquet-section";
import { SennaSection } from "@/components/timeline/senna-section";
import { SennaLegacySection } from "@/components/timeline/senna-legacy-section";
import { BarrichelloSection } from "@/components/timeline/barrichello-section";
import { MassaSection } from "@/components/timeline/massa-section";
import { BortoletoSection } from "@/components/timeline/bortoleto-section";
import { HonorableMentions } from "@/components/timeline/honorable-mentions";
import { DriversTimeline } from "@/components/timeline/drivers-timeline";

export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <main className="w-full flex flex-col">
        <HeroSection />
        <DriversTimeline>
          <FittipaldiSection />
          <PiquetSection />
          <SennaSection />
          <SennaLegacySection />
          <BarrichelloSection />
          <MassaSection />
        </DriversTimeline>
        <BortoletoSection />
        <HonorableMentions />
      </main>
    </>
  );
}