import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { motion } from 'framer-motion';

import Navbar from '../Navbar';

// Update the interface to include the isMobile prop
interface HeroSectionProps {
  id: string;
  bgColor: string;
  isMobile: boolean;
}

const HERO_IMAGE_DIMENSIONS = {
  width: 1920,
  height: 1080,
  mobileWidth: 828,
  mobileHeight: 1792,
};

export default function HeroSection({
  id,
  bgColor,
  isMobile,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);
  const [videoError, setVideoError] = useState(false);

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
      className='relative h-screen overflow-hidden text-white'
      style={{ backgroundColor: bgColor }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className='absolute inset-0'
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
            // poster={
            //   isMobile
            //     ? '/assets/about/about-header-mobile.webp'
            //     : '/assets/about/about-header.webp'
            // }
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
            }}
          >
            {isMobile ? (
              <>
                <source
                  src='/assets/about/about-header-mobile.webm'
                  type='video/webm'
                />
                <source
                  src='/assets/about/about-header-mobile.mp4'
                  type='video/mp4'
                />
              </>
            ) : (
              <>
                <source
                  src='/assets/about/about-header.webm'
                  type='video/webm'
                />
                <source src='/assets/about/about-header.mp4' type='video/mp4' />
              </>
            )}
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={
              isMobile
                ? '/assets/about/about-header-mobile.webp'
                : '/assets/about/about-header.webp'
            }
            alt='About Aaru'
            fill
            quality={75}
            priority
            placeholder='blur'
            blurDataURL='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMzMzMzMzMiLz48L3N2Zz4='
            sizes={`(max-width: 768px) ${HERO_IMAGE_DIMENSIONS.mobileWidth}px, ${HERO_IMAGE_DIMENSIONS.width}px`}
            style={{
              objectFit: 'cover',
            }}
            loading='eager'
          />
        )}
      </motion.div>
      <div className='absolute inset-0 bg-black bg-opacity-30' />
      <Navbar isFixed={false} />
      <div className='absolute inset-0 flex items-start px-4 pt-[300px] text-white sm:items-center sm:px-4 sm:pt-0 md:px-8'>
        <motion.h1
          variants={itemVariants}
          initial='initial'
          animate='animate'
          className='max-w-4xl text-left font-book text-hero'
        >
          Working Toward A More Certain Future.
        </motion.h1>
      </div>
    </motion.section>
  );
}

const itemVariants = {
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
