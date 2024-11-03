import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { motion } from 'framer-motion';

import useIsMobile from '@/hooks/use-is-mobile';
import ArrowIcon from '@/public/assets/ui/Arrow';

import Navbar from '../Navbar';

interface HeroSectionProps {
  id: string;
  bgColor: string;
  onScrollToNext: () => void;
}

export default function HeroSection({
  id,
  bgColor,
  onScrollToNext,
}: HeroSectionProps) {
  const isMobile = useIsMobile();

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const { ref: inViewRef, inView: isInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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

    video.playbackRate = 0.8;

    const loadVideo = async () => {
      try {
        video.preload = isLowBandwidth ? 'metadata' : 'auto';

        video.load();
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

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className='relative min-h-screen overflow-hidden'
      style={{ backgroundColor: bgColor }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Navbar isFixed={false} />
      <div className='flex min-h-screen flex-col items-center p-4 pt-[200px] md:justify-center md:pt-8'>
        <motion.div
          className='absolute inset-0 z-0'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {!isLowBandwidth && !videoError ? (
            <video
              ref={videoRef}
              className='h-full w-full object-cover'
              loop
              muted
              playsInline
              disablePictureInPicture
              poster={
                isMobile
                  ? '/assets/products/product_header_mobile_poster.webp'
                  : '/assets/products/product_header_poster.webp'
              }
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
            >
              {isMobile ? (
                <source
                  src='/assets/products/product_header_mobile.mp4'
                  type='video/mp4'
                />
              ) : (
                <source
                  src='/assets/products/product_header.mp4'
                  type='video/mp4'
                />
              )}
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src='/assets/products/3dprism.svg'
              alt='Product header background'
              className='absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 transform object-cover opacity-50'
            />
          )}
          {/* Adjusted overlay opacity from 0.5 to 0.3 for less darkness */}
          <motion.div
            className='absolute inset-0'
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }} // Changed from 0.5 to 0.3
            transition={{ duration: 1, delay: 0.3 }}
          />
        </motion.div>
        <motion.div
          className='max-w-9xl relative z-10 mx-auto w-full'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className='flex flex-row items-center justify-between'>
            <motion.h1
              className='hidden text-left font-book text-hero text-white md:block'
              variants={textVariants}
              initial='initial'
              animate='animate'
            >
              Others Chase The Clock.
            </motion.h1>
            <motion.h1
              className='hidden text-left font-book text-hero text-white md:block'
              variants={textVariants}
              initial='initial'
              animate='animate'
            >
              Aaru Puts You Ahead Of It.
            </motion.h1>
            <motion.h1
              className='block text-left font-book text-hero text-white md:hidden'
              variants={textVariants}
              initial='initial'
              animate='animate'
            >
              Others Chase The Clock. Aaru Puts You Ahead Of It.
            </motion.h1>
          </div>
        </motion.div>
        <motion.div
          className='absolute bottom-[60px] right-[30px] flex flex-col items-start sm:bottom-20 sm:right-[100px]'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div
            className='mb-4 h-px w-[240px] bg-white sm:w-[270px]'
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <div className='flex flex-col items-start'>
            <motion.p
              className='mr-2 text-left font-book leading-tight text-white sm:mr-7'
              variants={textVariants}
              initial='initial'
              animate='animate'
            >
              These aren&apos;t just products.
              <br />
              They&apos;re crystal balls
            </motion.p>
            <motion.div
              className='mt-20 flex items-center'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <ArrowIcon className='mr-2 text-white opacity-60' color='white' />
              <motion.button
                onClick={onScrollToNext}
                className='flex items-center text-xs font-medium uppercase tracking-wider text-white/60'
                whileHover={{ x: 8 }}
                transition={{ duration: 0.2 }}
              >
                Take a closer look
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

const textVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};
