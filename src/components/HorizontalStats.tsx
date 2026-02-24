'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type Lang = 'en' | 'hi' | 'mr';

// Stats marquee rows
const statsRow1 = [
  { icon: '🏛️', value: '10+', labelEn: 'Years of Service', labelHi: 'वर्षों की सेवा', labelMr: 'वर्षे सेवा' },
  { icon: '👥', value: '1M+', labelEn: 'Supporters', labelHi: 'समर्थक', labelMr: 'समर्थक' },
  { icon: '🎤', value: '200+', labelEn: 'Public Speeches', labelHi: 'जन भाषण', labelMr: 'सार्वजनिक भाषणे' },
  { icon: '🌏', value: '15+', labelEn: 'Countries Visited', labelHi: 'देश यात्रा', labelMr: 'देश भेटी' },
  { icon: '🏗️', value: '50+', labelEn: 'Dev Projects', labelHi: 'विकास परियोजनाएं', labelMr: 'विकास प्रकल्प' },
  { icon: '🤝', value: '30+', labelEn: 'PM Engagements', labelHi: 'PM बैठकें', labelMr: 'PM बैठका' },
];

const statsRow2 = [
  { icon: '📋', value: '25K+', labelEn: 'Youth Trained', labelHi: 'युवा प्रशिक्षित', labelMr: 'युवा प्रशिक्षित' },
  { icon: '🏆', value: '30+', labelEn: 'Awards Received', labelHi: 'पुरस्कार प्राप्त', labelMr: 'पुरस्कार मिळाले' },
  { icon: '🌾', value: '30+', labelEn: 'Districts Covered', labelHi: 'जिले आच्छादित', labelMr: 'जिल्हे समाविष्ट' },
  { icon: '💧', value: '100+', labelEn: 'Villages Helped', labelHi: 'गाँव मदद', labelMr: 'गावांना मदत' },
  { icon: '📰', value: '500+', labelEn: 'Media Features', labelHi: 'मीडिया फीचर', labelMr: 'मीडिया कव्हरेज' },
  { icon: '🎓', value: '35+', labelEn: 'Colleges Visited', labelHi: 'कॉलेज दौरे', labelMr: 'महाविद्यालय भेटी' },
];

interface HorizontalStatsProps {
  lang?: Lang;
}

export default function HorizontalStats({ lang = 'en' }: HorizontalStatsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const getLabel = (stat: typeof statsRow1[0]) => {
    if (lang === 'hi') return stat.labelHi;
    if (lang === 'mr') return stat.labelMr;
    return stat.labelEn;
  };

  return (
    <section className="horizontal-stats" ref={sectionRef}>
      <div className="marquee-wrapper">
        {/* Row 1 — left scroll */}
        <div className="stats-marquee">
          <motion.div
            className="marquee-content"
            initial={{ x: 0 }}
            animate={isInView ? { x: '-50%' } : {}}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          >
            {[...statsRow1, ...statsRow1].map((stat, i) => (
              <div key={i} className="stat-card">
                <span className="stat-card-icon">{stat.icon}</span>
                <div className="stat-card-info">
                  <strong className="stat-card-value">{stat.value}</strong>
                  <span className="stat-card-label">{getLabel(stat)}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 — right scroll */}
        <div className="stats-marquee stats-marquee-reverse">
          <motion.div
            className="marquee-content"
            initial={{ x: '-50%' }}
            animate={isInView ? { x: 0 } : {}}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          >
            {[...statsRow2, ...statsRow2].map((stat, i) => (
              <div key={i} className="stat-card alt">
                <span className="stat-card-icon">{stat.icon}</span>
                <div className="stat-card-info">
                  <strong className="stat-card-value">{stat.value}</strong>
                  <span className="stat-card-label">{getLabel(stat)}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
