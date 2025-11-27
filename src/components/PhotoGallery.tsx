'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const categories = ['All', 'Events', 'Speeches', 'Personal', 'Travel'];

const galleryItems = [
  { id: 1, title: 'Global Summit 2024', category: 'Events', span: '2', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop' },
  { id: 2, title: 'Keynote Speech NYC', category: 'Speeches', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop' },
  { id: 3, title: 'Family Time', category: 'Personal', image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=400&fit=crop' },
  { id: 4, title: 'Paris Visit', category: 'Travel', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop' },
  { id: 5, title: 'Award Ceremony', category: 'Events', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop' },
  { id: 6, title: 'TED Talk', category: 'Speeches', span: 'h', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=800&fit=crop' },
  { id: 7, title: 'Mountain Retreat', category: 'Travel', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop' },
  { id: 8, title: 'Charity Gala', category: 'Events', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop' },
];

export default function PhotoGallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const filteredItems = activeFilter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section className="photo-gallery" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2>Photo Gallery</h2>
          <p>
            Capturing moments that tell a story. Browse through a visual journey 
            of events, travels, and meaningful experiences.
          </p>
        </motion.div>

        <motion.div
          className="gallery-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              className={activeFilter === category ? 'active' : ''}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </motion.div>

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
                className={`gallery-item ${item.span === '2' ? 'span-2' : ''} ${item.span === 'h' ? 'span-h' : ''}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <div className="overlay">
                  <div className="overlay-content">
                    <h4>{item.title}</h4>
                    <p>{item.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="gallery-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href="/gallery">
            View Full Gallery
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
