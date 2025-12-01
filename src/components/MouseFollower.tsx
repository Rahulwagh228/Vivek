'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const MouseFollower: React.FC = () => {
  const followerRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useGSAP(() => {
    if (followerRef.current) {
      // Create quickTo functions for smooth animation
      xTo.current = gsap.quickTo(followerRef.current, "x", {
        duration: 0.6,
        ease: "power3"
      });
      yTo.current = gsap.quickTo(followerRef.current, "y", {
        duration: 0.6,
        ease: "power3"
      });
    }
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (xTo.current && yTo.current) {
        setIsVisible(true);
        xTo.current(e.clientX);
        yTo.current(e.clientY);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={followerRef}
      className="mouse-follower"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    />
  );
};

export default MouseFollower;