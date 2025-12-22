import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { HoverBoxLink } from "../ui/HoverBoxLink";

export function Footer() {
  return (
    <footer
      className="border-t border-zinc-800 py-6 text-xs text-zinc-500"
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
      <Container className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 opacity-80 hover:opacity-100 transition-opacity">
            <Image
              src="/images/sg-logo.png"
              alt="Simon Graham Logo"
              fill
              className="object-contain"
            />
          </div>
          <p className="font-medium tracking-tight text-zinc-400">Simon Graham</p>
        </div>
        <div className="flex gap-4">
          <HoverBoxLink
            href="mailto:enquiries@simongraham.tech"
            className="hover:text-zinc-300"
          >
            Email
          </HoverBoxLink>
          <HoverBoxLink
            href="https://www.linkedin.com/in/s-graham/"
            className="hover:text-zinc-300"
          >
            LinkedIn
          </HoverBoxLink>
        </div>
      </Container>
    </footer>
  );
}
