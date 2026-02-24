'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

type Lang = 'en' | 'hi' | 'mr';

interface Achievement {
  id: number;
  icon: string;
  year: string;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
  category: string;
  featured?: boolean;
  image?: string;
}

const achievements: Achievement[] = [
  {
    id: 1,
    icon: '🇮🇳',
    year: '2024',
    title: {
      en: 'Two Months with PM Modi',
      hi: 'PM मोदी के साथ दो महीने',
      mr: 'पंतप्रधान मोदींसोबत दोन महिने',
    },
    description: {
      en: 'Spent two transformative months working directly alongside Prime Minister Narendra Modi, gaining first-hand insight into national governance and policy-making at the highest level.',
      hi: 'प्रधानमंत्री नरेंद्र मोदी के साथ सीधे काम करते हुए दो परिवर्तनकारी महीने बिताए, राष्ट्रीय शासन और नीति-निर्माण में प्रत्यक्ष अनुभव प्राप्त किया।',
      mr: 'पंतप्रधान नरेंद्र मोदींसोबत थेट काम करत दोन महिने घालवले, राष्ट्रीय प्रशासन आणि धोरण-निर्मितीचा प्रत्यक्ष अनुभव मिळवला।',
    },
    category: 'National Leadership',
    featured: true,
    image: '/images/vivek-with-pm.png',
  },
  {
    id: 2,
    icon: '🌏',
    year: '2023',
    title: {
      en: 'Represented India Internationally',
      hi: 'अंतर्राष्ट्रीय स्तर पर भारत का प्रतिनिधित्व',
      mr: 'आंतरराष्ट्रीय स्तरावर भारताचे प्रतिनिधित्व',
    },
    description: {
      en: 'Proudly represented India at multiple international forums and diplomatic summits, advocating for youth empowerment and India\'s global standing across 15+ countries.',
      hi: 'अंतर्राष्ट्रीय मंचों और कूटनीतिक शिखर सम्मेलनों में भारत का प्रतिनिधित्व किया, युवा सशक्तिकरण और भारत की वैश्विक स्थिति की वकालत की।',
      mr: 'आंतरराष्ट्रीय मंचांवर आणि राजनैतिक परिषदांमध्ये भारताचे प्रतिनिधित्व केले, युवा सक्षमीकरण आणि भारताच्या जागतिक स्थानाचे समर्थन केले।',
    },
    category: 'International Affairs',
    image: '/images/vivek-international.png',
  },
  {
    id: 3,
    icon: '🎤',
    year: '2024',
    title: {
      en: 'Addressed 1M+ Citizens at Rallies',
      hi: 'रैलियों में १०+ लाख नागरिकों को संबोधित',
      mr: 'रॅलींमध्ये १०+ लाख नागरिकांना संबोधन',
    },
    description: {
      en: 'Led massive public rallies across Maharashtra, addressing over one million citizens on issues of development, youth employment, and inclusive growth.',
      hi: 'महाराष्ट्र भर में बड़े जन रैलियों का नेतृत्व किया, विकास, युवा रोजगार और समावेशी विकास के मुद्दों पर दस लाख से अधिक नागरिकों को संबोधित किया।',
      mr: 'महाराष्ट्रभर मोठ्या जनसभांचे नेतृत्व केले, विकास, युवा रोजगार आणि सर्वसमावेशक विकासाच्या मुद्द्यांवर दहा लाखांहून अधिक नागरिकांना संबोधित केले।',
    },
    image: '/images/vivek-rally.png',
    category: 'Public Outreach',
  },
  {
    id: 4,
    icon: '🏗️',
    year: '2022',
    title: {
      en: 'Launched 50+ Development Projects',
      hi: '५०+ विकास परियोजनाएं शुरू कीं',
      mr: '५०+ विकास प्रकल्प सुरू केले',
    },
    description: {
      en: 'Spearheaded the launch of over 50 grassroots development projects across rural Maharashtra covering infrastructure, digital literacy, and water conservation.',
      hi: 'ग्रामीण महाराष्ट्र में बुनियादी ढांचे, डिजिटल साक्षरता और जल संरक्षण को कवर करने वाली ५०+ जमीनी विकास परियोजनाएं शुरू कीं।',
      mr: 'ग्रामीण महाराष्ट्रात पायाभूत सुविधा, डिजिटल साक्षरता आणि जलसंधारण यांचा समावेश असलेले ५०+ तळागाळातील विकास प्रकल्प सुरू केले।',
    },
    category: 'Development',
  },
  {
    id: 5,
    icon: '🎓',
    year: '2021',
    title: {
      en: 'Youth Empowerment Initiative',
      hi: 'युवा सशक्तिकरण पहल',
      mr: 'युवा सक्षमीकरण उपक्रम',
    },
    description: {
      en: 'Founded the Maharashtra Youth Forum, providing free skill training to 25,000+ young men and women, enabling employment across sectors.',
      hi: 'महाराष्ट्र युवा फोरम की स्थापना की, जिसने युवाओं को मुफ्त कौशल प्रशिक्षण प्रदान किया।',
      mr: 'महाराष्ट्र युवा फोरमची स्थापना केली, ज्याने तरुणांना विनामूल्य कौशल्य प्रशिक्षण दिले।',
    },
    category: 'Education',
  },
  {
    id: 6,
    icon: '🤝',
    year: '2023',
    title: {
      en: 'Alliance with National Leaders',
      hi: 'राष्ट्रीय नेताओं के साथ गठबंधन',
      mr: 'राष्ट्रीय नेत्यांशी युती',
    },
    description: {
      en: 'Built strategic political alliances with senior national leaders including chief ministers, cabinet ministers, and prominent members of Parliament.',
      hi: 'मुख्यमंत्रियों, कैबिनेट मंत्रियों और संसद के प्रमुख सदस्यों सहित वरिष्ठ राष्ट्रीय नेताओं के साथ रणनीतिक राजनीतिक गठबंधन बनाया।',
      mr: 'मुख्यमंत्री, कॅबिनेट मंत्री आणि संसदेच्या प्रमुख सदस्यांसह वरिष्ठ राष्ट्रीय नेत्यांशी धोरणात्मक राजकीय युती केली।',
    },
    category: 'Politics',
  },
];

