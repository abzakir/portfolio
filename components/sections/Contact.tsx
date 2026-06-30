"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Reveal, { Stagger, StaggerItem } from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { personalInfo } from "@/lib/data";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Copy,
  Check,
  Download,
  Send,
} from "lucide-react";
import { toast } from "sonner";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    copyable: true,
    color: "#6C63FF",
  },
  {
    icon: Phone,
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
    copyable: true,
    color: "#06B6D4",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "abzakir",
    href: personalInfo.github,
    copyable: false,
    color: "#8B5CF6",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "abdul-zakir",
    href: personalInfo.linkedin,
    copyable: false,
    color: "#F59E0B",
  },
];

function ContactItem({ item }: { item: typeof contactItems[0] }) {
  const [copied, setCopied] = useState(false);
  const Icon = item.icon;

  const handleCopy = () => {
    navigator.clipboard.writeText(item.value);
    setCopied(true);
    toast.success(`Copied ${item.label}!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className="glass border border-white/8 rounded-2xl p-5 flex items-center gap-4 hover:border-white/15 transition-all duration-300 group"
      whileHover={{ x: 4 }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
      >
        <Icon size={18} style={{ color: item.color }} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-xs text-[#475569] font-mono mb-1">{item.label}</div>
        <a
          href={item.href}
          target={item.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="text-white text-sm font-medium hover:underline truncate block"
        >
          {item.value}
        </a>
      </div>

      {item.copyable && (
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-all duration-200 w-8 h-8 rounded-lg glass border border-white/10 flex items-center justify-center text-[#64748B] hover:text-white cursor-pointer"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
        </button>
      )}
    </motion.div>
  );
}

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    // Simulate sending (mailto fallback)
    await new Promise((r) => setTimeout(r, 1200));
    window.open(
      `mailto:${personalInfo.email}?subject=Portfolio Contact from ${formState.name}&body=${encodeURIComponent(formState.message)}`,
      "_blank"
    );
    setSubmitted(true);
    setLoading(false);
    toast.success("Message sent! I'll get back to you soon.");
  };

  return (
    <div className="section-padding bg-[#050508] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#6C63FF]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <Reveal>
          <div className="flex items-center gap-3 mb-16">
            <span className="font-mono text-sm text-[#6C63FF]">07.</span>
            <span className="font-mono text-sm text-[#475569]">contact</span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#6C63FF]/20 to-transparent" />
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Heading + contact items */}
          <div>
            <Reveal>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-white leading-tight mb-4">
                Let's{" "}
                <span className="gradient-text">connect.</span>
              </h2>
              <p className="text-[#64748B] text-lg leading-relaxed mb-10">
                Whether you're a recruiter, a fellow builder, or someone with an interesting problem — 
                I'm always open to a good conversation. Reach out.
              </p>
            </Reveal>

            <Stagger className="space-y-3" staggerDelay={0.08}>
              {contactItems.map((item) => (
                <StaggerItem key={item.label}>
                  <ContactItem item={item} />
                </StaggerItem>
              ))}
            </Stagger>

            {/* Resume download */}
            <Reveal delay={0.4} className="mt-8">
              <MagneticButton
                variant="secondary"
                size="lg"
                className="w-full justify-center"
                href="/Abdul_Zakir_Resume_Premium.pdf"
              >
                <Download size={16} />
                Download Resume (PDF)
              </MagneticButton>
            </Reveal>
          </div>

          {/* Right: Contact form */}
          <Reveal direction="left" delay={0.2}>
            <div className="glass border border-white/8 rounded-3xl p-8">
              <h3 className="font-display font-bold text-2xl text-white mb-2">Send a message</h3>
              <p className="text-[#64748B] text-sm mb-8">I typically reply within 24 hours.</p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 bg-[#10B981]/10 border border-[#10B981]/30 rounded-full flex items-center justify-center text-[#10B981] mb-4">
                    <Check size={28} />
                  </div>
                  <h4 className="font-display font-bold text-xl text-white mb-2">Message sent!</h4>
                  <p className="text-[#64748B] text-sm">Thanks for reaching out. I'll get back to you soon.</p>
                  <button
                    onClick={() => { setSubmitted(false); setFormState({ name: "", email: "", message: "" }); }}
                    className="mt-6 text-sm text-[#6C63FF] hover:text-[#8B5CF6] transition-colors cursor-pointer"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { name: "name", label: "Your Name", type: "text", placeholder: "John Doe" },
                    { name: "email", label: "Your Email", type: "email", placeholder: "john@example.com" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-xs font-mono text-[#475569] uppercase tracking-wider mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formState[field.name as "name" | "email"]}
                        onChange={(e) =>
                          setFormState((s) => ({ ...s, [field.name]: e.target.value }))
                        }
                        className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white placeholder-[#475569] text-sm focus:outline-none focus:border-[#6C63FF]/50 focus:bg-white/6 transition-all duration-200"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-xs font-mono text-[#475569] uppercase tracking-wider mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell me about your project, opportunity, or just say hi..."
                      value={formState.message}
                      onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                      className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white placeholder-[#475569] text-sm focus:outline-none focus:border-[#6C63FF]/50 focus:bg-white/6 transition-all duration-200 resize-none"
                    />
                  </div>

                  <MagneticButton
                    variant="primary"
                    size="lg"
                    className="w-full justify-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </MagneticButton>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
