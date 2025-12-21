import type { ReactNode } from "react";
import "./globals.css";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { GlitchTransition } from "../components/effects/GlitchTransition";
import { ParticleBackground } from "../components/effects/ParticleBackground";

export const metadata = {
  title: "Creative Technologist – Portfolio",
  description:
    "Creative technologist portfolio showcasing experiments, articles, and availability.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{
        minHeight: '100vh',
        backgroundColor: 'transparent',
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        margin: 0,
        padding: 0,
        position: 'relative',
      }}>
        {/* Text-aware particle background with chromatic aberration */}
        <ParticleBackground />

        <GlitchTransition>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </GlitchTransition>
      </body>
    </html>
  );
}
