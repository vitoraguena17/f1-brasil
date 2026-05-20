import { Header } from "@/components/header/header";
import { HeroSection } from "@/components/hero/hero-section";
import { Preloader } from "@/components/ui/preloader";
import { FittipaldiSection } from "@/components/timeline/fittipaldi-section";
import { PiquetSection } from "@/components/timeline/piquet-section";
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
        </DriversTimeline>
      </main>
    </>
  );
}