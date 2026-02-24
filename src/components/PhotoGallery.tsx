'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

type Lang = 'en' | 'hi' | 'mr';

const sectionContent: Record<Lang, {
  tag: string; title: string; subtitle: string;
  all: string; viewAll: string;
}> = {
  en: {
    tag: 'Gallery',
    title: 'Photo Gallery',
    subtitle: 'Capturing moments of leadership, service, and connection with the people of Maharashtra.',
    all: 'All',
    viewAll: 'View Full Gallery',
  },
  hi: {
    tag: 'गैलरी',
    title: 'फोटो गैलरी',
    subtitle: 'महाराष्ट्र के लोगों के साथ नेतृत्व, सेवा और संपर्क के पलों को संजोना।',
    all: 'सभी',
    viewAll: 'पूरी गैलरी देखें',
  },
  mr: {
    tag: 'गॅलरी',
    title: 'फोटो गॅलरी',
    subtitle: 'महाराष्ट्राच्या नागरिकांशी नेतृत्व, सेवा आणि जोडणीचे क्षण टिपणे।',
    all: 'सर्व',
    viewAll: 'संपूर्ण गॅलरी पहा',
  },
};

const categories = {
  en: ['All', 'Leadership', 'Events', 'Community', 'Diplomacy'],
  hi: ['सभी', 'नेतृत्व', 'कार्यक्रम', 'समुदाय', 'कूटनीति'],
  mr: ['सर्व', 'नेतृत्व', 'कार्यक्रम', 'समुदाय', 'मुत्सद्देगिरी'],
};

const galleryItems = [
  { id: 1, title: { en: 'With PM Modi', hi: 'PM मोदी के साथ', mr: 'PM मोदींसोबत' }, category: 'Leadership', span: '2', image: '/images/vivek-with-pm.png' },
  { id: 2, title: { en: 'Public Rally', hi: 'जन रैली', mr: 'सार्वजनिक रॅली' }, category: 'Events', image: '/images/vivek-rally.png' },
  { id: 3, title: { en: 'International Summit', hi: 'अंतर्राष्ट्रीय शिखर', mr: 'आंतरराष्ट्रीय शिखर' }, category: 'Diplomacy', image: '/images/vivek-international.png' },
  { id: 4, title: { en: 'Official Portrait', hi: 'आधिकारिक चित्र', mr: 'अधिकृत छायाचित्र' }, category: 'Leadership', image: '/images/vivek-profile.png', span: 'h' },
  { id: 5, title: { en: 'Community Meeting', hi: 'सामुदायिक बैठक', mr: 'समुदाय बैठक' }, category: 'Community', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop' },
  { id: 6, title: { en: 'Award Night', hi: 'पुरस्कार समारोह', mr: 'पुरस्कार सोहळा' }, category: 'Events', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop' },
  { id: 7, title: { en: 'Village Outreach', hi: 'ग्राम सेवा', mr: 'गाव सेवा' }, category: 'Community', image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=400&fit=crop' },
  { id: 8, title: { en: 'Press Conference', hi: 'प्रेस कॉन्फ्रेंस', mr: 'पत्रकार परिषद' }, category: 'Diplomacy', image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&h=400&fit=crop' },
];

interface PhotoGalleryProps {
  lang?: Lang;
}

export default function PhotoGallery({ lang = 'en' }: PhotoGalleryProps) {
  const [activeFilter, setActiveFilter] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const content = sectionContent[lang];
  const cats = categories[lang];

  const filteredItems = activeFilter === 0
    ? galleryItems
    : galleryItems.filter((item) => item.category === categories.en[activeFilter]);

  return (
    <section className="photo-gallery" id="media" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="pg-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-tag">{content.tag}</span>
          <h2 className="section-title">{content.title}</h2>
          <p className="section-subtitle">{content.subtitle}</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="gallery-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {cats.map((cat, i) => (
            <button
              key={i}
              className={`filter-btn ${activeFilter === i ? 'active' : ''}`}
              onClick={() => setActiveFilter(i)}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          className="gallery-grid"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className={`gallery-item${item.span === '2' ? ' span-2' : ''}${item.span === 'h' ? ' span-h' : ''}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="gallery-item-img">
                  <Image
                    src={item.image}
                    alt={item.title[lang]}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="gallery-overlay">
                  <div className="gallery-overlay-content">
                    <span className="gallery-item-cat">{item.category}</span>
                    <h4>{item.title[lang]}</h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="gallery-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href="/gallery" className="cta-primary">
            {content.viewAll}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
