import Image from "next/image";
import { Button } from "../ui/button";
import { Container } from "../layout/Container";

export function Hero() {
  return (
    <section style={{ borderBottom: '1px solid rgba(39, 39, 42, 0.3)', paddingTop: '4rem', paddingBottom: '4rem' }}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* Description - Order 2 on Mobile, Order 2 on Desktop (Right) */}
          <div className="order-2 lg:order-2" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <p style={{
              fontSize: 'clamp(1.25rem, 3vw, 2rem)',
              fontWeight: 700,
              lineHeight: '1.2',
              letterSpacing: '-0.01em',
              color: '#ffffff'
            }}>
              Bridging concept, code, hardware, content and production for immersive experiences.
            </p>
            <p style={{
              maxWidth: '42rem',
              fontSize: '1.125rem',
              lineHeight: '1.75',
              color: '#a1a1aa'
            }}>
              I help teams navigate the messy space between creative ambition and
              technical reality, de-risking projects, prototyping boldly, and
              shipping work that feels inevitable once you see it.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', paddingTop: '1rem' }}>
              <Button asChild size="lg">
                <a href="/contact">Start a conversation</a>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <a href="/experiments">Browse experiments</a>
              </Button>
            </div>
          </div>

          {/* Heading - Order 1 on Mobile, Order 1 on Desktop (Left) */}
          <div className="order-1 lg:order-1 flex justify-start">
            <h1 style={{
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              fontWeight: 700,
              lineHeight: '0.95',
              letterSpacing: '-0.03em',
              color: '#ffffff'
            }}>
              About
            </h1>
          </div>
        </div>
      </Container>
    </section>
  );
}



