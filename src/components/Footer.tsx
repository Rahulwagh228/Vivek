'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

type Lang = 'en' | 'hi' | 'mr';

interface FooterProps {
  lang?: Lang;
}

const footerContent: Record<Lang, {
  tagline: string;
  quickLinks: string;
  connect: string;
  vision: string;
  links: string[];
  connectLinks: string[];
  visionLinks: string[];
  copyright: string;
  privacy: string;
  terms: string;
}> = {
  en: {
    tagline: 'Committed to building a stronger, more prosperous Maharashtra — for every citizen, every village, every dream.',
    quickLinks: 'Quick Links',
    connect: 'Connect',
    vision: 'Vision',
    links: ['Home', 'About', 'Achievements', 'Gallery', 'Contact'],
    connectLinks: ['Press Kit', 'Speaking Requests', 'Campaign Office', 'Volunteer'],
    visionLinks: ['Youth Policy', 'Rural Development', 'Digital India', 'Women Empowerment'],
    copyright: '© 2025 Vivek Sonawane. All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
  },
  hi: {
    tagline: 'एक मज़बूत और समृद्ध महाराष्ट्र के निर्माण के लिए प्रतिबद्ध — हर नागरिक, हर गांव, हर सपने के लिए।',
    quickLinks: 'त्वरित लिंक',
    connect: 'संपर्क करें',
    vision: 'दृष्टिकोण',
    links: ['होम', 'परिचय', 'उपलब्धियाँ', 'गैलरी', 'संपर्क'],
    connectLinks: ['प्रेस किट', 'भाषण अनुरोध', 'अभियान कार्यालय', 'स्वयंसेवक'],
    visionLinks: ['युवा नीति', 'ग्रामीण विकास', 'डिजिटल भारत', 'महिला सशक्तिकरण'],
    copyright: '© २०२५ विवेक सोनावणे। सर्वाधिकार सुरक्षित।',
    privacy: 'गोपनीयता नीति',
    terms: 'उपयोग की शर्तें',
  },
  mr: {
    tagline: 'एक बलशाली आणि समृद्ध महाराष्ट्र घडवण्यासाठी वचनबद्ध — प्रत्येक नागरिक, प्रत्येक गाव, प्रत्येक स्वप्नासाठी।',
    quickLinks: 'जलद दुवे',
    connect: 'संपर्क करा',
    vision: 'दृष्टिकोन',
    links: ['मुख्यपृष्ठ', 'परिचय', 'उपलब्धी', 'गॅलरी', 'संपर्क'],
    connectLinks: ['प्रेस किट', 'भाषण विनंती', 'मोहीम कार्यालय', 'स्वयंसेवक'],
    visionLinks: ['युवा धोरण', 'ग्रामीण विकास', 'डिजिटल भारत', 'महिला सक्षमीकरण'],
    copyright: '© २०२५ विवेक सोनावणे. सर्व हक्क राखीव.',
    privacy: 'गोपनीयता धोरण',
    terms: 'वापर अटी',
  },
};

const navHrefs = ['/', '#about', '#achievements', '/gallery', '#contact'];

export default function Footer({ lang = 'en' }: FooterProps) {
  const t = footerContent[lang];

  return (
    <footer className="footer" id="contact">
      {/* Top wave decoration */}
      <div className="footer-wave" aria-hidden>
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="footer-inner">
        <div className="container">
          <div className="footer-top">
            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="logo-flag">
                  <span className="ff-s" /><span className="ff-w" /><span className="ff-g" />
                </span>
                Vivek Sonawane
              </div>
              <p className="footer-tagline">{t.tagline}</p>
              <div className="social-links">
                {[
                  { href: 'https://twitter.com', label: 'Twitter', icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/> },
                  { href: 'https://instagram.com', label: 'Instagram', icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/> },
                  { href: 'https://youtube.com', label: 'YouTube', icon: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/> },
                  { href: 'https://linkedin.com', label: 'LinkedIn', icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/> },
                ].map(({ href, label, icon }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">{icon}</svg>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h4>{t.quickLinks}</h4>
              <ul>
                {t.links.map((label, i) => (
                  <li key={i}>
                    <Link href={navHrefs[i]}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="footer-col">
              <h4>{t.connect}</h4>
              <ul>
                {t.connectLinks.map((label, i) => (
                  <li key={i}><a href="#">{label}</a></li>
                ))}
              </ul>
            </div>

            {/* Vision */}
            <div className="footer-col">
              <h4>{t.vision}</h4>
              <ul>
                {t.visionLinks.map((label, i) => (
                  <li key={i}><a href="#">{label}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>{t.copyright}</p>
            <div className="footer-legal">
              <a href="#">{t.privacy}</a>
              <span>·</span>
              <a href="#">{t.terms}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
