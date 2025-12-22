import Link from "next/link";

import { Container } from "./Container";
import { HoverBoxLink } from "../ui/HoverBoxLink";

export function Footer() {
  return (
    <footer
      className="border-t border-zinc-800 py-3 text-xs text-zinc-500"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        backdropFilter: 'blur(4px)',
        borderTop: '1px solid rgba(39, 39, 42, 0.3)'
      }}
    >
      <Container className="flex flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <p className="font-medium tracking-tight text-zinc-400">Simon Graham</p>
        </div>
        <div className="flex gap-4">
          <HoverBoxLink
            href="mailto:enquiries@simongraham.tech"
            className="hover:text-zinc-300 border border-white/40 sm:border-transparent px-2 sm:px-1 py-1 sm:py-0"
          >
            Email
          </HoverBoxLink>
          <HoverBoxLink
            href="https://www.linkedin.com/in/s-graham/"
            className="hover:text-zinc-300 border border-white/40 sm:border-transparent px-2 sm:px-1 py-1 sm:py-0"
          >
            LinkedIn
          </HoverBoxLink>
        </div>
      </Container>
    </footer>
  );
}
