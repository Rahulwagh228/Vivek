'use client';

import { useEffect, useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current.children,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power4.out',
          delay: 0.3,
        }
      );
    }
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const floatingVariants: Variants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  return (
    <section className="hero" ref={heroRef}>
      <div className="floating-elements">
        <motion.div
          className="floating-circle circle-1"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="floating-circle circle-2"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="floating-circle circle-3"
          variants={floatingVariants}
          animate="animate"
        />
      </div>

      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero-badge" variants={itemVariants}>
          <span className="badge-dot"></span>
          Public Figure & Influencer
        </motion.div>

        <h1 className="hero-title" ref={titleRef}>
          <span className="title-line">
            <span>Inspiring</span>
          </span>
          <br />
          <span className="title-line">
            <span className="title-highlight">Millions</span>
          </span>
          <br />
          <span className="title-line">
            <span className="title-outline">Worldwide</span>
          </span>
        </h1>

        <motion.p className="hero-subtitle" variants={itemVariants}>
          Award-winning speaker, philanthropist, and thought leader dedicated to 
          making a positive impact on communities around the globe.
        </motion.p>

        <motion.div className="hero-cta" variants={itemVariants}>
          <a href="#about" className="cta-primary">
            Explore Journey
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#achievements" className="cta-secondary">
            View Achievements
          </a>
        </motion.div>

        <motion.div className="hero-stats" variants={itemVariants}>
          <div className="stat-item">
            <motion.span
              className="stat-number"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              50M+
            </motion.span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat-item">
            <motion.span
              className="stat-number"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              100+
            </motion.span>
            <span className="stat-label">Awards</span>
          </div>
          <div className="stat-item">
            <motion.span
              className="stat-number"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
            >
              30+
            </motion.span>
            <span className="stat-label">Countries</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
