"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Journey", href: "#journey" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Github, href: personalInfo.github, label: "GitHub" },
  { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/5 bg-[#050508]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#6C63FF]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6C63FF] to-[#8B5CF6] flex items-center justify-center font-display font-bold text-sm text-white">
                AZ
              </div>
              <span className="font-display font-bold text-white text-lg">{personalInfo.name}</span>
            </div>
            <p className="text-[#64748B] text-sm leading-relaxed max-w-xs">
              CS Student @ FAST NUCES · Software Developer · Building things that matter.
            </p>
            <div className="flex items-center gap-1 mt-4">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-xs text-[#64748B]">Available for opportunities</span>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="font-mono text-xs text-[#475569] uppercase tracking-widest mb-5">Navigation</h4>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm text-[#64748B] hover:text-white transition-colors text-left cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs text-[#475569] uppercase tracking-widest mb-5">Get in touch</h4>
            <div className="space-y-2 mb-6">
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-sm text-[#64748B] hover:text-white transition-colors block"
              >
                {personalInfo.email}
              </a>
              <a
                href={`tel:${personalInfo.phone}`}
                className="text-sm text-[#64748B] hover:text-white transition-colors block"
              >
                {personalInfo.phone}
              </a>
              <p className="text-sm text-[#64748B]">{personalInfo.location}</p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 glass border border-white/8 rounded-xl flex items-center justify-center text-[#64748B] hover:text-white hover:border-white/20 transition-all duration-200"
                    whileHover={{ scale: 1.1, y: -2 }}
                    aria-label={social.label}
                  >
                    <Icon size={16} />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#475569]">
            © 2025 Abdul Zakir · All rights reserved
          </p>
          <p className="text-xs text-[#475569] flex items-center gap-1.5">
            Built with
            <Heart size={10} className="text-[#F43F5E]" />
            using Next.js · TypeScript · Framer Motion · Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
