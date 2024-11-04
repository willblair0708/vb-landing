import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

import Navbar from '../Navbar';

interface HeroSectionProps {
  id: string;
  isMobile?: boolean;
}

export default function HeroSection({ id, isMobile }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.3], ['0%', '10%']);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const ySpring = useSpring(y, springConfig);

  const [headerSize, setHeaderSize] = useState('text-[32px]');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setHeaderSize('text-[42px]');
      } else if (window.innerWidth > 390) {
        setHeaderSize('text-[36px]');
      } else {
        setHeaderSize('text-[32px]');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const checkBandwidth = async () => {
      if ('connection' in navigator) {
        const conn = (navigator as any).connection;
        if (
          conn.effectiveType === '2g' ||
          conn.effectiveType === 'slow-2g' ||
          conn.saveData
        ) {
          setIsLowBandwidth(true);
        }
      }
    };
    checkBandwidth();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reset video playback rate for smoother playback
    video.playbackRate = 0.8;

    // Optimize video loading
    const loadVideo = async () => {
      try {
        video.preload = isLowBandwidth ? 'metadata' : 'auto';

        // Load lower quality version for low bandwidth
        if (isLowBandwidth) {
          video
            .querySelector('source[type="video/webm"]')
            ?.setAttribute('src', '/assets/main/main_hero_low.webm');
          video
            .querySelector('source[type="video/mp4"]')
            ?.setAttribute('src', '/assets/main/main_hero_low.mp4');
        }

        await video.load();
        setIsVideoLoaded(true);

        if (document.visibilityState === 'visible') {
          await video.play();
          setIsVideoPlaying(true);
        }
      } catch (error) {
        console.warn('Video autoplay failed:', error);
        setVideoError(true);
      }
    };

    const handleError = () => {
      console.warn('Video error occurred');
      setVideoError(true);
    };

    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible') {
        try {
          await video.play();
          setIsVideoPlaying(true);
        } catch (error) {
          console.warn('Video play failed:', error);
        }
      } else {
        video.pause();
        setIsVideoPlaying(false);
      }
    };

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
      if (document.visibilityState === 'visible') {
        video.play().catch(console.warn);
      }
    };

    // Event listeners
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleVisibilityChange);

    loadVideo();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleVisibilityChange);
      video.pause();
      video.src = '';
      video.load();
    };
  }, [isLowBandwidth]);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const slideInVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className='relative h-screen overflow-hidden text-white'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className='absolute inset-0 z-0'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {!isLowBandwidth && !videoError ? (
          <video
            ref={videoRef}
            className='h-full w-full object-cover'
            loop
            muted
            playsInline
            disablePictureInPicture
            poster='/assets/main/cell_simulation_poster.webp'
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
            }}
          >
            <source src='/assets/main/cell_simulation.webm' type='video/webm' />
            <source src='/assets/main/cell_simulation.mp4' type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src='/assets/main/cell_simulation_poster.webp'
            alt='AI-powered cell simulation visualization'
            className='h-full w-full object-cover'
          />
        )}
        <div className='absolute inset-0 bg-gradient-to-b from-black/70 to-black/40'></div>
      </motion.div>

      <div className='relative z-20 flex h-full flex-col'>
        <Navbar isFixed={false} />
        <motion.div
          className={`mr-auto flex max-w-7xl flex-grow items-center px-4 sm:px-6 sm:pt-0 lg:px-8 ${
            isMobile ? 'mt-[-60px]' : ''
          }`}
          style={{ opacity, scale }}
        >
          <div className='w-full max-w-4xl'>
            <motion.h1
              variants={fadeInVariants}
              initial='hidden'
              animate={isInView ? 'visible' : 'hidden'}
              className='mb-6 font-book text-[42px] leading-tight tracking-tight text-white sm:text-[56px] lg:text-[64px]'
            >
              <span className='text-blue-400'>AI-Powered</span> Virtual Cell
              Models
              <br />
              Revolutionizing Drug Discovery
            </motion.h1>
            <motion.p
              variants={slideInVariants}
              initial='hidden'
              animate={isInView ? 'visible' : 'hidden'}
              className='mb-8 max-w-2xl text-lg text-gray-300 sm:text-xl'
            >
              Leveraging genomic sequences and comparative genomics to predict
              gene expression and cell types directly from DNA, bypassing
              traditional data bottlenecks.
            </motion.p>
            <motion.div
              variants={fadeInVariants}
              initial='hidden'
              animate={isInView ? 'visible' : 'hidden'}
              className='flex flex-wrap gap-4'
            >
              <Link
                href='/platform'
                className='rounded-md bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600'
              >
                Explore Our Platform
              </Link>
              <Link
                href='/contact'
                className='rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10'
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className={`absolute ${
            isMobile ? 'bottom-[30px]' : 'bottom-[60px]'
          } right-[30px] flex w-[300px] flex-col items-start space-y-4 border-t border-white/30 sm:bottom-20 sm:right-24`}
        >
          <div className='flex flex-col items-start py-3'>
            <p className='mb-4 font-book text-sm uppercase tracking-wider text-blue-400'>
              Our Impact
            </p>
            <p className='font-book text-lg leading-snug tracking-tight text-white'>
              Enabling accurate in silico simulations of genetic and
              pharmacological perturbations
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
