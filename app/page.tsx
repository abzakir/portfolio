"use client";

import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Journey from "@/components/sections/Journey";
import Projects from "@/components/sections/Projects";
import ExperienceLeadership from "@/components/sections/ExperienceLeadership";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { CustomCursor } from "@/components/ui/CustomCursor";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0B0C09]">
      <CustomCursor />
      <ScrollProgress />
      <Navigation />

      <section id="home">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="skills">
        <Skills />
      </section>

      <section id="journey">
        <Journey />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="experience">
        <ExperienceLeadership />
      </section>

      <section id="achievements">
        <Achievements />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <Footer />
    </main>
  );
}
