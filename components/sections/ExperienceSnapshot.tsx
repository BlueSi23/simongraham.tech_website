'use client';

import { Container } from "../layout/Container";

const phases = [
  {
    label: "Foundations",
    range: "2003–2015",
    detail: "Video installations, media server systems & interactive media.",
  },
  {
    label: "Production Lead",
    range: "2015–2021",
    detail: "Technical production across experiential AV and interactive installations.",
  },
  {
    label: "Innovation Leadership",
    range: "2021–2025",
    detail: "Driving emerging tech adoption within immersive experience sectors and leading global innovation practice.",
  },
  {
    label: "Independent",
    range: "2026–Present",
    detail: "Consulting, creative technology direction & R&D.",
  },
];

export function ExperienceSnapshot() {
  return (
    <section style={{ borderTop: '1px solid rgba(39, 39, 42, 0.3)', paddingTop: '4rem', paddingBottom: '4rem' }}>
      <Container>
        <div style={{
          display: 'grid',
          gap: '2rem',
          gridTemplateColumns: '1fr',
          alignItems: 'start'
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontWeight: 700,
            lineHeight: '0.95',
            letterSpacing: '-0.03em',
            color: '#ffffff'
          }}>
            Experience
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <p style={{
              fontSize: '1.125rem',
              lineHeight: '1.75',
              color: '#a1a1aa'
            }}>
              Since 2003 I&apos;ve developed a career in the in-between space,
              where creative, technical, and operational decisions collide.
              From galleries and location-based entertainment to flagship
              immersive retail and R&D labs, I help teams hold the whole system
              in view while we make confident, pragmatic decisions.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingTop: '2rem' }}>
              {phases.map((phase) => (
                <div key={phase.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <p style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    color: '#71717a'
                  }}>
                    {phase.range}
                  </p>
                  <p style={{ fontSize: '1.125rem', fontWeight: 700, color: '#ffffff' }}>
                    {phase.label}
                  </p>
                  <p style={{ fontSize: '1rem', lineHeight: '1.75', color: '#a1a1aa' }}>
                    {phase.detail}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="/timeline"
              style={{
                display: 'inline-block',
                fontSize: '1rem',
                color: '#d4d4d8',
                textDecoration: 'none',
                paddingTop: '1rem',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#d4d4d8'}
            >
              View full timeline →
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}



