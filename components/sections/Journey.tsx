"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Reveal from "@/components/ui/Reveal";
import IconRenderer from "@/components/ui/IconRenderer";
import { timeline } from "@/lib/data";

function TimelineNode({ item, index, isLast }: { item: typeof timeline[0]; index: number; isLast: boolean }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-6 md:gap-10"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Left: Year + connector line */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Node */}
        <motion.div
          className="relative w-14 h-14 rounded-2xl flex items-center justify-center z-10 flex-shrink-0"
          style={{
            background: `${item.color}15`,
            border: `2px solid ${item.color}40`,
          }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <IconRenderer name={item.icon} size={22} color={item.color} />
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{ background: `${item.color}20` }}
            animate={{ opacity: inView ? [0, 0.5, 0] : 0 }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
          />
        </motion.div>

        {/* Connector line */}
        {!isLast && (
          <motion.div
            className="w-[2px] mt-2 flex-1 min-h-[60px]"
            style={{
              transformOrigin: "top",
              background: `linear-gradient(180deg, ${item.color}60, ${timeline[index + 1]?.color || item.color}20)`,
            }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        )}
      </div>

      {/* Right: Content */}
      <div className={`flex-1 ${isLast ? "" : "pb-10"}`}>
        {/* Year badge */}
        <div
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium mb-3"
          style={{
            background: `${item.color}15`,
            color: item.color,
            border: `1px solid ${item.color}30`,
          }}
        >
          {item.year}
        </div>

        {/* Glass card */}
        <motion.div
          className="glass border border-white/8 rounded-2xl p-5 hover:border-white/15 transition-all duration-300 group"
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <h3 className="font-display font-semibold text-lg text-white mb-2 group-hover:text-white/90">
            {item.title}
          </h3>
          <p className="text-[#8E9285] text-sm leading-relaxed">{item.description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Journey() {
  return (
    <div className="section-padding bg-[#0B0C09] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-[#66734F]/4 rounded-full blur-[120px] pointer-events-none -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <Reveal>
          <div className="flex items-center gap-3 mb-16">
            <span className="font-mono text-sm text-[#66734F]">03.</span>
            <span className="font-mono text-sm text-[#666B60]">my_journey</span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#66734F]/20 to-transparent" />
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Heading */}
          <div>
            <Reveal>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-white leading-tight mb-6">
                From curious{" "}
                <span className="gradient-text">kid</span>
                {" "}to serious{" "}
                <span style={{ color: "#66734F" }}>builder.</span>
              </h2>
              <p className="text-[#8E9285] text-lg leading-relaxed">
                Every project, competition, and leadership role is a chapter in this story. 
                Here's the journey so far — and it's just getting started.
              </p>
            </Reveal>

            {/* Education cards */}
            <Reveal delay={0.3} className="mt-10 space-y-4">
              <p className="text-xs font-mono text-[#666B60] uppercase tracking-widest mb-4">Education</p>
              {[
                { school: "FAST NUCES", degree: "BS Computer Science", grade: "2025–2029", color: "#8A9A5B" },
                { school: "Aga Khan HSS Hyderabad", degree: "Intermediate", grade: "91.6%", color: "#B6BE9C" },
                { school: "Public School Hyderabad", degree: "Matriculation", grade: "84.5%", color: "#66734F" },
              ].map((edu, i) => (
                <motion.div
                  key={edu.school}
                  className="glass border border-white/8 rounded-xl px-5 py-4 flex items-center gap-4 hover:border-white/15 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div
                    className="w-2 h-10 rounded-full flex-shrink-0"
                    style={{ background: edu.color }}
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-white text-sm">{edu.school}</div>
                    <div className="text-xs text-[#8E9285]">{edu.degree}</div>
                  </div>
                  <div
                    className="text-sm font-mono font-medium px-3 py-1 rounded-lg"
                    style={{ background: `${edu.color}15`, color: edu.color }}
                  >
                    {edu.grade}
                  </div>
                </motion.div>
              ))}
            </Reveal>
          </div>

          {/* Timeline */}
          <Reveal delay={0.2}>
            <div className="space-y-0">
              {timeline.map((item, i) => (
                <TimelineNode
                  key={item.year}
                  item={item}
                  index={i}
                  isLast={i === timeline.length - 1}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
