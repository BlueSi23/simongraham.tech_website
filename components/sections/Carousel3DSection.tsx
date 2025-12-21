'use client';

import { Carousel3D } from '../ui/carousel-3d';
import { Container } from '../layout/Container';

// Colorful gradient backgrounds for experiments
const exampleImages = [
  {
    src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Cdefs%3E%3ClinearGradient id="g1" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23667eea;stop-opacity:1"/%3E%3Cstop offset="100%25" style="stop-color:%23764ba2;stop-opacity:1"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="400" fill="url(%23g1)"/%3E%3C/svg%3E',
    alt: 'Coming soon',
    title: 'Coming soon',
    description: 'New experiment in development.',
  },
  {
    src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Cdefs%3E%3ClinearGradient id="g2" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23f093fb;stop-opacity:1"/%3E%3Cstop offset="100%25" style="stop-color:%234facfe;stop-opacity:1"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="400" fill="url(%23g2)"/%3E%3C/svg%3E',
    alt: 'Coming soon',
    title: 'Coming soon',
    description: 'New experiment in development.',
  },
  {
    src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Cdefs%3E%3ClinearGradient id="g3" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23fa709a;stop-opacity:1"/%3E%3Cstop offset="100%25" style="stop-color:%23fee140;stop-opacity:1"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="400" fill="url(%23g3)"/%3E%3C/svg%3E',
    alt: 'Coming soon',
    title: 'Coming soon',
    description: 'New experiment in development.',
  },
  {
    src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Cdefs%3E%3ClinearGradient id="g4" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%2330cfd0;stop-opacity:1"/%3E%3Cstop offset="100%25" style="stop-color:%23330867;stop-opacity:1"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="400" fill="url(%23g4)"/%3E%3C/svg%3E',
    alt: 'Coming soon',
    title: 'Coming soon',
    description: 'New experiment in development.',
  },
  {
    src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Cdefs%3E%3ClinearGradient id="g5" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23a8edea;stop-opacity:1"/%3E%3Cstop offset="100%25" style="stop-color:%23fed6e3;stop-opacity:1"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="400" fill="url(%23g5)"/%3E%3C/svg%3E',
    alt: 'Coming soon',
    title: 'Coming soon',
    description: 'New experiment in development.',
  },
  {
    src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Cdefs%3E%3ClinearGradient id="g6" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23ff9a9e;stop-opacity:1"/%3E%3Cstop offset="100%25" style="stop-color:%23fecfef;stop-opacity:1"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="400" fill="url(%23g6)"/%3E%3C/svg%3E',
    alt: 'Coming soon',
    title: 'Coming soon',
    description: 'New experiment in development.',
  },
  {
    src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Cdefs%3E%3ClinearGradient id="g7" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23ffecd2;stop-opacity:1"/%3E%3Cstop offset="100%25" style="stop-color:%23fcb69f;stop-opacity:1"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="400" fill="url(%23g7)"/%3E%3C/svg%3E',
    alt: 'Coming soon',
    title: 'Coming soon',
    description: 'New experiment in development.',
  },
  {
    src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Cdefs%3E%3ClinearGradient id="g8" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23ff6e7f;stop-opacity:1"/%3E%3Cstop offset="100%25" style="stop-color:%23bfe9ff;stop-opacity:1"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="400" fill="url(%23g8)"/%3E%3C/svg%3E',
    alt: 'Coming soon',
    title: 'Coming soon',
    description: 'New experiment in development.',
  },
  {
    src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Cdefs%3E%3ClinearGradient id="g9" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23e0c3fc;stop-opacity:1"/%3E%3Cstop offset="100%25" style="stop-color:%238ec5fc;stop-opacity:1"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="400" fill="url(%23g9)"/%3E%3C/svg%3E',
    alt: 'Coming soon',
    title: 'Coming soon',
    description: 'New experiment in development.',
  },
  {
    src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Cdefs%3E%3ClinearGradient id="g10" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23f77062;stop-opacity:1"/%3E%3Cstop offset="100%25" style="stop-color:%23fe5196;stop-opacity:1"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="400" fill="url(%23g10)"/%3E%3C/svg%3E',
    alt: 'Coming soon',
    title: 'Coming soon',
    description: 'New experiment in development.',
  },
  {
    src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Cdefs%3E%3ClinearGradient id="g11" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23c471f5;stop-opacity:1"/%3E%3Cstop offset="100%25" style="stop-color:%23fa71cd;stop-opacity:1"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="400" fill="url(%23g11)"/%3E%3C/svg%3E',
    alt: 'Coming soon',
    title: 'Coming soon',
    description: 'New experiment in development.',
  },
  {
    src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Cdefs%3E%3ClinearGradient id="g12" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%234facfe;stop-opacity:1"/%3E%3Cstop offset="100%25" style="stop-color:%2300f2fe;stop-opacity:1"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="400" fill="url(%23g12)"/%3E%3C/svg%3E',
    alt: 'Coming soon',
    title: 'Coming soon',
    description: 'New experiment in development.',
  },
];


export function Carousel3DSection() {
  return (
    <section style={{
      borderBottom: '1px solid rgba(39, 39, 42, 0.3)',
      paddingTop: '8rem',
      paddingBottom: '8rem',
      minHeight: '600px',
      display: 'flex',
      alignItems: 'center',
    }}>
      <Container>
        <div style={{
          marginBottom: '6rem',
          display: 'grid',
          gap: '4rem',
          gridTemplateColumns: '1fr 1.5fr',
          alignItems: 'start'
        }}>
          <h2 style={{
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            fontWeight: 700,
            lineHeight: '0.95',
            letterSpacing: '-0.03em',
            color: '#ffffff'
          }}>
            Experiments
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingTop: '1rem' }}>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.75', color: '#a1a1aa' }}>
              Interactive prototypes and explorations in emerging technology.
            </p>
          </div>
        </div>

        {/* 3D Carousel Container */}
        <div style={{
          width: '100%',
          height: '500px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'visible',
        }}>
          <Carousel3D
            images={exampleImages}
            rotationSpeed={15}
            imageSize={180}
            zDepth={400}
            autoRotate={true}
          />
        </div>
      </Container>
    </section>
  );
}

