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
            poster='/assets/main/main_hero_poster.webp'
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
            }}
          >
            <source src='/assets/main/main_hero.webm' type='video/webm' />
            <source src='/assets/main/main_hero.mp4' type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src='/assets/main/main_hero_poster.webp'
            alt='Hero background'
            className='h-full w-full object-cover'
          />
        )}
        <div className='absolute inset-0 bg-black opacity-50'></div>
      </motion.div>
      <motion.div
        className='absolute inset-0 z-10'
        style={{ y: ySpring }}
        initial={{ backgroundPosition: '0 0' }}
        animate={{ backgroundPosition: '100% 100%' }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
      >
        <div className='h-full w-full opacity-20'></div>
      </motion.div>
      <div className='relative z-20 flex h-full flex-col'>
        <Navbar isFixed={false} />
        <motion.div
          className={`mr-auto flex max-w-7xl flex-grow items-center px-4 sm:px-6 sm:pt-0 lg:px-8 ${
            isMobile ? 'mt-[-100px]' : ''
          }`}
          style={{ opacity, scale }}
        >
          <div className='w-full'>
            <motion.h1
              variants={fadeInVariants}
              initial='hidden'
              animate={isInView ? 'visible' : 'hidden'}
              className={`mb-6 font-book text-hero text-white`}
            >
              <span className='whitespace-nowrap'>Rethinking The </span>
              <wbr />
              <span className='whitespace-nowrap'>Science of Prediction</span>
            </motion.h1>
          </div>
        </motion.div>
        <motion.div
          variants={fadeInVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className={`absolute ${
            isMobile ? 'bottom-[30px]' : 'bottom-[60px]'
          } right-[30px] flex w-[270px] flex-col items-start space-y-4 border-t border-white sm:bottom-20 sm:right-24`}
        >
          <div className='flex flex-col items-start py-3'>
            <p className='mb-[60px] font-book leading-tight tracking-tight text-white sm:mb-20'>
              Rendering Human <br />
              Granularity
            </p>
          </div>
          <div>
            <p className='text-white text-opacity-60'>
              Aaru simulates entire populations to predict the world&apos;s
              events. Welcome to the new age of decision dominance.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
