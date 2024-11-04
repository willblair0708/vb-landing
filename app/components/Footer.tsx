import Link from 'next/link';
import React from 'react';
import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import * as SocialIcons from '@/public/assets/footer';
import AaruWordmark from '@/public/assets/ui/AaruWordmark';

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

const PLATFORM_LINKS = [{ name: 'Platform', href: '/platform' }];

const COMPANY_LINKS = [
  { name: 'About Us', href: '/about' },
  { name: 'Careers', href: '/careers' },
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
    <h3 className='font-oracle mb-0.5 font-book text-xs tracking-[8%] text-white'>
      {title}
    </h3>
    <ul className='space-y-0.5'>
      {links.map((link) => (
        <li key={link.name}>
          <Link
            href={link.href}
            className='font-oracle font-book text-xs tracking-[8%] text-white opacity-50 transition-colors duration-200 hover:text-[#8B8B8B]'
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

export default function Footer() {
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      await fetch(
        'https://app.loops.so/api/newsletter-form/cm2sddtg5037da0trsg1hhngw',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ email }),
        }
      );

      setEmail('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className='relative z-50 w-full border-t border-white/10 bg-[#000000]/80 px-6 py-16 backdrop-blur-xl sm:px-12'>
      <div className='mx-auto max-w-7xl'>
        <div className='mb-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr,1fr,1fr,1.5fr] lg:gap-8'>
          {/* Brand Section */}
          <div className='max-w-sm'>
            <Link
              href='/'
              className='group mb-6 inline-flex items-center gap-3 transition-transform duration-300 hover:translate-x-0.5'
            >
              <div className='relative h-8 w-8'>
                <div className='absolute inset-0 rounded-lg bg-gradient-to-tr from-white/10 to-white/5' />
                <div className='absolute inset-0 rounded-lg bg-black/50 backdrop-blur-sm' />
                <AaruWordmark className='relative h-full w-full p-1.5 text-white' />
              </div>
              <span className='text-xl font-semibold tracking-tight text-white'>
                Virtual Biology
              </span>
            </Link>
            <p className='mb-8 text-sm leading-relaxed text-neutral-400'>
              Revolutionizing drug discovery through AI-powered virtual cell
              models and cross-species genomic analysis.
            </p>
            <div className='flex gap-3'>
              {SOCIAL_ICONS.map((icon) => (
                <Link
                  key={icon.name}
                  href={icon.href}
                  className='group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-2.5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <div className='absolute inset-0 bg-gradient-to-tr from-white/10 via-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                  <div className='absolute inset-0 rounded-lg bg-black/20 backdrop-blur-sm' />
                  <icon.Icon className='relative h-4 w-4 text-white/70 transition-colors duration-300 group-hover:text-white' />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {['Platform', 'Company'].map((title, index) => (
            <div key={title}>
              <h3 className='mb-4 text-sm font-medium uppercase tracking-wider text-white/50'>
                {title}
              </h3>
              <ul className='space-y-3'>
                {(index === 0 ? PLATFORM_LINKS : COMPANY_LINKS).map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className='group inline-flex items-center text-sm text-neutral-400 transition-all duration-300 hover:text-white'
                    >
                      <span className='relative'>
                        {link.name}
                        <span className='absolute inset-x-0 -bottom-0.5 h-px scale-x-0 bg-gradient-to-r from-white/0 via-white to-white/0 transition-transform duration-300 group-hover:scale-x-100' />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Section */}
          <div>
            <h3 className='mb-4 text-sm font-medium uppercase tracking-wider text-white/50'>
              Stay Updated
            </h3>
            <form onSubmit={handleSubmit} className='space-y-3'>
              <div className='group relative'>
                <input
                  type='email'
                  placeholder='Enter your email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 shadow-sm backdrop-blur-sm transition-all duration-300 focus:border-white/20 focus:bg-white/[0.08] focus:outline-none focus:ring-1 focus:ring-white/20'
                />
                <div className='absolute inset-0 -z-10 rounded-lg bg-gradient-to-tr from-white/[0.08] via-white/[0.05] to-white/[0.02] opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              </div>
              <AnimatePresence mode='wait'>
                {!showSuccess ? (
                  <motion.button
                    type='submit'
                    disabled={isLoading || !email}
                    className='group relative w-full overflow-hidden rounded-lg bg-white px-4 py-3 text-sm font-medium text-black shadow-sm transition-all duration-300 hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50'
                  >
                    <div className='absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/50 to-white/0 transition-transform duration-500 group-hover:translate-x-full' />
                    <span className='relative'>
                      {isLoading ? (
                        <div className='flex items-center justify-center gap-2'>
                          <svg
                            className='h-4 w-4 animate-spin'
                            viewBox='0 0 24 24'
                          >
                            <circle
                              className='opacity-25'
                              cx='12'
                              cy='12'
                              r='10'
                              stroke='currentColor'
                              strokeWidth='4'
                              fill='none'
                            />
                            <path
                              className='opacity-75'
                              fill='currentColor'
                              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                            />
                          </svg>
                          <span>Subscribing...</span>
                        </div>
                      ) : (
                        'Subscribe to Newsletter'
                      )}
                    </span>
                  </motion.button>
                ) : (
                  <motion.div
                    variants={successVariants}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    className='flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white backdrop-blur-sm'
                  >
                    <svg
                      className='h-4 w-4 text-white'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                    <span>Thank you for subscribing</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:gap-0'>
          <p className='text-sm text-neutral-500'>
            &copy; {new Date().getFullYear()} Virtual Biology Corporation.{' '}
            <span className='text-neutral-600'>All rights reserved.</span>
          </p>
          <div className='flex gap-6'>
            {['Privacy Policy', 'Terms of Service'].map((text, i) => (
              <Link
                key={text}
                href={i === 0 ? '/privacy' : '/terms'}
                className='group relative text-sm text-neutral-500 transition-colors duration-300 hover:text-white'
              >
                <span className='relative'>
                  {text}
                  <span className='absolute inset-x-0 -bottom-0.5 h-px scale-x-0 bg-gradient-to-r from-white/0 via-white to-white/0 transition-transform duration-300 group-hover:scale-x-100' />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
