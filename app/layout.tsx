import type { ReactNode } from "react";
import "./globals.css";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { GlitchTransition } from "../components/effects/GlitchTransition";
import { ParticleBackground } from "../components/effects/ParticleBackground";
import { TransitionProvider } from "../components/effects/TransitionContext";

import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.simongraham.tech"),
  title: "Simon Graham | Creative Technologist",
  description:
    "Creative technologist portfolio showcasing experiments, articles, and availability. Bridging concept, code, hardware, content and production.",
  openGraph: {
    title: "Simon Graham | Creative Technologist",
    description:
      "Creative technologist portfolio showcasing experiments, articles, and availability. Bridging concept, code, hardware, content and production.",
    url: "https://www.simongraham.tech",
    siteName: "Simon Graham",
    images: [
      {
        url: "/uploads/1766442486282-01_oblvn_light_table_ui_09.jpg", // Default image
        width: 1200,
        height: 630,
        alt: "Simon Graham - Creative Technologist Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simon Graham | Creative Technologist",
    description:
      "Creative technologist portfolio showcasing experiments, articles, and availability.",
    images: ["/uploads/1766442486282-01_oblvn_light_table_ui_09.jpg"],
  },
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
        <TransitionProvider>
          {/* Text-aware particle background with chromatic aberration */}
          <ParticleBackground />

          <GlitchTransition>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <Header />
              <main>{children}</main>
              <Footer />
            </div>
          </GlitchTransition>
        </TransitionProvider>
      </body>
    </html>
  );
}
