'use client';

import { useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion, useInView, useScroll } from 'framer-motion';

import CountdownBanner from '../components/demo/CountdownBanner';
import ElectionTabs from '../components/demo/ElectionTabs';
import ElectoralMarginChart from '../components/demo/ElectoralMarginChart';
import ImportantStates from '../components/demo/ImportantStates';
import Map from '../components/demo/Map';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import * as data from './data';

export default function ProductsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showNavbar, setShowNavbar] = useState(false);
  const [currentSection, setCurrentSection] = useState('electoral');
  const contentRef = useRef(null);
  const isContentInView = useInView(contentRef, { once: true, amount: 0 });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        setShowNavbar(heroRect.bottom <= 0);
      }
    };

    const options = {
      threshold: [0.3],
      rootMargin: '-20% 0px',
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const visibleEntry = entries.reduce((prev, current) => {
        return current.intersectionRatio > prev.intersectionRatio
          ? current
          : prev;
      });

      if (visibleEntry.intersectionRatio >= 0.3) {
        const sectionId = visibleEntry.target.id;
        setCurrentSection(sectionId);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  return (
    <div className='font-oracle min-h-screen bg-[#18181B]'>
      <CountdownBanner metadata={data.metadata} />
      <Navbar isFixed={false} />

      <AnimatePresence>
        {showNavbar && (
          <motion.div
            className='fixed top-0 z-50 w-full'
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
          >
            <ElectionTabs activeTab={currentSection} isSticky={true} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.main
        ref={contentRef}
        variants={containerVariants}
        initial='hidden'
        animate={isContentInView ? 'visible' : 'hidden'}
        className='mx-auto max-w-7xl px-4 py-24 text-white'
      >
        <div id='hero-section'>
          <motion.p
            variants={itemVariants}
            className='mb-4 mt-[20vh] text-sm text-gray-400'
          >
            2024 U.S. PRESIDENTIAL ELECTION
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className='mb-8 font-serif text-3xl leading-[1.2] md:max-w-[50%]'
          >
            Across 1,000 models of the 2024 presidential election,{' '}
            <span className='underline decoration-party-red'>Donald Trump</span>{' '}
            wins {data.summary.electoral['Donald Trump']}% of the time, while{' '}
            <span className='underline decoration-party-blue'>
              Kamala Harris
            </span>{' '}
            wins {data.summary.electoral['Kamala Harris']}% of the time.
          </motion.h1>
        </div>

        <motion.div
          variants={itemVariants}
          className='mt-[20vh] flex w-full flex-col space-y-[100px]'
        >
          <section id='electoral' className='!mt-4'>
            <ElectoralMarginChart data={data.electoralMargins} />
          </section>

          <section id='states'>
            <Map data={data.states} />
          </section>

          <section id='important-states'>
            <ImportantStates data={data.states} />
          </section>
        </motion.div>
      </motion.main>

      <Footer />
    </div>
  );
}
