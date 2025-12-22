'use client';

import Link from "next/link";
import Image from "next/image";
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
        justifyContent: 'flex-start',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        whiteSpace: 'nowrap'
      }}>
        <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }} className="w-full flex-nowrap">
          <Link href="/" className="relative w-8 h-8 opacity-80 hover:opacity-100 transition-opacity flex-shrink-0 -mt-1 border border-white/40 sm:border-transparent p-1 sm:p-0">
            <Image
              src="/images/sg-logo.png"
              alt="Home"
              fill
              className="object-contain"
            />
          </Link>

          {navItems.filter(i => i.href !== '/').map((item) => (
            <HoverBoxLink
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-zinc-400 no-underline whitespace-nowrap border border-white/40 sm:border-transparent px-2 sm:px-1 py-1 sm:py-0"
            >
              {item.label}
            </HoverBoxLink>
          ))}
        </nav>
      </Container>
    </header>
  );
}


