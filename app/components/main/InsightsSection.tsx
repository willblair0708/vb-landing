import Link from 'next/link';
import { useRef } from 'react';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';

import ArrowIcon from '@/public/assets/ui/Arrow';

interface InsightsSectionProps {
  id: string;
}

const generateOrganelles = (count: number) => {
  return Array(count)
    .fill(0)
    .map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 20,
      speed: Math.random() * 10 + 5,
      delay: Math.random() * 2,
    }));
};

const generateProteins = (count: number) => {
  return Array(count)
    .fill(0)
    .map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 15 + 10,
    }));
};

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
      className='relative flex min-h-screen flex-col-reverse items-center overflow-hidden bg-gradient-to-b from-black to-neutral-900/95 lg:flex-row'
    >
      {/* Left Side - Interactive Visualization */}
      <motion.div
        className='relative z-0 h-[28rem] w-full sm:h-[36rem] lg:h-screen lg:w-3/5'
        style={{ scale, opacity }}
      >
        {/* Enhanced Cell Membrane */}
        <div className='bg-gradient-radial absolute inset-0 overflow-hidden rounded-[50%] border border-white/10 from-white/5 via-transparent to-transparent opacity-30'>
          <motion.div
            className='h-full w-full'
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        {/* Organelles */}
        {generateOrganelles(8).map((organelle, i) => (
          <motion.div
            key={`organelle-${i}`}
            className='absolute rounded-full bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-transparent backdrop-blur-sm'
            style={{
              left: `${organelle.x}%`,
              top: `${organelle.y}%`,
              width: organelle.size,
              height: organelle.size,
            }}
            animate={{
              x: [0, 10, -10, 0],
              y: [0, -10, 10, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: organelle.speed,
              delay: organelle.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {/* Organelle details */}
            <div className='absolute inset-0 rounded-full border border-emerald-500/30' />
            <div className='absolute inset-2 rounded-full border border-emerald-500/20' />
          </motion.div>
        ))}

        {/* Proteins and Molecules */}
        {generateProteins(30).map((protein, i) => (
          <motion.div
            key={`protein-${i}`}
            className='absolute h-1 w-1 rounded-full bg-white/40'
            style={{
              left: `${protein.x}%`,
              top: `${protein.y}%`,
              width: protein.size,
              height: protein.size,
            }}
            animate={{
              x: [0, 20, -20, 0],
              y: [0, -20, 20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: protein.speed,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}

        {/* Neural Network Representation */}
        <svg className='absolute inset-0 h-full w-full opacity-30'>
          <defs>
            <filter id='glow'>
              <feGaussianBlur stdDeviation='2' result='coloredBlur' />
              <feMerge>
                <feMergeNode in='coloredBlur' />
                <feMergeNode in='SourceGraphic' />
              </feMerge>
            </filter>
          </defs>
          <g filter='url(#glow)'>
            {[...Array(15)].map((_, i) => {
              const x1 = Math.random() * 100;
              const y1 = Math.random() * 100;
              const x2 = Math.random() * 100;
              const y2 = Math.random() * 100;
              return (
                <motion.path
                  key={`path-${i}`}
                  d={`M ${x1}% ${y1}% Q ${(x1 + x2) / 2 + Math.random() * 20}% ${
                    (y1 + y2) / 2 + Math.random() * 20
                  }% ${x2}% ${y2}%`}
                  stroke='url(#gradient-stroke)'
                  strokeWidth='0.5'
                  fill='none'
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatType: 'reverse',
                  }}
                />
              );
            })}
          </g>
        </svg>

        {/* Data Flow Particles */}
        <motion.div className='absolute inset-0'>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`data-${i}`}
              className='absolute h-1 w-1 rounded-full bg-emerald-500/40'
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0, 0.8, 0],
                pathLength: [0, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: 'linear',
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>

        {/* Add gradient definitions */}
        <svg className='absolute inset-0'>
          <defs>
            <linearGradient
              id='gradient-stroke'
              x1='0%'
              y1='0%'
              x2='100%'
              y2='100%'
            >
              <stop offset='0%' stopColor='rgba(16, 185, 129, 0.5)' />
              <stop offset='100%' stopColor='rgba(255, 255, 255, 0.2)' />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Right Side - Content */}
      <div className='relative z-10 flex w-full items-center px-8 py-16 lg:w-2/5 lg:px-16 lg:py-0'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className='mx-auto max-w-[500px]'
        >
          <motion.div variants={itemVariants} className='text-left'>
            {/* Enhanced Status Badge */}
            <div className='mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm'>
              <div className='relative h-2 w-2'>
                <div className='absolute h-full w-full animate-ping rounded-full bg-emerald-500/30'></div>
                <div className='relative h-full w-full rounded-full bg-emerald-500'></div>
              </div>
              <span className='text-sm font-medium text-white'>
                Virtual Cell Technology
              </span>
            </div>

            {/* Enhanced Content */}
            <h2 className='mb-6 font-rg text-[2.75rem] leading-tight tracking-tight text-white'>
              <span className='bg-gradient-to-br from-white via-white/90 to-white/80 bg-clip-text text-transparent'>
                Accelerating Discovery
              </span>
              <br />
              Through AI Simulation
            </h2>

            <p className='mb-8 text-lg leading-relaxed text-neutral-300'>
              Our virtual cell models combine genomic data with advanced AI to
              simulate cellular responses, enabling rapid drug testing and
              development across diverse genetic backgrounds.
            </p>

            {/* Enhanced Metrics Grid */}
            <div className='mb-12 grid grid-cols-3 gap-4'>
              {[
                { value: '90', unit: '%', label: 'Success Rate' },
                { value: '2B', unit: '$', label: 'Cost Savings' },
                { value: '1000', unit: 'x', label: 'Faster Testing' },
              ].map((metric, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className='group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]'
                >
                  <div className='absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                  <div className='relative flex items-baseline gap-1'>
                    <div className='text-3xl font-semibold text-white'>
                      {metric.value}
                    </div>
                    <div className='text-lg text-white/80'>{metric.unit}</div>
                  </div>
                  <div className='relative mt-1 text-sm text-neutral-400 transition-colors duration-300 group-hover:text-neutral-300'>
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced CTA */}
            <motion.div variants={itemVariants}>
              <Link href='/platform' className='group'>
                <div className='absolute inset-0' />
                <span className='relative flex items-center gap-2'>
                  Explore Platform
                  <ArrowIcon
                    className='rotate-[-90deg] transition-transform group-hover:translate-x-0.5'
                    color='#FFFFFF'
                  />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
