'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="navbar-container">
        <Link href="/" className="logo">
          John<span>.</span>Doe
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

        <button className="menu-toggle" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </motion.nav>
  );
}
