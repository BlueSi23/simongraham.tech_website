"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface HoverBoxLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    target?: string;
}

export function HoverBoxLink({ href, children, className = "", target }: HoverBoxLinkProps) {
    return (
        <Link
            href={href}
            className={`relative inline-block px-1 group ${className}`}
            target={target}
        >
            {/* The Box */}
            <span className="absolute inset-0 border border-white/40 scale-y-0 transition-transform duration-300 origin-center group-hover:scale-y-100" />

            {/* The Text */}
            <span className="relative z-10 block transition-colors duration-300 group-hover:text-white">
                {children}
            </span>
        </Link>
    );
}
