"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FadeUp } from "@/components/ui/motion";
import { blackHole } from "@/lib/data";

function Intro() {
  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <p className="label">{blackHole.kicker}</p>
        <h3 className="display mt-5 text-[clamp(3rem,6vw,5.5rem)]">{blackHole.title}</h3>
        <p className="mt-4 font-serif text-[clamp(1.35rem,2vw,1.7rem)] italic leading-snug text-bone">{blackHole.line}</p>
      </div>
      <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-bone-muted">
        {blackHole.body.map((p) => (
          <p key={p.slice(0, 20)}>{p}</p>
        ))}
      </div>
    </div>
  );
}

function StepCard({ step, priority = false }: { step: (typeof blackHole.steps)[number]; priority?: boolean }) {
  return (
    <figure className="group">
      <div className="relative aspect-video overflow-hidden rounded-xl border border-ink-line bg-black">
        <Image
          src={step.img}
          alt={`Step ${step.n}: ${step.title}`}
          fill
          sizes="(min-width: 768px) 52vw, 85vw"
          priority={priority}
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
        />
      </div>
      <figcaption className="mt-4 flex items-baseline gap-4">
        <span className="font-mono text-[12px] text-ember">{step.n}</span>
        <span className="text-[17px] font-medium">{step.title}</span>
        <span className="ml-auto text-[13px] text-bone-dim">{step.note}</span>
      </figcaption>
    </figure>
  );
}

function Outro() {
  return (
    <div className="flex h-full flex-col justify-center gap-6">
      <p className="label">Try it</p>
      {blackHole.links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-6 border-b border-ink-line pb-5 text-[clamp(1.5rem,2.6vw,2.4rem)] font-semibold tracking-tight transition-colors hover:text-ember"
        >
          {link.label}
          <span aria-hidden className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">
            ↗
          </span>
        </a>
      ))}
      <p className="font-mono text-[12px] text-bone-dim">{blackHole.stack.join(" · ")}</p>
    </div>
  );
}

// Desktop: the section pins and scroll moves the strip sideways.
function Pinned() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, (v) => -v * distance);
  const bar = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <div ref={sectionRef} className="relative hidden md:block" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-stretch gap-[4vw] pl-12 pr-[8vw] will-change-transform">
          <div className="w-[34vw] max-w-[520px] shrink-0 py-2">
            <Intro />
          </div>
          {blackHole.steps.map((step, i) => (
            <div key={step.n} className="w-[52vw] max-w-[860px] shrink-0 self-center">
              <StepCard step={step} priority={i === 0} />
            </div>
          ))}
          <div className="w-[30vw] max-w-[460px] shrink-0">
            <Outro />
          </div>
        </motion.div>

        <div className="wrap absolute inset-x-0 bottom-10">
          <div className="flex items-center gap-4 font-mono text-[11px] text-bone-dim">
            <span>scroll</span>
            <div className="relative h-px flex-1 bg-ink-line">
              <motion.div className="absolute inset-y-0 left-0 bg-ember" style={{ width: bar }} />
            </div>
            <span>{blackHole.steps.length} steps</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Phones: plain vertical text, then a swipeable row.
function Stacked() {
  return (
    <div className="py-24 md:hidden">
      <div className="wrap">
        <FadeUp>
          <Intro />
        </FadeUp>
      </div>
      <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none]">
        {blackHole.steps.map((step) => (
          <div key={step.n} className="w-[85vw] shrink-0 snap-center">
            <StepCard step={step} />
          </div>
        ))}
      </div>
      <div className="wrap mt-10">
        <Outro />
      </div>
    </div>
  );
}

export default function BlackHoleSteps() {
  return (
    <>
      <Pinned />
      <Stacked />
    </>
  );
}
