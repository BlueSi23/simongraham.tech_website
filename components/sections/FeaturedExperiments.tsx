'use client';

import Link from "next/link";
import { Container } from "../layout/Container";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Experiment } from "../../lib/types";

interface FeaturedExperimentsProps {
  experiments: Experiment[];
}

export function FeaturedExperiments({
  experiments,
}: FeaturedExperimentsProps) {
  if (!experiments.length) return null;

  return (
    <section style={{ borderBottom: '1px solid rgba(39, 39, 42, 0.3)', paddingTop: '8rem', paddingBottom: '8rem' }}>
      <Container>
        <div className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* Headline - Left on Desktop */}
          <div className="order-1 lg:order-1 flex justify-start">
            <h2 style={{
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              fontWeight: 700,
              lineHeight: '0.95',
              letterSpacing: '-0.03em',
              color: '#ffffff'
            }}>
              Experiments
            </h2>
          </div>

          {/* Content - Right on Desktop */}
          <div className="order-2 lg:order-2 flex flex-col gap-6 pt-4">
            <p style={{ fontSize: '1.125rem', lineHeight: '1.75', color: '#a1a1aa' }}>
              Prototypes and explorations in AI, interaction, IoT, and emerging tech.
            </p>
            <Link
              href="/experiments"
              style={{
                display: 'inline-block',
                fontSize: '1rem',
                color: '#a1a1aa',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#a1a1aa'}
            >
              View all →
            </Link>
          </div>
        </div>
        <div style={{ display: 'grid', gap: '3rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {experiments.map((exp) => (
            <div key={exp.id} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
                {exp.title}
              </h3>
              <p style={{
                fontSize: '1rem',
                lineHeight: '1.75',
                color: '#a1a1aa',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {exp.excerpt}
              </p>
              {exp.tags && exp.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '0.5rem' }}>
                  {exp.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              <Link
                href={`/experiments/${exp.slug}`}
                style={{
                  display: 'inline-block',
                  fontSize: '1rem',
                  color: '#d4d4d8',
                  textDecoration: 'none',
                  paddingTop: '0.5rem',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#d4d4d8'}
              >
                View experiment →
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}



