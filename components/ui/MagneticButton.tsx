"use client";

import { useRef, ReactNode, MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  strength?: number;
}

export default function MagneticButton({
  children,
  className,
  onClick,
  href,
  variant = "primary",
  size = "md",
  disabled = false,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#8A9A5B] to-[#66734F] text-[#0B0C09] hover:shadow-[0_0_30px_rgba(138,154,91,0.35)] border border-transparent",
    secondary:
      "bg-gradient-to-r from-[#B6BE9C] to-[#74805A] text-[#0B0C09] hover:shadow-[0_0_30px_rgba(182,190,156,0.3)] border border-transparent",
    ghost:
      "bg-transparent text-white hover:bg-white/5 border border-white/10 hover:border-white/20",
    outline:
      "bg-transparent text-[#8A9A5B] border border-[#8A9A5B]/40 hover:bg-[#8A9A5B]/10 hover:border-[#8A9A5B]",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const baseStyles = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-full font-medium",
    "transition-all duration-200 cursor-pointer select-none",
    variantStyles[variant],
    sizeStyles[size],
    disabled && "opacity-50 pointer-events-none",
    className
  );

  const inner = (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}
    >
      <motion.div
        className={baseStyles}
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
      >
        {children}
      </motion.div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return inner;
}
