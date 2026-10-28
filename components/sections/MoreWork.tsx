"use client";

import { motion } from "framer-motion";
import { EASE, SectionLabel } from "@/components/ui/motion";
import { me, moreWork } from "@/lib/data";

function Row({ item, index }: { item: (typeof moreWork)[number]; index: number }) {
  const inner = (
    <>
      <span
        aria-hidden
        className="absolute inset-0 origin-left scale-x-0 bg-ink-raised transition-transform duration-700 ease-out group-hover:scale-x-100"
      />
      <span className="relative grid items-baseline gap-x-8 gap-y-1 py-5 sm:py-6 md:grid-cols-12">
        <span className="text-[clamp(1.25rem,2.2vw,1.75rem)] font-semibold tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-2 md:col-span-4">
          {item.name}
        </span>
        <span className="text-[14px] leading-relaxed text-bone-muted md:col-span-5">{item.what}</span>
        <span className="font-mono text-[11.5px] text-bone-dim md:col-span-2">{item.stack}</span>
        <span
          aria-hidden
          className="hidden text-right text-bone-dim transition-all duration-500 group-hover:-translate-y-0.5 group-hover:text-ember md:col-span-1 md:block"
        >
          {item.href ? "↗" : ""}
        </span>
      </span>
    </>
  );

  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.7, delay: (index % 5) * 0.05, ease: EASE }}
      className="border-b border-ink-line"
    >
      {item.href ? (
        <a href={item.href} target="_blank" rel="noopener noreferrer" className="group relative -mx-4 block px-4 sm:-mx-6 sm:px-6">
          {inner}
        </a>
      ) : (
        <div className="group relative -mx-4 px-4 sm:-mx-6 sm:px-6">{inner}</div>
      )}
    </motion.li>
  );
}

export default function MoreWork() {
  return (
    <section className="py-24 sm:py-32">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Also built</SectionLabel>
            <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[0.95] tracking-tightest">
              Smaller projects, games and experiments.
            </h2>
          </div>
          <a
            href={me.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline pb-0.5 font-mono text-[12px] text-bone-muted hover:text-bone"
          >
            github.com/abzakir ↗
          </a>
        </div>
        <ul className="mt-12 border-t border-ink-line">
          {moreWork.map((item, i) => (
            <Row key={item.name} item={item} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
