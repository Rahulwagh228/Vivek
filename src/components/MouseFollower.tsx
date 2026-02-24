'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const MouseFollower: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const xDot  = useRef<gsap.QuickToFunc | null>(null);
  const yDot  = useRef<gsap.QuickToFunc | null>(null);
  const xRing = useRef<gsap.QuickToFunc | null>(null);
  const yRing = useRef<gsap.QuickToFunc | null>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useGSAP(() => {
    if (dotRef.current) {
      xDot.current  = gsap.quickTo(dotRef.current,  'x', { duration: 0.15, ease: 'power3' });
      yDot.current  = gsap.quickTo(dotRef.current,  'y', { duration: 0.15, ease: 'power3' });
    }
    if (ringRef.current) {
      xRing.current = gsap.quickTo(ringRef.current, 'x', { duration: 0.55, ease: 'power3' });
      yRing.current = gsap.quickTo(ringRef.current, 'y', { duration: 0.55, ease: 'power3' });
    }
  });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setVisible(true);
      xDot.current?.(e.clientX);
      yDot.current?.(e.clientY);
      xRing.current?.(e.clientX);
      yRing.current?.(e.clientY);
    };
    const onLeave  = () => setVisible(false);
    const onEnterLink = () => setHovered(true);
    const onLeaveLink = () => setHovered(false);

    document.addEventListener('mousemove',  onMove);
    document.addEventListener('mouseleave', onLeave);

    // Track interactive elements
    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
        el.addEventListener('mouseenter', onEnterLink);
        el.addEventListener('mouseleave', onLeaveLink);
      });
    };
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseleave', onLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Core dot */}
      <div
        ref={dotRef}
        className={`mf-dot ${visible ? 'visible' : ''} ${hovered ? 'hovered' : ''}`}
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        className={`mf-ring ${visible ? 'visible' : ''} ${hovered ? 'hovered' : ''}`}
      />
    </>
  );
};

export default MouseFollower;