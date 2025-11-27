'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar, Footer } from '@/components';

const categories = ['All', 'Events', 'Speeches', 'Personal', 'Travel', 'Awards'];

const galleryData = [
  { id: 1, title: 'Global Summit Opening', category: 'Events', date: 'March 2024', height: 400, image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop' },
  { id: 2, title: 'TED Talk NYC', category: 'Speeches', date: 'February 2024', height: 300, image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop' },
  { id: 3, title: 'Family Vacation', category: 'Personal', date: 'January 2024', height: 350, image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=500&fit=crop' },
  { id: 4, title: 'Tokyo Journey', category: 'Travel', date: 'December 2023', height: 280, image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600&h=400&fit=crop' },
  { id: 5, title: 'Humanitarian Award', category: 'Awards', date: 'November 2023', height: 320, image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&h=450&fit=crop' },
  { id: 6, title: 'Climate Conference', category: 'Events', date: 'October 2023', height: 380, image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=500&fit=crop' },
  { id: 7, title: 'University Keynote', category: 'Speeches', date: 'September 2023', height: 290, image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop' },
  { id: 8, title: 'Birthday Celebration', category: 'Personal', date: 'August 2023', height: 340, image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=450&fit=crop' },
  { id: 9, title: 'Paris Fashion Week', category: 'Travel', date: 'July 2023', height: 360, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=500&fit=crop' },
  { id: 10, title: 'Leadership Award', category: 'Awards', date: 'June 2023', height: 310, image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=600&h=450&fit=crop' },
  { id: 11, title: 'Charity Gala Night', category: 'Events', date: 'May 2023', height: 370, image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=500&fit=crop' },
  { id: 12, title: 'Podcast Interview', category: 'Speeches', date: 'April 2023', height: 300, image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&h=400&fit=crop' },
  { id: 13, title: 'Mountain Retreat', category: 'Personal', date: 'March 2023', height: 330, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=450&fit=crop' },
  { id: 14, title: 'Dubai Expo', category: 'Travel', date: 'February 2023', height: 350, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=500&fit=crop' },
  { id: 15, title: 'Lifetime Achievement', category: 'Awards', date: 'January 2023', height: 400, image: 'https://images.unsplash.com/photo-1569930784237-ea65a652f226?w=600&h=550&fit=crop' },
  { id: 16, title: 'Tech Summit', category: 'Events', date: 'December 2022', height: 320, image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=450&fit=crop' },
];

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  date: string;
  height: number;
  image: string;
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
                  <img 
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
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
              <img 
                src={selectedImage.image}
                alt={selectedImage.title}
                style={{
                  width: '100%',
                  height: '70vh',
                  objectFit: 'cover',
                  borderRadius: '12px',
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
