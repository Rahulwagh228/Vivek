'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside or on a link
  const closeMenu = () => setMenuOpen(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="navbar-container">
        <Link href="/" className="logo">
          Vivek
        </Link>

        <div className="nav-links">
          <Link href="/" className="active">Home</Link>
          <Link href="#about">About</Link>
          <Link href="#achievements">Achievements</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="#contact">Contact</Link>
        </div>

        <Link href="#contact" className="nav-cta">
          Get in Touch
        </Link>

        <button 
          className={`menu-toggle ${menuOpen ? 'active' : ''}`} 
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeMenu}
          >
            <motion.div
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mobile-menu-links">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link href="/" onClick={closeMenu}>Home</Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <Link href="#about" onClick={closeMenu}>About</Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link href="#achievements" onClick={closeMenu}>Achievements</Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <Link href="/gallery" onClick={closeMenu}>Gallery</Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link href="#contact" onClick={closeMenu}>Contact</Link>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <Link href="#contact" className="mobile-cta" onClick={closeMenu}>
                  Get in Touch
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
