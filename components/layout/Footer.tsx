import Link from "next/link";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-6 text-xs text-zinc-500">
      <Container className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Creative Technologist.</p>
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


