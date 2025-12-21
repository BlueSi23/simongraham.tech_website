'use client';

import Link from "next/link";
import { Container } from "./Container";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/experiments", label: "Experiments" },
  { href: "/articles", label: "Articles" },
  { href: "/timeline", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      borderBottom: '1px solid rgba(39, 39, 42, 0.3)',
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      backdropFilter: 'blur(4px)'
    }}>
      <Container style={{
        display: 'flex',
        height: '4rem',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Link
          href="/"
          style={{
            fontSize: '0.875rem',
            fontWeight: 500,
            letterSpacing: '-0.01em',
            color: '#ffffff',
            textDecoration: 'none'
          }}
        >
          Creative Technologist
        </Link>
        <nav style={{ display: 'flex', gap: '2rem' }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#a1a1aa',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#a1a1aa'}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}


