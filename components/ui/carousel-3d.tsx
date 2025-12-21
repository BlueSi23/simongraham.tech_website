'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Carousel3DProps {
  images: Array<{
    src: string;
    alt: string;
    title?: string;
    description?: string;
  }>;
  rotationSpeed?: number; // degrees per second
  imageSize?: number; // width/height in pixels
  zDepth?: number; // translateZ distance
  autoRotate?: boolean;
}

export function Carousel3D({
  images,
  rotationSpeed = 10,
  imageSize = 200,
  zDepth = 500,
  autoRotate = true,
}: Carousel3DProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [rotationDirection, setRotationDirection] = useState(1); // 1 = forward (counter-clockwise), -1 = reverse (clockwise)
  const animationRef = useRef<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const previousMouseXRef = useRef<number | null>(null);

  // Only render on client to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate angle for each image
  const angleStep = 360 / images.length;

  // Handle mouse movement to determine rotation direction
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const mouseXPos = e.clientX;

    setMouseX(mouseXPos);

    // Calculate current front index
    const currentFrontIndex = getFrontIndex();

    // If hovering over front tile, check if mouse moved left/right
    if (hoveredIndex === currentFrontIndex && previousMouseXRef.current !== null) {
      const deltaX = mouseXPos - previousMouseXRef.current;
      // If mouse moved significantly left or right (more than 10px), resume rotation
      if (Math.abs(deltaX) > 10) {
        setIsPaused(false);
      } else {
        // Still over front tile with minimal movement, keep paused
        setIsPaused(true);
        previousMouseXRef.current = mouseXPos;
        return;
      }
    }

    previousMouseXRef.current = mouseXPos;

    // Left side = reverse (clockwise), Right side = forward (counter-clockwise)
    if (mouseXPos < centerX) {
      setRotationDirection(-1); // Reverse/clockwise
    } else {
      setRotationDirection(1); // Forward/counter-clockwise
    }
  };

  // Auto-rotate animation with direction control
  useEffect(() => {
    if (!autoRotate || isPaused) return;

    const animate = () => {
      setRotation((prev) => prev + rotationSpeed * 0.016 * rotationDirection); // ~60fps
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [autoRotate, isPaused, rotationSpeed, rotationDirection]);

  // Calculate if an image is in the front (within ±15 degrees for more precision)
  const isFrontFacing = (index: number) => {
    const imageAngle = index * angleStep + rotation;
    const normalizedAngle = ((imageAngle % 360) + 360) % 360;
    return normalizedAngle < 15 || normalizedAngle > 345;
  };

  // Get the front-facing index (closest to 0 degrees)
  const getFrontIndex = () => {
    let closestIndex = 0;
    let closestDistance = Infinity;

    for (let i = 0; i < images.length; i++) {
      const imageAngle = i * angleStep + rotation;
      const normalizedAngle = ((imageAngle % 360) + 360) % 360;
      const distance = Math.min(normalizedAngle, 360 - normalizedAngle);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    }
    return closestIndex;
  };

  const frontIndex = getFrontIndex();

  // Don't render until mounted on client
  if (!isMounted) {
    return (
      <div
        className="relative w-full h-full"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '500px',
        }}
      >
        <div style={{ color: '#a1a1aa', fontSize: '0.875rem' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      style={{
        perspective: '2000px',
        perspectiveOrigin: 'center center',
        cursor: 'pointer',
        overflow: 'visible',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        // Don't auto-pause on enter, let handleMouseMove decide
      }}
      onMouseLeave={() => {
        setIsPaused(true);
        setMouseX(null);
        setHoveredIndex(null);
      }}
    >
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          overflow: 'visible',
        }}
      >
        {images.map((image, index) => {
          // Calculate current angle including carousel rotation for positioning
          const currentAngle = index * angleStep + rotation;
          const radian = (currentAngle * Math.PI) / 180;
          const x = Math.sin(radian) * zDepth;
          const z = Math.cos(radian) * zDepth;

          const normalizedCurrentAngle = ((currentAngle % 360) + 360) % 360;

          // Determine if this image is front-facing (closest to 0 degrees)
          const isFront = index === frontIndex;

          // NO ROTATION on tiles - they always face the viewer
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={index}
              className="absolute"
              style={{
                width: `${imageSize}px`,
                height: `${imageSize}px`,
                left: '50%',
                top: '50%',
                marginLeft: `-${imageSize / 2}px`,
                marginTop: `-${imageSize / 2}px`,
                transform: `translate3d(${x}px, 0, ${z}px)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.1s linear',
                zIndex: isFront ? 10 : Math.floor(5 - Math.abs(normalizedCurrentAngle > 180 ? 360 - normalizedCurrentAngle : normalizedCurrentAngle) / 30),
              }}
              onMouseEnter={() => {
                // Always set hovered index, but only show popup if front-facing
                setHoveredIndex(index);
                // If hovering over front tile, pause rotation
                if (isFront) {
                  setIsPaused(true);
                  previousMouseXRef.current = null; // Reset previous position
                }
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                // Resume rotation when leaving the tile
                setIsPaused(false);
                previousMouseXRef.current = null;
              }}
            >
              <div
                className="relative w-full h-full rounded-lg overflow-visible"
                style={{
                  transform: isFront ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 0.3s ease-out',
                  boxShadow: isFront
                    ? '0 20px 40px rgba(0, 0, 0, 0.5)'
                    : '0 10px 20px rgba(0, 0, 0, 0.3)',
                  pointerEvents: 'auto',
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes={`${imageSize}px`}
                />

                {/* Popup automatically shown when front-facing */}
                {isFront && (image.title || image.description) && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      marginBottom: '1.5rem',
                      pointerEvents: 'none',
                      zIndex: 1000,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: '#000000',
                        color: '#ffffff',
                        padding: '1rem 1.25rem',
                        borderRadius: '0.5rem',
                        minWidth: '240px',
                        maxWidth: '320px',
                        width: 'max-content',
                        border: '1px solid rgba(39, 39, 42, 0.5)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)',
                        whiteSpace: 'normal',
                      }}
                    >
                      {image.title && (
                        <h4 style={{
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          marginBottom: '0.5rem',
                          marginTop: 0,
                          color: '#ffffff',
                          letterSpacing: '-0.01em',
                        }}>
                          {image.title}
                        </h4>
                      )}
                      {image.description && (
                        <p style={{
                          fontSize: '0.8125rem',
                          color: '#a1a1aa',
                          lineHeight: '1.6',
                          margin: 0,
                          fontWeight: 400,
                        }}>
                          {image.description}
                        </p>
                      )}
                      {/* Arrow pointing down */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 0,
                          height: 0,
                          borderLeft: '8px solid transparent',
                          borderRight: '8px solid transparent',
                          borderTop: '8px solid #000000',
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

