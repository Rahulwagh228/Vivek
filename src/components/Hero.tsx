'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';

// ─── Translations ───────────────────────────────────────────────
const t = {
  en: {
    badge: 'Visionary Social Leader',
    tagline: 'For the People,\nBy the People',
    name: 'Vivek Sonawane',
    subtitle: 'Youth leader, community builder, and visionary — dedicated to serving Maharashtra and shaping the future of India through inclusive governance.',
    cta1: 'Explore Journey',
    cta2: 'View Achievements',
    stat1: { num: '1M+', label: 'Supporters' },
    stat2: { num: '50+', label: 'Programs' },
    stat3: { num: '10+', label: 'Years Service' },
    stat4: { num: '30+', label: 'Districts' },
  },
  hi: {
    badge: 'दृढ़निश्चयी युवा नेता',
    tagline: 'जनता के लिए,\nजनता द्वारा',
    name: 'विवेक सोनावणे',
    subtitle: 'युवा नेता, समाज सेवक और दूरदर्शी — महाराष्ट्र की सेवा और समावेशी शासन के माध्यम से भारत के भविष्य को आकार देने के लिए समर्पित।',
    cta1: 'यात्रा देखें',
    cta2: 'उपलब्धियाँ',
    stat1: { num: '१०+', label: 'वर्ष सेवा' },
    stat2: { num: '५०+', label: 'कार्यक्रम' },
    stat3: { num: '३०+', label: 'जिले' },
    stat4: { num: '१M+', label: 'समर्थक' },
  },
  mr: {
    badge: 'लोकप्रिय समाजसेवक',
    tagline: 'जनतेसाठी,\nजनतेकडून',
    name: 'विवेक सोनावणे',
    subtitle: 'युवा नेता, समाज सेवक आणि दूरदर्शी — महाराष्ट्राची सेवा आणि सर्वसमावेशक शासनाद्वारे भारताचे भविष्य घडवण्यासाठी समर्पित।',
    cta1: 'प्रवास पाहा',
    cta2: 'उपलब्धी',
    stat1: { num: '१M+', label: 'समर्थक' },
    stat2: { num: '५०+', label: 'उपक्रम' },
    stat3: { num: '१०+', label: 'वर्षे सेवा' },
    stat4: { num: '३०+', label: 'जिल्हे' },
  },
};

type Lang = 'en' | 'hi' | 'mr';

interface HeroProps {
  lang?: Lang;
}

export default function Hero({ lang = 'en' }: HeroProps) {
  const text = t[lang];
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax mousemove on grid
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      gsap.to(gridRef.current, {
        x,
        y,
        duration: 1.2,
        ease: 'power2.out',
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.9, ease: [0.19, 1, 0.22, 1] as const },
    },
  };

  const photoVariants = {
    hidden: { scale: 0.85, opacity: 0, x: 60 },
    visible: {
      scale: 1,
      opacity: 1,
      x: 0,
      transition: { duration: 1.1, ease: [0.19, 1, 0.22, 1] as const, delay: 0.4 },
    },
  };

  return (
    <section className="hero" ref={containerRef}>
      {/* Animated Grid Background */}
      <div className="hero-grid-bg" ref={gridRef}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={`grid-line-v grid-line-v-${i}`} />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={`grid-line-h grid-line-h-${i}`} />
        ))}
      </div>

      {/* Floating Orbs */}
      <div className="hero-orbs" aria-hidden>
        <motion.div
          className="orb orb-saffron"
          animate={{ scale: [1, 1.15, 1], x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="orb orb-navy"
          animate={{ scale: [1, 1.2, 1], x: [0, -15, 0], y: [0, 25, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="orb orb-gold"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="hero-inner container">
        {/* LEFT — Text Content */}
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div className="hero-badge" variants={itemVariants}>
            <span className="badge-flag">
              <span className="flag-saffron" />
              <span className="flag-white" />
              <span className="flag-green" />
            </span>
            {text.badge}
          </motion.div>

          {/* Tagline */}
          <motion.div className="hero-tagline" variants={itemVariants}>
            {text.tagline.split('\n').map((line, i) => (
              <div key={i} className="tagline-line">
                <span>{line}</span>
              </div>
            ))}
          </motion.div>

          {/* Name */}
          <motion.h1 className="hero-name" variants={itemVariants}>
            {text.name}
          </motion.h1>

          {/* Subtitle */}
          <motion.p className="hero-subtitle" variants={itemVariants}>
            {text.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div className="hero-cta" variants={itemVariants}>
            <a href="#achievements" className="cta-primary">
              {text.cta1}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#achievements" className="cta-secondary">
              {text.cta2}
            </a>
          </motion.div>

          {/* Stats Row */}
          <motion.div className="hero-stats" variants={itemVariants}>
            {[text.stat1, text.stat2, text.stat3, text.stat4].map((stat, i) => (
              <div key={i} className="stat-item">
                <motion.span
                  className="stat-num"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.12, duration: 0.6 }}
                >
                  {stat.num}
                </motion.span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — Photo */}
        <motion.div
          className="hero-photo-wrap"
          variants={photoVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="photo-backdrop-ring ring-1" />
          <div className="photo-backdrop-ring ring-2" />
          <div className="photo-frame">
            <Image
              src="/images/Vivek-Hero-Photo.jpeg"
              alt="Vivek Sonawane"
              fill
              style={{ objectFit: 'cover', objectPosition: 'top center' }}
              priority
            />
            <div className="photo-overlay-gradient" />
          </div>

          {/* Floating Badge on photo */}
          <motion.div
            className="photo-badge"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <span className="badge-icon">🏛️</span>
            <div>
              <p className="badge-title">Lok Sabha Candidate</p>
              <p className="badge-sub">Maharashtra</p>
            </div>
          </motion.div>

          {/* Floating achievement badge */}
          <motion.div
            className="photo-achievement"
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 1.3, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <span>🇮🇳</span>
            <span>Driving Positive Change</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <motion.div
          className="scroll-dot"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
