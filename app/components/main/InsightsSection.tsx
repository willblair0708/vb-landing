import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Suspense } from 'react';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';

import ArrowIcon from '@/public/assets/ui/Arrow';

interface InsightsSectionProps {
  id: string;
}

// Separate video component for better optimization
function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Optimize video loading and playback
    const loadVideo = async () => {
      try {
        video.playbackRate = 0.8;
        video.preload = 'metadata';

        await video.load();
        setIsVideoLoaded(true);

        if (document.visibilityState === 'visible') {
          await video.play();
          setIsVideoPlaying(true);
        }
      } catch (error) {
        console.warn('Video loading failed:', error);
        setVideoError(true);
      }
    };

    const handleVisibilityChange = async () => {
      if (!video) return;

      if (document.visibilityState === 'visible') {
        try {
          await video.play();
          setIsVideoPlaying(true);
        } catch (error) {
          console.warn('Play on visibility change failed:', error);
          setVideoError(true);
        }
      } else {
        video.pause();
        setIsVideoPlaying(false);
      }
    };

    const handleError = () => {
      console.warn('Video error occurred');
      setVideoError(true);
    };

    // Event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    video.addEventListener('error', handleError);
    video.addEventListener('playing', () => setIsVideoPlaying(true));
    video.addEventListener('waiting', () => setIsVideoPlaying(false));
    video.addEventListener('pause', () => setIsVideoPlaying(false));

    loadVideo();

    return () => {
      video.pause();
      video.src = '';
      video.load();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      video.removeEventListener('error', handleError);
      video.removeEventListener('playing', () => setIsVideoPlaying(true));
      video.removeEventListener('waiting', () => setIsVideoPlaying(false));
      video.removeEventListener('pause', () => setIsVideoPlaying(false));
    };
  }, []);

  if (videoError) {
    return (
      <img
        src='/assets/main/running_poster.webp'
        alt='Running visualization'
        className='h-full w-full object-cover'
        loading='lazy'
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className='h-full w-full object-cover object-top'
      loop
      muted
      playsInline
      poster='/assets/main/running_poster.webp'
      aria-label='Running visualization video'
    >
      <source src='/assets/main/running.webm' type='video/webm' />
      <source src='/assets/main/running.mp4' type='video/mp4' />
      Your browser does not support the video tag.
    </video>
  );
}

export default function InsightsSection({ id }: InsightsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setIsVideoLoaded(true);
      video.play().catch(() => {
        // Autoplay was prevented, we'll need user interaction to play
      });
    };

    const handlePlaying = () => {
      setIsVideoPlaying(true);
    };

    const handleWaiting = () => {
      setIsVideoPlaying(false);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('waiting', handleWaiting);

    // Attempt to load the video
    video.load();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('waiting', handleWaiting);
    };
  }, []);

  const containerVariants = {
    // hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    // hidden: { opacity: 0, y: 20 },
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
    <motion.section
      ref={sectionRef}
      id={id}
      className='relative flex min-h-screen flex-col-reverse items-center overflow-hidden bg-[#BABABA] lg:flex-row'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className='z-0 h-[28rem] sm:h-[36rem] lg:h-[60rem] lg:w-full'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Suspense
          fallback={
            <img
              src='/assets/main/running_poster.webp'
              alt='Running visualization'
              className='h-full w-full object-cover object-top'
              loading='lazy'
            />
          }
        >
          <VideoPlayer />
        </Suspense>
      </motion.div>

      <div className='relative z-10 mt-8 flex w-full items-center bg-[#BABABA] px-8 py-6 sm:px-6 sm:py-8 lg:ml-auto lg:mt-0 lg:px-8 lg:py-0'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className='max-w-[454px]'
        >
          <motion.div variants={itemVariants} className='text-left'>
            <h2 className='mb-[80px] w-fit border-t-2 border-black pt-2 font-rg text-[30px] leading-tight tracking-tight text-[#18181B] lg:mb-[200px]'>
              Harness the power of Aaru to generate thousands of people at once.
              Interact with them to gain insights.
            </h2>
            <p className='mb-6 font-book text-[13px] tracking-tight text-[#18181B]'>
              Use Aaru to transform your operations.
            </p>
            <motion.div variants={itemVariants}>
              <Link
                className='flex w-fit items-center gap-x-2 pb-1 transition-all hover:border-transparent hover:text-[#18181B]'
                href='/contact'
              >
                <ArrowIcon
                  className='rotate-[-90deg] text-black'
                  color='#000000'
                />
                <motion.span
                  className='font-book text-xs uppercase tracking-wide'
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  Contact Us
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
