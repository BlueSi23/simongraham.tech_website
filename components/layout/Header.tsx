'use client';

import Link from "next/link";
import { Container } from "./Container";
import { HoverBoxLink } from "../ui/HoverBoxLink";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/experiments", label: "Experiments" },
  { href: "/writing", label: "Writing" },
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
        justifyContent: 'flex-end'
      }}>
        <nav style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {navItems.map((item) => (
            <HoverBoxLink
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-zinc-400 no-underline"
            >
              {item.label}
            </HoverBoxLink>
          ))}
        </nav>
      </Container>
    </header>
  );
}


