"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Reveal, { Stagger, StaggerItem } from "@/components/ui/Reveal";
import GlowCard from "@/components/ui/GlowCard";
import MagneticButton from "@/components/ui/MagneticButton";
import { nuqtaData } from "@/lib/data";
import {
  ExternalLink,
  ArrowUpRight,
  ShieldCheck,
  LayoutDashboard,
  CalendarCheck,
  Sliders,
  Sparkles,
  Compass,
  Briefcase,
  Users,
  Lock,
  Zap,
  User,
  Clock,
  CheckCircle2,
  GraduationCap,
  UserCheck,
  Globe,
  Rocket,
  Flame,
  Quote,
  Target,
  ChevronRight,
  ArrowUp,
  Activity
} from "lucide-react";

// Icon mapping for features
const featureIconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  LayoutDashboard,
  CalendarCheck,
  Sliders,
  Sparkles,
  Compass,
  Briefcase,
  Users,
  Lock,
  Zap,
  User,
  Clock,
};

// Icon mapping for stat cards
const statIconMap: Record<string, React.ElementType> = {
  GraduationCap,
  UserCheck,
  Globe,
  Rocket,
};

export default function Startup() {
  const scrollToHome = () => {
    document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="section-padding bg-[#0B0C09] relative overflow-hidden" id="startup">
      {/* Background ambient lighting & floating blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#8A9A5B]/15 via-[#66734F]/5 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-[-100px] w-[450px] h-[450px] bg-[#C2A878]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-100px] w-[500px] h-[500px] bg-[#8A9A5B]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Hero Grid overlay */}
      <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Tag */}
        <Reveal>
          <div className="flex items-center gap-3 mb-8">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#8A9A5B]/15 text-[#8A9A5B] border border-[#8A9A5B]/30 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#8A9A5B] animate-pulse" />
              Startup Venture
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#8A9A5B]/30 via-white/10 to-transparent" />
          </div>
        </Reveal>

        {/* ---------------------------------------------------- */}
        {/* HERO SECTION */}
        {/* ---------------------------------------------------- */}
        <div className="text-center max-w-4xl mx-auto mb-24 relative">
          
          {/* Floating subtle particle sparkles */}
          <motion.div
            animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 left-10 text-[#8A9A5B]/30 hidden md:block"
          >
            <Sparkles size={32} />
          </motion.div>

          <motion.div
            animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-10 text-[#C2A878]/30 hidden md:block"
          >
            <Flame size={28} />
          </motion.div>

          {/* Logo with Glow Animation */}
          <Reveal className="flex justify-center mb-8">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#8A9A5B] via-[#B6BE9C] to-[#66734F] rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-glow" />
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-[#12140F] border border-white/15 flex items-center justify-center p-3 shadow-2xl overflow-hidden"
              >
                <Image
                  src={nuqtaData.logo}
                  alt="Nuqta Logo"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(138,154,91,0.5)]"
                  priority
                />
              </motion.div>
            </div>
          </Reveal>

          {/* Main Title & Subtitle */}
          <Reveal delay={0.1}>
            <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none mb-4">
              {nuqtaData.name}
            </h1>
            <p className="font-display font-medium text-xl sm:text-2xl md:text-3xl gradient-text mb-8 max-w-2xl mx-auto">
              {nuqtaData.tagline}
            </p>
          </Reveal>

          {/* Description Paragraphs */}
          <Reveal delay={0.2}>
            <div className="space-y-4 text-[#B7B9AD] text-base md:text-lg leading-relaxed max-w-3xl mx-auto bg-white/[0.02] p-6 md:p-8 rounded-2xl border border-white/5 backdrop-blur-md">
              {nuqtaData.fullDesc.map((para, idx) => (
                <p key={idx} className={idx === 0 ? "text-white font-medium" : ""}>
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          {/* Action CTAs in Hero */}
          <Reveal delay={0.3} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={nuqtaData.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#8A9A5B] to-[#66734F] text-[#0B0C09] font-semibold text-sm hover:shadow-[0_0_25px_rgba(138,154,91,0.5)] transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>Visit Nuqta Platform</span>
              <ExternalLink size={16} />
            </a>
            <a
              href="#mission"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass hover:bg-white/10 text-white font-medium text-sm border border-white/10 transition-all duration-300"
            >
              <span>Learn Our Mission</span>
              <ChevronRight size={16} />
            </a>
          </Reveal>

        </div>

        {/* ---------------------------------------------------- */}
        {/* MISSION SECTION */}
        {/* ---------------------------------------------------- */}
        <div className="mb-24" id="mission">
          <Reveal>
            <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden border border-[#8A9A5B]/30 bg-gradient-to-br from-[#12140F] via-[#1A1D15] to-[#0B0C09] shadow-2xl">
              {/* Decorative side accent */}
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#8A9A5B] via-[#B6BE9C] to-[#66734F]" />
              <div className="absolute top-0 right-0 p-8 text-[#8A9A5B]/10 pointer-events-none">
                <Target size={180} />
              </div>

              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-[#8A9A5B] tracking-wider mb-3">
                  <Target size={14} />
                  Foundational Purpose
                </div>

                <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
                  Our Mission
                </h2>

                <blockquote className="font-display text-2xl md:text-3xl text-[#F2F0E8] font-semibold leading-snug mb-6 border-l-2 border-[#8A9A5B] pl-4 italic">
                  "{nuqtaData.mission.highlight}"
                </blockquote>

                <p className="text-[#B7B9AD] text-base md:text-lg leading-relaxed">
                  {nuqtaData.mission.text}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---------------------------------------------------- */}
        {/* IMPACT CARDS */}
        {/* ---------------------------------------------------- */}
        <div className="mb-24">
          <Reveal className="mb-10 text-center">
            <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-2">
              Ecosystem & Reach
            </h3>
            <p className="text-[#8E9285] text-sm md:text-base">
              Quantifying our commitment to accessible education and real impact
            </p>
          </Reveal>

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {nuqtaData.impactStats.map((stat) => {
              const IconComp = statIconMap[stat.icon] || Globe;
              return (
                <StaggerItem key={stat.title}>
                  <GlowCard
                    className="p-6 h-full flex flex-col justify-between group"
                    glowColor={`${stat.color}25`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{
                            background: `${stat.color}15`,
                            border: `1px solid ${stat.color}30`,
                          }}
                        >
                          <IconComp size={22} style={{ color: stat.color }} />
                        </div>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-mono font-semibold flex items-center gap-1.5"
                          style={{
                            background: `${stat.color}15`,
                            color: stat.color,
                            border: `1px solid ${stat.color}30`,
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ background: stat.color }} />
                          {stat.badge}
                        </span>
                      </div>

                      <h4 className="font-display font-bold text-xl text-white group-hover:text-[#F2F0E8]">
                        {stat.title}
                      </h4>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#8E9285]">
                      <span>Status</span>
                      <span className="font-mono text-white">Active</span>
                    </div>
                  </GlowCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        {/* ---------------------------------------------------- */}
        {/* FEATURES GRID */}
        {/* ---------------------------------------------------- */}
        <div className="mb-24">
          <Reveal className="mb-12 text-center max-w-2xl mx-auto">
            <span className="font-mono text-xs text-[#8A9A5B] tracking-widest uppercase mb-2 block">
              Capabilities & Architecture
            </span>
            <h3 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
              Comprehensive Platform Features
            </h3>
            <p className="text-[#8E9285] text-base">
              Engineered for seamless mentorship scheduling, secure user authentication, and actionable academic roadmaps.
            </p>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.05}>
            {nuqtaData.features.map((feat) => {
              const IconComponent = featureIconMap[feat.icon] || Sparkles;
              return (
                <StaggerItem key={feat.name}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    <GlowCard className="p-6 h-full flex flex-col group relative overflow-hidden">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#8A9A5B] group-hover:bg-[#8A9A5B] group-hover:text-[#0B0C09] transition-all duration-300 mb-5">
                        <IconComponent size={22} />
                      </div>

                      <h4 className="font-display font-bold text-lg text-white mb-2 group-hover:text-[#8A9A5B] transition-colors">
                        {feat.name}
                      </h4>

                      <p className="text-[#8E9285] text-sm leading-relaxed flex-1">
                        {feat.desc}
                      </p>
                    </GlowCard>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        {/* ---------------------------------------------------- */}
        {/* TECHNOLOGY STACK */}
        {/* ---------------------------------------------------- */}
        <div className="mb-24">
          <Reveal className="mb-10 text-center">
            <span className="font-mono text-xs text-[#C2A878] tracking-widest uppercase mb-2 block">
              Technical Infrastructure
            </span>
            <h3 className="font-display font-bold text-3xl text-white mb-3">
              Startup Technology Stack
            </h3>
            <p className="text-[#8E9285] text-sm max-w-xl mx-auto">
              Modern full-stack technologies powering Nuqta's high-performance ecosystem.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
              {nuqtaData.techStack.map((tech) => (
                <motion.div
                  key={tech.name}
                  whileHover={{ scale: 1.06, y: -2 }}
                  className="glass px-4 py-2.5 rounded-xl border border-white/10 flex items-center gap-3 group cursor-default hover:border-[#8A9A5B]/50 transition-all duration-300"
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: tech.color }}
                  />
                  <span className="font-display font-semibold text-sm text-white">
                    {tech.name}
                  </span>
                  <span className="text-xs font-mono text-[#8E9285] bg-white/5 px-2 py-0.5 rounded-md">
                    {tech.category}
                  </span>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ---------------------------------------------------- */}
        {/* STARTUP JOURNEY TIMELINE */}
        {/* ---------------------------------------------------- */}
        <div className="mb-24">
          <Reveal className="mb-12 text-center">
            <span className="font-mono text-xs text-[#8A9A5B] tracking-widest uppercase mb-2 block">
              Venture Growth
            </span>
            <h3 className="font-display font-bold text-3xl md:text-4xl text-white mb-3">
              Startup Journey & Milestones
            </h3>
            <p className="text-[#8E9285] text-base max-w-xl mx-auto">
              From initial idea validation to shipping a live production platform
            </p>
          </Reveal>

          <div className="max-w-4xl mx-auto relative px-2">
            {/* Vertical timeline line */}
            <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 timeline-line" />

            <div className="space-y-8">
              {nuqtaData.timeline.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <Reveal key={item.milestone} delay={idx * 0.05}>
                    <div className={`relative flex flex-col md:flex-row items-start ${isEven ? "md:flex-row-reverse" : ""} group`}>
                      
                      {/* Timeline node icon */}
                      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#12140F] border-2 border-[#8A9A5B] flex items-center justify-center z-10 group-hover:scale-125 transition-transform duration-300">
                        {item.isHighlight ? (
                          <Rocket size={14} className="text-[#8A9A5B] animate-bounce" />
                        ) : (
                          <CheckCircle2 size={14} className="text-[#8A9A5B]" />
                        )}
                      </div>

                      {/* Content Card */}
                      <div className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                        <div className={`p-5 rounded-2xl border ${item.isHighlight ? "bg-[#8A9A5B]/10 border-[#8A9A5B]/50 shadow-[0_0_30px_rgba(138,154,91,0.2)]" : "glass border-white/10"} transition-all duration-300 hover:border-[#8A9A5B]/30`}>
                          <div className={`flex items-center gap-2 mb-1 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                            {item.isHighlight && (
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#8A9A5B] text-[#0B0C09]">
                                🚀 OFFICIALLY LIVE
                              </span>
                            )}
                            <h4 className="font-display font-bold text-lg text-white">
                              {item.milestone}
                            </h4>
                          </div>
                          <p className="text-xs text-[#8E9285] font-mono">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Launch Statement Below Timeline */}
            <Reveal delay={0.4} className="mt-12">
              <div className="glass p-6 md:p-8 rounded-2xl border border-white/10 text-center max-w-3xl mx-auto">
                <p className="text-[#B7B9AD] text-base leading-relaxed">
                  {nuqtaData.launchNote}
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* CURRENT STATUS & FOCUS */}
        {/* ---------------------------------------------------- */}
        <div className="mb-24">
          <Reveal>
            <div className="max-w-4xl mx-auto glass rounded-3xl p-8 md:p-10 border border-[#8A9A5B]/30 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#8A9A5B]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 mb-8 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                    </span>
                    <span className="font-mono text-sm font-bold text-emerald-400 tracking-wider">
                      STATUS: {nuqtaData.currentStatus.status}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white">
                    Current Phase: {nuqtaData.currentStatus.phase}
                  </h3>
                </div>

                <a
                  href={nuqtaData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs border border-white/10 transition-colors"
                >
                  <Activity size={14} className="text-emerald-400" />
                  Live Platform Check
                </a>
              </div>

              <div>
                <h4 className="font-display font-semibold text-lg text-white mb-4 flex items-center gap-2">
                  <Target size={18} className="text-[#8A9A5B]" />
                  Active Execution Focus
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {nuqtaData.currentStatus.focus.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-sm text-[#F2F0E8]"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#8A9A5B]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---------------------------------------------------- */}
        {/* LONG TERM VISION */}
        {/* ---------------------------------------------------- */}
        <div className="mb-24">
          <Reveal>
            <div className="relative rounded-3xl p-10 md:p-16 bg-gradient-to-r from-[#8A9A5B]/20 via-[#12140F] to-[#C2A878]/20 border border-white/15 text-center overflow-hidden shadow-2xl">
              <div className="absolute inset-0 noise opacity-20 pointer-events-none" />

              <Quote size={64} className="mx-auto text-[#8A9A5B]/30 mb-6" />

              <blockquote className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white leading-relaxed max-w-3xl mx-auto mb-8">
                "{nuqtaData.vision.quote}"
              </blockquote>

              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#8A9A5B] to-transparent mx-auto mb-8" />

              <p className="text-[#B7B9AD] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                {nuqtaData.vision.desc}
              </p>
            </div>
          </Reveal>
        </div>

        {/* ---------------------------------------------------- */}
        {/* FOUNDER NOTE */}
        {/* ---------------------------------------------------- */}
        <div className="mb-24">
          <Reveal>
            <div className="max-w-3xl mx-auto glass p-8 md:p-10 rounded-3xl border border-white/10 relative">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#C2A878] uppercase tracking-wider mb-4">
                <Sparkles size={14} />
                {nuqtaData.founderNote.title}
              </div>

              <p className="font-display text-xl md:text-2xl text-white italic leading-relaxed mb-6">
                "{nuqtaData.founderNote.quote}"
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8A9A5B] to-[#66734F] flex items-center justify-center font-display font-bold text-sm text-[#0B0C09]">
                    AZ
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-white text-sm">
                      {nuqtaData.founderNote.author}
                    </h5>
                    <p className="text-xs font-mono text-[#8E9285]">
                      {nuqtaData.founderNote.role}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono text-[#8A9A5B] bg-[#8A9A5B]/10 px-3 py-1 rounded-full border border-[#8A9A5B]/20">
                  FAST NUCES Co-Founder
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---------------------------------------------------- */}
        {/* VISIT NUQTA CTA */}
        {/* ---------------------------------------------------- */}
        <div>
          <Reveal>
            <div className="text-center p-10 md:p-14 rounded-3xl bg-gradient-to-b from-[#12140F] to-[#1A1D15] border border-[#8A9A5B]/30 relative overflow-hidden shadow-2xl">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#8A9A5B]/10 rounded-full blur-[100px] pointer-events-none" />

              <h3 className="font-display font-extrabold text-3xl md:text-5xl text-white mb-4">
                Experience Nuqta Today
              </h3>
              <p className="text-[#B7B9AD] text-base md:text-lg max-w-xl mx-auto mb-8">
                Building the future of student mentorship in Pakistan.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                <MagneticButton
                  variant="primary"
                  size="lg"
                  onClick={() => window.open(nuqtaData.website, "_blank", "noopener,noreferrer")}
                >
                  <span className="flex items-center gap-2">
                    <span>Visit Nuqta</span>
                    <ExternalLink size={18} />
                  </span>
                </MagneticButton>

                <MagneticButton
                  variant="secondary"
                  size="lg"
                  onClick={scrollToHome}
                >
                  <span className="flex items-center gap-2">
                    <span>Explore My Portfolio</span>
                    <ArrowUp size={18} />
                  </span>
                </MagneticButton>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-xs font-mono text-[#8E9285]">
                <span>Official Domain:</span>
                <a
                  href={nuqtaData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8A9A5B] hover:underline flex items-center gap-1 font-semibold"
                >
                  {nuqtaData.website}
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </div>
  );
}
