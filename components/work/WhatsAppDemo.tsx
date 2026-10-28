"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { EASE } from "@/components/ui/motion";
import { medNuskha } from "@/lib/data";

const { chat } = medNuskha;

// When each beat of the conversation appears, in seconds after it scrolls into view.
const BEATS = [0.4, 1.3, 2.6, 3.5, 5.0, 5.7, 6.4, 7.3];
const TYPING_BEFORE = [0, 2, 3]; // morning messages that get a typing indicator first

function Ticks() {
  return (
    <svg width="16" height="11" viewBox="0 0 16 11" aria-hidden className="inline-block">
      <path d="M11.1 0.6 5.3 7.9 2.7 5.4 1.6 6.5l3.8 3.7L12.3 1.6z" fill="#53BDEB" />
      <path d="M14.4 0.6 8.6 7.9l-.9-.9-1.1 1.4 2.1 1.9L15.5 1.6z" fill="#53BDEB" />
    </svg>
  );
}

function Typing({ side }: { side: "left" | "right" }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`flex w-fit gap-1 rounded-lg px-3 py-2.5 ${side === "left" ? "bg-wa-bubble" : "ml-auto bg-wa-out"}`}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-[#8696A0]"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </motion.div>
  );
}

function VoiceNote({ duration }: { duration: string }) {
  const bars = [4, 9, 6, 12, 8, 14, 10, 6, 11, 15, 9, 5, 12, 8, 13, 7, 10, 4, 9, 12, 6, 8, 5, 3];
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#00A884]">
        <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden>
          <path d="M0 0l10 6-10 6z" fill="#fff" />
        </svg>
      </span>
      <span className="relative flex h-4 items-center gap-[2px]">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            className="w-[2.5px] rounded-full bg-[#8696A0]"
            style={{ height: h }}
            initial={{ backgroundColor: "#8696A0" }}
            animate={{ backgroundColor: "#53BDEB" }}
            transition={{ delay: 0.3 + i * 0.07, duration: 0.2 }}
          />
        ))}
      </span>
      <span className="text-[11px] text-[#8696A0]">{duration}</span>
    </div>
  );
}

export default function WhatsAppDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const [beat, setBeat] = useState(-1);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setBeat(BEATS.length);
      return;
    }
    setBeat(-1);
    const timers = BEATS.map((t, i) => setTimeout(() => setBeat(i), t * 1000));
    return () => timers.forEach(clearTimeout);
  }, [inView, reduce, run]);

  const morningShown = chat.morning.filter((_, i) => beat >= i).length;
  const nextMorning = chat.morning[morningShown];
  const typingFor =
    nextMorning && TYPING_BEFORE.includes(morningShown) && beat >= morningShown - 1 && beat < BEATS.length
      ? nextMorning.from === "bot"
        ? "left"
        : "right"
      : null;
  const eveningShown = Math.max(0, Math.min(chat.evening.length, beat - chat.morning.length + 1));
  const alertShown = beat >= BEATS.length - 1;

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[380px]">
      <div className="overflow-hidden rounded-[28px] border border-ink-line bg-wa-bg shadow-[0_40px_120px_-40px_rgba(255,138,61,0.25)]">
        <div className="flex items-center gap-3 bg-wa-bubble px-4 py-3">
          <Image src="/work/mednuskha/logo.jpg" alt="" width={36} height={36} className="rounded-full" />
          <div className="leading-tight">
            <p className="text-[14px] font-medium text-[#E9EDEF]">MedNuskha</p>
            <p className="text-[11px] text-[#8696A0]">{typingFor === "left" ? "typing…" : "online"}</p>
          </div>
        </div>

        <div
          className="flex h-[470px] flex-col justify-end gap-1.5 px-3 pb-4 pt-3"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
          aria-live="polite"
        >
          <p className="mx-auto mb-2 rounded-md bg-wa-bubble px-2.5 py-1 text-[11px] text-[#8696A0]">Today</p>
          <AnimatePresence initial={false}>
            {chat.morning.slice(0, morningShown).map((msg, i) => {
              const mine = msg.from === "patient";
              return (
                <motion.div
                  key={`m${i}-${run}`}
                  layout
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className={`max-w-[82%] rounded-lg px-2.5 pb-1.5 pt-2 text-[13.5px] leading-snug text-[#E9EDEF] ${
                    mine ? "ml-auto origin-bottom-right bg-wa-out" : "origin-bottom-left bg-wa-bubble"
                  }`}
                >
                  {"voice" in msg && msg.voice ? <VoiceNote duration={msg.voice} /> : <span>{msg.text}</span>}
                  <span className="float-right ml-3 mt-1.5 flex items-center gap-1 text-[10px] text-[#8696A0]">
                    {msg.time}
                    {mine && <Ticks />}
                  </span>
                </motion.div>
              );
            })}
            {typingFor && <Typing key={`t${morningShown}-${run}`} side={typingFor} />}

            {eveningShown > 0 && (
              <motion.p
                key={`evening-${run}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mx-auto my-2 rounded-md bg-wa-bubble px-2.5 py-1 text-[11px] text-[#8696A0]"
              >
                Same day, 8 pm dose
              </motion.p>
            )}
            {chat.evening.slice(0, eveningShown).map((row, i) => (
              <motion.div
                key={`e${i}-${run}`}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex items-center gap-2 px-1 font-mono text-[11px] text-[#8696A0]"
              >
                <span className="text-[#E9EDEF]">{row.time}</span>
                <span className={i === chat.evening.length - 1 ? "text-ember" : ""}>{row.text}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {alertShown && (
          <motion.div
            key={`alert-${run}`}
            initial={{ opacity: 0, y: -24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="absolute -right-2 top-16 w-[88%] rounded-2xl border border-white/10 bg-[#1f1d1b]/95 p-3.5 shadow-2xl backdrop-blur sm:-right-10"
          >
            <div className="flex items-center gap-2 text-[11px] text-bone-muted">
              <span className="h-2 w-2 rounded-full bg-wa-green" />
              WhatsApp · to {chat.caretaker}, caretaker
            </div>
            <p className="mt-1.5 text-[13px] leading-snug text-bone">{chat.alert}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setRun((r) => r + 1)}
        className="mx-auto mt-5 block font-mono text-[11px] text-bone-dim transition-colors hover:text-bone"
      >
        ↻ replay
      </button>
    </div>
  );
}
