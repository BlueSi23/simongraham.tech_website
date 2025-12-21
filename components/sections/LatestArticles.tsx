'use client';

import Link from "next/link";
import { Container } from "../layout/Container";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Article } from "../../lib/types";

interface LatestArticlesProps {
  articles: Article[];
}

export function LatestArticles({ articles }: LatestArticlesProps) {
  if (!articles.length) return null;

  return (
    <section style={{ borderBottom: '1px solid rgba(39, 39, 42, 0.3)', paddingTop: '8rem', paddingBottom: '8rem' }}>
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
            Articles
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingTop: '1rem' }}>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.75', color: '#a1a1aa' }}>
              Thoughts on process, technology, and building better systems.
            </p>
            <Link
              href="/articles"
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
          {articles.map((article) => (
            <div key={article.id} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
                {article.title}
              </h3>
              <p style={{ 
                fontSize: '1rem', 
                lineHeight: '1.75', 
                color: '#a1a1aa',
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {article.excerpt}
              </p>
              {article.tags && article.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '0.5rem' }}>
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              <Link
                href={`/articles/${article.slug}`}
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
                Read article →
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}



