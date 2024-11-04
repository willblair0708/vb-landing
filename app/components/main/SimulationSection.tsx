import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useEffect, useRef, useState } from 'react';

import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  useIsomorphicLayoutEffect,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

import { Cells, Database, DNA, Gene } from '@/app/icons';
import useIsMobile from '@/hooks/use-is-mobile';
import ArrowIcon from '@/public/assets/ui/Arrow';

interface SimulationSectionProps {
  id: string;
  bgColor: string;
  isMobile: boolean;
}

// Move animation variants outside to be reusable
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
} as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
} as const;

export default function SimulationSection({
  id,
  bgColor,
  isMobile,
}: SimulationSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const ySpring = useSpring(y, springConfig);

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className='relative flex min-h-screen items-center overflow-hidden bg-slate-50 text-black'
      style={{ backgroundColor: bgColor }}
      initial='hidden'
      animate='visible'
      variants={containerVariants}
    >
      <motion.div className='w-full' style={{ y: ySpring, opacity }}>
        {/* Hero Section */}
        <motion.div
          className='mx-auto mt-[100px] flex max-w-7xl flex-col items-start justify-between gap-x-12 gap-y-12 px-4 sm:mt-32 sm:flex-row sm:gap-x-24'
          variants={containerVariants}
        >
          <motion.div className='w-full space-y-8 sm:w-1/2'>
            <motion.span
              variants={itemVariants}
              className='inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700'
            >
              Virtual Biology Platform
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className='font-book text-[32px] leading-tight tracking-tight text-[#18181B] sm:text-[40px]'
            >
              Revolutionizing Drug Discovery Through AI-Powered Virtual Cell
              Models
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className='max-w-xl font-book text-[16px] leading-relaxed text-gray-600'
            >
              Our breakthrough platform harnesses biology's digital foundation:
              DNA. By analyzing sequences across species, we identify conserved
              genetic programs that control cell behavior - essentially decoding
              nature's own programming language.
            </motion.p>

            <motion.div variants={itemVariants} className='flex gap-4'>
              <Link
                href='/platform'
                className='inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700'
              >
                Explore Platform
              </Link>
              <Link
                href='/contact'
                className='inline-flex items-center rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50'
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>

          <motion.div className='w-full sm:w-1/2' variants={containerVariants}>
            <StatsGrid />
          </motion.div>
        </motion.div>

        {/* Platform Preview */}
        <div className='mt-24 sm:mt-32'>
          <ProductPreview />
        </div>
      </motion.div>
    </motion.section>
  );
}

function StatsGrid() {
  return (
    <div className='grid grid-cols-2 gap-8'>
      <StatCard
        title='Model Accuracy'
        value='94%'
        description='Cross-species prediction accuracy'
        trend='up'
      />
      <StatCard
        title='Species Coverage'
        value='48+'
        description='Species analyzed'
        trend='up'
      />
      <StatCard
        title='Cost Reduction'
        value='90%'
        description='In drug development costs'
        trend='up'
      />
      <StatCard
        title='Time Saved'
        value='15x'
        description='Faster development cycle'
        trend='up'
      />
    </div>
  );
}

function StatCard({ title, value, description, trend }: StatCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      className='rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md'
    >
      <h3 className='text-sm font-medium text-gray-500'>{title}</h3>
      <div className='mt-2 flex items-baseline gap-2'>
        <span className='text-3xl font-semibold text-gray-900'>{value}</span>
        {trend === 'up' && <span className='text-green-500'>↑</span>}
      </div>
      <p className='mt-1 text-sm text-gray-600'>{description}</p>
    </motion.div>
  );
}

// Separate video component for better optimization
function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const loadVideo = async () => {
      try {
        video.playbackRate = 0.8;
        video.preload = 'metadata';

        await video.load();

        if (document.visibilityState === 'visible') {
          await video.play();
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
        } catch (error) {
          console.warn('Play on visibility change failed:', error);
          setVideoError(true);
        }
      } else {
        video.pause();
      }
    };

    const handleError = () => {
      console.warn('Video error occurred');
      setVideoError(true);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    video.addEventListener('error', handleError);

    loadVideo();

    return () => {
      video.pause();
      video.src = '';
      video.load();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      video.removeEventListener('error', handleError);
    };
  }, []);

  // if (videoError) {
  //   return (
  //     <img
  //       src="/assets/main/snow_poster.webp"
  //       alt="Snow simulation"
  //       className="absolute inset-0 h-full w-full object-cover"
  //       loading="lazy"
  //     />
  //   );
  // }

  return (
    <video
      ref={videoRef}
      className='absolute inset-0 h-full w-full object-cover'
      loop
      muted
      playsInline
      aria-label='Snow simulation video'
    >
      <source src='/assets/main/snow.webm' type='video/webm' />
      <source src='/assets/main/snow.mp4' type='video/mp4' />
      Your browser does not support the video tag.
    </video>
  );
}

