import About from "@/components/sections/About";
import Events from "@/components/sections/Events";
import Format from "@/components/sections/Format";
import Gallery from "@/components/sections/Gallery";
import Hero from "@/components/sections/Hero";
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
      <section id="members">
        <Members />
      </section>
      <section id="format">
        <Format />
      </section>
    </>
  );
}
