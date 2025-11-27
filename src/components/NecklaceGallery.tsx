'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';

// Sample photos for the new animation
const photos = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=700&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=450&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&h=600&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=350&fit=crop&crop=face',
];

export default function NecklaceGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const floatingRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isInView && !isMobile && isMounted) {
      // Create floating animation for photos
      floatingRefs.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(item, 
            { 
              y: 0,
              rotation: 0,
              scale: 1
            },
            {
              y: `random(-20, 20)`,
              rotation: `random(-5, 5)`,
              duration: `random(3, 6)`,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
              delay: index * 0.3
            }
          );
        }
      });
    }

    return () => {
      floatingRefs.current.forEach((item) => {
        if (item) gsap.killTweensOf(item);
      });
    };
  }, [isInView, isMobile, isMounted]);

  // Animation variants for mobile
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.8 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section className="life-in-focus" ref={sectionRef}>
      <motion.div
        className="section-header"
        variants={textVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <h2>Life in Focus</h2>
        <p>
          A curated collection showcasing the most meaningful moments 
          and milestones throughout an extraordinary journey.
        </p>
      </motion.div>

      <motion.div
        className="photos-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {isMounted && photos.map((photo, index) => (
          <motion.div
            key={index}
            ref={(el) => { floatingRefs.current[index] = el; }}
            className={`photo-item photo-${index + 1}`}
            variants={itemVariants}
            whileHover={{ 
              scale: isMobile ? 1.02 : 1.05, 
              zIndex: 10,
              transition: { duration: 0.3 }
            }}
          >
            <div className="photo-wrapper">
              <img 
                src={photo}
                alt={`Life moment ${index + 1}`}
                loading="lazy"
              />
              <div className="photo-overlay">
                <div className="overlay-gradient" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
