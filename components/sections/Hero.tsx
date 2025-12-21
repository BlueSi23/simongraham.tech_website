import Image from "next/image";
import { Button } from "../ui/button";
import { Container } from "../layout/Container";

export function Hero() {
  return (
    <section style={{ borderBottom: '1px solid rgba(39, 39, 42, 0.3)', paddingTop: '8rem', paddingBottom: '8rem' }}>
      <Container>
        <div style={{ display: 'grid', gap: '4rem', gridTemplateColumns: '1fr 1.5fr', alignItems: 'start' }}>
          {/* Left: Large Heading */}
          <div>
            <h1 style={{ 
              fontSize: 'clamp(3rem, 10vw, 8rem)', 
              fontWeight: 700, 
              lineHeight: '0.95', 
              letterSpacing: '-0.03em',
              color: '#ffffff'
            }}>
              About
            </h1>
          </div>
          
          {/* Right: Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingTop: '1rem' }}>
            <p style={{ 
              fontSize: 'clamp(1.5rem, 4vw, 3rem)', 
              fontWeight: 700, 
              lineHeight: '1.1', 
              letterSpacing: '-0.01em',
              color: '#ffffff'
            }}>
              Bridging concept, code, and production for immersive experiences.
            </p>
            <p style={{ 
              maxWidth: '42rem',
              fontSize: '1.125rem',
              lineHeight: '1.75',
              color: '#a1a1aa'
            }}>
              I help teams navigate the messy space between creative ambition and
              technical reality—de-risking projects, prototyping boldly, and
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
        </div>
      </Container>
    </section>
  );
}



