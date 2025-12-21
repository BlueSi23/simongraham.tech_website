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
    const pathname = usePathname();
    const canvasRef = useRef<HTMLDivElement>(null);

    // Ensure component is mounted on client
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        initParticlesEngine(async (engine: Engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    // Page transition effect
    useEffect(() => {
        if (!mounted) return;

        // Burst to 2000 particles
        setParticleCount(2000);

        // Animate back down to 100 over 1 second
        const startTime = Date.now();
        const duration = 1000;
        const startCount = 2000;
        const endCount = 100;

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
    }, [pathname, mounted]);

    // Chromatic aberration effect - triggers randomly every 10-20 seconds
    useEffect(() => {
        if (!mounted) return;

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
    }, [mounted]);

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
                    ? `
                        drop-shadow(6px 0 0 rgba(255, 0, 0, 1))
                        drop-shadow(-6px 0 0 rgba(0, 255, 255, 1))
                        drop-shadow(0 4px 0 rgba(0, 255, 0, 0.8))
                        drop-shadow(0 -4px 0 rgba(255, 0, 255, 0.8))
                        drop-shadow(4px 4px 0 rgba(255, 255, 0, 0.7))
                        drop-shadow(-4px -4px 0 rgba(0, 255, 255, 0.9))
                        blur(0.5px)
                    `
                    : 'none',
                transition: 'filter 0.15s ease-out',
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


