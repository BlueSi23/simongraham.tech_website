'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import "./glitch-transition.css";

export function GlitchTransition({ children }: { children: React.ReactNode }) {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Start glitch effect
        setIsTransitioning(true);

        // End glitch after 750ms (3/4 second)
        const timer = setTimeout(() => {
            setIsTransitioning(false);
        }, 750);

        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <div className={isTransitioning ? 'glitch-active' : ''}>
            {children}
        </div>
    );
}
