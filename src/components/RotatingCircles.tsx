'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';

// Sample images - replace with actual images
const leftPhotos = [
  '/images/photo-1.jpg',
  '/images/photo-2.jpg',
  '/images/photo-3.jpg',
  '/images/photo-4.jpg',
  '/images/photo-5.jpg',
  '/images/photo-6.jpg',
];

const rightPhotos = [
  '/images/photo-7.jpg',
  '/images/photo-8.jpg',
  '/images/photo-9.jpg',
  '/images/photo-10.jpg',
  '/images/photo-11.jpg',
  '/images/photo-12.jpg',
];

export default function RotatingCircles() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCircleRef = useRef<HTMLDivElement>(null);
  const rightCircleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      // Animate left circle
      if (leftCircleRef.current) {
        gsap.to(leftCircleRef.current, {
          rotation: -360,
          duration: 30,
          repeat: -1,
          ease: 'none',
        });
      }
      
      // Animate right circle
      if (rightCircleRef.current) {
        gsap.to(rightCircleRef.current, {
          rotation: -360,
          duration: 25,
          repeat: -1,
          ease: 'none',
        });
      }
    }
  }, [isInView]);

  // Calculate positions on circle
  const getPosition = (index: number, total: number, radius: number) => {
    const angle = (index * (360 / total)) * (Math.PI / 180);
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  return (
    <section className="rotating-circles" ref={sectionRef}>
      {/* Left Half Circle */}
      <div className="half-circle-left">
        <div className="circle-path" ref={leftCircleRef}>
          {leftPhotos.map((photo, index) => {
            const pos = getPosition(index, leftPhotos.length, 210);
            return (
              <motion.div
                key={`left-${index}`}
                className="photo-item"
                style={{
                  left: `calc(50% + ${pos.x}px - 40px)`,
                  top: `calc(50% + ${pos.y}px - 40px)`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div 
                  className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"
                  style={{
                    backgroundImage: `url(${photo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Center Content */}
      <motion.div
        className="section-content"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h2>Memorable Moments</h2>
        <p>
          A collection of inspiring moments captured throughout the journey 
          of making a difference in the world.
        </p>
      </motion.div>

      {/* Right Half Circle */}
      <div className="half-circle-right">
        <div className="circle-path" ref={rightCircleRef}>
          {rightPhotos.map((photo, index) => {
            const pos = getPosition(index, rightPhotos.length, 210);
            return (
              <motion.div
                key={`right-${index}`}
                className="photo-item"
                style={{
                  left: `calc(50% + ${pos.x}px - 40px)`,
                  top: `calc(50% + ${pos.y}px - 40px)`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              >
                <div 
                  className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"
                  style={{
                    backgroundImage: `url(${photo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
