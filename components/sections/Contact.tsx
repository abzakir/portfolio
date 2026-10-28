"use client";

import { toast } from "sonner";
import { FadeUp, SectionLabel, SplitText } from "@/components/ui/motion";
import { me } from "@/lib/data";

function Roll({ children }: { children: string }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">{children}</span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full text-ember transition-transform duration-500 ease-out group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}

const elsewhere = [
  { label: "GitHub", href: me.github },
  { label: "LinkedIn", href: me.linkedin },
  { label: "Résumé (PDF)", href: me.resume },
];

export default function Contact() {
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(me.email);
      toast("Email copied");
    } catch {
      window.location.href = `mailto:${me.email}`;
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-16 overflow-hidden pb-10 pt-24 sm:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[55%] h-[60vw] max-h-[720px] w-[60vw] max-w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/[0.07] blur-[120px]"
      />
      <div className="wrap relative">
        <SectionLabel>Contact</SectionLabel>
        <h2 className="mt-8 text-[clamp(4rem,14vw,13rem)]">
          <SplitText text="Say" className="display" />{" "}
          <SplitText text="salaam." delay={0.1} className="font-serif font-normal italic leading-[0.9] tracking-tight text-ember" />
        </h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <FadeUp className="lg:col-span-5">
            <p className="text-[17px] leading-relaxed text-bone-muted">
              I&apos;m looking for internships and good hackathon teams. Email is the fastest way to reach me.
            </p>
          </FadeUp>

          <FadeUp delay={0.1} className="lg:col-span-7">
            <a
              href={`mailto:${me.email}`}
              className="group block text-[clamp(1.5rem,4.2vw,3.4rem)] font-semibold leading-tight tracking-tight"
            >
              <Roll>{me.email}</Roll>
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="mt-4 font-mono text-[12px] text-bone-dim transition-colors hover:text-bone"
            >
              copy address
            </button>
          </FadeUp>
        </div>

        <FadeUp delay={0.15} className="mt-20 flex flex-wrap gap-x-10 gap-y-4 border-t border-ink-line pt-8">
          {elsewhere.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group text-[18px] font-medium"
            >
              <Roll>{`${link.label} ↗`}</Roll>
            </a>
          ))}
        </FadeUp>

        <footer className="mt-24 flex flex-col gap-3 font-mono text-[11px] text-bone-dim sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Abdul Zakir. Islamabad.</p>
          <p>The black hole up top is my own ray tracer, running on your GPU.</p>
          <a href="#top" className="transition-colors hover:text-bone">
            Back to top ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
