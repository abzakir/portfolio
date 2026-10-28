"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { me, nav } from "@/lib/data";
import { EASE } from "@/components/ui/motion";

function useLocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: me.timeZone,
      }).format(new Date());
    setTime(format());
    const id = setInterval(() => setTime(format()), 20_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const ids = nav.map((item) => item.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const time = useLocalTime();
  const active = useActiveSection();

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > previous && y > 400 && !open);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          solid && !open ? "border-b border-ink-line/70 bg-ink/75 backdrop-blur-md" : "border-b border-transparent"
        }`}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <nav className="wrap flex h-16 items-center justify-between">
          <a href="#top" className="group flex items-center gap-2.5" aria-label="Abdul Zakir, back to top">
            <span
              aria-hidden
              className="h-3 w-3 rounded-full border border-bone transition-[box-shadow,border-color] duration-500 group-hover:border-ember group-hover:shadow-[0_0_0_4px_rgba(255,138,61,0.18)]"
            />
            <span className="text-[15px] font-semibold tracking-tight">Abdul Zakir</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {nav.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href} className="relative">
                  <a
                    href={item.href}
                    className={`text-[13px] transition-colors ${isActive ? "text-bone" : "text-bone-muted hover:text-bone"}`}
                  >
                    {item.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-ember"
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-2 font-mono text-[11px] text-bone-muted md:flex">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-ember" aria-hidden />
            <span>
              {me.city} {time ?? "--:--"}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 -mr-2 flex h-10 items-center gap-2 px-2 font-mono text-[11px] uppercase tracking-[0.18em] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? "Close" : "Menu"}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-4 pb-8 pt-24 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <ul className="space-y-1">
              {nav.map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="display block text-[15vw] text-bone"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: EASE }}
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between font-mono text-[11px] text-bone-muted">
              <span>
                {me.city} {time ?? "--:--"}
              </span>
              <a href={`mailto:${me.email}`} className="text-bone">
                {me.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
