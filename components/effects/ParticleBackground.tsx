"use client";

import { useEffect, useState, useRef, useMemo, memo } from "react";
import { usePathname } from "next/navigation";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";
import { useTransition } from "./TransitionContext";

// Isolated component to prevent re-renders when parent state (chromaticActive) changes
const StableParticles = memo(({ options }: { options: any }) => {
    return (
        <Particles
            id="particles-textaware"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
            }}
            options={options}
        />
    );
});

StableParticles.displayName = "StableParticles";

export function ParticleBackground() {
    const { isTransitioning } = useTransition();
    const [init, setInit] = useState(false);
    const [particleCount, setParticleCount] = useState(100);
    const [mounted, setMounted] = useState(false);
    const [chromaticActive, setChromaticActive] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);
    const canvasRef = useRef<HTMLDivElement>(null);

    // Ensure component is mounted on client
    useEffect(() => {
        setMounted(true);
        // Check viewport on mount
        setIsDesktop(window.matchMedia('(min-width: 1024px)').matches);

        // Listen for viewport changes
        const mediaQuery = window.matchMedia('(min-width: 1024px)');
        const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
        initParticlesEngine(async (engine: Engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    // Page transition effect - specific behavior for desktop vs mobile
    // Simplified: Constant particle count to prevent "jumping"
    useEffect(() => {
        if (!mounted) return;

        if (!isDesktop) {
            setParticleCount(30);
        } else {
            setParticleCount(50); // Constant count for desktop
        }
    }, [mounted, isDesktop]);

    // Chromatic aberration effect - Desktop only
    useEffect(() => {
        if (!mounted || !isDesktop) return;

        const scheduleNextAberration = () => {
            // Random delay between 10-20 seconds
            const delay = Math.random() * 10000 + 10000;

            return setTimeout(() => {
                setChromaticActive(true);

                // Effect lasts 600ms
                setTimeout(() => {
                    setChromaticActive(false);
                    scheduleNextAberration();
                }, 600);
            }, delay);
        };

        const timeoutId = scheduleNextAberration();

        return () => clearTimeout(timeoutId);
    }, [mounted, isDesktop]);

    const options = useMemo(() => ({
        background: {
            color: { value: "transparent" },
        },
        fpsLimit: 120,
        particles: {
            color: { value: "#ffffff" },
            links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.6,
                width: 1,
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none" as const,
                random: false,
                straight: false,
                outModes: {
                    default: "out" as const,
                },
            },
            number: {
                density: {
                    enable: true,
                },
                value: particleCount,
            },
            opacity: { value: 0.8 },
            size: { value: { min: 1, max: 2 } },
        },
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: ["repulse", "bubble"],
                },
                onClick: {
                    enable: true,
                    mode: "attract",
                },
            },
            modes: {
                repulse: {
                    distance: 200, // Increased from 150
                    duration: 0.4,
                    easing: "ease-out-quad",
                    factor: 100, // Increased factor for snappier repel
                    speed: 1,
                    maxSpeed: 50
                },
                bubble: {
                    distance: 200, // Increased from 100
                    size: 4,
                    duration: 0.3,
                    opacity: 0.8,
                },
                attract: {
                    distance: 200,
                    duration: 0.4,
                    easing: "ease-out-quad",
                    factor: 1,
                    speed: 1,
                    maxSpeed: 50
                },
            },
        },
        detectRetina: true,
    }), [particleCount]);

    if (!init || !mounted) {
        return null;
    }

    return (
        <div
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                opacity: 1,
                filter: chromaticActive
                    ? `drop-shadow(5px 0 0 rgba(255, 0, 0, 0.8)) drop-shadow(-5px 0 0 rgba(0, 255, 255, 0.8)) drop-shadow(0 3px 0 rgba(0, 255, 0, 0.5))`
                    : 'none',
                transition: 'filter 0.2s ease-in-out',
                willChange: isTransitioning ? 'filter, transform' : (chromaticActive ? 'filter' : 'auto'),
                transform: 'translateZ(0)',
            }}
            className={isTransitioning ? "glitch-active-particles" : ""}
        >
            <StableParticles options={options} />
        </div>
    );
}
