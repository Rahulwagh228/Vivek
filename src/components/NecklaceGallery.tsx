'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';

// Sample necklace photos
const necklacePhotos = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face', // Center pendant
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1559526324-593bc073d938?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
];

export default function NecklaceGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isInView) {
      itemRefs.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(
            item,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              delay: index * 0.1,
              ease: 'back.out(1.7)',
            }
          );
        }
      });
    }
  }, [isInView]);

  // Necklace positions (arc shape)
  const positions = [
    { left: '5%', top: '15%' },
    { left: '15%', top: '35%' },
    { left: '28%', top: '50%' },
    { left: '40%', top: '60%' },
    { left: '50%', top: '65%', transform: 'translateX(-50%)', size: 'large' }, // Center pendant
    { left: 'auto', right: '40%', top: '60%' },
    { left: 'auto', right: '28%', top: '50%' },
    { left: 'auto', right: '15%', top: '35%' },
    { left: 'auto', right: '5%', top: '15%' },
  ];

  return (
    <section className="necklace-gallery" ref={sectionRef}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2>Life in Focus</h2>
        <p>
          A curated collection showcasing the most meaningful moments 
          and milestones throughout an extraordinary journey.
        </p>
      </motion.div>

      <div className="necklace-container">
        {/* SVG Chain */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1200 600"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 60 100 Q 200 250 400 350 Q 600 430 600 430 Q 600 430 800 350 Q 1000 250 1140 100"
            fill="none"
            stroke="#d4d4d4"
            strokeWidth="2"
            strokeDasharray="8 8"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </svg>

        <div className="necklace-curve">
          {necklacePhotos.map((photo, index) => {
            const pos = positions[index];
            const isCenter = index === 4;
            
            return (
              <div
                key={index}
                ref={(el) => { itemRefs.current[index] = el; }}
                className={`necklace-item ${isCenter ? 'center-pendant' : ''}`}
                style={{
                  position: 'absolute',
                  left: pos.left,
                  right: pos.left === 'auto' ? pos.right : 'auto',
                  top: pos.top,
                  transform: pos.transform || 'none',
                  width: isCenter ? '130px' : '100px',
                  height: isCenter ? '130px' : '100px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
                  border: `${isCenter ? '5px' : '4px'} solid white`,
                  cursor: 'pointer',
                  opacity: 0,
                  zIndex: isCenter ? 10 : 1,
                }}
              >
                <img 
                  src={photo}
                  alt={`Gallery photo ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
