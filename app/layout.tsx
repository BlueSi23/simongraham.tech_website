import type { ReactNode } from "react";
import "./globals.css";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { ParticleBackground } from "../components/effects/ParticleBackground";

export const metadata = {
  title: "Creative Technologist – Portfolio",
  description:
    "Creative technologist portfolio showcasing experiments, articles, and availability.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
      <body style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        margin: 0,
        padding: 0,
        position: 'relative',
      }}>
        <ParticleBackground />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
