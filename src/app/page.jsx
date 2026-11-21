import About from "@/components/sections/About";
import Benefits from "@/components/sections/Benefits";
import Events from "@/components/sections/Events";
import Format from "@/components/sections/Format";
import Hero from "@/components/sections/Hero";
import Members from "@/components/sections/Members";
import dynamic from "next/dynamic";

const Gallery = dynamic(() => import("@/components/sections/Gallery"), {
  loading: () => (
    <div className="py-8 sm:py-10 text-center">
      <div className="max-w-2xl mx-auto px-4 mb-6">
        <div className="h-8 w-48 bg-amber-400/20 rounded-md mx-auto mb-3 animate-pulse" />
        <div className="h-4 w-72 bg-amber-400/10 rounded-md mx-auto animate-pulse" />
      </div>
      <div className="max-w-5xl mx-auto min-h-[220px] sm:min-h-[280px] md:min-h-[360px] flex items-center justify-center px-4">
        <div className="w-[270px] sm:w-[420px] md:w-[560px] aspect-[16/9] rounded-2xl bg-black/40 border border-amber-400/20 animate-pulse" />
      </div>
    </div>
  ),
});

const MapLocation = dynamic(() => import("@/components/sections/MapLocation"), {
  loading: () => (
    <div className="py-8 sm:py-10 px-4 max-w-5xl mx-auto text-center">
      <div className="w-full h-[320px] sm:h-[420px] rounded-2xl bg-black/40 border border-amber-500/20 animate-pulse" />
    </div>
  ),
});

export default function HomePage() {
  return (
    <>
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="gallery">
        <Gallery />
      </section>
      <section id="events">
        <Events />
      </section>
      <section id="benefits">
        <Benefits />
      </section>
      <section id="members">
        <Members />
      </section>
      <section id="format">
        <Format />
      </section>
      <section id="map">
        <MapLocation />
      </section>
    </>
  );
}
