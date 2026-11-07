import About from "@/components/sections/About";
import Benefits from "@/components/sections/Benefits";
import Events from "@/components/sections/Events";
import Format from "@/components/sections/Format";
import Gallery from "@/components/sections/Gallery";
import Hero from "@/components/sections/Hero";
import MapLocation from "@/components/sections/MapLocation";
import Members from "@/components/sections/Members";

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
