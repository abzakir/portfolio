"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import BlackHoleCanvas from "@/components/BlackHoleCanvas";
import { EASE } from "@/components/ui/motion";
import { hero } from "@/lib/data";

function Line({ children, delay }: { children: string; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block will-change-transform"
        initial={{ y: "102%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.2, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[620px] overflow-hidden">
      <BlackHoleCanvas className="absolute inset-0 h-full w-full" progress={scrollYProgress} />

      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-ink via-ink/60 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/80 to-transparent" />

      <motion.div
        style={{ opacity: fade }}
        className="pointer-events-none absolute left-4 top-20 sm:left-8 md:left-auto md:right-12 md:top-24 md:max-w-[17rem]"
      >
        <motion.p
          className="font-mono text-[10.5px] leading-relaxed text-bone-muted md:text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <span className="text-ember">fig. 1</span> <span className="md:hidden">{hero.figureShort}</span>
          <span className="hidden md:inline">{hero.figure}</span>
        </motion.p>
      </motion.div>

      <motion.div
        style={{ y: nameY }}
        className="pointer-events-none absolute inset-x-0 bottom-[calc(9rem+8vh)] sm:bottom-[11rem] md:bottom-[9.5rem]"
      >
        <div className="wrap">
          <motion.p
            className="label mb-5 !text-bone-muted"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            {hero.label}
            <span className="hidden sm:inline">{hero.labelMore}</span>
          </motion.p>
          <h1 className="display text-[min(23vw,26svh)] text-bone sm:text-[min(17vw,26svh)] lg:text-[min(15.5vw,25svh)] 2xl:text-[min(14rem,25svh)]">
            <Line delay={0.25}>Abdul</Line>
            <Line delay={0.37}>Zakir</Line>
          </h1>
        </div>
      </motion.div>

      <motion.div style={{ opacity: fade }} className="absolute inset-x-0 bottom-0 pb-8 sm:pb-10">
        <div className="wrap flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.p
            className="max-w-[34rem] text-[15px] leading-relaxed text-bone-muted sm:text-[17px]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: EASE }}
          >
            {hero.intro}
          </motion.p>

          <motion.div
            className="flex items-center justify-between gap-6 md:justify-end"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: EASE }}
          >
            <a
              href={hero.latest.href}
              className="group inline-flex items-center gap-3 rounded-full border border-ink-line bg-ink/60 py-2 pl-2 pr-4 text-[13px] backdrop-blur transition-colors hover:border-ember/60"
            >
              <span className="rounded-full bg-ember px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-ink">
                New
              </span>
              <span>{hero.latest.text}</span>
              <span aria-hidden className="transition-transform duration-500 ease-out group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