function ProductPreview() {
  const isMobile = useIsMobile();

  return (
    <div className='relative mx-auto h-[600px] max-w-[1400px] rounded-t-[40px] bg-gradient-to-b from-white to-gray-50 p-6'>
      <div className='flex h-full w-full flex-col'>
        <nav className='flex w-full items-center justify-between rounded-xl bg-white/80 px-8 py-4 backdrop-blur-sm'>
          <div className='flex items-center gap-4'>
            <span className='font-medium text-gray-900'>
              Virtual Biology Platform
            </span>
            <span className='text-sm text-gray-500'>v2.0</span>
          </div>
          <div className='flex items-center gap-2'>
            {/* Add platform controls/navigation */}
          </div>
        </nav>

        {/* Rest of the preview content with updated styling */}
      </div>
    </div>
  );
}

// Add interfaces
interface StatCardProps {
  title: string;
  value: string;
  description: string;
  trend: 'up' | 'down' | 'stable';
}

interface PipelineMetricProps {
  label: string;
  value: string;
  color: string;
}

interface InsightMetricProps {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
}

function PipelineMetric({ label, value, color }: PipelineMetricProps) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        <div className={`h-2 w-2 rounded-full bg-${color}-500`} />
        <span className='text-xs text-gray-600'>{label}</span>
      </div>
      <span className={`text-xs font-semibold text-${color}-600`}>
        {value} {value.endsWith('%') ? '' : 'Faster'}
      </span>
    </div>
  );
}

function InsightMetric({ label, value, trend }: InsightMetricProps) {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    stable: 'text-blue-600',
  } as const;

  const trendIcons = {
    up: '↑',
    down: '↓',
    stable: '→',
  } as const;

  return (
    <div className='flex items-center justify-between'>
      <span className='text-xs text-gray-600'>{label}</span>
      <div className='flex items-center gap-1'>
        <span className={`text-xs font-semibold ${trendColors[trend]}`}>
          {value}
        </span>
        <span className={trendColors[trend]}>{trendIcons[trend]}</span>
      </div>
    </div>
  );
}

// Update PercentageDial to accept color prop
const PercentageDial = ({ percentage = 60, color = '#07E77A' }) => {
  const tickCount = 80;
  const size =
    typeof window !== 'undefined' && window.innerWidth < 640 ? 180 : 256;
  const ticks = Array.from({ length: tickCount }, (_, i) => i);

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;

    if (!element || !isInView) return;

    element.textContent = '0%';

    if (window.matchMedia('(prefers-reduced-motion)').matches) {
      element.textContent = `${percentage}%`;
      return;
    }

    const controls = animate(0, percentage, {
      duration: 1,
      ease: 'easeOut',
      onUpdate(value) {
        element.textContent = `${value.toFixed(0)}%`;
      },
    });

    return () => controls.stop();
  }, [ref, isInView, percentage]);

  return (
    <div className='relative' style={{ width: size, height: size }}>
      <div
        className='absolute inset-0 overflow-hidden rounded-full'
        style={{}}
      />
      {ticks.map((tick, index) => {
        const inPercentage = index / tickCount <= percentage / 100;
        const lastInPercentage =
          inPercentage && (index + 1) / tickCount > percentage / 100;

        const relativeHeight = inPercentage
          ? lastInPercentage
            ? 0.25
            : 0.15
          : 0.05;
        return (
          <motion.div
            key={tick}
            transition={{ duration: 0.2, delay: index * (1 / tickCount) }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: inPercentage ? 0.4 : 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            className='absolute origin-bottom'
            style={{
              width: size * 0.006,
              height: size * relativeHeight,
              left: '50%',
              bottom: '50%',
              opacity: inPercentage ? (lastInPercentage ? 1.0 : 0.3) : 0.1,
              backgroundColor: lastInPercentage ? color : 'black',
              transform: `translateX(-50%) rotate(${tick * 4.5}deg) translateY(${inPercentage ? size * 0.5 : size * 0.4}px)`,
            }}
          />
        );
      })}
      <div
        className='absolute inset-0 flex select-none items-center justify-center font-book text-3xl'
        ref={ref}
      />
    </div>
  );
};

function FloatingCard({
  children,
  style,
  className = '',
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  const cardRef = useRef(null);
  const [hasAppeared, setHasAppeared] = useState(false);
  const isInView = useInView(cardRef, {
    once: true,
    amount: 0.2,
    margin: '-100px 0px -100px 0px',
  });

  useEffect(() => {
    if (isInView && !hasAppeared) {
      setHasAppeared(true);
    }
  }, [isInView]);

  return (
    <motion.div
      ref={cardRef}
      className={`absolute h-fit w-fit rounded-xl bg-white/80 shadow-lg backdrop-blur-md transition-colors duration-300 hover:z-10 hover:bg-white/85 sm:px-8 sm:py-8 ${className}`}
      style={{
        ...style,
        fontSize: 'clamp(0.75rem, 2vw, 1rem)',
        pointerEvents: hasAppeared ? 'auto' : 'none',
      }}
      initial={false}
      animate={{
        opacity: hasAppeared ? 1 : 0,
        y: hasAppeared ? 0 : 20,
        transition: {
          type: 'spring',
          stiffness: 100,
          damping: 20,
          duration: 0.6,
        },
      }}
      whileHover={{
        scale: hasAppeared ? 1.01 : 1,
        transition: { duration: 0.15 },
      }}
    >
      {children}
    </motion.div>
  );
}
