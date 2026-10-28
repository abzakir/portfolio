import Nav from "@/components/Nav";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import MoreWork from "@/components/sections/MoreWork";
import Recent from "@/components/sections/Recent";
import Work from "@/components/sections/Work";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Recent />
        <Work />
        <MoreWork />
        <About />
        <Contact />
      </main>
    </>
  );
}
