'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';

// Sample images - replace with actual images
const leftPhotos = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face',
];

const rightPhotos = [
  'https://images.unsplash.com/photo-1559526324-593bc073d938?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
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
                <img 
                  src={photo}
                  alt={`Gallery photo ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%',
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
                <img 
                  src={photo}
                  alt={`Gallery photo ${index + 7}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%',
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
