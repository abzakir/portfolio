"use client";

import { motion } from "framer-motion";
import { Counter, EASE } from "@/components/ui/motion";
import { autopilot } from "@/lib/data";

const { funnel, lead } = autopilot;
const top = funnel[0].value;

export default function AutopilotDemo() {
  return (
    <div className="rounded-[22px] border border-ink-line bg-ink-raised p-5 font-mono text-[12px] sm:p-7">
      <div className="flex items-center justify-between text-bone-dim">
        <span>mission · logistics, Pakistan, 50–500 staff</span>
        <span className="flex items-center gap-1.5 text-ember">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-ember" /> running
        </span>
      </div>

      <ul className="mt-6 space-y-3">
        {funnel.map((stage, i) => (
          <li key={stage.label} className="grid grid-cols-[6.5rem_1fr_2rem] items-center gap-3">
            <span className="text-bone-muted">{stage.label}</span>
            <span className="relative h-2 overflow-hidden rounded-full bg-ink-line/60">
              <motion.span
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-ember to-ember-soft"
                initial={{ width: 0 }}
                whileInView={{ width: `${(stage.value / top) * 100}%` }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.18, ease: EASE }}
              />
            </span>
            <span className="text-right text-bone">
              <Counter value={stage.value} duration={1.1} />
            </span>
          </li>
        ))}
      </ul>

      <motion.div
        className="mt-7 rounded-xl border border-ink-line bg-ink p-4 sm:p-5"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
      >
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-[13px] text-bone">{lead.name}</span>
          <span className="flex items-baseline gap-2">
            <span className="text-[26px] font-medium leading-none text-ember-soft">
              <Counter value={lead.score} duration={1.8} />%
            </span>
            <span className="rounded border border-ember/40 px-1.5 py-0.5 text-[9.5px] uppercase tracking-wider text-ember">
              qualified
            </span>
          </span>
        </div>
        <ul className="mt-4 space-y-2">
          {lead.factors.map((f, i) => (
            <li key={f.k} className="grid grid-cols-[7.5rem_1fr_3.5rem] items-center gap-3 text-[11px]">
              <span className="text-bone-dim">{f.k}</span>
              <span className="relative h-1 rounded-full bg-ink-line/60">
                <motion.span
                  className="absolute inset-y-0 left-0 rounded-full bg-bone-muted"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(f.v / f.max) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 1.1 + i * 0.07, ease: EASE }}
                />
              </span>
              <span className="text-right tabular-nums text-bone-muted">
                {f.v}/{f.max}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[10.5px] text-bone-dim">every point links to a research record with a source URL</p>
      </motion.div>
    </div>
  );
}
