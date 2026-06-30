"use client";

import React from "react";
import * as Icons from "lucide-react";

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number;
  color?: string;
}

export default function IconRenderer({
  name,
  className,
  size = 20,
  color,
}: IconRendererProps) {
  // Map string names to Lucide icons
  const iconMap: Record<string, React.ComponentType<any>> = {
    // Skills
    code: Icons.Code,
    code2: Icons.Code2,
    terminal: Icons.Terminal,
    globe: Icons.Globe,
    palette: Icons.Palette,
    git: Icons.GitBranch,
    github: Icons.Github,
    linux: Icons.Cpu,
    vscode: Icons.Laptop,
    sfml: Icons.Gamepad2,
    mediapipe: Icons.Eye,

    // Education / Experience / Leadership
    graduation: Icons.GraduationCap,
    school: Icons.School,
    bookOpen: Icons.BookOpen,
    briefcase: Icons.Briefcase,
    award: Icons.Award,
    mic: Icons.Mic,
    users: Icons.Users,
    store: Icons.Store,

    // Projects
    clock: Icons.Clock,
    activity: Icons.Activity,
    gamepad: Icons.Gamepad2,
    target: Icons.Target,
    layout: Icons.Layout,

    // Achievements
    cpu: Icons.Cpu,
    droplet: Icons.Droplets,
    flask: Icons.FlaskConical,
    book: Icons.Book,

    // Timeline / General
    sparkles: Icons.Sparkles,
    repeat: Icons.RotateCw,
    shield: Icons.Shield,
    zap: Icons.Zap,
  };

  const IconComponent = iconMap[name] || Icons.HelpCircle;

  return <IconComponent className={className} size={size} color={color} />;
}
