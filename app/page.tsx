'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import useIsMobile from '@/hooks/use-is-mobile';

import Footer from './components/Footer';
import FutureSection from './components/main/FutureSection';
import HeroSection from './components/main/HeroSection';
import HumanitySection from './components/main/HumanitySection';
import InsightsSection from './components/main/InsightsSection';
import SimulationSection from './components/main/SimulationSection';

export default function Home() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };
  return (
    <div className='bg-black'>
      {isMounted && (
        <>
          <AnimatePresence mode='wait'>
            <motion.div
              key='home-page'
              className='min-h-screen overflow-hidden font-sans text-white'
            >
              <motion.main
                ref={containerRef}
                initial='visible'
                animate='visible'
                variants={containerVariants}
                className='relative'
              >
                {[HeroSection, SimulationSection, InsightsSection].map(
                  (Section, index) => (
                    <motion.div
                      key={index}
                      variants={sectionVariants}
                      initial='hidden'
                      whileInView='visible'
                      viewport={{ once: true, amount: isMobile ? 0.1 : 0.3 }}
                      className='w-full'
                    >
                      <Section
                        id={`section-${index}`}
                        bgColor={
                          index === 1
                            ? '#171717'
                            : index === 3
                              ? '#000000'
                              : index === 4
                                ? '#0A0A0A'
                                : ''
                        }
                        isMobile={isMobile}
                      />
                    </motion.div>
                  )
                )}
                {/* <motion.div className='w-full'>
                  <HumanitySection
                    id='section-4'
                    bgColor='#000000'
                    isMobile={isMobile}
                  />
                </motion.div> */}
              </motion.main>
            </motion.div>
            <FutureSection id='section-5' bgColor='#18181B' />
          </AnimatePresence>
          <Footer />
        </>
      )}
    </div>
  );
}

const containerVariants = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
