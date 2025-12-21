import Link from "next/link";
import { Container } from "./Container";

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
        <p>Simon Graham</p>
        <div className="flex gap-4">
          <Link
            href="mailto:enquiries@simongraham.tech"
            className="hover:text-zinc-300"
          >
            Email
          </Link>
          <Link
            href="https://www.linkedin.com/in/s-graham/"
            className="hover:text-zinc-300"
          >
            LinkedIn
          </Link>
        </div>
      </Container>
    </footer>
  );
}


