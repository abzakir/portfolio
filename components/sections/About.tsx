"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Reveal, { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { personalInfo } from "@/lib/data";
import { MapPin, GraduationCap, Code2, Zap } from "lucide-react";

const highlights = [
  { icon: GraduationCap, label: "FAST NUCES", sub: "BS Computer Science · 2025–2029", color: "#8A9A5B" },
  { icon: Code2, label: "5+ Projects", sub: "Games, AI, Web & Desktop", color: "#B6BE9C" },
  { icon: Zap, label: "AI & CV", sub: "Python, MediaPipe, Computer Vision", color: "#66734F" },
  { icon: MapPin, label: "Islamabad", sub: "Pakistan", color: "#C2A878" },
];

export default function About() {
  return (
    <div className="section-padding bg-[#0B0C09] relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8A9A5B]/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <Reveal>
          <div className="flex items-center gap-3 mb-16">
            <span className="font-mono text-sm text-[#8A9A5B]">01.</span>
            <span className="font-mono text-sm text-[#666B60]">about_me</span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#8A9A5B]/20 to-transparent" />
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Photo side */}
          <Reveal direction="left">
            <div className="relative flex justify-center lg:justify-start">
              {/* Decorative rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  className="w-[340px] h-[340px] rounded-full border border-[#8A9A5B]/15"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute w-[400px] h-[400px] rounded-full border border-[#B6BE9C]/10"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Photo */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div className="relative w-72 h-80 rounded-3xl overflow-hidden">
                  {/* Glow border */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#8A9A5B] via-[#66734F] to-[#B6BE9C] p-[2px]">
                    <div className="w-full h-full rounded-3xl overflow-hidden bg-[#12140F]">
                      <Image
                        src="/my-pic.jpeg"
                        alt="Abdul Zakir"
                        fill
                        className="object-cover object-top"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <motion.div
                  className="absolute -bottom-4 -right-4 glass border border-white/10 rounded-2xl px-4 py-3"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="text-xs text-[#B7B9AD]">Currently at</div>
                  <div className="text-sm font-semibold text-white">FAST NUCES</div>
                </motion.div>

                <motion.div
                  className="absolute -top-4 -left-4 glass border border-white/10 rounded-2xl px-4 py-3"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                >
                  <div className="text-xs text-[#B7B9AD]">Based in</div>
                  <div className="text-sm font-semibold text-white">Islamabad</div>
                </motion.div>
              </motion.div>
            </div>
          </Reveal>

          {/* Text side */}
          <div className="space-y-8">
            <Reveal>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-white leading-tight">
                Building things that{" "}
                <span className="gradient-text">actually work.</span>
              </h2>
            </Reveal>

            <Stagger className="space-y-5">
              {personalInfo.bio.map((para, i) => (
                <StaggerItem key={i}>
                  <p className="text-[#B7B9AD] text-lg leading-relaxed">{para}</p>
                </StaggerItem>
              ))}
            </Stagger>

            {/* Interest tags */}
            <Reveal delay={0.3}>
              <div className="flex flex-wrap gap-2">
                {personalInfo.interests.map((interest, i) => (
                  <motion.span
                    key={interest}
                    className="skill-tag px-3 py-1.5 rounded-full text-xs font-medium glass border border-white/8 text-[#B7B9AD] hover:text-white hover:border-[#8A9A5B]/40 cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </Reveal>

            {/* Languages */}
            <Reveal delay={0.4}>
              <div className="flex items-center gap-4 pt-2">
                <span className="text-xs text-[#666B60] font-mono uppercase tracking-wider">Languages:</span>
                <div className="flex flex-wrap items-center">
                  {personalInfo.languages.map((lang, idx) => (
                    <span key={lang.name} className="text-sm text-[#B7B9AD] flex items-center">
                      <span>{lang.name}</span>
                      {idx < personalInfo.languages.length - 1 && <span className="text-white/20 mx-2">·</span>}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Highlight cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-20">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <Reveal key={h.label} delay={i * 0.1}>
                <div className="glass border border-white/8 rounded-2xl p-5 hover:border-white/15 transition-all duration-300 group">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${h.color}15`, border: `1px solid ${h.color}30` }}
                  >
                    <Icon size={18} style={{ color: h.color }} />
                  </div>
                  <div className="font-semibold text-white text-sm mb-1">{h.label}</div>
                  <div className="text-xs text-[#8E9285]">{h.sub}</div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