const sectionContent: Record<Lang, { tag: string; title: string; subtitle: string }> = {
  en: {
    tag: 'Achievements',
    title: 'A Legacy of\nLeadership',
    subtitle: 'A record of service, dedication, and meaningful impact across Maharashtra and beyond.',
  },
  hi: {
    tag: 'उपलब्धियाँ',
    title: 'नेतृत्व की\nविरासत',
    subtitle: 'महाराष्ट्र और उससे परे, सेवा, समर्पण और सार्थक प्रभाव का रिकॉर्ड।',
  },
  mr: {
    tag: 'उपलब्धी',
    title: 'नेतृत्वाचा\nवारसा',
    subtitle: 'महाराष्ट्र आणि त्यापलीकडे सेवा, समर्पण आणि अर्थपूर्ण प्रभावाचा रेकॉर्ड।',
  },
};

interface AchievementsProps {
  lang?: Lang;
}

export default function Achievements({ lang = 'en' }: AchievementsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const content = sectionContent[lang];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const cardVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] as const },
    },
  };

  return (
    <section className="achievements" id="achievements" ref={sectionRef}>
      {/* Background decoration */}
      <div className="achievements-bg" aria-hidden>
        <div className="bg-circle-1" />
        <div className="bg-circle-2" />
      </div>

      <div className="container">
        {/* Header */}
        <motion.div
          className="achievements-header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-tag">{content.tag}</span>
          <h2 className="section-title">
            {content.title.split('\n').map((line, i) => (
              <span key={i} className={i === 1 ? 'highlight-text' : ''}>
                {i === 1 ? '' : line}
                {i === 1 && <span className="saffron-text">{line}</span>}
                {i < content.title.split('\n').length - 1 && i === 0 && <br />}
              </span>
            ))}
          </h2>
          <p className="section-subtitle">{content.subtitle}</p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="achievements-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {achievements.map((item, index) => (
            <motion.div
              key={item.id}
              className={`achievement-card ${item.featured ? 'featured' : ''} ${index === 0 ? 'span-2' : ''}`}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* Image (if present) */}
              {item.image && (
                <div className="card-img">
                  <Image
                    src={item.image}
                    alt={item.title[lang]}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="card-img-overlay" />
                </div>
              )}

              <div className="card-body">
                <div className="card-meta">
                  <span className="card-icon">{item.icon}</span>
                  <span className="card-category">{item.category}</span>
                  <span className="card-year">{item.year}</span>
                </div>
                <h3 className="card-title">{item.title[lang]}</h3>
                <p className="card-desc">{item.description[lang]}</p>
              </div>

              {/* Glow accent */}
              <div className="card-glow" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
