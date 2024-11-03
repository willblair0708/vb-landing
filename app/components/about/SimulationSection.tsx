import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';

import ArrowIcon from '@/public/assets/ui/Arrow';

interface SimulationSectionProps {
  id: string;
  bgColor: string;
  isMobile: boolean;
  inView: boolean;
}

export default function SimulationSection({
  id,
  bgColor,
  isMobile,
  inView,
}: SimulationSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);

  const fadeInUpVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const containerVariants = {
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      style={{ backgroundColor: bgColor }}
      className='relative flex h-[600px] items-center overflow-hidden p-4 text-white sm:p-6 md:p-8'
      initial='hidden'
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <motion.div style={{ opacity, scale }} className='absolute inset-0'>
        <Image
          src={
            isMobile
              ? '/assets/about/blog-mobile.webp'
              : '/assets/about/blog.webp'
          }
          alt='Aaru Products Simulation'
          fill
          sizes='100vw'
          priority
          quality={90}
          placeholder='blur'
          blurDataURL='data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAAAwAgCdASoIAAUAAkA4JZwAAvjD/JgAA/v0/QAP7/JgAA'
          className='object-cover object-center'
        />
        {/* Lighter overlay */}
        <div className='absolute inset-0 bg-black/20' />
      </motion.div>
      <motion.div
        className='absolute inset-0 flex flex-col justify-between px-4 py-[30px] sm:p-6 md:p-8'
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
        variants={fadeInUpVariants}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div>
          <motion.div
            className='mb-2 h-px w-full bg-white sm:mb-3 md:mb-4'
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
          <motion.h3
            className='text-center font-book text-[15px] tracking-[-0.02em]'
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Latest From Our Blog
          </motion.h3>
        </div>
        <div className='flex flex-grow flex-col items-center justify-center'>
          <div className='mx-auto max-w-3xl px-2 text-center sm:px-4 md:px-6 lg:px-8'>
            <motion.h2
              className='mx-auto mb-2 text-center font-light text-[42px] leading-[50px] tracking-[0] sm:mb-3'
              variants={fadeInUpVariants}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className='block sm:hidden'>
                How Aaru simulates entire populations to predict events
              </span>
              <span className='hidden sm:block'>
                How Aaru simulates entire <br /> populations to predict events
              </span>
            </motion.h2>
            <motion.div
              className='mx-auto mb-4 mt-4 flex flex-row items-center justify-center gap-4 text-[15px] leading-[18px] sm:mb-6'
              variants={fadeInUpVariants}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className='font-lt'>By John Kessler</span>
              <span className='text-white opacity-75'>•</span>
              <span className='font-rg opacity-75'>November 18 2024</span>
            </motion.div>
          </div>
        </div>

        <motion.div
          className='text-center'
          variants={fadeInUpVariants}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            href='/blog/1'
            className='font-regular inline-flex cursor-pointer items-center justify-center text-[12px] uppercase tracking-[0.08em] text-white transition-all duration-300 hover:opacity-80'
          >
            <ArrowIcon className='mr-2 h-3 w-3' color='white' />
            <span className='border-b border-transparent hover:border-white'>
              Take a closer look
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
