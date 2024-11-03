import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';

import ArrowIcon from '@/public/assets/ui/Arrow';

interface TeamSectionProps {
  id: string;
  bgColor: string;
  isMobile: boolean;
  inView: boolean;
}

export default function TeamSection({
  id,
  bgColor,
  isMobile,
  inView: parentInView,
}: TeamSectionProps) {
  const ref = useRef(null);
  const carouselRef = useRef(null);

  const sectionInView = useInView(ref, {
    once: true,
    amount: isMobile ? 0.05 : 0.1,
  });

  const { scrollYProgress } = useScroll({
    offset: ['start end', 'end start'],
  });

  const carouselProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [1000, isMobile ? -1000 : -300]
  );

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.1,
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

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  return (
    <motion.div
      id={id}
      ref={ref}
      className='relative z-10 flex w-full flex-col'
      initial='hidden'
      animate={parentInView && sectionInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      style={{ backgroundColor: bgColor }}
    >
      <motion.div
        className='relative flex flex-grow flex-col items-center justify-between bg-[#F1EFED]'
        variants={itemVariants}
        ref={carouselRef}
      >
        <div className='mb-[60px] flex flex-col gap-4 self-start sm:mt-20 sm:flex-row sm:gap-8 lg:ml-14 lg:mt-28'>
          <div className='mt-8 max-w-xl px-4 sm:mt-0 sm:px-0'>
            <p className='font-book text-[15px] leading-[18px] tracking-[-0.01em]'>
              <span className='ml-4 sm:ml-8'>We are existentialists. We </span>
              {isMobile ? (
                <>
                  believe we live in a simulation and it is our goal to prove
                  it. We see our products as puzzle pieces to building whole
                  world simulation.
                </>
              ) : (
                <>
                  <br />
                  believe we live in a simulation and it is
                  <br />
                  our goal to prove it. We see our products
                  <br />
                  as puzzle pieces to building whole world
                  <br />
                  simulation.
                </>
              )}
            </p>
          </div>

          <div className='max-w-xl px-4 sm:px-0'>
            <p
              className={`${
                isMobile ? 'indent-4' : 'indent-8'
              } font-book text-[15px] leading-[18px] tracking-[-0.01em]`}
            >
              {isMobile ? (
                <>
                  We work with some of the largest political campaigns,
                  companies, and decision makers in the world. Our work is used
                  to select candidates for office, test movie trailers, trade
                  futures, and win wars.
                </>
              ) : (
                <>
                  We work with some of the
                  <br />
                  largest political campaigns, companies,
                  <br />
                  and decision makers in the world. Our
                  <br />
                  work is used to select candidates for office,
                  <br />
                  test movie trailers, trade futures,
                  <br />
                  and win wars.
                </>
              )}
            </p>
          </div>
        </div>

        <div className='relative h-[280px] w-full overflow-hidden sm:h-128'>
          <motion.div
            className='absolute flex items-start gap-x-4'
            style={{
              x: carouselProgress,
              width: 'auto',
            }}
          >
            {[1, 2, 3, 4, 5].map((index) => (
              <Image
                key={index}
                src={`/assets/about/team${index}.jpg`}
                alt={`Team member ${index}`}
                width={isMobile ? 280 : 350}
                height={isMobile ? 280 : 350}
                className={`${
                  [2, 4].includes(index)
                    ? isMobile
                      ? 'aspect-[1.2]'
                      : 'aspect-[1]'
                    : 'aspect-[0.82]'
                } w-[280px] object-cover sm:w-[350px] ${
                  [3, 4].includes(index) ? 'object-right' : ''
                }`}
                loading={index <= 2 ? 'eager' : 'lazy'}
                quality={75}
              />
            ))}
          </motion.div>
        </div>

        <div className='my-[150px] flex flex-col items-center'>
          <p className='mx-auto mb-[80px] max-w-6xl px-4 text-center font-light text-[40px] font-[300] leading-[48px] tracking-[-0.01em]'>
            {isMobile ? (
              'We are always looking for passionate thinkers to build alongside us.'
            ) : (
              <>
                We are always looking for passionate <br /> thinkers to build
                alongside us.
              </>
            )}
          </p>
          <motion.div
            variants={lineVariants}
            className='mx-auto mb-4 mt-[40px] h-px w-[270px] bg-black'
          />
          <Link href='/careers'>
            <motion.div
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <motion.span
                className='flex cursor-pointer items-center text-xs font-normal uppercase tracking-[0.08em]'
                initial={{ textDecoration: 'none' }}
              >
                <ArrowIcon className='mr-2 rotate-[-90deg]' color='black' />
                <motion.span
                  className='font-book text-xs uppercase tracking-wide'
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  JOIN THE TEAM
                </motion.span>
              </motion.span>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
