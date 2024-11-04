import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

import * as icons from '@/app/icons';
import ArrowIcon from '@/public/assets/ui/Arrow';
import LinkedIn from '@/public/assets/ui/LinkedIn';

interface FutureSectionProps {
  id: string;
  bgColor: string;
}

export default function FutureSection({ id, bgColor }: FutureSectionProps) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const router = useRouter();

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const scaleSpring = useSpring(scale, springConfig);
  const opacitySpring = useSpring(opacity, springConfig);
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

  const roles = [
    'Research Engineer',
    'Full Stack Engineer',
    'Computational Biologist',
    'Machine Learning Engineer',
  ];

  const handleRoleClick = (role: string) => {
    router.push(
      `/careers/${encodeURIComponent(role.toLowerCase().replace(/ /g, '-'))}`
    );
  };

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pb-0 text-white sm:px-8'
      style={{ backgroundColor: bgColor }}
    >
      <div className='container relative z-10 mx-auto mt-[150px] lg:mt-[200px]'>
        <motion.div variants={itemVariants} className='mb-16 text-center'>
          <motion.h2
            className='mx-auto mb-6 max-w-4xl font-light text-[40px] leading-tight tracking-tight text-white lg:text-[50px]'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Revolutionizing Drug Discovery Through AI-Powered Virtual Cell
            Models
          </motion.h2>
          <motion.p className='mx-auto mb-8 max-w-2xl text-lg text-neutral-300/90'>
            Our genomic language models learn directly from DNA sequences,
            enabling accurate predictions of cellular responses across diverse
            genetic backgrounds.
          </motion.p>
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
                  className='font-book text-xs uppercase tracking-wide'
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  JOIN THE TEAM
                </motion.span>
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Leadership section
        <motion.div
          variants={itemVariants}
          className='mb-16 mt-16 flex flex-col items-center justify-center gap-[30px] lg:mt-40 lg:flex-row'
        >
          <TeamMember
            name='Will Blair'
            role='Co-Founder & CEO'
            index={0}
            slug='portrait_will.png'
            linkedin='willblair'
            credentials='Kleiner Perkins Engineer in Residence, Johns Hopkins'
          />
          <TeamMember
            name='Nate Tippens'
            role='Co-Founder & CTO'
            index={1}
            slug='portrait_nate.png'
            linkedin='natetippens'
            credentials='MIT Postdoc, Cornell PhD'
          />
          <TeamMember
            name='Alex Garruss'
            role='Scientific Advisor'
            index={2}
            slug='portrait_alex.png'
            linkedin='alexgarruss'
            credentials='Harvard PhD, Stowers Institute'
          />
        </motion.div> */}

        {/* Roles Section */}
        <motion.div
          variants={containerVariants}
          className='pt-[100px] lg:pt-[80px]'
        >
          <motion.h2
            variants={itemVariants}
            className='mb-8 flex items-center justify-between font-book text-2xl tracking-tight sm:mb-12'
          >
            <span>Open Roles</span>
            <span className='ml-4 text-xs font-normal tracking-tight text-opacity-50'>
              (&nbsp;&nbsp;&nbsp;&nbsp;{roles.length}&nbsp;&nbsp;&nbsp;&nbsp;)
            </span>
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className='space-y-3 sm:space-y-4'
          >
            {roles.map((role, index) => (
              <motion.div
                key={index}
                className='flex cursor-pointer items-center justify-between border-t border-gray-700 py-3 transition-colors duration-200 hover:border-white sm:py-4'
                onClick={() => handleRoleClick(role)}
                role='link'
                data-href={`/careers/${encodeURIComponent(role.toLowerCase().replace(/ /g, '-'))}`}
              >
                <motion.div
                  className='absolute -top-px left-0 right-0 h-px bg-gray-700'
                  initial={{ scaleX: 0, transformOrigin: 'right' }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <span className='w-1/3 whitespace-nowrap font-book'>
                  {role}
                </span>
                <span className='ml-20 w-1/3 text-center text-white text-opacity-60 sm:ml-0'>
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
            className='mb-[100px] mt-[100px] flex flex-col items-start justify-between space-y-[30px] sm:flex-row sm:items-center sm:space-y-0 md:mb-20'
          >
            <p className='font-book text-2xl tracking-tight text-white/50'>
              Don&apos;t see what you&apos;re looking for?
            </p>
            <span className='text-white/50'>
              Get in touch:{' '}
              <Link
                href='mailto:jobs@virtualbio.com'
                className='group relative inline-block text-white hover:underline'
              >
                jobs@virtualbio.com
                <motion.div
                  className='absolute bottom-0 left-0 h-[1px] w-full origin-left bg-white'
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function TeamMember({
  name,
  role,
  index,
  slug,
  linkedin,
  credentials,
}: {
  name: string;
  role: string;
  index: number;
  slug: string;
  linkedin: string;
  credentials: string;
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
          src={`/assets/team/${slug}`}
          className='!aspect-[0.83] h-full w-auto object-cover sm:max-h-[500px] lg:max-h-[538px]'
          height={538}
          width={448}
          alt={name}
        />
        <motion.div
          className='absolute bottom-[10px] left-[10px] flex h-[140px] w-[220px] flex-col justify-between bg-[#03E87A] p-4 sm:h-[150px] sm:w-[230px] lg:h-[163px] lg:w-[247px]'
          initial={{ y: 0, x: 0 }}
          whileHover={{ y: -5, x: 5 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <h3 className='mb-2 border-t border-black pt-2.5 font-book text-lg tracking-tight text-black'>
              {name}
            </h3>
            <p className='font-book text-sm tracking-tight text-black'>
              {role}
            </p>
            <p className='mt-1 font-book text-xs tracking-tight text-black/70'>
              {credentials}
            </p>
          </div>
          <div className='flex space-x-2'>
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
