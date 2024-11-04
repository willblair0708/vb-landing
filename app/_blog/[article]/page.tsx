'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

import { motion, useInView } from 'framer-motion';

import ArrowIcon from '@/public/assets/ui/Arrow';

import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

export default function HowAaruSimulatesPopulations() {
  const headerTextRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const isHeaderTextInView = useInView(headerTextRef, {
    once: true,
    amount: 0.2,
  });
  const isContentInView = useInView(contentRef, { once: true, amount: 0.2 });
  const isImageInView = useInView(imageRef, { once: true, amount: 0.2 });

  const headerTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const paragraphVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className='font-oracle flex min-h-screen flex-col'>
      <Navbar isFixed={false} />

      <main className='flex-grow'>
        <div className='relative flex h-[600px] w-full items-center overflow-hidden text-white'>
          <motion.div
            ref={imageRef}
            initial='hidden'
            animate={isImageInView ? 'visible' : 'hidden'}
            variants={imageVariants}
            className='absolute inset-0'
          >
            <Image
              src='/assets/about/blog.webp'
              alt='Aaru Products Simulation'
              fill
              sizes='100vw'
              priority
              quality={90}
              placeholder='blur'
              blurDataURL='data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAAAwAgCdASoIAAUAAkA4JZwAAvjD/JgAA/v0/QAP7/JgAA'
              className='object-cover object-center'
            />
          </motion.div>
          <div className='absolute inset-0 flex flex-col justify-between p-4 sm:p-6 md:p-8'>
            <div className='flex flex-grow flex-col items-center justify-center'>
              <motion.div
                ref={headerTextRef}
                initial='hidden'
                animate={isHeaderTextInView ? 'visible' : 'hidden'}
                variants={headerTextVariants}
                className='mx-auto max-w-3xl px-2 text-center sm:px-4 md:px-6 lg:px-8'
              >
                <h1 className='font-oracle mx-auto mb-2 text-center text-[40px] font-[300] leading-[1.1] sm:mb-3 sm:max-w-none sm:text-[40px] md:text-[50px] md:leading-[50px]'>
                  How Aaru simulates entire <br /> populations to predict events
                </h1>
                <div className='mx-auto mb-4 mt-4 flex flex-row items-center justify-center gap-2 text-[13px] sm:mb-6 sm:text-[14px] md:text-[15px]'>
                  <span className='font-lt'>By John Kessler</span>
                  <span className='text-white opacity-75'>•</span>
                  <span className='font-rg opacity-75'>November 18 2024</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          ref={contentRef}
          className='mx-auto max-w-3xl px-4 py-12'
          initial='hidden'
          animate={isContentInView ? 'visible' : 'hidden'}
          variants={contentVariants}
        >
          <motion.div className='font-oracle text-gray-600'>
            <motion.p variants={paragraphVariants} className='mb-6'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
              dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed
              auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in
              nulla enim. Phasellus molestie magna non est bibendum non
              venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
            </motion.p>
            <motion.p variants={paragraphVariants} className='mb-6'>
              Mauris iaculis porttitor posuere. Praesent id metus massa, ut
              blandit odio. Proin quis tortor orci. Etiam at risus et justo
              dignissim congue. Donec congue lacinia dui, a porttitor lectus
              condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio
              ac lectus vestibulum faucibus eget in metus. In pellentesque
              faucibus vestibulum. Nulla at nulla justo, eget luctus tortor.
            </motion.p>
            <motion.p variants={paragraphVariants} className='mb-6'>
              Nulla facilisi. Duis aliquet egestas purus in blandit. Curabitur
              vulputate, ligula lacinia scelerisque tempor, lacus lacus ornare
              ante, ac egestas est urna sit amet arcu. Class aptent taciti
              sociosqu ad litora torquent per conubia nostra, per inceptos
              himenaeos. Sed molestie augue sit amet leo consequat posuere.
            </motion.p>
          </motion.div>

          <motion.div
            className='mt-12 text-center'
            variants={paragraphVariants}
          >
            <Link
              href='/blog'
              className='font-regular inline-flex cursor-pointer items-center justify-center gap-2 text-xs uppercase tracking-[0.08em] text-gray-600 transition-all duration-300 hover:opacity-80 sm:text-[12px] sm:leading-[14.4px]'
            >
              <ArrowIcon
                className='-mt-1 ml-1 h-2 w-2 rotate-90 sm:ml-2 sm:h-3 sm:w-3'
                color='#4B5563'
              />
              <span className='border-b border-transparent hover:border-gray-600'>
                Back to Blog
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
