"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal, { Stagger, StaggerItem } from "@/components/ui/Reveal";
import GlowCard from "@/components/ui/GlowCard";
import { projects } from "@/lib/data";
import { Github, ExternalLink, ArrowRight } from "lucide-react";

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="section-padding bg-[#090912] relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#F59E0B]/4 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-sm text-[#F59E0B]">04.</span>
            <span className="font-mono text-sm text-[#475569]">projects</span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#F59E0B]/20 to-transparent" />
          </div>
        </Reveal>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <Reveal>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-white leading-tight">
              What I{" "}
              <span className="gradient-text-warm">build.</span>
            </h2>
            <p className="text-[#64748B] mt-4 text-lg max-w-lg leading-relaxed">
              Real projects. Shipped code. Not tutorials — actual systems built from scratch 
              with thought, iteration, and a lot of debugging.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <a
              href="https://github.com/abzakir"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#64748B] hover:text-white transition-colors group"
            >
              <Github size={16} />
              View all on GitHub
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </Reveal>
        </div>

        {/* Projects grid */}
        <Stagger className="grid md:grid-cols-2 xl:grid-cols-3 gap-6" staggerDelay={0.08}>
          {projects.map((project, i) => (
            <StaggerItem key={project.title}>
              <motion.div
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="h-full"
              >
                <GlowCard
                  className="h-full flex flex-col p-6 group"
                  glowColor={`${project.color}20`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{
                        background: `${project.color}15`,
                        border: `1px solid ${project.color}30`,
                      }}
                    >
                      {project.icon}
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{
                          background: `${project.color}15`,
                          color: project.color,
                          border: `1px solid ${project.color}25`,
                        }}
                      >
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Title + tagline */}
                  <div className="mb-4">
                    <h3 className="font-display font-bold text-xl text-white mb-1.5 group-hover:text-white/90">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-[#475569]">{project.tagline}</p>
                  </div>

                  {/* Description */}
                  <p className="text-[#64748B] text-sm leading-relaxed mb-5 flex-1">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="mb-5">
                    <div className="space-y-1.5">
                      {project.features.slice(0, 3).map((f) => (
                        <div key={f} className="flex items-center gap-2 text-xs text-[#64748B]">
                          <div
                            className="w-1 h-1 rounded-full flex-shrink-0"
                            style={{ background: project.color }}
                          />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-xs glass border border-white/8 text-[#64748B] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 mt-auto pt-3 border-t border-white/5">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-[#64748B] hover:text-white transition-colors group/link"
                    >
                      <Github size={14} />
                      <span>Source Code</span>
                      <ArrowRight size={12} className="opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all" />
                    </a>

                    <div className="ml-auto">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-mono"
                        style={{
                          background: project.status === "Shipped" ? "#10B98115" : "#F59E0B15",
                          color: project.status === "Shipped" ? "#10B981" : "#F59E0B",
                        }}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  );
}
