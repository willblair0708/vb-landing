'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import Footer from '@/app/components/Footer';
import ArrowIcon from '@/public/assets/ui/Arrow';

import Navbar from '../../components/Navbar';
import { JobListing, jobs } from '../jobsData';

const JobDetailsPage = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState<JobListing | null>(null);

  useEffect(() => {
    const currentJob = jobs.find((j) => j.id === params.role);
    setJob(currentJob || null);
    setIsLoading(false);
  }, [params.role]);

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

  return (
    <div className='font-oracle min-h-screen bg-black font-book'>
      <AnimatePresence mode='wait'>
        {isLoading || !job ? (
          <motion.div
            key='loading'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='flex min-h-screen items-center justify-center bg-black text-white'
          >
            {/* Optional: Add a loading indicator here */}
          </motion.div>
        ) : (
          <motion.div
            key='content'
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={containerVariants}
            className='flex min-h-screen flex-col text-white'
          >
            <Navbar isFixed={false} />

            {/* Main content */}
            <div className='w-full flex-1 px-8'>
              <div className='mx-auto flex flex-col sm:flex-row'>
                {/* Job title section */}
                <div className='sm:w-1/2'>
                  <motion.h1
                    variants={itemVariants}
                    className={`mt-[20vh] font-book text-3xl leading-[1.2] tracking-[-0.42px] sm:text-[42px] lg:text-[52px]`}
                  >
                    {job.title}
                  </motion.h1>
                  <motion.p
                    variants={itemVariants}
                    className='text;sm mb-4 mt-2 text-gray-400 sm:text-xl'
                  >
                    {job.location}
                  </motion.p>
                </div>

                {/* Job details section */}
                <div className='mt-8 w-full max-w-[569px] sm:mt-[20vh] xl:max-w-[640px]'>
                  <div className='mt-2 space-y-[50px]'>
                    <motion.div variants={itemVariants}>
                      <h2 className='mb-4 text-sm font-bold leading-[14.4px] tracking-[0.96px]'>
                        TO APPLY
                      </h2>
                      <p className='text-white/80'>
                        Send your CV and introduction to{' '}
                        <a
                          href='mailto:jobs@aaruaaru.com'
                          className='text-white underline'
                        >
                          jobs@aaruaaru.com
                        </a>
                      </p>
                    </motion.div>

                    {/* SALARY section */}
                    <motion.div variants={itemVariants}>
                      <h2 className='mb-4 text-sm font-bold leading-[14.4px] tracking-[0.96px]'>
                        SALARY
                      </h2>
                      <p className='text-white/80'>{job.salary}</p>
                    </motion.div>

                    {/* OVERVIEW section */}
                    <motion.div variants={itemVariants}>
                      <h2 className='mb-4 text-sm font-bold leading-[14.4px] tracking-[0.96px]'>
                        OVERVIEW
                      </h2>
                      <p className='text-white/80'>{job.overview}</p>
                    </motion.div>

                    {/* RESPONSIBILITIES section */}
                    <motion.div variants={itemVariants}>
                      <h2 className='mb-4 text-sm font-bold leading-[14.4px] tracking-[0.96px]'>
                        RESPONSIBILITIES
                      </h2>
                      <ul className='space-y-2 text-white/80'>
                        {job.responsibilities.map((resp, index) => (
                          <li key={index}>• {resp}</li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* REQUIREMENTS section */}
                    <motion.div variants={itemVariants}>
                      <h2 className='mb-4 text-sm font-bold leading-[14.4px] tracking-[0.96px]'>
                        REQUIREMENTS
                      </h2>
                      <ul className='space-y-2 text-white/80'>
                        {job.qualifications.map((qual, index) => (
                          <li key={index}>• {qual}</li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* BENEFITS section */}
                    {/* <motion.div variants={itemVariants}>
                      <h2 className='mb-4 text-sm font-bold leading-[14.4px] tracking-[0.96px]'>
                        BENEFITS
                      </h2>
                      <p className='text-white/80'>{job.benefits}</p>
                    </motion.div> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Back to Careers link */}
            <motion.div variants={itemVariants} className='w-full px-8 py-16'>
              <Link
                href='/careers'
                className='flex items-center text-gray-400 transition-colors hover:text-white'
              >
                <ArrowIcon
                  color='currentColor'
                  className='mr-2 h-4 w-4 rotate-90'
                  opacity={1}
                />
                <span>Back to Careers</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default JobDetailsPage;
