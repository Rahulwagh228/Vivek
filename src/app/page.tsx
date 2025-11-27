'use client';

import {
  Navbar,
  Hero,
  RotatingCircles,
  HorizontalStats,
  NecklaceGallery,
  Achievements,
  PhotoGallery,
  Footer,
} from '@/components';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <RotatingCircles />
        <HorizontalStats />
        <NecklaceGallery />
        <Achievements />
        <PhotoGallery />
      </main>
      <Footer />
    </>
  );
}
