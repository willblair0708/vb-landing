'use client';

import Script from 'next/script';
import React, { useRef } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import useIsMobile from '@/hooks/use-is-mobile';

import HeroSection from '../components/contact/HeroSection';
import Footer from '../components/Footer';

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  return (
    <AnimatePresence mode='wait'>
      <Script src='https://www.google.com/recaptcha/enterprise.js?render=6LexbW8qAAAAAIr7IhfsTb0UMA8gqigbZIY1sHrY' />
      <motion.div
        key='contact-page'
        className='relative w-screen overflow-hidden bg-background-dark font-sans'
      >
        <motion.main
          ref={containerRef}
          initial='hidden'
          animate='visible'
          variants={containerVariants}
          className='flex flex-col justify-between bg-background-dark'
        >
          <HeroSection id='section-0' bgColor='#000000' isMobile={isMobile} />
          <Footer />
        </motion.main>
      </motion.div>
    </AnimatePresence>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: 'beforeChildren',
      ease: [0.25, 0.1, 0.25, 1],
      duration: 0.6,
    },
  },
};
