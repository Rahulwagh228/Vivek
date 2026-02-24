'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HorizontalStats from '@/components/HorizontalStats';
import NecklaceGallery from '@/components/NecklaceGallery';
import Achievements from '@/components/Achievements';
import PhotoGallery from '@/components/PhotoGallery';
import Footer from '@/components/Footer';
import type { Lang } from '@/components/Navbar';

export default function Home() {
  const [lang, setLang] = useState<Lang>('en');

  return (
    <>
      <Navbar lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <HorizontalStats lang={lang} />
        <NecklaceGallery lang={lang} />
        <Achievements lang={lang} />
        <PhotoGallery lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
