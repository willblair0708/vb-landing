import Link from 'next/link';
import { useRef } from 'react';

import { motion } from 'framer-motion';

import ArrowIcon from '@/public/assets/ui/Arrow';

interface JobsSectionProps {
  id: string;
  bgColor: string;
}

export default function JobsSection({ id, bgColor }: JobsSectionProps) {
  const sectionRef = useRef(null);

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
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      className='relative flex h-[541px] flex-col items-center justify-center overflow-hidden px-5 text-white sm:px-8'
      style={{ backgroundColor: bgColor }}
    >
      <div className='container relative z-10 mx-auto'>
        <motion.div variants={itemVariants} className='mb-16 text-center'>
          <motion.h2
            className='mx-auto mb-6 max-w-4xl font-light text-[34px] leading-tight tracking-tight text-white lg:text-[50px]'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We are always looking for passionate thinkers to build alongside us.
          </motion.h2>
          <motion.div
            className='mt-10 flex flex-col items-center sm:mt-20'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className='mb-1 h-px w-full max-w-[278px] bg-white sm:w-64'
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
            <Link href='/careers'>
              <motion.span className='flex items-center px-4 py-2 text-white transition-all duration-300 sm:px-6'>
                <ArrowIcon
                  className='mr-2 rotate-[-90deg]'
                  color='white'
                  opacity={1}
                />
                <motion.span
                  className='text-xs uppercase tracking-wider'
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  JOIN THE TEAM
                </motion.span>
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
