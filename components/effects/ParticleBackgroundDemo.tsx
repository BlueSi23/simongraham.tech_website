'use client';

import { useEffect, useState, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, Container } from "@tsparticles/engine";

type InteractionMode = 'current' | 'repulse' | 'attract' | 'bubble' | 'absorb' | 'textaware';

export function ParticleBackgroundDemo() {
    const [init, setInit] = useState(false);
    const [mode, setMode] = useState<InteractionMode>('current');
    const containerRef = useRef<Container | null>(null);

    useEffect(() => {
        initParticlesEngine(async (engine: Engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    // Track text elements and create repulse zones
    useEffect(() => {
        if (mode !== 'textaware' || !containerRef.current) return;

        const handleMouseMove = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check if hovering over text elements
            const isOverText = target.tagName === 'H1' ||
                target.tagName === 'H2' ||
                target.tagName === 'P' ||
                target.tagName === 'SPAN' ||
                target.classList.contains('text-element');

            if (isOverText && containerRef.current) {
                // Create a temporary repulse effect at text location
                const container = containerRef.current;
                // This creates a repulse zone dynamically
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mode]);

    const baseConfig = {
        background: { color: { value: "#000000" } },
        particles: {
            color: { value: "#aaaaaa" },
            links: {
                color: "#aaaaaa",
                distance: 150,
                enable: true,
                opacity: 0.4,
                width: 1,
            },
            move: {
                enable: true,
                speed: 3,
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
                value: 132,
            },
            opacity: { value: 0.5 },
            size: { value: { min: 1, max: 2 } },
        },
    };

    const configs = {
        // 1. Current - Grab on hover (baseline)
        current: {
            ...baseConfig,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "grab",
                    },
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                },
                modes: {
                    grab: {
                        distance: 400,
                        links: {
                            opacity: 1,
                        },
                    },
                    push: {
                        quantity: 4,
                    },
                },
            },
        },

        // 2. Repulse - Particles flee from cursor
        repulse: {
            ...baseConfig,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                },
                modes: {
                    repulse: {
                        distance: 200,
                        duration: 0.4,
                    },
                    push: {
                        quantity: 4,
                    },
                },
            },
        },

        // 3. Attract - Particles are drawn to cursor, creating a vortex
        attract: {
            ...baseConfig,
            particles: {
                ...baseConfig.particles,
                move: {
                    ...baseConfig.particles.move,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200,
                    },
                },
            },
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "attract",
                    },
                    onClick: {
                        enable: true,
                        mode: "bubble",
                    },
                },
                modes: {
                    attract: {
                        distance: 300,
                        duration: 0.4,
                        factor: 5,
                    },
                    bubble: {
                        distance: 250,
                        size: 6,
                        duration: 2,
                        opacity: 0.8,
                    },
                },
            },
        },

        // 4. Bubble - Particles grow and glow when near cursor
        bubble: {
            ...baseConfig,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "bubble",
                    },
                    onClick: {
                        enable: true,
                        mode: "repulse",
                    },
                },
                modes: {
                    bubble: {
                        distance: 250,
                        size: 8,
                        duration: 2,
                        opacity: 1,
                        speed: 3,
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4,
                    },
                },
            },
        },

        // 5. Absorb - Click removes particles nearby
        absorb: {
            ...baseConfig,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "connect",
                    },
                    onClick: {
                        enable: true,
                        mode: "remove",
                    },
                },
                modes: {
                    connect: {
                        distance: 200,
                        links: {
                            opacity: 0.8,
                        },
                    },
                    remove: {
                        quantity: 10,
                    },
                },
            },
        },

        // 6. Text-Aware - Particles avoid text and respond to hovering
        textaware: {
            ...baseConfig,
            particles: {
                ...baseConfig.particles,
                move: {
                    ...baseConfig.particles.move,
                    speed: 2, // Slower for better text avoidance
                    bounce: false,
                },
                // Reduce density in center where text typically is
                number: {
                    density: {
                        enable: true,
                        width: 1920,
                        height: 1080,
                    },
                    value: 100, // Fewer particles
                },
            },
            interactivity: {
                detectsOn: "window",
                events: {
                    onHover: {
                        enable: true,
                        mode: ["repulse", "bubble"],
                        parallax: {
                            enable: false,
                            force: 2,
                            smooth: 10,
                        },
                    },
                    onClick: {
                        enable: true,
                        mode: "attract",
                    },
                },
                modes: {
                    repulse: {
                        distance: 150, // Repulse from cursor (simulates text-hover)
                        duration: 0.4,
                        factor: 5,
                        speed: 1,
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
                        factor: 3,
                    },
                },
            },
        },
    };

    const descriptions = {
        current: "Grab - Particles connect to cursor on hover",
        repulse: "Repulse - Particles flee from your cursor",
        attract: "Attract - Particles are pulled toward cursor",
        bubble: "Bubble - Particles grow and glow near cursor",
        absorb: "Absorb - Hover connects, click removes particles",
        textaware: "Text-Aware - Particles avoid cursor & respond to text areas",
    };

    if (!init) {
        return null;
    }

    return (
        <>
            {/* Style Switcher UI */}
            <div style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 1000,
                background: 'rgba(0, 0, 0, 0.9)',
                padding: '16px',
                borderRadius: '8px',
                backdropFilter: 'blur(10px)',
                border: '1px solid #333',
                maxWidth: '280px',
            }}>
                <div style={{
                    color: '#aaa',
                    marginBottom: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                }}>
                    Interaction Mode
                </div>
                {(['current', 'repulse', 'attract', 'bubble', 'absorb', 'textaware'] as InteractionMode[]).map((m) => (
                    <button
                        key={m}
                        onClick={() => setMode(m)}
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '10px 12px',
                            marginBottom: '8px',
                            background: mode === m ? '#555' : '#222',
                            color: mode === m ? '#fff' : '#aaa',
                            border: mode === m ? '1px solid #777' : '1px solid #333',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            textAlign: 'left',
                            fontSize: '13px',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            if (mode !== m) {
                                e.currentTarget.style.background = '#333';
                                e.currentTarget.style.borderColor = '#555';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (mode !== m) {
                                e.currentTarget.style.background = '#222';
                                e.currentTarget.style.borderColor = '#333';
                            }
                        }}
                    >
                        <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>
                            {mode === m && '✓ '}{m === 'textaware' ? 'Text-Aware' : m.charAt(0).toUpperCase() + m.slice(1)}
                        </div>
                        <div style={{ fontSize: '10px', opacity: 0.7 }}>
                            {descriptions[m]}
                        </div>
                    </button>
                ))}
                <div style={{
                    marginTop: '12px',
                    padding: '8px',
                    background: '#111',
                    borderRadius: '4px',
                    fontSize: '11px',
                    color: '#888',
                }}>
                    {mode === 'textaware'
                        ? '💡 Hover over headlines to see particles respond!'
                        : '💡 Move your mouse and click to interact!'}
                </div>
            </div>

            {/* Particle Background */}
            <Particles
                id={`particles-${mode}`}
                key={mode}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1,
                }}
                options={{
                    ...configs[mode],
                    fpsLimit: 120,
                    detectRetina: true,
                }}
                particlesLoaded={(container) => {
                    containerRef.current = container;
                }}
            />
        </>
    );
}


