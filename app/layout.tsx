import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import Providers from "@/components/Providers";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.abzakir.online"),
  title: "Abdul Zakir",
  description:
    "CS student at FAST NUCES Islamabad. National finalist at the Alibaba Cloud AI Hackathon Pakistan 2026 with MedNuskha. I build AI agents, physics simulations and things people use.",
  authors: [{ name: "Abdul Zakir" }],
  openGraph: {
    title: "Abdul Zakir",
    description:
      "MedNuskha, a ray-traced black hole, an AI sales agent, and Nuqta. Work by a CS student at FAST NUCES Islamabad.",
    images: ["/work/blackhole/step6.png"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0b0a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${instrument.variable} ${mono.variable}`}>
      <body>
        <Providers>{children}</Providers>
        <div className="grain" aria-hidden />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#151311",
              border: "1px solid #2a2622",
              color: "#ede6da",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
            },
          }}
        />
      </body>
    </html>
  );
}
