'use client';

import dynamic from 'next/dynamic';
import React, { Suspense, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import { AnimatePresence, motion } from 'framer-motion';

import useIsMobile from '@/hooks/use-is-mobile';

import Footer from '../components/Footer';

const HeroSection = dynamic(() => import('../components/about/HeroSection'), {
  ssr: false,
});
const MissionSection = dynamic(
  () => import('../components/about/MissionSection'),
  { ssr: false }
);
const SimulationSection = dynamic(
  () => import('../components/about/SimulationSection'),
  { ssr: false }
);
const TeamSection = dynamic(() => import('../components/about/TeamSection'), {
  ssr: false,
});

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Use a single ref for both purposes
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <AnimatePresence mode='wait'>
        <motion.div
          key='about-page'
          className='min-h-screen w-screen overflow-hidden font-sans'
        >
          <motion.main
            ref={containerRef}
            initial='hidden'
            animate='visible'
            variants={containerVariants}
          >
            <HeroSection id='section-0' bgColor='#123456' isMobile={isMobile} />

            <motion.div ref={ref}>
              <MissionSection
                id='section-1'
                bgColor='#FFFFFF'
                isMobile={isMobile}
                inView={inView}
              />
              <TeamSection
                id='section-2'
                bgColor='#FFFFFF'
                isMobile={isMobile}
                inView={inView}
              />
              {/* <SimulationSection
                id='section-3'
                bgColor='#000000'
                isMobile={isMobile}
                inView={inView}
              /> */}
            </motion.div>
          </motion.main>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </>
  );
}

const containerVariants = {
  // hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: 'beforeChildren',
      ease: 'easeInOut',
      duration: 0.5,
    },
  },
};
