"use client";

import { useRef, useState, MouseEvent, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  tilt?: boolean;
}

export default function GlowCard({
  children,
  className,
  glowColor = "rgba(108, 99, 255, 0.15)",
  tilt = true,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowStyle, setGlowStyle] = useState({});
  const [rotateStyle, setRotateStyle] = useState({});

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Glow follows cursor
    setGlowStyle({
      background: `radial-gradient(300px circle at ${x}px ${y}px, ${glowColor}, transparent 70%)`,
    });

    if (tilt) {
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateY = ((x - cx) / cx) * 8;
      const rotateX = -((y - cy) / cy) * 8;
      setRotateStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      });
    }
  };

  const handleMouseLeave = () => {
    setGlowStyle({});
    setRotateStyle({});
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-2xl glass border border-white/8",
        "transition-all duration-300 ease-out",
        className
      )}
      style={{
        ...rotateStyle,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow layer */}
      <div
        className="absolute inset-0 pointer-events-none z-0 rounded-2xl transition-opacity duration-300"
        style={glowStyle}
      />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
