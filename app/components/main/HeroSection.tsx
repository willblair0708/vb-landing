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
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

  // Interactive particle system
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 15000);

      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          color: `rgba(64, 139, 252, ${Math.random() * 0.5 + 0.2})`,
        });
      }
    };

    const animate = () => {
      if (!ctx) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Draw connections
        particles.forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(64, 139, 252, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

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

    video.playbackRate = 0.8;

    const loadVideo = async () => {
      try {
        video.preload = isLowBandwidth ? 'metadata' : 'auto';

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
        <canvas
          ref={canvasRef}
          className='absolute inset-0 z-0'
          style={{ mixBlendMode: 'screen' }}
        />
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
              opacity: 0.6,
            }}
          >
            <source src='/assets/main/cell_simulation.webm' type='video/webm' />
            <source src='/assets/main/cell_simulation.mp4' type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src='/assets/main/virtual.jpg'
            alt='AI-powered cell simulation visualization'
            className='h-full w-full object-cover opacity-60'
          />
        )}
        <div className='absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/50' />
        <div className='absolute inset-0 bg-[url("/assets/patterns/dna.svg")] opacity-5' />
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
            <motion.div
              variants={fadeInVariants}
              initial='hidden'
              animate={isInView ? 'visible' : 'hidden'}
              className='mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm'
            >
              <div className='h-2 w-2 animate-pulse rounded-full bg-white'></div>
              <span className='text-sm font-medium text-white'>
                Next-Gen Drug Discovery Platform
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInVariants}
              initial='hidden'
              animate={isInView ? 'visible' : 'hidden'}
              className='mb-6 font-book text-[42px] leading-tight tracking-tight text-white sm:text-[56px] lg:text-[64px]'
            >
              <span className='text-white'>AI-Powered</span> Virtual Cell Models
              <br />
              <span className='bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent'>
                Revolutionizing Drug Discovery
              </span>
            </motion.h1>

            <motion.p
              variants={slideInVariants}
              initial='hidden'
              animate={isInView ? 'visible' : 'hidden'}
              className='mb-8 max-w-2xl text-lg text-neutral-300 sm:text-xl'
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
                className='group relative overflow-hidden rounded-md bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02]'
              >
                <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/50 to-white/0 transition-transform group-hover:translate-x-full' />
                Explore Our Platform
              </Link>
              <Link
                href='/pdfs/whitepaper.pdf'
                className='group relative overflow-hidden rounded-md border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10'
                target='_blank'
                rel='noopener noreferrer'
              >
                <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transition-transform group-hover:translate-x-full' />
                Read Whitepaper
              </Link>
              <Link
                href='/contact'
                className='group relative overflow-hidden rounded-md border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10'
              >
                <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transition-transform group-hover:translate-x-full' />
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
          } right-[30px] flex w-[300px] flex-col items-start space-y-4 border-t border-white/20 sm:bottom-20 sm:right-24`}
        >
          <div className='flex flex-col items-start py-3'>
            <p className='mb-4 font-book text-sm uppercase tracking-wider text-white/60'>
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
