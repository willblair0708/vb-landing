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
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);

  const containerVariants = {
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
    <motion.section
      ref={sectionRef}
      id={id}
      className='relative flex min-h-screen flex-col-reverse items-center overflow-hidden bg-black lg:flex-row'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className='relative z-0 h-[28rem] w-full sm:h-[36rem] lg:h-screen lg:w-3/5'
        style={{ scale, opacity }}
      >
        {/* Cell simulation overlay */}
        <div className='bg-cell-pattern absolute inset-0 opacity-10' />

        {/* Gradient overlays */}
        <div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent' />
        <div className='absolute inset-0 bg-gradient-to-r from-black via-transparent to-black lg:hidden' />

        {/* Video container */}
        <div className='relative h-full'>
          <div className='absolute inset-0 bg-white/5 mix-blend-overlay' />
          <Suspense
            fallback={
              <div className='h-full w-full animate-pulse bg-neutral-900' />
            }
          >
            <VideoPlayer />
          </Suspense>
        </div>

        {/* Cell simulation particles */}
        <div className='absolute inset-0 overflow-hidden'>
          <div className='cell-particles' />
        </div>
      </motion.div>

      <div className='relative z-10 flex w-full items-center px-8 py-16 lg:w-2/5 lg:px-16 lg:py-0'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className='mx-auto max-w-[500px]'
        >
          <motion.div variants={itemVariants} className='text-left'>
            {/* Status badge */}
            <div className='mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm'>
              <div className='mr-2 h-2 w-2 animate-pulse rounded-full bg-white'></div>
              <span className='text-sm font-medium text-white'>
                Virtual Cell Model
              </span>
            </div>

            {/* Heading */}
            <h2 className='mb-6 font-rg text-[2.75rem] leading-tight tracking-tight text-white'>
              Predict cellular behavior with unprecedented accuracy
            </h2>

            {/* Description */}
            <p className='mb-8 text-lg leading-relaxed text-neutral-300'>
              Our virtual cell models leverage genomic sequences and comparative
              genomics to predict gene expression patterns and cellular
              responses, enabling rapid in silico experimentation.
            </p>

            {/* Metrics */}
            <div className='mb-12 grid grid-cols-2 gap-6'>
              <div className='group rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10'>
                <div className='flex items-baseline gap-1'>
                  <div className='text-3xl font-semibold text-white'>92</div>
                  <div className='text-lg text-white/80'>%</div>
                </div>
                <div className='mt-1 text-sm text-neutral-400 group-hover:text-neutral-300'>
                  Prediction Accuracy
                </div>
              </div>
              <div className='group rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10'>
                <div className='flex items-baseline gap-1'>
                  <div className='text-3xl font-semibold text-white'>1000</div>
                  <div className='text-lg text-white/80'>x</div>
                </div>
                <div className='mt-1 text-sm text-neutral-400 group-hover:text-neutral-300'>
                  Faster Analysis
                </div>
              </div>
            </div>

            {/* CTA */}
            <motion.div variants={itemVariants}>
              <Link
                className='group inline-flex items-center gap-x-3 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/10'
                href='/contact'
              >
                <span>Explore Virtual Cell Models</span>
                <ArrowIcon
                  className='rotate-[-90deg] transition-transform group-hover:translate-x-1'
                  color='#FFFFFF'
                />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
