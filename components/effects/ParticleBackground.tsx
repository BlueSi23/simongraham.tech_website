'use client';

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

export function ParticleBackground() {
    const [init, setInit] = useState(false);
    const [particleCount, setParticleCount] = useState(100);
    const [mounted, setMounted] = useState(false);
    const [chromaticActive, setChromaticActive] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);
    const pathname = usePathname();
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
    useEffect(() => {
        if (!mounted) return;

        // Mobile optimization: constant low particle count, no burst
        if (!isDesktop) {
            setParticleCount(30);
            return;
        }

        // Desktop: Burst to 75 particles
        setParticleCount(75);

        // Animate back down to 40 over 1 second
        const startTime = Date.now();
        const duration = 1000;
        const startCount = 75;
        const endCount = 40;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.round(startCount - (startCount - endCount) * easeOut);

            setParticleCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [pathname, mounted, isDesktop]);

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
                filter: chromaticActive
                    ? `drop-shadow(5px 0 0 rgba(255, 0, 0, 0.8)) drop-shadow(-5px 0 0 rgba(0, 255, 255, 0.8)) drop-shadow(0 3px 0 rgba(0, 255, 0, 0.5))`
                    : 'none',
                transition: 'filter 0.2s ease-in-out',
                /* GPU optimization */
                willChange: chromaticActive ? 'filter' : 'auto',
                transform: 'translateZ(0)',
            }}
        >
            <Particles
                id="particles-textaware"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                }}
                options={{
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
                            direction: "none",
                            random: false,
                            straight: false,
                            outModes: {
                                default: "out",
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
                                distance: 150,
                                duration: 0.4,
                            },
                            bubble: {
                                distance: 100,
                                size: 4,
                                duration: 0.3,
                                opacity: 0.8,
                            },
                            attract: {
                                distance: 200,
                                duration: 0.4,
                            },
                        },
                    },
                    detectRetina: true,
                }}
            />
        </div>
    );
}


