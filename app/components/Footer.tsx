import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import * as SocialIcons from '@/public/assets/footer';
import AaruWordmark from '@/public/assets/ui/AaruWordmark';
import VBIcon from '@/public/assets/ui/VBIcon';

// Constants
const FOOTER_LINKS = [
  {
    title: 'PRODUCTS',
    links: [
      { name: 'DYNAMO', href: '/products#dynamo-section' },
      { name: 'LUMEN', href: '/products#lumen-section' },
      { name: 'SERAPH', href: '/products#seraph-section' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { name: 'ABOUT US', href: '/about' },
      { name: 'CAREERS', href: '/careers' },
      // { name: 'SECURITY', href: '/security' },
      // { name: 'PRIVACY', href: '/privacy' },
    ],
  },
];

const SOCIAL_ICONS = [
  {
    name: 'linkedin',
    href: 'https://www.linkedin.com/company/aaru-ai',
    Icon: SocialIcons.LinkedInIcon,
  },
  // {
  //   name: 'youtube',
  //   href: 'https://www.youtube.com/aaru',
  //   Icon: SocialIcons.YoutubeIcon,
  // },
  {
    name: 'twitter',
    href: 'https://twitter.com/aaruhq',
    Icon: SocialIcons.TwitterIcon,
  },
  // {
  //   name: 'instagram',
  //   href: 'https://www.instagram.com/aaru',
  //   Icon: SocialIcons.InstagramIcon,
  // },
];

// Animation variants
const containerVariants = {
  visible: {
    opacity: 1,
  },
};

const itemVariants = {
  visible: {
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      mass: 0.8,
    },
  },
};

// Add new variants for form elements
const formVariants = {
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
};

const successVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};

// Components
const FooterSection = ({
  title,
  links,
}: {
  title: string;
  links: { name: string; href: string }[];
}) => (
  <motion.div variants={itemVariants}>
    <h3 className='mb-0.5 font-book font-oracle text-xs tracking-[8%] text-white'>
      {title}
    </h3>
    <ul className='space-y-0.5'>
      {links.map((link) => (
        <li key={link.name}>
          <Link
            href={link.href}
            className='font-book font-oracle text-xs tracking-[8%] text-white opacity-50 transition-colors duration-200 hover:text-[#8B8B8B]'
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </motion.div>
);

const SocialIcon = ({
  icon,
}: {
  icon: { name: string; href: string; Icon: React.ComponentType<any> };
}) => (
  <Link
    href={icon.href}
    target='_blank'
    rel='noopener noreferrer'
    className='mt-8 text-white transition-colors duration-200 hover:text-[#8B8B8B]'
  >
    <span className='sr-only'>{icon.name}</span>
    <icon.Icon color='currentColor' />
  </Link>
);

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch(
      'https://app.loops.so/api/newsletter-form/cm2sddtg5037da0trsg1hhngw',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email,
        }),
      }
    );

    setEmail('');
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <motion.footer
      initial='visible'
      variants={containerVariants}
      className='w-full bg-[#000000] px-4 py-6 font-book font-oracle text-white sm:px-8 sm:py-8'
    >
      <div className='max-w-9xl mx-auto'>
        <div className='mb-6 flex flex-col sm:mb-8 lg:grid lg:grid-cols-[3fr_2fr] lg:items-start'>
          <motion.div
            variants={itemVariants}
            className='mb-6 mt-2 text-left lg:mb-0 lg:w-1/3'
          >
            <AaruWordmark
              size={62}
              className='sm:size-62 mb-4 text-white lg:mx-0'
            />
          </motion.div>
          <div className='flex w-full justify-start'>
            <div className='mr-12'>
              <FooterSection {...FOOTER_LINKS[0]} />
            </div>
            <div>
              <FooterSection {...FOOTER_LINKS[1]} />
            </div>
          </div>
        </div>

        <motion.div
          variants={itemVariants}
          className='flex flex-col space-y-6 sm:grid sm:grid-cols-[3fr_2fr] sm:items-start sm:space-y-8'
        >
          {/* Desktop copyright - hidden on mobile */}
          <div className='mt-6 hidden sm:flex sm:flex-col sm:space-y-2 sm:text-left'>
            <div className='mt-10 flex flex-col items-start space-y-0'>
              {/* <button className='font-oracle text-xs tracking-[0.08em] text-[#8B8B8B] transition-colors duration-200 hover:text-white'>
                COOKIE SETTINGS
              </button> */}
              <p className='font-book font-oracle text-xs tracking-[0.08em] text-[#ffffff]'>
                &copy; 2024 AARU
              </p>
            </div>
          </div>

          <div className='flex flex-col space-y-4 pr-4 sm:flex-row sm:items-start sm:justify-between sm:space-x-8 sm:space-y-0 sm:pr-8'>
            <div className='flex flex-col space-y-2'>
              <h3 className='font-book font-oracle text-xs tracking-[0.08em] text-[#ffffff]'>
                JOIN OUR MAILING LIST:
              </h3>
              <form
                onSubmit={handleSubmit}
                className='relative flex w-full items-center sm:w-[330px]'
              >
                <AnimatePresence mode='wait'>
                  {!showSuccess ? (
                    <motion.div
                      key='form'
                      variants={formVariants}
                      initial='hidden'
                      animate='visible'
                      exit='hidden'
                      className='w-full'
                    >
                      <input
                        type='email'
                        placeholder='Email Address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='h-[38px] w-full rounded-md bg-[#18181B] px-3 py-2 pr-16 font-book font-oracle text-xs text-white transition-all duration-200 placeholder:font-oracle placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-white'
                      />
                      <AnimatePresence>
                        {email && (
                          <motion.button
                            initial={{ opacity: 0, x: -10, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -10, scale: 0.9 }}
                            transition={{
                              type: 'spring',
                              stiffness: 400,
                              damping: 25,
                            }}
                            type='submit'
                            className='absolute right-2 top-2 flex h-[24px] items-center rounded-full bg-[#303036] px-2 py-[0.5px] hover:border-white/20'
                          >
                            <span className='text-[10px] font-medium uppercase sm:text-xs'>
                              Send
                            </span>
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    <motion.div
                      key='success'
                      variants={successVariants}
                      initial='hidden'
                      animate='visible'
                      exit='exit'
                      className='items-left justify-left flex h-[38px] w-full rounded-md bg-[#18181B] px-3 py-2 font-book font-oracle text-xs tracking-[0.08em] text-white'
                    >
                      Thank you for subscribing
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
            {/* Modified social icons and copyright container */}
            <div className='flex items-center justify-between sm:flex-col sm:items-end sm:space-y-4'>
              <div className='flex space-x-3 sm:space-x-4'>
                {SOCIAL_ICONS.map((icon) => (
                  <SocialIcon key={icon.name} icon={icon} />
                ))}
              </div>
              {/* Mobile copyright - hidden on desktop */}
              <p className='mt-8 font-book font-oracle text-xs tracking-[0.08em] text-[#ffffff] sm:hidden'>
                &copy; 2024 AARU
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
