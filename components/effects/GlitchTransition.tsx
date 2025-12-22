'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import "./glitch-transition.css";

export function GlitchTransition({ children }: { children: React.ReactNode }) {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);
    const pathname = usePathname();

    // Detect if viewport is desktop (≥1024px)
    useEffect(() => {
        const checkViewport = () => {
            setIsDesktop(window.matchMedia('(min-width: 1024px)').matches);
        };

        // Check on mount
        checkViewport();

        // Listen for viewport changes
        const mediaQuery = window.matchMedia('(min-width: 1024px)');
        const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);

        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
        // Start transition effect
        setIsTransitioning(true);

        // End after 750ms (3/4 second)
        const timer = setTimeout(() => {
            setIsTransitioning(false);
        }, 750);

        return () => clearTimeout(timer);
    }, [pathname]);

    // Only apply glitch effect on desktop, use simple fade on mobile
    const transitionClass = isTransitioning
        ? (isDesktop ? 'glitch-active' : 'mobile-fade-active')
        : '';

    return (
        <div className={transitionClass}>
            {children}
        </div>
    );
}
