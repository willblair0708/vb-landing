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

import * as icons from '@/app/icons';
import useIsMobile from '@/hooks/use-is-mobile';
import AaruIcon from '@/public/assets/ui/AaruFullIcon';
import ArrowIcon from '@/public/assets/ui/Arrow';

interface SimulationSectionProps {
  id: string;
  bgColor: string;
  isMobile: boolean;
}

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
    <motion.section
      ref={sectionRef}
      id={id}
      className='relative flex items-center overflow-hidden bg-[#F1EFED] text-black sm:px-8'
      style={{ backgroundColor: bgColor }}
      initial='hidden'
      animate='visible'
      variants={containerVariants}
    >
      <motion.div className='w-full' style={{ y: ySpring, opacity }}>
        <motion.div
          className='mx-auto mt-[100px] flex max-w-6xl flex-col items-start justify-between gap-x-12 gap-y-12 px-4 sm:mt-32 sm:flex-row sm:gap-x-24'
          variants={containerVariants}
        >
          <motion.div className='w-full space-y-6 sm:w-1/2'>
            <motion.h2
              variants={itemVariants}
              className='font-book text-[24px] leading-[28.8px] tracking-[-0.01em] text-[#18181B]'
            >
              {isMobile ? (
                "We're building simulation software that recreates the world using a multi-agent approach."
              ) : (
                <>
                  We&apos;re building simulation software <br /> that recreates
                  the world using <br /> a multi-agent approach.
                </>
              )}
            </motion.h2>
          </motion.div>

          <motion.div
            className='w-full space-y-8 sm:w-1/2'
            variants={containerVariants}
          >
            <motion.p
              variants={itemVariants}
              className='font-book text-[13px] tracking-tight text-black'
            >
              Navigate global sea change before it occurs. Configure worlds with
              hypothetical news, information, and stories to measure the impact
              of events that haven&apos;t yet happened.
            </motion.p>

            <motion.div variants={itemVariants}>
              <motion.div className='group flex cursor-pointer items-center'>
                <Link
                  className='flex items-center font-book text-sm uppercase tracking-wide transition-all'
                  href='/products'
                >
                  <ArrowIcon
                    className='mr-2 inline-block rotate-[-90deg] transition-transform'
                    color='black'
                    opacity={0.8}
                  />
                  <motion.span
                    className='font-book text-xs uppercase tracking-wide'
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    View Products
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
        <div className={`${isMobile ? '-mt-[400px]' : ''}`}>
          {isMobile ? <ProductPreviewMobile /> : <ProductPreview />}
        </div>
      </motion.div>
    </motion.section>
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

function ProductPreviewMobile() {
  return (
    <div className='mt-16 w-full'>
      <Image
        src='/assets/main/platform_mobile.webp'
        alt='Aaru Platform Mobile'
        className='w-full'
        width={1920}
        height={1080}
      />
    </div>
  );
}

