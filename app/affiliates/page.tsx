'use client';

import { useRef, useState } from 'react';

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';

import useIsMobile from '@/hooks/use-is-mobile';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

interface AffiliateCardProps {
  logo: string;
  quote: string;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  isHovered: boolean;
  cardIndex: number;
  hoveredIndex: number | null;
}

const AffiliateCard: React.FC<AffiliateCardProps> = ({
  logo,
  quote,
  onHoverStart,
  onHoverEnd,
  cardIndex,
  hoveredIndex,
}) => (
  <motion.div
    className='h-full bg-white p-8 shadow-lg'
    whileHover={{ scale: 1.05 }}
    animate={{
      opacity: hoveredIndex === null || hoveredIndex === cardIndex ? 1 : 0.8,
    }}
    transition={{ duration: 0.2 }}
    onHoverStart={onHoverStart}
    onHoverEnd={onHoverEnd}
  >
    <img
      src={logo}
      alt='Affiliate logo'
      className='mb-6 w-10'
      onError={(e) => {
        e.currentTarget.src = '/assets/affiliates/A24_logo.svg';
      }}
    />
    <p className='italic text-gray-700'>{`"${quote}"`}</p>
  </motion.div>
);

export default function Affiliates() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  const handleHoverStart = (index: number) => {
    setIsHovered(true);
    setHoveredIndex(index);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    setHoveredIndex(null);
  };

  const affiliates = [
    {
      logo: '/assets/affiliates/A24_logo.svg',
      quote:
        'Revolutionizing prediction technology with cutting-edge AI solutions.',
      offsetY: 0,
      offsetX: 0,
    },
    {
      logo: '/assets/affiliates/A24_logo.svg',
      quote: 'Partnering to create the future of decision intelligence.',
      offsetY: -20,
      offsetX: 40,
    },
    {
      logo: '/assets/affiliates/A24_logo.svg',
      quote: 'Leading innovation in population-scale simulations.',
      offsetY: 20,
      offsetX: -40,
    },
    {
      logo: '/assets/affiliates/A24_logo.svg',
      quote: "Building tomorrow's predictive analytics, today.",
      offsetY: -10,
      offsetX: 40,
    },
  ];

  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end end'],
  });

  const carouselProgress = useTransform(scrollYProgress, [0, 5], [0, -1200]);

  return (
    <AnimatePresence mode='wait'>
      <Navbar isFixed={false} />
      <motion.div
        key='affiliates-page'
        className={`${isMobile ? 'min-h-fit' : 'h-screen'} overflow-hidden bg-zinc-900 font-oracle`}
      >
        <motion.main
          ref={containerRef}
          initial='visible'
          animate='visible'
          variants={sectionVariants}
          className='relative h-full'
        >
          <motion.section
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            className='flex h-1/2 items-center px-4 text-white'
          >
            <div className='mx-0 mt-40 max-w-6xl sm:mt-24 sm:px-40'>
              <motion.h1
                variants={itemVariants}
                className='mb-6 text-4xl font-bold sm:text-[42px] lg:text-[52px]'
              >
                Our Affiliates
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className='text;sm max-w-2xl text-gray-400 sm:text-xl'
              >
                We partner with world class leaders to push the boundaries of
                what&apos;s possible with prediction
              </motion.p>
            </div>
          </motion.section>

          <motion.section
            variants={sectionVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            className='relative flex min-h-[50vh] items-center overflow-hidden px-4 pb-8 pt-16 sm:h-1/2 sm:pb-0 sm:pt-0'
          >
            <motion.div
              className='flex w-full flex-col gap-8 sm:flex-row sm:px-4'
              style={{
                x: !isMobile ? carouselProgress : 0,
                position: 'relative',
                left: !isMobile ? '5%' : '0',
              }}
            >
              {affiliates.map((affiliate, index) => (
                <motion.div
                  className='mx-auto h-[200px] w-[80%] sm:w-[300px] sm:flex-shrink-0'
                  key={index}
                  style={{
                    y: !isMobile ? affiliate.offsetY : 0,
                    x: isMobile ? affiliate.offsetX : 0,
                  }}
                >
                  <AffiliateCard
                    logo={affiliate.logo}
                    quote={affiliate.quote}
                    onHoverStart={() => handleHoverStart(index)}
                    onHoverEnd={handleHoverEnd}
                    cardIndex={index}
                    hoveredIndex={hoveredIndex}
                    isHovered={isHovered}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </motion.main>
      </motion.div>
      <Footer />
    </AnimatePresence>
  );
}
