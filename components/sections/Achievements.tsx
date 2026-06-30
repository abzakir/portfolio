"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal, { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { achievements } from "@/lib/data";
import { X } from "lucide-react";

const typeColors: Record<string, string> = {
  Competition: "#6C63FF",
  Award: "#F59E0B",
  Exhibition: "#06B6D4",
};

export default function Achievements() {
  const [selected, setSelected] = useState<typeof achievements[0] | null>(null);

  return (
    <div className="section-padding bg-[#090912] relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#F59E0B]/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <Reveal>
          <div className="flex items-center gap-3 mb-16">
            <span className="font-mono text-sm text-[#F59E0B]">06.</span>
            <span className="font-mono text-sm text-[#475569]">achievements</span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#F59E0B]/20 to-transparent" />
          </div>
        </Reveal>

        <Reveal>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-white leading-tight mb-4">
            Milestones &{" "}
            <span className="gradient-text-warm">Recognition.</span>
          </h2>
          <p className="text-[#64748B] text-lg max-w-2xl leading-relaxed mb-16">
            Every certificate is a chapter. Every competition is a test. 
            Here's what I've earned on the way.
          </p>
        </Reveal>

        {/* Achievement cards */}
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
          {achievements.map((achievement, i) => (
            <StaggerItem key={achievement.title}>
              <motion.div
                className="achievement-card glass border border-white/8 rounded-2xl p-6 cursor-pointer group hover:border-white/15"
                onClick={() => setSelected(achievement)}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                    style={{
                      background: `${achievement.color}15`,
                      border: `1px solid ${achievement.color}30`,
                    }}
                  >
                    {achievement.icon}
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{
                        background: `${typeColors[achievement.type] || achievement.color}15`,
                        color: typeColors[achievement.type] || achievement.color,
                        border: `1px solid ${typeColors[achievement.type] || achievement.color}25`,
                      }}
                    >
                      {achievement.type}
                    </span>
                    <span className="text-xs font-mono text-[#475569]">{achievement.year}</span>
                  </div>
                </div>

                <h3 className="font-semibold text-white mb-1.5 group-hover:text-white/90">
                  {achievement.title}
                </h3>
                <p
                  className="text-xs font-medium mb-3"
                  style={{ color: achievement.color }}
                >
                  {achievement.subtitle}
                </p>
                <p className="text-[#64748B] text-xs leading-relaxed line-clamp-2">
                  {achievement.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span
                    className="px-2.5 py-1 rounded-lg text-xs"
                    style={{
                      background: `${achievement.color}10`,
                      color: achievement.color,
                    }}
                  >
                    {achievement.category}
                  </span>
                  <span className="text-xs text-[#475569] group-hover:text-[#94A3B8] transition-colors">
                    Click to expand →
                  </span>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
            >
              <motion.div
                className="pointer-events-auto max-w-md w-full glass border border-white/12 rounded-3xl p-8"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                    style={{
                      background: `${selected.color}15`,
                      border: `2px solid ${selected.color}40`,
                    }}
                  >
                    {selected.icon}
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="w-8 h-8 rounded-lg glass border border-white/10 flex items-center justify-center text-[#64748B] hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{
                      background: `${selected.color}15`,
                      color: selected.color,
                      border: `1px solid ${selected.color}25`,
                    }}
                  >
                    {selected.type}
                  </span>
                  <span className="text-xs text-[#475569] font-mono">{selected.year}</span>
                </div>

                <h3 className="font-display font-bold text-2xl text-white mb-2">
                  {selected.title}
                </h3>
                <p className="text-sm font-medium mb-4" style={{ color: selected.color }}>
                  {selected.subtitle}
                </p>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{selected.description}</p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
