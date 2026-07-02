import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Abdul Zakir — CS Student & Software Developer",
  description:
    "Portfolio of Abdul Zakir — BS Computer Science student at FAST NUCES, Islamabad. Software developer, AI enthusiast, and builder of interactive digital experiences.",
  keywords: [
    "Abdul Zakir",
    "FAST NUCES",
    "Software Developer",
    "Computer Science",
    "AI",
    "Pakistan",
    "Portfolio",
  ],
  authors: [{ name: "Abdul Zakir" }],
  openGraph: {
    title: "Abdul Zakir — Software Developer & CS Student",
    description:
      "Portfolio of Abdul Zakir — builder, leader, and AI enthusiast from Islamabad.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0B0C09] text-white antialiased">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1A1D15",
              border: "1px solid rgba(138,154,91,0.3)",
              color: "#F2F0E8",
            },
          }}
        />
      </body>
    </html>
  );
}
