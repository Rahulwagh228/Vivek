'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const achievements = [
  {
    id: 1,
    icon: '🏆',
    year: '2024',
    title: 'Global Leadership Award',
    description: 'Recognized for outstanding contributions to global humanitarian efforts and leadership in social initiatives.',
    featured: true,
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&h=600&fit=crop',
  },
  {
    id: 2,
    icon: '🎖️',
    year: '2023',
    title: 'Time 100 Most Influential',
    description: 'Named among the 100 most influential people in the world by Time Magazine.',
  },
  {
    id: 3,
    icon: '📚',
    year: '2023',
    title: 'Bestselling Author',
    description: 'Published memoir reached #1 on New York Times bestseller list for 12 consecutive weeks.',
  },
  {
    id: 4,
    icon: '🌟',
    year: '2022',
    title: 'Nobel Peace Nominee',
    description: 'Nominated for the Nobel Peace Prize for groundbreaking work in conflict resolution.',
  },
  {
    id: 5,
    icon: '💎',
    year: '2022',
    title: 'Humanitarian of the Year',
    description: 'Awarded by the United Nations for exceptional humanitarian service.',
  },
];

export default function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <section className="achievements" id="achievements" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="header-content">
            <h2>Notable Achievements</h2>
            <p>
              A testament to years of dedication, hard work, and an unwavering 
              commitment to making a positive impact.
            </p>
          </div>
          <Link href="/achievements" className="view-all">
            View All
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        <motion.div
          className="achievements-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              className={`achievement-card ${achievement.featured ? 'featured' : ''}`}
              variants={itemVariants}
            >
              {achievement.featured && achievement.image && (
                <div className="card-image">
                  <div 
                    className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"
                    style={{
                      backgroundImage: `url(${achievement.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                </div>
              )}
              <div className="card-content">
                <div className="card-icon">
                  <span className="text-2xl">{achievement.icon}</span>
                </div>
                <span className="card-year">{achievement.year}</span>
                <h3 className="card-title">{achievement.title}</h3>
                <p className="card-description">{achievement.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
