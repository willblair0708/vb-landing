'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import * as icons from '@/app/icons';
import ArrowIcon from '@/public/assets/ui/Arrow';
import LinkedIn from '@/public/assets/ui/LinkedIn';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const CareersPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

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

  const roles = ['Full Stack Engineer', 'Research Engineer'];

  const handleRoleClick = (role: string) => {
    router.push(
      `/careers/${encodeURIComponent(role.toLowerCase().replace(/ /g, '-'))}`
    );
  };

  return (
    <div className='min-h-screen bg-[#18181B] bg-black font-book font-oracle'>
      <div className='sm:px-8'>
        <Navbar isFixed={false} />
        <AnimatePresence mode='wait'>
          {isLoading ? (
            <motion.div
              key='loading'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='flex min-h-screen items-center justify-center text-white'
            >
              {/* Optional: Add a loading indicator here */}
            </motion.div>
          ) : (
            <motion.div
              key='content'
              initial='hidden'
              animate='visible'
              variants={containerVariants}
              className='flex min-h-screen flex-col p-4 text-white sm:p-8'
            >
              {/* Updated Roles Section */}
              <motion.div
                variants={containerVariants}
                className='pt-[100px] lg:pt-[80px]'
              >
                <motion.h2
                  variants={itemVariants}
                  className='mb-8 flex items-center justify-between font-book text-3xl tracking-tight sm:mb-24 sm:text-[42px]'
                >
                  <span>Open Roles</span>
                </motion.h2>
                <motion.div
                  variants={itemVariants}
                  className='mb-100 space-y-3 sm:space-y-4'
                >
                  {roles.map((role, index) => (
                    <motion.div
                      key={index}
                      className='flex cursor-pointer items-center justify-between border-t border-gray-700 py-3 hover:border-t-white sm:py-4'
                      onClick={() => handleRoleClick(role)}
                      role='link'
                      data-href={`/careers/${encodeURIComponent(role.toLowerCase().replace(/ /g, '-'))}`}
                    >
                      <span className='w-1/3 font-book'>{role}</span>
                      <span className='w-1/3 text-center text-white text-opacity-60'>
                        Full Time
                      </span>
                      <div className='flex w-1/3 items-center justify-end'>
                        <ArrowIcon
                          color='white'
                          className='rotate-[-90deg]'
                          opacity={1}
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className='mb-[100px] mt-[100px] flex w-full flex-col items-start justify-between space-y-[30px] sm:flex-row sm:items-center sm:space-y-0 md:mb-20'
                >
                  <p className='font-book text-2xl tracking-tight text-white/50'>
                    Don&apos;t see what you&apos;re looking for?
                  </p>
                  <span className='text-white/50'>
                    Get in touch:{' '}
                    <Link
                      href='mailto:jobs@aaru.com'
                      className='text-white hover:underline'
                    >
                      jobs@aaru.com
                    </Link>
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

function FounderPortrait({
  name,
  index,
  slug,
  linkedin,
  instagram,
}: {
  name: string;
  index: number;
  slug: string;
  linkedin: string;
  instagram: string;
}) {
  return (
    <motion.div
      key={name}
      className={`relative w-fit ${
        index === 1 ? 'md:mt-12 lg:mt-20' : 'md:-mt-12 lg:-mt-20'
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
    >
      <motion.div
        className='relative h-[450px] w-full sm:h-full sm:max-h-[500px] lg:max-h-[538px]'
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={`/assets/founders/${slug}`}
          className='!aspect-[0.83] h-full w-auto object-cover sm:max-h-[500px] lg:max-h-[538px]'
          height={538}
          width={448}
          alt={name}
        />
        <motion.div
          className='absolute bottom-[10px] left-[10px] flex h-[120px] w-[180px] flex-col justify-between bg-[#03E87A] p-3 sm:h-[130px] sm:w-[190px] sm:p-4 lg:h-[143px] lg:w-[207px]'
          initial={{ y: 0, x: 0 }}
          whileHover={{ y: -5, x: 5 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <h3 className='mb-2.5 border-t border-black pt-2.5 font-book text-lg tracking-tight text-black'>
              {name}
            </h3>
            <p className='font-book text-sm tracking-tight text-black'>
              Co-Founder
            </p>
          </div>
          <div className='flex space-x-2'>
            <Link
              href={`https://www.instagram.com/${instagram}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <icons.Instagram width={16} height={16} />
            </Link>
            <Link
              href={`https://www.linkedin.com/in/${linkedin}/`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <LinkedIn width={16} height={16} />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default CareersPage;
