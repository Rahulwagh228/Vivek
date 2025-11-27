'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const statsData = [
  { icon: '🏆', value: '100+', label: 'Awards Won' },
  { icon: '🎤', value: '500+', label: 'Speeches' },
  { icon: '🌍', value: '30+', label: 'Countries' },
  { icon: '📺', value: '1000+', label: 'Media Features' },
  { icon: '💝', value: '$50M+', label: 'Donated' },
  { icon: '👥', value: '50M+', label: 'Followers' },
];

const statsDataSecond = [
  { icon: '📚', value: '12', label: 'Books Published' },
  { icon: '🎬', value: '50+', label: 'Documentaries' },
  { icon: '🤝', value: '200+', label: 'Partnerships' },
  { icon: '💡', value: '15', label: 'Foundations' },
  { icon: '🏛️', value: '100+', label: 'Universities' },
  { icon: '⭐', value: '5', label: 'Honorary Degrees' },
];

export default function HorizontalStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section className="horizontal-stats" ref={sectionRef}>
      {/* First Row */}
      <div className="stats-marquee">
        <motion.div
          className="marquee-content"
          initial={{ x: 0 }}
          animate={isInView ? { x: '-50%' } : {}}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {[...statsData, ...statsData].map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="stat-info">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Second Row - Reverse */}
      <div className="stats-marquee stats-marquee-reverse">
        <motion.div
          className="marquee-content"
          initial={{ x: '-50%' }}
          animate={isInView ? { x: 0 } : {}}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          {[...statsDataSecond, ...statsDataSecond].map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="stat-info">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
