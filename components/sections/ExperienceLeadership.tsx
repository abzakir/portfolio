"use client";

import { motion } from "framer-motion";
import Reveal, { Stagger, StaggerItem } from "@/components/ui/Reveal";
import GlowCard from "@/components/ui/GlowCard";
import IconRenderer from "@/components/ui/IconRenderer";
import { experience, leadership } from "@/lib/data";

export default function ExperienceLeadership() {
  return (
    <div className="section-padding bg-[#050508] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#F43F5E]/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <Reveal>
          <div className="flex items-center gap-3 mb-16">
            <span className="font-mono text-sm text-[#F43F5E]">05.</span>
            <span className="font-mono text-sm text-[#475569]">experience_&_leadership</span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#F43F5E]/20 to-transparent" />
          </div>
        </Reveal>

        <Reveal>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-white leading-tight mb-4">
            Beyond{" "}
            <span style={{ color: "#F43F5E" }}>the code.</span>
          </h2>
          <p className="text-[#64748B] text-lg max-w-2xl leading-relaxed mb-16">
            Technical skills are table stakes. Real impact comes from leading, communicating, 
            and taking ownership. Here's where I've done exactly that.
          </p>
        </Reveal>

        {/* Professional Experience */}
        <Reveal delay={0.1}>
          <h3 className="font-mono text-xs text-[#475569] uppercase tracking-widest mb-6">
            Professional Experience
          </h3>
        </Reveal>

        {experience.map((exp, i) => (
          <Reveal key={exp.title} delay={0.1 * i}>
            <GlowCard
              className="p-6 mb-6"
              glowColor={`${exp.color}15`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${exp.color}15`, border: `1px solid ${exp.color}30` }}
                >
                  <IconRenderer name={exp.icon} size={22} color={exp.color} />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-display font-bold text-xl text-white">{exp.title}</h3>
                      <p className="text-[#94A3B8] text-sm">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs px-3 py-1 rounded-full font-mono"
                        style={{ background: `${exp.color}15`, color: exp.color }}
                      >
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-[#64748B] text-sm leading-relaxed mb-4">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-3 py-1 rounded-full text-xs glass border border-white/8 text-[#64748B]"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlowCard>
          </Reveal>
        ))}

        {/* Leadership */}
        <Reveal delay={0.2} className="mt-12">
          <h3 className="font-mono text-xs text-[#475569] uppercase tracking-widest mb-6">
            Leadership & Entrepreneurship
          </h3>
        </Reveal>

        <Stagger className="grid md:grid-cols-2 gap-6" staggerDelay={0.1}>
          {leadership.map((role, i) => (
            <StaggerItem key={role.title}>
              <GlowCard
                className="p-6 h-full"
                glowColor={`${role.color}15`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${role.color}15`, border: `1px solid ${role.color}30` }}
                  >
                    <IconRenderer name={role.icon} size={20} color={role.color} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-0.5">{role.title}</h3>
                    <p className="text-xs text-[#64748B]">{role.organization}</p>
                  </div>
                </div>

                <p className="text-[#64748B] text-sm leading-relaxed mb-4">{role.description}</p>

                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{ background: `${role.color}15`, color: role.color, border: `1px solid ${role.color}25` }}
                >
                  <span>✦</span>
                  <span>{role.impact}</span>
                </div>
              </GlowCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  );
}
