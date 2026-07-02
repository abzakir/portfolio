"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { personalInfo } from "@/lib/data";
import MagneticButton from "@/components/ui/MagneticButton";
import { Github, Linkedin, Mail, ChevronDown, Download, ExternalLink } from "lucide-react";

// Floating particle component
function Particle({
  delay,
  x,
  size,
  duration,
}: {
  delay: number;
  x: number;
  size: number;
  duration: number;
}) {
  return (
    <motion.div
      className="absolute bottom-0 rounded-full bg-gradient-to-t from-[#8A9A5B]/40 to-transparent pointer-events-none"
      style={{ left: `${x}%`, width: size, height: size }}
      initial={{ y: "0%", opacity: 0 }}
      animate={{
        y: [0, -800, -1200],
        opacity: [0, 0.6, 0],
        scale: [0.5, 1, 0.5],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

export default function Hero() {
  const particles = Array.from({ length: 20 }, (_, i) => {
    const seed = (i * 37 + 17) % 100;
    return {
      id: i,
      delay: (seed % 80) / 10,
      x: (seed * 53) % 100,
      size: 2 + ((seed * 29) % 40) / 10,
      duration: 8 + ((seed * 11) % 40) / 10,
    };
  });

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0B0C09]">
      {/* Grid pattern */}
      <div className="absolute inset-0 hero-grid opacity-60" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#8A9A5B]/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#B6BE9C]/8 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#66734F]/5 blur-[150px] pointer-events-none" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <Particle
            key={p.id}
            delay={p.delay}
            x={p.x}
            size={p.size}
            duration={p.duration}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#8A9A5B]/30 text-sm text-[#B7B9AD] mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#B6BE9C] animate-pulse" />
          Available for Internships & Collaborations · Islamabad, Pakistan
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h1 className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl text-white mb-4 tracking-tight leading-none">
            Abdul{" "}
            <span className="relative inline-block">
              <span className="gradient-text">Zakir</span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-[#8A9A5B] to-[#B6BE9C] rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ transformOrigin: "left" }}
              />
            </span>
          </h1>
        </motion.div>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-xl sm:text-2xl text-[#B7B9AD] mb-6 h-8 flex items-center justify-center"
        >
          <span className="font-mono text-[#8A9A5B] mr-2">→</span>
          <TypeAnimation
            sequence={[
              "Software Developer", 2000,
              "AI Enthusiast", 2000,
              "Problem Solver", 2000,
              "Computer Vision Explorer", 2000,
              "Builder of Digital Experiences", 2000,
              "CS Student @ FAST NUCES", 2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-white font-medium"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-[#8E9285] text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Second-year CS student at FAST NUCES who builds real things — from AI-powered 
          computer vision systems to game engines in C++. I lead, I ship, I learn fast.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <MagneticButton variant="primary" size="lg" onClick={scrollToProjects}>
            <ExternalLink size={16} />
            View Projects
          </MagneticButton>
          <MagneticButton variant="ghost" size="lg" onClick={scrollToContact}>
            <Mail size={16} />
            Contact Me
          </MagneticButton>
          <MagneticButton variant="ghost" size="lg" href="https://github.com/abzakir">
            <Github size={16} />
            GitHub
          </MagneticButton>
          <MagneticButton variant="ghost" size="lg" href="https://www.linkedin.com/in/abdul-zakir-833793309">
            <Linkedin size={16} />
            LinkedIn
          </MagneticButton>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex flex-wrap items-center justify-center gap-8"
        >
          {personalInfo.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl font-display font-bold gradient-text">{stat.value}</div>
              <div className="text-xs text-[#8E9285] mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#666B60] hover:text-white transition-colors cursor-pointer"
      >
        <span className="text-xs tracking-widest uppercase font-mono">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </div>
  );
}
