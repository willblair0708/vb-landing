'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

import ArrowIcon from '@/public/assets/ui/Arrow';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'How Aaru simulates entire populations to predict events',
    excerpt:
      "Discover the power of Aaru's simulation technology and its impact on predicting future events.",
    date: 'October 18, 2024',
    author: 'John Kessler',
    image: '/assets/products/dynamo.webp',
  },
  // {
  //   id: 2,
  //   title: 'The future of AI-driven decision making',
  //   excerpt:
  //     'Explore how AI is revolutionizing decision-making processes across industries.',
  //   date: 'September 5, 2024',
  //   author: 'Cam Fink',
  //   image: '/assets/products/lumen.webp',
  // },
  // {
  //   id: 3,
  //   title: 'Ethical considerations in population simulation',
  //   excerpt:
  //     'Delve into the ethical challenges and considerations of simulating entire populations.',
  //   date: 'August 22, 2024',
  //   author: 'Ned Koh',
  //   image: '/assets/products/seraph.webp',
  // },
  // {
  //   id: 4,
  //   title: 'How Aaru simulates entire populations to predict events',
  //   excerpt:
  //     "Discover the power of Aaru's simulation technology and its impact on predicting future events.",
  //   date: 'October 18, 2024',
  //   author: 'John Kessler',
  //   image: '/assets/products/dynamo.webp',
  // },
  // {
  //   id: 5,
  //   title: 'The future of AI-driven decision making',
  //   excerpt:
  //     'Explore how AI is revolutionizing decision-making processes across industries.',
  //   date: 'September 5, 2024',
  //   author: 'Cam Fink',
  //   image: '/assets/products/lumen.webp',
  // },
  // {
  //   id: 6,
  //   title: 'Ethical considerations in population simulation',
  //   excerpt:
  //     'Delve into the ethical challenges and considerations of simulating entire populations.',
  //   date: 'August 22, 2024',
  //   author: 'Ned Koh',
  //   image: '/assets/products/seraph.webp',
  // },
];

export default function BlogPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 20,
    damping: 30,
    restDelta: 0.001,
  });

  const y = useTransform(smoothProgress, [0, 1], ['0%', '5%']);

  return (
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
        <motion.div className='min-h-screen w-full overflow-x-hidden bg-black font-sans sm:px-8'>
          <Navbar isFixed={false} />
          <motion.main
            initial='hidden'
            animate='visible'
            variants={containerVariants}
            className='relative min-h-screen px-6'
          >
            <div className='flex flex-col'>
              <div className='flex flex-grow flex-col'>
                <motion.h1
                  variants={fadeInVariant}
                  className='mb-12 mt-32 px-0 text-center text-4xl font-semibold text-white sm:text-left'
                >
                  Blog
                </motion.h1>
                <motion.div
                  variants={containerVariants}
                  className='grid grid-cols-1 gap-12 sm:gap-8 sm:gap-y-12 md:grid-cols-2 lg:grid-cols-3'
                >
                  {blogPosts.map((post) => (
                    <motion.article
                      key={post.id}
                      variants={fadeInVariant}
                      whileHover={{
                        scale: 1.03,
                        transition: { duration: 0.3, ease: 'easeInOut' },
                      }}
                      className='mx-auto w-full cursor-pointer overflow-hidden rounded-lg bg-gray-800 shadow-lg backdrop-blur-sm transition-all duration-300'
                      onClick={() => router.push(`/blog/${post.id}`)}
                    >
                      <div className='relative h-48 sm:h-56'>
                        <Image
                          src={post.image}
                          alt={post.title}
                          layout='fill'
                          objectFit='cover'
                        />
                      </div>
                      <div className='p-6 sm:p-8'>
                        <h2 className='mb-4 text-lg font-semibold text-white group-hover:underline sm:text-xl'>
                          <Link href='#'>{post.title}</Link>
                        </h2>
                        <p className='mb-6 font-serif text-sm text-gray-300 sm:text-base'>
                          {post.excerpt}
                        </p>
                        <div className='flex items-center justify-between text-xs text-gray-400 sm:text-sm'>
                          <span>{post.author}</span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              </div>
              <div className='p-8 text-center sm:p-12'></div>
            </div>
          </motion.main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  },
};
