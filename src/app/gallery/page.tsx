'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar, Footer } from '@/components';

const categories = ['All', 'Events', 'Speeches', 'Personal', 'Travel', 'Awards'];

const galleryData = [
  { id: 1, title: 'Global Summit Opening', category: 'Events', date: 'March 2024', height: 400 },
  { id: 2, title: 'TED Talk NYC', category: 'Speeches', date: 'February 2024', height: 300 },
  { id: 3, title: 'Family Vacation', category: 'Personal', date: 'January 2024', height: 350 },
  { id: 4, title: 'Tokyo Journey', category: 'Travel', date: 'December 2023', height: 280 },
  { id: 5, title: 'Humanitarian Award', category: 'Awards', date: 'November 2023', height: 320 },
  { id: 6, title: 'Climate Conference', category: 'Events', date: 'October 2023', height: 380 },
  { id: 7, title: 'University Keynote', category: 'Speeches', date: 'September 2023', height: 290 },
  { id: 8, title: 'Birthday Celebration', category: 'Personal', date: 'August 2023', height: 340 },
  { id: 9, title: 'Paris Fashion Week', category: 'Travel', date: 'July 2023', height: 360 },
  { id: 10, title: 'Leadership Award', category: 'Awards', date: 'June 2023', height: 310 },
  { id: 11, title: 'Charity Gala Night', category: 'Events', date: 'May 2023', height: 370 },
  { id: 12, title: 'Podcast Interview', category: 'Speeches', date: 'April 2023', height: 300 },
  { id: 13, title: 'Mountain Retreat', category: 'Personal', date: 'March 2023', height: 330 },
  { id: 14, title: 'Dubai Expo', category: 'Travel', date: 'February 2023', height: 350 },
  { id: 15, title: 'Lifetime Achievement', category: 'Awards', date: 'January 2023', height: 400 },
  { id: 16, title: 'Tech Summit', category: 'Events', date: 'December 2022', height: 320 },
];

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  date: string;
  height: number;
}

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredItems = activeFilter === 'All' 
    ? galleryData 
    : galleryData.filter(item => item.category === activeFilter);

  const openLightbox = (item: GalleryItem) => {
    setSelectedImage(item);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
    let newIndex = direction === 'next' 
      ? (currentIndex + 1) % filteredItems.length
      : (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedImage(filteredItems[newIndex]);
  };

  return (
    <>
      <Navbar />
      <main className="gallery-page">
        <div className="container" ref={containerRef}>
          <motion.div
            className="page-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Gallery</h1>
            <p>
              Explore a visual journey through memorable moments, events, 
              and milestones from around the world.
            </p>
          </motion.div>

          <motion.div
            className="gallery-tabs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
            className="masonry-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="masonry-item"
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => openLightbox(item)}
                  style={{ height: item.height }}
                >
                  <div 
                    className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"
                    style={{
                      backgroundImage: `url(/images/gallery-full-${item.id}.jpg)`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div className="item-overlay">
                    <h3>{item.title}</h3>
                    <p>{item.category}</p>
                    <span className="item-date">{item.date}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && selectedImage && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button className="lightbox-close" onClick={closeLightbox}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <button 
              className="lightbox-nav prev" 
              onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="w-full rounded-xl bg-gradient-to-br from-gray-200 to-gray-300"
                style={{
                  height: '70vh',
                  backgroundImage: `url(/images/gallery-full-${selectedImage.id}.jpg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="lightbox-info">
                <h3>{selectedImage.title}</h3>
                <p>{selectedImage.category} • {selectedImage.date}</p>
              </div>
            </motion.div>

            <button 
              className="lightbox-nav next" 
              onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
