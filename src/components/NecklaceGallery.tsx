'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';

type Lang = 'en' | 'hi' | 'mr';

const sectionContent: Record<Lang, { tag: string; title: string; subtitle: string }> = {
  en: {
    tag: 'Moments',
    title: 'Life in Focus',
    subtitle: 'A curated collection of meaningful moments from an extraordinary journey in public service.',
  },
  hi: {
    tag: 'पल',
    title: 'यादगार पल',
    subtitle: 'सार्वजनिक सेवा की असाधारण यात्रा के सार्थक क्षणों का संकलन।',
  },
  mr: {
    tag: 'क्षण',
    title: 'आयुष्याचे क्षण',
    subtitle: 'सार्वजनिक सेवेतील असाधारण प्रवासातील अर्थपूर्ण क्षणांचा संग्रह।',
  },
};

const photos = [
  { src: '/images/vivek-with-pm.png', alt: 'With PM Modi', category: 'Leadership' },
  { src: '/images/vivek-rally.png', alt: 'Public Rally', category: 'Outreach' },
  { src: '/images/vivek-international.png', alt: 'International Delegation', category: 'Diplomacy' },
  { src: '/images/vivek-profile.png', alt: 'Official Portrait', category: 'Profile' },
  { src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=800&fit=crop', alt: 'Community Work', category: 'Community' },
  { src: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&h=600&fit=crop', alt: 'Press Conference', category: 'Media' },
  { src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=700&fit=crop', alt: 'Award Ceremony', category: 'Awards' },
  { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop', alt: 'Public Event', category: 'Events' },
];

interface NecklaceGalleryProps {
  lang?: Lang;
}

export default function NecklaceGallery({ lang = 'en' }: NecklaceGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [isMounted, setIsMounted] = useState(false);
  const floatingRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isInView || !isMounted) return;
    const currentRefs = floatingRefs.current;
    currentRefs.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        y: `random(-18, 18)`,
        rotation: `random(-4, 4)`,
        duration: `random(3.5, 6)`,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 0.25,
      });
    });
    return () => {
      currentRefs.forEach((el) => { if (el) gsap.killTweensOf(el); });
    };
  }, [isInView, isMounted]);

  const content = sectionContent[lang];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.85 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { type: 'spring' as const, stiffness: 80, damping: 14 },
    },
  };

  return (
    <section className="life-in-focus" id="gallery" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="lif-header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-tag">{content.tag}</span>
          <h2 className="section-title">{content.title}</h2>
          <p className="section-subtitle">{content.subtitle}</p>
        </motion.div>
      </div>

      {isMounted && (
        <motion.div
          className="photos-container"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              ref={(el) => { floatingRefs.current[i] = el; }}
              className={`photo-item photo-${i + 1}`}
              variants={itemVariants}
              whileHover={{ scale: 1.06, zIndex: 10, transition: { duration: 0.3 } }}
            >
              <div className="photo-wrapper">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="photo-overlay">
                  <span className="photo-category">{photo.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
