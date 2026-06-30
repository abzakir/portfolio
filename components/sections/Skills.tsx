"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Reveal, { Stagger, StaggerItem } from "@/components/ui/Reveal";
import IconRenderer from "@/components/ui/IconRenderer";
import { skills } from "@/lib/data";

type SkillCategory = "languages" | "tools" | "libraries";

const categories: { key: SkillCategory; label: string; color: string }[] = [
  { key: "languages", label: "Languages", color: "#6C63FF" },
  { key: "tools", label: "Tools", color: "#06B6D4" },
  { key: "libraries", label: "Libraries", color: "#8B5CF6" },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("languages");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const currentSkills = skills[activeCategory];
  const activeColor = categories.find((c) => c.key === activeCategory)?.color || "#6C63FF";

  return (
    <div className="section-padding bg-[#090912] relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#06B6D4]/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <Reveal>
          <div className="flex items-center gap-3 mb-16">
            <span className="font-mono text-sm text-[#06B6D4]">02.</span>
            <span className="font-mono text-sm text-[#475569]">tech_stack</span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#06B6D4]/20 to-transparent" />
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Heading + Category tabs */}
          <div className="space-y-8">
            <Reveal>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-white leading-tight">
                The{" "}
                <span style={{ color: activeColor }} className="transition-colors duration-300">
                  tools
                </span>{" "}
                I think in.
              </h2>
              <p className="text-[#64748B] mt-4 text-lg leading-relaxed">
                Not just technologies I've heard of — tools I've actually built with, 
                debugged at 2am, and shipped production code in.
              </p>
            </Reveal>

            {/* Category tabs */}
            <Reveal delay={0.2}>
              <div className="flex gap-3 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                      activeCategory === cat.key
                        ? "text-white"
                        : "text-[#64748B] hover:text-white glass border border-white/8"
                    }`}
                  >
                    {activeCategory === cat.key && (
                      <motion.div
                        layoutId="category-pill"
                        className="absolute inset-0 rounded-full"
                        style={{ background: `${cat.color}20`, border: `1px solid ${cat.color}40` }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{cat.label}</span>
                  </button>
                ))}
              </div>
            </Reveal>

            {/* All skills pill cloud */}
            <Reveal delay={0.3}>
              <div className="space-y-3">
                <p className="text-xs font-mono text-[#475569] uppercase tracking-widest">All technologies</p>
                <div className="flex flex-wrap gap-2">
                  {[...skills.languages, ...skills.tools, ...skills.libraries].map((skill) => (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs glass border border-white/8 text-[#64748B] hover:text-white hover:border-[#6C63FF]/30 transition-all duration-200 cursor-default"
                    >
                      {"image" in skill && skill.image ? (
                        <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                          <Image src={skill.image as string} alt={skill.name} width={14} height={14} className="object-contain" />
                        </div>
                      ) : (
                        <IconRenderer name={skill.icon} size={10} color={skill.color} />
                      )}
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: Skill cards */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 gap-3"
              >
                {currentSkills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="group relative glass border border-white/8 rounded-2xl p-5 hover:border-white/15 cursor-default transition-all duration-300 overflow-hidden"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {/* Hover glow */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(200px circle at 50% 50%, ${activeColor}10, transparent)`,
                      }}
                    />

                    <div className="relative z-10 flex items-center gap-4">
                      {/* Icon circle */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: `${skill.color}15`,
                          border: `1px solid ${skill.color}30`,
                        }}
                      >
                        {"image" in skill && skill.image ? (
                          <div className="relative w-7 h-7 flex items-center justify-center">
                            <Image src={skill.image as string} alt={skill.name} width={28} height={28} className="object-contain" />
                          </div>
                        ) : (
                          <IconRenderer name={skill.icon} size={20} color={skill.color} />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-white">{skill.name}</span>
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: skill.color }}
                          />
                        </div>
                        <p className="text-sm text-[#64748B]">{skill.desc}</p>
                      </div>

                      {/* Arrow indicator */}
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 text-[#475569]"
                        animate={{ x: hoveredSkill === skill.name ? 0 : -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        →
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
