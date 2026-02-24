'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Language types & context ───────────────────────────────────
export type Lang = 'en' | 'hi' | 'mr';

const navTranslations: Record<Lang, {
  home: string; about: string; achievements: string;
  gallery: string; contact: string; cta: string; name: string;
}> = {
  en: { home: 'Home', about: 'About', achievements: 'Achievements', gallery: 'Gallery', contact: 'Contact', cta: 'Support Campaign', name: 'Vivek Sonawane' },
  hi: { home: 'होम', about: 'परिचय', achievements: 'उपलब्धियाँ', gallery: 'गैलरी', contact: 'संपर्क', cta: 'अभियान का समर्थन', name: 'विवेक सोनावणे' },
  mr: { home: 'मुख्यपृष्ठ', about: 'परिचय', achievements: 'उपलब्धी', gallery: 'गॅलरी', contact: 'संपर्क', cta: 'मोहिमेला पाठिंबा', name: 'विवेक सोनावणे' },
};

const langs: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'hi', label: 'हि' },
  { code: 'mr', label: 'म' },
];

interface NavbarProps {
  lang: Lang;
  setLang: (l: Lang) => void;
}

export default function Navbar({ lang, setLang }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll detection
  if (typeof window !== 'undefined') {
    // handled via useEffect below
  }

  // We need useEffect for scroll — use a simple approach
  const t = navTranslations[lang];

  const navLinks = [
    { label: t.home, href: '/' },
    { label: t.about, href: '#about' },
    { label: t.achievements, href: '#achievements' },
    { label: t.gallery, href: '/gallery' },
    { label: t.contact, href: '#contact' },
  ];

  return (
    <>
      {/* Scroll listener via useEffect equivalent using onScroll */}
      <ScrollListener onScroll={(y) => setScrolled(y > 60)} />
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
      >
        <div className="navbar-container">
          {/* Logo */}
          <Link href="/" className="logo">
            <span className="logo-line" />
            <span className="logo-text">{t.name}</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="nav-links">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="nav-actions">
            {/* Language Switcher */}
            <div className="lang-switcher">
              {langs.map(({ code, label }) => (
                <button
                  key={code}
                  className={`lang-btn ${lang === code ? 'active' : ''}`}
                  onClick={() => setLang(code)}
                  aria-label={`Switch to ${code}`}
                >
                  {label}
                </button>
              ))}
            </div>

            <Link href="#contact" className="nav-cta">
              {t.cta}
            </Link>

            {/* Hamburger */}
            <button
              className={`menu-toggle ${menuOpen ? 'active' : ''}`}
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
            >
              <motion.div
                className="mobile-menu"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mobile-menu-header">
                  <span className="logo-text">{t.name}</span>
                </div>
                <div className="mobile-menu-links">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <Link href={link.href} onClick={() => setMenuOpen(false)}>
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <div className="mobile-lang-switcher">
                  {langs.map(({ code, label }) => (
                    <button
                      key={code}
                      className={`lang-btn ${lang === code ? 'active' : ''}`}
                      onClick={() => setLang(code)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link href="#contact" className="mobile-cta" onClick={() => setMenuOpen(false)}>
                    {t.cta}
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

// Small scroll listener helper component
import { useEffect } from 'react';
function ScrollListener({ onScroll }: { onScroll: (y: number) => void }) {
  useEffect(() => {
    const fn = () => onScroll(window.scrollY);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, [onScroll]);
  return null;
}
