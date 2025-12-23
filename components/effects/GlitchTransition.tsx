'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTransition } from "./TransitionContext";
import "./glitch-transition.css";

export function GlitchTransition({ children }: { children: React.ReactNode }) {
    const { isTransitioning, setTransitioning } = useTransition();
    const pathname = usePathname();
    const isDesktop = true; // Simplified for this snippet, but should keep responsive logic if possible or assume handled by CSS

    useEffect(() => {
        // Start transition effect
        setTransitioning(true);

        // End after 750ms (3/4 second)
        const timer = setTimeout(() => {
            setTransitioning(false);
        }, 750);

        return () => clearTimeout(timer);
    }, [pathname, setTransitioning]);

    // Only apply glitch effect on desktop, handled via CSS media queries mostly, but class helps
    // We can just rely on the CSS class being present
    const transitionClass = isTransitioning ? 'glitch-active' : '';

    return (
        <div className={transitionClass}>
            {children}
        </div>
    );
}