function ProductPreview() {
  const isMobile = useIsMobile();

  return (
    <div className='relative mt-16 h-[400px] w-full max-w-screen-2xl rounded-t-[40px] bg-black p-2 pb-0 sm:mt-32 sm:h-[600px] sm:p-4 sm:pb-0'>
      <div className='flex h-full w-full flex-col'>
        <nav className='flex w-full items-center justify-between rounded-xl bg-black px-8 pb-4 text-white'>
          <AaruIcon className='mt-2' />
          <div className='flex items-center gap-4 text-sm'>
            <svg
              width='23'
              height='23'
              viewBox='0 0 23 23'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='mr-6 hidden sm:block'
            >
              <g clipPath='url(#clip0_131_1473)'>
                <path
                  d='M11.3096 19.8267C12.6246 19.8291 13.7239 18.8271 13.843 17.5174L13.8438 17.509L13.8442 17.5006C13.845 17.4861 13.8453 17.4716 13.8451 17.4572C13.8429 17.3074 13.7889 17.1705 13.7004 17.0634H18.0711C18.6575 17.0696 19.1739 16.6777 19.3255 16.1109C19.5088 15.4256 19.1018 14.7215 18.4165 14.5383L18.4136 14.5375C17.8772 14.3978 17.4938 13.9258 17.4671 13.3721L17.4663 13.356L17.4644 13.34L16.8589 8.2485L16.8587 8.24692C16.5958 6.09924 15.1111 4.30957 13.0701 3.64485C12.8655 2.94586 12.2587 2.42203 11.5149 2.33832C10.6153 2.23709 9.79455 2.80465 9.54922 3.64491C7.50831 4.30973 6.02377 6.0994 5.76093 8.24704L5.76074 8.2486L5.15525 13.3401L5.15335 13.3562L5.15257 13.3723C5.12586 13.9259 4.7425 14.3979 4.20614 14.5376L4.20614 14.5376L4.20322 14.5384C3.63552 14.6902 3.2429 15.208 3.25063 15.796C3.25994 16.5041 3.84066 17.0709 4.54843 17.0634H8.91907C8.8214 17.1816 8.7662 17.3355 8.77519 17.5007L8.77565 17.509L8.7764 17.5173C8.89542 18.827 9.99464 19.829 11.3096 19.8267ZM11.3096 19.8267C11.3092 19.8267 11.3089 19.8267 11.3086 19.8267L11.3096 19.3663M11.3096 19.8267C11.3099 19.8267 11.3103 19.8267 11.3106 19.8267L11.3096 19.3663M13.2098 17.2939L13.2064 17.0634H9.4127L9.40949 17.2939M13.2098 17.2939H9.40949M13.2098 17.2939V17.0634L9.23493 17.4757M13.2098 17.2939C13.305 17.2925 13.3833 17.3686 13.3847 17.4638C13.3848 17.4678 13.3847 17.4717 13.3845 17.4757C13.287 18.5482 12.3865 19.3686 11.3096 19.3663M9.40949 17.2939C9.40557 17.2938 9.40164 17.2939 9.39772 17.2941C9.30263 17.2993 9.22975 17.3806 9.23493 17.4757M9.40949 17.2939V17.0634L9.23493 17.4757M9.23493 17.4757C9.33239 18.5481 10.2327 19.3686 11.3096 19.3663M13.2075 16.8335H9.41164H13.2075Z'
                  stroke='white'
                  strokeWidth='0.920833'
                />
                <circle
                  cx='17.2862'
                  cy='5.08505'
                  r='3.68426'
                  fill='#03E87A'
                  stroke='#062D14'
                  strokeWidth='0.921065'
                />
              </g>
              <defs>
                <clipPath id='clip0_131_1473'>
                  <rect
                    width='22.1056'
                    height='22.1056'
                    fill='white'
                    transform='translate(0.246094 0.0214844)'
                  />
                </clipPath>
              </defs>
            </svg>
            <Image
              src='/assets/main/avatar.png'
              alt='Avatar'
              width={24}
              height={24}
              className='hidden rounded-full sm:block'
            />
            <span>Mark</span>
            <svg
              width='10'
              height='6'
              viewBox='0 0 10 6'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M9.75845 0.362305H0.558594L5.18454 5.0863L9.75845 0.362305Z'
                fill='white'
              />
            </svg>
          </div>
        </nav>

        <div className='relative h-full w-full overflow-hidden'>
          <Suspense
            fallback={
              <img
                src='/assets/main/platform.webp'
                alt='Aaru Platform'
                className='absolute inset-0 h-full w-full object-cover'
                loading='lazy'
              />
            }
          >
            {isMobile ? (
              <img
                src='/assets/main/platform.webp'
                alt='Aaru Platform'
                className='absolute inset-0 h-full w-full object-cover'
              />
            ) : (
              <VideoPlayer />
            )}
          </Suspense>
        </div>
      </div>

      {/* Only render floating cards if not mobile */}
      {!isMobile && (
        <>
          <FloatingCard
            style={{
              top: '25%',
              left: '-1%',
            }}
          >
            <div className='flex items-center gap-2'>
              <div className='items-left flex flex-col gap-2'>
                <div className='h-0.5 bg-white'></div>
                <div className='select-none rounded-md bg-white/40 px-2 py-3 text-[8px] uppercase'>
                  <p>55.24%</p>
                  <p>200 prefer statement A</p>
                </div>
              </div>
              <div className='flex w-40 flex-col'>
                <div className='pattern-diagonal-lines h-32 w-40 rounded-t-md pattern-bg-white pattern-gray-600 pattern-opacity-20 pattern-size-2'></div>
                <div className='h-48 w-40 rounded-b-md bg-[#007533]'></div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard
            style={{
              top: '-10%',
              left: '25%',
            }}
          >
            <div className='flex flex-col items-center gap-4'>
              <PercentageDial percentage={60} />
              <div className='flex gap-2 text-[10px] uppercase'>
                <div className='flex flex-col items-center'>
                  <icons.Chart width={10} height={10} />
                  <span>27K</span>
                  <span className='text-gray-500'>Alt Statistics</span>
                </div>
                <div className='flex flex-col items-center'>
                  <icons.Location width={10} height={10} />
                  <span>100%</span>
                  <span className='text-gray-500'>Accuracy</span>
                </div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard style={{ top: '15.5%', left: '67.5%' }}>
            <div className='flex h-96 gap-x-[1px]'>
              <DistributionBar heights={[60, 20, 10, 10]} label='INCOME' />
              <DistributionBar heights={[40, 20, 10, 30]} label='EDUCATION' />
              <DistributionBar heights={[50, 10, 15, 25]} label='ETHNICITY' />
              <DistributionBar heights={[50, 25, 20, 25]} label='RESIDENCE' />
            </div>
          </FloatingCard>

          <FloatingCard style={{ top: '5%', left: '55%' }}>
            <div>
              <p className='mb-4 select-none text-xs uppercase'>Statistics</p>
              <div className='relative flex flex-col'>
                <div className='relative flex h-48 w-full items-end gap-x-[4px]'>
                  <div
                    className='absolute left-[78%] top-[-10%] -translate-x-1/2 select-none whitespace-nowrap px-3 py-1 text-[10px] uppercase text-white'
                    style={{
                      backgroundColor: '#0AE77A',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <span className='text-black'>Peak in 2022</span>
                  </div>
                  <div className='absolute left-0 top-[15%] h-0.5 w-full bg-gray-500/20' />
                  <div className='absolute left-0 top-[55.5%] h-0.5 w-full bg-gray-500/20' />
                  <div className='absolute bottom-0 left-0 h-0.5 w-full bg-gray-500/20' />
                  {[
                    11.1, 3.88, 1.66, 1.66, 1.66, 16.66, 1.66, 1.66, 1.66, 9.44,
                    17.5, 1.66, 1.66, 100, 52.77, 82.22, 62.2, 62.2, 1.66, 1.66,
                    36.6, 1.66, 51.03, 7.45, 73.3, 7.45, 17.37, 7.45, 7.45,
                    93.2, 84.4, 44.4, 7.45, 1.66, 1.66, 1.66, 1.66, 1.66, 3.78,
                    43.0, 8.88, 37.4, 47.2, 3.78, 1.66, 3.78, 3.78, 22.22,
                  ].map((h, index) => (
                    <motion.div
                      key={index}
                      className='w-[1.5px] bg-gray-500 data-[highlighted]:bg-[#0AE77A]'
                      data-highlighted={index === 29 ? 'true' : undefined}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: index * 0.02 }}
                    />
                  ))}
                </div>
                <div className='mt-2 flex select-none justify-between text-xs uppercase text-gray-400'>
                  <span>AGE</span>
                  <span>EDU</span>
                </div>
              </div>
            </div>
          </FloatingCard>
        </>
      )}
    </div>
  );
}

const DistributionBar = ({
  heights,
  label,
}: {
  heights: number[];
  label: string;
}) => {
  const colors = ['#010365', '#1019EC', '#2553FA', '#398CFF'];
  return (
    <div className='relative flex flex-col items-center'>
      <p className='absolute inset-2 select-none text-xs uppercase tracking-wide text-white'>
        {label}
      </p>
      {heights.map((h, index) => (
        <div
          key={index}
          style={{ height: `${h}%`, backgroundColor: colors[index] }}
          className='w-12 sm:w-24'
        />
      ))}
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

const PercentageDial = ({ percentage = 60 }) => {
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
              backgroundColor: lastInPercentage ? '#07E77A' : 'black',
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
